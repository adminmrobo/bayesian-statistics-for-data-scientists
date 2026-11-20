# -*- coding: utf-8 -*-
"""이미 빌드된 index.html 을 '베이지안 통계 해설 + 건물 보기 썸네일' 첫 화면으로 고치고 tower.html 을 만든다.
python3 src/build/patch_home.py [html 폴더]   (기본: 저장소 루트)
build.py 를 다시 돌릴 수 있으면(build_extra.index 가 같은 결과를 낸다) 이 스크립트는 필요 없다."""
import os, re, sys, html, importlib.util
B = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, B)
import home
ROOT = sys.argv[1] if len(sys.argv) > 1 else os.path.dirname(os.path.dirname(B))
SITE = 'https://adminmrobo.github.io/bayesian-statistics-for-data-scientists/'
NAMES = {'doc': '박사', 'asst': '조수(하루)', 'fly': '초파리 연구원', 'robo': '주판봇'}

def load_lessons():
    d = os.path.join(os.path.dirname(B), 'pages'); sys.path.insert(0, d); L = {}
    for f in sorted(os.listdir(d)):
        if re.match(r'p\d\d\.py$', f):
            sp = importlib.util.spec_from_file_location('p', os.path.join(d, f)); m = importlib.util.module_from_spec(sp); sp.loader.exec_module(m)
            if m.P.get('kind', 'lesson') == 'lesson': L[m.P['num']] = m.P
    return L

def say(who, mood, text):
    return (f'<div class="say" data-who="{who}"><img class="who" data-who="{who}" data-mood="{mood}" data-img="{who}_{mood}" alt="" aria-hidden="true">'
            f'<div><b class="name">{NAMES[who]}</b><p>{text}</p></div></div>')

def sub1(pat, rep, s, flags=re.S):
    n = re.subn(pat, lambda m: rep, s, count=1, flags=flags)
    assert n[1] == 1, pat[:60]
    return n[0]

p = os.path.join(ROOT, 'index.html')
s = open(p, encoding='utf-8').read()
base_css = re.search(r'<style>\n(.*?)\n</style>', s, flags=re.S).group(1)

s = re.sub(r'<!--tower:start-->.*?<!--tower:end-->\n?', '', s, flags=re.S)                     # 3D 건물 빼기
s = sub1(r'<nav class="top" aria-label="섹션 바로가기">.*?</nav>\n?', home.nav_html('베이지안 통계 연구실'), s)
s = re.sub(r'<style>\.th-tower\{.*?</style>', '', s, flags=re.S)                                  # 다시 돌려도 한 번만
s = s.replace('<header class="hero ihero"', home.css() + '<header class="hero ihero"', 1)
# 머리말: 시리즈 소개 → 베이지안 통계 설명 + 지은이
m = re.search(r'(<header class="hero ihero".*?<p class="q">.*?</p>)(<p(?: class="lead2")?>.*?</p>(?:<p class="byline">.*?</p>)?)(<section class="kpis)', s, flags=re.S)
s = s[:m.start(2)] + f'<p class="lead2">{home.LEAD}</p>{home.byline()}' + s[m.end(2):]
s = re.sub(r'<a class="mt th-tower bld".*?</a>', '', s, flags=re.S)
s = s.replace('</nav></div><div class="wrap"><div class="dialog">', home.mosaic_tile() + '</nav></div><div class="wrap"><div class="dialog">', 1)
s = s.replace('aria-label="표지로 고르는 전체 15쪽"', 'aria-label="표지로 고르는 전체 15쪽과 건물 보기"')
# 베이지안이란 (머리말 바로 뒤)
s = re.sub(r'<section class="level" id="bayes">.*?</section>\n<script>\(function\(\)\{\nvar B=document.getElementById\(\'bylab\'\).*?</script>', '', s, flags=re.S)
s = s.replace('<section class="level" id="three">', home.bayes_section(say) + '<section class="level" id="three">', 1)
s = s.replace('각 회차에서는 칸마다 한 가지 핵심', '각 회차에서는 주제마다 한 가지 핵심')
# 목차 카드 + 건물 썸네일
s = re.sub(r'<section class="level" id="building">.*?</section>', '', s, flags=re.S)
s = sub1(r'<section class="level" id="map">.*?</section>', home.toc_section(load_lessons()) + home.building_section(), s)
s = s.replace('<p class="lead">각 회차 칸 맨 위의 "이 칸에서 가져갈 한 가지"를 모았어요.', '<p class="lead">각 회차 주제마다 맨 위에 둔 "가져갈 한 가지"를 모았어요.')
s = s.replace('<div class="lvhead"><h2>개념 사다리</h2>', '<div class="lvhead"><h2>개념 흐름</h2>')
open(p, 'w', encoding='utf-8').write(s)
print('index.html', len(s.encode()) // 1024, 'KB')

t = home.tower_page(base_css, SITE)
open(os.path.join(ROOT, 'tower.html'), 'w', encoding='utf-8').write(t)
print('tower.html', len(t.encode()) // 1024, 'KB')
