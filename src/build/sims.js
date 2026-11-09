/* 통계 팩 실험 모듈 (시드 고정, 설명용 모형) */
function S0(el,cfg,hgt,label){var c=mkCanvas(el,hgt,label,cfg.wide);return c}
function axes(ctx,x0,y0,w,hh,lo,hi,fmtf,n){ctx.save();ctx.strokeStyle=COL.rule;ctx.beginPath();ctx.moveTo(x0,y0-hh);ctx.lineTo(x0,y0);ctx.lineTo(x0+w,y0);ctx.stroke();n=n||4;for(var i=0;i<=n;i++){var v=lo+(hi-lo)*i/n,y=y0-hh*i/n;txt(ctx,fmtf?fmtf(v):v.toFixed(2),x0-6,y+4,COL.muted,10,'right');ctx.strokeStyle='rgba(93,98,120,.08)';ctx.beginPath();ctx.moveTo(x0,y);ctx.lineTo(x0+w,y);ctx.stroke()}ctx.restore()}
function quant(a,q){var s=a.slice().sort(function(x,y){return x-y});var k=(s.length-1)*q,f=Math.floor(k);return s[f]+(s[Math.min(s.length-1,f+1)]-s[f])*(k-f)}
function mean(a){return a.reduce(function(s,v){return s+v},0)/a.length}
function sd(a,pop){var m=mean(a);return Math.sqrt(a.reduce(function(s,v){return s+(v-m)*(v-m)},0)/(a.length-(pop?0:1)))}
function lbeta(a,b){return lgam(a)+lgam(b)-lgam(a+b)}
function lgam(x){var c=[76.18009172947146,-86.50532032941677,24.01409824083091,-1.231739572450155,0.1208650973866179e-2,-0.5395239384953e-5],y=x,t=x+5.5;t-=(x+.5)*Math.log(t);var s=1.000000000190015;for(var j=0;j<6;j++)s+=c[j]/++y;return -t+Math.log(2.5066282746310005*s/x)}
function bpdf(x,a,b){if(x<=0||x>=1)return 0;return Math.exp((a-1)*Math.log(x)+(b-1)*Math.log(1-x)-lbeta(a,b))}

/* 1 퍼짐: 평균·표준편차·변동계수 */
SIMS.spread=function(el,cfg){var c=S0(el,cfg,240,'두 선수의 월별 타율 꺾은선'),row=ctrlRow(el),K=kpis(el,3),I=insight(el),E=eqline(el),k=1;
  var A=cfg.A,B0=cfg.B,mB=mean(B0),months=cfg.labels;
  slider(row,'주판봇 선수의 기복',0,2,0.1,1,function(v){return '×'+v.toFixed(1)},function(v){k=v;draw()});
  function draw(){var B=B0.map(function(v){return mB+(v-mB)*k}),W=fit(c,240),ctx=c.getContext('2d');ctx.clearRect(0,0,W,240);grid(ctx,W,240);var x0=48,y0=204,w=W-70,hh=170,lo=cfg.lo,hi=cfg.hi;axes(ctx,x0,y0,w,hh,lo,hi,function(v){return v.toFixed(3)});
    [[A,COL.fly,cfg.nameA],[B,COL.robo,cfg.nameB]].forEach(function(s){ctx.strokeStyle=s[1];ctx.lineWidth=2.5;ctx.beginPath();s[0].forEach(function(v,i){var x=x0+w*(i+.5)/s[0].length,y=y0-hh*(v-lo)/(hi-lo);i?ctx.lineTo(x,y):ctx.moveTo(x,y)});ctx.stroke();s[0].forEach(function(v,i){var x=x0+w*(i+.5)/s[0].length,y=y0-hh*(v-lo)/(hi-lo);ctx.fillStyle=s[1];ctx.beginPath();ctx.arc(x,y,4,0,7);ctx.fill()})});
    months.forEach(function(m,i){txt(ctx,m,x0+w*(i+.5)/months.length,y0+16,COL.muted,11,'center')});txt(ctx,'● '+cfg.nameA,x0+8,22,COL.fly,12);txt(ctx,'● '+cfg.nameB,x0+130,22,COL.robo,12);stamp(ctx,W,'예시값');
    var ma=mean(A),mb=mean(B),sa=sd(A,true),sb=sd(B,true);K([[ma.toFixed(3)+' / '+mb.toFixed(3),'평균 (왼쪽 / 오른쪽)','g'],[sa.toFixed(3)+' / '+sb.toFixed(3),'표준편차','m'],[pct(sa/ma,1)+' / '+pct(sb/mb,1),'변동계수','a']]);
    E('변동계수 = <b>표준편차</b> ÷ <em>평균</em> × 100% → '+cfg.nameB+': '+sb.toFixed(3)+' ÷ '+mb.toFixed(3)+' = <i>'+pct(sb/mb,1)+'</i>');
    I([['g','두 선수의 평균은 거의 같아요. 평균만 보면 둘의 차이가 보이지 않습니다.'],[sb>sa*1.5?'r':'a',k===0?'기복을 0으로 줄이면 '+cfg.nameB+'의 표준편차도 0이 됩니다. 매달 같은 타율이라는 뜻이에요.':cfg.nameB+'의 표준편차가 '+(sb/sa).toFixed(1)+'배예요. 평균이 같아도 매달 성적이 더 크게 출렁입니다.']])}
  addMod(c,function(dt){if(!dt)draw()});draw()};

/* 2 여론조사: 표본 크기와 오차, 표본 편향 */
SIMS.poll=function(el,cfg){var c=S0(el,cfg,260,'여론조사 100번의 결과 점과 오차 막대'),row=ctrlRow(el),K=kpis(el,4),E=eqline(el),I=insight(el),n=1000,bias=0,seed=11,p=cfg.p;
  slider(row,'표본 크기 n',100,4000,100,n,function(v){return nf(v)+'명'},function(v){n=v;run()});
  buttons(row,'뽑는 법',[[0,'무작위'],[1,'자발적 응답']],0,function(v){bias=v;run()});
  action(row,'다시 100번 조사',function(){seed++;run()},true);
  var res=[];
  function run(){var r=rng(seed),q=bias?p+cfg.bias:p;res=[];for(var t=0;t<100;t++){var k=0;if(n>1500){k=Math.round(n*q+Math.sqrt(n*q*(1-q))*gauss(r))}else for(var i=0;i<n;i++)if(r()<q)k++;res.push(k/n)}draw()}
  function draw(){var W=fit(c,260),ctx=c.getContext('2d');ctx.clearRect(0,0,W,260);grid(ctx,W,260);var x0=50,w=W-70,lo=p-.12,hi=p+.12,y0=230,hh=200,moe=1.96*Math.sqrt(p*(1-p)/n);axes(ctx,x0,y0,w,hh,lo,hi,function(v){return pct(v,0)});
    var yT=y0-hh*(p-lo)/(hi-lo);ctx.strokeStyle=COL.g;ctx.setLineDash([5,4]);ctx.beginPath();ctx.moveTo(x0,yT);ctx.lineTo(x0+w,yT);ctx.stroke();ctx.setLineDash([]);txt(ctx,'실제 지지율 '+pct(p,0),x0+w-4,yT-6,COL.g,11,'right');
    var hit=0;res.forEach(function(v,i){var x=x0+w*(i+.5)/100,y=y0-hh*(clamp(v,lo,hi)-lo)/(hi-lo),m=hh*moe/(hi-lo),ok=Math.abs(v-p)<=moe;if(ok)hit++;ctx.strokeStyle=ok?'rgba(63,95,168,.55)':'rgba(210,63,44,.8)';ctx.beginPath();ctx.moveTo(x,y-m);ctx.lineTo(x,y+m);ctx.stroke();ctx.fillStyle=ok?COL.s:COL.r;ctx.beginPath();ctx.arc(x,y,2.4,0,7);ctx.fill()});stamp(ctx,W,'설명용 모형 · 실제 데이터 아님');
    var s=sd(res);K([['±'+pct(moe,1),'이론 오차범위(95%)','g'],[pct(s,1),'100번 결과의 표준편차','m'],[hit+'/100','참값을 포함한 막대','a'],[pct(mean(res)-p,1),'평균 치우침','r']]);
    E('오차범위 ≈ 1.96 × √(<em>p</em>(1−<em>p</em>) ÷ <b>n</b>) = 1.96 × √('+p+'×'+(1-p).toFixed(2)+' ÷ '+nf(n)+') = <i>±'+pct(moe,1)+'</i>');
    I(bias?[['r','자발적 응답은 지지자가 더 많이 답하는 상황을 넣었어요. 표본을 '+nf(n)+'명으로 늘려도 점들이 참값 위로 한꺼번에 밀려 있습니다.'],['a','표본을 키우면 흩어짐(무작위 오차)은 줄지만 치우침(편향)은 줄지 않아요.']]:[['g','무작위로 뽑으면 100번 중 대체로 95번 안팎이 참값을 품어요. 빨간 막대는 우연히 빗나간 조사입니다.'],['a','n을 4배로 늘리면 오차범위는 절반이 됩니다. 1,000명 ±3.1%, 4,000명 ±1.5%예요.']])}
  addMod(c,function(dt){if(!dt)draw()});run()};

/* 3 대수의 법칙: 동전·보험 */
SIMS.lln=function(el,cfg){var mode=cfg.mode||'coin',c=S0(el,cfg,250,mode==='coin'?'동전 앞면 비율이 0.5로 다가가는 선':'가입자 수에 따른 사고율의 흔들림'),row=ctrlRow(el),K=kpis(el,3),E=eqline(el),I=insight(el);
  if(mode==='coin'){var N=1000,seed=1,path=[],t=0,play=false;
    buttons(row,'던지는 횟수',[[100,'100번'],[1000,'1,000번'],[10000,'10,000번']],1000,function(v){N=v;reset()});
    var pb=action(row,'▶ 던지기',function(){if(t>=N)reset();play=!play;pb.textContent=play?'❚❚ 멈춤':'▶ 던지기'},true);action(row,'새 동전',function(){seed++;reset()});
    function reset(){var r=rng(seed),h=0;path=[];for(var i=1;i<=N;i++){if(r()<.5)h++;path.push(h/i)}t=reduce?N:0;play=false;pb.textContent='▶ 던지기';draw()}
    function draw(){var W=fit(c,250),ctx=c.getContext('2d');ctx.clearRect(0,0,W,250);grid(ctx,W,250);var x0=44,y0=220,w=W-60,hh=190;axes(ctx,x0,y0,w,hh,0,1,function(v){return v.toFixed(2)});var y5=y0-hh*.5;ctx.strokeStyle=COL.g;ctx.setLineDash([5,4]);ctx.beginPath();ctx.moveTo(x0,y5);ctx.lineTo(x0+w,y5);ctx.stroke();ctx.setLineDash([]);
      var m=Math.max(1,Math.floor(t));ctx.strokeStyle=COL.a;ctx.lineWidth=2;ctx.beginPath();for(var i=0;i<m;i++){var x=x0+w*Math.log(i+1)/Math.log(N),y=y0-hh*path[i];i?ctx.lineTo(x,y):ctx.moveTo(x,y)}ctx.stroke();txt(ctx,'가로축: 던진 횟수(로그 눈금) 1 → '+nf(N),x0+4,y0+16,COL.muted,11);stamp(ctx,W,'설명용 모형 · 시드 '+seed);
      var cur=path[m-1];K([[nf(m),'던진 횟수','i'],[cur.toFixed(3),'지금까지 앞면 비율','a'],[Math.abs(cur-.5).toFixed(3),'0.5와의 차이','g']]);E('앞면 비율 = <b>앞면 수</b> ÷ <em>던진 횟수</em> → 대수의 법칙: 횟수가 늘수록 <i>0.5</i>에 가까워진다');
      I([[m<100?'r':'g',m<100?'처음 몇 번은 비율이 0과 1 사이를 크게 오가요. 한두 번의 결과가 비율 전체를 흔들기 때문입니다.':'횟수가 쌓이면서 선이 0.5 주변에 가라앉아요. 동전이 "기억"해서가 아니라, 새 결과 하나가 전체에 미치는 무게가 작아지기 때문입니다.']])}
    addMod(c,function(dt){if(play&&t<N){t=Math.min(N,t+dt*N/4);draw();if(t>=N){play=false;pb.textContent='▶ 다시'}}else if(!dt)draw()});reset()}
  else{var n=10000,p=cfg.p||0.001;slider(row,'가입자 수',2,6,0.5,4,function(v){return nf(Math.round(Math.pow(10,v)))+'명'},function(v){n=Math.round(Math.pow(10,v));draw()});
    function draw(){var r=rng(5),ys=[];for(var y=0;y<60;y++)ys.push(poisR(r,n*p)/n);var W=fit(c,250),ctx=c.getContext('2d');ctx.clearRect(0,0,W,250);grid(ctx,W,250);var x0=56,y0=220,w=W-72,hh=190,hi=p*4;axes(ctx,x0,y0,w,hh,0,hi,function(v){return pct(v,2)});var yp=y0-hh*p/hi;ctx.strokeStyle=COL.g;ctx.setLineDash([5,4]);ctx.beginPath();ctx.moveTo(x0,yp);ctx.lineTo(x0+w,yp);ctx.stroke();ctx.setLineDash([]);
      ys.forEach(function(v,i){ctx.fillStyle=COL.s;ctx.beginPath();ctx.arc(x0+w*(i+.5)/60,y0-hh*Math.min(v,hi)/hi,3,0,7);ctx.fill()});txt(ctx,'60년 동안 해마다의 사고율',x0+4,y0+16,COL.muted,11);stamp(ctx,W,'설명용 모형 · 실제 데이터 아님');
      var s=Math.sqrt(p*(1-p)/n);K([[nf(Math.round(n*p)),'예상 사고 건수(1년)','i'],['±'+pct(1.96*s,3),'사고율의 흔들림(95%)','m'],[pct(1.96*s/p,0),'예상 대비 흔들림','a']]);E('사고율의 흔들림 ≈ √(<em>p</em>(1−<em>p</em>) ÷ <b>가입자 수</b>), p = '+pct(p,1));
      I([[n<10000?'r':'g',n<10000?'가입자가 적으면 어떤 해는 사고가 0건, 어떤 해는 예상의 몇 배가 나와요. 보험료를 정하기 어렵습니다.':'가입자가 많아지면 해마다의 사고율이 '+pct(p,1)+' 근처에 모여요. 개인에게는 불확실한 사고가 회사에게는 거의 확실한 숫자가 됩니다.']])}
    addMod(c,function(dt){if(!dt)draw()});draw()}};

/* 4 카드 표: 조건부 확률 */
SIMS.cards=function(el,cfg){var wrap=h('div',{class:'tw'}),row=ctrlRow(el),E=eqline(el),I=insight(el),ev='t2',cond='none';el.insertBefore(wrap,row);
  buttons(row,'구할 사건',[['t2','두 번째가 4']],'t2',function(){});buttons(row,'조건',[['none','조건 없음'],['t1','첫 번째가 2']],'none',function(v){cond=v;draw()});
  function draw(){var t='<table class="tb" style="min-width:360px;text-align:center"><tr><th>첫째 \\ 둘째</th><th>1</th><th>2</th><th>3</th><th>4</th></tr>',num=0,den=0;for(var a=1;a<=4;a++){t+='<tr><th>'+a+'</th>';for(var b=1;b<=4;b++){var poss=a!==b,inC=cond==='none'||a===2,inE=b===4;if(poss&&inC){den++;if(inE)num++}var bg=!poss?'background:#eceef5;color:#555':(inC&&inE?'background:rgba(19,138,82,.28)':inC?'background:rgba(37,99,201,.12)':'');t+='<td style="'+bg+'">'+(poss?'('+a+','+b+')':'×')+'</td>'}t+='</tr>'}wrap.innerHTML=t+'</table>';
    E(cond==='none'?'P(둘째=4) = <b>'+num+'</b> ÷ <em>'+den+'</em> = <i>'+(num/den).toFixed(3)+'</i> (= 1/4)':'P(둘째=4 | 첫째=2) = P(둘 다) ÷ P(첫째=2) = (1/12) ÷ (3/12) = <b>'+num+'</b> ÷ <em>'+den+'</em> = <i>'+(num/den).toFixed(3)+'</i> (= 1/3)');
    I([['a','× 칸은 같은 카드를 두 번 뽑는 경우라 일어날 수 없어요. 그래서 전체는 16칸이 아니라 12칸입니다.'],[cond==='none'?'g':'m',cond==='none'?'초록 칸 3개가 "둘째가 4"인 경우예요. 12칸 중 3칸이라 1/4입니다.':'조건을 걸면 볼 칸이 첫째=2인 한 줄(3칸)로 줄어요. 그중 둘째가 4인 칸은 1칸이라 1/3로 올라갑니다.']])}
  draw()};

/* 5 포트폴리오: 상관계수와 위험 */
SIMS.portfolio=function(el,cfg){var c=S0(el,cfg,260,'두 자산 수익률 점과 포트폴리오 위험'),row=ctrlRow(el),K=kpis(el,4),E=eqline(el),I=insight(el),rho=cfg.rho==null?-0.5:cfg.rho,w=0.5,s1=cfg.s1||.15,s2=cfg.s2||.15,mu=cfg.mu||.06;
  slider(row,'상관계수 ρ',-1,1,0.1,rho,function(v){return v.toFixed(1)},function(v){rho=v;draw()});slider(row,'첫 자산 비중',0,1,0.1,w,function(v){return pct(v,0)},function(v){w=v;draw()});
  function draw(){var r=rng(9),pts=[],pr=[];for(var i=0;i<300;i++){var z1=gauss(r),z2=rho*z1+Math.sqrt(Math.max(0,1-rho*rho))*gauss(r),a=mu+s1*z1,b=mu+s2*z2;pts.push([a,b]);pr.push(w*a+(1-w)*b)}
    var sp=Math.sqrt(w*w*s1*s1+(1-w)*(1-w)*s2*s2+2*w*(1-w)*rho*s1*s2),W=fit(c,260),ctx=c.getContext('2d');ctx.clearRect(0,0,W,260);grid(ctx,W,260);var half=Math.min(W*.48,260),cx=half/2+10,cy=130,sc=(half-30)/1.0;
    ctx.strokeStyle=COL.rule;ctx.strokeRect(10,10,half-20,240);pts.forEach(function(p){ctx.fillStyle='rgba(63,95,168,.6)';ctx.fillRect(cx+(p[0]-mu)*sc*1.6-1.5,cy-(p[1]-mu)*sc*1.6-1.5,3,3)});txt(ctx,'가로: 자산1 · 세로: 자산2',16,26,COL.muted,11);
    var x0=half+30,ww=W-x0-16;hist(ctx,x0,220,ww,170,pr,24,mu-.5,mu+.5,'rgba(168,50,159,.55)');hist(ctx,x0,220,ww,170,pts.map(function(p){return p[0]}),24,mu-.5,mu+.5,'rgba(210,63,44,.25)');txt(ctx,'분홍: 포트폴리오 · 빨강: 자산1 하나만',x0,236,COL.muted,11);txt(ctx,'-50%',x0,250,COL.muted,10);txt(ctx,'+50%',x0+ww,250,COL.muted,10,'right');stamp(ctx,W,'설명용 모형 · 실제 데이터 아님');
    var p10=quant(pr,.1),p10a=quant(pts.map(function(p){return p[0]}),.1);K([[pct(sp,1),'포트폴리오 위험(표준편차)','m'],[pct(s1,0),'자산1 하나의 위험','r'],[pct(p10,1),'최악 10% 해 (포트폴리오)','a'],[pct(p10a,1),'최악 10% 해 (자산1만)','r']]);
    E('위험 = √(<b>w</b>²σ₁² + (1−w)²σ₂² + 2w(1−w)<em>ρ</em>σ₁σ₂) = <i>'+pct(sp,1)+'</i>');
    I([[rho<0?'g':rho>.8?'r':'a',rho>=.99?'ρ = +1이면 두 자산이 똑같이 움직여 섞어도 위험이 줄지 않아요.':rho<=-.99&&Math.abs(w-.5)<.01?'ρ = −1이고 반반이면 서로의 흔들림을 완전히 지워 이론상 위험이 0이 됩니다.':'ρ가 '+rho.toFixed(1)+'일 때 반반으로 섞으면 위험이 '+pct(s1,0)+'에서 '+pct(sp,1)+'로 줄어요. 상관이 낮을수록 더 많이 줄어듭니다.'],['a','평균 수익률은 섞어도 그대로('+pct(mu,0)+')예요. 줄어드는 것은 흔들림입니다. 교육용이며 투자 자문이 아닙니다.']])}
  addMod(c,function(dt){if(!dt)draw()});draw()};

/* 6 점 격자: 기저율과 검사 */
SIMS.grid=function(el,cfg){var c=S0(el,cfg,300,'사람 1,000명 점 격자: 진양성·위양성·위음성·진음성'),row=ctrlRow(el),K=kpis(el,4),E=eqline(el),I=insight(el),pv=cfg.prev,se=cfg.sens,sp=cfg.spec,N=cfg.N||10000;
  slider(row,cfg.prevLabel||'유병률',-4,-0.3,0.05,Math.log10(pv),function(v){return pct(Math.pow(10,v),Math.pow(10,v)<.01?2:1)},function(v){pv=Math.pow(10,v);draw()});
  slider(row,'민감도',.5,1,.01,se,function(v){return pct(v,0)},function(v){se=v;draw()});slider(row,'특이도',.5,1,.01,sp,function(v){return pct(v,0)},function(v){sp=v;draw()});
  function draw(){var TP=N*pv*se,FN=N*pv*(1-se),FP=N*(1-pv)*(1-sp),TN=N*(1-pv)*sp,ppv=TP/(TP+FP);var W=fit(c,300),ctx=c.getContext('2d');ctx.clearRect(0,0,W,300);var cols=50,rows=20,cw=Math.min((W-20)/cols,13),x0=(W-cw*cols)/2;
    var k=1000,tp=Math.round(TP/N*k),fn=Math.round(FN/N*k),fp=Math.round(FP/N*k);if(TP>0&&tp===0)tp=1;var seq=[];for(var i=0;i<k;i++)seq.push(i<tp?'tp':i<tp+fn?'fn':i<tp+fn+fp?'fp':'tn');
    var cmap={tp:COL.g,fn:COL.a,fp:COL.r,tn:'rgba(93,98,120,.28)'};seq.forEach(function(s,i){var x=x0+(i%cols)*cw+cw/2,y=14+Math.floor(i/cols)*cw+cw/2;ctx.fillStyle=cmap[s];ctx.beginPath();ctx.arc(x,y,cw*.36,0,7);ctx.fill()});
    var ly=14+rows*cw+18;[['● 진짜 양성',COL.g],['● 놓친 환자',COL.a],['● 잘못 양성',COL.r],['● 바르게 음성',COL.muted]].forEach(function(l,i){txt(ctx,l[0],x0+i*Math.max(80,cw*cols/4),ly,l[1],12)});txt(ctx,'점 하나 = '+nf(N/1000)+'명',x0+cw*cols,ly+16,COL.muted,11,'right');stamp(ctx,W,'설명용 모형 · 예시값');
    K([[pct(ppv,1),'양성일 때 실제 환자일 확률','g'],[nf(Math.round(TP+FP)),'양성 판정 수 ('+nf(N)+'명 중)','i'],[nf(Math.round(TP)),'그중 실제 환자','g'],[nf(Math.round(FP)),'잘못 양성','r']]);
    E('P(환자 | 양성) = <b>민감도×유병률</b> ÷ (민감도×유병률 + <em>(1−특이도)×(1−유병률)</em>) = '+(TP/N).toFixed(5)+' ÷ '+((TP+FP)/N).toFixed(5)+' = <i>'+pct(ppv,1)+'</i>');
    I([[ppv<.2?'r':ppv<.6?'a':'g',ppv<.2?'환자가 드물면 빨간 점(잘못 양성)이 초록 점보다 훨씬 많아요. 양성이 나와도 실제 환자일 확률은 '+pct(ppv,1)+'에 그칩니다.':'유병률이 올라가면 초록 점의 비율이 커져 같은 검사라도 양성의 의미가 강해집니다.'],['a','"검사 정확도 '+pct(se,0)+'"는 환자를 양성으로 잡을 확률이에요. 양성일 때 환자일 확률과는 다른 숫자입니다.']])}
  addMod(c,function(dt){if(!dt)draw()});draw()};

/* 7 나이브 베이즈 (일반형) */
SIMS.nb=function(el,cfg){var tw=h('div',{class:'tw'}),c=S0(el,cfg,Math.max(150,cfg.classes.length*46+40),'분류별 사후확률 막대'),row=ctrlRow(el),K=kpis(el,3),E=eqline(el),I=insight(el),on=cfg.features.map(function(f){return !!f.on});el.insertBefore(tw,c.parentNode);
  var g=h('div',{class:'group'});g.appendChild(h('span',{class:'glabel'},cfg.fLabel||'관찰한 단서'));cfg.features.forEach(function(f,i){var b=h('button',{class:'bt',type:'button','aria-pressed':String(on[i])},f.name);b.addEventListener('click',function(){on[i]=!on[i];b.setAttribute('aria-pressed',String(on[i]));draw()});g.appendChild(b)});row.appendChild(g);
  function post(){var sc=cfg.classes.map(function(cl,ci){var p=cl.prior;cfg.features.forEach(function(f,i){if(on[i])p*=f.like[ci];else if(cfg.absent)p*=1-f.like[ci]});return p}),s=sc.reduce(function(a,b){return a+b},0);return {raw:sc,p:sc.map(function(v){return v/s})}}
  function draw(){var P=post();tw.innerHTML='<table class="tb" style="min-width:420px"><tr><th>'+(cfg.fLabel||'단서')+'</th>'+cfg.classes.map(function(cl){return '<th>P(단서 | '+esc(cl.name)+')</th>'}).join('')+'</tr><tr><td class="muted">사전확률</td>'+cfg.classes.map(function(cl){return '<td class="n">'+(cfg.priorTxt?cfg.priorTxt[cfg.classes.indexOf(cl)]:pct(cl.prior,1))+'</td>'}).join('')+'</tr>'+cfg.features.map(function(f,i){return '<tr style="opacity:'+(on[i]?1:.45)+'"><td>'+esc(f.name)+(on[i]?' ✓':'')+'</td>'+f.like.map(function(v,ci){return '<td class="n">'+(f.txt?f.txt[ci]:pct(v,1))+'</td>'}).join('')+'</tr>'}).join('')+'</table>';
    var hh=c._h,W=fit(c,hh),ctx=c.getContext('2d');ctx.clearRect(0,0,W,hh);var x0=110,w=W-180;P.p.forEach(function(v,i){var y=20+i*46;txt(ctx,cfg.classes[i].name,x0-10,y+20,COL.text,13,'right');ctx.fillStyle=COL.panel;ctx.fillRect(x0,y,w,28);ctx.fillStyle=i===P.p.indexOf(Math.max.apply(null,P.p))?COL.g:COL.s;ctx.fillRect(x0,y,w*v,28);txt(ctx,pct(v,1),x0+w+8,y+20,COL.text,13,'left',true)});stamp(ctx,W,cfg.stamp||'예시값');
    var best=P.p.indexOf(Math.max.apply(null,P.p)),n=on.filter(Boolean).length;K([[n+'개','켠 단서','i'],[esc(cfg.classes[best].name),'가장 그럴듯한 쪽','g'],[pct(P.p[best],1),'그 확률','a']]);
    var a=cfg.classes[0];E('P('+esc(a.name)+' | 단서) ∝ <em>사전확률</em> × '+(n?cfg.features.filter(function(f,i){return on[i]}).map(function(f){return 'P('+esc(f.name)+'|'+esc(a.name)+')'}).join(' × '):'(단서 없음)')+' → 모든 쪽 점수의 합으로 나눈 값 = <i>'+pct(P.p[0],1)+'</i>');
    I([[n?'g':'a',n?(cfg.msg||'단서를 켤 때마다 사전확률에 그 단서의 "가능도"를 곱해 갱신합니다.'):'단서를 하나도 켜지 않으면 사후확률은 사전확률과 같아요.'],['a','"나이브"는 단서끼리 서로 상관없다고 가정한다는 뜻이에요. 실제로는 함께 붙어 다니는 단어가 있어 확률이 과장될 수 있습니다.']])}
  addMod(c,function(dt){if(!dt)draw()});draw()};

/* 8 증거 사슬: 순차 업데이트 */
SIMS.chain=function(el,cfg){var c=S0(el,cfg,250,'증거를 하나씩 더할 때 사후확률 계단'),row=ctrlRow(el),K=kpis(el,3),E=eqline(el),I=insight(el),on=cfg.ev.map(function(){return true});
  var g=h('div',{class:'group'});g.appendChild(h('span',{class:'glabel'},'반영할 증거'));cfg.ev.forEach(function(e,i){var b=h('button',{class:'bt',type:'button','aria-pressed':'true'},e.name);b.addEventListener('click',function(){on[i]=!on[i];b.setAttribute('aria-pressed',String(on[i]));draw()});g.appendChild(b)});row.appendChild(g);
  var prior=cfg.prior;if(cfg.priorSlider)slider(row,cfg.priorLabel||'사전확률',cfg.pmin||0.01,cfg.pmax||0.9,cfg.pstep||0.01,prior,function(v){return pct(v,0)},function(v){prior=v;draw()});
  function step(p,e){if(e.lr!=null){var o=p/(1-p)*e.lr;return o/(1+o)}var a=e.pH*p,b=e.pN*(1-p);return a/(a+b)}
  function draw(){var ps=[prior],labs=['사전'];cfg.ev.forEach(function(e,i){if(on[i]){ps.push(step(ps[ps.length-1],e));labs.push(e.short||e.name)}});var W=fit(c,250),ctx=c.getContext('2d');ctx.clearRect(0,0,W,250);grid(ctx,W,250);var x0=50,y0=212,w=W-70,hh=180,top=cfg.max||1;axes(ctx,x0,y0,w,hh,0,top,function(v){return pct(v,top<.2?1:0)});
    if(cfg.th!=null){var yt=y0-hh*cfg.th/top;ctx.strokeStyle=COL.r;ctx.setLineDash([5,4]);ctx.beginPath();ctx.moveTo(x0,yt);ctx.lineTo(x0+w,yt);ctx.stroke();ctx.setLineDash([]);txt(ctx,cfg.thLabel||'기준',x0+w-4,yt-6,COL.r,11,'right')}
    bars(ctx,x0,y0,w,hh,ps.map(function(v,i){return {v:Math.min(v,top),c:i?COL.m:COL.s,l:labs[i],t:pct(v,1)}}),top);stamp(ctx,W,cfg.stamp||'예시값');
    var f=ps[ps.length-1];K([[pct(prior,1),'처음 믿음(사전)','i'],[pct(f,1),'증거 반영 뒤(사후)','g'],[(ps.length-1)+'개','반영한 증거','a']]);
    var last=null;cfg.ev.forEach(function(e,i){if(on[i])last=e});E(last?(last.lr!=null?'사후 승산 = 사전 승산 × <b>우도비</b> (이 단계 우도비 '+last.lr+')':'P(가설|증거) = <b>P(증거|가설)×P(가설)</b> ÷ (P(증거|가설)P(가설) + <em>P(증거|아님)P(아님)</em>) — 마지막 단계: '+last.pH+' 와 '+last.pN):'증거가 없으면 사후확률 = 사전확률');
    I([['g',cfg.msg||'앞 단계의 결과가 다음 단계의 사전확률이 됩니다. 이것이 베이지안 업데이트예요.'],[cfg.th!=null&&f>=cfg.th?'r':'a',cfg.th!=null?(f>=cfg.th?(cfg.overTxt||'기준을 넘었습니다.'):(cfg.underTxt||'기준 아래입니다.')):'증거들이 서로 독립이라는 가정 아래 계산했어요. 같은 사실을 다르게 말한 증거라면 확률이 과장됩니다.']])}
  addMod(c,function(dt){if(!dt)draw()});draw()};

/* 9 베타 분포: A/B 와 비율 하나 */
SIMS.beta=function(el,cfg){var c=S0(el,cfg,250,'사후분포 곡선'),row=ctrlRow(el),K=kpis(el,4),E=eqline(el),I=insight(el),mode=cfg.mode||'ab',sc=1;
  if(mode==='ab'){slider(row,'두 그룹 표본 크기',0.05,2,0.05,1,function(v){return nf(Math.round(cfg.nA*v))+'명씩'},function(v){sc=v;draw()})}else{slider(row,'모은 개수',0.02,2,0.02,1,function(v){return nf(Math.round(cfg.n*v))+'건'},function(v){sc=v;draw()})}
  function draw(){var W=fit(c,250),ctx=c.getContext('2d');ctx.clearRect(0,0,W,250);grid(ctx,W,250);var x0=40,y0=214,w=W-56,hh=180;
    if(mode==='ab'){var nA=Math.max(10,Math.round(cfg.nA*sc)),nB=Math.max(10,Math.round(cfg.nB*sc)),cA=Math.round(cfg.cA/cfg.nA*nA),cB=Math.round(cfg.cB/cfg.nB*nB),aA=cA+1,bA=nA-cA+1,aB=cB+1,bB=nB-cB+1,r=rng(4),M=20000,win=0,d=[];for(var i=0;i<M;i++){var a=betaR(r,aA,bA),b=betaR(r,aB,bB);if(b>a)win++;if(i<6000)d.push(b-a)}
      var mA=cA/nA,mB=cB/nB,lo=Math.max(0,Math.min(mA,mB)-4*Math.sqrt(mA*(1-mA)/nA)-.002),hi=Math.min(1,Math.max(mA,mB)+4*Math.sqrt(mB*(1-mB)/nB)+.002),pk=0;for(var j=0;j<=200;j++){var x=lo+(hi-lo)*j/200;pk=Math.max(pk,bpdf(x,aA,bA),bpdf(x,aB,bB))}
      [[aA,bA,COL.fly,cfg.nameA||'A'],[aB,bB,COL.robo,cfg.nameB||'B']].forEach(function(s,si){ctx.strokeStyle=s[2];ctx.lineWidth=2.5;ctx.beginPath();for(var j=0;j<=200;j++){var x=lo+(hi-lo)*j/200,y=y0-hh*bpdf(x,s[0],s[1])/pk;j?ctx.lineTo(x0+w*j/200,y):ctx.moveTo(x0+w*j/200,y)}ctx.stroke();txt(ctx,'● '+s[3],x0+8+si*160,20,s[2],12)});
      for(var t=0;t<=4;t++){var xv=lo+(hi-lo)*t/4;txt(ctx,pct(xv,1),x0+w*t/4,y0+16,COL.muted,10,'center')}stamp(ctx,W,'시드 고정 표본 20,000개');
      var pw=win/M,q1=quant(d,.025),q2=quant(d,.975);K([[pct(pw,1),'B가 A보다 나을 확률','g'],[pct(mA,2)+' → '+pct(mB,2),'전환율 A → B','i'],[pct((mB-mA)/mA,0),'상대 개선','a'],['['+(q1*100).toFixed(2)+', '+(q2*100).toFixed(2)+']%p','차이의 95% 신용구간','m']]);
      E('A ~ Beta(<b>'+aA+'</b>, <em>'+bA+'</em>), B ~ Beta(<b>'+aB+'</b>, <em>'+bB+'</em>) · Beta(전환+1, 비전환+1) → 두 분포에서 20,000번 뽑아 B>A인 비율 = <i>'+pct(pw,1)+'</i>');
      I([[pw>.95?'g':pw>.8?'a':'r',pw>.95?'두 곡선이 거의 겹치지 않아요. 이 데이터라면 B가 낫다고 말할 근거가 충분합니다.':'표본이 적으면 곡선이 넓어져 서로 겹쳐요. 이때 B가 나을 확률은 '+pct(pw,0)+'에 그칩니다.'],['a','"신용구간"은 베이지안 구간이에요. 이 모형과 데이터 아래에서 차이가 이 범위에 있을 확률이 95%라고 읽을 수 있습니다.']])}
    else{var n=Math.max(5,Math.round(cfg.n*sc)),k=Math.round(cfg.k/cfg.n*n),a=k+1,b=n-k+1,m=k/n,s=Math.sqrt(m*(1-m)/n),lo=Math.max(0,m-5*s-.01),hi=Math.min(1,m+5*s+.01),pk=0,r=rng(6),xs=[];for(var j=0;j<=200;j++)pk=Math.max(pk,bpdf(lo+(hi-lo)*j/200,a,b));for(var i=0;i<8000;i++)xs.push(betaR(r,a,b));var q1=quant(xs,.025),q2=quant(xs,.975);
      ctx.fillStyle='rgba(19,138,82,.15)';ctx.fillRect(x0+w*(q1-lo)/(hi-lo),y0-hh,w*(q2-q1)/(hi-lo),hh);ctx.strokeStyle=COL.s;ctx.lineWidth=2.5;ctx.beginPath();for(var j=0;j<=200;j++){var x=lo+(hi-lo)*j/200,y=y0-hh*bpdf(x,a,b)/pk;j?ctx.lineTo(x0+w*j/200,y):ctx.moveTo(x0+w*j/200,y)}ctx.stroke();for(var t=0;t<=4;t++)txt(ctx,pct(lo+(hi-lo)*t/4,0),x0+w*t/4,y0+16,COL.muted,10,'center');stamp(ctx,W,'설명용 모형 · 예시값');
      K([[nf(n),'모은 '+(cfg.unit||'건수'),'i'],[pct(m,1),(cfg.what||'비율')+' 추정','g'],['['+pct(q1,1)+', '+pct(q2,1)+']','95% 신용구간','m'],['±'+pct((q2-q1)/2,1),'구간 반폭','a']]);
      E('Beta(<b>'+a+'</b>, <em>'+b+'</em>) = Beta(해당+1, 나머지+1) · 구간 폭은 대략 √n에 반비례');I([[n<200?'r':'g',n<200?'모은 글이 적으면 구간이 넓어요. "긍정 '+pct(m,0)+'"라고 단정하기 어렵습니다.':'모은 글이 많아지면 구간이 좁아져 비율을 자신 있게 말할 수 있어요.'],['a','표본이 특정 사람들(많이 쓰는 사람)에 치우치면 구간이 좁아도 틀릴 수 있어요. 구간은 무작위 오차만 담습니다.']])}}
  addMod(c,function(dt){if(!dt)draw()});draw()};

/* 10 협업 필터링: 코사인 유사도 */
SIMS.cf=function(el,cfg){var tw=h('div',{class:'tw'}),row=ctrlRow(el),K=kpis(el,3),E=eqline(el),I=insight(el),u=cfg.target||0,center=false,R=cfg.R;el.insertBefore(tw,row);
  buttons(row,'추천받을 사람',cfg.users.map(function(n,i){return [i,n]}),u,function(v){u=v;draw()});buttons(row,'점수 습관 보정',[[false,'끄기'],[true,'켜기(사람별 평균 빼기)']],false,function(v){center=v;draw()});
  function vec(i){var r=R[i],m=mean(r.filter(function(x){return x>0}));return r.map(function(x){return x>0?(center?x-m:x):0})}
  function cos(a,b){var d=0,na=0,nb=0;for(var i=0;i<a.length;i++){d+=a[i]*b[i];na+=a[i]*a[i];nb+=b[i]*b[i]}return na&&nb?d/Math.sqrt(na*nb):0}
  function draw(){var vu=vec(u),sims=R.map(function(_,i){return i===u?null:cos(vu,vec(i))}),preds=[];
    R[u].forEach(function(x,j){if(x>0)return;var num=0,den=0;sims.forEach(function(s,i){if(s==null||R[i][j]===0||s<=0)return;num+=s*R[i][j];den+=s});preds.push({j:j,v:den?num/den:0})});preds.sort(function(a,b){return b.v-a.v});
    var t='<table class="tb" style="min-width:520px"><tr><th>사람 \\ '+(cfg.itemLabel||'영화')+'</th>'+cfg.items.map(function(n){return '<th>'+esc(n)+'</th>'}).join('')+'<th>나와 닮은 정도</th></tr>';
    R.forEach(function(r,i){t+='<tr'+(i===u?' style="background:rgba(19,138,82,.08)"':'')+'><th>'+esc(cfg.users[i])+'</th>'+r.map(function(x,j){var pr=i===u&&x===0?preds.filter(function(p){return p.j===j})[0]:null;return '<td class="n"'+(pr?' style="color:#138a52"':'')+'>'+(x>0?x:(pr?'≈'+pr.v.toFixed(1):'·'))+'</td>'}).join('')+'<td class="n">'+(i===u?'나':sims[i].toFixed(2))+'</td></tr>'});tw.innerHTML=t+'</table>';
    var best=sims.reduce(function(b,s,i){return s!=null&&(b<0||s>sims[b])?i:b},-1);K([[esc(cfg.users[best]),'가장 닮은 사람','g'],[sims[best].toFixed(2),'코사인 유사도','m'],[preds.length?esc(cfg.items[preds[0].j]):'없음','첫 번째 추천','a']]);
    E('코사인 유사도 = <b>A·B</b> ÷ (<em>|A| × |B|</em>) — 1이면 같은 방향(취향 같음), 0이면 관련 없음 · 빈칸 점수 = 닮은 사람들 점수의 유사도 가중평균');
    I([['g','초록 숫자가 아직 안 본 '+(cfg.itemLabel||'영화')+'의 예상 점수예요. 나와 닮은 사람이 높게 준 것일수록 높게 나옵니다.'],[center?'a':'m',center?'사람별 평균을 빼면 "후하게 주는 사람"과 "짜게 주는 사람"의 습관이 지워지고 취향의 방향만 남아요.':'보정을 켜 보세요. 점수를 후하게 주는 습관 때문에 닮아 보이던 사람이 걸러집니다.']])}
  draw()};

/* 11 연관 규칙 */
SIMS.assoc=function(el,cfg){var row=ctrlRow(el),c=S0(el,cfg,200,'지지도·신뢰도·향상도 막대'),K=kpis(el,3),E=eqline(el),I=insight(el),A=cfg.pairs[0][0],B=cfg.pairs[0][1],T=cfg.T;el.insertBefore(row,c.parentNode);
  buttons(row,'규칙',cfg.pairs.map(function(p,i){return [i,p[0]+' → '+p[1]]}),0,function(i){A=cfg.pairs[i][0];B=cfg.pairs[i][1];draw()});
  function draw(){var n=T.length,a=0,b=0,ab=0;T.forEach(function(t){var ha=t.indexOf(A)>=0,hb=t.indexOf(B)>=0;if(ha)a++;if(hb)b++;if(ha&&hb)ab++});var sup=ab/n,conf=a?ab/a:0,base=b/n,lift=base?conf/base:0;
    var W=fit(c,200),ctx=c.getContext('2d');ctx.clearRect(0,0,W,200);grid(ctx,W,200);bars(ctx,40,165,W-60,130,[{v:sup,c:COL.s,l:'지지도',t:pct(sup,0)},{v:base,c:COL.i,l:B+' 평소 구매율',t:pct(base,0)},{v:conf,c:COL.g,l:'신뢰도 P('+B+'|'+A+')',t:pct(conf,0)}],1);stamp(ctx,W,'예시값 · 영수증 '+n+'장');
    K([[pct(sup,0),'지지도: 둘 다 산 영수증','i'],[pct(conf,0),'신뢰도: '+A+' 산 사람 중 '+B,'g'],[lift.toFixed(2),'향상도','a']]);E('향상도 = <b>신뢰도</b> ÷ <em>'+B+' 평소 구매율</em> = '+pct(conf,0)+' ÷ '+pct(base,0)+' = <i>'+lift.toFixed(2)+'</i>');
    I([[lift>1.1?'g':lift<.9?'r':'a',lift>1.1?A+'을 산 사람은 '+B+'를 평소보다 '+lift.toFixed(1)+'배 더 사요. 함께 진열하거나 추천할 근거가 됩니다.':lift<.9?'향상도가 1보다 작아요. '+A+'을 사면 오히려 '+B+'를 덜 삽니다.':'향상도가 1 근처예요. 신뢰도가 높아 보여도 원래 많이 팔리는 상품이라 생긴 착시일 수 있습니다.'],['a','신뢰도는 조건부 확률 P('+B+'|'+A+')와 같아요. 함께 산다는 것이 원인이라는 뜻은 아닙니다.']])}
  addMod(c,function(dt){if(!dt)draw()});draw()};

/* 12 추천 순위: 클릭 vs 시청시간 vs 다양성 */
SIMS.rank=function(el,cfg){var tw=h('div',{class:'tw'}),row=ctrlRow(el),K=kpis(el,3),E=eqline(el),I=insight(el),wt=0,div=false,V=cfg.V;el.insertBefore(tw,row);
  slider(row,'기준: 클릭 ↔ 시청시간',0,1,0.1,0,function(v){return v===0?'클릭률만':v===1?'시청시간만':'섞음 '+pct(v,0)},function(v){wt=v;draw()});buttons(row,'다양성 보정',[[false,'끄기'],[true,'켜기']],false,function(v){div=v;draw()});
  function draw(){var mc=Math.max.apply(null,V.map(function(v){return v.ctr})),mw=Math.max.apply(null,V.map(function(v){return v.watch}));var S=V.map(function(v,i){return {i:i,s:(1-wt)*v.ctr/mc+wt*v.watch/mw}}).sort(function(a,b){return b.s-a.s}),top=[],cats={};
    S.forEach(function(x){if(top.length>=5)return;var cat=V[x.i].cat;if(div&&cats[cat]>=2)return;top.push(x.i);cats[cat]=(cats[cat]||0)+1});
    tw.innerHTML='<table class="tb" style="min-width:480px"><tr><th>순위</th><th>영상</th><th>분야</th><th>클릭률</th><th>평균 시청</th></tr>'+top.map(function(i,k){var v=V[i];return '<tr><td>'+(k+1)+'</td><td>'+esc(v.name)+(v.bait?' <span class="badge no">낚시성</span>':'')+'</td><td>'+esc(v.cat)+'</td><td class="n">'+pct(v.ctr,1)+'</td><td class="n">'+v.watch+'분</td></tr>'}).join('')+'</table>';
    var aw=mean(top.map(function(i){return V[i].watch})),bait=top.filter(function(i){return V[i].bait}).length,nc=Object.keys(top.reduce(function(o,i){o[V[i].cat]=1;return o},{})).length;
    K([[aw.toFixed(1)+'분','상위 5개 평균 시청','g'],[bait+'개','낚시성 영상','r'],[nc+'개','분야 수','a']]);E('점수 = (1−<b>w</b>)×클릭률 + <b>w</b>×시청시간 (각각 최댓값으로 나눔), w = '+wt.toFixed(1)+(div?' · 같은 분야는 2개까지':''));
    I([[bait?'r':'g',bait?'클릭률만 보면 제목·썸네일로 클릭을 끄는 영상이 위로 올라와요. 클릭하고 금방 나가니 시청시간은 짧습니다.':'시청시간을 섞으면 끝까지 보는 영상이 위로 올라옵니다. 교안의 2012년 유튜브 개편이 이 방향이었어요.'],[div?'g':'a',div?'다양성 보정을 켜면 한 분야로 쏠리지 않아요. 정확도를 조금 내주고 필터 버블을 줄입니다.':'다양성 보정을 켜 보세요. 상위 목록이 한 분야로 채워지는 것을 막습니다.']])}
  draw()};

/* 13 마르코프 체인 */
function mpow(v,P){var n=v.length,o=new Array(n).fill(0);for(var i=0;i<n;i++)for(var j=0;j<n;j++)o[j]+=v[i]*P[i][j];return o}
SIMS.markov=function(el,cfg){var tw=h('div',{class:'tw'}),c=S0(el,cfg,240,'상태 분포가 날마다 바뀌는 선'),row=ctrlRow(el),K=kpis(el,3),E=eqline(el),I=insight(el),P=cfg.P,S=cfg.states,st=0,T=cfg.T||30;el.insertBefore(tw,c.parentNode);
  tw.innerHTML='<table class="tb" style="min-width:360px"><tr><th>오늘 \\ 다음</th>'+S.map(function(s){return '<th>'+esc(s)+'</th>'}).join('')+'<th>합</th></tr>'+P.map(function(r,i){return '<tr><th>'+esc(S[i])+'</th>'+r.map(function(v){return '<td class="n">'+v.toFixed(2)+'</td>'}).join('')+'<td class="n">'+r.reduce(function(a,b){return a+b},0).toFixed(2)+'</td></tr>'}).join('')+'</table>';
  buttons(row,'시작 상태',S.map(function(s,i){return [i,s]}),0,function(v){st=v;draw()});
  var cols=[COL.a,COL.s,COL.i,COL.m];
  function draw(){var v=S.map(function(_,i){return i===st?1:0}),hist0=[v];for(var t=1;t<=T;t++){v=mpow(v,P);hist0.push(v)}var pi=S.map(function(){return 1/S.length});for(var k=0;k<500;k++)pi=mpow(pi,P);
    var W=fit(c,240),ctx=c.getContext('2d');ctx.clearRect(0,0,W,240);grid(ctx,W,240);var x0=44,y0=206,w=W-60,hh=176;axes(ctx,x0,y0,w,hh,0,1,function(x){return pct(x,0)});
    S.forEach(function(s,i){ctx.strokeStyle=cols[i];ctx.lineWidth=2.2;ctx.beginPath();hist0.forEach(function(d,t){var x=x0+w*t/T,y=y0-hh*d[i];t?ctx.lineTo(x,y):ctx.moveTo(x,y)});ctx.stroke();txt(ctx,'● '+s,x0+8+i*80,20,cols[i],12);ctx.setLineDash([3,4]);ctx.strokeStyle=cols[i];ctx.beginPath();ctx.moveTo(x0,y0-hh*pi[i]);ctx.lineTo(x0+w,y0-hh*pi[i]);ctx.stroke();ctx.setLineDash([])});
    txt(ctx,'0일',x0,y0+16,COL.muted,10,'center');txt(ctx,T+'일',x0+w,y0+16,COL.muted,10,'center');stamp(ctx,W,'예시값 전이 표');
    var d10=hist0[Math.min(10,T)];K([[pct(d10[0],1),S[0]+' 확률 (10일 뒤)','a'],[S.map(function(_,i){return pct(pi[i],1)}).join(' / '),'정상분포 ('+S.join('·')+')','g'],[S[st],'시작 상태','i']]);
    E('내일 분포 = 오늘 분포 × <b>전이 표 P</b> · n일 뒤 = 처음 × P<sup>n</sup> · 정상분포 <em>π = πP</em>');
    I([['g','어느 상태에서 시작해도 선들이 점선(정상분포)으로 모여요. 오래 지나면 처음 상태를 "잊는" 것이 마르코프 체인의 성질입니다.'],['a',cfg.msg||'전이 표의 각 줄은 합이 1이에요. 다음 상태가 오늘 상태에만 달려 있다는 가정(마르코프 성질)이 핵심입니다.']])}
  addMod(c,function(dt){if(!dt)draw()});draw()};

/* 14 페이지랭크 */
SIMS.pagerank=function(el,cfg){var c=S0(el,cfg,280,'다섯 페이지 링크 그림과 중요도'),row=ctrlRow(el),K=kpis(el,3),E=eqline(el),I=insight(el),d=.85,N=cfg.nodes,L=cfg.links,n=N.length;
  slider(row,'감쇠 계수 d',0,0.99,0.01,d,function(v){return v.toFixed(2)},function(v){d=v;draw()});
  function pr(){var r=new Array(n).fill(1/n),out=N.map(function(_,i){return L.filter(function(l){return l[0]===i}).length});for(var it=0;it<100;it++){var nr=new Array(n).fill((1-d)/n);L.forEach(function(l){nr[l[1]]+=d*r[l[0]]/out[l[0]]});N.forEach(function(_,i){if(!out[i])for(var j=0;j<n;j++)nr[j]+=d*r[i]/n});r=nr}return r}
  function draw(){var r=pr(),indeg=N.map(function(_,i){return L.filter(function(l){return l[1]===i}).length}),W=fit(c,280),ctx=c.getContext('2d');ctx.clearRect(0,0,W,280);grid(ctx,W,280);var pos=cfg.pos.map(function(p){return [p[0]*W,p[1]*280]});
    L.forEach(function(l){var a=pos[l[0]],b=pos[l[1]],dx=b[0]-a[0],dy=b[1]-a[1],dd=Math.sqrt(dx*dx+dy*dy),ux=dx/dd,uy=dy/dd,rb=14+60*r[l[1]];ctx.strokeStyle='rgba(93,98,120,.5)';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(a[0]+ux*16,a[1]+uy*16);var ex=b[0]-ux*rb,ey=b[1]-uy*rb;ctx.lineTo(ex,ey);ctx.stroke();ctx.fillStyle='rgba(93,98,120,.8)';ctx.beginPath();ctx.moveTo(ex,ey);ctx.lineTo(ex-ux*8-uy*4,ey-uy*8+ux*4);ctx.lineTo(ex-ux*8+uy*4,ey-uy*8-ux*4);ctx.fill()});
    N.forEach(function(nm,i){var rr=14+60*r[i];ctx.fillStyle='rgba(63,95,168,.25)';ctx.strokeStyle=COL.s;ctx.lineWidth=2;ctx.beginPath();ctx.arc(pos[i][0],pos[i][1],rr,0,7);ctx.fill();ctx.stroke();txt(ctx,nm,pos[i][0],pos[i][1]+4,COL.text,12,'center',true);txt(ctx,pct(r[i],0),pos[i][0],pos[i][1]+rr+14,COL.a,11,'center')});stamp(ctx,W,'예시 링크 구조');
    var b=r.indexOf(Math.max.apply(null,r)),bi=indeg.indexOf(Math.max.apply(null,indeg));K([[N[b],'페이지랭크 1위','g'],[N[bi]+' ('+indeg[bi]+'개)','받은 링크 수 1위','a'],[pct(r[b],1),'1위의 중요도','m']]);
    E('PR(A) = <em>(1−d)/N</em> + <b>d</b> × Σ PR(T) ÷ C(T) · T: A로 링크하는 페이지, C(T): T의 나가는 링크 수');
    I([[b!==bi?'g':'a',b!==bi?'받은 링크 수는 '+N[bi]+'가 가장 많지만, 중요한 페이지가 몰아준 링크 덕분에 '+N[b]+'가 1위예요. 누가 가리켰는지가 중요합니다.':'링크를 많이 받은 페이지가 1위예요. 감쇠 계수를 바꿔 순위가 어떻게 흔들리는지 보세요.'],['a','d는 "링크를 따라갈 확률"이에요. 나머지 1−d는 아무 페이지로 순간이동합니다. d = 0이면 모두 똑같은 중요도가 됩니다.']])}
  addMod(c,function(dt){if(!dt)draw()});draw()};

/* 15 고객 생애가치 CLV */
SIMS.clv=function(el,cfg){var tw=h('div',{class:'tw'}),row=ctrlRow(el),K=kpis(el,3),E=eqline(el),I=insight(el),r=cfg.r||.1,T=cfg.T||5,P=cfg.P;el.insertBefore(tw,row);
  slider(row,'할인율 r',0,0.3,0.01,r,function(v){return pct(v,0)},function(v){r=v;draw()});slider(row,'기간',1,10,1,T,function(v){return v+'기'},function(v){T=v;draw()});
  slider(row,'활성 유지율',0.4,0.95,0.01,P[0][0],function(v){return pct(v,0)},function(v){var rest=1-v,o=P[0][1]+P[0][2];P=P.map(function(x){return x.slice()});P[0][1]=rest*cfg.P[0][1]/o;P[0][2]=rest*cfg.P[0][2]/o;P[0][0]=v;draw()});
  function draw(){var v=[1,0,0],rows='',tot=0;for(var t=0;t<T;t++){var ex=v[0]*cfg.rev[0]+v[1]*cfg.rev[1]+v[2]*cfg.rev[2],pv=ex/Math.pow(1+r,t);tot+=pv;rows+='<tr><td>'+(t+1)+'기</td>'+v.map(function(x){return '<td class="n">'+pct(x,1)+'</td>'}).join('')+'<td class="n">'+nf(Math.round(ex))+'</td><td class="n">'+nf(Math.round(pv))+'</td></tr>';v=mpow(v,P)}
    tw.innerHTML='<table class="tb" style="min-width:520px"><tr><th>기</th><th>활성</th><th>휴면</th><th>이탈</th><th>기대 매출(원)</th><th>현재 가치(원)</th></tr>'+rows+'</table>';
    K([[nf(Math.round(tot))+'원','고객 생애가치 (CLV)','g'],[pct(P[0][0],0),'활성→활성','a'],[pct(r,0),'할인율','i']]);E('CLV = Σ (그 기의 <b>상태 분포 × 상태별 매출</b>) ÷ <em>(1+r)<sup>t</sup></em> · 2기 = 0.7×50,000 + 0.2×10,000 = 37,000원');
    I([['g','이탈은 빠져나올 수 없는 상태(흡수 상태)라 시간이 갈수록 쌓여요. 그래서 먼 미래의 매출은 작아집니다.'],['a','활성 유지율을 몇 %p만 올려도 CLV가 크게 바뀌어요. 이탈 방지 캠페인의 값어치를 이 숫자로 잴 수 있습니다.']])}
  draw()};

/* 16 몬테카를로 π */
SIMS.mcpi=function(el,cfg){var c=S0(el,cfg,300,'정사각형 안 무작위 점과 사분원'),row=ctrlRow(el),K=kpis(el,3),E=eqline(el),I=insight(el),n=1000,seed=3;
  buttons(row,'점 개수',[[100,'100'],[1000,'1,000'],[10000,'10,000'],[100000,'100,000']],1000,function(v){n=v;draw()});action(row,'다른 시드',function(){seed++;draw()});
  function draw(){var r=rng(seed),ins=0,W=fit(c,300),ctx=c.getContext('2d');ctx.clearRect(0,0,W,300);var S=270,x0=(Math.min(W,560)-S)/2+10,y0=15;ctx.strokeStyle=COL.rule;ctx.strokeRect(x0,y0,S,S);ctx.strokeStyle=COL.g;ctx.beginPath();ctx.arc(x0,y0+S,S,-Math.PI/2,0);ctx.stroke();
    for(var i=0;i<n;i++){var x=r(),y=r(),k=x*x+y*y<=1;if(k)ins++;if(i<6000){ctx.fillStyle=k?'rgba(19,138,82,.7)':'rgba(210,63,44,.6)';ctx.fillRect(x0+x*S-1,y0+S-y*S-1,2,2)}}var est=4*ins/n,se=4*Math.sqrt(Math.PI/4*(1-Math.PI/4)/n);
    if(W>620){txt(ctx,'π 추정 = 4 × '+nf(ins)+' ÷ '+nf(n),x0+S+30,80,COL.text,14,'left',true);txt(ctx,'= '+est.toFixed(4),x0+S+30,104,COL.a,18,'left',true);txt(ctx,'참값 3.1416',x0+S+30,130,COL.muted,12)}stamp(ctx,W,'시드 '+seed+(n>6000?' · 점은 6,000개만 그림':''));
    K([[est.toFixed(4),'π 추정값','a'],[Math.abs(est-Math.PI).toFixed(4),'참값과의 차이','r'],['±'+(1.96*se).toFixed(3),'예상 오차(95%)','g']]);E('π ≈ 4 × <b>원 안의 점</b> ÷ <em>전체 점</em> · 오차는 √n에 반비례 → 점을 100배 늘리면 오차는 1/10');
    I([[n<1000?'r':'g',n<1000?'점이 100개면 추정이 3.0~3.3 사이에서 흔들려요.':'점이 늘수록 추정값이 3.14 근처에 모입니다. 몬테카를로는 "많이 던져 비율로 잰다"가 전부예요.'],['a','정확도를 한 자리 더 얻으려면 시행을 100배 늘려야 해요. 시뮬레이션 횟수와 계산 비용의 균형을 생각해야 합니다.']])}
  addMod(c,function(dt){if(!dt)draw()});draw()};

/* 17 몬테카를로 가치 분포 */
SIMS.mcval=function(el,cfg){var c=S0(el,cfg,260,'시뮬레이션 기업가치 히스토그램과 P10·P50·P90'),row=ctrlRow(el),K=kpis(el,4),E=eqline(el),I=insight(el),gsd=cfg.gsd||.05,n=10000;
  slider(row,'성장률 불확실성(표준편차)',0.01,0.12,0.01,gsd,function(v){return pct(v,0)},function(v){gsd=v;draw()});buttons(row,'시행 횟수',[[1000,'1,000번'],[10000,'10,000번']],n,function(v){n=v;draw()});
  function tri(r,a,m,b){var u=r(),F=(m-a)/(b-a);return u<F?a+Math.sqrt(u*(b-a)*(m-a)):b-Math.sqrt((1-u)*(b-a)*(b-m))}
  function draw(){var r=rng(21),V=[];for(var i=0;i<n;i++){var g=cfg.gmu+gsd*gauss(r),cac=tri(r,50,100,200),sh=betaR(r,2,5);V.push(cfg.K*Math.pow(1+g,5)*sh*(100/cac))}
    var p10=quant(V,.1),p50=quant(V,.5),p90=quant(V,.9),m=mean(V),over=V.filter(function(v){return v>=cfg.th}).length/n,W=fit(c,260),ctx=c.getContext('2d');ctx.clearRect(0,0,W,260);grid(ctx,W,260);var x0=30,w=W-50,hi=cfg.hi||200;
    hist(ctx,x0,220,w,180,V,40,0,hi,'rgba(63,95,168,.55)');[[p10,'P10',COL.r],[p50,'P50',COL.a],[p90,'P90',COL.g],[m,'평균',COL.m]].forEach(function(q,k){var x=x0+w*q[0]/hi;ctx.strokeStyle=q[2];ctx.setLineDash(k===3?[2,3]:[5,4]);ctx.beginPath();ctx.moveTo(x,30);ctx.lineTo(x,220);ctx.stroke();ctx.setLineDash([]);txt(ctx,q[1],x,26-(k%2)*0,q[2],11,'center',true)});
    for(var t=0;t<=4;t++)txt(ctx,nf(hi*t/4)+'억',x0+w*t/4,238,COL.muted,10,'center');stamp(ctx,W,'설명용 모형 · 실제 데이터 아님');
    K([[nf(p10)+'억','P10 (하위 10%)','r'],[nf(p50)+'억','P50 (중앙값)','a'],[nf(p90)+'억','P90 (상위 10%)','g'],[pct(over,0),cfg.th+'억 이상일 확률','i']]);
    E('가치 = 기준값 × (1+<b>성장률</b>)<sup>5</sup> × <em>점유율</em> × (100 ÷ <i>고객획득비용</i>) · 성장률~정규('+pct(cfg.gmu,0)+', '+pct(gsd,0)+'), 비용~삼각(50,100,200달러), 점유율~베타(2,5)');
    I([['g','평균('+nf(m)+'억)이 중앙값('+nf(p50)+'억)보다 커요. 오른쪽 꼬리의 대박 시나리오가 평균을 끌어올리기 때문입니다.'],['a','성장률 불확실성을 키우면 P10과 P90 사이가 벌어져요. "하나의 숫자"보다 "범위와 확률"로 말해야 하는 이유입니다.']])}
  addMod(c,function(dt){if(!dt)draw()});draw()};

/* 18 공급망: 독립 부품이 모두 제때 올 확률 */
SIMS.supply=function(el,cfg){var c=S0(el,cfg,220,'부품별 정시 도착 확률과 전체 확률'),row=ctrlRow(el),K=kpis(el,3),E=eqline(el),I=insight(el),k=5,p=.9,dual=false;
  slider(row,'부품 수',1,10,1,k,null,function(v){k=v;draw()});slider(row,'부품마다 정시 확률',0.7,0.99,0.01,p,function(v){return pct(v,0)},function(v){p=v;draw()});buttons(row,'약한 부품 이중 공급',[[false,'없음'],[true,'있음']],false,function(v){dual=v;draw()});
  function draw(){var ps=[];for(var i=0;i<k;i++)ps.push(i===0?Math.max(.5,p-.15):p);if(dual)ps[0]=1-(1-ps[0])*(1-ps[0]);var all=ps.reduce(function(a,b){return a*b},1),r=rng(8),ok=0;for(var t=0;t<2000;t++){var g=true;for(var i=0;i<k;i++)if(r()>ps[i])g=false;if(g)ok++}
    var W=fit(c,220),ctx=c.getContext('2d');ctx.clearRect(0,0,W,220);grid(ctx,W,220);bars(ctx,30,180,W-50,140,ps.map(function(v,i){return {v:v,c:i===0?COL.r:COL.s,l:'부품'+(i+1),t:pct(v,0)}}).concat([{v:all,c:COL.g,l:'모두 정시',t:pct(all,0)}]),1);stamp(ctx,W,'예시값');
    K([[pct(all,1),'모든 부품이 제때 올 확률','g'],[pct(ok/2000,1),'주문 2,000건 시뮬레이션','i'],[pct(1-all,1),'어느 하나라도 늦을 확률','r']]);E('모두 정시 = P₁ × P₂ × … × P<sub>'+k+'</sub> (독립 가정)'+(dual?' · 이중 공급: 1 − (1−p)²':''));
    I([['a','부품 하나하나는 '+pct(p,0)+'로 믿음직해도, '+k+'개가 모두 제때 와야 하면 확률이 '+pct(all,0)+'로 떨어져요. 교안의 예(0.9⁵ ≈ 59%)와 같은 원리입니다.'],[dual?'g':'r',dual?'가장 약한 부품 1에 두 번째 공급사를 두면 전체 확률이 눈에 띄게 올라가요. 모든 부품에 똑같이 재고를 늘리는 것보다 병목을 먼저 막는 편이 효율적입니다.':'빨간 막대(부품 1)가 병목이에요. 이중 공급을 켜 보세요.']])}
  addMod(c,function(dt){if(!dt)draw()});draw()};

/* 19 MCMC 메트로폴리스 */
SIMS.mcmc=function(el,cfg){var c=S0(el,cfg,250,'MCMC 표본 궤적과 히스토그램'),row=ctrlRow(el),K=kpis(el,4),E=eqline(el),I=insight(el),step=.02,burn=1000,N=6000,k=cfg.k,n=cfg.n;
  slider(row,'걸음 크기',0.001,0.2,0.001,step,function(v){return v.toFixed(3)},function(v){step=v;draw()});slider(row,'버리는 앞부분',0,3000,100,burn,function(v){return nf(v)+'번'},function(v){burn=v;draw()});
  function lp(t){return t<=0||t>=1?-Infinity:k*Math.log(t)+(n-k)*Math.log(1-t)}
  function draw(){var r=rng(13),t=cfg.start||.5,ch=[],acc=0;for(var i=0;i<N;i++){var q=t+step*gauss(r);if(Math.log(r())<lp(q)-lp(t)){t=q;acc++}ch.push(t)}var kept=ch.slice(burn),m=mean(kept),W=fit(c,250),ctx=c.getContext('2d');ctx.clearRect(0,0,W,250);grid(ctx,W,250);var half=W*.58,lo=0,hi=Math.max(.12,m*2.2);
    ctx.fillStyle='rgba(210,63,44,.08)';ctx.fillRect(10,10,(half-20)*burn/N,210);ctx.strokeStyle=COL.s;ctx.lineWidth=1;ctx.beginPath();ch.forEach(function(v,i){var x=10+(half-20)*i/N,y=220-210*clamp((v-lo)/(hi-lo),0,1);i?ctx.lineTo(x,y):ctx.moveTo(x,y)});ctx.stroke();txt(ctx,'표본 궤적 (빨간 칸: 버리는 앞부분)',14,236,COL.muted,11);
    var x0=half+10,w=W-x0-14,hc=hist(ctx,x0,220,w,190,kept,30,lo,hi,'rgba(63,95,168,.5)'),mx=Math.max.apply(null,hc),a=k+1,b=n-k+1,pk=0;for(var j=0;j<=100;j++)pk=Math.max(pk,bpdf(lo+(hi-lo)*j/100,a,b));ctx.strokeStyle=COL.g;ctx.lineWidth=2;ctx.beginPath();for(var j=0;j<=100;j++){var xx=lo+(hi-lo)*j/100,yy=220-190*bpdf(xx,a,b)/pk;j?ctx.lineTo(x0+w*j/100,yy):ctx.moveTo(x0+w*j/100,yy)}ctx.stroke();txt(ctx,'초록: 정답 분포',x0,236,COL.muted,11);stamp(ctx,W,'시드 고정');
    K([[pct(m,2),'표본 평균','g'],[pct((k+1)/(n+2),2),'정답 사후평균','a'],[pct(acc/N,0),'받아들인 비율','i'],[nf(kept.length),'남긴 표본','m']]);E('제안 θ\' = θ + 걸음×잡음 → 받아들일 확률 = min(1, <b>사후(θ\')</b> ÷ <em>사후(θ)</em>) · 데이터: '+n+'명 중 '+k+'명 전환');
    I([[acc/N<.15?'r':acc/N>.8?'a':'g',acc/N<.15?'걸음이 너무 크면 제안이 대부분 거절돼 궤적이 계단처럼 멈춰 있어요.':acc/N>.8?'걸음이 너무 작으면 거의 다 받아들여지지만 조금씩만 움직여 분포를 다 훑는 데 오래 걸려요.':'받아들인 비율이 적당해요. 궤적이 정답 분포 주변을 고르게 오갑니다.'],['a','처음 시작점('+pct(cfg.start||.5,0)+')은 정답과 멀어요. 그 근처를 지나는 앞부분은 버리고(burn-in) 나머지만 씁니다.']])}
  addMod(c,function(dt){if(!dt)draw()});draw()};

/* 20 퍼널 */
SIMS.funnel=function(el,cfg){var c=S0(el,cfg,230,'단계별 전환 깔때기'),row=ctrlRow(el),K=kpis(el,3),E=eqline(el),I=insight(el),R=cfg.stages.map(function(s){return s.r});
  cfg.stages.forEach(function(s,i){slider(row,s.name,0.005,1,0.005,s.r,function(v){return pct(v,1)},function(v){R[i]=v;draw()})});
  function draw(){var n=[cfg.start],W=fit(c,230),ctx=c.getContext('2d');ctx.clearRect(0,0,W,230);R.forEach(function(r){n.push(n[n.length-1]*r)});var labs=[cfg.startName].concat(cfg.stages.map(function(s){return s.name})),m=n.length;
    n.forEach(function(v,i){var bw=(W-40)*Math.max(.02,Math.pow(v/cfg.start,.35)),y=12+i*(200/m);ctx.fillStyle=i===m-1?COL.g:COL.s;ctx.globalAlpha=.75;ctx.fillRect((W-bw)/2,y,bw,200/m-6);ctx.globalAlpha=1;txt(ctx,labs[i]+'  '+nf(Math.round(v))+(cfg.unit||'명'),W/2,y+(200/m)/2+2,COL.text,12,'center',true)});stamp(ctx,W,'예시값 · 폭은 비율의 제곱근 눈금 아님');
    var all=n[m-1]/cfg.start;K([[pct(all,3),'처음부터 끝까지 전환율','g'],[nf(Math.round(n[m-1]))+(cfg.unit||'명'),nf(cfg.start)+' 중 마지막 단계','a'],[labs[1+R.indexOf(Math.min.apply(null,R))],'가장 좁은 단계','r']]);
    E('전체 전환 = '+R.map(function(r,i){return 'P('+cfg.stages[i].name+'|앞 단계)'}).join(' × ')+' = '+R.map(function(r){return r}).join(' × ')+' = <i>'+pct(all,3)+'</i>');
    I([['g','조건부 확률을 곱하면 처음부터 끝까지의 확률이 나와요(곱셈 법칙).'],['a','가장 좁은 단계를 조금 넓히는 것이 다른 단계를 많이 넓히는 것보다 효과가 클 수 있어요. 숫자를 바꿔 확인해 보세요.']])}
  addMod(c,function(dt){if(!dt)draw()});draw()};

/* 21 베이지안 네트워크 (이진 노드, 열거 추론) */
SIMS.bn=function(el,cfg){var c=S0(el,cfg,250,'베이지안 네트워크 노드와 확률'),row=ctrlRow(el),K=kpis(el,3),E=eqline(el),I=insight(el),N=cfg.nodes,ev={};
  N.forEach(function(nd){if(nd.obs)buttons(row,nd.name,[['','모름'],['1','예'],['0','아니오']],'',function(v){if(v==='')delete ev[nd.id];else ev[nd.id]=+v;draw()})});
  function pjoint(a){var p=1;N.forEach(function(nd){var key=(nd.par||[]).map(function(q){return a[q]}).join(''),pt=nd.cpt[key===''?'_':key];p*=a[nd.id]?pt:1-pt});return p}
  function infer(){var ids=N.map(function(n){return n.id}),m=ids.length,post={},Z=0;ids.forEach(function(i){post[i]=0});for(var mask=0;mask<(1<<m);mask++){var a={},ok=true;ids.forEach(function(id,i){a[id]=(mask>>i)&1;if(ev[id]!=null&&ev[id]!==a[id])ok=false});if(!ok)continue;var p=pjoint(a);Z+=p;ids.forEach(function(id){if(a[id])post[id]+=p})}ids.forEach(function(id){post[id]/=Z});return post}
  function draw(){var P=infer(),W=fit(c,250),ctx=c.getContext('2d');ctx.clearRect(0,0,W,250);grid(ctx,W,250);var pos={};N.forEach(function(nd){pos[nd.id]=[nd.x*W,nd.y*250]});
    N.forEach(function(nd){(nd.par||[]).forEach(function(q){var a=pos[q],b=pos[nd.id],dx=b[0]-a[0],dy=b[1]-a[1],d=Math.sqrt(dx*dx+dy*dy),ux=dx/d,uy=dy/d,kk=Math.min(66/Math.max(1e-6,Math.abs(ux)),28/Math.max(1e-6,Math.abs(uy))),ex=b[0]-ux*kk,ey=b[1]-uy*kk;ctx.strokeStyle='rgba(93,98,120,.6)';ctx.lineWidth=1.6;ctx.beginPath();ctx.moveTo(a[0]+ux*kk,a[1]+uy*kk);ctx.lineTo(ex,ey);ctx.stroke();ctx.fillStyle='rgba(93,98,120,.9)';ctx.beginPath();ctx.moveTo(ex,ey);ctx.lineTo(ex-ux*8-uy*4,ey-uy*8+ux*4);ctx.lineTo(ex-ux*8+uy*4,ey-uy*8-ux*4);ctx.fill()})});
    N.forEach(function(nd){var p=pos[nd.id],o=ev[nd.id]!=null;ctx.fillStyle=o?'rgba(183,120,0,.18)':'rgba(255,255,255,.97)';ctx.strokeStyle=o?COL.a:COL.s;ctx.lineWidth=2;ctx.beginPath();if(ctx.roundRect)ctx.roundRect(p[0]-62,p[1]-24,124,48,10);else ctx.rect(p[0]-62,p[1]-24,124,48);ctx.fill();ctx.stroke();txt(ctx,nd.name,p[0],p[1]-5,COL.text,12,'center',true);ctx.fillStyle=COL.panel;ctx.fillRect(p[0]-50,p[1]+6,100,8);ctx.fillStyle=COL.g;ctx.fillRect(p[0]-50,p[1]+6,100*P[nd.id],8);txt(ctx,pct(P[nd.id],0),p[0]+56,p[1]+14,COL.a,11)});stamp(ctx,W,'예시 조건부 확률표');
    var tg=N.filter(function(n){return n.target})[0]||N[N.length-1];K([[pct(P[tg.id],1),tg.name+' 확률','g'],[Object.keys(ev).length+'개','관찰한 노드','a'],[cfg.base!=null?pct(cfg.base,1):'-','아무것도 모를 때','i']]);
    E('P(전체) = Π P(노드 | 부모) — 관찰과 맞지 않는 경우를 지우고 남은 경우의 확률을 더해 나눔 (열거 추론)');I([['g',cfg.msg||'노란 테두리가 관찰한 값이에요. 관찰을 바꾸면 화살표를 거슬러 원인 쪽 확률도 함께 바뀝니다.'],['a','화살표는 "이렇게 영향을 준다"는 가정이에요. 데이터만으로 화살표 방향(인과)이 증명되지는 않습니다.']])}
  addMod(c,function(dt){if(!dt)draw()});draw()};

/* 22 MC 드롭아웃 */
SIMS.dropout=function(el,cfg){var c=S0(el,cfg,240,'여러 번 예측한 확률 점과 평균·표준편차'),row=ctrlRow(el),K=kpis(el,4),E=eqline(el),I=insight(el),kind='known',T=50,th=.08;
  buttons(row,'보여 준 사진',[['known','배운 적 있는 보행자'],['new','처음 보는 마네킹']],'known',function(v){kind=v;draw()});slider(row,'반복 예측 횟수',1,100,1,T,function(v){return v+'번'},function(v){T=v;draw()});
  function draw(){var r=rng(kind==='known'?31:32),mu=kind==='known'?.93:.82,s=kind==='known'?.025:.13,ps=[];for(var i=0;i<T;i++)ps.push(clamp(mu+s*gauss(r),.02,.995));var m=mean(ps),sdv=T>1?sd(ps):0,W=fit(c,240),ctx=c.getContext('2d');ctx.clearRect(0,0,W,240);grid(ctx,W,240);var x0=44,y0=210,w=W-60,hh=180;axes(ctx,x0,y0,w,hh,0,1,function(v){return pct(v,0)});
    ctx.fillStyle='rgba(19,138,82,.12)';ctx.fillRect(x0,y0-hh*(m+2*sdv),w,hh*4*sdv);ps.forEach(function(p,i){ctx.fillStyle=COL.s;ctx.beginPath();ctx.arc(x0+w*(i+.5)/T,y0-hh*p,3,0,7);ctx.fill()});ctx.strokeStyle=COL.g;ctx.beginPath();ctx.moveTo(x0,y0-hh*m);ctx.lineTo(x0+w,y0-hh*m);ctx.stroke();stamp(ctx,W,'설명용 모형 · 실제 데이터 아님');
    var unsure=sdv>th;K([[pct(m,0),'평균 "보행자" 확률','g'],['±'+pct(sdv,1),'표준편차(흔들림)','m'],['['+pct(clamp(m-1.96*sdv,0,1),0)+', '+pct(clamp(m+1.96*sdv,0,1),0)+']','대략 95% 범위','a'],[T<2?'-':unsure?'확신 낮음 → 감속':'확신 높음','판단 (기준 '+pct(th,0)+')',unsure?'r':'g']]);
    E('드롭아웃을 켠 채 <b>'+T+'번</b> 예측 → 평균 = 예측값, <em>표준편차</em> = 모델이 모르는 정도 (평균±1.96×표준편차 ≈ 95% 범위)');
    I([[unsure?'r':'g',unsure?'처음 보는 대상이라 예측이 '+pct(Math.min.apply(null,ps),0)+'~'+pct(Math.max.apply(null,ps),0)+'로 들쭉날쭉해요. 평균만 보면 '+pct(m,0)+'로 그럴듯하지만, 흔들림이 "모른다"는 신호입니다.':'배운 대상이라 매번 비슷하게 답해요. 이럴 때는 한 번의 예측도 믿을 만합니다.'],['a','한 번만 예측하면(1번) 흔들림을 볼 수 없어요. 횟수를 1로 내려 보세요.']])}
  addMod(c,function(dt){if(!dt)draw()});draw()};

/* 23 수축: 계층 모형 */
SIMS.shrink=function(el,cfg){var c=S0(el,cfg,260,'매장별 원래 평균에서 계층 추정으로 당겨지는 화살표'),row=ctrlRow(el),K=kpis(el,3),E=eqline(el),I=insight(el),tau=cfg.tau,S=cfg.stores,sig=cfg.sigma;
  slider(row,'매장 사이 차이 τ',1,40,1,tau,function(v){return v+(cfg.unit||'')},function(v){tau=v;draw()});
  function draw(){var tot=0,nn=0;S.forEach(function(s){tot+=s.m*s.n;nn+=s.n});var mu=tot/nn,W=fit(c,260),ctx=c.getContext('2d');ctx.clearRect(0,0,W,260);grid(ctx,W,260);var lo=cfg.lo,hi=cfg.hi,x0=110,w=W-140;
    var xm=x0+w*(mu-lo)/(hi-lo);ctx.strokeStyle=COL.g;ctx.setLineDash([5,4]);ctx.beginPath();ctx.moveTo(xm,10);ctx.lineTo(xm,230);ctx.stroke();ctx.setLineDash([]);txt(ctx,'전체 평균 '+mu.toFixed(1),xm,250,COL.g,11,'center');
    var ws=[];S.forEach(function(s,i){var wgt=(s.n/(sig*sig))/(s.n/(sig*sig)+1/(tau*tau)),est=wgt*s.m+(1-wgt)*mu;ws.push(wgt);var y=24+i*(210/S.length),xa=x0+w*(s.m-lo)/(hi-lo),xb=x0+w*(est-lo)/(hi-lo);txt(ctx,s.name+' (n='+s.n+')',x0-8,y+4,COL.text,12,'right');ctx.strokeStyle='rgba(93,98,120,.5)';ctx.beginPath();ctx.moveTo(xa,y);ctx.lineTo(xb,y);ctx.stroke();ctx.fillStyle=COL.r;ctx.beginPath();ctx.arc(xa,y,4,0,7);ctx.fill();ctx.fillStyle=COL.s;ctx.beginPath();ctx.arc(xb,y,5,0,7);ctx.fill()});
    txt(ctx,'● 매장 평균 그대로',x0,12,COL.r,11);txt(ctx,'● 계층 추정',x0+130,12,COL.s,11);stamp(ctx,W,'예시값');
    var small=S.reduce(function(a,s,i){return s.n<S[a].n?i:a},0),big=S.reduce(function(a,s,i){return s.n>S[a].n?i:a},0);K([[pct(ws[small],0),S[small].name+'의 자기 평균 무게','r'],[pct(ws[big],0),S[big].name+'의 자기 평균 무게','g'],[mu.toFixed(1)+(cfg.unit||''),'전체 평균','a']]);
    E('계층 추정 = <b>w</b> × 매장 평균 + (1−<b>w</b>) × 전체 평균, w = (n/σ²) ÷ (n/σ² + 1/<em>τ</em>²), σ = 매장 안 흩어짐 '+sig);
    I([['g','기록이 적은 매장일수록 화살표가 길어요. 우연히 튄 평균을 전체 평균 쪽으로 당겨 "수축"시킵니다.'],['a','τ(매장 사이 차이)를 키우면 매장들이 원래 많이 다르다고 보는 셈이라 덜 당겨져요. τ가 작으면 모두 전체 평균에 가까워집니다.']])}
  addMod(c,function(dt){if(!dt)draw()});draw()};

/* 23b 베타 수축: 클릭률처럼 이항 데이터 (사전 평균 p0, 사전의 무게 m) */
SIMS.betashrink=function(el,cfg){var c=S0(el,cfg,260,'항목별 원래 클릭률에서 베이지안 평균으로 당겨지는 화살표'),row=ctrlRow(el),K=kpis(el,3),E=eqline(el),I=insight(el),m=cfg.m,p0=cfg.p0,S=cfg.items;
  slider(row,'사전의 무게 m (노출 수)',10,1000,10,m,function(v){return nf(v)+'번'},function(v){m=v;draw()});
  function draw(){var W=fit(c,260),ctx=c.getContext('2d');ctx.clearRect(0,0,W,260);grid(ctx,W,260);var lo=cfg.lo,hi=cfg.hi,x0=Math.min(200,W*.45),w=W-x0-30,xm=x0+w*(p0-lo)/(hi-lo);
    ctx.strokeStyle=COL.g;ctx.setLineDash([5,4]);ctx.beginPath();ctx.moveTo(xm,10);ctx.lineTo(xm,230);ctx.stroke();ctx.setLineDash([]);txt(ctx,'사전 평균 '+p0+'%',xm,250,COL.g,11,'center');
    var ws=[],es=[];S.forEach(function(s,i){var raw=s.k/s.n*100,wgt=s.n/(s.n+m),est=(s.k+m*p0/100)/(s.n+m)*100;ws.push(wgt);es.push(est);var y=34+i*(196/S.length),xa=x0+w*(raw-lo)/(hi-lo),xb=x0+w*(est-lo)/(hi-lo);txt(ctx,s.name+' ('+s.k+'/'+nf(s.n)+')',x0-8,y+4,COL.text,12,'right');ctx.strokeStyle='rgba(93,98,120,.5)';ctx.beginPath();ctx.moveTo(xa,y);ctx.lineTo(xb,y);ctx.stroke();ctx.fillStyle=COL.r;ctx.beginPath();ctx.arc(xa,y,4,0,7);ctx.fill();ctx.fillStyle=COL.s;ctx.beginPath();ctx.arc(xb,y,5,0,7);ctx.fill()});
    txt(ctx,'● 원래 클릭률',x0,14,COL.r,11);txt(ctx,'● 베이지안 평균',x0+110,14,COL.s,11);stamp(ctx,W,'예시값');
    K([[pct(ws[0],0),S[0].name+'의 자기 클릭률 무게 w','r'],[es[0].toFixed(1)+'%',S[0].name+'의 베이지안 평균','m'],[p0+'%','사전 평균(전체 이모티콘)','a']]);
    E('베이지안 평균 = (클릭 + m × '+p0+'%) ÷ (노출 + m) = Beta(클릭 + '+(m*p0/100).toFixed(0)+', 미클릭 + '+(m*(1-p0/100)).toFixed(0)+')의 평균 · w = 노출 ÷ (노출 + m)');
    I([['g','노출이 적은 항목일수록 화살표가 길어요. 우연히 튄 클릭률을 사전 평균 쪽으로 당깁니다.'],['a','사전의 무게 m은 "평균이 '+p0+'% 근처"라는 믿음이 노출 몇 번만큼 강한가예요. m을 키우면 모두 '+p0+'% 쪽으로, 줄이면 원래 클릭률 쪽으로 갑니다.']])}
  addMod(c,function(dt){if(!dt)draw()});draw()};

/* 24 포아송 */
SIMS.poisson=function(el,cfg){var c=S0(el,cfg,220,'포아송 분포 막대'),row=ctrlRow(el),K=kpis(el,3),E=eqline(el),I=insight(el),l=cfg.lambda||10;
  slider(row,'평균 λ (시간당 손님)',1,40,1,l,null,function(v){l=v;draw()});
  function draw(){var mx=Math.max(20,Math.ceil(l+4*Math.sqrt(l))),ps=[],p=Math.exp(-l);for(var k=0;k<=mx;k++){if(k>0)p*=l/k;ps.push(p)}var W=fit(c,220),ctx=c.getContext('2d');ctx.clearRect(0,0,W,220);grid(ctx,W,220);var pm=Math.max.apply(null,ps),x0=30,w=W-50;ps.forEach(function(v,k){var bw=w/ps.length,bh=170*v/pm;ctx.fillStyle=Math.abs(k-l)<=Math.sqrt(l)?COL.s:'rgba(63,95,168,.4)';ctx.fillRect(x0+k*bw+1,190-bh,bw-2,bh);if(k%Math.ceil(ps.length/12)===0)txt(ctx,k,x0+k*bw+bw/2,206,COL.muted,10,'center')});stamp(ctx,W,'이론 분포');
    var r=rng(2),xs=[];for(var i=0;i<2000;i++)xs.push(poisR(r,l));K([[l,'평균 λ','g'],[l,'분산 (= λ)','m'],[mean(xs).toFixed(2)+' / '+Math.pow(sd(xs),2).toFixed(2),'모의 2,000시간 평균 / 분산','i']]);E('P(손님 k명) = λ<sup>k</sup> e<sup>−λ</sup> ÷ k! · 평균 = 분산 = λ');
    I([['g','진한 막대가 평균 ± 표준편차(√λ) 범위예요. 평균 '+l+'명이어도 실제로는 '+Math.max(0,Math.round(l-Math.sqrt(l)))+'~'+Math.round(l+Math.sqrt(l))+'명 사이를 오가는 것이 자연스럽습니다.'],['a','λ가 작으면 오른쪽으로 꼬리가 긴 모양, 크면 종 모양에 가까워져요.']])}
  addMod(c,function(dt){if(!dt)draw()});draw()};

/* 25 디리클레 */
SIMS.dirichlet=function(el,cfg){var c=S0(el,cfg,230,'카테고리 선호 사후분포 막대와 90% 구간'),row=ctrlRow(el),K=kpis(el,3),E=eqline(el),I=insight(el),pr=cfg.prior.slice(),ob=cfg.obs.slice(),C=cfg.cats;
  buttons(row,'처음 생각 α',[['1,1,1','(1,1,1) 백지'],['5,5,5','(5,5,5) 비슷하게'],['10,10,10','(10,10,10) 꽤 확신']],cfg.prior.join(','),function(v){pr=v.split(',').map(Number);draw()});
  C.forEach(function(nm,i){slider(row,nm+' 선택',0,30,1,ob[i],null,function(v){ob[i]=v;draw()})});
  function draw(){var a=pr.map(function(v,i){return v+ob[i]}),s=a.reduce(function(x,y){return x+y},0),r=rng(5),smp=C.map(function(){return []});for(var t=0;t<4000;t++){var g=a.map(function(v){return gammaR(r,v)}),gs=g.reduce(function(x,y){return x+y},0);g.forEach(function(v,i){smp[i].push(v/gs)})}
    var W=fit(c,230),ctx=c.getContext('2d');ctx.clearRect(0,0,W,230);grid(ctx,W,230);var x0=40,w=W-60,bw=w/C.length;C.forEach(function(nm,i){var m=a[i]/s,q1=quant(smp[i],.05),q2=quant(smp[i],.95),x=x0+i*bw+bw*.25,bh=170*m;ctx.fillStyle=[COL.a,COL.s,COL.m][i%3];ctx.fillRect(x,190-bh,bw*.5,bh);ctx.strokeStyle=COL.text;ctx.beginPath();ctx.moveTo(x+bw*.25,190-170*q1);ctx.lineTo(x+bw*.25,190-170*q2);ctx.stroke();txt(ctx,nm,x+bw*.25,208,COL.muted,12,'center');txt(ctx,pct(m,0),x+bw*.25,184-bh,COL.text,12,'center',true)});stamp(ctx,W,'예시값 · 세로선 = 90% 구간');
    var best=a.indexOf(Math.max.apply(null,a));K([['('+a.join(', ')+')','사후 α','g'],[C[best],'가장 선호할 것 같은 것','a'],[nf(ob.reduce(function(x,y){return x+y},0))+'번','관찰한 선택','i']]);E('사후 α = <em>사전 α</em> + <b>관찰 횟수</b> → ('+pr.join(',')+') + ('+ob.join(',')+') = ('+a.join(',')+') · 선호 평균 = αᵢ ÷ Σα');
    I([['g','관찰을 더하면 α가 커지고 세로선(90% 구간)이 짧아져요. 더 많이 볼수록 확신이 커진다는 뜻입니다.'],['a','처음 생각을 (10,10,10)처럼 강하게 두면 같은 관찰로도 덜 움직여요. 데이터가 적을 때는 사전을 넓게(약하게) 두는 편이 안전합니다.']])}
  addMod(c,function(dt){if(!dt)draw()});draw()};

/* ===== 대결 계산 ===== */
DUELS.sample_bias=function(){var r=rng(42),p=.52,f=0,k=0;for(var i=0;i<1000;i++)if(r()<p)k++;f=k/1000;var q=.58,kb=Math.round(20000*q+Math.sqrt(20000*q*(1-q))*gauss(r));return {fly:Math.abs(f-p)*100,robo:Math.abs(kb/20000-p)*100,say:'참값 52%와의 오차는 초파리 쪽(무작위 1,000명) '+(Math.abs(f-p)*100).toFixed(1)+'%p, 주판봇 쪽(자발적 응답 20,000명) '+(Math.abs(kb/20000-p)*100).toFixed(1)+'%p예요.'}};
DUELS.gambler=function(){var r=rng(7),streak=0,after=0,red=0;for(var i=0;i<400000;i++){var x=Math.floor(r()*37),c=x===0?'g':(x%2?'r':'b');if(streak>=5){after++;if(c==='r')red++}streak=c==='b'?streak+1:0}var act=red/after;return {fly:Math.abs(18/37-act)*100,robo:Math.abs(.60-act)*100,say:'검정 5연속 뒤 실제 빨강 비율은 '+pct(act,1)+'('+nf(after)+'번 중)이에요. 예측 오차는 초파리 쪽(48.6%) '+(Math.abs(18/37-act)*100).toFixed(1)+'%p, 주판봇 쪽(60%) '+(Math.abs(.6-act)*100).toFixed(1)+'%p예요.'}};
DUELS.base_rate=function(){var r=rng(3),pos=0,inf=0;for(var i=0;i<400000;i++){var d=r()<.001,t=d?r()<.9:r()<.1;if(t){pos++;if(d)inf++}}var act=inf/pos;return {fly:Math.abs(.0089-act)*100,robo:Math.abs(.9-act)*100,say:'시뮬레이션 40만 명 중 양성 '+nf(pos)+'명, 그중 실제 감염 '+nf(inf)+'명('+pct(act,2)+')이에요. 예측 오차는 초파리 쪽(0.9%) '+(Math.abs(.0089-act)*100).toFixed(2)+'%p, 주판봇 쪽(90%) '+(Math.abs(.9-act)*100).toFixed(1)+'%p예요.'}};
DUELS.peek=function(){var r=rng(19);function run(n){var ok=0;for(var t=0;t<400;t++){var a=0,b=0;if(n>2000){a=n*.03+Math.sqrt(n*.03*.97)*gauss(r);b=n*.036+Math.sqrt(n*.036*.964)*gauss(r)}else for(var i=0;i<n;i++){if(r()<.03)a++;if(r()<.036)b++}if(b>a)ok++}return ok/400}var f=run(10000),b=run(500);return {fly:f,robo:b,say:'400번 실험해서 진짜 더 나은 B를 고른 비율은 초파리 쪽(그룹당 10,000명) '+pct(f,0)+', 주판봇 쪽(그룹당 500명에서 바로 결정) '+pct(b,0)+'이에요.'}};
DUELS.cf_vs_pop=function(cfg){var r=rng(5),U=60,I=12,hitF=0,hitR=0;var R=[];for(var u=0;u<U;u++){var g=u%3,row=[];for(var i=0;i<I;i++){var like=(Math.floor(i/4)===g)?.75:(i===0||i===1?.45:.12);row.push(r()<like?1:0)}R.push(row)}
  for(var u=0;u<U;u++){var liked=R[u].map(function(v,i){return v?i:-1}).filter(function(i){return i>=0});if(liked.length<2)continue;var ho=liked[Math.floor(r()*liked.length)],tr=R[u].slice();tr[ho]=0;var pop=new Array(I).fill(0);R.forEach(function(row,k){if(k!==u)row.forEach(function(v,i){pop[i]+=v})});
    var cand=[];for(var i=0;i<I;i++)if(!tr[i])cand.push(i);var topP=cand.slice().sort(function(a,b){return pop[b]-pop[a]}).slice(0,3);if(topP.indexOf(ho)>=0)hitF++;
    var sc=new Array(I).fill(0);R.forEach(function(row,k){if(k===u)return;var d=0,na=0,nb=0;for(var i=0;i<I;i++){d+=tr[i]*row[i];na+=tr[i];nb+=row[i]}var s=na&&nb?d/Math.sqrt(na*nb):0;row.forEach(function(v,i){sc[i]+=s*v})});var topR=cand.slice().sort(function(a,b){return sc[b]-sc[a]}).slice(0,3);if(topR.indexOf(ho)>=0)hitR++}
  return {fly:hitF/U,robo:hitR/U,say:'가려 둔 "좋아한 상품"을 추천 3개 안에 맞힌 비율은 초파리 쪽(인기순) '+pct(hitF/U,0)+', 주판봇 쪽(협업 필터링) '+pct(hitR/U,0)+'이에요.'}};
DUELS.portfolio_cond=function(){function sim(m1,m2){var r=rng(77),con=[],div=[];for(var i=0;i<20000;i++){var z1=gauss(r),z2=-.5*z1+Math.sqrt(.75)*gauss(r),a=m1+.15*z1,b=m2+.15*z2;con.push(a);div.push(.5*a+.5*b)}return {fly:quant(div,.1)*100,robo:quant(con,.1)*100}}var A=sim(.06,.06),B=sim(.22,0);A.label='가정 A: 두 자산의 기대수익이 같다 (둘 다 6%)';B.label='가정 B: 한 자산의 기대수익이 훨씬 높다 (22% 대 0%)';return {fly:A.fly,robo:A.robo,cond:true,condA:A,condB:B,say:'최악 10% 해의 수익률은 가정 A에서 초파리 쪽(분산) '+A.fly.toFixed(1)+'%, 주판봇 쪽(집중) '+A.robo.toFixed(1)+'%이고, 가정 B에서 초파리 쪽 '+B.fly.toFixed(1)+'%, 주판봇 쪽 '+B.robo.toFixed(1)+'%예요.'}};
DUELS.clv_pick=function(){function clv(P,rev){var v=[1,0,0],t=0,s=0;for(t=0;t<20;t++){s+=(v[0]*rev[0]+v[1]*rev[1])/Math.pow(1.025,t);v=mpow(v,P)}return s}var A=clv([[.55,.15,.30],[.2,.5,.3],[0,0,1]],[80000,10000,0]),B=clv([[.85,.1,.05],[.3,.5,.2],[0,0,1]],[50000,10000,0]);return {fly:B/10000,robo:A/10000,say:'5년(20분기) 생애가치는 초파리가 고른 고객 B(분기 5만 원, 유지율 85%) '+nf(B/10000,0)+'만 원, 주판봇이 고른 고객 A(분기 8만 원, 유지율 55%) '+nf(A/10000,0)+'만 원이에요.'}};
DUELS.mc_n=function(){var r=rng(88);function err(n){var e=0;for(var t=0;t<200;t++){var k=0;for(var i=0;i<n;i++){var x=r(),y=r();if(x*x+y*y<=1)k++}e+=Math.abs(4*k/n-Math.PI)}return e/200}var f=err(100),b=err(10000);return {fly:f,robo:b,say:'π 추정을 200번 되풀이한 평균 오차는 초파리 쪽(100번 던지기) '+f.toFixed(3)+', 주판봇 쪽(10,000번 던지기) '+b.toFixed(3)+'이에요.'}};
DUELS.confound=function(){var r=rng(55),N=200000,d=[];for(var i=0;i<N;i++){var hi=r()<.3,ad=r()<(hi?.8:.2),pb=(hi?.10:.02)+(ad?.01:0),buy=r()<pb;d.push([hi,ad,buy])}function rate(f){var n=0,k=0;d.forEach(function(x){if(f(x)){n++;if(x[2])k++}});return k/n}
  var naive=rate(function(x){return x[1]})-rate(function(x){return !x[1]});var sH=rate(function(x){return x[0]&&x[1]})-rate(function(x){return x[0]&&!x[1]}),sL=rate(function(x){return !x[0]&&x[1]})-rate(function(x){return !x[0]&&!x[1]});var strat=.3*sH+.7*sL;return {fly:Math.abs(strat-.01)*100,robo:Math.abs(naive-.01)*100,say:'진짜 광고 효과는 +1.0%p로 넣어 두었어요. 초파리 쪽(관심도별로 나눠 비교) 추정 '+(strat*100).toFixed(2)+'%p, 주판봇 쪽(광고 본 사람과 안 본 사람 단순 비교) '+(naive*100).toFixed(2)+'%p예요.'}};
DUELS.nb_words=function(cfg){var T=cfg.test,acc1=0,acc2=0;T.forEach(function(t){var p1=t.w.indexOf('좋아요')>=0?1:0;if(p1===t.y)acc1++;var lp=Math.log(.5),ln=Math.log(.5);t.w.forEach(function(w){var L=cfg.lik[w];if(L){lp+=Math.log(L[0]);ln+=Math.log(L[1])}});if((lp>ln?1:0)===t.y)acc2++});return {fly:acc1/T.length,robo:acc2/T.length,say:'시험용 리뷰 '+T.length+'개 정확도는 초파리 쪽("좋아요" 한 단어 규칙) '+pct(acc1/T.length,0)+', 주판봇 쪽(모든 단어 나이브 베이즈) '+pct(acc2/T.length,0)+'이에요.'}};
DUELS.ood=function(){var r=rng(61),wf=0,wr=0;for(var i=0;i<200;i++){var ps=[];for(var t=0;t<50;t++)ps.push(clamp(.82+.13*gauss(r),.02,.995));var one=ps[0];if(one>=.5)wr++;var m=mean(ps),s=sd(ps);if(s<=.08&&m>=.5)wf++}return {fly:wf,robo:wr,say:'처음 보는 마네킹 사진 200장에서 "보행자라고 확신하고 틀린" 수는 초파리 쪽(50번 예측, 흔들리면 보류) '+wf+'장, 주판봇 쪽(한 번 예측) '+wr+'장이에요.'}};
DUELS.pool=function(){var r=rng(17),ef=0,er=0,M=0;for(var rep=0;rep<200;rep++){var tau=6,sig=20,mu=100;for(var s=0;s<8;s++){var th=mu+tau*gauss(r),n=s<4?3:30,xs=[];for(var i=0;i<n;i++)xs.push(th+sig*gauss(r));var m=mean(xs),w=(n/(sig*sig))/(n/(sig*sig)+1/(tau*tau)),est=w*m+(1-w)*mu;ef+=Math.abs(m-th);er+=Math.abs(est-th);M++}}return {fly:ef/M,robo:er/M,say:'매장의 진짜 평균과의 오차(방문객 수)는 초파리 쪽(매장 평균 그대로) '+(ef/M).toFixed(1)+'명, 주판봇 쪽(계층 모델) '+(er/M).toFixed(1)+'명이에요.'}};
DUELS.rollout=function(){function gain(lift){var base=1000,fly=0,robo=0;[.1,.5,1,1].forEach(function(sh){fly+=base*sh*lift});robo=base*1*lift*4;return {fly:fly,robo:robo}}var A=gain(.2),B=gain(-.05);A.label='가정 A: B안이 정말 20% 낫다';B.label='가정 B: B안이 실은 5% 나쁘다';return {fly:A.fly,robo:A.robo,cond:true,condA:A,condB:B,say:'4주 동안의 추가 매출(만 원)은 가정 A에서 초파리 쪽(10→50→100%) '+nf(A.fly)+', 주판봇 쪽(바로 100%) '+nf(A.robo)+'이고, 가정 B에서는 '+nf(B.fly)+'과 '+nf(B.robo)+'이에요.'}};

/* 26 평가자 효과 보정 (계층: 직원 ⊂ 평가자) */
SIMS.rater=function(el,cfg){var tw=h('div',{class:'tw'}),row=ctrlRow(el),K=kpis(el,3),E=eqline(el),I=insight(el),adj=false,E0=cfg.emps;el.insertBefore(tw,row);
  buttons(row,'평가자 효과',[[false,'보정 안 함'],[true,'평가자 평균 차이 보정']],false,function(v){adj=v;draw()});
  function draw(){var all=mean(E0.map(function(x){return x.s})),rm={};cfg.raters.forEach(function(r){var xs=E0.filter(function(x){return x.r===r}).map(function(x){return x.s});rm[r]=mean(xs)});
    var L=E0.map(function(x){var off=rm[x.r]-all;return {n:x.name,r:x.r,raw:x.s,adj:x.s-(cfg.k==null?1:cfg.k)*off}}),key=adj?'adj':'raw';L.sort(function(a,b){return b[key]-a[key]});
    tw.innerHTML='<table class="tb" style="min-width:460px"><tr><th>순위</th><th>직원</th><th>평가자</th><th>받은 점수</th><th>보정 점수</th></tr>'+L.map(function(x,i){return '<tr'+(i<3?' style="background:rgba(19,138,82,.08)"':'')+'><td>'+(i+1)+'</td><td>'+esc(x.n)+'</td><td>'+esc(x.r)+' (평균 '+rm[x.r].toFixed(1)+')</td><td class="n">'+x.raw.toFixed(1)+'</td><td class="n">'+x.adj.toFixed(1)+'</td></tr>'}).join('')+'</table>';
    var top=L.slice(0,3).map(function(x){return x.r}),cnt={};top.forEach(function(r){cnt[r]=(cnt[r]||0)+1});var mx=Object.keys(cnt).sort(function(a,b){return cnt[b]-cnt[a]})[0];
    K([[esc(L[0].n),adj?'보정 후 1위':'받은 점수 1위','g'],[mx+' '+cnt[mx]+'명','상위 3명 중 가장 많은 평가자','a'],[all.toFixed(1)+'점','전체 평균','i']]);
    E('보정 점수 = 받은 점수 − (그 평가자의 평균 − 전체 평균) · 평가자 평균: '+cfg.raters.map(function(r){return esc(r)+' '+rm[r].toFixed(1)}).join(', '));
    I([[adj?'g':'r',adj?'평가자마다의 "후함·엄격함"을 빼니 상위권이 여러 평가자에게서 고르게 나와요.':'후한 평가자에게 받은 직원이 상위권을 차지해요. 실력 차이인지 평가자 차이인지 섞여 있습니다.'],['a','평가자 평균에는 그 팀의 실제 실력 차이도 섞여 있을 수 있어요. 실제 계층 모형은 이 둘을 함께 추정하고, 평가를 적게 받은 사람은 수축으로 보완합니다.']])}
  draw()};
