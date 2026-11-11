# -*- coding: utf-8 -*-
"""이미 빌드된 HTML에 3D 건물 안내 블록을 넣거나 갈아 끼운다.
python3 src/build/add_tower.py <html 폴더>   (기본: 저장소 루트)"""
import os, re, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import tower
ROOT = sys.argv[1] if len(sys.argv) > 1 else os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
for f in tower.FLOORS:
    p = os.path.join(ROOT, f['file'])
    if not os.path.exists(p): print('없음', p); continue
    s = open(p, encoding='utf-8').read()
    s = re.sub(r'<!--tower:start-->.*?<!--tower:end-->\n?', '', s, flags=re.S)
    blk = tower.tower_html(f['key'])
    i = s.find('</nav>', s.find('<nav class="top"'))
    assert i > 0, p
    s = s[:i + 6] + '\n' + blk + s[i + 6:]
    if tower.NAV_LINK not in s:
        s = s.replace('<div class="links">', '<div class="links">' + tower.NAV_LINK, 1)
    open(p, 'w', encoding='utf-8').write(s)
    print(f['label'], f['file'], len(s.encode()) // 1024, 'KB')
