"""연습(요약·퀴즈) 페이지와 시리즈 목차(index) 렌더러."""
import json, os, re, html
e = html.escape

def lessons(B):
    out = {}
    d = os.path.join(B.ROOT, 'pages')
    for f in sorted(os.listdir(d)):
        if re.match(r'p\d\d\.py$', f):
            P = B.load(os.path.join(d, f))
            if P.get('kind', 'lesson') == 'lesson': out[P['num']] = P
    return out

def strip(s): return re.sub('<[^>]+>', '', s)

def thumbs_css(B):
    """표지 WebP에서 320x180 썸네일을 만들어 CSS 배경으로 한 번만 넣는다(목차 머리 모자이크·회차 카드 공용)."""
    import base64, io
    from PIL import Image
    cdir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'covers')
    tdir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'thumbs'); os.makedirs(tdir, exist_ok=True)
    keys = [f'{i:02d}' for i in range(1, 14)] + ['07m', '13f']
    css = []
    for k in keys:
        src = os.path.join(cdir, f'cover_{k}.webp'); dst = os.path.join(tdir, f'thumb_{k}.webp')
        if not os.path.exists(src): continue
        if not os.path.exists(dst) or os.path.getmtime(dst) < os.path.getmtime(src):
            Image.open(src).convert('RGB').resize((384, 216), Image.LANCZOS).save(dst, 'WEBP', quality=72, method=6)
        css.append(f'.th-{k}{{background-image:url(data:image/webp;base64,{base64.b64encode(open(dst, "rb").read()).decode()})}}')
    return '<style>' + ''.join(css) + '</style>'

# ---------- 요약·퀴즈 페이지 ----------
def review(P, B):
    try:
        import _plainer; PLK = _plainer.KEY
    except ImportError:
        PLK = {}
    M = B.Moods(); L = lessons(B)
    for k, v in B.DEFM.items(): M.add(k, v)
    nums = P['weeks']
    links = [('three', '3줄 요약'), ('cast', '식구'), ('summary', '1부 요약'), ('orig', '2부 교안 문제'), ('calc', '3부 업무 계산'), ('score', '점수'), ('kg', '색인'), ('export', '꾸러미')]
    o = [B.head(P, P['title'], P['desc'], P['file']), B.nav(links, f'{B.SERIES_SHORT} {P["num"]}'), B.cover(P, M, f'cover_{P["key"]}')]
    hero_talk = ''.join(B.say(*t, M) for t in P['hero_talk'])
    kp = ''.join(f'<div class="kpi {c}"><b>{v}</b><span>{t}</span></div>' for v, t, c in P['kpis'])
    o.append(f'<header class="hero" id="hero"><div class="wrap hero-grid"><div class="hero-text"><span class="eyebrow">{e(P["eyebrow"])}</span><h1>{P["title"]}</h1><p class="q">{P["question"]}</p><p>{P["intro"]}</p><section class="kpis k4">{kp}</section></div><div class="dialog">{hero_talk}</div></div></header>')
    T = P['three']
    o.append(f'<section class="level" id="three"><div class="wrap"><div class="three"><h2>처음 오신 분께 — 이 페이지를 3줄로</h2><ol><li><b>무엇을</b><span>{T["what"]}</span></li><li><b>왜 중요한가</b><span>{T["why"]}</span></li><li><b>업무에서는</b><span>{T["work"]}</span></li></ol><p class="ok">점수는 이 화면에서만 세고 저장하지 않아요. 70% 미만인 회차는 해설 페이지로 안내합니다.</p></div></div></section>')
    o.append(f'<section class="level" id="cast"><div class="wrap stack"><div class="lvhead"><h2>연구실 식구</h2></div>{B.crew_html(M)}</div></section>')
    # 1부 요약
    cards = []
    for n in nums:
        Q = L[n]
        rows = ''.join(f'<li><b>{e(strip(a))}</b> — {e(strip(b))} <span class="muted">(남은 한계: {e(strip(c))})</span></li>' for a, b, c in Q['summary']['table'])
        kp2 = ' · '.join(f'{strip(v)} {strip(t)}' for v, t, c in Q['kpis'][:2])
        keys = ''.join(f'<li>{e(PLK[(n, l["id"])])}</li>' for l in Q['levels'] if (n, l['id']) in PLK)
        cards.append(f'<div class="sumcard"><span class="eyebrow">{n}회차</span><h3><a href="{Q["file"]}">{strip(Q["title"])}</a></h3><p class="muted" style="font-size:14px">{strip(Q["question"])}</p><div class="keyline small"><span class="kl-tag">가져갈 세 가지</span><ol>{keys}</ol></div><p style="font-size:14px"><b>박사의 한 줄:</b> {e(strip(Q["summary"]["doc_line"]))}</p><details class="more"><summary>칸별 요약과 숫자 (펼쳐 보기)</summary><ul>{rows}</ul><p style="font-size:14px"><b>숫자 두 개:</b> {e(kp2)}</p></details></div>')
    flow = ' <i>→</i> '.join(f'<span>{n} {e(L[n]["short_title"])}</span>' for n in nums)
    o.append(f'<section class="level" id="summary"><div class="wrap stack"><div class="lvhead"><div class="hexrow"><div class="hexno">1<small>요약</small></div><h2>1부 · 회차별 요약정리</h2></div><p class="lead">{P["summary_lead"]}</p></div><div class="flowchips">{flow}</div><div class="sumgrid">{"".join(cards)}</div>{B.say(*P["summary_say"], M)}</div></section>')
    # 2부 교안 문제
    quiz = {}; blocks = []
    for n in nums:
        qs = P['orig'][n]; quiz['w' + n] = qs['items']
        note = f'<p class="notice">{qs["note"]}</p>' if qs.get('note') else ''
        blocks.append(f'<div class="stack" style="gap:12px"><h3>{n}회차 · <a href="{L[n]["file"]}">{e(L[n]["short_title"])}</a> <small class="muted">{len(qs["items"])}문항 · {"교안 문항" if qs.get("src") == "orig" else "새로 만든 문항"}</small></h3>{note}<div class="quiz" data-quiz="w{n}" data-wk="{n}"></div></div>')
    o.append(f'<section class="level" id="orig"><div class="wrap stack"><div class="lvhead"><div class="hexrow"><div class="hexno">2<small>문제</small></div><h2>2부 · 교안 연습문제</h2></div><p class="lead">{P["orig_lead"]}</p></div>{"".join(blocks)}</div></section>')
    # 3부 업무 계산
    pr = []
    for n in nums:
        c = P['calc'][n]
        steps = ''.join(f'<li>{s}</li>' for s in c['steps'])
        pr.append(f'''<div class="prac" data-ans="{c["ans"]}" data-tol="{c["tol"]}" data-wk="{n}"><h4>{n}회차 · {c["title"]}</h4><p>{c["q"]}</p><div class="inrow"><input type="text" inputmode="decimal" aria-label="{n}회차 답 입력" placeholder="숫자만"><span class="muted">{c["unit"]}</span><button class="bt primary chk" type="button">채점</button><button class="bt show" type="button">풀이 보기</button></div><p class="pfb" aria-live="polite"></p><div class="sol"><ol>{steps}</ol><p class="miss"><b>초파리의 흔한 실수</b> · {c["miss"]}</p><p class="muted" style="font-size:14px"><b>업무에서는</b> · {c["work"]} (숫자는 예시값)</p><p style="font-size:14px"><a href="{L[n]["file"]}#{c["lv"]}">관련 칸 다시 보기 →</a></p></div></div>''')
    o.append(f'<section class="level" id="calc"><div class="wrap stack"><div class="lvhead"><div class="hexrow"><div class="hexno">3<small>계산</small></div><h2>3부 · 업무 장면 계산 문제</h2></div><p class="lead">회차마다 업무 장면 하나를 숫자로 풀어 봅니다. 답을 넣고 채점하면 허용 오차 안에서 정답 처리돼요. 모든 숫자는 예시값입니다.</p></div>{B.say("fly","point","단위부터 확인해. 퍼센트로 넣으라는데 0.15를 넣으면 틀린 거야.",M)}{"".join(pr)}</div></section>')
    # 점수
    sb = ''.join(f'<div data-wk="{n}" data-n="{len(P["orig"][n]["items"]) + 1}"><span>{n}회차</span><b>0/{len(P["orig"][n]["items"]) + 1}</b><small class="muted"></small></div>' for n in nums)
    o.append(f'<section class="level" id="score"><div class="wrap stack"><div class="lvhead"><h2>회차별 점수</h2><p class="lead">교안 문제와 계산 문제를 맞힌 수예요. 저장하지 않으며, 새로고침하면 처음부터입니다.</p></div><div class="scoreboard">{sb}</div>{B.say("asst","report","70% 미만인 회차는 노란색으로 표시돼요. 그 회차 해설 페이지의 확인 퀴즈부터 다시 보세요.",M)}{B.say(*P["outro_doc"], M)}</div></section>')
    o.append(B.KG_SEC); o.append(B.export_sec(M)); o.append(B.footer(P))
    # KG: 회차 칸 개념 + 문항
    nodes = []; edges = []; ids = set()
    def node(id, type, ko, en, anchor, d=''):
        if id in ids: return
        ids.add(id); n = {'id': id, 'type': type, 'label': {'ko': ko, 'en': en}, 'page': P['file'][:-5], 'anchor': anchor, 'domain': ['stats'], 'status': 'known', 'confidence': 'high'}
        if d: n['definition'] = {'ko': d}
        nodes.append(n)
    prev = None
    for n in nums:
        for l in L[n]['levels']:
            node(l['node'][0], l['node'][1], l['node'][2], l['node'][3], '#summary', l['node'][4])
            if prev: edges.append({'s': prev, 'p': 'lab:prerequisiteOf', 'o': l['node'][0], 'anchor': '#summary', 'confidence': 'mid'})
            prev = l['node'][0]
        for qi, q in enumerate(P['orig'][n]['items']):
            qid = f'lab:quiz/{P["num"]}-w{n}-{qi+1}'; node(qid, 'QuizItem', strip(q['q'])[:60], f'review quiz {n}-{qi+1}', '#orig')
            edges.append({'s': qid, 'p': 'lab:assesses', 'o': L[n]['levels'][q.get('lv', 0)]['node'][0], 'anchor': '#orig', 'confidence': 'high'})
        cid = f'lab:quiz/{P["num"]}-calc{n}'; node(cid, 'QuizItem', strip(P['calc'][n]['title']), f'calc {n}', '#calc')
        edges.append({'s': cid, 'p': 'lab:assesses', 'o': L[n]['levels'][int(P['calc'][n]['lv'][-1]) - 1]['node'][0], 'anchor': '#calc', 'confidence': 'high'})
    for r in P['refs']:
        node(r['lab']['work'], 'Work', r['title'][:80], r['title'][:80], '#footer')
        edges.append({'s': r['lab']['work'], 'p': 'lab:relatedTo', 'o': L[nums[0]]['levels'][0]['node'][0], 'anchor': '#footer', 'confidence': 'mid'}) if r['id'].startswith('ahn2025') and False else None
    # 문헌 노드 고립 방지: 각 회차 첫 칸이 해당 원고에 근거
    for n in nums:
        w = f'lab:work/ahn2025bayes{n}'
        if w in ids: edges.append({'s': L[n]['levels'][0]['node'][0], 'p': 'lab:relatedTo', 'o': w, 'anchor': '#summary', 'confidence': 'high'})
    G = {'version': '1.0', 'page': P['file'][:-5], 'nodes': nodes, 'edges': edges}
    P.setdefault('levels', [])
    P['flow'] = [[f'{n} {L[n]["short_title"]}', 0] for n in nums]
    o.append(B.sprites(M)); o.append(B.tail(P, G, {'quiz': quiz, 'gloss': {}, 'core': [], 'flow': P['flow']}))
    return ''.join(o), G

# ---------- 목차 ----------
def index(P, B):
    M = B.Moods(); L = lessons(B)
    for k, v in B.DEFM.items(): M.add(k, v)
    links = [('three', '3줄 요약'), ('map', '회차 지도'), ('keys', '한 줄 핵심'), ('dash', '종합 대시보드'), ('path', '개념 사다리'), ('how', '식구·사용법'), ('about', '자료와 원칙')]
    o = [B.head(P, P['title'], P['desc'], P['file']), B.nav(links, B.SERIES_SHORT), B.cover(P, M, 'cover_index')]
    kp = ''.join(f'<div class="kpi {c}"><b>{v}</b><span>{t}</span></div>' for v, t, c in P['kpis'])
    o.append(thumbs_css(B))
    tk = [(f'{i:02d}', L[f'{i:02d}']['file'], f'{i}회차 · ' + strip(L[f'{i:02d}']['short_title'] if L[f'{i:02d}'].get('short_title') else L[f'{i:02d}']['title'])) for i in range(1, 8)] + [('07m', '07m_midterm_review.html', '중간 요약·퀴즈')] + [(f'{i:02d}', L[f'{i:02d}']['file'], f'{i}회차 · ' + strip(L[f'{i:02d}'].get('short_title') or L[f'{i:02d}']['title'])) for i in range(8, 14)] + [('13f', '13f_final_review.html', '기말 요약·퀴즈')]
    mosaic = ''.join(f'<a class="mt th-{k}" href="{f}" title="{e(t)}"><span>{"중간" if k == "07m" else "기말" if k == "13f" else int(k)}</span><i class="sr">{e(t)}</i></a>' for k, f, t in tk)
    o.append(f'<header class="hero ihero" id="hero"><div class="wrap ihero-grid"><div class="hero-text"><span class="eyebrow">{e(P["eyebrow"])}</span><h1>{P["title"]}</h1><p class="q">{P["question"]}</p><p>{P["intro"]}</p><section class="kpis k4">{kp}</section></div><nav class="mosaic" aria-label="표지로 고르는 전체 15쪽">{mosaic}</nav></div><div class="wrap"><div class="dialog">{"".join(B.say(*t, M) for t in P["hero_talk"])}</div></div></header>')
    T = P['three']
    o.append(f'<section class="level" id="three"><div class="wrap"><div class="three"><h2>처음 오신 분께 — 이 과정을 3줄로</h2><ol><li><b>무엇을</b><span>{T["what"]}</span></li><li><b>왜 중요한가</b><span>{T["why"]}</span></li><li><b>업무에서는</b><span>{T["work"]}</span></li></ol><p class="ok">코드·수식을 몰라도 됩니다. 처음이라면 아래 <a href="#keys">한 줄 핵심 모음</a>부터 보고, 각 회차에서는 칸마다 한 가지 핵심 → 일상 비유 → 실험만 봐도 충분해요. 수식·풀이·코드는 접어 두었어요.</p></div></div></section>')
    def card(n):
        Q = L[n]
        return f'<a href="{Q["file"]}"><span class="ct th-{n}" aria-hidden="true"></span><b>{n}회차 · {e(Q["eyebrow"].split("·",1)[1].strip())}</b><span style="font-weight:700">{e(strip(Q["title"]))}</span><small>{e(strip(Q["question"]))}</small></a>'
    def rv(f, t, s): return f'<a class="review" href="{f}"><span class="ct th-{f[:3]}" aria-hidden="true"></span><b>요약 · 퀴즈</b><span style="font-weight:700">{t}</span><small>{s}</small></a>'
    part1 = ''.join(card(f'{i:02d}') for i in range(1, 8)) + rv('07m_midterm_review.html', '중간 요약정리 및 퀴즈', '1~7회차 요약, 교안 연습문제, 업무 계산 문제 7개')
    part2 = ''.join(card(f'{i:02d}') for i in range(8, 14)) + rv('13f_final_review.html', '기말 요약정리 및 퀴즈', '8~13회차 요약, 교안 연습문제, 업무 계산 문제 6개')
    o.append(f'<section class="level" id="map"><div class="wrap stack"><div class="lvhead"><h2>회차 지도</h2><p class="lead">13회차와 요약·퀴즈 두 쪽, 모두 열다섯 쪽입니다. 1부는 확률과 베이지안의 기초, 2부는 시뮬레이션과 실전 응용이에요.</p></div><h3>1부 · 확률에서 상태 변화까지 (1~7회차)</h3><div class="series">{part1}</div><h3>2부 · 시뮬레이션에서 종합 프로젝트까지 (8~13회차)</h3><div class="series">{part2}</div></div></section>')
    try:
        import _plainer; PLK = _plainer.KEY
    except ImportError:
        PLK = {}
    kcards = ''.join(f'<div class="kcard"><a href="{L[f"{i:02d}"]["file"]}"><b>{i}회차</b> {e(strip(L[f"{i:02d}"].get("short_title") or L[f"{i:02d}"]["title"]))}</a><ol>' + ''.join(f'<li>{e(PLK[(f"{i:02d}", l["id"])])}</li>' for l in L[f"{i:02d}"]['levels'] if (f"{i:02d}", l['id']) in PLK) + '</ol></div>' for i in range(1, 14))
    o.append(f'<section class="level" id="keys"><div class="wrap stack"><div class="lvhead"><h2>한 줄 핵심 모음 — 13회차 39가지</h2><p class="lead">각 회차 칸 맨 위의 "이 칸에서 가져갈 한 가지"를 모았어요. 복습하거나 수업·팀 교육에서 한 장으로 띄울 때 쓰세요.</p></div><div class="kgrid">{kcards}</div></div></section>')
    tabs = ''.join(f'<button class="bt" type="button" aria-pressed="false" data-k="{n:02d}" data-f="{L[f"{n:02d}"]["file"]}">{n}회차</button>' for n in range(1, 14))
    o.append(f'<section class="level" id="dash"><div class="wrap stack"><div class="lvhead"><h2>종합 대시보드 — 13회차를 한 화면에서</h2><p class="lead">회차 버튼을 누르면 그 회차의 핵심 모형이 열립니다. 슬라이더를 움직이거나 ▶ 재생을 눌러 보세요. 같은 대시보드가 각 회차 페이지에도 들어 있어요.</p></div><div class="dtabs" role="group" aria-label="회차 고르기">{tabs}</div><div class="dash panel" id="dashbox"></div><p><a id="dashlink" href="01_what_is_statistics.html#dash">1회차 해설 페이지에서 자세히 보기 →</a></p></div></section>')
    chips = ' <i>→</i> '.join(f'<span>{e(x)}</span>' for x in P['ladder'])
    o.append(f'<section class="level" id="path"><div class="wrap stack"><div class="lvhead"><h2>개념 사다리</h2><p class="lead">앞 회차의 한계가 다음 회차의 이유가 되도록 이어 두었어요.</p></div><div class="flowchips">{chips}</div><div class="tw"><table class="tb"><tr><th>회차</th><th>핵심 질문</th><th>이 회차가 남긴 한계 → 다음 회차</th></tr>' + ''.join(f'<tr><td>{n}</td><td>{e(strip(L[n]["question"]))}</td><td>{e(strip(L[n]["next_q"]))}</td></tr>' for n in sorted(L)) + '</table></div></div></section>')
    cast = B.crew_html(M)
    how = ''.join(f'<div><b>{a}</b><p>{b}</p></div>' for a, b in P['how'])
    o.append(f'<section class="level" id="how"><div class="wrap stack"><div class="lvhead"><h2>연구실 식구와 사용법</h2></div>{cast}<div class="steps four">{how}</div></div></section>')
    ab = ''.join(f'<li>{x}</li>' for x in P['about'])
    o.append(f'<section class="level" id="about"><div class="wrap stack"><div class="lvhead"><h2>자료와 원칙</h2></div><ul style="margin:0;padding-left:20px">{ab}</ul>{B.say("doc","front","좋은 연구실에는 의심하는 쪽과 확신하는 쪽이 둘 다 필요해요. 판정은 늘 숫자가 내립니다.",M)}</div></section>')
    o.append(B.footer(P, '<p><a href="KG_00_registry.json">시리즈 지식 그래프 등록부(JSON) 내려받기</a> · <a href="https://github.com/adminmrobo/bayesian-statistics-for-data-scientists" target="_blank" rel="noopener">GitHub 저장소</a></p>'))
    G = {'version': '1.0', 'page': 'index', 'nodes': [], 'edges': []}
    P.setdefault('levels', []); P['quiz'] = {}
    o.append(B.sprites(M)); o.append(B.tail(P, G, {'gloss': {}, 'core': [], 'quiz': {}}))
    return ''.join(o), None

def render(P, B):
    return review(P, B) if P['kind'] == 'review' else index(P, B)
