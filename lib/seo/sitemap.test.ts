import { describe, it, expect } from 'vitest';
import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';

// The sitemap tooling is CommonJS (Node scripts). Load it through createRequire
// so the test exercises the exact modules that run in the post-deploy pipeline.
const require = createRequire(import.meta.url);
const ROOT = process.cwd();
const {
  validateSitemapFile,
  validateSitemapXml,
  buildRouteInventory,
} = require(path.join(ROOT, 'scripts/validate-sitemap.js'));
const { getSitemapUrls } = require(path.join(ROOT, 'scripts/update-sitemap.js'));

const SITEMAP_PATH = path.join(ROOT, 'public/sitemap.xml');
const ROOT_SITEMAP = path.join(ROOT, 'sitemap.xml');
const ROBOTS_PATH = path.join(ROOT, 'public/robots.txt');
const ORIGIN = 'https://talentpartnerid.com';

const xml = fs.readFileSync(SITEMAP_PATH, 'utf8');
const locs = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g), (m) => m[1]);

describe('sitemap hygiene', () => {
  it('1. contains exactly the canonical route inventory (144 Next + 11 static = 155)', () => {
    const inv = buildRouteInventory(ROOT);
    expect(inv.nextRoutes.length).toBe(144);
    expect(inv.staticRoutes.length).toBe(11);
    expect(inv.urls.size).toBe(155);
    // Sets must match exactly, both directions.
    const sitemapSet = new Set(locs);
    expect(Array.from(sitemapSet).filter((u) => !inv.urls.has(u))).toEqual([]);
    expect(Array.from(inv.urls as Set<string>).filter((u) => !sitemapSet.has(u))).toEqual([]);
    // validateSitemapFile throws on any mismatch/hygiene issue → passing proves it.
    expect(() => validateSitemapFile(SITEMAP_PATH)).not.toThrow();
  });

  it('2. all URLs are unique', () => {
    expect(locs.length).toBe(155);
    expect(new Set(locs).size).toBe(locs.length);
  });

  it('3. every URL uses https://talentpartnerid.com', () => {
    for (const u of locs) {
      const parsed = new URL(u);
      expect(parsed.protocol).toBe('https:');
      expect(parsed.hostname).toBe('talentpartnerid.com');
    }
  });

  it('4. contains no old-domain (manpower-tnt / manpowertnt / tntgency) URL', () => {
    expect(/manpower-tnt\.agency|manpowertnt\.agency|tntgency\.org/i.test(xml)).toBe(false);
  });

  it('5. contains no <lastmod>', () => {
    expect(/<lastmod\b/.test(xml)).toBe(false);
  });

  it('6. contains no <changefreq>', () => {
    expect(/<changefreq\b/.test(xml)).toBe(false);
  });

  it('7. contains no <priority>', () => {
    expect(/<priority\b/.test(xml)).toBe(false);
  });

  it('8. contains no <xhtml:link> (and no leftover xmlns:xhtml)', () => {
    expect(/<xhtml:link\b/.test(xml)).toBe(false);
    expect(/xmlns:xhtml=/.test(xml)).toBe(false);
  });

  it('9. the reader does not mutate the sitemap file', () => {
    const before = fs.readFileSync(SITEMAP_PATH);
    getSitemapUrls();
    const after = fs.readFileSync(SITEMAP_PATH);
    expect(after.equals(before)).toBe(true);
  });

  it('10. IndexNow URL extraction returns the same 155 canonical URLs', () => {
    const urls = getSitemapUrls();
    expect(urls.length).toBe(155);
    expect(new Set(urls).size).toBe(155);
    expect(urls).toEqual(locs);
  });

  it('11. public/sitemap.xml is the only authoritative source (no root copy)', () => {
    expect(fs.existsSync(SITEMAP_PATH)).toBe(true);
    expect(fs.existsSync(ROOT_SITEMAP)).toBe(false);
  });

  it('12. robots.txt points to the production sitemap', () => {
    const robots = fs.readFileSync(ROBOTS_PATH, 'utf8');
    expect(robots).toContain(`Sitemap: ${ORIGIN}/sitemap.xml`);
  });

  it('sanity: a fabricated bad sitemap fails validation', () => {
    const bad = xml.replace('<loc>https://talentpartnerid.com/</loc>', '<loc>http://www.example.com/</loc>');
    expect(() => validateSitemapXml(bad, { inventory: buildRouteInventory(ROOT) })).toThrow();
  });
});
