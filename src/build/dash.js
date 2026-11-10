
/* 동적 대시보드: 회차마다 한 화면(조절기 · 숫자 카드 4개 · 그림 2개 · 해석), 목차에서는 탭으로 13개 */
var DASHES={};
function niceTicks(lo,hi,n){var span=hi-lo||1,step=Math.pow(10,Math.floor(Math.log10(span/n))),e=span/n/step;step*=e>=5?10:e>=2?5:e>=1?2:1;var t=[],s=Math.ceil(lo/step)*step;for(var v=s;v<=hi+step*1e-6;v+=step)t.push(+v.toFixed(10));return t}
function dChart(c,spec,H){var W=fit(c,H),ctx=c.getContext('2d');ctx.clearRect(0,0,W,H);
  var L=52,R=14,T=30,B=40,pw=W-L-R,ph=H-T-B;txt(ctx,spec.title,L,18,COL.text,13,'left',true);
  if(spec.t==='bar'){var n=spec.vals.length,mx=spec.ymax||Math.max.apply(null,spec.vals.concat([1e-9]))*1.18,bw=pw/n;ctx.strokeStyle=COL.rule;ctx.beginPath();ctx.moveTo(L,T+ph+.5);ctx.lineTo(L+pw,T+ph+.5);ctx.stroke();
    if(spec.hline!=null){var hy=T+ph-spec.hline/mx*ph;ctx.save();ctx.setLineDash([5,4]);ctx.strokeStyle=COL.a;ctx.beginPath();ctx.moveTo(L,hy);ctx.lineTo(L+pw,hy);ctx.stroke();ctx.restore();txt(ctx,spec.hlabel||'',L+2,hy-5,COL.a,11,'left',true)}
    spec.vals.forEach(function(v,i){var bh=Math.max(0,v)/mx*ph,x=L+i*bw+bw*.2;ctx.fillStyle=(spec.cols&&spec.cols[i])||COL.s;ctx.fillRect(x,T+ph-bh,bw*.6,bh);txt(ctx,(spec.fy||String)(v),x+bw*.3,T+ph-bh-6,COL.text,bw<44?10:12,'center',true);txt(ctx,spec.labels[i],x+(spec.pair?bw*.8:bw*.3),T+ph+16,COL.muted,11,'center')});return}
  if(spec.t==='hist'){var bins=spec.bins||30,cnt=new Array(bins).fill(0),lo=spec.lo,hi=spec.hi;spec.vals.forEach(function(v){var k=Math.floor((v-lo)/(hi-lo)*bins);if(k>=0&&k<bins)cnt[k]++});var m=Math.max.apply(null,cnt)||1;
    ctx.fillStyle=spec.c||'rgba(63,95,168,.55)';cnt.forEach(function(k,i){var bh=k/m*ph;ctx.fillRect(L+i*pw/bins+1,T+ph-bh,pw/bins-2,bh)});
    ctx.strokeStyle=COL.rule;ctx.beginPath();ctx.moveTo(L,T+ph+.5);ctx.lineTo(L+pw,T+ph+.5);ctx.stroke();niceTicks(lo,hi,5).forEach(function(t){var x=L+(t-lo)/(hi-lo)*pw;txt(ctx,(spec.fx||String)(t),x,T+ph+16,COL.muted,11,'center')});
    (spec.marks||[]).forEach(function(mk,i){var x=L+(mk.x-lo)/(hi-lo)*pw;if(x<L||x>L+pw)return;ctx.save();ctx.strokeStyle=mk.c||COL.r;ctx.setLineDash([4,3]);ctx.beginPath();ctx.moveTo(x,T);ctx.lineTo(x,T+ph);ctx.stroke();ctx.restore();txt(ctx,mk.l,x+(i%2?-4:4),T+10+(i%3)*13,mk.c||COL.r,11,i%2?'right':'left',true)});
    if(spec.xl)txt(ctx,spec.xl,L+pw,H-6,COL.muted,11,'right');return}
  /* line */
  var xs=spec.xs,x0=xs[0],x1=xs[xs.length-1],ylo=spec.ymin,yhi=spec.ymax;if(ylo==null||yhi==null){var all=[];spec.ys.forEach(function(s){s.d.forEach(function(v){if(isFinite(v))all.push(v)})});if(ylo==null)ylo=Math.min.apply(null,all);if(yhi==null)yhi=Math.max.apply(null,all);if(yhi===ylo)yhi=ylo+1;var pad=(yhi-ylo)*.08;if(spec.ymin==null)ylo-=pad;if(spec.ymax==null)yhi+=pad}
  function X(v){return spec.logx?L+(Math.log(v)-Math.log(x0))/(Math.log(x1)-Math.log(x0))*pw:L+(v-x0)/(x1-x0)*pw}function Y(v){return T+ph-(v-ylo)/(yhi-ylo)*ph}
  ctx.strokeStyle=COL.rule;ctx.lineWidth=1;niceTicks(ylo,yhi,4).forEach(function(t){var y=Y(t);ctx.beginPath();ctx.moveTo(L,y+.5);ctx.lineTo(L+pw,y+.5);ctx.stroke();txt(ctx,(spec.fy||String)(t),L-6,y+4,COL.muted,11,'right')});
  var xt=spec.logx?[1,3,10,30,100,300,1000,3000,10000,30000,100000].filter(function(v){return v>=x0&&v<=x1}):niceTicks(x0,x1,5);xt.forEach(function(t){txt(ctx,(spec.fx||String)(t),X(t),T+ph+16,COL.muted,11,'center')});
  if(spec.band){ctx.fillStyle='rgba(19,138,82,.08)';var b=spec.band,b0=clamp(X(b[0]),L,L+pw),b1=clamp(X(b[1]),L,L+pw);if(b1>b0)ctx.fillRect(b0,T,b1-b0,ph)}
  if(spec.hline!=null){ctx.save();ctx.setLineDash([5,4]);ctx.strokeStyle=COL.a;ctx.beginPath();ctx.moveTo(L,Y(spec.hline));ctx.lineTo(L+pw,Y(spec.hline));ctx.stroke();ctx.restore();txt(ctx,spec.hlabel||'',L+pw-2,Y(spec.hline)<T+16?Y(spec.hline)+14:Y(spec.hline)-5,COL.a,11,'right',true)}
  var lx=L+pw;spec.ys.forEach(function(s,si){ctx.save();ctx.strokeStyle=s.c;ctx.lineWidth=s.w||2.2;if(s.dash)ctx.setLineDash(s.dash);ctx.beginPath();var st=false;s.d.forEach(function(v,i){if(!isFinite(v)){st=false;return}var px=X(xs[i]),py=Y(clamp(v,ylo,yhi));if(!st){ctx.moveTo(px,py);st=true}else ctx.lineTo(px,py)});ctx.stroke();if(s.fill){ctx.lineTo(X(x1),Y(ylo));ctx.lineTo(X(x0),Y(ylo));ctx.closePath();ctx.globalAlpha=.12;ctx.fillStyle=s.c;ctx.fill()}ctx.restore();
    if(s.n&&spec.ys.length>1){ctx.save();ctx.font='700 11px "IBM Plex Sans KR",system-ui,sans-serif';var tw=ctx.measureText('● '+s.n).width;ctx.restore();lx-=tw+12;txt(ctx,'● '+s.n,lx+12,18,s.c,11,'left',true)}});
  if(spec.mark&&X(spec.mark.x)>=L-1&&X(spec.mark.x)<=L+pw+1){var mx_=X(spec.mark.x);ctx.save();ctx.strokeStyle=COL.r;ctx.setLineDash([4,3]);ctx.beginPath();ctx.moveTo(mx_,T);ctx.lineTo(mx_,T+ph);ctx.stroke();ctx.restore();if(spec.mark.y!=null){ctx.fillStyle=COL.r;ctx.beginPath();ctx.arc(mx_,Y(clamp(spec.mark.y,ylo,yhi)),5,0,7);ctx.fill()}if(spec.mark.l)txt(ctx,spec.mark.l,mx_+(mx_>L+pw*.7?-6:6),T+ph-8,COL.r,11,mx_>L+pw*.7?'right':'left',true)}
  if(spec.xl)txt(ctx,spec.xl,L+pw,H-4,COL.muted,11,'right');if(spec.yl)txt(ctx,spec.yl,4,T-10+0,COL.muted,11,'left')}

function Dash(el,key){var D=DASHES[key];if(!D){el.innerHTML='';return}el.innerHTML='';var p={},seed=1,ctl={},playing=false;
  var head=h('div',{class:'dhead'});head.innerHTML='<div><span class="eyebrow">동적 대시보드 · '+esc(D.tag||'')+'</span><h3>'+D.title+'</h3><p class="muted" style="font-size:14px">'+(D.sub||'')+'</p></div>';var hb=h('div',{class:'dbtns'});head.appendChild(hb);el.appendChild(head);
  var row=ctrlRow(el);var K=kpis(el,4);var g=h('div',{class:'dgrid'});el.appendChild(g);var c1=mkCanvas(g,240,D.title+' 그림 1'),c2=mkCanvas(g,240,D.title+' 그림 2');var I=insight(el);
  D.params.forEach(function(q){p[q[0]]=q[5];ctl[q[0]]=slider(row,q[1],q[2],q[3],q[4],q[5],q[6],function(v){p[q[0]]=v;draw()})});
  var pb=action(hb,'▶ 재생: '+(D.playLabel||'천천히 바꿔 보기'),function(){if(playing){playing=false;return}var q=D.params.filter(function(x){return x[0]===D.play})[0];if(!q)return;if(reduce){ctl[q[0]].set(q[3]);return}playing=true;pb.textContent='■ 멈춤';var t0=null,from=q[2],to=q[3];function step(ts){if(!playing){pb.textContent='▶ 재생: '+(D.playLabel||'천천히 바꿔 보기');return}if(!t0)t0=ts;var u=Math.min(1,(ts-t0)/4500),v=from+(to-from)*(D.playLog?(Math.pow(to/from,u)*from-from)/(to-from):u);v=Math.round(v/q[4])*q[4];ctl[q[0]].set(+v.toFixed(6));if(u<1)requestAnimationFrame(step);else{playing=false;pb.textContent='▶ 재생: '+(D.playLabel||'천천히 바꿔 보기')}}requestAnimationFrame(step)},true);
  if(D.random)action(hb,'↻ 다시 뽑기',function(){seed++;draw()});
  action(hb,'처음 값',function(){playing=false;D.params.forEach(function(q){ctl[q[0]].set(q[5])})});
  function draw(){var o=D.f(p,rng(seed*7919+13));K(o.k);dChart(c1,o.c[0],240);dChart(c2,o.c[1],240);I(o.note);c1._spec=o.c[0];c2._spec=o.c[1]}
  addMod(c1,function(dt){if(!dt&&c1._spec){dChart(c1,c1._spec,240);dChart(c2,c2._spec,240)}});draw();return {stop:function(){playing=false}}}
function initDash(){var el=$('.dash[data-dash]');if(el)Dash(el,el.dataset.dash);var tabs=$('.dtabs');if(tabs){var box=$('#dashbox'),cur=null;$$('button',tabs).forEach(function(b){b.addEventListener('click',function(){$$('button',tabs).forEach(function(x){x.setAttribute('aria-pressed','false')});b.setAttribute('aria-pressed','true');if(cur)cur.stop();cur=Dash(box,b.dataset.k);var a=$('#dashlink');if(a){a.href=b.dataset.f+'#dash';a.textContent=(+b.dataset.k)+'회차 해설 페이지에서 자세히 보기 →'}})});var f=$('button',tabs);if(f)f.click()}}

function rng0(){return 0}
function seqv(a,b,n){var o=[];for(var i=0;i<n;i++)o.push(a+(b-a)*i/(n-1));return o}
function logseq(a,b,n){var o=[];for(var i=0;i<n;i++)o.push(a*Math.pow(b/a,i/(n-1)));return o}
function lgam(x){var c=[76.18009172947146,-86.50532032941677,24.01409824083091,-1.231739572450155,.1208650973866179e-2,-.5395239384953e-5],y=x,t=x+5.5;t-=(x+.5)*Math.log(t);var s=1.000000000190015;for(var j=0;j<6;j++)s+=c[j]/++y;return -t+Math.log(2.5066282746310005*s/x)}
function betaPdf(x,a,b){if(x<=0||x>=1)return 0;return Math.exp((a-1)*Math.log(x)+(b-1)*Math.log(1-x)+lgam(a+b)-lgam(a)-lgam(b))}
function normCdf(z){var t=1/(1+.2316419*Math.abs(z)),d=.3989423*Math.exp(-z*z/2),p=d*t*(.3193815+t*(-.3565638+t*(1.781478+t*(-1.821256+t*1.330274))));return z>0?1-p:p}
function P1(v){return (v*100).toFixed(1)+'%'}function P0(v){return Math.round(v*100)+'%'}
function won(v){return Math.abs(v)>=1e8?(v/1e8).toFixed(1)+'억':Math.abs(v)>=1e4?nf(Math.round(v/1e4))+'만':nf(Math.round(v))}

/* 1회차 — 표본 크기와 오차범위 */
DASHES['01']={tag:'1회차',title:'여론조사 표본 크기 대시보드',sub:'몇 명에게 물어야 믿을 만한가 — 표본 크기와 오차범위',play:'n',playLog:true,playLabel:'표본을 100명→5,000명으로',random:true,
  params:[['n','표본 크기 n',100,5000,50,1000,function(v){return nf(v)+'명'}],['p','실제 지지율',10,90,1,52,function(v){return v+'%'}]],
  f:function(q,r){var p=q.p/100,se=Math.sqrt(p*(1-p)/q.n),moe=1.96*se,vals=[];for(var i=0;i<400;i++){var s=p+se*gauss(r);vals.push(s*100)}var inside=vals.filter(function(v){return Math.abs(v/100-p)<=moe}).length/400,ns=logseq(100,5000,60);
    return {k:[['±'+(moe*100).toFixed(1)+'%p','95% 오차범위','i'],[nf(q.n)+'명','표본 크기','a'],[P0(inside),'400번 조사 중 오차범위 안','g'],[nf(Math.ceil(q.n*4))+'명','오차범위를 절반으로 줄이려면','r']],
      c:[{t:'hist',title:'같은 조사를 400번 했을 때 나온 지지율',vals:vals,lo:q.p-12,hi:q.p+12,bins:36,fx:function(v){return v+'%'},marks:[{x:q.p,l:'실제 '+q.p+'%',c:COL.g},{x:q.p-moe*100,l:'−오차',c:COL.r},{x:q.p+moe*100,l:'+오차',c:COL.r}]},
        {t:'line',title:'표본 크기에 따른 오차범위',xs:ns,logx:true,ys:[{n:'오차범위',c:COL.s,d:ns.map(function(n){return 1.96*Math.sqrt(p*(1-p)/n)*100})}],ymin:0,fy:function(v){return '±'+v.toFixed(0)+'%p'},fx:function(v){return nf(v)},mark:{x:q.n,y:moe*100,l:'지금 '+nf(q.n)+'명'},xl:'표본 크기(로그 눈금)'}],
      note:[['g','표본을 4배로 늘려야 오차범위가 절반이 됩니다. 오차는 √n에 반비례하기 때문이에요.'],['a','단, 무작위로 뽑았을 때 이야기예요. 자발적으로 응답한 2만 명은 이 공식이 통하지 않습니다(1회차 대결).']]}}};

/* 2회차 — 두 자산 포트폴리오 */
DASHES['02']={tag:'2회차',title:'두 자산 포트폴리오 대시보드',sub:'상관계수가 위험을 얼마나 줄이나 (주식 σ 20%, 채권 σ 10% 예시)',play:'rho',playLabel:'상관계수를 −1→+1로',
  params:[['w','주식 비중',0,100,5,50,function(v){return v+'%'}],['rho','상관계수 ρ',-1,1,.1,-.5,function(v){return v.toFixed(1)}]],
  f:function(q){var s1=.2,s2=.1,m1=.08,m2=.03;function risk(w,rho){return Math.sqrt(w*w*s1*s1+(1-w)*(1-w)*s2*s2+2*w*(1-w)*rho*s1*s2)}var w=q.w/100,rk=risk(w,q.rho),ws=seqv(0,1,51),mn=Math.min.apply(null,ws.map(function(x){return risk(x,q.rho)})),wmin=ws.filter(function(x){return risk(x,q.rho)===mn})[0];
    return {k:[[P1(rk),'포트폴리오 위험(σ)','r'],[P1(w*m1+(1-w)*m2),'기대수익률(예시)','g'],[P1(w*s1+(1-w)*s2-rk),'분산으로 줄어든 위험','i'],[P0(wmin),'위험이 가장 작은 주식 비중','a']],
      c:[{t:'line',title:'주식 비중별 위험 — 지금 ρ와 ρ=+1 비교',xs:ws.map(function(x){return x*100}),ys:[{n:'ρ = '+q.rho.toFixed(1),c:COL.s,d:ws.map(function(x){return risk(x,q.rho)*100})},{n:'ρ = +1 (분산 효과 없음)',c:COL.muted,dash:[5,4],w:1.5,d:ws.map(function(x){return risk(x,1)*100})}],ymin:0,fy:function(v){return v+'%'},fx:function(v){return v+'%'},mark:{x:q.w,y:rk*100,l:'지금'},xl:'주식 비중'},
        {t:'bar',title:'같은 비중에서 상관계수별 위험',labels:['ρ=−1','ρ=−0.5','ρ=0','ρ=+0.5','ρ=+1'],vals:[-1,-.5,0,.5,1].map(function(x){return risk(w,x)*100}),cols:[-1,-.5,0,.5,1].map(function(x){return Math.abs(x-q.rho)<.05?COL.r:'rgba(63,95,168,.55)'}),fy:function(v){return v.toFixed(1)+'%'}}],
      note:[['g','상관계수가 낮을수록 같은 비중에서도 위험이 줄어요. 함께 오르내리지 않으면 서로를 받쳐 주기 때문입니다.'],['a','ρ = −1이면 위험을 0으로 만들 수도 있지만, 현실에서 완전한 반대 자산은 드물어요. 교육용 예시이며 투자 자문이 아닙니다.']]}}};

/* 3회차 — 기저율과 사후확률 */
DASHES['03']={tag:'3회차',title:'기저율 대시보드',sub:'검사에서 양성이 나왔을 때 정말 그럴 확률(사후확률)',play:'base',playLog:true,playLabel:'기저율을 0.1%→30%로',
  params:[['base','기저율(원래 비율)',.1,30,.1,.1,function(v){return v+'%'}],['sens','민감도(있을 때 양성)',50,99.9,.1,90,function(v){return v+'%'}],['spec','특이도(없을 때 음성)',50,99.9,.1,90,function(v){return v+'%'}]],
  f:function(q){var b=q.base/100,se=q.sens/100,sp=q.spec/100;function post(b,k){var o=b/(1-b)*Math.pow(se/(1-sp),k);return o/(1+o)}var pp=post(b,1),bs=logseq(.001,.5,60),tp=b*10000*se,fp=(1-b)*10000*(1-sp);
    return {k:[[P1(pp),'양성일 때 진짜일 확률','r'],[nf(Math.round(tp)),'1만 명 중 진짜 양성','g'],[nf(Math.round(fp)),'1만 명 중 가짜 양성','a'],[P1(post(b,2)),'두 번 연속 양성이면','i']],
      c:[{t:'line',title:'기저율에 따른 사후확률(양성 1번)',xs:bs.map(function(x){return x*100}),logx:true,ys:[{n:'사후확률',c:COL.s,d:bs.map(function(x){return post(x,1)*100})}],ymin:0,ymax:100,fy:function(v){return v+'%'},fx:function(v){return v<1?v.toFixed(1)+'%':v+'%'},mark:{x:q.base,y:pp*100,l:'지금'},xl:'기저율(로그 눈금)'},
        {t:'bar',title:'양성이 연달아 나올 때마다 업데이트',labels:['사전','양성 1번','2번','3번'],vals:[0,1,2,3].map(function(k){return post(b,k)*100}),cols:[COL.muted,COL.s,COL.s,COL.g],ymax:110,fy:function(v){return v.toFixed(1)+'%'},hline:50,hlabel:'50%'}],
      note:[['g','기저율이 낮으면 정확한 검사라도 양성의 상당수가 가짜예요. 가짜 양성 수가 진짜 양성 수를 앞지르기 때문입니다.'],['a','증거가 쌓이면 어제의 사후확률이 오늘의 사전확률이 됩니다. 이것이 베이지안 업데이트예요.']]}}};

/* 4회차 — A/B 테스트 P(B>A) */
DASHES['04']={tag:'4회차',title:'A/B 테스트 대시보드',sub:'버튼 A·B 구매 전환율과 "B가 A보다 나을 확률"',play:'n',playLog:true,playLabel:'방문자를 200명→2만 명으로',
  params:[['n','버튼별 방문자 수',200,20000,100,10000,function(v){return nf(v)+'명'}],['pa','A 전환율',1,10,.1,3,function(v){return v.toFixed(1)+'%'}],['pb','B 전환율',1,10,.1,3.6,function(v){return v.toFixed(1)+'%'}]],
  f:function(q){var n=q.n,ka=Math.round(n*q.pa/100),kb=Math.round(n*q.pb/100);function pBA(n){var ka=n*q.pa/100,kb=n*q.pb/100,a1=ka+1,b1=n-ka+1,a2=kb+1,b2=n-kb+1,m1=a1/(a1+b1),m2=a2/(a2+b2),v1=a1*b1/((a1+b1)*(a1+b1)*(a1+b1+1)),v2=a2*b2/((a2+b2)*(a2+b2)*(a2+b2+1));return normCdf((m2-m1)/Math.sqrt(v1+v2))}
    var pr=pBA(n),lo=Math.max(0,Math.min(q.pa,q.pb)/100-.025),hi=Math.max(q.pa,q.pb)/100+.025,xs=seqv(lo,hi,160),ns=logseq(200,20000,50);
    return {k:[[P1(pr),'B가 A보다 나을 확률','g'],[ka+' / '+kb,'구매 수 A / B','i'],[(q.pa?((q.pb-q.pa)/q.pa*100):0).toFixed(0)+'%','상대 개선','a'],[pr>=.95?'B 적용':pr<=.05?'A 유지':'더 모으기','95% 기준 결정','r']],
      c:[{t:'line',title:'두 버튼 전환율의 사후분포 Beta(구매+1, 미구매+1)',xs:xs.map(function(x){return x*100}),ys:[{n:'A',c:COL.muted,fill:1,d:xs.map(function(x){return betaPdf(x,ka+1,n-ka+1)})},{n:'B',c:COL.s,fill:1,d:xs.map(function(x){return betaPdf(x,kb+1,n-kb+1)})}],ymin:0,fy:function(){return ''},fx:function(v){return v.toFixed(1)+'%'},xl:'전환율'},
        {t:'line',title:'방문자가 쌓일수록 P(B>A)',xs:ns,logx:true,ys:[{n:'P(B>A)',c:COL.g,d:ns.map(function(x){return pBA(x)*100})}],ymin:0,ymax:100,hline:95,hlabel:'결정 기준 95%',fy:function(v){return v+'%'},fx:function(v){return nf(v)},mark:{x:n,y:pr*100,l:'지금'},xl:'버튼별 방문자(로그 눈금)'}],
      note:[['g','방문자가 늘면 두 분포가 좁아지고 겹침이 줄어 P(B>A)가 커져요. 같은 차이라도 표본이 작으면 결정을 미룹니다.'],['a','"B가 나을 확률 99%"처럼 바로 쓸 수 있는 문장이 베이지안 A/B 테스트의 장점이에요. 첫날 숫자만 보고 정하면 안 됩니다(4회차 대결).']]}}};

/* 5회차 — 연관 규칙 */
DASHES['05']={tag:'5회차',title:'연관 규칙 대시보드',sub:'"A를 산 사람은 B도 산다"가 진짜 연관인가 — 지지도 · 신뢰도 · 향상도',play:'ab',playLabel:'함께 산 비율을 0→최대로',
  params:[['a','A(라면) 구매 비율',5,60,1,30,function(v){return v+'%'}],['b','B(김치) 구매 비율',5,60,1,20,function(v){return v+'%'}],['ab','둘 다 산 비율',0,30,.5,9,function(v){return v+'%'}]],
  f:function(q){var a=q.a/100,b=q.b/100,ab=Math.min(q.ab/100,a,b),conf=ab/a,lift=conf/b,abs=seqv(0,Math.min(a,b),40);
    return {k:[[P1(ab),'지지도 P(A∩B)','i'],[P1(conf),'신뢰도 P(B | A)','g'],[lift.toFixed(2)+'배','향상도 = 신뢰도 ÷ P(B)',lift>1.05?'g':lift<.95?'r':'a'],[lift>1.05?'함께 추천':lift<.95?'따로 추천':'관계 약함','판정','a']],
      c:[{t:'bar',title:'장바구니 100개 중',labels:['A만','둘 다','B만','둘 다 아님'],vals:[(a-ab)*100,ab*100,(b-ab)*100,Math.max(0,1-a-b+ab)*100],cols:['rgba(63,95,168,.55)',COL.g,'rgba(168,50,159,.55)','rgba(93,98,120,.35)'],fy:function(v){return v.toFixed(1)}},
        {t:'line',title:'둘 다 산 비율에 따른 향상도',xs:abs.map(function(x){return x*100}),ys:[{n:'향상도',c:COL.s,d:abs.map(function(x){return x/a/b})}],ymin:0,hline:1,hlabel:'1 = 우연과 같음',fy:function(v){return v.toFixed(1)},fx:function(v){return v.toFixed(0)+'%'},mark:{x:ab*100,y:lift,l:'지금'},xl:'둘 다 산 비율'}],
      note:[['g','신뢰도만 보면 속기 쉬워요. B가 원래 잘 팔리는 상품이면 신뢰도가 높아도 향상도는 1 근처입니다.'],['a','향상도가 1보다 크면 "A를 산 사람은 B를 평소보다 더 산다", 1보다 작으면 오히려 덜 산다는 뜻이에요.']]}}};

/* 6회차 — 대출 심사 */
DASHES['06']={tag:'6회차',title:'대출 심사 대시보드',sub:'사전 연체율의 오즈에 증거(우도비)를 곱해 사후 연체 확률을 구하고 기준과 비교 — 처음 값은 본문 칸 ①(3%, 추가 소득 0.6 × 다른 대출 1.4 ≈ 0.84)',play:'k',playLabel:'증거 묶음을 0→5개로',
  params:[['p0','사전 연체율',.5,10,.1,3,function(v){return v.toFixed(1)+'%'}],['lr','증거 묶음의 우도비',.2,5,.01,.84,function(v){return v.toFixed(2)+'배'}],['k','같은 증거 묶음 수',0,5,1,1,function(v){return v+'개'}],['cut','추가 심사 기준',1,10,.5,2,function(v){return v.toFixed(1)+'%'}]],
  f:function(q){function post(k){var o=q.p0/100/(1-q.p0/100)*Math.pow(q.lr,k);return o/(1+o)}var ps=post(q.k),ks=[0,1,2,3,4,5];
    return {k:[[P1(ps),'사후 연체 확률','r'],[P1(q.p0/100),'사전 연체율','i'],[Math.pow(q.lr,q.k).toFixed(2)+'배','오즈에 곱한 값','a'],[ps*100>q.cut?'추가 심사':'승인','기준 '+q.cut.toFixed(1)+'% 대비 판정',ps*100>q.cut?'r':'g']],
      c:[{t:'bar',title:'증거 묶음 수별 사후 연체 확률',labels:ks.map(function(k){return k+'개'}),vals:ks.map(function(k){return post(k)*100}),cols:ks.map(function(k){return k===q.k?COL.r:'rgba(63,95,168,.55)'}),hline:q.cut,hlabel:'기준',fy:function(v){return v.toFixed(1)+'%'}},
        {t:'line',title:'사전 연체율에 따른 사후 연체 확률(지금 신호 수)',xs:seqv(.5,10,40),ys:[{n:'사후',c:COL.r,d:seqv(.5,10,40).map(function(p){var o=p/100/(1-p/100)*Math.pow(q.lr,q.k);return o/(1+o)*100})},{n:'사전',c:COL.muted,dash:[5,4],w:1.5,d:seqv(.5,10,40)}],ymin:0,hline:q.cut,hlabel:'기준',fy:function(v){return v.toFixed(0)+'%'},fx:function(v){return v+'%'},mark:{x:q.p0,y:ps*100,l:'지금'},xl:'사전 연체율'}],
      note:[['g','처음 값이 본문 칸 ①과 같은 계산이에요(3% → 약 2.5%). 우도비가 확률에 바로 곱해지는 것이 아니라 오즈(되다 ÷ 안 되다)에 곱해집니다. 우도비를 1보다 크게 올려 위험 신호로 바꿔 보세요.'],['a','교육용 예시이며 실제 신용평가 기준이 아닙니다.']]}}};

/* 7회차 — 고객 생애가치 (본문 3칸 전이 표와 같은 모형) */
DASHES['07']={tag:'7회차',title:'고객 생애가치(CLV) 대시보드',sub:'활성 · 휴면 · 이탈 세 상태 마르코프 체인 — 본문 칸 ③과 같은 전이 표(5기, 활성 매출 5만 원·휴면 1만 원)',play:'r',playLabel:'활성 유지율을 40%→95%로',
  params:[['r','활성 유지율(활성→활성)',40,95,1,70,function(v){return v+'%'}],['q','휴면 복귀율(휴면→활성)',0,50,1,30,function(v){return v+'%'}],['disc','할인율',0,30,1,10,function(v){return v+'%'}]],
  f:function(q){function M(rr,qq){var rest=1-rr;return [[rr,rest*2/3,rest/3],[qq,Math.max(0,.8-qq),.2],[0,0,1]]}var rev=[50000,10000,0],T=5,dr=q.disc/100;
    function run(rr,qq,TT){var P=M(rr,qq),v=[1,0,0],tot=0,hist=[];for(var t=0;t<TT;t++){hist.push(v.slice());tot+=(v[0]*rev[0]+v[1]*rev[1])/Math.pow(1+dr,t);v=[v[0]*P[0][0]+v[1]*P[1][0],v[0]*P[0][1]+v[1]*P[1][1],v[0]*P[0][2]+v[1]*P[1][2]+v[2]]}hist.push(v);return {clv:tot,h:hist}}
    var o=run(q.r/100,q.q/100,T),o10=run(q.r/100,q.q/100,12),ts=seqv(0,12,13),rs=seqv(.4,.95,56),last=o.h[T];
    return {k:[[nf(Math.round(o.clv))+'원','고객 1명 생애가치(5기)','g'],[P1(last[0]),T+'기 뒤에도 활성일 확률','i'],[P1(last[2]),T+'기 안에 이탈할 확률','r'],['+'+nf(Math.round(run(Math.min(.95,q.r/100+.05),q.q/100,T).clv-o.clv))+'원','유지율 5%p 올리면','a']],
      c:[{t:'line',title:'신규 고객의 상태 분포가 기마다 변하는 모습',xs:ts,ys:[{n:'활성',c:COL.g,d:o10.h.map(function(v){return v[0]*100})},{n:'휴면',c:COL.a,d:o10.h.map(function(v){return v[1]*100})},{n:'이탈',c:COL.r,d:o10.h.map(function(v){return v[2]*100})}],ymin:0,ymax:100,fy:function(v){return v+'%'},fx:function(v){return v+'기'},band:[0,T],xl:'기 (색칠한 구간이 CLV 계산 5기)'},
        {t:'line',title:'활성 유지율에 따른 생애가치(5기)',xs:rs.map(function(x){return x*100}),ys:[{n:'CLV',c:COL.g,d:rs.map(function(x){return run(x,q.q/100,T).clv/1e4})}],ymin:0,fy:function(v){return v.toFixed(0)+'만'},fx:function(v){return v+'%'},mark:{x:q.r,y:o.clv/1e4,l:'지금'},xl:'활성 유지율'}],
      note:[['g','처음 값(유지율 70%, 복귀율 30%, 할인율 10%)이 본문 칸 ③의 141,900원과 같은 계산이에요. 이탈은 빠져나올 수 없는 상태라 시간이 갈수록 쌓입니다.'],['a','활성 유지율 몇 %p가 생애가치를 크게 바꿔요. 지금 매출보다 유지율이 더 큰 돈이 되는 이유입니다(7회차 대결).']]}}};

/* 8회차 — 몬테카를로 */
DASHES['08']={tag:'8회차',title:'몬테카를로 사업 가치 대시보드',sub:'불확실한 수요·가격을 수천 번 뽑아 연 이익의 분포를 봅니다 (예시값)',play:'n',playLog:true,playLabel:'시뮬레이션을 100번→2만 번으로',random:true,
  params:[['n','시뮬레이션 횟수',100,20000,100,2000,function(v){return nf(v)+'번'}],['mu','평균 판매량(만 개)',5,30,1,15,function(v){return v+'만 개'}],['cv','판매량 불확실성',5,60,1,30,function(v){return v+'%'}],['fix','고정비(억 원)',1,20,.5,8,function(v){return v+'억'}]],
  f:function(q,r){var vals=[],run=[],sum=0;for(var i=0;i<q.n;i++){var s=Math.max(0,q.mu*(1+q.cv/100*gauss(r))),pr=1.2*(1+.1*gauss(r)),prof=s*1e4*pr*1e4/1e8-q.fix-s*1e4*0.5e4/1e8;vals.push(prof);sum+=prof;if(i%Math.max(1,Math.floor(q.n/80))===0)run.push([i+1,sum/(i+1)])}
    var so=vals.slice().sort(function(a,b){return a-b}),Q=function(p){return so[Math.floor(p*(so.length-1))]},loss=vals.filter(function(v){return v<0}).length/vals.length,lo=Q(.005),hi=Q(.995);
    return {k:[[Q(.1).toFixed(1)+'억','P10 (나쁜 경우)','r'],[Q(.5).toFixed(1)+'억','P50 (중간)','i'],[Q(.9).toFixed(1)+'억','P90 (좋은 경우)','g'],[P1(loss),'손실 날 확률','a']],
      c:[{t:'hist',title:nf(q.n)+'번 뽑은 연 이익의 분포',vals:vals,lo:lo,hi:hi,bins:40,fx:function(v){return v.toFixed(0)+'억'},marks:[{x:Q(.1),l:'P10',c:COL.r},{x:Q(.5),l:'P50',c:COL.s},{x:Q(.9),l:'P90',c:COL.g},{x:0,l:'손익 0',c:COL.a}]},
        {t:'line',title:'뽑을수록 평균이 안정된다',xs:run.map(function(x){return x[0]}),ys:[{n:'누적 평균',c:COL.s,d:run.map(function(x){return x[1]})}],fy:function(v){return v.toFixed(1)+'억'},fx:function(v){return nf(v)},xl:'시뮬레이션 횟수'}],
      note:[['g','한 숫자(평균) 대신 P10·P50·P90 세 숫자로 말하면 "최악이면 얼마"까지 함께 보고할 수 있어요.'],['a','"↻ 다시 뽑기"를 눌러 보세요. 100번이면 숫자가 크게 흔들리고, 1만 번이면 거의 같습니다(8회차 대결).']]}}};

/* 9회차 — 교란 요인 */
DASHES['09']={tag:'9회차',title:'교란 요인 대시보드',sub:'계절이 광고비와 매출을 함께 움직이면, 광고 효과를 얼마나 잘못 읽게 될까',play:'g',playLabel:'계절 영향을 0→3으로',random:true,
  params:[['beta','광고의 진짜 효과',0,2,.1,.5,function(v){return v.toFixed(1)}],['d','계절 → 광고비 강도',0,2,.1,1,function(v){return v.toFixed(1)}],['g','계절 → 매출 강도',0,3,.1,1.5,function(v){return v.toFixed(1)}]],
  f:function(q,r){var N=400,X=[],Y=[],S=[],sx=0,sy=0,sxx=0,sxy=0;for(var i=0;i<N;i++){var s=gauss(r),x=q.d*s+gauss(r),y=q.beta*x+q.g*s+gauss(r)*.8;X.push(x);Y.push(y);S.push(s)}
    function ols(X,Y){var mx=0,my=0;X.forEach(function(v,i){mx+=v;my+=Y[i]});mx/=X.length;my/=Y.length;var a=0,b=0;X.forEach(function(v,i){a+=(v-mx)*(Y[i]-my);b+=(v-mx)*(v-mx)});return a/b}
    var naive=ols(X,Y),theory=q.beta+q.g*q.d/(q.d*q.d+1),R=X.map(function(x,i){return x-q.d*S[i]}),Yr=Y.map(function(y,i){return y-q.g*S[i]}),adj=ols(R,Yr),gs=seqv(0,3,31);
    return {k:[[naive.toFixed(2),'계절을 무시한 추정','r'],[adj.toFixed(2),'계절을 보정한 추정','g'],[q.beta.toFixed(2),'진짜 효과(설정값)','i'],[(naive-q.beta>=0?'+':'')+(naive-q.beta).toFixed(2),'잘못 읽은 크기','a']],
      c:[{t:'bar',title:'광고 효과, 어떻게 읽느냐에 따라',labels:['진짜','무시','보정'],vals:[q.beta,naive,adj],cols:[COL.s,COL.r,COL.g],fy:function(v){return v.toFixed(2)}},
        {t:'line',title:'계절 영향이 클수록 커지는 착시',xs:gs,ys:[{n:'무시한 추정(이론)',c:COL.r,d:gs.map(function(g){return q.beta+g*q.d/(q.d*q.d+1)})},{n:'진짜',c:COL.g,dash:[5,4],d:gs.map(function(){return q.beta})}],ymin:0,fy:function(v){return v.toFixed(1)},fx:function(v){return v.toFixed(1)},mark:{x:q.g,y:theory,l:'지금'},xl:'계절 → 매출 강도'}],
      note:[['g','계절(교란 요인)을 그물에 넣고 보정하면 진짜 효과에 가까워져요. 베이지안 네트워크로 화살표를 그려 두는 이유입니다.'],['a','"광고비를 늘렸더니 매출이 늘었다"는 상관이에요. 둘 다 계절 탓일 수 있습니다.']]}}};

/* 10회차 — 나이브 베이즈 감성 */
DASHES['10']={tag:'10회차',title:'리뷰 감성 판정 대시보드',sub:'단어 하나하나가 증거 — 로그 오즈를 더해 긍정 확률을 구합니다 (우도비는 예시값)',play:'pos',playLabel:'"최고"를 0→6번으로',
  params:[['prior','긍정 리뷰 사전 비율',10,90,1,60,function(v){return v+'%'}],['pos','"최고" 등장 횟수 (우도비 4)',0,6,1,1,function(v){return v+'번'}],['neg','"별로" 등장 횟수 (우도비 1/5)',0,6,1,1,function(v){return v+'번'}],['mid','"배송" 등장 횟수 (우도비 1)',0,6,1,2,function(v){return v+'번'}]],
  f:function(q){var lp=Math.log(q.prior/(100-q.prior)),a=q.pos*Math.log(4),b=q.neg*Math.log(.2),tot=lp+a+b,pp=1/(1+Math.exp(-tot)),ks=[0,1,2,3,4,5,6];
    return {k:[[P1(pp),'긍정일 확률','g'],[tot.toFixed(2),'로그 오즈 합','i'],[pp>.5?'긍정':'부정','판정',pp>.5?'g':'r'],['0','"배송"이 더한 증거(우도비 1)','a']],
      c:[{t:'bar',title:'로그 오즈에 더해지는 증거',labels:['사전','"최고"','"별로"','"배송"','합계'],vals:[lp,a,b,0,tot].map(function(v){return v+6}),cols:[COL.muted,COL.g,COL.r,'rgba(93,98,120,.35)',COL.s],ymax:14,hline:6,hlabel:'0 (반반)',fy:function(v){return (v-6).toFixed(1)}},
        {t:'line',title:'"최고" 횟수에 따른 긍정 확률 ("별로" '+q.neg+'번일 때)',xs:ks,ys:[{n:'긍정 확률',c:COL.g,d:ks.map(function(k){return 100/(1+Math.exp(-(lp+k*Math.log(4)+b)))})}],ymin:0,ymax:100,hline:50,hlabel:'50%',fy:function(v){return v+'%'},fx:function(v){return v+'번'},mark:{x:q.pos,y:pp*100,l:'지금'},xl:'"최고" 등장 횟수'}],
      note:[['g','나이브 베이즈는 단어마다 로그 우도비를 더합니다. "배송"처럼 긍정·부정에 똑같이 나오는 단어는 증거가 0이에요.'],['a','단어들이 서로 독립이라는 가정은 거칠지만, 한 단어 규칙보다 훨씬 덜 틀립니다(10회차 대결).']]}}};

/* 11회차 — MC 드롭아웃 */
DASHES['11']={tag:'11회차',title:'예측 불확실성(MC 드롭아웃) 대시보드',sub:'같은 사진을 드롭아웃을 켠 채 여러 번 예측해 흔들림을 봅니다 (설명용 모형)',play:'ood',playLabel:'사진을 익숙함→낯섦으로',random:true,
  params:[['ood','사진이 얼마나 낯선가',0,1,.05,.2,function(v){return P0(v)}],['p','드롭아웃 비율',.05,.5,.05,.2,function(v){return P0(v)}],['T','반복 예측 횟수',5,200,5,50,function(v){return v+'번'}]],
  f:function(q,r){var sd=(.25+2.4*q.ood)*Math.sqrt(q.p/(1-q.p))*2,mu=2.2-1.8*q.ood,vals=[];for(var i=0;i<q.T;i++)vals.push(100/(1+Math.exp(-(mu+sd*gauss(r)))));var m=vals.reduce(function(a,b){return a+b},0)/q.T,s=Math.sqrt(vals.reduce(function(a,b){return a+(b-m)*(b-m)},0)/q.T),so=vals.slice().sort(function(a,b){return a-b}),os=seqv(0,1,21);
    function sdAt(o){var s_=(.25+2.4*o)*Math.sqrt(q.p/(1-q.p))*2,m_=2.2-1.8*o,rr=rng(99),v=[];for(var i=0;i<200;i++)v.push(100/(1+Math.exp(-(m_+s_*gauss(rr)))));var mm=v.reduce(function(a,b){return a+b},0)/200;return Math.sqrt(v.reduce(function(a,b){return a+(b-mm)*(b-mm)},0)/200)}
    return {k:[[m.toFixed(0)+'%','평균 "고양이" 확률','i'],['±'+s.toFixed(0)+'%p','흔들림(표준편차)','a'],[so[Math.floor(.05*(q.T-1))].toFixed(0)+'~'+so[Math.floor(.95*(q.T-1))].toFixed(0)+'%','90% 범위','g'],[s>15?'사람 확인':'자동 처리','판정 (흔들림 15%p 기준)',s>15?'r':'g']],
      c:[{t:'hist',title:q.T+'번 예측한 결과',vals:vals,lo:0,hi:100,bins:25,fx:function(v){return v+'%'},marks:[{x:m,l:'평균',c:COL.s}]},
        {t:'line',title:'사진이 낯설수록 커지는 흔들림',xs:os.map(function(x){return x*100}),ys:[{n:'표준편차',c:COL.a,d:os.map(sdAt)}],ymin:0,hline:15,hlabel:'사람 확인 기준',fy:function(v){return v.toFixed(0)+'%p'},fx:function(v){return v+'%'},mark:{x:q.ood*100,y:sdAt(q.ood),l:'지금'},xl:'낯선 정도'}],
      note:[['g','한 번 예측하면 "고양이 80%"라는 숫자만 나오지만, 여러 번 흔들어 보면 그 숫자를 얼마나 믿을지도 함께 나옵니다.'],['a','흔들림이 큰 사진만 사람에게 넘기면, 사람의 일은 줄고 실수는 덜 놓칩니다(11회차 대결).']]}}};

/* 12회차 — 지역별 마케팅 효과 계층 모형 (본문 칸 ②와 같은 숫자) */
DASHES['12']={tag:'12회차',title:'지역별 마케팅 효과 계층 모형 대시보드',sub:'매장이 적은 지역의 효과는 전체 평균 쪽으로 당겨 읽습니다 — 본문 칸 ②와 같은 다섯 지역(효과 단위 %)',play:'tau',playLabel:'지역 사이 차이 τ를 1→20으로',
  params:[['tau','지역 사이 차이 τ',1,20,.5,6,function(v){return v.toFixed(1)+'%p'}],['sig','매장 한 곳의 흔들림 σ',5,40,1,20,function(v){return v+'%p'}],['n1','제주 매장 수',1,60,1,3,function(v){return v+'곳'}]],
  f:function(q){var st=[{l:'제주',n:q.n1,m:25},{l:'강원',n:6,m:2},{l:'경기',n:40,m:8},{l:'서울',n:55,m:12},{l:'영남',n:25,m:11}],tot=0,nn=0;st.forEach(function(s){tot+=s.m*s.n;nn+=s.n});var mu=tot/nn;function w(n){return (n/(q.sig*q.sig))/(n/(q.sig*q.sig)+1/(q.tau*q.tau))}st.forEach(function(s){s.w=w(s.n);s.e=s.w*s.m+(1-s.w)*mu});var ns=seqv(1,80,60);
    return {k:[[st[0].e.toFixed(1)+'%','제주 계층 추정','g'],[st[0].m.toFixed(1)+'%','제주 원래 평균','r'],[P0(st[0].w),'제주 자기 평균의 무게 w','a'],[mu.toFixed(1)+'%','전체 평균(매장 수 가중)','i']],
      c:[{t:'bar',title:'원래 평균(옅은 색) vs 계층 추정(진한 색)',pair:1,labels:st.map(function(s){return s.l}).reduce(function(a,l){return a.concat([l,''])},[]),vals:st.reduce(function(a,s){return a.concat([s.m,s.e])},[]),cols:st.reduce(function(a){return a.concat(['rgba(210,63,44,.35)',COL.s])},[]),fy:function(v){return v.toFixed(1)}},
        {t:'line',title:'매장 수에 따른 자기 평균의 무게 w',xs:ns,ys:[{n:'w',c:COL.g,d:ns.map(function(n){return w(n)*100})}],ymin:0,ymax:100,fy:function(v){return v+'%'},fx:function(v){return v+'곳'},mark:{x:q.n1,y:st[0].w*100,l:'제주'},xl:'매장 수'}],
      note:[['g','매장 3곳뿐인 제주의 +25%는 우연일 수 있어 약 13%로 크게 당겨요(본문 칸 ②와 같은 계산). 매장 55곳인 서울은 거의 그대로입니다.'],['a','τ가 크면 "지역마다 원래 많이 다르다"고 보는 셈이라 덜 당겨지고, τ가 작으면 모두 전체 평균에 가까워집니다.']]}}};

/* 13회차 — 출시 의사결정 */
DASHES['13']={tag:'13회차',title:'앱 개편 출시 의사결정 대시보드',sub:'개선폭의 사후분포로 P(B>A)와 기대 이익을 함께 봅니다 — 처음 값은 본문 칸 ②(그룹당 500명, 20% → 24%)',play:'n',playLog:true,playLabel:'실험 사용자를 100→2만 명으로',
  params:[['n','그룹별 실험 사용자',100,20000,100,500,function(v){return nf(v)+'명'}],['base','기존 화면 가입률',2,40,.5,20,function(v){return v.toFixed(1)+'%'}],['lift','관측된 개선폭',-3,8,.5,4,function(v){return (v>=0?'+':'')+v.toFixed(1)+'%p'}],['users','연간 대상 사용자(만 명)',10,500,10,100,function(v){return v+'만'}]],
  f:function(q){var p=q.base/100,pb_=Math.min(.99,Math.max(.01,p+q.lift/100)),se=function(n){return Math.sqrt((p*(1-p)+pb_*(1-pb_))/n)*100},s=se(q.n),pr=normCdf(q.lift/s),val=5000,eg=q.users*1e4*val*(q.lift/100),xs=seqv(q.lift-4*s,q.lift+4*s,120),ns=logseq(100,20000,50);
    return {k:[[P1(pr),'B가 A보다 나을 확률','g'],[(q.lift-1.96*s).toFixed(2)+'~'+(q.lift+1.96*s).toFixed(2)+'%p','개선폭 95% 신용구간','i'],[won(eg)+'원','기대 연 추가 매출(가입 1건 5천 원, 예시)','a'],[pr>=.95?'전면 적용':pr>=.8?'단계적 적용':'보류','판정',pr>=.95?'g':pr>=.8?'a':'r']],
      c:[{t:'line',title:'개선폭의 사후분포 (0보다 큰 쪽이 B 우세)',xs:xs,ys:[{n:'사후분포',c:COL.s,fill:1,d:xs.map(function(x){return Math.exp(-.5*Math.pow((x-q.lift)/s,2))})}],ymin:0,band:[0,xs[xs.length-1]>0?xs[xs.length-1]:0],fy:function(){return ''},fx:function(v){return v.toFixed(1)+'%p'},mark:{x:0,l:'0 (차이 없음)'},xl:'개선폭(%p)'},
        {t:'line',title:'사용자가 쌓일수록 P(B>A)',xs:ns,logx:true,ys:[{n:'P(B>A)',c:COL.g,d:ns.map(function(n){return normCdf(q.lift/se(n))*100})}],ymin:0,ymax:100,hline:95,hlabel:'전면 적용 95%',fy:function(v){return v+'%'},fx:function(v){return nf(v)},mark:{x:q.n,y:pr*100,l:'지금'},xl:'그룹별 사용자(로그 눈금)'}],
      note:[['g','P(B>A) 하나만 보지 말고 개선폭의 범위와 돈으로 환산한 크기를 같이 보세요. 확실하지만 작은 개선도 있습니다.'],['a','80~95% 구간에서는 일부 사용자에게만 먼저 적용하는 단계적 출시가 안전해요(13회차 대결).']]}}};
