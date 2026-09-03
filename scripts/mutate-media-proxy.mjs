/**
 * Mutation tests for the media-proxy gate.
 *
 * Each mutation reproduces a way the proxy can silently stop doing what the
 * comment in netlify.toml says it does. They run against a COPY of the tree in
 * a temp directory, so a failed run cannot leave a stray page or a mangled
 * netlify.toml behind.
 */
import fs from 'fs'
import os from 'os'
import path from 'path'
import { fileURLToPath } from 'url'
import { checkMediaProxy } from './validate-media-proxy.mjs'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

function scratch() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'media-proxy-'))
  fs.cpSync(path.join(ROOT, 'pages'), path.join(dir, 'pages'), { recursive: true })
  fs.mkdirSync(path.join(dir, 'public'), { recursive: true })
  for (const f of fs.readdirSync(path.join(ROOT, 'public'))) {
    if (f.endsWith('.html')) {
      fs.copyFileSync(path.join(ROOT, 'public', f), path.join(dir, 'public', f))
    }
  }
  fs.copyFileSync(path.join(ROOT, 'netlify.toml'), path.join(dir, 'netlify.toml'))
  return dir
}

const MUTATIONS = [
  {
    name: '1. a Next page added under a proxied prefix (built, deployed, never served)',
    expect: /falls under the proxied prefix/,
    apply: (d) => {
      fs.mkdirSync(path.join(d, 'pages/media'), { recursive: true })
      fs.writeFileSync(
        path.join(d, 'pages/media/index.tsx'),
        'export default function X(){return null}',
      )
    },
  },
  {
    name: '2. a localized Next page under /en/media',
    expect: /falls under the proxied prefix/,
    apply: (d) => {
      fs.mkdirSync(path.join(d, 'pages/en/media'), { recursive: true })
      fs.writeFileSync(
        path.join(d, 'pages/en/media/index.tsx'),
        'export default function X(){return null}',
      )
    },
  },
  {
    name: '3. a static HTML file shadowed by the proxy',
    expect: /falls under the proxied prefix/,
    apply: (d) => {
      fs.mkdirSync(path.join(d, 'public/media'), { recursive: true })
      fs.writeFileSync(path.join(d, 'public/media/x.html'), '<!doctype html>')
    },
  },
  {
    name: '4. proxy rules moved above the host-canonicalization 301s',
    expect: /declared BEFORE the host-canonicalization 301/,
    apply: (d) => {
      const p = path.join(d, 'netlify.toml')
      const s = fs.readFileSync(p, 'utf8')
      const block = s.slice(s.indexOf('[[redirects]]\n  from   = "/media"'), s.indexOf('[[headers]]'))
      const without = s.replace(block, '')
      // Re-insert it before the first host redirect.
      const at = without.indexOf('[[redirects]]')
      fs.writeFileSync(p, without.slice(0, at) + block + without.slice(at))
    },
  },
  {
    name: '5. a splat rule without its exact-match partner',
    expect: /has a splat rule but no exact-match rule/,
    apply: (d) => {
      const p = path.join(d, 'netlify.toml')
      const s = fs.readFileSync(p, 'utf8')
      fs.writeFileSync(
        p,
        s.replace(
          '[[redirects]]\n  from   = "/de/media"\n  to     = "https://talentpartnerid-media.netlify.app/de/media"\n  status = 200\n  force  = true\n\n',
          '',
        ),
      )
    },
  },
  {
    name: '6. two proxy rules pointing at different origins',
    expect: /point at more than one origin/,
    apply: (d) => {
      const p = path.join(d, 'netlify.toml')
      const s = fs.readFileSync(p, 'utf8')
      fs.writeFileSync(
        p,
        s.replace(
          'to     = "https://talentpartnerid-media.netlify.app/de/media/:splat"',
          'to     = "https://some-other-deploy.netlify.app/de/media/:splat"',
        ),
      )
    },
  },
]

let caught = 0
for (const m of MUTATIONS) {
  const dir = scratch()
  try {
    m.apply(dir)
    const { errors } = checkMediaProxy(dir)
    const hit = errors.some((e) => m.expect.test(e))
    console.log(`  ${hit ? 'caught  ' : 'MISSED  '} ${m.name}`)
    if (hit) caught++
    else console.log(`      errors seen: ${JSON.stringify(errors).slice(0, 300)}`)
  } finally {
    fs.rmSync(dir, { recursive: true, force: true })
  }
}

// The unmutated tree must still pass, or the mutations prove nothing.
const clean = checkMediaProxy()
if (clean.errors.length) {
  console.error('\nthe real tree does not pass the gate:', clean.errors)
  process.exit(1)
}

console.log(`\nmedia proxy mutations: ${caught}/${MUTATIONS.length} caught`)
process.exit(caught === MUTATIONS.length ? 0 : 1)
