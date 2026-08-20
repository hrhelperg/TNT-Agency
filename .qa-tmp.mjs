import { chromium } from '@playwright/test'
const H='http://127.0.0.1:3311'
const reg = await import('./lib/locale/registry.ts')
const en = await import('./lib/locale/content/en.ts')
const de = await import('./lib/locale/content/de.ts')
const corpora = { en: en.EN_CONTENT, de: de.DE_CONTENT }
const bad=[]

// (1) NO-JS: every declared paragraph of every localized page must be in the raw bytes.
for (const c of reg.LOCALE_CONCEPTS) for (const loc of c.published.filter(l=>l!=='cs')) {
  const url=reg.urlFor(c,loc), html=await fetch(H+url).then(r=>r.text())
  const e=(corpora[loc][c.id]||{})[loc]; if(!e){bad.push('no corpus entry '+loc+'/'+c.id); continue}
  const strip=s=>s.replace(/<[^>]+>/g,'').replace(/&#x27;|&apos;/g,"'").replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/<!-- -->/g,'').replace(/\s+/g,' ')
  const text=strip(html)
  const paras=[e.h1,e.intro,...e.sections.flatMap(s=>[s.heading,...s.body])]
  for (const p of paras) if(!text.includes(p.replace(/\s+/g,' '))) bad.push('MISSING from no-JS HTML '+url+': "'+p.slice(0,60)+'..."')
}
console.log('(1) no-JS server-render: '+(bad.length?'FAIL':'PASS — every declared heading/paragraph present in raw HTML for all 20 localized pages'))

const browser=await chromium.launch()
const bad2=[]
// (2) HOSTILE localStorage: a stale tnt-lang must NOT rewrite a locked locale page.
for (const [url,expectLang] of [['/en','en'],['/de','de'],['/','cs']]) {
  const ctx=await browser.newContext(); const pg=await ctx.newPage()
  await pg.goto(H+'/'); await pg.evaluate(()=>localStorage.setItem('tnt-lang','cs'))
  await pg.goto(H+url,{waitUntil:'networkidle'})
  const before=await pg.evaluate(()=>document.body.innerText)
  await pg.waitForTimeout(600)
  const after=await pg.evaluate(()=>document.body.innerText)
  const lang=await pg.getAttribute('html','lang')
  const locked=await pg.getAttribute('html','data-locale-locked')
  if(lang!==expectLang) bad2.push(url+' lang='+lang)
  if(before!==after) bad2.push(url+' TEXT MUTATED after hydration (client-side localization is running)')
  const ls=await pg.evaluate(()=>localStorage.getItem('tnt-lang'))
  if(url!=='/' && ls!=='cs') bad2.push(url+' overwrote tnt-lang to '+ls+' (locked page must not persist)')
  console.log('    '+url.padEnd(5)+' lang='+lang+' locked='+locked+' text-stable='+(before===after)+' tnt-lang-after='+ls)
  await ctx.close()
}
console.log('(2) hostile localStorage: '+(bad2.length?'FAIL':'PASS — locked pages ignore and do not clobber tnt-lang; no post-hydration text mutation'))

// (3) SWITCHER: must go page->equivalent page, never to a locale home fallback.
const bad3=[]
for (const c of reg.LOCALE_CONCEPTS) {
  if (c.id==='home') continue
  const ctx=await browser.newContext(); const pg=await ctx.newPage()
  await pg.goto(H+reg.urlFor(c,'en'),{waitUntil:'networkidle'})
  const links=await pg.$$eval('.locale-switcher a', as=>as.map(a=>({href:new URL(a.getAttribute('href'),location.origin).pathname, lang:a.getAttribute('hreflang')||a.getAttribute('lang')||''})))
  const deL=links.find(l=>l.href.startsWith('/de')), csL=links.find(l=>!/^\/(en|de)(\/|$)/.test(l.href))
  if(!deL||deL.href!==reg.urlFor(c,'de')) bad3.push(c.id+' de switch -> '+(deL?deL.href:'MISSING')+' expected '+reg.urlFor(c,'de'))
  if(!csL||csL.href!==reg.urlFor(c,'cs')) bad3.push(c.id+' cs switch -> '+(csL?csL.href:'MISSING')+' expected '+reg.urlFor(c,'cs'))
  if(deL&&deL.href==='/de') bad3.push(c.id+' de switch fell back to locale HOME')
  await ctx.close()
}
console.log('(3) switcher page->page: '+(bad3.length?'FAIL:\n  '+bad3.join('\n  '):'PASS — all 9 non-home concepts switch to their true equivalent, zero home fallbacks'))
await browser.close()
const all=[...bad,...bad2,...bad3]
console.log('\nTOTAL DEFECTS: '+all.length)
all.slice(0,15).forEach(b=>console.log('  '+b))
