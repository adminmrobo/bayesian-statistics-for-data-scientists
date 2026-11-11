#!/usr/bin/env python3
"""연구실 해설(비전공자판) 빌드: pages/*.py 의 P 딕셔너리 → 단일 HTML (CSS·JS·캐릭터 그림 내장)."""
import json, re, sys, html, importlib.util, os, datetime, base64
B = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(B)
OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, 'out')
SITE = 'https://adminmrobo.github.io/bayesian-statistics-for-data-scientists/'
SERIES = '데이터 사이언티스트를 위한 베이지안 통계학 — 연구실 해설'
SERIES_SHORT = '베이지안 통계 연구실'
AUTHOR = '안상선'; AFFIL = '(주)M-Robo 대표'; WHO = 'https://adminmrobo.github.io/who_am_i/who_am_i.html'
TODAY = '2026-11-10'; VER = '1.0'
SP = json.load(open(os.path.join(B, 'sprites.json'), encoding='utf-8'))
CSS = open(os.path.join(B, 'base.css'), encoding='utf-8').read() + '\n' + open(os.path.join(B, 'plain.css'), encoding='utf-8').read()
JS = open(os.path.join(B, 'lab.js'), encoding='utf-8').read() + '\n' + open(os.path.join(B, 'sims.js'), encoding='utf-8').read() + '\n' + open(os.path.join(B, 'dash.js'), encoding='utf-8').read()
NAMES = {'doc': '박사', 'asst': '조수(하루)', 'fly': '초파리 연구원', 'robo': '주판봇'}
DEFM = {'doc': 'front', 'asst': 'smile', 'fly': 'clip', 'robo': 'smile'}
e = html.escape

sys.path.insert(0, os.path.join(ROOT, 'pages'))
def load(path):
    spec = importlib.util.spec_from_file_location('p', path); m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m); return m.P

class Moods:
    def __init__(s): s.k = set()
    def add(s, who, mood): s.k.add(f'{who}_{mood}')

def img(who, mood, M, cls='who'):
    M.add(who, mood)
    return f'<img class="{cls}" data-who="{who}" data-mood="{mood}" data-img="{who}_{mood}" alt="" aria-hidden="true">'

def say(who, mood, text, M):
    return f'<div class="say" data-who="{who}">{img(who, mood, M)}<div><b class="name">{NAMES[who]}</b><p>{text}</p></div></div>'

def sprites(M):
    alias = {}; imgs = {}; facing = {}
    for k in sorted(M.k):
        a = SP['alias'].get(k, k)
        if a not in SP['img']:
            who = k.split('_')[0]; a = SP['alias'][f'{who}_{DEFM[who]}']
        alias[k] = a; imgs[a] = SP['img'][a]
        if a in SP['facing']: facing[a] = SP['facing'][a]
    kb = sum(len(v) for v in imgs.values()) * 3 // 4 // 1024
    return (f'<script>/* 캐릭터 팩 https://github.com/adminmrobo/fruitfly-lab-expressions @ 5269662, 96px, {len(imgs)}장, 약 {kb} KB */\n'
            f'var SPRITE={json.dumps(imgs)};\nvar SPRITE_ALIAS={json.dumps(alias, ensure_ascii=False)};\nvar SPRITE_FACING={json.dumps(facing)};</script>')

def cover(P, M, key):
    chip = f'{SERIES_SHORT} · {P["num"]}'
    f = os.path.join(B, 'covers', ('cover_00' if key == 'cover_index' else key) + '.webp')
    if os.path.exists(f):
        b64 = base64.b64encode(open(f, 'rb').read()).decode()
        t = re.sub('<[^>]+>', '', P['title'])
        alt = f'{t} 표지 그림: 박사, 조수(하루), 초파리 연구원, 주판봇이 밝은 연구실에서 이 회차의 주제 소품을 둘러싼 장면'
        return (f'<header class="cover hasimg" id="cover" data-img="{key}">'
                f'<img src="data:image/webp;base64,{b64}" width="1600" height="900" alt="{e(alt)}" decoding="async">'
                f'<span class="cover-chip">{e(chip)}</span></header>\n')
    return (f'<header class="cover fallback" id="cover" data-img="{key}" role="img" aria-label="표지 그림 자리: 박사, 조수, 초파리 연구원, 주판봇이 나란히 선 대체 표지">'
            f'<div class="glow"></div><div class="line">{img("fly","point",M,"fly")}{img("doc","front",M,"")}{img("asst","smile",M,"")}{img("robo","coin",M,"")}</div>'
            f'<span class="cover-chip">{e(chip)}</span></header>')

def head(P, title, desc, fname):
    url = SITE + fname
    return f'''<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="description" content="{e(desc)}">
<meta property="og:type" content="article">
<meta property="og:title" content="{e(title)}">
<meta property="og:description" content="{e(desc)}">
<meta property="og:image" content="{SITE}assets/og/cover_{P["num"].lower()}.jpg">
<meta property="og:url" content="{url}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M8 0l7 4v8l-7 4-7-4V4z' fill='%239ab0d0'/%3E%3C/svg%3E">
<title>{e(P.get('short_title', title))}</title>
<meta name="citation_title" content="{e(title)}">
<meta name="citation_author" content="{AUTHOR}">
<meta name="citation_publication_date" content="{TODAY.replace('-', '/')}">
<meta name="dc.title" content="{e(title)}"><meta name="dc.creator" content="{AUTHOR}"><meta name="dc.date" content="{TODAY}"><meta name="dc.language" content="ko">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;500;700&display=swap">
<style>
{CSS}
</style>
</head>
<body>
<div id="prog"></div>
<div id="tip" role="tooltip"></div>
'''

def nav(links, label):
    a = ''.join(f'<a href="#{i}">{e(t)}</a>' for i, t in links)
    return f'<nav class="top" aria-label="섹션 바로가기"><div class="wrap"><a class="logo" href="index.html"><i></i>{e(label)}</a><div class="links">{a}</div></div></nav>\n'

def footer(P, extra=''):
    src = ''.join(f'<li>[{i+1}] {s}</li>' for i, s in enumerate(P.get('sources', [])))
    ex = ''.join(f'<li>{x}</li>' for x in P.get('examples', []))
    ch = ''
    if P.get('changes'):
        ch = '<div class="changes"><h4>원자료와 다르게 쓴 곳</h4><ul style="margin:0;padding-left:20px">' + ''.join(f'<li>{x}</li>' for x in P['changes']) + '</ul></div>'
    nv = '<div class="pnav">' + (f'<a href="{P["prev"][0]}">← {e(P["prev"][1])}</a>' if P.get('prev') else '<span></span>') + '<a href="index.html">목차</a>' + (f'<a href="{P["next"][0]}">{e(P["next"][1])} →</a>' if P.get('next') else '<span></span>') + '</div>'
    fin = '<p class="notice">이 페이지는 교육용이며 투자 자문이 아닙니다.</p>' if P.get('finance') else ''
    return f'''<footer id="footer"><div class="wrap stack">
{nv}
<div><h3>출처</h3><ol style="margin:0;padding-left:20px;list-style:none">{src}</ol></div>
<div><h3>예시값·설명용 모형인 것</h3><ul style="margin:0;padding-left:20px">{ex}</ul></div>
{ch}{extra}{fin}
<p>글 · {AUTHOR} (<a href="{WHO}" target="_blank" rel="noopener">소개 페이지</a>) · {AFFIL}<br>{e(SERIES)} {e(P["num"])} · v{VER} · {TODAY}<br>캐릭터: 박사 · 조수(하루) · 초파리 연구원 · 주판봇 — 캐릭터 이름·설정·그림의 저작권은 {AUTHOR}(개인)에게 있으며 허락 없이 쓸 수 없습니다. 그림: 캐릭터 팩 1.3 (fruitfly-lab-expressions @ 5269662).</p>
</div></footer>
<div id="study" aria-live="polite"><span id="stRead">읽은 곳 0%</span><span id="stQuiz">퀴즈 0/0</span><button class="bt" type="button" id="stGloss">밑줄: 핵심</button></div>
'''

# ---------- 지식 그래프 ----------
def slug(s):
    s = re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-'); return s or 'x'

def kg_build(P):
    num = P['num']; page = P['file'][:-5]; dom = P.get('domain', ['stats']); fam = P.get('family', 'bayes')
    nodes = []; edges = []; ids = set()
    def node(id, type, ko, en, anchor, definition='', **kw):
        if id in ids: return id
        ids.add(id)
        n = {'id': id, 'type': type, 'label': {'ko': ko, 'en': en}, 'page': page, 'anchor': anchor, 'domain': dom, 'status': 'known', 'confidence': kw.pop('confidence', 'high')}
        if definition: n['definition'] = {'ko': definition}
        n.update(kw); n.setdefault('match', [{'scheme': 'wikidata', 'id': '', 'rel': 'closeMatch', 'verified': False}]) if type in ('Concept', 'Method', 'Distribution', 'Theory') else None
        nodes.append(n); return id
    def edge(s, p, o, anchor, conf='high'):
        edges.append({'s': s, 'p': 'lab:' + p, 'o': o, 'anchor': anchor, 'confidence': conf})
    L = P['levels']; lv = []
    for i, l in enumerate(L):
        a = f'#{l["id"]}'
        n = node(l['node'][0], l['node'][1], l['node'][2], l['node'][3], a, l['node'][4], level=i + 1, family=fam, anchorType='D', flyStrength='none')
        lv.append(n)
        lim = node(f'lab:limitation/{num}-{l["id"]}', 'Limitation', l['limit_short'], l.get('limit_en', 'limitation of ' + l['node'][3]), a, l['explain']['limit'])
        edge(n, 'hasLimitation', lim, a)
        sim = node(f'lab:simulation/{num}-{l["id"]}', 'Simulation', l['sim_title'], 'simulation: ' + l['node'][3], a, '설명용 모형 실험')
        edge(n, 'demonstratedBy', sim, a)
        an = node(f'lab:analogy/{num}-{l["id"]}', 'Analogy', l['pair']['short'], 'analogy for ' + l['node'][3], a, re.sub('<[^>]+>', '', l['pair']['left']))
        edge(an, 'analogyOf', n, a, 'mid')
        for qi, q in enumerate(P['quiz'].get(l['id'], [])):
            qn = node(f'lab:quiz/{num}-{l["id"]}-{qi+1}', 'QuizItem', re.sub('<[^>]+>', '', q['q'])[:60], f'quiz {num}-{l["id"]}-{qi+1}', a)
            edge(qn, 'assesses', n, a)
    for i in range(len(lv) - 1):
        edge(lv[i], 'prerequisiteOf', lv[i + 1], f'#{L[i+1]["id"]}')
        edge(f'lab:limitation/{num}-{L[i]["id"]}', 'addressedBy', lv[i + 1], f'#{L[i+1]["id"]}', 'mid')
    cq = node(f'lab:question/{num}-core', 'Question', P['question'], P.get('question_en', 'core question ' + num), '#hero', P['question'])
    edge(lv[0], 'raises', cq, '#hero', 'mid')
    nq = node(f'lab:question/{num}-next', 'Question', P.get('next_q', '다음 회차에서 이어집니다'), 'open question after ' + num, '#sum', P.get('next_q', ''))
    edge(f'lab:limitation/{num}-{L[-1]["id"]}', 'raises', nq, '#sum', 'mid')
    D = P['duel']
    dq = node(f'lab:question/{num}-duel', 'Question', D['question'], 'duel question ' + num, '#duel', D['question'])
    mf = node(f'lab:method/{num}-duel-fly', 'Method', D['fly_choice'], 'duel choice A ' + num, '#duel', D['fly_choice'])
    mr = node(f'lab:method/{num}-duel-robo', 'Method', D['robo_choice'], 'duel choice B ' + num, '#duel', D['robo_choice'])
    mt = node(f'lab:metric/{num}-duel', 'Metric', D['metric'], 'duel metric ' + num, '#duel', D['metric'])
    edge(mf, 'contrastsWith', mr, '#duel'); edge(mf, 'evaluatedBy', mt, '#duel'); edge(mr, 'evaluatedBy', mt, '#duel')
    edge(lv[D.get('lv', len(lv) - 1)], 'raises', dq, '#duel', 'mid'); edge(dq, 'relatedTo', mf, '#duel', 'mid')
    for t, g in P['gloss'].items():
        if len(g) < 5: continue
        tid = node(g[4], 'Term' if g[1] in ('기호', '용어', '약어') else 'Concept', t, g[3], f'#{L[g[5]]["id"]}' if len(g) > 5 else '#hero', g[2], family=fam)
        if tid not in lv: edge(tid, 'partOf', lv[g[5] if len(g) > 5 else 0], f'#{L[g[5]]["id"]}' if len(g) > 5 else '#hero', 'mid')
    for r in P['refs']:
        node(r['lab']['work'], 'Work', r['title'][:80], r['title'][:80], '#footer', '')
    for f in P.get('facts', []):
        fid = node(f'lab:claim/{num}-{f["id"]}', 'Claim', f['ko'], f.get('en', 'claim ' + f['id']), f['anchor'], f['ko'], confidence=f.get('conf', 'high'), evidence=[f['id']], source=[{'cite': f['work'], 'loc': f.get('loc', ''), 'work': f['work'], 'verified': f.get('verified', True)}])
        edge(fid, 'supports', lv[f.get('lv', 0)], f['anchor'], f.get('conf', 'high'))
        w = next((r['lab']['work'] for r in P['refs'] if r['id'] == f['work']), None)
        if w: edge(fid, 'assertedIn', w, '#footer')
    return {'version': '1.0', 'page': page, 'nodes': nodes, 'edges': edges}

TYMAP = {'Concept': ['skos:Concept', 'schema:DefinedTerm'], 'Method': ['skos:Concept', 'schema:DefinedTerm'], 'Term': ['skos:Concept', 'schema:DefinedTerm'], 'Distribution': ['skos:Concept', 'schema:DefinedTerm'], 'Theory': ['skos:Concept', 'schema:DefinedTerm'], 'Work': ['schema:CreativeWork'], 'Claim': ['schema:Claim'], 'QuizItem': ['schema:Question'], 'Metric': ['skos:Concept'], 'Question': ['schema:Question']}
def kg_ld(G):
    ctx = {'skos': 'http://www.w3.org/2004/02/skos/core#', 'schema': 'https://schema.org/', 'dct': 'http://purl.org/dc/terms/', 'prov': 'http://www.w3.org/ns/prov#', 'lab': 'urn:lab:'}
    graph = []
    for n in G['nodes']:
        o = {'@id': n['id'], '@type': TYMAP.get(n['type'], []) + ['lab:' + n['type']], 'skos:prefLabel': [{'@value': n['label']['ko'], '@language': 'ko'}, {'@value': n['label']['en'], '@language': 'en'}]}
        if n.get('definition'): o['skos:definition'] = {'@value': n['definition']['ko'], '@language': 'ko'}
        for ed in G['edges']:
            if ed['s'] == n['id']:
                p = {'lab:broader': 'skos:broader', 'lab:partOf': 'schema:isPartOf', 'lab:relatedTo': 'skos:related', 'lab:assertedIn': 'schema:citation'}.get(ed['p'], ed['p'])
                o.setdefault(p, []).append({'@id': ed['o']})
        graph.append(o)
    return {'@context': ctx, '@graph': graph}

def jdump(o):
    return json.dumps(o, ensure_ascii=False).replace('</', '<\\/')

def tail(P, G, extra_pd=None):
    meta = {'title': P['title'], 'series': SERIES, 'number': P['num'], 'creator': [{'name': AUTHOR, 'role': 'author', 'affiliation': AFFIL}], 'contributor': [{'name': 'AI 보조 제작', 'role': 'assistant'}],
            'date': TODAY, 'version': VER, 'language': ['ko'], 'license': '', 'url': SITE + P['file'], 'about': [l['node'][0] for l in P['levels']] if P.get('levels') else [],
            'educationalLevel': '입문', 'learningResourceType': 'interactive explainer', 'basedOn': [r['id'] for r in P['refs'] if r['lab'].get('role') == 'primary'],
            'suggestedCitation': f'{AUTHOR} ({TODAY[:4]}). {P["title"]}. {SERIES} {P["num"]}, v{VER}. {SITE}{P["file"]}'}
    pd = {'num': P['num'], 'gloss': {k: v[:3] for k, v in P.get('gloss', {}).items()}, 'core': P.get('core', list(P.get('gloss', {}).keys())[:12]), 'quiz': P.get('quiz', {}), 'duels': P.get('duels_js', []), 'flow': P.get('flow', [])}
    if extra_pd: pd.update(extra_pd)
    return (f'<script type="application/json" id="kg-raw">{jdump(G)}</script>\n<script type="application/ld+json" id="kg-ld">{jdump(kg_ld(G))}</script>\n'
            f'<script type="application/json" id="refs-csl">{jdump(P["refs"])}</script>\n<script type="application/json" id="page-meta">{jdump(meta)}</script>\n'
            f'<script type="application/json" id="page-data">{jdump(pd)}</script>\n<script>\n{JS}\nboot();\n</script>\n</body>\n</html>\n')

KG_SEC = '''<section class="level noglos" id="kg"><div class="wrap stack">
<div class="lvhead"><h2>지식 색인 — 이 페이지에서 찾아보기</h2><p class="lead">이 페이지의 개념·방법·용어·주장·질문을 찾아보고, 설명이 있는 자리로 바로 갑니다. 같은 데이터가 아래 꾸러미의 온톨로지가 됩니다.</p></div>
<div class="searchrow"><input class="search" id="kgQ" type="search" placeholder="예: 사후확률, prior" aria-label="지식 색인 검색"></div>
<div class="group" id="kgChips"></div>
<div class="kgl" id="kgList"></div>
<h3>사다리 경로</h3><div class="flowchips" id="kgFlow"></div>
<h3>미니 그래프 <small class="muted">점을 누르면 목록에서 펼쳐집니다</small></h3>
<div class="cwrap"><canvas id="kgGraph" aria-label="이 페이지 지식 그래프" role="img"></canvas></div>
<h3>열린 질문</h3><ul id="kgOpen" style="margin:0;padding-left:20px"></ul>
<div class="ctrl"><button class="bt" type="button" id="kgJson">JSON 내려받기</button><button class="bt" type="button" id="kgMer">Mermaid 내려받기</button><span class="muted" id="kgStat"></span></div>
<p class="muted" style="font-size:14px">전체 형식(JSON-LD·Turtle·CSV·CSL-JSON·BibTeX·RIS)은 다음 섹션의 꾸러미에서 받으세요.</p>
</div></section>
'''
def export_sec(M):
    return f'''<section class="level noglos" id="export"><div class="wrap stack">
<div class="lvhead"><h2>온톨로지·서지 꾸러미 — 이 페이지의 지식을 가져가기</h2></div>
<section class="kpis k4" id="exK"></section>
{say("asst","report",'<span id="exNote"></span>',M)}
<h3>이 페이지 인용하기</h3><div class="group" id="exCiteF"><button class="bt" type="button" data-f="txt" aria-pressed="true">일반 문장</button><button class="bt" type="button" data-f="bib" aria-pressed="false">BibTeX</button><button class="bt" type="button" data-f="ris" aria-pressed="false">RIS</button><button class="bt" type="button" id="exCopy">복사</button></div>
<pre class="out" id="exCite"></pre>
<h3>참고문헌</h3><ol class="reflist" id="exRefs"></ol>
<h3>범위와 형식</h3><div class="group" id="exScope"><button class="bt" type="button" data-s="all" aria-pressed="true">전체</button><button class="bt" type="button" data-s="concepts" aria-pressed="false">개념·방법만</button><button class="bt" type="button" data-s="claims" aria-pressed="false">주장 + 출처만</button><button class="bt" type="button" data-s="path" aria-pressed="false">선수 관계만</button></div>
<div class="ctrl"><button class="bt primary" type="button" id="exZip">꾸러미 ZIP 내려받기</button></div><div class="group" id="exFiles"></div>
<h3>확인 필요 목록</h3><ul id="exTodo" style="margin:0;padding-left:20px;font-size:14px"></ul>
<p class="muted" style="font-size:14px">꾸러미 v{VER} · {TODAY} · 어휘 lab: = urn:lab:</p>
</div></section>
'''

# ---------- 회차 페이지 ----------
def level_html(l, i, M, P):
    w = l.get('why'); m = l.get('math'); o = []
    tags = ''.join(f'<span class="lvtag{" g" if k == 0 else ""}">{t}</span>' for k, t in enumerate(l['tags']))
    o.append(f'<section class="level" id="{l["id"]}"><div class="wrap stack">\n<div class="lvhead"><div class="hexrow"><div class="hexno">{i+1}<small>{e(l["short"])}</small></div><h2>{l["title"]}</h2></div><p class="sub">{tags}</p><p class="lead">{l["lead"]}</p></div>')
    if l.get('key'):
        o.append(f'<div class="keyline"><span class="kl-tag">이 칸에서 가져갈 한 가지</span><p>{l["key"]}</p></div>')
    if w or m:
        o.append('<div class="whymath">')
        if w:
            o.append(f'<div class="whybox"><h4>왜 이 방법을 쓰나</h4><div class="row"><b>문제 상황</b><p>{w["problem"]}</p></div><div class="row"><b>앞 방법의 한계</b><p>{w["limit"]}</p></div><div class="row"><b>해법</b><p>{w["solve"]}</p></div><p class="easy"><b>쉽게 말하면</b> {w["easy"]}</p></div>')
        if m:
            parts = ''.join(f'<tr><td>{a}</td><td>{b}</td></tr>' for a, b in m['parts'])
            tr = ''.join(f'<span>{x}</span>' for x in m['try'])
            o.append(f'<details class="more mathmore"><summary>수식이 궁금하면 펼쳐 보기 — 수학 수식을 어려워하는 조수가 대신 물어봅니다</summary><div class="mathbox"><div class="who">{img("asst","shock",M)}<p>{m["q"]}</p></div><p class="school"><b>학교 수학으로 보면</b> {m["school"]}</p><div class="fx">{m["fx"]}</div><table>{parts}</table><div class="try"><b>숫자로 한 번 해 보기</b>{tr}</div><div class="who">{img("asst","spark",M)}<p>{m["comment"]}</p></div></div></details>')
        o.append('</div>')
    pr = l['pair']
    o.append(f'<div class="pair"><div><div class="tag fly">일상으로 치면</div><p>{pr["left"]}</p></div><div><div class="tag nn">통계로는</div><p>{pr["right"]}</p></div></div>')
    o.append('<div class="talk">' + ''.join(say(w_, m_, t_, M) for w_, m_, t_ in l['talk']) + '</div>')
    o.append(f'<section class="panel" aria-label="{e(l["sim_title"])}"><h3>실험 — {l["sim_title"]}</h3><div class="sim" data-sim="{l["sim"][0]}" data-cfg="{e(json.dumps(l["sim"][1], ensure_ascii=False))}"></div></section>')
    if l.get('sim2'):
        o.append(f'<section class="panel" aria-label="{e(l["sim2_title"])}"><h3>실험 2 — {l["sim2_title"]}</h3><div class="sim" data-sim="{l["sim2"][0]}" data-cfg="{e(json.dumps(l["sim2"][1], ensure_ascii=False))}"></div></section>')
    ex = l['explain']; steps = ''.join(f'<li>{s}</li>' for s in ex['steps'])
    o.append(f'<div class="explain"><details class="more"><summary>자세한 {ex["title"]} (펼쳐 보기)</summary><ol>{steps}</ol></details><p class="limit"><b>이 칸의 한계</b> · {ex["limit"]}</p></div>')
    if l.get('bridge'):
        b = l['bridge']; o.append('<details class="more"><summary>업무에 쓸 때 알아 둘 것 (펼쳐 보기)</summary><div class="bridges">' + (f'<div class="bridge gen"><h4>데이터 분석으로 치면</h4><p>{b["gen"]}</p><p class="lim">{b.get("gen_lim","")}</p></div>' if b.get('gen') else '') + (f'<div class="bridge field"><h4>현장에 옮기면</h4><p>{b["field"]}</p><p class="lim">{b.get("field_lim","")}</p></div>' if b.get('field') else '') + '</div></details>')
    if l.get('code'):
        rows = ''.join(f'<tr><td><code>{e(c)}</code></td><td>{t}</td></tr>' for c, t in l['code'])
        ct = {'orig': '교안의 파이썬 코드로 보면 (몰라도 됩니다)', 'example': '같은 방법을 보여 주는 예시 코드 — 교안 코드 아님 (몰라도 됩니다)', 'mixed': '교안의 파이썬 코드와 예시 코드 (몰라도 됩니다)'}[l.get('code_src', 'orig')]
        o.append(f'<details class="code"><summary>{ct}</summary><table>{rows}</table></details>')
    if l.get('say'):
        o.append(say(*l['say'], M))
    o.append(f'<div class="quiz" data-quiz="{l["id"]}"></div>\n</div></section>')
    return '\n'.join(o)

def duel_html(P, M):
    D = P['duel']
    M.add('fly', 'point'); M.add('robo', 'coin')
    res = D['expect']; mm = {'F': [('fly', 'arms'), ('robo', 'sigh'), ('doc', 'judge'), ('asst', 'spark')], 'R': [('fly', 'coffee'), ('fly', 'cry'), ('robo', 'happy'), ('doc', 'judge'), ('asst', 'spark')], 'C': [('fly', 'coffee'), ('robo', 'calc'), ('doc', 'think'), ('asst', 'report')], 'D': [('fly', 'coffee'), ('robo', 'meh'), ('doc', 'think'), ('asst', 'smile')]}[res]
    for w_, m_ in mm: M.add(w_, m_)
    fin = '<p class="notice">이 대결은 교육용 장난감 모형이며 투자 자문이 아닙니다.</p>' if P.get('finance') else ''
    return f'''<section class="level" id="duel"><div class="wrap stack">
<div class="lvhead"><h2>대결 — {D["question"]}</h2><p class="lead">{D["setup"]}</p></div>
<div class="duel" id="duelBox">
<div class="vs"><div class="side fly">{img("fly","point",M)}<b style="color:var(--c-fly)">초파리 연구원</b><p>{D["fly_line"]}</p><span class="lvtag">{D["fly_choice"]}</span></div><div class="mid">VS</div><div class="side robo">{img("robo","coin",M)}<b style="color:var(--c-robo)">주판봇</b><p>{D["robo_line"]}</p><span class="lvtag">{D["robo_choice"]}</span></div></div>
<p class="muted" style="text-align:center">먼저 맞혀 보기 (기록만 하고 저장하지 않아요)</p>
<div class="guess"><button class="bt" type="button" data-g="fly" aria-pressed="false">초파리가 이길 것 같다</button><button class="bt" type="button" data-g="robo" aria-pressed="false">주판봇이 이길 것 같다</button></div>
<div class="ctrl" style="justify-content:center"><button class="bt primary reveal" type="button">결과 보기</button></div>
<div class="result"><p class="muted">판정 기준: {D["metric"]} ({"높을수록" if D["hib"] else "낮을수록"} 좋음)</p><div class="bars"></div><p class="guessres muted"></p>
{say("asst","firm","",M)}
{say("doc","think","",M)}
</div></div>{fin}
</div></section>'''

def apply_plainer(P):
    """초보자 읽기 개정 데이터(pages/_plainer.py)를 페이지 데이터에 반영."""
    try:
        import _plainer as PL
    except ImportError:
        return
    n = P['num']
    for (k, i), v in PL.KPI.items():
        if k == n: P['kpis'][i] = v
    lv = {l['id']: l for l in P['levels']}
    for l in P['levels']:
        if (n, l['id']) in PL.KEY: l['key'] = PL.KEY[(n, l['id'])]
    for (k, path), v in PL.TEXT.items():
        if k != n: continue
        ks = path.split('.')
        d = lv[ks[0]] if ks[0] in lv else P
        ks = ks[1:] if ks[0] in lv else ks
        for x in ks[:-1]: d = d[x]
        assert ks[-1] in d, (n, path)
        d[ks[-1]] = v

def page(P):
    apply_plainer(P)
    M = Moods(); L = P['levels']; num = P['num']
    for k, v in DEFM.items(): M.add(k, v)
    P['duels_js'] = [{'el': '#duelBox', 'fn': P['duel']['fn'], 'cfg': P['duel'].get('cfg', {}), 'metric': P['duel']['metric'], 'lesson': P['duel']['lesson'], 'condLesson': P['duel'].get('cond_lesson', ''), 'higherIsBetter': P['duel']['hib'], 'drawMargin': P['duel'].get('margin', 0), 'fmt': P['duel'].get('fmt', ''), 'unit': P['duel'].get('unit', ''), 'dec': P['duel'].get('dec', 1)}]
    P['flow'] = []
    for l in L: P['flow'] += [[l['node'][2], 0], [l['limit_short'], 1]]
    links = [('three', '3줄 요약'), ('cast', '등장인물')] + [(l['id'], f'{i+1} {l["short"]}') for i, l in enumerate(L)] + [('dash', '대시보드'), ('duel', '대결'), ('sum', '정리'), ('kg', '색인'), ('export', '꾸러미')]
    o = [head(P, P['title'], P['desc'], P['file']), nav(links, f'{SERIES_SHORT} {num}'), cover(P, M, f'cover_{num}')]
    kp = ''.join(f'<div class="kpi {c}"><b>{v}</b><span>{t}</span></div>' for v, t, c in P['kpis'])
    hero_talk = ''.join(say(*t, M) for t in P['hero_talk'])
    o.append(f'''<header class="hero" id="hero"><div class="wrap hero-grid"><div class="hero-text"><span class="eyebrow">{e(P["eyebrow"])}</span><h1>{P["title"]}</h1><p class="q">{P["question"]}</p><p>{P["intro"]}</p><section class="kpis k4">{kp}</section></div><div class="dialog">{hero_talk}</div></div></header>''')
    T = P['three']; ab = ''.join(f'<dt>{e(a)}</dt><dd>{b}</dd>' for a, b in P.get('abbr', []))
    o.append(f'''<section class="level" id="three"><div class="wrap"><div class="three"><h2>처음 오신 분께 — 이 페이지를 3줄로</h2><ol><li><b>무엇을</b><span>{T["what"]}</span></li><li><b>왜 중요한가</b><span>{T["why"]}</span></li><li><b>업무에서는</b><span>{T["work"]}</span></li></ol><div class="route"><p><b>처음이라면 이렇게 읽으세요.</b> 칸마다 ① <b>가져갈 한 가지</b> → ② <b>일상으로 치면</b> → ③ <b>실험</b>만 봐도 충분해요. 수식, 자세한 풀이, 업무 팁, 코드는 접어 두었어요(몰라도 됩니다).</p><button class="bt" type="button" id="openAll" aria-pressed="false">접어 둔 내용 모두 펼치기</button></div>{"<details class='abbr'><summary>영어 약어 풀이</summary><dl>"+ab+"</dl></details>" if ab else ""}</div></div></section>''')
    cast = ''.join(f'<div>{img(w_, DEFM[w_], M, "")}<b style="color:var(--c-{w_})">{NAMES[w_]}</b><p class="muted" style="font-size:14px">{t}</p></div>' for w_, t in [('doc', '해설과 판정. 판단은 데이터대로 해요.'), ('asst', '실험 진행과 숫자 발표. 수식을 대신 물어봐요.'), ('fly', '의심하는 쪽. "그 숫자, 진짜야?"를 달고 살아요.'), ('robo', '확신하는 쪽. 크고 높은 숫자를 좋아해요.')])
    prevtxt = f'앞 회차: <a href="{P["prev"][0]}">{e(P["prev"][1])}</a>' if P.get('prev') else '시리즈의 첫 회차입니다.'
    o.append(f'''<section class="level" id="cast"><div class="wrap stack"><div class="lvhead"><h2>등장인물과 이 페이지 사용법</h2></div><div class="cast">{cast}</div><p class="muted">노란 점선 밑줄을 누르거나 손가락으로 대면 뜻이 나옵니다. 오른쪽 아래 도우미에서 밑줄을 핵심 → 전체 → 끄기로 바꿀 수 있어요. 모든 실험은 시드를 고정한 설명용 모형입니다. {prevtxt}</p></div></section>''')
    W = P['why_steps']; o.append('<section class="level" id="why"><div class="wrap stack"><div class="lvhead"><h2>왜 이 주제인가</h2></div><div class="steps">' + ''.join(f'<div><b>{a}</b><p>{b}</p></div>' for a, b in W) + '</div></div></section>')
    Bg = P['big']; o.append('<section class="level" id="big"><div class="wrap stack"><div class="lvhead"><h2>큰 그림</h2><p class="lead">' + P.get('big_lead', '') + '</p></div><div class="steps four">' + ''.join(f'<div><b>{a}</b><p>{b}</p></div>' for a, b in Bg) + '</div></div></section>')
    for i, l in enumerate(L): o.append(level_html(l, i, M, P))
    o.append(f'<section class="level" id="dash"><div class="wrap stack"><div class="lvhead"><h2>한눈에 보는 대시보드</h2><p class="lead">칸 ①②③에서 본 것을 한 화면에 모았어요. ▶ 재생을 누르면 숫자 카드와 그림이 함께 바뀝니다. 처음 값은 본문 예시와 같아요.</p></div><div class="dash panel" data-dash="{num}"></div></div></section>')
    o.append(duel_html(P, M))
    S = P['summary']
    rows = ''.join(f'<tr><td>{a}</td><td>{b}</td><td>{c}</td></tr>' for a, b, c in S['table'])
    terms = ''.join(f'<div><b>{a}</b><p>{b}</p></div>' for a, b in S['terms'])
    lims = ''.join(f'<li>{x}</li>' for x in S['analogy_limits'])
    o.append(f'''<section class="level" id="sum"><div class="wrap stack"><div class="lvhead"><h2>정리</h2></div><div class="tw"><table class="tb"><tr><th>칸</th><th>새로 생긴 능력</th><th>남은 한계</th></tr>{rows}</table></div><div class="steps">{terms}</div><div class="explain"><h4>비유의 한계</h4><ul>{lims}</ul></div>{say("doc","magic",S["doc_line"],M)}</div></section>''')
    o.append('<section class="level" id="outro"><div class="wrap stack"><div class="lvhead"><h2>아웃트로</h2></div>' + ''.join(say(*t, M) for t in P['outro']) + '</div></section>')
    o.append(KG_SEC); o.append(export_sec(M)); o.append(footer(P))
    G = kg_build(P)
    o.append(sprites(M)); o.append(tail(P, G))
    return ''.join(o), G

if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    reg = {}
    for f in sorted(os.listdir(os.path.join(ROOT, 'pages'))):
        if not f.endswith('.py') or f.startswith('_'): continue
        P = load(os.path.join(ROOT, 'pages', f))
        kind = P.get('kind', 'lesson')
        if kind == 'lesson':
            htm, G = page(P)
        else:
            import build_extra
            htm, G = build_extra.render(P, sys.modules[__name__])
        open(os.path.join(OUT, P['file']), 'w', encoding='utf-8').write(htm)
        if G:
            for n in G['nodes']:
                if n['type'] in ('Concept', 'Method', 'Term', 'Distribution', 'Theory'): reg[n['id']] = {'ko': n['label']['ko'], 'en': n['label']['en'], 'page': n['page'], 'domain': n['domain']}
        print(f, len(htm.encode()) // 1024, 'KB')
    json.dump({'version': VER, 'date': TODAY, 'ids': reg}, open(os.path.join(OUT, 'KG_00_registry.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
