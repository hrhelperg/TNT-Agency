// Module-resolution hook that lets plain `node` import the TypeScript content
// layer directly.
//
// Node 24 strips TS types natively, but ESM still demands a file extension, and
// the repo's content modules use TS-style extensionless imports
// ("./cornerstone", "../sources"). This hook retries a failed specifier as
// `<spec>.ts`, then `<spec>/index.ts`, which is exactly what tsc resolves.
//
// Used only by dev/validation scripts (scripts/validate-growth.mjs) so a
// validator can assert against the REAL page objects — including the links
// injected by withConversionPath — instead of regex-parsing source text.
//
// Usage: node --import ./scripts/ts-resolve.mjs scripts/validate-growth.mjs

import { register } from 'node:module'
import { pathToFileURL } from 'node:url'

register(
  'data:text/javascript,' +
    encodeURIComponent(`
      export async function resolve(specifier, context, nextResolve) {
        try {
          return await nextResolve(specifier, context)
        } catch (err) {
          if (!specifier.startsWith('.') && !specifier.startsWith('/')) throw err
          for (const suffix of ['.ts', '/index.ts', '.tsx']) {
            try {
              return await nextResolve(specifier + suffix, context)
            } catch {}
          }
          throw err
        }
      }
    `),
  pathToFileURL('./'),
)
