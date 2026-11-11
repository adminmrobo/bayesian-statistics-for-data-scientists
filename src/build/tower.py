# -*- coding: utf-8 -*-
"""P&E 글로벌 본사 타워 — 3D 첫 화면(건물 안내)

목차(index)는 건물 전체를, 회차 쪽은 그 회차가 들어 있는 층을 3D로 보여 주고
층 평면(방 = 이 쪽의 칸)과 둘러보는 순서를 안내한다.

- build.py / build_extra.py 가 nav 바로 뒤, 표지 그림 앞에 tower_html(key)를 넣는다.
- 이미 빌드된 HTML에는 add_tower.py 로 같은 블록을 넣거나 갈아 끼운다(표식 <!--tower:start--> … <!--tower:end-->).
- three.js 는 CDN(jsdelivr)에서 불러온다. 불러오지 못하면 오른쪽 안내판만으로 쓸 수 있다.
"""
import os, json, html

B = os.path.dirname(os.path.abspath(__file__))
CSS = open(os.path.join(B, 'tower.css'), encoding='utf-8').read()
JS = open(os.path.join(B, 'tower.js'), encoding='utf-8').read()
THREE_VER = '0.170.0'

COMPANY = dict(ko='P&E 글로벌', en='Prior & Evidence Global', hq='서울 본사 타워',
               motto='처음 믿음(Prior)에 증거(Evidence)를 더해 결정을 고치는 회사',
               note='가상의 다국적 기업입니다. 층마다 한 부서가 있고, 부서마다 그 회차의 베이지안 도구로 일합니다.')

CLOCKS = [('서울', 'Asia/Seoul'), ('런던', 'Europe/London'), ('뉴욕', 'America/New_York'), ('싱가포르', 'Asia/Singapore')]

PAL = ['#3f5fa8', '#138a52', '#d23f2c', '#2563c9', '#a8329f', '#b77800', '#14899a', '#7a45d6']

def LES(a, b, c, sa, sb, sc):
    return [('three', '안내 데스크', '3줄 요약'), ('cast', '팀 라운지', '연구실 식구'), ('lv1', a, '칸 ① ' + sa), ('lv2', b, '칸 ② ' + sb), ('lv3', c, '칸 ③ ' + sc),
            ('dash', '상황실', '한눈에 보는 대시보드'), ('duel', '대결 홀', '초파리 대 주판봇 대결'), ('sum', '정리 데스크', '정리'), ('kg', '자료실', '지식 색인 · 꾸러미')]

REV = [('three', '안내 데스크', '3줄 요약'), ('cast', '팀 라운지', '연구실 식구'), ('summary', '요약 갤러리', '1부 요약'), ('orig', '교안 문제 시험장', '2부 교안 문제'),
       ('calc', '업무 계산실', '3부 업무 계산'), ('score', '점수판', '회차별 점수'), ('kg', '자료실', '지식 색인 · 꾸러미')]

IDX = [('three', '안내 데스크', '3줄 요약'), ('map', '층별 안내판', '회차 지도'), ('keys', '한 줄 핵심 게시판', '한 줄 핵심 모음'), ('dash', '종합 상황실', '종합 대시보드'),
       ('path', '개념 계단', '개념 사다리'), ('how', '식구 라운지', '식구 · 사용법'), ('about', '자료 보관실', '자료와 원칙')]

# 아래에서 위로: 로비 → 1~7층 → 7M 라운지 → 8~13층 → 옥상
FLOORS = [
 dict(key='00', label='L', file='index.html', dept='로비 · 안내 데스크', en='Lobby & Directory', branch='서울 본사',
      title='목차 — 데이터 사이언티스트를 위한 베이지안 통계학', ep='목차',
      biz='본사 타워의 로비입니다. 층별 안내판에서 부서(회차)를 고르면 그 층으로 올라갑니다.', rooms=IDX),
 dict(key='01', label='1F', file='01_what_is_statistics.html', dept='글로벌 시장조사센터', en='Global Market Research', branch='협업 지사 서울 · 뉴욕',
      title='통계학이 뭐죠? — 일상 속 데이터 이야기', ep='01회차',
      biz='세계 지사에서 모은 설문·조사 숫자를 받아, 평균만 보면 놓치는 것(흩어짐, 표본이 누구를 대표하는지, 위험을 나누는 법)을 따지는 부서예요.',
      rooms=LES('분산 측정실', '설문 표본실', '보험 계리실', '흩어짐', '표본', '위험 나누기')),
 dict(key='02', label='2F', file='02_probability.html', dept='투자전략실', en='Investment Strategy', branch='협업 지사 뉴욕',
      title='확률이란? — 동전던지기부터 주식투자까지', ep='02회차',
      biz='투자 아이디어를 확률로 바꿔 보는 부서예요. 조건이 붙은 확률, 자산끼리 함께 움직이는 정도, 많이 해 봐야 보이는 규칙을 다룹니다.',
      rooms=LES('조건부 확률실', '포트폴리오 데스크', '반복 실험실', '조건부', '독립과 분산', '대수의 법칙')),
 dict(key='03', label='3F', file='03_bayesian_thinking.html', dept='신뢰·보안센터', en='Trust & Safety', branch='협업 지사 더블린',
      title='베이지안 사고방식 — 업데이트하는 지혜', ep='03회차',
      biz='검사 양성, 스팸 메일, 가짜뉴스처럼 증거를 받고 믿음을 고치는 판정을 매일 하는 부서예요.',
      rooms=LES('베이즈 진단실', '스팸 필터실', '팩트체크 데스크', '베이즈 정리', '나이브 베이즈', '순차 업데이트')),
 dict(key='04', label='4F', file='04_ab_test.html', dept='그로스 마케팅본부', en='Growth Marketing', branch='협업 지사 샌프란시스코',
      title='고객 데이터 분석 — A/B 테스트 마스터하기', ep='04회차',
      biz='새 화면과 문구를 A와 B로 나눠 실험하고, 베타 분포로 "B가 더 나을 확률"을 계산해 출시를 정하는 부서예요.',
      rooms=LES('실험 설계실', '평균 보정실', '베타 분포 랩', '실험 설계', '베이지안 평균', '베타 분포')),
 dict(key='05', label='5F', file='05_recommender.html', dept='개인화 추천팀', en='Personalization', branch='협업 지사 싱가포르',
      title='추천시스템의 비밀 — 개인화의 과학', ep='05회차',
      biz='함께 산 상품, 클릭과 시청시간, 비슷한 고객의 취향으로 "다음에 볼 것"을 고르는 부서예요.',
      rooms=LES('장바구니 분석실', '추천 목표 회의실', '협업 필터링 랩', '연관 규칙', '추천 목표', '협업 필터링')),
 dict(key='06', label='6F', file='06_financial_risk.html', dept='여신·리스크관리본부', en='Credit & Risk', branch='협업 지사 런던',
      title='금융 리스크 분석 — 불확실성을 다루는 법', ep='06회차',
      biz='대출 심사, 뉴스에 흔들리는 판단, 포트폴리오 분산으로 손실 가능성을 관리하는 부서예요. (교육용 · 투자 자문 아님)',
      rooms=LES('신용평가 심사실', '뉴스 모니터링실', '포트폴리오 운용실', '신용평가', '뉴스와 편향', '포트폴리오')),
 dict(key='07', label='7F', file='07_markov_chain.html', dept='고객여정·CRM센터', en='Customer Journey & CRM', branch='협업 지사 시드니',
      title='마르코프 체인 — 상태 변화의 예측', ep='07회차',
      biz='고객이 상태(신규·활성·이탈)를 옮겨 다니는 확률표로 장기 비율, 페이지 중요도, 고객 생애가치를 계산하는 부서예요.',
      rooms=LES('상태 전이 보드룸', '페이지랭크 랩', '생애가치 계산실', '전이와 정상분포', '페이지랭크', '고객 생애가치')),
 dict(key='07m', label='7M', file='07m_midterm_review.html', dept='중간 점검 라운지', en='Mid-term Review Lounge', branch='모든 지사 공용 공간',
      title='중간 요약정리 및 퀴즈 — 1~7회차', ep='1~7회차 점검',
      biz='1~7층을 돌아본 직원들이 쉬어 가며 요약을 보고, 교안 문제와 업무 계산으로 점검하는 라운지예요.', rooms=REV),
 dict(key='08', label='8F', file='08_monte_carlo.html', dept='공급망·전략기획실', en='Supply Chain & Planning', branch='협업 지사 로테르담',
      title='몬테카를로 시뮬레이션 — 복잡한 문제의 해법', ep='08회차',
      biz='확실한 숫자 하나 대신 수천 번의 시뮬레이션으로 매출 범위, 공급망 지연, 어려운 확률을 구하는 부서예요.',
      rooms=LES('가치 분포 시뮬레이터', '공급망 상황실', 'MCMC 연구실', '가치 분포', '공급망 위험', 'π와 MCMC')),
 dict(key='09', label='9F', file='09_bayesian_network.html', dept='고객경험 인과분석실', en='CX Causal Analytics', branch='협업 지사 토론토',
      title='베이지안 네트워크 — 인과관계 찾기', ep='09회차',
      biz='원인과 결과를 화살표 그물로 그려 퍼널 이탈, 진단 정확도, 만족 요인을 따지는 부서예요.',
      rooms=LES('퍼널 분석실', '진단 정확도 랩', '요인 그물 보드', '퍼널', '진단', '요인 그물')),
 dict(key='10', label='10F', file='10_nlp_bayes.html', dept='글로벌 VOC센터', en='Voice of Customer', branch='협업 지사 도쿄',
      title='자연어 처리 — 텍스트 데이터의 베이지안 분석', ep='10회차',
      biz='여러 나라 말로 들어오는 리뷰와 여론을 나이브 베이즈로 분류하고, 비율의 범위를 함께 보고하는 부서예요.',
      rooms=LES('리뷰 감성실', '여론 조사실', '토픽 분류실', '감성 분류', '여론과 범위', '토픽')),
 dict(key='11', label='11F', file='11_bayesian_vision.html', dept='미디어·비전 AI랩', en='Media & Vision AI Lab', branch='협업 지사 파리',
      title='이미지 & 미디어 데이터 — 베이지안 컴퓨터 비전', ep='11회차',
      biz='사진에 붙을 태그를 맞히고, 영상 판독이 얼마나 확실한지 재고, 모델이 얼마나 흔들리는지 확인하는 랩이에요.',
      rooms=LES('해시태그 스튜디오', '영상 판독실', '불확실성 랩', '해시태그', '영상 진단', 'MC 드롭아웃')),
 dict(key='12', label='12F', file='12_hierarchical_bayes.html', dept='글로벌 매장운영본부', en='Global Retail Operations', branch='협업 지사 두바이',
      title='기업 데이터 분석 — 계층적 베이지안 모델', ep='12회차',
      biz='나라·지역별 매장 숫자를 계층 모형으로 묶어, 표본이 적은 매장과 평가자도 공정하게 보는 부서예요.',
      rooms=LES('방문객 집계실', '지역 효과 회의실', '평가 보정실', '포아송', '지역 효과', '공정한 평가')),
 dict(key='13', label='13F', file='13_capstone.html', dept='경영전략실 · 이사회', en='Strategy & Board', branch='서울 본사 직할',
      title='종합 프로젝트 — 실전 데이터 사이언스', ep='13회차',
      biz='모든 층의 도구를 모아 고객 세분화, 앱 실험, 경영진 보고서를 만드는 최종 의사결정 층이에요.',
      rooms=LES('고객 세분화실', '앱 실험실', '이사회 보고실', '세분화', '앱 A/B', '보고서')),
 dict(key='13f', label='R', file='13f_final_review.html', dept='옥상 전망대', en='Rooftop Observatory', branch='모든 지사 공용 공간',
      title='기말 요약정리 및 퀴즈 — 8~13회차', ep='8~13회차 점검',
      biz='8~13층을 돌아본 뒤 옥상에서 건물 전체를 내려다보며 요약하고 퀴즈로 마무리하는 곳이에요.', rooms=REV),
]
for i, f in enumerate(FLOORS):
    f['color'] = '#5d6278' if f['key'] in ('00',) else ('#138a52' if f['key'] in ('07m', '13f') else PAL[(i - 1) % len(PAL)])
KEYS = [f['key'] for f in FLOORS]
BYKEY = {f['key']: f for f in FLOORS}

e = lambda s: html.escape(str(s), quote=True)

def floor_name(f):
    return f'{f["label"]} {f["dept"]}'

def _data(cur):
    fl = [dict(key=f['key'], label=f['label'], dept=f['dept'], en=f['en'], branch=f['branch'], title=f['title'], ep=f['ep'], file=f['file'],
               biz=f['biz'], color=f['color'], rooms=[dict(id=a, name=b, sec=c) for a, b, c in f['rooms']]) for f in FLOORS]
    return dict(cur=cur, company=COMPANY, floors=fl)

def _route_items(f):
    o = []
    for i, (a, b, c) in enumerate(f['rooms']):
        tag = 'EV' if i == 0 else str(i)
        o.append(f'<li data-i="{i}"><a href="#{a}"><i>{tag}</i><b>{e(b)}</b><span>{e(c)}</span></a></li>')
    return ''.join(o)

def _panel_floor(f):
    i = KEYS.index(f['key'])
    dn = FLOORS[i - 1] if i > 1 else None          # 1F의 아래는 로비(목차)
    up = FLOORS[i + 1] if i + 1 < len(FLOORS) else None
    el = []
    el.append(f'<a class="dn" href="{dn["file"]}" title="{e(dn["title"])}">▼ {e(floor_name(dn))}</a>' if dn else '<span class="dn off">▼ 아래층 없음</span>')
    el.append('<a class="lob" href="index.html">로비 · 목차</a>')
    el.append(f'<a class="up" href="{up["file"]}" title="{e(up["title"])}">▲ {e(floor_name(up))}</a>' if up else '<span class="up off">▲ 옥상이 맨 위층</span>')
    first = '엘리베이터에서 내리면 안내 데스크(3줄 요약)부터 들러요. 걷는 사람 표시가 둘러보는 순서를 따라 움직입니다.'
    return f'''<aside class="tw-panel" aria-label="{e(f["label"])} 층 안내">
<p class="tw-co"><b>{e(COMPANY["ko"])}</b> {e(COMPANY["hq"])} · <span>{e(COMPANY["en"])}</span></p>
<div class="tw-fl"><span class="tw-badge" style="--c:{f["color"]}">{e(f["label"])}</span><div><h2>{e(f["dept"])}</h2><p class="tw-en">{e(f["en"])} · {e(f["branch"])}</p></div></div>
<p class="tw-ep"><b>{e(f["ep"])}</b> {e(f["title"])}</p>
<p class="tw-biz">{e(f["biz"])}</p>
<h3>이 층 둘러보는 순서</h3>
<p class="tw-tip">{first}</p>
<ol class="tw-route">{_route_items(f)}</ol>
<nav class="tw-elev" aria-label="엘리베이터 — 층 이동">{"".join(el)}</nav>
</aside>'''

def _panel_index(f):
    rows = []
    for g in reversed(FLOORS[1:]):
        rows.append(f'<li data-k="{g["key"]}"><a href="{g["file"]}"><span class="tw-badge" style="--c:{g["color"]}">{e(g["label"])}</span><b>{e(g["dept"])}</b><span>{e(g["ep"])} · {e(g["title"])}</span></a></li>')
    rows.append(f'<li data-k="00" class="here"><a href="#three"><span class="tw-badge" style="--c:{f["color"]}">L</span><b>로비 · 안내 데스크</b><span>지금 계신 곳 · 이 목차 쪽</span></a></li>')
    clocks = ''.join(f'<span data-tz="{tz}"><b>{c}</b><i>--:--</i></span>' for c, tz in CLOCKS)
    return f'''<aside class="tw-panel" aria-label="층별 안내판">
<p class="tw-co"><b>{e(COMPANY["ko"])}</b> {e(COMPANY["hq"])} · <span>{e(COMPANY["en"])}</span></p>
<h2>층별 안내판</h2>
<p class="tw-biz">{e(COMPANY["motto"])}. 열세 부서가 한 층씩 쓰고, 7층과 8층 사이 라운지와 옥상 전망대에서 요약정리와 퀴즈를 봅니다. 건물의 층을 누르거나 아래 안내판에서 골라 올라가세요.</p>
<div class="tw-clock" aria-label="세계 지사 시각">{clocks}</div>
<ol class="tw-dir">{"".join(rows)}</ol>
<p class="tw-note">{e(COMPANY["note"])}</p>
</aside>'''

def tower_html(key):
    f = BYKEY[key]
    idx = key == '00'
    panel = _panel_index(f) if idx else _panel_floor(f)
    tools = ('<button type="button" data-v="b" class="on">건물 전체</button><button type="button" data-v="spin" aria-pressed="true">자동 회전</button>' if idx else
             '<button type="button" data-v="b">건물 전체</button><button type="button" data-v="p" class="on">이 층 평면</button>')
    hint = '드래그로 돌려 보고 층을 누르면 안내 카드가 열려요' if idx else '방을 누르면 그 칸으로 내려갑니다 · 드래그로 돌려 보기'
    cap = (f'{COMPANY["ko"]} 본사 타워 3D 모형: 로비부터 옥상까지 16개 층, 층마다 한 부서(회차)' if idx else
           f'{COMPANY["ko"]} 본사 타워 3D 모형에서 {f["label"]} {f["dept"]}을(를) 건물 밖으로 꺼내 보여 주는 층 평면')
    data = json.dumps(_data(key), ensure_ascii=False).replace('</', '<\\/')
    imap = json.dumps({'imports': {'three': f'https://cdn.jsdelivr.net/npm/three@{THREE_VER}/build/three.module.js',
                                   'three/addons/': f'https://cdn.jsdelivr.net/npm/three@{THREE_VER}/examples/jsm/'}})
    return f'''<!--tower:start-->
<style>
{CSS}
</style>
<section class="tower{' tw-idx' if idx else ''}" id="tower" data-floor="{key}" aria-label="{e(COMPANY['ko'])} 본사 타워 — 건물 안내">
<div class="tw-stage" role="img" aria-label="{e(cap)}">
<div class="tw-cv" aria-hidden="true"></div><div class="tw-labels" aria-hidden="true"></div>
<div class="tw-tools">{tools}</div>
<p class="tw-hint">{hint}</p>
<div class="tw-card" hidden></div>
<div class="tw-err" hidden>3D 건물을 불러오지 못했습니다(인터넷 연결 · WebGL 확인). 오른쪽 안내판으로 그대로 이동할 수 있어요.</div>
<div class="tw-load">건물을 짓는 중…</div>
</div>
{panel}
</section>
<script type="application/json" id="towerData">{data}</script>
<script type="importmap">{imap}</script>
<script type="module">
{JS}
</script>
<!--tower:end-->
'''

NAV_LINK = '<a href="#tower">건물 안내</a>'
