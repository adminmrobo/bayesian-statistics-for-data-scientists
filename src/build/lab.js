/* 연구실 해설 공용 엔진 (ai-lab-explainer 부록 B·O-B 골격 기반) */
var PD=JSON.parse(document.getElementById('page-data').textContent);
var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function rng(a){return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function gauss(r){var u=0;while(!u)u=r();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*r())}
function gammaR(r,k){if(k<1){return gammaR(r,k+1)*Math.pow(r()||1e-12,1/k)}var d=k-1/3,c=1/Math.sqrt(9*d);for(;;){var x=gauss(r),v=1+c*x;if(v<=0)continue;v=v*v*v;var u=r();if(u<1-0.0331*x*x*x*x)return d*v;if(Math.log(u)<0.5*x*x+d*(1-v+Math.log(v)))return d*v}}
function betaR(r,a,b){var x=gammaR(r,a),y=gammaR(r,b);return x/(x+y)}
function poisR(r,l){if(l>40){return Math.max(0,Math.round(l+Math.sqrt(l)*gauss(r)))}var L=Math.exp(-l),k=0,p=1;do{k++;p*=r()}while(p>L);return k-1}
function clamp(v,a,b){return Math.max(a,Math.min(b,v))}
function pct(v,d){return (v*100).toFixed(d==null?1:d)+'%'}
function nf(v,d){return Number(v).toLocaleString('ko-KR',{minimumFractionDigits:d||0,maximumFractionDigits:d||0})}
function $(s,r){return (r||document).querySelector(s)}
function $$(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
function h(tag,attrs,html){var e=document.createElement(tag);if(attrs)for(var k in attrs){if(k==='class')e.className=attrs[k];else e.setAttribute(k,attrs[k])}if(html!=null)e.innerHTML=html;return e}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function fit(c,hgt){var d=window.devicePixelRatio||1,w=c.clientWidth||c.parentElement.clientWidth||600;if(c.width!==Math.round(w*d)||c.height!==Math.round(hgt*d)){c.width=Math.round(w*d);c.height=Math.round(hgt*d);c.style.height=hgt+'px'}var x=c.getContext('2d');x.setTransform(d,0,0,d,0,0);return w}
function stamp(ctx,W,txt){ctx.save();ctx.font='700 11px "IBM Plex Sans KR",system-ui,sans-serif';var tw=ctx.measureText(txt).width+16,x=W-tw-8,y=8;ctx.fillStyle='rgba(241,182,70,.14)';ctx.strokeStyle='rgba(241,182,70,.7)';ctx.beginPath();if(ctx.roundRect)ctx.roundRect(x,y,tw,20,10);else ctx.rect(x,y,tw,20);ctx.fill();ctx.stroke();ctx.fillStyle='#f1b646';ctx.textAlign='left';ctx.fillText(txt,x+8,y+14);ctx.restore()}
function grid(ctx,W,H){ctx.save();ctx.strokeStyle='rgba(157,155,184,.06)';ctx.lineWidth=1;for(var x=0;x<W;x+=24){ctx.beginPath();ctx.moveTo(x+.5,0);ctx.lineTo(x+.5,H);ctx.stroke()}for(var y=0;y<H;y+=24){ctx.beginPath();ctx.moveTo(0,y+.5);ctx.lineTo(W,y+.5);ctx.stroke()}ctx.restore()}
function txt(ctx,s,x,y,col,size,align,bold){ctx.save();ctx.fillStyle=col||'#eceaf3';ctx.font=(bold?'700 ':'400 ')+(size||12)+'px "IBM Plex Sans KR",system-ui,sans-serif';ctx.textAlign=align||'left';ctx.fillText(s,x,y);ctx.restore()}
var COL={bg:'#13141f',panel:'#1c1e2d',rule:'#363a52',text:'#eceaf3',muted:'#9d9bb8',g:'#5ee39c',m:'#d672d6',r:'#f0604d',a:'#f1b646',i:'#82b8ff',s:'#9ab0d0',doc:'#b07cff',asst:'#ff86b8',fly:'#ef5b5b',robo:'#57d0dc'};

/* 애니메이션: 보이는 캔버스만 */
var mods=[],vis=new Set(),io=('IntersectionObserver' in window)?new IntersectionObserver(function(es){es.forEach(function(e){e.isIntersecting?vis.add(e.target):vis.delete(e.target)})},{rootMargin:'100px'}):null;
function addMod(el,fn){mods.push({el:el,fn:fn});if(io)io.observe(el);else vis.add(el)}
var last=0;function loop(ts){var dt=last?Math.min(0.05,(ts-last)/1000):0.016;last=ts;mods.forEach(function(m){if(vis.has(m.el))m.fn(dt)});requestAnimationFrame(loop)}

/* 캐릭터 */
var Cast=(function(){
  var DEF={doc:'doc_front',asst:'asst_smile',fly:'fly_clip',robo:'robo_smile'};
  var MAPS={fly:["....K......K....",".....K....K.....","....UUUUUUUU....","...UUYUUUUYUU...","..RRRUUUUUURRR..",".RRrRRKKKKRRrRR.",".RRRRKKKKKKRRRR.","..RRKKKKKKKKRR..","WW..WKKKKKKW..WW","WWW.WWKKKKWW.WWW",".WWWWWKKKKWWWWW.","..L.WWKKKKWW.L..",".L...WKKKKW...L.","L.....KKKK.....L",".......KK.......","................"],
    robo:[".......Q........",".......K........","..KKKKKKKKKKKK..","..KEEEEEEEEEEK..","..KEDDDDDDDDEK..","..KEDMDDDDMDEK..","..KEDDDDDDDDEK..","..KEDMDDDDMDEK..","..KEDDMMMMDDEK..",".HKEEEEEEEEEEKH.","HHAAAAAAAAAAAAHH","HHAEQEQEEQEQEAHH","..AAAAAAAAAAAA..","..AEQEQEEQEQEA..","..AAAAAAAAAAAA..",".KKKK......KKKK."],
    doc:["....KKKKKKK.....","...KKKWKKKKK....","..KKKWWKKKKKK...","..KFFFFFFFFFK...","..FGGFFFFGGFF...","..FGKFFFFGKFF...","..FFFFFFFFFFF...","...FFFRRRFFF....","....FFFFFFF.....","...WWWKKKWWW....","..WWWWKRKWWWW...","..WWWWKRKWWWW...","..WFWWKKKWWFW...","..WWWWKKKWWWW...","...LL.....LL....","...KK.....KK...."],
    asst:[".PP..........PP.",".PP..PPPPPP..PP.","PPPPPPPPPPNPPPPP",".PPPPFFFFFFPPPP.","..PPFFFFFFFFPP..","..PFFBFFFFBFFP..","..PFFBFFFFBFFP..","..PFFFFFFFFFFP..","...FFFFRRFFFF...","....FFFFFFFF....","...WWVVVVVVWW...","..WWWVVVVVVWWW..","..WWWVVVVVVWWW..","..WFWVVVVVVWFW..","...NN......NN...","...NN......NN..."]};
  var PAL={K:'#1d1a22',W:'#eceaf3',R:'#e04a3a',r:'#a8281c',U:'#3a6fd8',Y:'#f1c84a',L:'#5a4636',B:'#4aa3ff',F:'#f2c9a0',G:'#9fb4d0',P:'#ff86b8',N:'#2b3a7a',V:'#b9a6e8',E:'#eadfc6',D:'#17352c',M:'#5befa5',A:'#8b5a2b',Q:'#d2603c',H:'#9c978c'};
  var cache={};
  function pix(who){if(cache[who])return cache[who];var rows=MAPS[who],cv=document.createElement('canvas');cv.width=64;cv.height=64;var c=cv.getContext('2d');rows.forEach(function(r,y){r.split('').forEach(function(ch,x){if(ch==='.')return;c.fillStyle=PAL[ch];c.fillRect(x*4,y*4,4,4)})});return cache[who]=cv.toDataURL()}
  function key(who,mood){var k=who+'_'+mood;var a=(window.SPRITE_ALIAS||{})[k]||k;return a}
  function src(who,mood){var S=window.SPRITE||{},k=key(who,mood);if(S[k])return S[k];var d=key(who,DEF[who].split('_')[1]);if(S[d])return S[d];return pix(who)}
  function set(img,who,mood){img.style.transition='opacity .2s';img.style.opacity=0;setTimeout(function(){img.src=src(who,mood);img.dataset.mood=mood;img.style.opacity=1},reduce?0:200)}
  function fill(){$$('img[data-who]').forEach(function(i){i.src=src(i.dataset.who,i.dataset.mood||DEF[i.dataset.who].split('_')[1])})}
  return {set:set,fill:fill,src:src};
})();

/* 용어 말풍선 */
var Gloss=(function(){
  var GL=PD.gloss||{},core=PD.core||Object.keys(GL),mode='core',tip=$('#tip'),open=null;
  var SKIP={BUTTON:1,H1:1,H2:1,H3:1,CANVAS:1,SVG:1,SCRIPT:1,STYLE:1,A:1,SUMMARY:1,INPUT:1,LABEL:1,CODE:1,TEXTAREA:1};
  function terms(){var t=mode==='core'?core:Object.keys(GL);return t.slice().sort(function(a,b){return b.length-a.length})}
  function clear(){$$('.jt').forEach(function(s){s.replaceWith(document.createTextNode(s.textContent))});$$('section,header.hero').forEach(function(n){n.normalize()})}
  function apply(){clear();if(mode==='off')return;var T=terms();
    $$('header.hero, section.level').forEach(function(sec){if(sec.id==='kg'||sec.id==='export'||sec.classList.contains('noglos'))return;var used={};
      var w=document.createTreeWalker(sec,NodeFilter.SHOW_TEXT,{acceptNode:function(n){for(var p=n.parentNode;p&&p!==sec;p=p.parentNode){if(SKIP[p.tagName]||(p.classList&&(p.classList.contains('kpis')||p.classList.contains('nojt')||p.classList.contains('fx')||p.classList.contains('jt'))))return NodeFilter.FILTER_REJECT}return NodeFilter.FILTER_ACCEPT}});
      var nodes=[];while(w.nextNode())nodes.push(w.currentNode);
      nodes.forEach(function(n){var s=n.nodeValue;for(var i=0;i<T.length;i++){var t=T[i];if(used[t])continue;var k=s.indexOf(t);if(k<0)continue;used[t]=1;var a=document.createTextNode(s.slice(0,k)),sp=h('span',{class:'jt',tabindex:'0','data-t':t},esc(t)),b=document.createTextNode(s.slice(k+t.length));var par=n.parentNode;par.insertBefore(a,n);par.insertBefore(sp,n);par.insertBefore(b,n);par.removeChild(n);n=b;s=b.nodeValue;i=-1}})})}
  function show(e){var t=e.target.closest&&e.target.closest('.jt');if(!t)return;var g=GL[t.dataset.t];if(!g)return;tip.innerHTML='<b>'+esc(g[0])+'</b><small>'+esc(g[1])+'</small><br>'+esc(g[2]);tip.style.display='block';var r=t.getBoundingClientRect(),tw=Math.min(300,window.innerWidth-20);tip.style.left=clamp(r.left,10,window.innerWidth-tw-10)+'px';var top=r.bottom+8;if(top+tip.offsetHeight>window.innerHeight-10)top=r.top-tip.offsetHeight-8;tip.style.top=top+'px';open=t}
  function hide(){tip.style.display='none';open=null}
  document.addEventListener('mouseover',show);document.addEventListener('focusin',show);
  document.addEventListener('click',function(e){var t=e.target.closest&&e.target.closest('.jt');if(t){if(open===t)hide();else show(e)}else hide()});
  document.addEventListener('mouseout',function(e){if(e.target.closest&&e.target.closest('.jt'))hide()});
  window.addEventListener('scroll',hide,{passive:true});document.addEventListener('keydown',function(e){if(e.key==='Escape')hide()});
  function cycle(){mode=mode==='core'?'all':mode==='all'?'off':'core';apply();return mode}
  return {apply:apply,cycle:cycle};
})();

/* 퀴즈와 학습 도우미 */
var Quiz=(function(){var total=0,done={};
  function render(){$$('.quiz[data-quiz]').forEach(function(box){var qs=(PD.quiz||{})[box.dataset.quiz]||[];qs.forEach(function(q,qi){total++;var id=box.dataset.quiz+'_'+qi,d=h('div',{class:'qi'});
    d.innerHTML='<div class="qh">확인 퀴즈 '+(qi+1)+(q.kind?' · '+esc(q.kind):'')+'</div><p>'+q.q+'</p><div class="opts"></div><p class="fb" aria-live="polite"></p>';
    var ops=d.querySelector('.opts'),fb=d.querySelector('.fb');q.o.forEach(function(o,oi){var b=h('button',{class:'bt',type:'button'},o);b.addEventListener('click',function(){$$('.bt',ops).forEach(function(x){x.classList.remove('on')});b.classList.add('on');if(oi===q.a){fb.className='fb ok';fb.innerHTML='맞아요. '+q.why;if(!done[id]){done[id]=1;Study.upd()}}else{fb.className='fb no';fb.innerHTML='힌트: '+(q.hint||'본문의 풀이 상자를 다시 보세요.')}});ops.appendChild(b)});box.appendChild(d)})})}
  return {render:render,total:function(){return total},done:function(){return Object.keys(done).length}};
})();
var Study=(function(){var bar=$('#prog'),rd=$('#stRead'),qz=$('#stQuiz'),gb=$('#stGloss');
  function upd(){var H=document.documentElement,p=H.scrollTop/(H.scrollHeight-H.clientHeight||1);if(bar)bar.style.width=(p*100)+'%';if(rd)rd.textContent='읽은 곳 '+Math.round(p*100)+'%';if(qz){qz.textContent='퀴즈 '+Quiz.done()+'/'+Quiz.total();qz.hidden=!Quiz.total()}}
  window.addEventListener('scroll',upd,{passive:true});
  if(gb)gb.addEventListener('click',function(){var m=Gloss.cycle();gb.textContent='밑줄: '+({core:'핵심',all:'전체',off:'끄기'})[m]});
  return {upd:upd};
})();

/* 대결 */
var DUELS={};
function Duel(o){var root=$(o.el);if(!root)return;var shown=false,guess=null,flyImg=$('.side.fly img',root),roboImg=$('.side.robo img',root),btn=$('.reveal',root);
  $$('.guess .bt',root).forEach(function(b){b.addEventListener('click',function(){$$('.guess .bt',root).forEach(function(x){x.setAttribute('aria-pressed','false')});b.setAttribute('aria-pressed','true');guess=b.dataset.g})});
  function bar(name,v,col,fmtf){var mx=o.max||Math.max(1e-9,Math.abs(o._f),Math.abs(o._r));return '<div class="barrow"><span>'+name+'</span><div class="track"><div class="fill" style="width:'+clamp(Math.abs(v)/mx*100,1,100)+'%;background:'+col+'"></div></div><b class="num">'+fmtf(v)+'</b></div>'}
  btn.addEventListener('click',function(){if(shown){reset();return}var r=DUELS[o.fn](o.cfg||{}),f=r.fly,b=r.robo,fm=o.fmt==='pct'?function(v){return pct(v,1)}:function(v){return nf(v,o.dec||0)+(o.unit||'')};o._f=f;o._r=b;
    var res;if(r.foul)res='X';else if(r.cond)res='C';else if(Math.abs(f-b)<=o.drawMargin)res='D';else res=(o.higherIsBetter?f-b:b-f)>0?'F':'R';
    var big=Math.abs(f-b)/(Math.max(Math.abs(f),Math.abs(b))||1)>=0.10;
    var M={F:['arms','sigh','judge','spark'],R:[big?'cry':'coffee','happy','judge','spark'],D:['coffee','meh','think','smile'],X:['arms','blush','judge','shock'],C:['coffee','calc','think','report']}[res];
    Cast.set(flyImg,'fly',M[0]);Cast.set(roboImg,'robo',M[1]);Cast.set($('.result .say[data-who=doc] img',root),'doc',M[2]);Cast.set($('.result .say[data-who=asst] img',root),'asst',M[3]);
    var html='';if(res==='C'){[r.condA,r.condB].forEach(function(c){html+='<p class="muted">'+esc(c.label)+'</p>'+bar('초파리 연구원',c.fly,COL.fly,fm)+bar('주판봇',c.robo,COL.robo,fm)})}else html=bar('초파리 연구원',f,COL.fly,fm)+bar('주판봇',b,COL.robo,fm);
    $('.bars',root).innerHTML=html;
    $('.result .say[data-who=asst] p',root).innerHTML=r.say||(o.metric+'은(는) 초파리 쪽 '+fm(f)+', 주판봇 쪽 '+fm(b)+'이에요.');
    var who={F:'초파리 승.',R:'주판봇 승.',D:'이번 판은 나눠 갖는다.',X:'규칙을 어겼다. 점수와 상관없이 주판봇 실격.',C:'가정에 따라 갈린다. 이 판은 판정하지 않는다.'}[res];
    $('.result .say[data-who=doc] p',root).textContent=(res==='C'?o.condLesson:o.lesson)+'. '+who;
    var gp=$('.guessres',root);if(gp)gp.textContent=guess?('먼저 맞혀 본 답: '+(guess===({F:'fly',R:'robo'})[res]?'맞혔어요.':(res==='D'||res==='C'?'이번 판은 한쪽 승리가 아니에요.':'빗나갔어요. 숫자를 다시 보세요.'))):'';
    root.classList.add('open');shown=true;btn.textContent='다시 닫기'});
  function reset(){Cast.set(flyImg,'fly','point');Cast.set(roboImg,'robo','coin');root.classList.remove('open');shown=false;btn.textContent='결과 보기'}
}

/* 시뮬레이션 등록부 (sims.js가 채움) */
var SIMS={};
function initSims(){$$('.sim[data-sim]').forEach(function(el){var cfg={};try{cfg=JSON.parse(el.dataset.cfg||'{}')}catch(e){}var f=SIMS[el.dataset.sim];if(f)f(el,cfg);else el.innerHTML='<p class="muted">실험 모듈 없음: '+esc(el.dataset.sim)+'</p>'})}
function mkCanvas(parent,hgt,label,wide){var w=h('div',{class:'cwrap'}),c=h('canvas',{class:'sim'+(wide?' wide':''),'aria-label':label||'설명용 그림',role:'img'});w.appendChild(c);parent.appendChild(w);c._h=hgt;return c}
function ctrlRow(parent){var r=h('div',{class:'ctrl'});parent.appendChild(r);return r}
function slider(row,label,min,max,step,val,fmtf,on){var g=h('div',{class:'group'}),id='s'+Math.random().toString(36).slice(2,8);g.innerHTML='<label class="glabel" for="'+id+'">'+label+'</label>';var i=h('input',{type:'range',id:id,min:min,max:max,step:step,value:val}),v=h('span',{class:'val'});g.appendChild(i);g.appendChild(v);row.appendChild(g);function u(){v.textContent=fmtf?fmtf(+i.value):i.value;on(+i.value)}i.addEventListener('input',u);v.textContent=fmtf?fmtf(+val):val;return {get:function(){return +i.value},set:function(x){i.value=x;u()},el:i}}
function buttons(row,label,opts,val,on){var g=h('div',{class:'group'});if(label)g.appendChild(h('span',{class:'glabel'},label));opts.forEach(function(o){var b=h('button',{class:'bt',type:'button','aria-pressed':String(o[0]===val)},o[1]);b.addEventListener('click',function(){$$('.bt',g).forEach(function(x){x.setAttribute('aria-pressed','false')});b.setAttribute('aria-pressed','true');on(o[0])});g.appendChild(b)});row.appendChild(g);return g}
function action(row,label,on,primary){var b=h('button',{class:'bt'+(primary?' primary':''),type:'button'},label);b.addEventListener('click',on);row.appendChild(b);return b}
function kpis(parent,n){var s=h('section',{class:'kpis k'+n});parent.appendChild(s);return function(items){s.innerHTML=items.map(function(k){return '<div class="kpi '+(k[2]||'')+'"><b>'+k[0]+'</b><span>'+k[1]+'</span></div>'}).join('')}}
function insight(parent){var d=h('div',{class:'insight','aria-live':'polite'});parent.appendChild(d);return function(lines){d.innerHTML=lines.map(function(l){return '<p class="'+(l[0]||'')+'">'+l[1]+'</p>'}).join('')}}
function eqline(parent){var d=h('div',{class:'eq'});parent.appendChild(d);return function(s){d.innerHTML=s}}
function hist(ctx,x0,y0,w,hgt,vals,bins,lo,hi,col,maxc){var c=new Array(bins).fill(0);vals.forEach(function(v){var k=Math.floor((v-lo)/(hi-lo)*bins);if(k>=0&&k<bins)c[k]++});var m=maxc||Math.max.apply(null,c)||1;ctx.save();ctx.fillStyle=col;ctx.strokeStyle='#9ab0d0';c.forEach(function(n,i){var bh=n/m*hgt,bx=x0+i*w/bins;ctx.fillRect(bx+1,y0-bh,w/bins-2,bh)});ctx.restore();return c}
function bars(ctx,x0,y0,w,hgt,items,max){var n=items.length,bw=w/n;items.forEach(function(it,i){var bh=clamp(it.v/(max||1),0,1)*hgt;ctx.fillStyle=it.c;ctx.fillRect(x0+i*bw+bw*.18,y0-bh,bw*.64,bh);txt(ctx,it.l,x0+i*bw+bw/2,y0+16,COL.muted,11,'center');txt(ctx,it.t!=null?it.t:'',x0+i*bw+bw/2,y0-bh-6,COL.text,12,'center',true)})}

/* 지식 색인 */
var KG=(function(){var G=null;
  var TY={Concept:'개념',Method:'방법',Task:'문제',Metric:'지표',Claim:'주장',Term:'용어',Question:'질문',Analogy:'비유',Limitation:'한계',Simulation:'실험',QuizItem:'퀴즈',Work:'문헌',Distribution:'분포',Theory:'이론',Assumption:'가정'};
  var TC={Concept:COL.g,Method:COL.m,Term:COL.a,Claim:COL.i,Question:COL.r,Analogy:'#c48a5a',Limitation:COL.r,Simulation:COL.s,QuizItem:'#7a7896',Work:'#bbbbbb',Metric:COL.i,Distribution:COL.s,Theory:COL.g,Task:COL.a,Assumption:COL.a};
  function init(){var raw=$('#kg-raw');if(!raw)return;G=JSON.parse(raw.textContent);var sec=$('#kg');if(!sec)return;
    var on={};Object.keys(TY).forEach(function(k){on[k]=!(k==='QuizItem'||k==='Simulation')});
    var chips=$('#kgChips'),list=$('#kgList'),q=$('#kgQ');
    var types=[];G.nodes.forEach(function(n){if(types.indexOf(n.type)<0)types.push(n.type)});
    types.forEach(function(t){var b=h('button',{class:'bt',type:'button','aria-pressed':String(on[t])},(TY[t]||t)+' '+G.nodes.filter(function(n){return n.type===t}).length);b.addEventListener('click',function(){on[t]=!on[t];b.setAttribute('aria-pressed',String(on[t]));draw()});chips.appendChild(b)});
    function draw(){var s=(q.value||'').trim().toLowerCase();list.innerHTML='';G.nodes.forEach(function(n){if(!on[n.type])return;var hay=(n.label.ko+' '+n.label.en+' '+((n.definition||{}).ko||'')+' '+((n.altLabel||{}).ko||[]).join(' ')).toLowerCase();if(s&&hay.indexOf(s)<0)return;var d=h('details',{id:'kgn-'+n.id.replace(/[^a-z0-9]/gi,'_')});d.innerHTML='<summary><b>'+esc(n.label.ko)+'</b><span class="ty">'+(TY[n.type]||n.type)+'</span><span class="muted" style="font-size:13px">'+esc(n.label.en)+'</span></summary><p>'+esc((n.definition||{}).ko||'')+'</p><p style="font-size:13px"><a href="'+n.anchor+'">설명 보러 가기 →</a> · 근거 '+((n.evidence||[]).length)+'개</p>';list.appendChild(d)})}
    q.addEventListener('input',draw);draw();
    var fl=$('#kgFlow');if(fl&&PD.flow){fl.innerHTML=PD.flow.map(function(f,i){return (i?'<i>→</i>':'')+'<span class="'+(f[1]?'lim':'')+'">'+esc(f[0])+'</span>'}).join('')}
    var oq=$('#kgOpen');if(oq)oq.innerHTML=G.nodes.filter(function(n){return n.type==='Question'}).map(function(n){return '<li>'+esc(n.label.ko)+'</li>'}).join('');
    var st=$('#kgStat');if(st){var m=G.nodes.filter(function(n){return (n.match||[]).some(function(x){return x.verified})}).length;st.textContent='노드 '+G.nodes.length+'개 · 관계 '+G.edges.length+'개 · 외부 매핑 확인 '+m+'개'}
    graph();
    $('#kgJson').addEventListener('click',function(){download(new Blob([JSON.stringify(G,null,2)],{type:'application/json'}),'kg_'+PD.num+'.json')});
    $('#kgMer').addEventListener('click',function(){var ids={},k=0,L=['graph LR'];G.nodes.filter(function(n){return n.type!=='QuizItem'&&n.type!=='Simulation'}).slice(0,40).forEach(function(n){ids[n.id]='n'+(k++);L.push('  '+ids[n.id]+'["'+n.label.ko.replace(/"/g,"'")+'"]')});G.edges.forEach(function(e){if(ids[e.s]&&ids[e.o])L.push('  '+ids[e.s]+' -->|'+e.p.replace('lab:','')+'| '+ids[e.o])});download(new Blob([L.join('\n')],{type:'text/plain'}),'kg_'+PD.num+'.mmd')})}
  function graph(){var c=$('#kgGraph');if(!c)return;var N=G.nodes.filter(function(n){return n.type!=='QuizItem'&&n.type!=='Simulation'}).slice(0,80),idx={};N.forEach(function(n,i){idx[n.id]=i});var E=G.edges.filter(function(e){return idx[e.s]!=null&&idx[e.o]!=null});
    var W=fit(c,360),H=360,r=rng(7),P=N.map(function(){return {x:W/2+(r()-.5)*W*.8,y:H/2+(r()-.5)*H*.8,vx:0,vy:0}});
    for(var it=0;it<200;it++){for(var i=0;i<P.length;i++)for(var j=i+1;j<P.length;j++){var dx=P[i].x-P[j].x,dy=P[i].y-P[j].y,d2=dx*dx+dy*dy+.01,f=900/d2;P[i].vx+=dx*f*.01;P[i].vy+=dy*f*.01;P[j].vx-=dx*f*.01;P[j].vy-=dy*f*.01}
      E.forEach(function(e){var a=P[idx[e.s]],b=P[idx[e.o]],dx=b.x-a.x,dy=b.y-a.y,d=Math.sqrt(dx*dx+dy*dy)+.01,f=(d-60)*.01;a.vx+=dx/d*f*d*.05;a.vy+=dy/d*f*d*.05;b.vx-=dx/d*f*d*.05;b.vy-=dy/d*f*d*.05});
      P.forEach(function(p){p.vx+=(W/2-p.x)*.002;p.vy+=(H/2-p.y)*.002;p.x=clamp(p.x+p.vx*.5,14,W-14);p.y=clamp(p.y+p.vy*.5,14,H-14);p.vx*=.6;p.vy*=.6})}
    function paint(){var ctx=c.getContext('2d');ctx.clearRect(0,0,W,H);ctx.strokeStyle='rgba(157,155,184,.25)';E.forEach(function(e){var a=P[idx[e.s]],b=P[idx[e.o]];ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()});N.forEach(function(n,i){ctx.fillStyle=TC[n.type]||COL.muted;ctx.beginPath();ctx.arc(P[i].x,P[i].y,n.type==='Method'||n.type==='Concept'?6:4,0,7);ctx.fill()});N.forEach(function(n,i){if(n.type==='Method'||n.type==='Concept'||n.type==='Question')txt(ctx,n.label.ko.slice(0,12),P[i].x+8,P[i].y+4,COL.text,11)})}
    paint();c.addEventListener('click',function(ev){var rc=c.getBoundingClientRect(),x=ev.clientX-rc.left,y=ev.clientY-rc.top,best=-1,bd=400;P.forEach(function(p,i){var d=(p.x-x)*(p.x-x)+(p.y-y)*(p.y-y);if(d<bd){bd=d;best=i}});if(best>=0){var el=$('#kgn-'+N[best].id.replace(/[^a-z0-9]/gi,'_'));if(el){el.open=true;el.scrollIntoView({block:'nearest',behavior:reduce?'auto':'smooth'})}}})}
  return {init:init,get:function(){return G}};
})();

/* 온톨로지·서지 꾸러미 */
var CRC=(function(){var t=[],c;for(var n=0;n<256;n++){c=n;for(var k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;t[n]=c>>>0}return function(u8){var x=0xFFFFFFFF;for(var i=0;i<u8.length;i++)x=t[(x^u8[i])&255]^(x>>>8);return (x^0xFFFFFFFF)>>>0}})();
function makeZip(files){var enc=new TextEncoder(),parts=[],central=[],off=0;function u16(v){return [v&255,(v>>8)&255]}function u32(v){return [v&255,(v>>8)&255,(v>>16)&255,(v>>>24)&255]}
  files.forEach(function(f){var name=enc.encode(f.name),data=enc.encode(f.text),crc=CRC(data);var head=[].concat(u32(0x04034b50),u16(20),u16(0x0800),u16(0),u16(0),u16(0),u32(crc),u32(data.length),u32(data.length),u16(name.length),u16(0));parts.push(new Uint8Array(head),name,data);central.push(new Uint8Array([].concat(u32(0x02014b50),u16(20),u16(20),u16(0x0800),u16(0),u16(0),u16(0),u32(crc),u32(data.length),u32(data.length),u16(name.length),u16(0),u16(0),u16(0),u16(0),u32(0),u32(off))),name);off+=head.length+name.length+data.length});
  var cdStart=off,cdLen=0;central.forEach(function(c){parts.push(c);cdLen+=c.length});parts.push(new Uint8Array([].concat(u32(0x06054b50),u16(0),u16(0),u16(files.length),u16(files.length),u32(cdLen),u32(cdStart),u16(0))));return new Blob(parts,{type:'application/zip'})}
function download(blob,name){var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove()},500)}
var BIBT={'article-journal':'article','paper-conference':'inproceedings','book':'book','chapter':'incollection','webpage':'misc','dataset':'misc','report':'techreport','thesis':'phdthesis','software':'misc'};
var RIST={'article-journal':'JOUR','paper-conference':'CPAPER','book':'BOOK','chapter':'CHAP','webpage':'ELEC','dataset':'DATA','report':'RPRT','thesis':'THES','software':'COMP'};
function names(a){return (a||[]).map(function(p){return p.literal||(p.family+(p.given?', '+p.given:''))})}
function toBib(r){var f=[],add=function(k,v){if(v!==undefined&&v!==null&&v!=='')f.push('  '+k+' = {'+v+'}')};add('title',r.title);add('author',names(r.author).map(function(n){return n==='et al.'?'others':n}).join(' and '));add('year',r.issued&&r.issued['date-parts'][0][0]);add(r.type==='article-journal'?'journal':'booktitle',r['container-title']);add('volume',r.volume);add('number',r.issue);add('pages',r.page);add('publisher',r.publisher);add('doi',r.DOI);add('url',r.URL);if(r.lab&&r.lab.note)add('note',r.lab.note);return '@'+(BIBT[r.type]||'misc')+'{'+r.id+',\n'+f.join(',\n')+'\n}'}
function toRis(r){var L=['TY  - '+(RIST[r.type]||'GEN')],add=function(t,v){if(v)L.push(t+'  - '+v)};add('TI',r.title);names(r.author).forEach(function(n){add('AU',n)});add('PY',r.issued&&r.issued['date-parts'][0][0]);add('T2',r['container-title']);add('VL',r.volume);add('IS',r.issue);add('PB',r.publisher);add('DO',r.DOI);add('UR',r.URL);if(r.lab&&r.lab.note)add('N1',r.lab.note);L.push('ER  - ');return L.join('\r\n')}
function csvq(v){v=v==null?'':String(v);return /[",\n]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v}
var Pkg=(function(){
  function data(){return {KG:JSON.parse($('#kg-raw').textContent),REF:JSON.parse($('#refs-csl').textContent),META:JSON.parse($('#page-meta').textContent),LD:JSON.parse($('#kg-ld').textContent)}}
  function scope(G,s){if(s==='all')return G;var keep;if(s==='concepts')keep=function(n){return ['Concept','Method','Term','Distribution','Theory','Assumption','Metric'].indexOf(n.type)>=0};else if(s==='claims')keep=function(n){return ['Claim','Work','Question'].indexOf(n.type)>=0||G.edges.some(function(e){return (e.p==='lab:supports'&&e.o===n.id)})};else keep=function(n){return ['Concept','Method','Limitation'].indexOf(n.type)>=0};
    var N=G.nodes.filter(keep),ids={};N.forEach(function(n){ids[n.id]=1});var E=G.edges.filter(function(e){return ids[e.s]&&ids[e.o]&&(s!=='path'||['lab:prerequisiteOf','lab:hasLimitation','lab:addressedBy'].indexOf(e.p)>=0)});return {version:G.version,page:G.page,scope:s,nodes:N,edges:E}}
  function ttl(G){var L=['@prefix lab: <urn:lab:> .','@prefix skos: <http://www.w3.org/2004/02/skos/core#> .','@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .',''];function q(s){return '"'+String(s).replace(/\\/g,'\\\\').replace(/"/g,'\\"').replace(/\n/g,' ')+'"'}function iri(id){return '<urn:'+id.replace(/^lab:/,'lab:')+'>'}
    G.nodes.forEach(function(n){L.push(iri(n.id)+' a lab:'+n.type+' ;');L.push('  skos:prefLabel '+q(n.label.ko)+'@ko , '+q(n.label.en)+'@en'+((n.definition&&n.definition.ko)?' ;':' .'));if(n.definition&&n.definition.ko)L.push('  skos:definition '+q(n.definition.ko)+'@ko .')});L.push('');G.edges.forEach(function(e){L.push(iri(e.s)+' '+e.p+' '+iri(e.o)+' .')});return L.join('\n')}
  function nodesCsv(G){return ['id,type,label_ko,label_en,status,level,family,domain,page,anchor'].concat(G.nodes.map(function(n){return [n.id,n.type,n.label.ko,n.label.en,n.status,n.level||'',n.family||'',(n.domain||[]).join('|'),n.page,n.anchor].map(csvq).join(',')})).join('\r\n')}
  function edgesCsv(G){return ['source,predicate,target,anchor,confidence'].concat(G.edges.map(function(e){return [e.s,e.p,e.o,e.anchor,e.confidence].map(csvq).join(',')})).join('\r\n')}
  function prov(G,REF){var L=['item,kind,work,loc,factCard,confidence,verified,pageAnchor'];G.nodes.filter(function(n){return n.type==='Claim'}).forEach(function(n){(n.source||[]).forEach(function(s){L.push([n.id,'node',s.work||'',s.loc||'',(n.evidence||[]).join('|'),n.confidence,s.verified?'true':'false',n.anchor].map(csvq).join(','))})});return L.join('\r\n')}
  function readme(M,G,REF){var un=REF.filter(function(r){return r.lab&&r.lab.verified&&Object.keys(r.lab.verified).some(function(k){return !r.lab.verified[k]})});return ['온톨로지·서지 꾸러미 — '+M.title,'','시리즈: '+M.series+' '+M.number,'만든 날: '+new Date().toISOString().slice(0,10),'노드 '+G.nodes.length+' · 관계 '+G.edges.length+' · 문헌 '+REF.length,'','이 페이지 인용하기:',M.suggestedCitation,'','파일: manifest.json, page_meta.json, kg.json, kg.jsonld, kg.ttl, nodes.csv, edges.csv, references.csl.json, references.bib, references.ris, provenance.csv, README.txt','','확인 필요 항목:'].concat(un.map(function(r){return '- '+r.id+': '+Object.keys(r.lab.verified).filter(function(k){return !r.lab.verified[k]}).join(', ')})).concat(['','어휘 lab: 는 urn:lab: 로 두었다. 외부 온톨로지 대응은 확인한 것만 넣는다.']).join('\n')}
  function build(s){var D=data(),g=scope(D.KG,s);var files=[{name:'page_meta.json',text:JSON.stringify(D.META,null,2)},{name:'kg.json',text:JSON.stringify(g,null,2)},{name:'kg.jsonld',text:JSON.stringify(D.LD,null,2)},{name:'kg.ttl',text:ttl(g)},{name:'nodes.csv',text:'﻿'+nodesCsv(g)},{name:'edges.csv',text:'﻿'+edgesCsv(g)},{name:'references.csl.json',text:JSON.stringify(D.REF,null,2)},{name:'references.bib',text:D.REF.map(toBib).join('\n\n')},{name:'references.ris',text:D.REF.map(toRis).join('\r\n')},{name:'provenance.csv',text:'﻿'+prov(g,D.REF)},{name:'README.txt',text:readme(D.META,g,D.REF)}];
    files.unshift({name:'manifest.json',text:JSON.stringify({package:'lab-kg',version:D.META.version,page:D.META.number,created:new Date().toISOString().slice(0,10),scope:s,counts:{nodes:g.nodes.length,edges:g.edges.length,refs:D.REF.length},files:files.map(function(f){return f.name})},null,2)});return files}
  function init(){var sec=$('#export');if(!sec)return;var D=data(),sc='all';
    var claims=D.KG.nodes.filter(function(n){return n.type==='Claim'}),withSrc=claims.filter(function(n){return (n.source||[]).length}).length;
    var okRefs=D.REF.filter(function(r){return r.lab&&r.lab.verified&&r.lab.verified.title&&r.lab.verified.year}).length;
    $('#exK').innerHTML=[[D.KG.nodes.length,'노드','g'],[D.KG.edges.length,'관계','m'],[D.REF.length,'문헌','i'],[pct(okRefs/(D.REF.length||1),0),'제목·연도 확인된 문헌','a'],[pct(withSrc/(claims.length||1),0),'출처 있는 주장','g']].map(function(k){return '<div class="kpi '+k[2]+'"><b>'+k[0]+'</b><span>'+k[1]+'</span></div>'}).join('');
    var cite=$('#exCite');function showCite(f){cite.textContent=f==='bib'?toBib({id:'ahn2026'+D.META.number,type:'webpage',title:D.META.title,author:[{family:'안',given:'상선'}],issued:{'date-parts':[[2026]]},URL:D.META.url}):f==='ris'?toRis({type:'webpage',title:D.META.title,author:[{family:'안',given:'상선'}],issued:{'date-parts':[[2026]]},URL:D.META.url}):D.META.suggestedCitation}
    $$('#exCiteF .bt').forEach(function(b){b.addEventListener('click',function(){$$('#exCiteF .bt').forEach(function(x){x.setAttribute('aria-pressed','false')});b.setAttribute('aria-pressed','true');showCite(b.dataset.f)})});showCite('txt');
    $('#exCopy').addEventListener('click',function(){var t=cite.textContent;if(navigator.clipboard)navigator.clipboard.writeText(t).then(function(){$('#exCopy').textContent='복사됨'},function(){sel()});else sel();function sel(){var r=document.createRange();r.selectNodeContents(cite);var s=getSelection();s.removeAllRanges();s.addRange(r)}});
    var rl=$('#exRefs');rl.innerHTML=D.REF.map(function(r){var v=r.lab&&r.lab.verified||{},ok=v.title&&v.year;return '<li>'+esc(names(r.author).join(', '))+' ('+((r.issued&&r.issued['date-parts'][0][0])||'연도 미상')+'). '+esc(r.title)+(r['container-title']?'. <i>'+esc(r['container-title'])+'</i>':'')+(r.publisher?'. '+esc(r.publisher):'')+(r.URL?'. <a href="'+esc(r.URL)+'" target="_blank" rel="noopener">링크</a>':'')+' <span class="badge '+(ok?'ok':'no')+'">'+(ok?'확인됨':'확인 필요')+'</span> <span class="lvtag">'+({primary:'주 자료',background:'배경',data:'수치',figure:'그림',software:'도구'}[r.lab&&r.lab.role]||'참고')+'</span>'+(r.lab&&r.lab.note?'<br><small class="muted">'+esc(r.lab.note)+'</small>':'')+'</li>'}).join('');
    $$('#exScope .bt').forEach(function(b){b.addEventListener('click',function(){$$('#exScope .bt').forEach(function(x){x.setAttribute('aria-pressed','false')});b.setAttribute('aria-pressed','true');sc=b.dataset.s})});
    $('#exZip').addEventListener('click',function(){download(makeZip(build(sc)),'kg_'+D.META.number+'_'+sc+'.zip')});
    var fb=$('#exFiles');build('all').forEach(function(f){var b=h('button',{class:'bt',type:'button'},f.name);b.addEventListener('click',function(){var F=build(sc).filter(function(x){return x.name===f.name})[0];download(new Blob([F.text],{type:'text/plain;charset=utf-8'}),F.name)});fb.appendChild(b)});
    var todo=[];D.REF.forEach(function(r){var v=r.lab&&r.lab.verified||{};Object.keys(v).forEach(function(k){if(!v[k])todo.push(r.id+' · '+k)})});$('#exTodo').innerHTML=todo.length?todo.map(function(t){return '<li>'+esc(t)+'</li>'}).join(''):'<li>없음</li>';
    var nt=$('#exNote');if(nt)nt.textContent='출처 없는 주장은 꾸러미에 넣지 않았어요. 확인할 항목 '+todo.length+'개는 아래에 있어요.'}
  return {init:init,build:build};
})();

/* 연습 페이지: 입력 채점 */
function initPractice(){var score={};function upd(){$$('.scoreboard [data-wk]').forEach(function(d){var s=score[d.dataset.wk]||{ok:0,n:+d.dataset.n};var p=s.ok/(+d.dataset.n||1);d.querySelector('b').textContent=s.ok+'/'+d.dataset.n;d.className=s.ok?(p>=.7?'good':'low'):'';var g=d.querySelector('small');if(g)g.textContent=s.ok&&p<.7?'70% 미만 — 해설을 다시 보세요':''})}
  $$('.quiz[data-quiz]').forEach(function(box){box.addEventListener('click',function(e){var b=e.target.closest('.bt');if(!b)return;setTimeout(function(){var wk=box.dataset.wk;if(!wk)return;var ok=$$('.fb.ok',box).length;score[wk]=score[wk]||{ok:0};score[wk].okq=ok;score[wk].ok=(score[wk].okq||0)+(score[wk].okp||0);upd()},0)})});
  $$('.prac').forEach(function(p){var inp=$('input',p),btn=$('.chk',p),fb=$('.pfb',p),ans=+p.dataset.ans,tol=+p.dataset.tol,wk=p.dataset.wk,got=false;
    btn.addEventListener('click',function(){var v=parseFloat(String(inp.value).replace(/,/g,''));if(isNaN(v)){fb.textContent='숫자를 넣어 주세요.';return}var ok=Math.abs(v-ans)<=tol;fb.className='pfb '+(ok?'ok':'no');fb.style.color=ok?COL.g:COL.a;fb.textContent=ok?'맞아요. 아래 풀이와 같은 값이에요.':'다시 계산해 보세요. 허용 오차 ±'+tol+' 안이면 정답입니다.';if(ok&&!got){got=true;score[wk]=score[wk]||{ok:0};score[wk].okp=(score[wk].okp||0)+1;score[wk].ok=(score[wk].okq||0)+score[wk].okp;upd()}});
    $('.show',p).addEventListener('click',function(){p.classList.toggle('open')})});upd()}

/* 시작 */
function boot(){Cast.fill();Quiz.render();Gloss.apply();try{initSims()}catch(e){console.error(e)}
  (PD.duels||[]).forEach(function(d){Duel(d)});KG.init();Pkg.init();if($('.prac'))initPractice();
  Study.upd();window.addEventListener('resize',function(){mods.forEach(function(m){m.fn(0)})});mods.forEach(function(m){m.fn(0)});requestAnimationFrame(loop)}
