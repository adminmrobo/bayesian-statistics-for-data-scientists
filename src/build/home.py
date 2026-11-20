# -*- coding: utf-8 -*-
"""목차(index) 첫 화면 = 베이지안 통계 해설 + 건물 보기 썸네일.

- index.html : 표지 → 머리말(베이지안 통계 설명) → 베이지안이란 → 목차 카드 → 건물로 둘러보기(썸네일) → …
- tower.html : P&E 글로벌 본사 타워 3D(건물 전체 · 층별 안내판)를 따로 보는 쪽
build_extra.index() 와 patch_home.py(이미 빌드된 index.html 고치기)가 함께 쓴다.
"""
import base64, html, re, json
import tower

e = html.escape
strip = lambda s: re.sub('<[^>]+>', '', s)
DATE = '2026-11-20'
WHO_PAGE = 'https://adminmrobo.github.io/who_am_i/who_am_i.html'

LEAD = ('<b>베이지안 통계</b>는 <b>처음 믿음(사전확률)</b>에 <b>새 증거가 얼마나 그럴듯한지(우도)</b>를 곱해 '
        '<b>새 믿음(사후확률)</b>을 얻는 방법입니다. 오늘 얻은 사후확률은 내일 증거가 오면 다시 처음 믿음이 되니, '
        '데이터가 들어올 때마다 결론을 조금씩 고쳐 갈 수 있어요. 이 시리즈는 1~3회차에서 평균·확률·베이즈 정리를 다지고, '
        '4~13회차에서 그 생각을 A/B 테스트·추천·금융 리스크·마르코프 체인·몬테카를로·베이지안 네트워크·텍스트·이미지·계층 모형·종합 프로젝트로 넓힙니다. '
        '7회차와 13회차 뒤에는 요약정리와 퀴즈가 있어요.')

def byline():
    return (f'<p class="byline">글 · 안상선 ((주)M-Robo 대표) · <a href="{WHO_PAGE}" target="_blank" rel="noopener">저자 소개</a>'
            f' · {DATE} 개정</p>')

# ---------- 건물 썸네일 (픽셀풍 SVG) ----------
def tower_svg(w=192, h=108):
    """16비트 RPG 픽셀아트 느낌의 본사 타워 그림. 층 색은 tower.FLOORS 와 같다."""
    r = []
    R = lambda x, y, ww, hh, c: r.append(f'<rect x="{x}" y="{y}" width="{ww}" height="{hh}" fill="{c}"/>')
    # 하늘(흰 바탕에 가까운 옅은 파랑) · 구름 · 땅
    R(0, 0, 192, 108, '#f3f7fd'); R(0, 60, 192, 40, '#e8f0fb')
    for cx, cy in ((22, 18), (150, 12), (168, 34)):
        R(cx, cy, 14, 3, '#ffffff'); R(cx + 3, cy - 2, 7, 2, '#ffffff')
    # 뒤쪽 낮은 건물들
    for x, hh, c in ((10, 26, '#d6deec'), (28, 18, '#cdd7e8'), (140, 22, '#d6deec'), (160, 30, '#cdd7e8'), (178, 16, '#d6deec')):
        R(x, 100 - hh, 16, hh, c)
        for wy in range(100 - hh + 3, 98, 5):
            R(x + 3, wy, 2, 2, '#f3f7fd'); R(x + 8, wy, 2, 2, '#f3f7fd')
    R(0, 100, 192, 8, '#a9c48a'); R(0, 100, 192, 1, '#8fb070'); R(0, 104, 192, 1, '#9cba7d')
    # 타워 본체: 아래(로비)에서 위(옥상)로
    X, W = 72, 48
    hgt = {'00': 8, '07m': 3, '13f': 3}
    y = 100
    for f in tower.FLOORS:
        fh = hgt.get(f['key'], 5)
        y -= fh
        R(X, y, W, fh, f['color'])
        R(X, y, W, 1, '#00000022')
        if f['key'] == '00':
            R(X + 20, y + 3, 8, 5, '#2b3550'); R(X + 23, y + 3, 2, 5, '#f3c969')  # 정문
            for wx in (X + 4, X + 11, X + 32, X + 39): R(wx, y + 3, 5, 3, '#eaf2ff')
        elif fh >= 5:
            for wx in range(X + 3, X + W - 3, 5): R(wx, y + 2, 3, 2, '#eaf2ff')
        else:
            R(X + 2, y + 1, W - 4, 1, '#ffffffaa')
    top = y
    R(X - 2, top - 2, W + 4, 2, '#5d6278')                  # 옥상 난간
    R(X + 22, top - 12, 2, 10, '#5d6278'); R(X + 21, top - 14, 4, 2, '#d23f2c')  # 안테나
    R(X + 6, top - 9, 14, 7, '#ffffff'); R(X + 6, top - 9, 14, 1, '#3f5fa8')
    r.append(f'<text x="{X + 13}" y="{top - 3.6}" font-size="5" font-family="monospace" font-weight="700" text-anchor="middle" fill="#3f5fa8">P&amp;E</text>')
    # 오른쪽 그림자 기둥(입체감)
    R(X + W, top, 3, 100 - top, '#00000018')
    # 나무 · 사람
    for tx in (50, 60, 130, 140):
        R(tx + 2, 96, 2, 4, '#7a5530'); R(tx, 90, 6, 6, '#3f8f4e'); R(tx + 1, 89, 4, 1, '#56a865')
    for px, c in ((40, '#d0457f'), (152, '#3f5fa8')):
        R(px, 95, 2, 2, '#f1c9a5'); R(px, 97, 2, 3, c)
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 108" width="{w}" height="{h}" shape-rendering="crispEdges" '
            f'role="img" aria-label="픽셀 그림: 로비부터 옥상까지 16개 층이 층마다 다른 색으로 쌓인 P&amp;E 글로벌 본사 타워">' + ''.join(r) + '</svg>')

def tower_svg_uri():
    return 'data:image/svg+xml;base64,' + base64.b64encode(tower_svg().encode('utf-8')).decode()

# ---------- CSS ----------
CSS = '''
.th-tower{background-image:url(%s);image-rendering:pixelated}
.ihero .byline{font-size:14px;color:var(--muted);margin:0}
.ihero .lead2{color:var(--text);max-width:68ch}
.mosaic .mt.bld{outline:2px solid var(--seq);outline-offset:-2px}
.mosaic .mt.bld span{background:var(--seq);color:#fff}
.bys{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;counter-reset:bys}
.bys>div{position:relative;background:var(--panel);border:1px solid var(--rule);border-radius:12px;padding:18px 18px 16px;display:flex;flex-direction:column;gap:6px}
.bys>div b{font-size:17px}
.bys>div .en{font-size:12px;color:var(--muted);letter-spacing:.02em}
.bys>div:nth-child(1){border-top:4px solid var(--seq)}
.bys>div:nth-child(2){border-top:4px solid var(--amber)}
.bys>div:nth-child(3){border-top:4px solid var(--gfp)}
.byfx{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:10px;font-weight:700;font-size:clamp(16px,2.2vw,21px);padding:16px;border:1px dashed var(--rule);border-radius:12px;background:#fff}
.byfx span{padding:6px 12px;border-radius:8px}
.byfx .p{background:rgba(63,95,168,.10);color:var(--seq)}.byfx .l{background:rgba(183,120,0,.12);color:var(--amber)}.byfx .q{background:rgba(19,138,82,.12);color:var(--gfp)}
.byfx i{font-style:normal;color:var(--muted)}
.bylab{background:var(--panel);border:1px solid var(--rule);border-radius:12px;padding:18px;display:flex;flex-direction:column;gap:12px}
.bylab .row{display:flex;flex-wrap:wrap;gap:10px 22px;align-items:center}
.bylab label{display:flex;align-items:center;gap:8px;font-size:14px;flex:1 1 220px}
.bylab label input{flex:1}
.bylab output{min-width:42px;font-weight:700;text-align:right}
.bymeter{position:relative;height:30px;border-radius:8px;background:#fff;border:1px solid var(--rule);overflow:hidden}
.bymeter i{position:absolute;left:0;top:0;bottom:0;background:linear-gradient(90deg,var(--gfp),#2fb37a);transition:width .35s}
.bymeter b{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:14px}
.byhist{display:flex;flex-wrap:wrap;gap:6px;font-size:13px}
.byhist span{padding:3px 8px;border-radius:6px;background:#fff;border:1px solid var(--rule)}
.byhist span.up{border-color:rgba(19,138,82,.5)}.byhist span.dn{border-color:rgba(210,63,44,.5)}
.chapx{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
.chapx a{display:flex;flex-direction:column;gap:6px;background:var(--panel);border:1px solid var(--rule);border-radius:12px;padding:16px;color:var(--text);text-decoration:none;min-width:0}
.chapx a:hover{border-color:var(--seq);box-shadow:0 4px 12px rgba(30,35,60,.10)}
.chapx a .ct{display:block;aspect-ratio:16/9;margin:-16px -16px 8px;border-radius:11px 11px 0 0;background-size:cover;background-position:center;border-bottom:1px solid var(--rule)}
.chapx a>b{color:var(--seq);font-size:13px}
.chapx a>strong{font-size:16px;line-height:1.35}
.chapx a>small{color:var(--muted)}
.chapx a ol{margin:2px 0 0;padding-left:20px;font-size:14px;color:var(--text)}
.chapx a ol li.duel{list-style:none;margin-left:-20px;color:var(--c-fly)}
.chapx a.review{border-color:rgba(183,120,0,.55);background:rgba(183,120,0,.06)}
.chapx a.review>b{color:var(--amber)}
.bldcard{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:22px;align-items:center;background:linear-gradient(180deg,#eef3fb,#fff);border:1px solid var(--rule);border-radius:14px;padding:18px;color:var(--text);text-decoration:none}
.bldcard:hover{border-color:var(--seq);box-shadow:0 6px 16px rgba(30,35,60,.12)}
.bldcard .pic{border-radius:10px;overflow:hidden;border:1px solid var(--rule);background:#f3f7fd}
.bldcard .pic svg{display:block;width:100%;height:auto;image-rendering:pixelated}
.bldcard h3{margin:0 0 6px}
.bldcard ul{margin:8px 0 12px;padding-left:20px;font-size:15px}
.bldcard .go{display:inline-block;background:var(--seq);color:#fff;font-weight:700;padding:9px 16px;border-radius:9px}
@media (max-width:860px){.bys,.chapx{grid-template-columns:repeat(2,minmax(0,1fr))}.bldcard{grid-template-columns:1fr}}
@media (max-width:520px){.bys,.chapx{grid-template-columns:1fr}}
'''

def css():
    return '<style>' + CSS.replace('url(%s)', 'url(' + tower_svg_uri() + ')', 1) + '</style>'

# ---------- 베이지안이란 ----------
LAB_JS = r'''<script>(function(){
var B=document.getElementById('bylab');if(!B)return;
var q=function(s){return B.querySelector(s)},pr=q('#byPrior'),se=q('#bySens'),fp=q('#byFp'),bar=q('.bymeter i'),txt=q('.bymeter b'),hist=q('.byhist'),cur=null;
function pc(x){return (x*100).toFixed(x<0.1?1:0)+'%'}
function show(){var p=cur;bar.style.width=(p*100)+'%';txt.textContent='지금 믿음(사후확률) '+pc(p);}
function reset(){cur=pr.value/100;hist.innerHTML='<span>처음 믿음 '+pc(cur)+'</span>';q('#byPv').value=pr.value+'%';q('#bySv').value=se.value+'%';q('#byFv').value=fp.value+'%';show();}
function step(pos){var s=se.value/100,f=fp.value/100,a=pos?s:1-s,b=pos?f:1-f,p=cur;cur=a*p/(a*p+b*(1-p));
 var el=document.createElement('span');el.className=pos?'up':'dn';el.textContent=(pos?'＋양성 → ':'－음성 → ')+pc(cur);hist.appendChild(el);show();}
[pr,se,fp].forEach(function(el){el.addEventListener('input',reset)});
q('#byPos').addEventListener('click',function(){step(true)});
q('#byNeg').addEventListener('click',function(){step(false)});
q('#byReset').addEventListener('click',reset);reset();
})();</script>'''

def bayes_section(say):
    """say(who, mood, text) -> html (캐릭터 대사)."""
    talk = (say('doc', 'front', '베이지안의 질문은 늘 같아요. "이 증거를 보고 나서, 내 믿음을 얼마나 고쳐야 하지?"')
            + say('fly', 'point', '그러니까 처음 믿음부터 숫자로 적어 두라는 거지. 기저율을 빼먹으면 양성 하나에 호들갑 떨게 돼.')
            + say('robo', 'coin', '정확도 90% 검사가 양성이면 90% 확률로 맞는 거 아냐? …아래 실험부터 돌려 볼게.'))
    rows = [('확률이란', '같은 실험을 아주 많이 되풀이했을 때의 비율', '지금 가진 정보로 본 "얼마나 그럴듯한가"의 정도'),
            ('데이터가 적을 때', '결론을 미루거나 범위가 아주 넓어짐', '처음 믿음이 받쳐 주어 적은 데이터로도 말할 수 있음(대신 처음 믿음을 밝혀야 함)'),
            ('결과를 말하는 법', 'p값, 신뢰구간 — "차이가 없다면 이런 결과가 나올 확률"', '사후확률, 신용구간 — "B가 A보다 나을 확률 97%"'),
            ('새 데이터가 오면', '보통 처음부터 다시 분석', '어제의 사후확률을 오늘의 사전확률로 이어서 고침')]
    tb = ''.join(f'<tr><td><b>{a}</b></td><td>{b}</td><td>{c}</td></tr>' for a, b, c in rows)
    return f'''<section class="level" id="bayes"><div class="wrap stack">
<div class="lvhead"><h2>베이지안 통계란? — 처음 믿음 × 증거 = 새 믿음</h2><p class="lead">베이지안 통계는 "확률"을 <b>믿음의 정도</b>로 읽습니다. 아직 아무것도 보지 않았을 때의 믿음에서 출발해, 증거가 하나 올 때마다 그 증거가 얼마나 그럴듯한지에 따라 믿음을 올리거나 내려요. 세 가지 재료만 알면 됩니다.</p></div>
<div class="bys">
<div><span class="en">① PRIOR · 사전확률</span><b>처음 믿음</b><p>증거를 보기 전의 믿음이에요. "이 병은 원래 100명 중 1명꼴"처럼 <b>기저율</b>에서 출발하는 경우가 많아요.</p></div>
<div><span class="en">② LIKELIHOOD · 우도</span><b>증거의 무게</b><p>이 증거가 "맞을 때"와 "아닐 때" 각각 얼마나 자주 나오는지예요. 둘의 차이가 클수록 증거 하나로 믿음이 크게 움직여요.</p></div>
<div><span class="en">③ POSTERIOR · 사후확률</span><b>새 믿음</b><p>①과 ②를 곱한 뒤 다시 합이 100%가 되게 맞춘 값이에요. 다음 증거가 오면 이것이 새 <b>처음 믿음</b>이 됩니다.</p></div>
</div>
<div class="byfx" aria-label="베이즈 정리를 말로 쓴 식"><span class="q">새 믿음</span><i>∝</i><span class="p">처음 믿음</span><i>×</i><span class="l">증거의 무게</span></div>
<details class="more"><summary>수식으로 보면 (펼쳐 보기)</summary><p style="margin:10px 0 0">P(가설 | 증거) = P(증거 | 가설) × P(가설) ÷ P(증거). 왼쪽이 사후확률, 오른쪽 위의 두 값이 우도와 사전확률이고, P(증거)는 "가설이 맞을 때 + 아닐 때" 그 증거가 나올 확률을 모두 더한 값이에요. 자세한 풀이는 <a href="03_bayesian_thinking.html">3회차 베이지안 사고방식</a>에 있어요.</p></details>
<div class="talk">{talk}</div>
<div class="bylab" id="bylab" aria-label="직접 해 보기: 증거가 올 때마다 믿음 고치기">
<h3 style="margin:0">직접 해 보기 — 검사 결과가 하나씩 올 때마다 믿음 고치기</h3>
<div class="row">
<label>처음 믿음(기저율) <input type="range" id="byPrior" min="1" max="50" value="1"><output id="byPv"></output></label>
<label>병이 있을 때 양성(민감도) <input type="range" id="bySens" min="50" max="99" value="90"><output id="bySv"></output></label>
<label>병이 없는데 양성(거짓 양성) <input type="range" id="byFp" min="1" max="40" value="10"><output id="byFv"></output></label>
</div>
<div class="bymeter"><i></i><b></b></div>
<div class="ctrl"><button class="bt primary" type="button" id="byPos">양성 결과 하나 더</button><button class="bt" type="button" id="byNeg">음성 결과 하나 더</button><button class="bt" type="button" id="byReset">처음으로</button></div>
<div class="byhist" aria-live="polite"></div>
<p class="muted" style="font-size:14px;margin:0">처음 값(기저율 1%, 민감도 90%, 거짓 양성 10%)에서 양성 한 번이면 믿음은 약 8%예요. 90%가 아닙니다. 양성을 두세 번 더 받아 보면 믿음이 어떻게 쌓이는지 보세요. 숫자는 설명용 예시값이에요.</p>
</div>
<h3>빈도주의와 무엇이 다를까</h3>
<div class="tw"><table class="tb"><tr><th></th><th>빈도주의(고전 통계)</th><th>베이지안</th></tr>{tb}</table></div>
<p class="muted" style="font-size:14px">둘은 싸우는 관계가 아니라 쓰임새가 다른 도구예요. 이 시리즈는 1~2회차에서 고전 통계의 기본(평균·표본·확률)을 먼저 다지고, 3회차부터 베이지안 방식으로 넘어갑니다.</p>
</div></section>
{LAB_JS}'''

# ---------- 목차 카드 ----------
def toc_section(L):
    def card(n):
        Q = L[n]
        topic = Q['eyebrow'].split('·', 1)[1].strip() if '·' in Q['eyebrow'] else ''
        lis = ''.join(f'<li>{e(strip(l["title"]))}</li>' for l in Q['levels'])
        lis += f'<li class="duel">⚔ 대결: {e(strip(Q["duel"]["question"]))}</li>'
        return (f'<a href="{Q["file"]}"><span class="ct th-{n}" aria-hidden="true"></span><b>{n}회차 · {e(topic)}</b>'
                f'<strong>{e(strip(Q["title"]))}</strong><small>{e(strip(Q["question"]))}</small><ol>{lis}</ol></a>')
    def rv(k, f, t, items):
        lis = ''.join(f'<li>{x}</li>' for x in items)
        return f'<a class="review" href="{f}"><span class="ct th-{k}" aria-hidden="true"></span><b>요약 · 퀴즈</b><strong>{t}</strong><ol>{lis}</ol></a>'
    p1 = ''.join(card(f'{i:02d}') for i in range(1, 8)) + rv('07m', '07m_midterm_review.html', '중간 요약정리 및 퀴즈 (1~7회차)', ['회차별 요약정리', '교안 연습문제 32문항', '업무 계산 문제 7개', '회차별 점수'])
    p2 = ''.join(card(f'{i:02d}') for i in range(8, 14)) + rv('13f', '13f_final_review.html', '기말 요약정리 및 퀴즈 (8~13회차)', ['회차별 요약정리', '교안 연습문제 30문항', '업무 계산 문제 6개', '회차별 점수'])
    steps = ('<div class="steps"><div><b>이런 분께</b><p>"사전확률·사후확률"을 들어는 봤지만, 그것이 A/B 테스트·추천·리스크·보고서에서 어떻게 쓰이는지 숫자로 보고 싶은 분. 코드·수식을 몰라도 됩니다.</p></div>'
             '<div><b>읽는 순서</b><p>1회차 → 13회차 순서가 기본이에요. 앞 회차의 한계가 다음 회차의 이유가 되도록 이어 두었어요. 베이즈 정리부터 보고 싶다면 3회차에서 시작해도 됩니다.</p></div>'
             '<div><b>건물로 둘러보기</b><p>회차마다 가상의 회사 P&amp;E 글로벌 본사 타워의 한 층이 됩니다. 아래 <a href="#building">건물 보기</a>에서 3D 건물과 층별 안내판으로 회차를 골라도 돼요.</p></div></div>')
    return (f'<section class="level" id="map"><div class="wrap stack"><div class="lvhead"><h2>목차</h2><p class="lead">13회차와 요약·퀴즈 두 쪽, 모두 열다섯 쪽입니다. 카드마다 그 회차에서 다루는 세 가지 주제와 대결 질문을 적어 두었어요.</p></div>'
            f'<h3>1부 · 확률에서 상태 변화까지 (1~7회차)</h3><div class="chapx">{p1}</div>'
            f'<h3>2부 · 시뮬레이션에서 종합 프로젝트까지 (8~13회차)</h3><div class="chapx">{p2}</div>{steps}</div></section>')

def building_section():
    return f'''<section class="level" id="building"><div class="wrap stack">
<div class="lvhead"><h2>건물로 둘러보기 — P&amp;E 글로벌 본사 타워</h2><p class="lead">같은 열다섯 쪽을 건물로도 볼 수 있어요. 가상의 다국적 기업 P&amp;E 글로벌(Prior &amp; Evidence Global)의 서울 본사 타워에서 회차 하나가 부서 하나, 부서 하나가 한 층입니다.</p></div>
<a class="bldcard" href="tower.html"><div class="pic">{tower_svg(384, 216)}</div><div><h3>건물 보기 — 3D 본사 타워</h3><p class="muted" style="margin:0">로비부터 옥상까지 16개 층</p><ul><li>건물을 드래그로 돌려 보고, 층을 누르면 부서(회차) 안내 카드가 열려요.</li><li>층별 안내판과 세계 지사 시각(서울·런던·뉴욕·싱가포르)이 함께 나와요.</li><li>각 회차 쪽 맨 위에서는 그 층을 꺼내 층 평면과 둘러보는 순서를 보여 줘요.</li></ul><span class="go">건물 보기 →</span></div></a>
</div></section>'''

def mosaic_tile():
    return '<a class="mt th-tower bld" href="tower.html" title="건물 보기 · P&amp;E 글로벌 본사 타워"><span>건물</span><i class="sr">건물 보기 · P&amp;E 글로벌 본사 타워 3D</i></a>'

NAV = [('bayes', '베이지안이란'), ('map', '목차'), ('building', '건물 보기'), ('keys', '한 줄 핵심'), ('dash', '종합 대시보드'), ('path', '개념 흐름'), ('how', '식구·사용법'), ('about', '자료와 원칙')]

def nav_html(label):
    a = ''.join(f'<a href="{"tower.html" if i == "building" else "#" + i}">{e(t)}</a>' for i, t in NAV)
    return f'<nav class="top" aria-label="섹션 바로가기"><div class="wrap"><a class="logo" href="index.html"><i></i>{e(label)}</a><div class="links">{a}</div></div></nav>\n'

# ---------- 건물 보기 쪽(tower.html) ----------
def tower_page(base_css, site):
    blk = tower.tower_html('00', standalone=True)
    return f'''<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>건물 보기 — P&amp;E 글로벌 본사 타워 · 베이지안 통계 연구실</title>
<meta name="description" content="데이터 사이언티스트를 위한 베이지안 통계학 열다섯 쪽을 가상의 회사 P&amp;E 글로벌 본사 타워 16개 층으로 둘러보는 3D 건물 안내.">
<meta property="og:title" content="건물 보기 — P&amp;E 글로벌 본사 타워">
<meta property="og:image" content="{site}assets/og/cover_00.jpg">
<meta property="og:url" content="{site}tower.html">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M8 0l7 4v8l-7 4-7-4V4z' fill='%239ab0d0'/%3E%3C/svg%3E">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;500;700&display=swap">
<style>
{base_css}
</style>
</head>
<body>
<nav class="top" aria-label="바로가기"><div class="wrap"><a class="logo" href="index.html"><i></i>베이지안 통계 연구실</a><div class="links"><a href="index.html">← 목차(베이지안 통계 해설)</a><a href="index.html#map">회차 목록</a><a href="01_what_is_statistics.html">1회차부터</a></div></div></nav>
{blk}
<section class="level"><div class="wrap stack">
<div class="lvhead"><h2>이 건물은</h2><p class="lead">{e(tower.COMPANY["motto"])}. 「데이터 사이언티스트를 위한 베이지안 통계학」 13회차가 13개 부서로, 7층과 8층 사이 라운지와 옥상 전망대가 중간·기말 요약정리 및 퀴즈로 들어 있어요. 층을 누르거나 오른쪽 안내판에서 골라 올라가세요.</p></div>
<p class="muted" style="font-size:14px">{e(tower.COMPANY["note"])} 3D는 three.js(jsdelivr CDN)로 그립니다. 불러오지 못하면 안내판만으로 그대로 이동할 수 있어요.</p>
<p><a href="index.html">← 목차로 돌아가기</a></p>
</div></section>
<footer id="footer"><div class="wrap stack"><p>글 · 안상선 ((주)M-Robo 대표) · <a href="{WHO_PAGE}" target="_blank" rel="noopener">저자 소개</a> · <a href="https://github.com/adminmrobo/bayesian-statistics-for-data-scientists" target="_blank" rel="noopener">GitHub 저장소</a><br>캐릭터 이름·설정·그림의 저작권은 안상선(개인)에게 있으며 허락 없이 쓸 수 없습니다.</p></div></footer>
</body>
</html>
'''
