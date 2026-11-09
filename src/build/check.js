const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const files=process.argv.slice(2);
for(const f of files){for(const w of [390,1280]){const p=await b.newPage({viewport:{width:w,height:900}});const errs=[];p.on('console',m=>{if(m.type()==='error'&&!/fonts\.g|Failed to load resource/.test(m.text()))errs.push(m.text())});p.on('pageerror',e=>errs.push('PAGEERR '+e.message));
await p.route(/fonts\.googleapis|fonts\.gstatic/,r=>r.abort());
await p.goto('file://'+f);await p.waitForTimeout(600);
const r=await p.evaluate(()=>{const sw=document.documentElement.scrollWidth;const wide=[...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect();return r.right>window.innerWidth+1&&!e.closest('.cwrap,.tw,.eq,.fx,nav,pre,.kgl,details.code')}).slice(0,5).map(e=>e.tagName+'.'+e.className+' '+Math.round(e.getBoundingClientRect().right));
const blank=[...document.querySelectorAll('canvas')].filter(c=>c.width===0||c.height===0).length;const imgs=[...document.querySelectorAll('img[data-who]')].filter(i=>!i.src).length;
let q=window.Quiz?Quiz.total():-1;return {sw,wide,blank,imgs,q}});
const btn=await p.$('.reveal');if(btn){await btn.click();await p.waitForTimeout(400)}
const duel=await p.evaluate(()=>{const a=document.querySelector('#duelBox .result .say[data-who=asst] p');const d=document.querySelector('#duelBox .result .say[data-who=doc] p');return a?(a.textContent+' || '+d.textContent):''});
if(w===1280)await p.screenshot({path:f.replace(/\.html$/,'')+'_shot.png',fullPage:true});
console.log(f.split('/').pop(),w,JSON.stringify(r),'\n DUEL:',duel,'\n ERR:',errs.slice(0,5).join(' | '));await p.close()}}
await b.close()})();
