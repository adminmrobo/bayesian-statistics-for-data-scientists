import os, sys, json, re
sys.path.insert(0, 'build'); sys.path.insert(0, 'pages')
import importlib.util
def load(p):
    s = importlib.util.spec_from_file_location('x', p); m = importlib.util.module_from_spec(s); s.loader.exec_module(m); return m.P
pages = [load(os.path.join('pages', f)) for f in sorted(os.listdir('pages')) if re.match(r'p\d\d[mf]?\.py$', f)]
META = {
 '00': ('밝은 연구실 전경', 'a wall-sized concept map made of glowing circles and connecting lines (no text), like a constellation of ideas', '박사 center-back pointing at the map; 조수 at one side holding a blank clipboard; 초파리 on the left looking up at the map; 주판봇 on the right looking up at the map'),
 '01': ('연구실 옆 측정실', 'a big soup pot with a ladle lifting one spoonful of glowing liquid, beside two line charts made of light (no numbers)', '박사 holding the ladle up; 조수 tasting from a small spoon; 초파리 on the left examining the pot rim; 주판봇 on the right holding a huge bowl'),
 '02': ('연구실 한쪽의 놀이 테이블', 'a roulette wheel and a stream of flipping coins frozen in the air', '박사 spinning the wheel; 조수 catching coins in a tray; 초파리 on the left squinting at the wheel; 주판봇 on the right pushing a stack of abacus beads forward'),
 '03': ('밝은 연구실', 'a giant magnifying glass over a grid of tiny glowing dots, a few green and many red, and a stack of sealed envelopes', '박사 holding the magnifying glass; 조수 sorting envelopes; 초파리 on the left pointing at the red dots; 주판봇 on the right excited about the green dots'),
 '04': ('연구실의 실험 무대', 'two large glowing push buttons (one red, one blue) on pedestals with two overlapping bell-shaped light curves above them', '박사 between the buttons as referee; 조수 checking a stopwatch; 초파리 on the left guarding the blue button; 주판봇 on the right reaching for the red button'),
 '05': ('작은 상점 모형이 있는 연구실', 'shelves of small products linked by glowing threads, and a wall of blank video tiles', '박사 pointing at a thread between two products; 조수 arranging tiles; 초파리 on the left holding one popular product; 주판봇 on the right connecting many threads'),
 '06': ('연구실의 금고 앞', 'a brass balance scale with paper folders on one side, and several baskets of eggs spread apart', '박사 adjusting the scale; 조수 placing eggs in separate baskets; 초파리 on the left inspecting a folder; 주판봇 on the right stacking all eggs in one basket'),
 '07': ('연구실 바닥의 게임판', 'three glowing circles (sun, cloud, rain icons without letters) connected by curved arrows on the floor, and a ring of doors', '박사 standing in one circle; 조수 tracing an arrow; 초파리 on the left hopping between circles; 주판봇 on the right carrying a stack of coins toward a door'),
 '07m': ('연구실 칠판 앞', 'a chalkboard covered with seven blank cards and small quiz buttons, with a ribbon marking halfway', '박사 tapping the board; 조수 handing out blank cards; 초파리 on the left raising a hand; 주판봇 on the right holding a big score tally (no numbers)'),
 '08': ('햇살 드는 연구실 창가', 'thousands of tiny glowing dots raining into a square frame with a quarter circle, and a few dice in the air', '박사 releasing the dots from his hands with purple sparks; 조수 holding the frame; 초파리 on the left counting dots with a clicker; 주판봇 on the right pouring more dots from a bucket'),
 '09': ('연구실 천장 아래', 'a floating network of glowing nodes connected by arrows, and a funnel narrowing toward the floor', '박사 drawing an arrow in the air; 조수 holding the funnel; 초파리 on the left pointing at a hidden node in shadow; 주판봇 on the right pulling one arrow'),
 '10': ('연구실 책상 위', 'floating speech bubbles filled with blank word chips that turn into small bar shapes', '박사 sorting chips into two piles; 조수 reading a long scroll of blank lines; 초파리 on the left picking one chip; 주판봇 on the right scooping all chips'),
 '11': ('연구실의 영상 판독실', 'a lightbox with blurry silhouette images and a camera lens projecting many slightly different copies of one silhouette', '박사 looking at the lightbox; 조수 adjusting the lens; 초파리 on the left comparing the copies; 주판봇 on the right pointing confidently at one copy'),
 '12': ('연구실의 지도 테이블', 'nested boxes (small boxes inside larger boxes) with glowing dots being pulled gently toward a central line', '박사 leaning over the table; 조수 placing small boxes; 초파리 on the left examining a tiny box with few dots; 주판봇 on the right lifting the big outer box'),
 '13': ('연구실 프로젝트 보드 앞', 'a project board with three blank panels (pie of groups, two curves, a staircase roadmap) and sticky notes without text', '박사 presenting the board; 조수 attaching notes; 초파리 on the left pointing at the staircase; 주판봇 on the right jumping to the top step'),
 '13f': ('연구실 진열장 앞', 'a shelf with six closed books and a small lamp, and a doorway glowing to the next room', '박사 opening the door; 조수 placing the last book; 초파리 on the left looking back at the shelf; 주판봇 on the right holding a lamp'),
}
C = {'doc': 'chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie',
     'asst': 'girl researcher, long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, jeans',
     'fly': 'anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings',
     'robo': 'boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, holding a wooden abacus'}
L = ['# 표지 지시문 모음 — 데이터 사이언티스트를 위한 베이지안 통계학', '', '각 페이지 맨 위 `data-img="cover_{N}"` 자리에 넣을 16:9 표지 그림 지시문입니다(ai-lab-explainer 18-14). 지금 페이지에는 네 캐릭터를 나란히 세운 대체 표지가 들어 있어요. 그림을 받으면 WebP 1600×900(220 KB 이하)으로 바꿔 넣습니다.', '', '**참고 이미지(함께 올리기):** 네 캐릭터 기본 그림 4장 — GitHub `adminmrobo/fruitfly-lab-expressions`. 첫 표지(목차)를 먼저 받아 그림체를 확인한 뒤 나머지에 참고 그림으로 함께 올리세요.', '']
for P in pages:
    key = P.get('key', P['num'].lower())
    k = key if key in META else P['num']
    place, meta, pose = META[k]
    alt = f'{P["title"]}의 표지: 박사, 조수, 초파리 연구원, 주판봇이 {place}에서 주제 소품을 바라보는 장면'
    prompt = f'''Website top cover illustration, wide 16:9.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Scene: a bright, airy research lab in soft daylight, clean white walls and pale gray-blue furniture (#ffffff to #f6f7fb), gentle shadows, pale blue monitor glow, small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9). High-key image that blends into a white web page; no dark background, no night sky.
All four characters together:
  {C['doc']}, {pose.split(';')[0].replace('박사','').strip()};
  {C['asst']}, {pose.split(';')[1].replace('조수','').strip()};
  {C['fly']}, on the left facing right, {pose.split(';')[2].replace('초파리 on the left','').strip()};
  {C['robo']}, on the right facing left, {pose.split(';')[3].replace('주판봇 on the right','').strip()}.
Visual metaphor of the topic: {meta}.
Composition: keep every face and hand inside the central safe area (12% margin left and right, 10% top, 18% bottom);
  keep the bottom-left corner light and simple (plain white wall); let the bottom edge fade to near-white so the image melts into a white page; the topic prop is the most saturated spot.
Mood: curious, friendly rivalry, the moment before the result.
No text, no letters, no numbers, no logos, no weapons, no cigarettes, no alcohol, no blood, no real brands.'''
    L += [f'## cover_{key} — {P["title"]}', '', '| 항목 | 내용 |', '|---|---|', f'| 키 · 판 | cover_{key} · L (16:9, 1920 이상) |', f'| 페이지 | `{P["file"]}` |', f'| 장소 | {place} |', f'| 주제 은유 | {meta} |', f'| 대체 글(alt) | {alt} |', '', '**Genspark에 붙여 넣기 ↓**', '```', '웹페이지 맨 위에 거는 표지 그림 1장을 만들어 줘.', '- 비율 16:9, 가로 1920px 이상', '- 첨부한 참고 이미지의 네 캐릭터(박사, 조수, 초파리 연구원, 주판봇)를 같은 그림체·같은 외형으로, 넷 모두 등장', '- 그림 안에 글자·숫자·로고를 넣지 말 것', '- 얼굴과 손은 가장자리에서 떨어진 가운데 영역에, 왼쪽 아래 구석은 밝고 단순하게(흰 벽), 아래 가장자리는 흰 페이지로 자연스럽게 이어지게
- 밤 장면·어두운 배경 금지, 전체적으로 밝은 낮 장면', '아래 영어 프롬프트를 그대로 써 줘.', '', prompt, '```', '', '고칠 때: `Same four characters, same art style and composition. Change only: {고칠 점}. Still no text.`', '']
open('out/docs/COVER_PROMPTS_series.md', 'w').write('\n'.join(L))
# 이미지 명세서(시리즈 공용)
man = []
for P in pages:
    key = P.get('key', P['num'].lower())
    man.append({'key': f'cover_{key}', 'board': 'L', 'size': '1600x900', 'page': P['file'], 'status': 'needed', 'fallback': 'CSS 그라데이션 + 캐릭터 팩 4명 나란히'})
    if P.get('kind', 'lesson') == 'lesson':
        man.append({'key': f'thumb_{key}', 'board': 'I', 'size': '600x400', 'page': 'index.html', 'status': 'needed', 'fallback': '목차 카드는 글자만'})
man.append({'key': 'og_series', 'board': 'K', 'size': '1200x630', 'page': 'all', 'status': 'done', 'file': 'assets/og_series.jpg', 'note': '대체 표지 화면을 찍은 임시 공유 그림. 목차 표지를 받으면 잘라 바꿈'})
doc = ['# 이미지 제작 명세서 — 데이터 사이언티스트를 위한 베이지안 통계학 (시리즈 공용)', '', '## 1. 그림체와 고정 외형', '캐릭터 팩 `CHAR_lab4` 18-3·18-4를 따릅니다. 16비트 RPG풍 픽셀아트, 굵은 어두운 외곽선, 흰 배경에 어울리는 밝은 낮 연구실 조명. 그림 안에 글자·숫자·로고 없음.', '', '## 2. 지금 쓰는 그림', '- 캐릭터 표정: 캐릭터 팩 1.3(fruitfly-lab-expressions @ 5269662) 96px를 페이지마다 필요한 키만 base64로 넣었습니다(페이지당 약 13~16장, 100 KB 안팎). 새로 그릴 표정은 없습니다.', '- 장면·컷: 모든 실험 그림은 Canvas로 그려 그림 파일이 필요 없습니다.', '- 표지: 16쪽 모두 대체 표지(그림 없이 완성 상태). 표지 지시문은 `COVER_PROMPTS_series.md`.', '', '## 3. 새로 그릴 그림 (우선순위)', '| 우선 | 키 | 판 | 내용 |', '|---|---|---|---|', '| P1 | cover_00 | L | 목차 표지(그림체 기준) |', '| P1 | cover_01 ~ cover_13 | L | 회차 표지 13장 |', '| P2 | cover_07m, cover_13f | L | 중간·기말 요약 표지 |', '| P2 | thumb_01 ~ thumb_13 | I | 목차 카드 썸네일(표지를 3:2로 자르기) |', '| P3 | og_series | K | 목차 표지를 1200×630으로 잘라 교체 |', '', '## 4. 넘겨받은 뒤 처리', '1. 16:9·글자 없음·네 캐릭터 외형 확인 → 2. WebP 1600×900(220 KB 이하) → 3. `<header class="cover" data-img="cover_{N}">` 자리에 넣기(빌드의 cover 함수) → 4. 390·768·1280 폭에서 얼굴 잘림 확인 → 5. 아래 매니페스트 status를 done으로.', '', '## 5. 매니페스트', '```json', json.dumps(man, ensure_ascii=False, indent=1), '```']
open('out/docs/IMG_00_index.md', 'w').write('\n'.join(doc))
print('docs ok', len(pages))
