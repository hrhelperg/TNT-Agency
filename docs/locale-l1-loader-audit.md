# TypeScript loader audit — Locale L1

`scripts/ts-resolve.mjs` is a pre-existing repository mechanism, not something
L1 introduced. It has been used since the growth-validator work so that a
validator can assert against the **real** page objects rather than regex-parsing
source text. This audit exists because L1 changed which npm scripts invoke it,
and a repo-wide invocation change deserves proof that it is semantics-preserving.

## What changed, in the end

**Two scripts.** `validate:hreflang` and `test:mutate-hreflang` now run with the
loader. Both read the built HTML *and* import `lib/locale/registry.ts`, and the
registry gained its first relative import in L1:

```
lib/locale/registry.ts:31  import { L1_REGISTRY_CONCEPTS } from './l1-published'
```

Without the loader that specifier is unresolvable and the script dies before it
validates anything:

```
$ node scripts/validate-hreflang.mjs
Error [ERR_MODULE_NOT_FOUND]: Cannot find module
  '/…/lib/locale/l1-published' imported from '/…/lib/locale/registry.ts'
exit 1
```

Three new L1 validators also use it, because they import the registry by design.

## An over-broad change, measured and reverted

The loader flag was first applied to **18** scripts at once, on the assumption
that anything reaching the registry would need it. That assumption was not
tested, so it was tested: each script was run twice, with and without the
loader, and the outputs and exit codes compared after stripping Node's own
warnings.

| | |
|---|---|
| Byte-identical output and exit code without the loader | **17** |
| Genuinely require it (`ERR_MODULE_NOT_FOUND` otherwise) | **1** |
| Unexplained differences | **0** |

Seventeen scripts had gained a flag that did nothing. It was harmless — proven
identical — but it obscures which scripts actually depend on the TypeScript
layer, which is exactly the information a future reader needs. All seventeen
were reverted, and the full gate was re-run afterwards: 639 unit tests, 30/30
validators, 10/10 mutation suites.

## What the loader can and cannot do

Its entire behaviour is one resolve hook: attempt normal resolution; on failure,
and **only for a relative specifier**, retry as `.ts`, `/index.ts`, `.tsx`; if
none resolve, rethrow the original error. It performs no transpilation — Node 24
strips TypeScript types natively.

Each prohibition in the brief was tested rather than reasoned about:

| Claim | Test | Result |
|---|---|---|
| Does not swallow missing modules | import a nonexistent relative module | exit 1, code never reached |
| Does not rescue a missing package | import a nonexistent bare package | exit 1, code never reached |
| Does not transpile around a syntax defect | import a `.ts` file with an unterminated string | exit 1, `SyntaxError`, code never reached |
| Does not change exit codes | script calling `process.exit(7)` | exit 7 |
| Does not skip validation work | 17 scripts compared with/without | byte-identical output |

**Type errors are the one thing it does not catch, and cannot.** Node strips
types rather than checking them, so a pure type error will not fail a validator
at runtime. That is covered by `tsc --noEmit` in the gate, not here, and is
stated so nobody reads the table above as broader than it is.

## Negative control on a real dependency

Reasoning about a hook is weaker than breaking something. The registry's import
of `./l1-published` was deliberately renamed to a path that does not exist, and
every validator that imports the registry was run:

| script | exit |
|---|---|
| `validate:hreflang` | **1** |
| `validate:locale-pages` | **1** |
| `validate:l1-publication` | **1** |
| `validate:sitemap-equality` | **1** |

All four failed **through** the loader rather than passing under it, and all
returned to exit 0 once the import was restored. The loader widens resolution
for a known set of TypeScript extensions; it does not make a broken dependency
work.

## No second loader

`scripts/ts-resolve.mjs` was sufficient. No alternative loader, bundler step or
transpile pipeline was introduced.
