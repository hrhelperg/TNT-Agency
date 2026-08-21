import { chromium, devices } from '@playwright/test'
const H='http://127.0.0.1:3311'
const CAT=process.env.CAT
const m=await import('./lib/locale/l1-concepts.ts')
const reg=await import('./lib/locale/registry.ts')
const C=await import('./lib/locale/chrome.ts')
const en=(await import('./lib/locale/content/en/index.ts')).EN_CONTENT
const de=(await import('./lib/locale/content/de/index.ts')).DE_CONTENT
const ids=m.L1_CONCEPTS.filter(c=>c.category===CAT).map(c=>c.id)
const routes=[]; for(const id of ids){const c=reg.LOCALE_CONCEPTS.find(x=>x.id===id); for(const l of ['en','de']) if(c.published.includes(l)) routes.push([reg.urlFor(c,l),l,id])}
const b=await chromium.launch(); const consent=t=>t.addInitScript(()=>{try{localStorage.setItem('cookie_consent','rejected')}catch{}})
const fails=[]
for (const [url,l,id] of routes) {
  const cx=await b.newContext({javaScriptEnabled:false}); await consent(cx)
  const pg=await cx.newPage(); const r=await pg.goto(H+url,{waitUntil:'domcontentloaded'})
  if(r.status()!==200){fails.push(url+' status '+r.status()); await cx.close(); continue}
  const text=(await pg.locator('body').innerText()).replace(/\s+/g,' ')
  const e=(l==='en'?en:de)[id][l]
  const miss=[e.h1,e.intro,...e.sections.flatMap(s=>[s.heading,...s.body])].filter(p=>!text.includes(p.replace(/\s+/g,' ')))
  if(miss.length) fails.push(url+': '+miss.length+' paragraph(s) missing JS-off — e.g. "'+miss[0].slice(0,60)+'"')
  if(await pg.getAttribute('html','lang')!==l) fails.push(url+' lang')
  if(await pg.getAttribute('link[rel=canonical]','href')!=='https://talentpartnerid.com'+url) fails.push(url+' canonical')
  if(await pg.locator('h1').count()!==1) fails.push(url+' h1 count')
  if(await pg.getAttribute('.eco-bar','lang')!==l) fails.push(url+' eco-bar lang')
  if(await pg.getAttribute('header nav.nav','aria-label')!==C.CHROME_ARIA[l].mainNav) fails.push(url+' nav aria')
  const alts=await pg.locator('link[rel=alternate]').evaluateAll(ls=>ls.map(x=>x.getAttribute('hreflang')))
  if(!alts.includes('cs-CZ')||!alts.includes('en')||!alts.includes('de')||!alts.includes('x-default')) fails.push(url+' hreflang set '+JSON.stringify(alts))
  await cx.close()
}
console.log('  JS-off + SEO contract, '+routes.length+' routes: '+(fails.length?'FAIL':'PASS'))
const deR=routes.filter(([,l])=>l==='de')
for (const [url] of deR) {
  const cx=await b.newContext({...devices['Pixel 5']}); await consent(cx); const pg=await cx.newPage(); const per=[]
  for (const w of [320,360,375,390]) {
    await pg.setViewportSize({width:w,height:900}); await pg.goto(H+url,{waitUntil:'networkidle'}); await pg.waitForTimeout(180)
    const r=await pg.evaluate(()=>{const d=document.scrollingElement||document.documentElement;const bg=document.querySelector('#burger')?.getBoundingClientRect();return{ov:d.scrollWidth-d.clientWidth,vw:d.clientWidth,br:bg?Math.round(bg.right):null}})
    const ok=r.ov<=1&&r.br!==null&&r.br<=r.vw+1; per.push(w+':'+(ok?'ok':'FAIL')); if(!ok) fails.push(url+' @'+w+'px ov='+r.ov)
  }
  console.log('  '+url.padEnd(38)+per.join(' '))
  await cx.close()
}
await b.close()
console.log('  TOTAL FAILURES: '+fails.length); fails.slice(0,8).forEach(f=>console.log('    '+f))
