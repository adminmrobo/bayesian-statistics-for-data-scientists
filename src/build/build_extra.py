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

# ---------- 요약·퀴즈 페이지 ----------
def review(P, B):
    M = B.Moods(); L = lessons(B)
    for k, v in B.DEFM.items(): M.add(k, v)
    nums = P['weeks']
    links = [('three', '3줄 요약'), ('summary', '1부 요약'), ('orig', '2부 교안 문제'), ('calc', '3부 업무 계산'), ('score', '점수'), ('kg', '색인'), ('export', '꾸러미')]
    o = [B.head(P, P['title'], P['desc'], P['file']), B.nav(links, f'{B.SERIES_SHORT} {P["num"]}'), B.cover(P, M, f'cover_{P["key"]}')]
    hero_talk = ''.join(B.say(*t, M) for t in P['hero_talk'])
    kp = ''.join(f'<div class="kpi {c}"><b>{v}</b><span>{t}</span></div>' for v, t, c in P['kpis'])
    o.append(f'<header class="hero" id="hero"><div class="wrap hero-grid"><div class="hero-text"><span class="eyebrow">{e(P["eyebrow"])}</span><h1>{P["title"]}</h1><p class="q">{P["question"]}</p><p>{P["intro"]}</p><section class="kpis k4">{kp}</section></div><div class="dialog">{hero_talk}</div></div></header>')
    T = P['three']
    o.append(f'<section class="level" id="three"><div class="wrap"><div class="three"><h2>처음 오신 분께 — 이 페이지를 3줄로</h2><ol><li><b>무엇을</b><span>{T["what"]}</span></li><li><b>왜 중요한가</b><span>{T["why"]}</span></li><li><b>업무에서는</b><span>{T["work"]}</span></li></ol><p class="ok">점수는 이 화면에서만 세고 저장하지 않아요. 70% 미만인 회차는 해설 페이지로 안내합니다.</p></div></div></section>')
    # 1부 요약
    cards = []
    for n in nums:
        Q = L[n]
        rows = ''.join(f'<li><b>{e(strip(a))}</b> — {e(strip(b))} <span class="muted">(남은 한계: {e(strip(c))})</span></li>' for a, b, c in Q['summary']['table'])
        kp2 = ' · '.join(f'{strip(v)} {strip(t)}' for v, t, c in Q['kpis'][:2])
        cards.append(f'<div class="sumcard"><span class="eyebrow">{n}회차</span><h3><a href="{Q["file"]}">{strip(Q["title"])}</a></h3><p class="muted" style="font-size:14px">{strip(Q["question"])}</p><ul>{rows}</ul><p style="font-size:14px"><b>숫자 두 개:</b> {e(kp2)}</p><p style="font-size:14px"><b>박사의 한 줄:</b> {e(strip(Q["summary"]["doc_line"]))}</p></div>')
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
    links = [('three', '3줄 요약'), ('map', '회차 지도'), ('path', '개념 사다리'), ('how', '사용법'), ('about', '자료와 원칙')]
    o = [B.head(P, P['title'], P['desc'], P['file']), B.nav(links, B.SERIES_SHORT), B.cover(P, M, 'cover_index')]
    kp = ''.join(f'<div class="kpi {c}"><b>{v}</b><span>{t}</span></div>' for v, t, c in P['kpis'])
    o.append(f'<header class="hero" id="hero"><div class="wrap hero-grid"><div class="hero-text"><span class="eyebrow">{e(P["eyebrow"])}</span><h1>{P["title"]}</h1><p class="q">{P["question"]}</p><p>{P["intro"]}</p><section class="kpis k4">{kp}</section></div><div class="dialog">{"".join(B.say(*t, M) for t in P["hero_talk"])}</div></div></header>')
    T = P['three']
    o.append(f'<section class="level" id="three"><div class="wrap"><div class="three"><h2>처음 오신 분께 — 이 과정을 3줄로</h2><ol><li><b>무엇을</b><span>{T["what"]}</span></li><li><b>왜 중요한가</b><span>{T["why"]}</span></li><li><b>업무에서는</b><span>{T["work"]}</span></li></ol><p class="ok">코드·수식을 몰라도 됩니다. 모든 회차에서 수식은 조수가 대신 묻고, 코드는 접어 두었어요.</p></div></div></section>')
    def card(n):
        Q = L[n]
        return f'<a href="{Q["file"]}"><b>{n}회차 · {e(Q["eyebrow"].split("·",1)[1].strip())}</b><span style="font-weight:700">{e(strip(Q["title"]))}</span><small>{e(strip(Q["question"]))}</small></a>'
    def rv(f, t, s): return f'<a class="review" href="{f}"><b>요약 · 퀴즈</b><span style="font-weight:700">{t}</span><small>{s}</small></a>'
    part1 = ''.join(card(f'{i:02d}') for i in range(1, 8)) + rv('07m_midterm_review.html', '중간 요약정리 및 퀴즈', '1~7회차 요약, 교안 연습문제, 업무 계산 문제 7개')
    part2 = ''.join(card(f'{i:02d}') for i in range(8, 14)) + rv('13f_final_review.html', '기말 요약정리 및 퀴즈', '8~13회차 요약, 교안 연습문제, 업무 계산 문제 6개')
    o.append(f'<section class="level" id="map"><div class="wrap stack"><div class="lvhead"><h2>회차 지도</h2><p class="lead">13회차와 요약·퀴즈 두 쪽, 모두 열다섯 쪽입니다. 1부는 확률과 베이지안의 기초, 2부는 시뮬레이션과 실전 응용이에요.</p></div><h3>1부 · 확률에서 상태 변화까지 (1~7회차)</h3><div class="series">{part1}</div><h3>2부 · 시뮬레이션에서 종합 프로젝트까지 (8~13회차)</h3><div class="series">{part2}</div></div></section>')
    chips = ' <i>→</i> '.join(f'<span>{e(x)}</span>' for x in P['ladder'])
    o.append(f'<section class="level" id="path"><div class="wrap stack"><div class="lvhead"><h2>개념 사다리</h2><p class="lead">앞 회차의 한계가 다음 회차의 이유가 되도록 이어 두었어요.</p></div><div class="flowchips">{chips}</div><div class="tw"><table class="tb"><tr><th>회차</th><th>핵심 질문</th><th>이 회차가 남긴 한계 → 다음 회차</th></tr>' + ''.join(f'<tr><td>{n}</td><td>{e(strip(L[n]["question"]))}</td><td>{e(strip(L[n]["next_q"]))}</td></tr>' for n in sorted(L)) + '</table></div></div></section>')
    cast = ''.join(f'<div>{B.img(w_, B.DEFM[w_], M, "")}<b style="color:var(--c-{w_})">{B.NAMES[w_]}</b><p class="muted" style="font-size:14px">{t}</p></div>' for w_, t in [('doc', '해설과 판정. 판단은 데이터대로.'), ('asst', '실험과 숫자 발표, 수식을 대신 물어봄.'), ('fly', '의심하는 쪽. 기준선·검증·반칙 찾기.'), ('robo', '확신하는 쪽. 크고 높은 숫자를 좋아함.')])
    how = ''.join(f'<div><b>{a}</b><p>{b}</p></div>' for a, b in P['how'])
    o.append(f'<section class="level" id="how"><div class="wrap stack"><div class="lvhead"><h2>등장인물과 사용법</h2></div><div class="cast">{cast}</div><div class="steps four">{how}</div></div></section>')
    ab = ''.join(f'<li>{x}</li>' for x in P['about'])
    o.append(f'<section class="level" id="about"><div class="wrap stack"><div class="lvhead"><h2>자료와 원칙</h2></div><ul style="margin:0;padding-left:20px">{ab}</ul>{B.say("doc","front","좋은 연구실에는 의심하는 쪽과 확신하는 쪽이 둘 다 필요해요. 판정은 늘 숫자가 내립니다.",M)}</div></section>')
    o.append(B.footer(P, '<p><a href="KG_00_registry.json">시리즈 지식 그래프 등록부(JSON) 내려받기</a> · <a href="https://github.com/adminmrobo/bayesian-statistics-for-data-scientists" target="_blank" rel="noopener">GitHub 저장소</a></p>'))
    G = {'version': '1.0', 'page': 'index', 'nodes': [], 'edges': []}
    P.setdefault('levels', []); P['quiz'] = {}
    o.append(B.sprites(M)); o.append(B.tail(P, G, {'gloss': {}, 'core': [], 'quiz': {}}))
    return ''.join(o), None

def render(P, B):
    return review(P, B) if P['kind'] == 'review' else index(P, B)
