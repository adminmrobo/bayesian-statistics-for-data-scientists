# 그림 지시문 — 시리즈 표지 · 개별 표지 · 회차별 본문 그림

흰 배경 페이지용(2026-11-11 개정: 대결 그림 13장과 시리즈 대표 표지에 인턴 시아·모아(심판)와 미공개 식구 X1~X3(방청객) 추가). 모든 그림은 글자 없음, 캐릭터 외형은 `adminmrobo/fruitfly-lab-expressions` 기본 그림을 참고 이미지로 함께 올립니다(인턴은 `images/_sheets/lab6_lineup.png`, 실루엣은 `images/x1`~`x3`). 개별 표지 16장은 네 캐릭터판으로 이미 받았으므로 다시 받지 않아도 됩니다.

| 묶음 | 키 | 장수 | 비율 · 크기 | 넣을 자리 |
|---|---|---|---|---|
| ① 시리즈 대표 표지 | series_key, og_series | 2 | 21:9 2400×1030 / 1200×630 | README 맨 위, 목차 공유 미리보기 |
| ② 개별 표지 | cover_00 ~ cover_13, cover_07m, cover_13f | 16 | 16:9 1600×900 | 각 페이지 맨 위 — 지시문은 `COVER_PROMPTS_series.md` |
| ③ 칸 그림 | fig_{회차}_lv1 ~ lv3 | 39 | 4:3 1200×900 | 각 칸의 "일상으로 치면 \| 통계로는" 상자 옆 |
| ④ 대결 그림 | duel_{회차} | 13 | 16:9 1600×900 | 각 회차 대결 칸 맨 위 |

모두 70장입니다. 받는 순서: ① series_key → ② cover_00 → (그림체 확정) → ② 나머지 표지 → ③·④ 회차 순서대로. 받은 그림은 WebP로 줄여(표지 220 KB, 칸 그림 120 KB 이하) 각 자리에 넣습니다.

고칠 때(공통): `Same characters, same art style and composition. Change only: {고칠 점}. Still no text, white background.`

## ① 시리즈 대표 표지

### series_key — 데이터 사이언티스트를 위한 베이지안 통계학 (대표 그림)

| 항목 | 내용 |
|---|---|
| 키 · 크기 | series_key · 21:9, 2400×1030 이상 |
| 넣을 자리 | README 맨 위, 목차 표지 대체 후보 |
| 대체 글(alt) | 연구실 식구 여섯과 방청석의 실루엣 셋이 밝은 연구실에서 증거를 하나씩 더해 믿음을 고쳐 가는 커다란 저울을 둘러싼 장면 |

**Genspark에 붙여 넣기 ↓**
```
시리즈 전체를 대표하는 가로로 긴 표지 그림 1장을 만들어 줘.
- 비율 21:9, 가로 2400px 이상
- 첨부한 참고 이미지의 연구실 식구 여섯(박사·조수·초파리 연구원·주판봇·시아·모아)과 미공개 실루엣 X1·X2·X3를 같은 그림체·같은 외형으로 모두 등장
- 밝은 낮의 흰 연구실, 아래 가장자리는 흰색으로 자연스럽게 사라지게
- 그림 안에 글자·숫자·로고 없음
아래 영어 프롬프트를 그대로 써 줘.

Series key visual, ultra-wide 21:9.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Scene: a bright, airy research lab in soft daylight, clean white walls (#ffffff to #f6f7fb), pale blue monitor glow, accents of magenta (#a8329f), green (#138a52) and blue (#2563c9). High-key, no dark background.
Center: a large brass balance scale; on one pan a soft glowing cloud (the prior belief), on the other a growing stack of small glowing evidence cubes; above it the cloud is reshaping into a sharper cloud (the updated belief).
Around it, a gentle path of thirteen small stepping stones curving from left to right, each stone holding a tiny icon of a lesson prop (coin, dice, button pair, shopping basket, umbrella and sunglasses, chain, board game square, rice grains, pipe, review strip, X-ray frame, nested boxes, staircase).
All four characters:
  chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie, center-back, adding one evidence cube to the scale;
  girl researcher, long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, jeans, beside the scale, holding a blank clipboard;
  anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, on the left facing right, squinting skeptically at the cloud;
  boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, holding a wooden abacus, on the right facing left, cheerfully sliding abacus beads;
  chibi girl maid intern Sia, long straight jet-black hair to the waist with side-swept bangs, calm gray eyes, small silver drop earrings, charcoal-black long-sleeved maid dress with white lace cuffs, white high collar with a large soft gray bow, long white frilled apron, no headdress, no glasses, standing at the far left edge as a referee with a small blank flag;
  chibi girl maid intern Moa, long ash-beige wavy hair to the waist with neat bangs, white frilled maid headband with a thin white ribbon over the left ear, big round amber-brown eyes, white shirt with a red and navy plaid bow tie, camel knit cardigan, white frilled apron, standing at the far right edge as a referee with a blank scorecard;
  three small cute chibi silhouette spectators, solid deep navy-black bodies (#1B1A2E) with a thin purple rim light, round white dot eyes, two pink cheek pixels, no mouth; X1 with a long side ponytail and a big pink ribbon, X2 with a round beret and round glasses with two teal reflections, X3 tiny with a cat-ear hood and a yellow pom-pom, not scary, peeking from a small audience bench in the lower middle background;
Composition: faces and hands inside the central safe area (15% margin left and right, 10% top, 20% bottom); the bottom edge fades to near-white.
Mood: curious, friendly rivalry, learning step by step.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

### og_series — 공유 미리보기

series_key를 받은 뒤 가운데를 1200×630(1.91:1)으로 잘라 `assets/og_series.jpg`를 바꿉니다. 새로 그릴 필요 없음. 자를 때 가운데 네 캐릭터 얼굴이 모두 들어가게 합니다.

## ② 개별 표지 16장

각 페이지 맨 위 16:9 표지입니다(`COVER_PROMPTS_series.md`와 같은 내용, 흰 배경판).

### cover_00 — 데이터 사이언티스트를 위한 베이지안 통계학

| 항목 | 내용 |
|---|---|
| 키 · 판 | cover_00 · L (16:9, 1920 이상) |
| 페이지 | `index.html` |
| 장소 | 밝은 연구실 전경 |
| 주제 은유 | a wall-sized concept map made of glowing circles and connecting lines (no text), like a constellation of ideas |
| 대체 글(alt) | 데이터 사이언티스트를 위한 베이지안 통계학의 표지: 박사, 조수, 초파리 연구원, 주판봇이 밝은 연구실 전경에서 주제 소품을 바라보는 장면 |

**Genspark에 붙여 넣기 ↓**
```
웹페이지 맨 위에 거는 표지 그림 1장을 만들어 줘.
- 비율 16:9, 가로 1920px 이상
- 첨부한 참고 이미지의 네 캐릭터(박사, 조수, 초파리 연구원, 주판봇)를 같은 그림체·같은 외형으로, 넷 모두 등장
- 그림 안에 글자·숫자·로고를 넣지 말 것
- 얼굴과 손은 가장자리에서 떨어진 가운데 영역에, 왼쪽 아래 구석은 밝고 단순하게(흰 벽), 아래 가장자리는 흰 페이지로 자연스럽게 이어지게
- 밤 장면·어두운 배경 금지, 전체적으로 밝은 낮 장면
아래 영어 프롬프트를 그대로 써 줘.

Website top cover illustration, wide 16:9.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Scene: a bright, airy research lab in soft daylight, clean white walls and pale gray-blue furniture (#ffffff to #f6f7fb), gentle shadows, pale blue monitor glow, small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9). High-key image that blends into a white web page; no dark background, no night sky.
All four characters together:
  chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie, center-back pointing at the map;
  girl researcher, long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, jeans, at one side holding a blank clipboard;
  anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, on the left facing right, looking up at the map;
  boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, holding a wooden abacus, on the right facing left, looking up at the map.
Visual metaphor of the topic: a wall-sized concept map made of glowing circles and connecting lines (no text), like a constellation of ideas.
Composition: keep every face and hand inside the central safe area (12% margin left and right, 10% top, 18% bottom);
  keep the bottom-left corner light and simple (plain white wall); let the bottom edge fade to near-white so the image melts into a white page; the topic prop is the most saturated spot.
Mood: curious, friendly rivalry, the moment before the result.
No text, no letters, no numbers, no logos, no weapons, no cigarettes, no alcohol, no blood, no real brands.
```

고칠 때: `Same four characters, same art style and composition. Change only: {고칠 점}. Still no text.`

### cover_01 — 통계학이 뭐죠? — 일상 속 데이터 이야기

| 항목 | 내용 |
|---|---|
| 키 · 판 | cover_01 · L (16:9, 1920 이상) |
| 페이지 | `01_what_is_statistics.html` |
| 장소 | 연구실 옆 측정실 |
| 주제 은유 | a big soup pot with a ladle lifting one spoonful of glowing liquid, beside two line charts made of light (no numbers) |
| 대체 글(alt) | 통계학이 뭐죠? — 일상 속 데이터 이야기의 표지: 박사, 조수, 초파리 연구원, 주판봇이 연구실 옆 측정실에서 주제 소품을 바라보는 장면 |

**Genspark에 붙여 넣기 ↓**
```
웹페이지 맨 위에 거는 표지 그림 1장을 만들어 줘.
- 비율 16:9, 가로 1920px 이상
- 첨부한 참고 이미지의 네 캐릭터(박사, 조수, 초파리 연구원, 주판봇)를 같은 그림체·같은 외형으로, 넷 모두 등장
- 그림 안에 글자·숫자·로고를 넣지 말 것
- 얼굴과 손은 가장자리에서 떨어진 가운데 영역에, 왼쪽 아래 구석은 밝고 단순하게(흰 벽), 아래 가장자리는 흰 페이지로 자연스럽게 이어지게
- 밤 장면·어두운 배경 금지, 전체적으로 밝은 낮 장면
아래 영어 프롬프트를 그대로 써 줘.

Website top cover illustration, wide 16:9.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Scene: a bright, airy research lab in soft daylight, clean white walls and pale gray-blue furniture (#ffffff to #f6f7fb), gentle shadows, pale blue monitor glow, small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9). High-key image that blends into a white web page; no dark background, no night sky.
All four characters together:
  chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie, holding the ladle up;
  girl researcher, long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, jeans, tasting from a small spoon;
  anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, on the left facing right, examining the pot rim;
  boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, holding a wooden abacus, on the right facing left, holding a huge bowl.
Visual metaphor of the topic: a big soup pot with a ladle lifting one spoonful of glowing liquid, beside two line charts made of light (no numbers).
Composition: keep every face and hand inside the central safe area (12% margin left and right, 10% top, 18% bottom);
  keep the bottom-left corner light and simple (plain white wall); let the bottom edge fade to near-white so the image melts into a white page; the topic prop is the most saturated spot.
Mood: curious, friendly rivalry, the moment before the result.
No text, no letters, no numbers, no logos, no weapons, no cigarettes, no alcohol, no blood, no real brands.
```

고칠 때: `Same four characters, same art style and composition. Change only: {고칠 점}. Still no text.`

### cover_02 — 확률이란? — 동전던지기부터 주식투자까지

| 항목 | 내용 |
|---|---|
| 키 · 판 | cover_02 · L (16:9, 1920 이상) |
| 페이지 | `02_probability.html` |
| 장소 | 연구실 한쪽의 놀이 테이블 |
| 주제 은유 | a roulette wheel and a stream of flipping coins frozen in the air |
| 대체 글(alt) | 확률이란? — 동전던지기부터 주식투자까지의 표지: 박사, 조수, 초파리 연구원, 주판봇이 연구실 한쪽의 놀이 테이블에서 주제 소품을 바라보는 장면 |

**Genspark에 붙여 넣기 ↓**
```
웹페이지 맨 위에 거는 표지 그림 1장을 만들어 줘.
- 비율 16:9, 가로 1920px 이상
- 첨부한 참고 이미지의 네 캐릭터(박사, 조수, 초파리 연구원, 주판봇)를 같은 그림체·같은 외형으로, 넷 모두 등장
- 그림 안에 글자·숫자·로고를 넣지 말 것
- 얼굴과 손은 가장자리에서 떨어진 가운데 영역에, 왼쪽 아래 구석은 밝고 단순하게(흰 벽), 아래 가장자리는 흰 페이지로 자연스럽게 이어지게
- 밤 장면·어두운 배경 금지, 전체적으로 밝은 낮 장면
아래 영어 프롬프트를 그대로 써 줘.

Website top cover illustration, wide 16:9.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Scene: a bright, airy research lab in soft daylight, clean white walls and pale gray-blue furniture (#ffffff to #f6f7fb), gentle shadows, pale blue monitor glow, small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9). High-key image that blends into a white web page; no dark background, no night sky.
All four characters together:
  chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie, spinning the wheel;
  girl researcher, long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, jeans, catching coins in a tray;
  anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, on the left facing right, squinting at the wheel;
  boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, holding a wooden abacus, on the right facing left, pushing a stack of abacus beads forward.
Visual metaphor of the topic: a roulette wheel and a stream of flipping coins frozen in the air.
Composition: keep every face and hand inside the central safe area (12% margin left and right, 10% top, 18% bottom);
  keep the bottom-left corner light and simple (plain white wall); let the bottom edge fade to near-white so the image melts into a white page; the topic prop is the most saturated spot.
Mood: curious, friendly rivalry, the moment before the result.
No text, no letters, no numbers, no logos, no weapons, no cigarettes, no alcohol, no blood, no real brands.
```

고칠 때: `Same four characters, same art style and composition. Change only: {고칠 점}. Still no text.`

### cover_03 — 베이지안 사고방식 — 업데이트하는 지혜

| 항목 | 내용 |
|---|---|
| 키 · 판 | cover_03 · L (16:9, 1920 이상) |
| 페이지 | `03_bayesian_thinking.html` |
| 장소 | 밝은 연구실 |
| 주제 은유 | a giant magnifying glass over a grid of tiny glowing dots, a few green and many red, and a stack of sealed envelopes |
| 대체 글(alt) | 베이지안 사고방식 — 업데이트하는 지혜의 표지: 박사, 조수, 초파리 연구원, 주판봇이 밝은 연구실에서 주제 소품을 바라보는 장면 |

**Genspark에 붙여 넣기 ↓**
```
웹페이지 맨 위에 거는 표지 그림 1장을 만들어 줘.
- 비율 16:9, 가로 1920px 이상
- 첨부한 참고 이미지의 네 캐릭터(박사, 조수, 초파리 연구원, 주판봇)를 같은 그림체·같은 외형으로, 넷 모두 등장
- 그림 안에 글자·숫자·로고를 넣지 말 것
- 얼굴과 손은 가장자리에서 떨어진 가운데 영역에, 왼쪽 아래 구석은 밝고 단순하게(흰 벽), 아래 가장자리는 흰 페이지로 자연스럽게 이어지게
- 밤 장면·어두운 배경 금지, 전체적으로 밝은 낮 장면
아래 영어 프롬프트를 그대로 써 줘.

Website top cover illustration, wide 16:9.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Scene: a bright, airy research lab in soft daylight, clean white walls and pale gray-blue furniture (#ffffff to #f6f7fb), gentle shadows, pale blue monitor glow, small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9). High-key image that blends into a white web page; no dark background, no night sky.
All four characters together:
  chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie, holding the magnifying glass;
  girl researcher, long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, jeans, sorting envelopes;
  anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, on the left facing right, pointing at the red dots;
  boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, holding a wooden abacus, on the right facing left, excited about the green dots.
Visual metaphor of the topic: a giant magnifying glass over a grid of tiny glowing dots, a few green and many red, and a stack of sealed envelopes.
Composition: keep every face and hand inside the central safe area (12% margin left and right, 10% top, 18% bottom);
  keep the bottom-left corner light and simple (plain white wall); let the bottom edge fade to near-white so the image melts into a white page; the topic prop is the most saturated spot.
Mood: curious, friendly rivalry, the moment before the result.
No text, no letters, no numbers, no logos, no weapons, no cigarettes, no alcohol, no blood, no real brands.
```

고칠 때: `Same four characters, same art style and composition. Change only: {고칠 점}. Still no text.`

### cover_04 — 고객 데이터 분석 — A/B 테스트 마스터하기

| 항목 | 내용 |
|---|---|
| 키 · 판 | cover_04 · L (16:9, 1920 이상) |
| 페이지 | `04_ab_test.html` |
| 장소 | 연구실의 실험 무대 |
| 주제 은유 | two large glowing push buttons (one red, one blue) on pedestals with two overlapping bell-shaped light curves above them |
| 대체 글(alt) | 고객 데이터 분석 — A/B 테스트 마스터하기의 표지: 박사, 조수, 초파리 연구원, 주판봇이 연구실의 실험 무대에서 주제 소품을 바라보는 장면 |

**Genspark에 붙여 넣기 ↓**
```
웹페이지 맨 위에 거는 표지 그림 1장을 만들어 줘.
- 비율 16:9, 가로 1920px 이상
- 첨부한 참고 이미지의 네 캐릭터(박사, 조수, 초파리 연구원, 주판봇)를 같은 그림체·같은 외형으로, 넷 모두 등장
- 그림 안에 글자·숫자·로고를 넣지 말 것
- 얼굴과 손은 가장자리에서 떨어진 가운데 영역에, 왼쪽 아래 구석은 밝고 단순하게(흰 벽), 아래 가장자리는 흰 페이지로 자연스럽게 이어지게
- 밤 장면·어두운 배경 금지, 전체적으로 밝은 낮 장면
아래 영어 프롬프트를 그대로 써 줘.

Website top cover illustration, wide 16:9.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Scene: a bright, airy research lab in soft daylight, clean white walls and pale gray-blue furniture (#ffffff to #f6f7fb), gentle shadows, pale blue monitor glow, small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9). High-key image that blends into a white web page; no dark background, no night sky.
All four characters together:
  chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie, between the buttons as referee;
  girl researcher, long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, jeans, checking a stopwatch;
  anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, on the left facing right, guarding the blue button;
  boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, holding a wooden abacus, on the right facing left, reaching for the red button.
Visual metaphor of the topic: two large glowing push buttons (one red, one blue) on pedestals with two overlapping bell-shaped light curves above them.
Composition: keep every face and hand inside the central safe area (12% margin left and right, 10% top, 18% bottom);
  keep the bottom-left corner light and simple (plain white wall); let the bottom edge fade to near-white so the image melts into a white page; the topic prop is the most saturated spot.
Mood: curious, friendly rivalry, the moment before the result.
No text, no letters, no numbers, no logos, no weapons, no cigarettes, no alcohol, no blood, no real brands.
```

고칠 때: `Same four characters, same art style and composition. Change only: {고칠 점}. Still no text.`

### cover_05 — 추천시스템의 비밀 — 개인화의 과학

| 항목 | 내용 |
|---|---|
| 키 · 판 | cover_05 · L (16:9, 1920 이상) |
| 페이지 | `05_recommender.html` |
| 장소 | 작은 상점 모형이 있는 연구실 |
| 주제 은유 | shelves of small products linked by glowing threads, and a wall of blank video tiles |
| 대체 글(alt) | 추천시스템의 비밀 — 개인화의 과학의 표지: 박사, 조수, 초파리 연구원, 주판봇이 작은 상점 모형이 있는 연구실에서 주제 소품을 바라보는 장면 |

**Genspark에 붙여 넣기 ↓**
```
웹페이지 맨 위에 거는 표지 그림 1장을 만들어 줘.
- 비율 16:9, 가로 1920px 이상
- 첨부한 참고 이미지의 네 캐릭터(박사, 조수, 초파리 연구원, 주판봇)를 같은 그림체·같은 외형으로, 넷 모두 등장
- 그림 안에 글자·숫자·로고를 넣지 말 것
- 얼굴과 손은 가장자리에서 떨어진 가운데 영역에, 왼쪽 아래 구석은 밝고 단순하게(흰 벽), 아래 가장자리는 흰 페이지로 자연스럽게 이어지게
- 밤 장면·어두운 배경 금지, 전체적으로 밝은 낮 장면
아래 영어 프롬프트를 그대로 써 줘.

Website top cover illustration, wide 16:9.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Scene: a bright, airy research lab in soft daylight, clean white walls and pale gray-blue furniture (#ffffff to #f6f7fb), gentle shadows, pale blue monitor glow, small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9). High-key image that blends into a white web page; no dark background, no night sky.
All four characters together:
  chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie, pointing at a thread between two products;
  girl researcher, long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, jeans, arranging tiles;
  anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, on the left facing right, holding one popular product;
  boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, holding a wooden abacus, on the right facing left, connecting many threads.
Visual metaphor of the topic: shelves of small products linked by glowing threads, and a wall of blank video tiles.
Composition: keep every face and hand inside the central safe area (12% margin left and right, 10% top, 18% bottom);
  keep the bottom-left corner light and simple (plain white wall); let the bottom edge fade to near-white so the image melts into a white page; the topic prop is the most saturated spot.
Mood: curious, friendly rivalry, the moment before the result.
No text, no letters, no numbers, no logos, no weapons, no cigarettes, no alcohol, no blood, no real brands.
```

고칠 때: `Same four characters, same art style and composition. Change only: {고칠 점}. Still no text.`

### cover_06 — 금융 리스크 분석 — 불확실성을 다루는 법

| 항목 | 내용 |
|---|---|
| 키 · 판 | cover_06 · L (16:9, 1920 이상) |
| 페이지 | `06_financial_risk.html` |
| 장소 | 연구실의 금고 앞 |
| 주제 은유 | a brass balance scale with paper folders on one side, and several baskets of eggs spread apart |
| 대체 글(alt) | 금융 리스크 분석 — 불확실성을 다루는 법의 표지: 박사, 조수, 초파리 연구원, 주판봇이 연구실의 금고 앞에서 주제 소품을 바라보는 장면 |

**Genspark에 붙여 넣기 ↓**
```
웹페이지 맨 위에 거는 표지 그림 1장을 만들어 줘.
- 비율 16:9, 가로 1920px 이상
- 첨부한 참고 이미지의 네 캐릭터(박사, 조수, 초파리 연구원, 주판봇)를 같은 그림체·같은 외형으로, 넷 모두 등장
- 그림 안에 글자·숫자·로고를 넣지 말 것
- 얼굴과 손은 가장자리에서 떨어진 가운데 영역에, 왼쪽 아래 구석은 밝고 단순하게(흰 벽), 아래 가장자리는 흰 페이지로 자연스럽게 이어지게
- 밤 장면·어두운 배경 금지, 전체적으로 밝은 낮 장면
아래 영어 프롬프트를 그대로 써 줘.

Website top cover illustration, wide 16:9.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Scene: a bright, airy research lab in soft daylight, clean white walls and pale gray-blue furniture (#ffffff to #f6f7fb), gentle shadows, pale blue monitor glow, small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9). High-key image that blends into a white web page; no dark background, no night sky.
All four characters together:
  chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie, adjusting the scale;
  girl researcher, long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, jeans, placing eggs in separate baskets;
  anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, on the left facing right, inspecting a folder;
  boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, holding a wooden abacus, on the right facing left, stacking all eggs in one basket.
Visual metaphor of the topic: a brass balance scale with paper folders on one side, and several baskets of eggs spread apart.
Composition: keep every face and hand inside the central safe area (12% margin left and right, 10% top, 18% bottom);
  keep the bottom-left corner light and simple (plain white wall); let the bottom edge fade to near-white so the image melts into a white page; the topic prop is the most saturated spot.
Mood: curious, friendly rivalry, the moment before the result.
No text, no letters, no numbers, no logos, no weapons, no cigarettes, no alcohol, no blood, no real brands.
```

고칠 때: `Same four characters, same art style and composition. Change only: {고칠 점}. Still no text.`

### cover_07 — 마르코프 체인 — 상태 변화의 예측

| 항목 | 내용 |
|---|---|
| 키 · 판 | cover_07 · L (16:9, 1920 이상) |
| 페이지 | `07_markov_chain.html` |
| 장소 | 연구실 바닥의 게임판 |
| 주제 은유 | three glowing circles (sun, cloud, rain icons without letters) connected by curved arrows on the floor, and a ring of doors |
| 대체 글(alt) | 마르코프 체인 — 상태 변화의 예측의 표지: 박사, 조수, 초파리 연구원, 주판봇이 연구실 바닥의 게임판에서 주제 소품을 바라보는 장면 |

**Genspark에 붙여 넣기 ↓**
```
웹페이지 맨 위에 거는 표지 그림 1장을 만들어 줘.
- 비율 16:9, 가로 1920px 이상
- 첨부한 참고 이미지의 네 캐릭터(박사, 조수, 초파리 연구원, 주판봇)를 같은 그림체·같은 외형으로, 넷 모두 등장
- 그림 안에 글자·숫자·로고를 넣지 말 것
- 얼굴과 손은 가장자리에서 떨어진 가운데 영역에, 왼쪽 아래 구석은 밝고 단순하게(흰 벽), 아래 가장자리는 흰 페이지로 자연스럽게 이어지게
- 밤 장면·어두운 배경 금지, 전체적으로 밝은 낮 장면
아래 영어 프롬프트를 그대로 써 줘.

Website top cover illustration, wide 16:9.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Scene: a bright, airy research lab in soft daylight, clean white walls and pale gray-blue furniture (#ffffff to #f6f7fb), gentle shadows, pale blue monitor glow, small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9). High-key image that blends into a white web page; no dark background, no night sky.
All four characters together:
  chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie, standing in one circle;
  girl researcher, long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, jeans, tracing an arrow;
  anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, on the left facing right, hopping between circles;
  boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, holding a wooden abacus, on the right facing left, carrying a stack of coins toward a door.
Visual metaphor of the topic: three glowing circles (sun, cloud, rain icons without letters) connected by curved arrows on the floor, and a ring of doors.
Composition: keep every face and hand inside the central safe area (12% margin left and right, 10% top, 18% bottom);
  keep the bottom-left corner light and simple (plain white wall); let the bottom edge fade to near-white so the image melts into a white page; the topic prop is the most saturated spot.
Mood: curious, friendly rivalry, the moment before the result.
No text, no letters, no numbers, no logos, no weapons, no cigarettes, no alcohol, no blood, no real brands.
```

고칠 때: `Same four characters, same art style and composition. Change only: {고칠 점}. Still no text.`

### cover_07m — 중간 요약정리 및 퀴즈 — 1~7회차

| 항목 | 내용 |
|---|---|
| 키 · 판 | cover_07m · L (16:9, 1920 이상) |
| 페이지 | `07m_midterm_review.html` |
| 장소 | 연구실 칠판 앞 |
| 주제 은유 | a chalkboard covered with seven blank cards and small quiz buttons, with a ribbon marking halfway |
| 대체 글(alt) | 중간 요약정리 및 퀴즈 — 1~7회차의 표지: 박사, 조수, 초파리 연구원, 주판봇이 연구실 칠판 앞에서 주제 소품을 바라보는 장면 |

**Genspark에 붙여 넣기 ↓**
```
웹페이지 맨 위에 거는 표지 그림 1장을 만들어 줘.
- 비율 16:9, 가로 1920px 이상
- 첨부한 참고 이미지의 네 캐릭터(박사, 조수, 초파리 연구원, 주판봇)를 같은 그림체·같은 외형으로, 넷 모두 등장
- 그림 안에 글자·숫자·로고를 넣지 말 것
- 얼굴과 손은 가장자리에서 떨어진 가운데 영역에, 왼쪽 아래 구석은 밝고 단순하게(흰 벽), 아래 가장자리는 흰 페이지로 자연스럽게 이어지게
- 밤 장면·어두운 배경 금지, 전체적으로 밝은 낮 장면
아래 영어 프롬프트를 그대로 써 줘.

Website top cover illustration, wide 16:9.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Scene: a bright, airy research lab in soft daylight, clean white walls and pale gray-blue furniture (#ffffff to #f6f7fb), gentle shadows, pale blue monitor glow, small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9). High-key image that blends into a white web page; no dark background, no night sky.
All four characters together:
  chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie, tapping the board;
  girl researcher, long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, jeans, handing out blank cards;
  anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, on the left facing right, raising a hand;
  boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, holding a wooden abacus, on the right facing left, holding a big score tally (no numbers).
Visual metaphor of the topic: a chalkboard covered with seven blank cards and small quiz buttons, with a ribbon marking halfway.
Composition: keep every face and hand inside the central safe area (12% margin left and right, 10% top, 18% bottom);
  keep the bottom-left corner light and simple (plain white wall); let the bottom edge fade to near-white so the image melts into a white page; the topic prop is the most saturated spot.
Mood: curious, friendly rivalry, the moment before the result.
No text, no letters, no numbers, no logos, no weapons, no cigarettes, no alcohol, no blood, no real brands.
```

고칠 때: `Same four characters, same art style and composition. Change only: {고칠 점}. Still no text.`

### cover_08 — 몬테카를로 시뮬레이션 — 복잡한 문제의 해법

| 항목 | 내용 |
|---|---|
| 키 · 판 | cover_08 · L (16:9, 1920 이상) |
| 페이지 | `08_monte_carlo.html` |
| 장소 | 햇살 드는 연구실 창가 |
| 주제 은유 | thousands of tiny glowing dots raining into a square frame with a quarter circle, and a few dice in the air |
| 대체 글(alt) | 몬테카를로 시뮬레이션 — 복잡한 문제의 해법의 표지: 박사, 조수, 초파리 연구원, 주판봇이 햇살 드는 연구실 창가에서 주제 소품을 바라보는 장면 |

**Genspark에 붙여 넣기 ↓**
```
웹페이지 맨 위에 거는 표지 그림 1장을 만들어 줘.
- 비율 16:9, 가로 1920px 이상
- 첨부한 참고 이미지의 네 캐릭터(박사, 조수, 초파리 연구원, 주판봇)를 같은 그림체·같은 외형으로, 넷 모두 등장
- 그림 안에 글자·숫자·로고를 넣지 말 것
- 얼굴과 손은 가장자리에서 떨어진 가운데 영역에, 왼쪽 아래 구석은 밝고 단순하게(흰 벽), 아래 가장자리는 흰 페이지로 자연스럽게 이어지게
- 밤 장면·어두운 배경 금지, 전체적으로 밝은 낮 장면
아래 영어 프롬프트를 그대로 써 줘.

Website top cover illustration, wide 16:9.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Scene: a bright, airy research lab in soft daylight, clean white walls and pale gray-blue furniture (#ffffff to #f6f7fb), gentle shadows, pale blue monitor glow, small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9). High-key image that blends into a white web page; no dark background, no night sky.
All four characters together:
  chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie, releasing the dots from his hands with purple sparks;
  girl researcher, long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, jeans, holding the frame;
  anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, on the left facing right, counting dots with a clicker;
  boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, holding a wooden abacus, on the right facing left, pouring more dots from a bucket.
Visual metaphor of the topic: thousands of tiny glowing dots raining into a square frame with a quarter circle, and a few dice in the air.
Composition: keep every face and hand inside the central safe area (12% margin left and right, 10% top, 18% bottom);
  keep the bottom-left corner light and simple (plain white wall); let the bottom edge fade to near-white so the image melts into a white page; the topic prop is the most saturated spot.
Mood: curious, friendly rivalry, the moment before the result.
No text, no letters, no numbers, no logos, no weapons, no cigarettes, no alcohol, no blood, no real brands.
```

고칠 때: `Same four characters, same art style and composition. Change only: {고칠 점}. Still no text.`

### cover_09 — 베이지안 네트워크 — 인과관계 찾기

| 항목 | 내용 |
|---|---|
| 키 · 판 | cover_09 · L (16:9, 1920 이상) |
| 페이지 | `09_bayesian_network.html` |
| 장소 | 연구실 천장 아래 |
| 주제 은유 | a floating network of glowing nodes connected by arrows, and a funnel narrowing toward the floor |
| 대체 글(alt) | 베이지안 네트워크 — 인과관계 찾기의 표지: 박사, 조수, 초파리 연구원, 주판봇이 연구실 천장 아래에서 주제 소품을 바라보는 장면 |

**Genspark에 붙여 넣기 ↓**
```
웹페이지 맨 위에 거는 표지 그림 1장을 만들어 줘.
- 비율 16:9, 가로 1920px 이상
- 첨부한 참고 이미지의 네 캐릭터(박사, 조수, 초파리 연구원, 주판봇)를 같은 그림체·같은 외형으로, 넷 모두 등장
- 그림 안에 글자·숫자·로고를 넣지 말 것
- 얼굴과 손은 가장자리에서 떨어진 가운데 영역에, 왼쪽 아래 구석은 밝고 단순하게(흰 벽), 아래 가장자리는 흰 페이지로 자연스럽게 이어지게
- 밤 장면·어두운 배경 금지, 전체적으로 밝은 낮 장면
아래 영어 프롬프트를 그대로 써 줘.

Website top cover illustration, wide 16:9.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Scene: a bright, airy research lab in soft daylight, clean white walls and pale gray-blue furniture (#ffffff to #f6f7fb), gentle shadows, pale blue monitor glow, small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9). High-key image that blends into a white web page; no dark background, no night sky.
All four characters together:
  chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie, drawing an arrow in the air;
  girl researcher, long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, jeans, holding the funnel;
  anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, on the left facing right, pointing at a hidden node in shadow;
  boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, holding a wooden abacus, on the right facing left, pulling one arrow.
Visual metaphor of the topic: a floating network of glowing nodes connected by arrows, and a funnel narrowing toward the floor.
Composition: keep every face and hand inside the central safe area (12% margin left and right, 10% top, 18% bottom);
  keep the bottom-left corner light and simple (plain white wall); let the bottom edge fade to near-white so the image melts into a white page; the topic prop is the most saturated spot.
Mood: curious, friendly rivalry, the moment before the result.
No text, no letters, no numbers, no logos, no weapons, no cigarettes, no alcohol, no blood, no real brands.
```

고칠 때: `Same four characters, same art style and composition. Change only: {고칠 점}. Still no text.`

### cover_10 — 자연어 처리 — 텍스트 데이터의 베이지안 분석

| 항목 | 내용 |
|---|---|
| 키 · 판 | cover_10 · L (16:9, 1920 이상) |
| 페이지 | `10_nlp_bayes.html` |
| 장소 | 연구실 책상 위 |
| 주제 은유 | floating speech bubbles filled with blank word chips that turn into small bar shapes |
| 대체 글(alt) | 자연어 처리 — 텍스트 데이터의 베이지안 분석의 표지: 박사, 조수, 초파리 연구원, 주판봇이 연구실 책상 위에서 주제 소품을 바라보는 장면 |

**Genspark에 붙여 넣기 ↓**
```
웹페이지 맨 위에 거는 표지 그림 1장을 만들어 줘.
- 비율 16:9, 가로 1920px 이상
- 첨부한 참고 이미지의 네 캐릭터(박사, 조수, 초파리 연구원, 주판봇)를 같은 그림체·같은 외형으로, 넷 모두 등장
- 그림 안에 글자·숫자·로고를 넣지 말 것
- 얼굴과 손은 가장자리에서 떨어진 가운데 영역에, 왼쪽 아래 구석은 밝고 단순하게(흰 벽), 아래 가장자리는 흰 페이지로 자연스럽게 이어지게
- 밤 장면·어두운 배경 금지, 전체적으로 밝은 낮 장면
아래 영어 프롬프트를 그대로 써 줘.

Website top cover illustration, wide 16:9.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Scene: a bright, airy research lab in soft daylight, clean white walls and pale gray-blue furniture (#ffffff to #f6f7fb), gentle shadows, pale blue monitor glow, small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9). High-key image that blends into a white web page; no dark background, no night sky.
All four characters together:
  chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie, sorting chips into two piles;
  girl researcher, long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, jeans, reading a long scroll of blank lines;
  anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, on the left facing right, picking one chip;
  boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, holding a wooden abacus, on the right facing left, scooping all chips.
Visual metaphor of the topic: floating speech bubbles filled with blank word chips that turn into small bar shapes.
Composition: keep every face and hand inside the central safe area (12% margin left and right, 10% top, 18% bottom);
  keep the bottom-left corner light and simple (plain white wall); let the bottom edge fade to near-white so the image melts into a white page; the topic prop is the most saturated spot.
Mood: curious, friendly rivalry, the moment before the result.
No text, no letters, no numbers, no logos, no weapons, no cigarettes, no alcohol, no blood, no real brands.
```

고칠 때: `Same four characters, same art style and composition. Change only: {고칠 점}. Still no text.`

### cover_11 — 이미지 & 미디어 데이터 — 베이지안 컴퓨터 비전

| 항목 | 내용 |
|---|---|
| 키 · 판 | cover_11 · L (16:9, 1920 이상) |
| 페이지 | `11_bayesian_vision.html` |
| 장소 | 연구실의 영상 판독실 |
| 주제 은유 | a lightbox with blurry silhouette images and a camera lens projecting many slightly different copies of one silhouette |
| 대체 글(alt) | 이미지 & 미디어 데이터 — 베이지안 컴퓨터 비전의 표지: 박사, 조수, 초파리 연구원, 주판봇이 연구실의 영상 판독실에서 주제 소품을 바라보는 장면 |

**Genspark에 붙여 넣기 ↓**
```
웹페이지 맨 위에 거는 표지 그림 1장을 만들어 줘.
- 비율 16:9, 가로 1920px 이상
- 첨부한 참고 이미지의 네 캐릭터(박사, 조수, 초파리 연구원, 주판봇)를 같은 그림체·같은 외형으로, 넷 모두 등장
- 그림 안에 글자·숫자·로고를 넣지 말 것
- 얼굴과 손은 가장자리에서 떨어진 가운데 영역에, 왼쪽 아래 구석은 밝고 단순하게(흰 벽), 아래 가장자리는 흰 페이지로 자연스럽게 이어지게
- 밤 장면·어두운 배경 금지, 전체적으로 밝은 낮 장면
아래 영어 프롬프트를 그대로 써 줘.

Website top cover illustration, wide 16:9.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Scene: a bright, airy research lab in soft daylight, clean white walls and pale gray-blue furniture (#ffffff to #f6f7fb), gentle shadows, pale blue monitor glow, small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9). High-key image that blends into a white web page; no dark background, no night sky.
All four characters together:
  chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie, looking at the lightbox;
  girl researcher, long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, jeans, adjusting the lens;
  anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, on the left facing right, comparing the copies;
  boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, holding a wooden abacus, on the right facing left, pointing confidently at one copy.
Visual metaphor of the topic: a lightbox with blurry silhouette images and a camera lens projecting many slightly different copies of one silhouette.
Composition: keep every face and hand inside the central safe area (12% margin left and right, 10% top, 18% bottom);
  keep the bottom-left corner light and simple (plain white wall); let the bottom edge fade to near-white so the image melts into a white page; the topic prop is the most saturated spot.
Mood: curious, friendly rivalry, the moment before the result.
No text, no letters, no numbers, no logos, no weapons, no cigarettes, no alcohol, no blood, no real brands.
```

고칠 때: `Same four characters, same art style and composition. Change only: {고칠 점}. Still no text.`

### cover_12 — 기업 데이터 분석 — 계층적 베이지안 모델

| 항목 | 내용 |
|---|---|
| 키 · 판 | cover_12 · L (16:9, 1920 이상) |
| 페이지 | `12_hierarchical_bayes.html` |
| 장소 | 연구실의 지도 테이블 |
| 주제 은유 | nested boxes (small boxes inside larger boxes) with glowing dots being pulled gently toward a central line |
| 대체 글(alt) | 기업 데이터 분석 — 계층적 베이지안 모델의 표지: 박사, 조수, 초파리 연구원, 주판봇이 연구실의 지도 테이블에서 주제 소품을 바라보는 장면 |

**Genspark에 붙여 넣기 ↓**
```
웹페이지 맨 위에 거는 표지 그림 1장을 만들어 줘.
- 비율 16:9, 가로 1920px 이상
- 첨부한 참고 이미지의 네 캐릭터(박사, 조수, 초파리 연구원, 주판봇)를 같은 그림체·같은 외형으로, 넷 모두 등장
- 그림 안에 글자·숫자·로고를 넣지 말 것
- 얼굴과 손은 가장자리에서 떨어진 가운데 영역에, 왼쪽 아래 구석은 밝고 단순하게(흰 벽), 아래 가장자리는 흰 페이지로 자연스럽게 이어지게
- 밤 장면·어두운 배경 금지, 전체적으로 밝은 낮 장면
아래 영어 프롬프트를 그대로 써 줘.

Website top cover illustration, wide 16:9.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Scene: a bright, airy research lab in soft daylight, clean white walls and pale gray-blue furniture (#ffffff to #f6f7fb), gentle shadows, pale blue monitor glow, small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9). High-key image that blends into a white web page; no dark background, no night sky.
All four characters together:
  chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie, leaning over the table;
  girl researcher, long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, jeans, placing small boxes;
  anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, on the left facing right, examining a tiny box with few dots;
  boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, holding a wooden abacus, on the right facing left, lifting the big outer box.
Visual metaphor of the topic: nested boxes (small boxes inside larger boxes) with glowing dots being pulled gently toward a central line.
Composition: keep every face and hand inside the central safe area (12% margin left and right, 10% top, 18% bottom);
  keep the bottom-left corner light and simple (plain white wall); let the bottom edge fade to near-white so the image melts into a white page; the topic prop is the most saturated spot.
Mood: curious, friendly rivalry, the moment before the result.
No text, no letters, no numbers, no logos, no weapons, no cigarettes, no alcohol, no blood, no real brands.
```

고칠 때: `Same four characters, same art style and composition. Change only: {고칠 점}. Still no text.`

### cover_13 — 종합 프로젝트 — 실전 데이터 사이언스

| 항목 | 내용 |
|---|---|
| 키 · 판 | cover_13 · L (16:9, 1920 이상) |
| 페이지 | `13_capstone.html` |
| 장소 | 연구실 프로젝트 보드 앞 |
| 주제 은유 | a project board with three blank panels (pie of groups, two curves, a staircase roadmap) and sticky notes without text |
| 대체 글(alt) | 종합 프로젝트 — 실전 데이터 사이언스의 표지: 박사, 조수, 초파리 연구원, 주판봇이 연구실 프로젝트 보드 앞에서 주제 소품을 바라보는 장면 |

**Genspark에 붙여 넣기 ↓**
```
웹페이지 맨 위에 거는 표지 그림 1장을 만들어 줘.
- 비율 16:9, 가로 1920px 이상
- 첨부한 참고 이미지의 네 캐릭터(박사, 조수, 초파리 연구원, 주판봇)를 같은 그림체·같은 외형으로, 넷 모두 등장
- 그림 안에 글자·숫자·로고를 넣지 말 것
- 얼굴과 손은 가장자리에서 떨어진 가운데 영역에, 왼쪽 아래 구석은 밝고 단순하게(흰 벽), 아래 가장자리는 흰 페이지로 자연스럽게 이어지게
- 밤 장면·어두운 배경 금지, 전체적으로 밝은 낮 장면
아래 영어 프롬프트를 그대로 써 줘.

Website top cover illustration, wide 16:9.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Scene: a bright, airy research lab in soft daylight, clean white walls and pale gray-blue furniture (#ffffff to #f6f7fb), gentle shadows, pale blue monitor glow, small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9). High-key image that blends into a white web page; no dark background, no night sky.
All four characters together:
  chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie, presenting the board;
  girl researcher, long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, jeans, attaching notes;
  anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, on the left facing right, pointing at the staircase;
  boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, holding a wooden abacus, on the right facing left, jumping to the top step.
Visual metaphor of the topic: a project board with three blank panels (pie of groups, two curves, a staircase roadmap) and sticky notes without text.
Composition: keep every face and hand inside the central safe area (12% margin left and right, 10% top, 18% bottom);
  keep the bottom-left corner light and simple (plain white wall); let the bottom edge fade to near-white so the image melts into a white page; the topic prop is the most saturated spot.
Mood: curious, friendly rivalry, the moment before the result.
No text, no letters, no numbers, no logos, no weapons, no cigarettes, no alcohol, no blood, no real brands.
```

고칠 때: `Same four characters, same art style and composition. Change only: {고칠 점}. Still no text.`

### cover_13f — 기말 요약정리 및 퀴즈 — 8~13회차

| 항목 | 내용 |
|---|---|
| 키 · 판 | cover_13f · L (16:9, 1920 이상) |
| 페이지 | `13f_final_review.html` |
| 장소 | 연구실 진열장 앞 |
| 주제 은유 | a shelf with six closed books and a small lamp, and a doorway glowing to the next room |
| 대체 글(alt) | 기말 요약정리 및 퀴즈 — 8~13회차의 표지: 박사, 조수, 초파리 연구원, 주판봇이 연구실 진열장 앞에서 주제 소품을 바라보는 장면 |

**Genspark에 붙여 넣기 ↓**
```
웹페이지 맨 위에 거는 표지 그림 1장을 만들어 줘.
- 비율 16:9, 가로 1920px 이상
- 첨부한 참고 이미지의 네 캐릭터(박사, 조수, 초파리 연구원, 주판봇)를 같은 그림체·같은 외형으로, 넷 모두 등장
- 그림 안에 글자·숫자·로고를 넣지 말 것
- 얼굴과 손은 가장자리에서 떨어진 가운데 영역에, 왼쪽 아래 구석은 밝고 단순하게(흰 벽), 아래 가장자리는 흰 페이지로 자연스럽게 이어지게
- 밤 장면·어두운 배경 금지, 전체적으로 밝은 낮 장면
아래 영어 프롬프트를 그대로 써 줘.

Website top cover illustration, wide 16:9.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Scene: a bright, airy research lab in soft daylight, clean white walls and pale gray-blue furniture (#ffffff to #f6f7fb), gentle shadows, pale blue monitor glow, small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9). High-key image that blends into a white web page; no dark background, no night sky.
All four characters together:
  chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie, opening the door;
  girl researcher, long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, jeans, placing the last book;
  anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, on the left facing right, looking back at the shelf;
  boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, holding a wooden abacus, on the right facing left, holding a lamp.
Visual metaphor of the topic: a shelf with six closed books and a small lamp, and a doorway glowing to the next room.
Composition: keep every face and hand inside the central safe area (12% margin left and right, 10% top, 18% bottom);
  keep the bottom-left corner light and simple (plain white wall); let the bottom edge fade to near-white so the image melts into a white page; the topic prop is the most saturated spot.
Mood: curious, friendly rivalry, the moment before the result.
No text, no letters, no numbers, no logos, no weapons, no cigarettes, no alcohol, no blood, no real brands.
```

고칠 때: `Same four characters, same art style and composition. Change only: {고칠 점}. Still no text.`


## ③·④ 회차별 본문 그림

회차마다 칸 그림 3장(①②③ 각 칸의 "일상으로 치면" 비유) + 대결 그림 1장. 배경은 순수 흰색, 방 배경 없이 캐릭터와 소품만 그립니다.

### 1회차 · 통계학이 뭐죠? — 일상 속 데이터 이야기

#### fig_01_lv1 — 칸 ① 평균만으로는 모자라다 — 표준편차와 변동계수

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `01_what_is_statistics.html#lv1` "일상으로 치면 — 두 타자의 월별 타율" 옆 |
| 대체 글(alt) | 평균은 같지만 기복이 다른 두 타자 |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 4:3, 가로 1200px 이상
- 첨부한 참고 이미지의 캐릭터(박사)를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Spot illustration for a web article, horizontal, 4:3.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie, holding two small trophies;
Scene: two baseball batters side by side; behind the left one a calm, nearly flat line of six dots, behind the right one six dots jumping up and down wildly; both stand on the same height marker.
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

#### fig_01_lv2 — 칸 ② 천 명으로 전체를 읽는 법 — 표본과 오차범위

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `01_what_is_statistics.html#lv2` "일상으로 치면 — 국 한 숟가락" 옆 |
| 대체 글(alt) | 잘 저은 국은 한 숟가락으로 간을 안다 |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 4:3, 가로 1200px 이상
- 첨부한 참고 이미지의 캐릭터(조수(하루), 주판봇)를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Spot illustration for a web article, horizontal, 4:3.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  girl researcher, long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, jeans, tasting from a small spoon;
  boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, holding a wooden abacus, stirring a huge pot;
Scene: a giant well-stirred soup pot, one spoonful of glowing soup lifted out; a tiny pot and a huge pot with the same-size spoon.
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

#### fig_01_lv3 — 칸 ③ 많이 모으면 불확실성이 돈이 된다 — 대수의 법칙

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `01_what_is_statistics.html#lv3` "일상으로 치면 — 백만 명의 보험" 옆 |
| 대체 글(alt) | 많이 모으면 사고 수가 예측 가능해지는 보험 |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 4:3, 가로 1200px 이상
- 첨부한 참고 이미지의 캐릭터(박사)를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Spot illustration for a web article, horizontal, 4:3.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie, calmly holding a big umbrella over many tiny cars;
Scene: hundreds of tiny toy cars on a road under one big umbrella; a few cars have small dents, a jar of coins is evenly filled beside them.
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

#### duel_01 — 대결: 큰 표본이 늘 이길까?

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `01_what_is_statistics.html#duel` 맨 위 · 초파리 쪽 "무작위 1,000명" vs 주판봇 쪽 "자발적 응답 20,000명" |
| 대체 글(alt) | 대결: 무작위 1,000명 vs 자발적 응답 2만 명 |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 16:9, 가로 1600px 이상
- 첨부한 참고 이미지의 캐릭터(초파리 연구원, 주판봇, 박사, 시아, 모아, X1·X2·X3)를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Wide duel scene illustration for a web article, 16:9.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, holding a small, neatly shuffled card box with 1,000 cards;
  boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, holding a wooden abacus, pushing a gigantic but tilted pile of cards that leans to one side;
  chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie, commentator at the back at the center holding a balance scale;
  chibi girl maid intern Sia, long straight jet-black hair to the waist with side-swept bangs, calm gray eyes, small silver drop earrings, charcoal-black long-sleeved maid dress with white lace cuffs, white high collar with a large soft gray bow, long white frilled apron, no headdress, no glasses, referee on one side of the duel line holding up a small round start flag (blank);
  chibi girl maid intern Moa, long ash-beige wavy hair to the waist with neat bangs, white frilled maid headband with a thin white ribbon over the left ear, big round amber-brown eyes, white shirt with a red and navy plaid bow tie, camel knit cardigan, white frilled apron, referee on the other side holding a blank scorecard, ready to announce;
  three small cute chibi silhouette spectators, solid deep navy-black bodies (#1B1A2E) with a thin purple rim light, round white dot eyes, two pink cheek pixels, no mouth; X1 with a long side ponytail and a big pink ribbon, X2 with a round beret and round glasses with two teal reflections, X3 tiny with a cat-ear hood and a yellow pom-pom, not scary, sitting together in a small audience row at the bottom edge, reacting with surprise;
Scene: a small well-mixed sample versus a huge lopsided sample; the balance scale tips toward the small mixed box.
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

### 2회차 · 확률이란? — 동전던지기부터 주식투자까지

#### fig_02_lv1 — 칸 ① 조건이 붙으면 확률이 바뀐다 — 카드 두 장

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `02_probability.html#lv1` "일상으로 치면 — 안경 쓴 여학생" 옆 |
| 대체 글(alt) | 조건이 붙으면 확률이 바뀐다 — 안경 쓴 학생 |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 4:3, 가로 1200px 이상
- 첨부한 참고 이미지의 캐릭터(조수(하루))를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Spot illustration for a web article, horizontal, 4:3.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  girl researcher, long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, jeans, pointing at a smaller group;
Scene: a class of 30 tiny figures; a spotlight narrows onto half of them, and inside the spotlight the share of figures wearing glasses changes.
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

#### fig_02_lv2 — 칸 ② 서로 정보를 주지 않는 사건 — 독립, 배반, 분산투자

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `02_probability.html#lv2` "일상으로 치면 — 우산과 선글라스" 옆 |
| 대체 글(alt) | 반대로 팔리는 우산과 선글라스 |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 4:3, 가로 1200px 이상
- 첨부한 참고 이미지의 캐릭터(주판봇)를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Spot illustration for a web article, horizontal, 4:3.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, holding a wooden abacus, running a small shop stall;
Scene: a two-sided shop stall: umbrellas on one side under a rain cloud, sunglasses on the other side under a sun, the cash box stays level in the middle.
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

#### fig_02_lv3 — 칸 ③ 동전 1,000번 — 비율이 이론값에 다가가는 과정

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `02_probability.html#lv3` "일상으로 치면 — 시즌 전체로 판단하기" 옆 |
| 대체 글(alt) | 동전을 많이 던지면 비율이 반쯤으로 모인다 |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 4:3, 가로 1200px 이상
- 첨부한 참고 이미지의 캐릭터(초파리 연구원)를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Spot illustration for a web article, horizontal, 4:3.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, tossing a coin;
Scene: a long trail of coins landing heads and tails; a wobbly line on a board starts zig-zagging and settles flat toward the middle.
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

#### duel_02 — 대결: 검정 다섯 번 뒤에는 빨강이 더 잘 나올까?

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `02_probability.html#duel` 맨 위 · 초파리 쪽 "예측 48.6% (늘 같은 18/37)" vs 주판봇 쪽 "예측 60% ("이제 빨강 차례")" |
| 대체 글(alt) | 대결: 도박꾼의 오류 |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 16:9, 가로 1600px 이상
- 첨부한 참고 이미지의 캐릭터(초파리 연구원, 주판봇, 박사, 시아, 모아, X1·X2·X3)를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Wide duel scene illustration for a web article, 16:9.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, calm, pointing at a wheel that has the same mix of red and black slots every spin;
  boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, holding a wooden abacus, excited, betting a stack of abacus beads on red after five black pockets in a row;
  chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie, commentator at the back holding a stopwatch;
  chibi girl maid intern Sia, long straight jet-black hair to the waist with side-swept bangs, calm gray eyes, small silver drop earrings, charcoal-black long-sleeved maid dress with white lace cuffs, white high collar with a large soft gray bow, long white frilled apron, no headdress, no glasses, referee on one side of the duel line holding up a small round start flag (blank);
  chibi girl maid intern Moa, long ash-beige wavy hair to the waist with neat bangs, white frilled maid headband with a thin white ribbon over the left ear, big round amber-brown eyes, white shirt with a red and navy plaid bow tie, camel knit cardigan, white frilled apron, referee on the other side holding a blank scorecard, ready to announce;
  three small cute chibi silhouette spectators, solid deep navy-black bodies (#1B1A2E) with a thin purple rim light, round white dot eyes, two pink cheek pixels, no mouth; X1 with a long side ponytail and a big pink ribbon, X2 with a round beret and round glasses with two teal reflections, X3 tiny with a cat-ear hood and a yellow pom-pom, not scary, sitting together in a small audience row at the bottom edge, reacting with surprise;
Scene: a toy roulette wheel with red and black pockets, five black marbles lined up in a tray beside it.
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

### 3회차 · 베이지안 사고방식 — 업데이트하는 지혜

#### fig_03_lv1 — 칸 ① 양성인데 왜 0.9%일까 — 베이즈 정리와 기저율

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `03_bayesian_thinking.html#lv1` "일상으로 치면 — 화재경보기" 옆 |
| 대체 글(alt) | 화재경보기 — 드문 사건의 울림 |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 4:3, 가로 1200px 이상
- 첨부한 참고 이미지의 캐릭터(조수(하루))를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Spot illustration for a web article, horizontal, 4:3.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  girl researcher, long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, jeans, waving away smoke from a frying pan;
Scene: a ceiling smoke alarm flashing; most of the time it is just cooking smoke, a tiny real flame appears only in one of many little picture tiles.
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

#### fig_03_lv2 — 칸 ② 단어를 증거로 — 스팸 필터의 나이브 베이즈

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `03_bayesian_thinking.html#lv2` "일상으로 치면 — 면접관의 점수 곱하기" 옆 |
| 대체 글(alt) | 단어를 증거로 쓰는 스팸 필터 |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 4:3, 가로 1200px 이상
- 첨부한 참고 이미지의 캐릭터(주판봇)를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Spot illustration for a web article, horizontal, 4:3.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, holding a wooden abacus, stamping envelopes;
Scene: a mail sorting desk; each envelope carries a few glowing word-shaped tokens (blank shapes, no letters), some tokens push the envelope toward a red bin, others toward a green tray.
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

#### fig_03_lv3 — 칸 ③ 증거를 하나씩 — 가짜뉴스 판별

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `03_bayesian_thinking.html#lv3` "일상으로 치면 — 탐정의 단서 노트" 옆 |
| 대체 글(alt) | 탐정의 단서 노트 — 증거로 하나씩 업데이트 |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 4:3, 가로 1200px 이상
- 첨부한 참고 이미지의 캐릭터(박사, 조수(하루))를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Spot illustration for a web article, horizontal, 4:3.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie, as a detective with a magnifying glass;
  girl researcher, long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, jeans, updating a blank notebook;
Scene: a detective board with three clue cards pinned in a row and a glowing gauge that rises a little after each clue.
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

#### duel_03 — 대결: 양성이 나온 사람, 감염 확률은 몇 %일까?

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `03_bayesian_thinking.html#duel` 맨 위 · 초파리 쪽 "예측 0.9% (기저율 반영)" vs 주판봇 쪽 "예측 90% (정확도 그대로)" |
| 대체 글(alt) | 대결: 기저율을 반영한 사후확률 |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 16:9, 가로 1600px 이상
- 첨부한 참고 이미지의 캐릭터(초파리 연구원, 주판봇, 박사, 시아, 모아, X1·X2·X3)를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Wide duel scene illustration for a web article, 16:9.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, pointing at a 10-by-10 grid of dots where only one dot is red;
  boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, holding a wooden abacus, proudly holding a large shiny 90% style meter (no numbers, just a big filled gauge);
  chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie, commentator at the back;
  chibi girl maid intern Sia, long straight jet-black hair to the waist with side-swept bangs, calm gray eyes, small silver drop earrings, charcoal-black long-sleeved maid dress with white lace cuffs, white high collar with a large soft gray bow, long white frilled apron, no headdress, no glasses, referee on one side of the duel line holding up a small round start flag (blank);
  chibi girl maid intern Moa, long ash-beige wavy hair to the waist with neat bangs, white frilled maid headband with a thin white ribbon over the left ear, big round amber-brown eyes, white shirt with a red and navy plaid bow tie, camel knit cardigan, white frilled apron, referee on the other side holding a blank scorecard, ready to announce;
  three small cute chibi silhouette spectators, solid deep navy-black bodies (#1B1A2E) with a thin purple rim light, round white dot eyes, two pink cheek pixels, no mouth; X1 with a long side ponytail and a big pink ribbon, X2 with a round beret and round glasses with two teal reflections, X3 tiny with a cat-ear hood and a yellow pom-pom, not scary, sitting together in a small audience row at the bottom edge, reacting with surprise;
Scene: a positive test strip in the middle; the dot grid shows that true cases are rare.
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

### 4회차 · 고객 데이터 분석 — A/B 테스트 마스터하기

#### fig_04_lv1 — 칸 ① 버튼 색 하나 — A/B 테스트 설계와 지표

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `04_ab_test.html#lv1` "일상으로 치면 — 제비뽑기로 나눈 두 반" 옆 |
| 대체 글(alt) | 제비뽑기로 나눈 두 그룹 — A/B 테스트 |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 4:3, 가로 1200px 이상
- 첨부한 참고 이미지의 캐릭터(박사, 조수(하루))를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Spot illustration for a web article, horizontal, 4:3.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie, drawing lots from a box;
  girl researcher, long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, jeans, sending tiny visitors through two doors;
Scene: two identical doors, one with a red button and one with a blue button; tiny visitors are split by drawing lots.
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

#### fig_04_lv2 — 칸 ② 클릭 3번의 15%를 믿을까 — 적은 데이터를 공정하게

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `04_ab_test.html#lv2` "일상으로 치면 — 리뷰 1개짜리 별점 5.0" 옆 |
| 대체 글(alt) | 리뷰 1개짜리 별점은 평균 쪽으로 당겨 읽는다 |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 4:3, 가로 1200px 이상
- 첨부한 참고 이미지의 캐릭터(초파리 연구원)를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Spot illustration for a web article, horizontal, 4:3.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, looking suspiciously at a single star card;
Scene: a restaurant sign with only one shiny star card versus a sign with a long stack of star cards; a gentle magnet pulls the single card toward the middle height.
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

#### fig_04_lv3 — 칸 ③ B가 A보다 나을 확률 — 베타 분포로 A/B 읽기

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `04_ab_test.html#lv3` "일상으로 치면 — 두 개의 구름" 옆 |
| 대체 글(alt) | 점이 아니라 구름으로 — 베타 분포 |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 4:3, 가로 1200px 이상
- 첨부한 참고 이미지의 캐릭터(조수(하루))를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Spot illustration for a web article, horizontal, 4:3.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  girl researcher, long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, jeans, pointing at two clouds;
Scene: two soft clouds floating over a ruler-like rail, one gray and one blue; they barely overlap.
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

#### duel_04 — 대결: 첫날 숫자로 결정해도 될까?

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `04_ab_test.html#duel` 맨 위 · 초파리 쪽 "그룹당 10,000명 모은 뒤 결정" vs 주판봇 쪽 "그룹당 500명에서 바로 결정" |
| 대체 글(alt) | 대결: 첫날 결정 vs 충분한 표본 |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 16:9, 가로 1600px 이상
- 첨부한 참고 이미지의 캐릭터(초파리 연구원, 주판봇, 박사, 시아, 모아, X1·X2·X3)를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Wide duel scene illustration for a web article, 16:9.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, patiently waiting beside a tall stack of visitor tickets;
  boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, holding a wooden abacus, rushing to press a big blue button after only a tiny stack of tickets;
  chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie, commentator at the back with an hourglass;
  chibi girl maid intern Sia, long straight jet-black hair to the waist with side-swept bangs, calm gray eyes, small silver drop earrings, charcoal-black long-sleeved maid dress with white lace cuffs, white high collar with a large soft gray bow, long white frilled apron, no headdress, no glasses, referee on one side of the duel line holding up a small round start flag (blank);
  chibi girl maid intern Moa, long ash-beige wavy hair to the waist with neat bangs, white frilled maid headband with a thin white ribbon over the left ear, big round amber-brown eyes, white shirt with a red and navy plaid bow tie, camel knit cardigan, white frilled apron, referee on the other side holding a blank scorecard, ready to announce;
  three small cute chibi silhouette spectators, solid deep navy-black bodies (#1B1A2E) with a thin purple rim light, round white dot eyes, two pink cheek pixels, no mouth; X1 with a long side ponytail and a big pink ribbon, X2 with a round beret and round glasses with two teal reflections, X3 tiny with a cat-ear hood and a yellow pom-pom, not scary, sitting together in a small audience row at the bottom edge, reacting with surprise;
Scene: a calendar page with the first day circled and an hourglass.
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

### 5회차 · 추천시스템의 비밀 — 개인화의 과학

#### fig_05_lv1 — 칸 ① 함께 산 상품 — 장바구니 분석과 연관 규칙

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `05_recommender.html#lv1` "일상으로 치면 — 단골집 사장님의 기억" 옆 |
| 대체 글(alt) | 함께 사는 상품 — 장바구니 분석 |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 4:3, 가로 1200px 이상
- 첨부한 참고 이미지의 캐릭터(주판봇)를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Spot illustration for a web article, horizontal, 4:3.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, holding a wooden abacus, as a friendly shopkeeper;
Scene: a small grocery shelf where instant noodle packs sit right next to egg cartons, a shopping basket holding both.
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

#### fig_05_lv2 — 칸 ② 클릭인가, 시청시간인가 — 무엇을 최대로 할지

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `05_recommender.html#lv2` "일상으로 치면 — 간판 vs 단골" 옆 |
| 대체 글(alt) | 클릭 vs 머무는 시간 |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 4:3, 가로 1200px 이상
- 첨부한 참고 이미지의 캐릭터(조수(하루))를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Spot illustration for a web article, horizontal, 4:3.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  girl researcher, long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, jeans, holding a stopwatch at a shop entrance;
Scene: a flashy neon-like sign (no letters) attracting many quick visitors who leave at once, while a few visitors sit comfortably inside for a long time.
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

#### fig_05_lv3 — 칸 ③ 나와 닮은 사람 찾기 — 코사인 유사도와 행렬분해

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `05_recommender.html#lv3` "일상으로 치면 — 취향이 닮은 친구" 옆 |
| 대체 글(alt) | 취향이 닮은 친구의 추천 — 협업 필터링 |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 4:3, 가로 1200px 이상
- 첨부한 참고 이미지의 캐릭터(조수(하루), 초파리 연구원)를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Spot illustration for a web article, horizontal, 4:3.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  girl researcher, long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, jeans, holding up a blank film poster;
  anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, nodding at the same poster;
Scene: two friends with matching shelves of the same movie reels; an arrow of light passes a recommended reel from one shelf to the other.
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

#### duel_05 — 대결: 인기순 추천 vs 협업 필터링, 누가 더 잘 맞힐까?

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `05_recommender.html#duel` 맨 위 · 초파리 쪽 "인기순 상위 3개" vs 주판봇 쪽 "협업 필터링 상위 3개" |
| 대체 글(alt) | 대결: 인기순 vs 협업 필터링 |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 16:9, 가로 1600px 이상
- 첨부한 참고 이미지의 캐릭터(초파리 연구원, 주판봇, 박사, 시아, 모아, X1·X2·X3)를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Wide duel scene illustration for a web article, 16:9.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, holding three personalized gift boxes, each different;
  boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, holding a wooden abacus, holding three identical best-seller boxes;
  chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie, commentator at the back;
  chibi girl maid intern Sia, long straight jet-black hair to the waist with side-swept bangs, calm gray eyes, small silver drop earrings, charcoal-black long-sleeved maid dress with white lace cuffs, white high collar with a large soft gray bow, long white frilled apron, no headdress, no glasses, referee on one side of the duel line holding up a small round start flag (blank);
  chibi girl maid intern Moa, long ash-beige wavy hair to the waist with neat bangs, white frilled maid headband with a thin white ribbon over the left ear, big round amber-brown eyes, white shirt with a red and navy plaid bow tie, camel knit cardigan, white frilled apron, referee on the other side holding a blank scorecard, ready to announce;
  three small cute chibi silhouette spectators, solid deep navy-black bodies (#1B1A2E) with a thin purple rim light, round white dot eyes, two pink cheek pixels, no mouth; X1 with a long side ponytail and a big pink ribbon, X2 with a round beret and round glasses with two teal reflections, X3 tiny with a cat-ear hood and a yellow pom-pom, not scary, sitting together in a small audience row at the bottom edge, reacting with surprise;
Scene: a row of small customer silhouettes each with a different favorite color.
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

### 6회차 · 금융 리스크 분석 — 불확실성을 다루는 법

#### fig_06_lv1 — 칸 ① 대출 심사를 베이지안으로 — 우도비 업데이트

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `06_financial_risk.html#lv1` "일상으로 치면 — 등급에서 출발해 고쳐 가기" 옆 |
| 대체 글(alt) | 등급에서 출발해 서류마다 고치는 대출 심사 |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 4:3, 가로 1200px 이상
- 첨부한 참고 이미지의 캐릭터(박사)를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Spot illustration for a web article, horizontal, 4:3.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie, as a bank clerk sliding a document across the desk;
Scene: a loan desk with a stack of documents; a small dial tilts a bit with each page read.
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

#### fig_06_lv2 — 칸 ② 소문인가 정보인가 — 뉴스로 고치는 하락 확률

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `06_financial_risk.html#lv2` "일상으로 치면 — "모두가 대박이래"" 옆 |
| 대체 글(alt) | 소문인가 정보인가 — 열기를 신호와 구분 |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 4:3, 가로 1200px 이상
- 첨부한 참고 이미지의 캐릭터(초파리 연구원)를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Spot illustration for a web article, horizontal, 4:3.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, calmly holding a thermometer;
Scene: a crowd of tiny chat bubbles (empty, no text) shouting excitedly around a stock chart line drawn without labels.
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

#### fig_06_lv3 — 칸 ③ 한 바구니에 담지 않기 — 상관계수와 포트폴리오

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `06_financial_risk.html#lv3` "일상으로 치면 — 우산과 선글라스 가게" 옆 |
| 대체 글(alt) | 한 바구니에 담지 않기 — 분산투자 |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 4:3, 가로 1200px 이상
- 첨부한 참고 이미지의 캐릭터(주판봇)를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Spot illustration for a web article, horizontal, 4:3.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, holding a wooden abacus, carrying two baskets;
Scene: eggs spread across several baskets on a balance pole, one basket wobbling but the pole staying steady.
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

#### duel_06 — 대결: 나눠 담기 vs 몰아 담기, 최악의 해에 누가 덜 잃을까?

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `06_financial_risk.html#duel` 맨 위 · 초파리 쪽 "두 자산 반반" vs 주판봇 쪽 "한 자산에 전부" |
| 대체 글(alt) | 대결: 나눠 담기 vs 몰아 담기 |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 16:9, 가로 1600px 이상
- 첨부한 참고 이미지의 캐릭터(초파리 연구원, 주판봇, 박사, 시아, 모아, X1·X2·X3)를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Wide duel scene illustration for a web article, 16:9.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, holding two half-full baskets steadily;
  boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, holding a wooden abacus, carrying one overflowing basket on a slippery path;
  chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie, commentator at the back under a storm cloud;
  chibi girl maid intern Sia, long straight jet-black hair to the waist with side-swept bangs, calm gray eyes, small silver drop earrings, charcoal-black long-sleeved maid dress with white lace cuffs, white high collar with a large soft gray bow, long white frilled apron, no headdress, no glasses, referee on one side of the duel line holding up a small round start flag (blank);
  chibi girl maid intern Moa, long ash-beige wavy hair to the waist with neat bangs, white frilled maid headband with a thin white ribbon over the left ear, big round amber-brown eyes, white shirt with a red and navy plaid bow tie, camel knit cardigan, white frilled apron, referee on the other side holding a blank scorecard, ready to announce;
  three small cute chibi silhouette spectators, solid deep navy-black bodies (#1B1A2E) with a thin purple rim light, round white dot eyes, two pink cheek pixels, no mouth; X1 with a long side ponytail and a big pink ribbon, X2 with a round beret and round glasses with two teal reflections, X3 tiny with a cat-ear hood and a yellow pom-pom, not scary, sitting together in a small audience row at the bottom edge, reacting with surprise;
Scene: a stormy "bad year" cloud overhead; the single basket loses more eggs.
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

### 7회차 · 마르코프 체인 — 상태 변화의 예측

#### fig_07_lv1 — 칸 ① 오늘이 내일을 정한다 — 전이 행렬과 정상분포

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `07_markov_chain.html#lv1` "일상으로 치면 — 보드게임 말" 옆 |
| 대체 글(alt) | 오늘이 내일을 정한다 — 마르코프 체인 |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 4:3, 가로 1200px 이상
- 첨부한 참고 이미지의 캐릭터(조수(하루))를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Spot illustration for a web article, horizontal, 4:3.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  girl researcher, long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, jeans, rolling a big die;
Scene: a board game with three colored squares connected by curved arrows; a token moves depending only on its current square.
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

#### fig_07_lv2 — 칸 ② 무작위 서퍼가 오래 머무는 곳 — 페이지랭크

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `07_markov_chain.html#lv2` "일상으로 치면 — 누구에게 받은 추천서인가" 옆 |
| 대체 글(alt) | 무작위 서퍼와 페이지랭크 |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 4:3, 가로 1200px 이상
- 첨부한 참고 이미지의 캐릭터(박사)를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Spot illustration for a web article, horizontal, 4:3.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie, reading a single heavy golden recommendation letter (blank);
Scene: a web of small houses connected by bridges; a little surfer figure walks the bridges and the most visited house glows brightest.
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

#### fig_07_lv3 — 칸 ③ 활성·휴면·이탈 — 고객 생애가치(CLV)

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `07_markov_chain.html#lv3` "일상으로 치면 — 5년 뒤의 5만 원" 옆 |
| 대체 글(alt) | 활성·휴면·이탈 — 고객 생애가치 |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 4:3, 가로 1200px 이상
- 첨부한 참고 이미지의 캐릭터(주판봇)를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Spot illustration for a web article, horizontal, 4:3.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, holding a wooden abacus, watering a small plant that becomes a tree over several steps;
Scene: a customer silhouette passing through three doors: active (green), dormant (gray), gone (faded); a growing piggy bank follows the active path.
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

#### duel_07 — 대결: 이번 달 매출 큰 고객 vs 오래 남을 고객, 5년 가치는?

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `07_markov_chain.html#duel` 맨 위 · 초파리 쪽 "고객 B (매출 5만, 유지율 85%)" vs 주판봇 쪽 "고객 A (매출 8만, 유지율 55%)" |
| 대체 글(alt) | 대결: 지금 매출 vs 유지율 |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 16:9, 가로 1600px 이상
- 첨부한 참고 이미지의 캐릭터(초파리 연구원, 주판봇, 박사, 시아, 모아, X1·X2·X3)를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Wide duel scene illustration for a web article, 16:9.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, tending a slow-growing sturdy tree with many rings;
  boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, holding a wooden abacus, holding a big shiny fruit picked from a small sapling;
  chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie, commentator at the back holding a five-step calendar;
  chibi girl maid intern Sia, long straight jet-black hair to the waist with side-swept bangs, calm gray eyes, small silver drop earrings, charcoal-black long-sleeved maid dress with white lace cuffs, white high collar with a large soft gray bow, long white frilled apron, no headdress, no glasses, referee on one side of the duel line holding up a small round start flag (blank);
  chibi girl maid intern Moa, long ash-beige wavy hair to the waist with neat bangs, white frilled maid headband with a thin white ribbon over the left ear, big round amber-brown eyes, white shirt with a red and navy plaid bow tie, camel knit cardigan, white frilled apron, referee on the other side holding a blank scorecard, ready to announce;
  three small cute chibi silhouette spectators, solid deep navy-black bodies (#1B1A2E) with a thin purple rim light, round white dot eyes, two pink cheek pixels, no mouth; X1 with a long side ponytail and a big pink ribbon, X2 with a round beret and round glasses with two teal reflections, X3 tiny with a cat-ear hood and a yellow pom-pom, not scary, sitting together in a small audience row at the bottom edge, reacting with surprise;
Scene: two paths stretching into the future, one with more coins collecting far away.
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

### 8회차 · 몬테카를로 시뮬레이션 — 복잡한 문제의 해법

#### fig_08_lv1 — 칸 ① 5년 뒤 가치를 하나로 말하지 않기 — P10·P50·P90

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `08_monte_carlo.html#lv1` "일상으로 치면 — 날씨 예보처럼 말하기" 옆 |
| 대체 글(alt) | 하나가 아닌 범위로 — P10·P50·P90 |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 4:3, 가로 1200px 이상
- 첨부한 참고 이미지의 캐릭터(조수(하루))를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Spot illustration for a web article, horizontal, 4:3.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  girl researcher, long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, jeans, pointing at a fan of paths;
Scene: many thin paths fanning out from one starting point into the future; three highlighted lanes: a low one, a middle one and a high one.
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

#### fig_08_lv2 — 칸 ② 부품 하나가 멈추면 — 공급망 위험의 누적

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `08_monte_carlo.html#lv2` "일상으로 치면 — 가장 약한 고리" 옆 |
| 대체 글(alt) | 가장 약한 고리 — 공급망 위험 |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 4:3, 가로 1200px 이상
- 첨부한 참고 이미지의 캐릭터(주판봇)를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Spot illustration for a web article, horizontal, 4:3.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, holding a wooden abacus, pulling a long chain;
Scene: a chain of factory parts connected link by link; one thin link is cracking under tension.
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

#### fig_08_lv3 — 칸 ③ 점을 던져 π를 재고, 사슬로 분포를 훑는다 — 몬테카를로와 MCMC

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `08_monte_carlo.html#lv3` "일상으로 치면 — 쌀알 뿌리기와 눈 가린 등산" 옆 |
| 대체 글(alt) | 쌀알로 원 넓이 재기와 눈 가린 등산(MCMC) |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 4:3, 가로 1200px 이상
- 첨부한 참고 이미지의 캐릭터(박사, 초파리 연구원)를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Spot illustration for a web article, horizontal, 4:3.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie, scattering rice grains;
  anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, blindfolded, carefully walking on a hill;
Scene: rice grains scattered evenly on a square board with a quarter circle drawn on it; nearby a hill covered with footprints, densest at the top.
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

#### duel_08 — 대결: 100번 굴린 결과 vs 1만 번 굴린 결과

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `08_monte_carlo.html#duel` 맨 위 · 초파리 쪽 "점 100개" vs 주판봇 쪽 "점 10,000개" |
| 대체 글(alt) | 대결: 100번 vs 1만 번 |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 16:9, 가로 1600px 이상
- 첨부한 참고 이미지의 캐릭터(초파리 연구원, 주판봇, 박사, 시아, 모아, X1·X2·X3)를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Wide duel scene illustration for a web article, 16:9.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, calmly with a large sack of 10,000 grains;
  boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, holding a wooden abacus, confidently with a tiny handful of 100 grains;
  chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie, commentator at the back with the square board;
  chibi girl maid intern Sia, long straight jet-black hair to the waist with side-swept bangs, calm gray eyes, small silver drop earrings, charcoal-black long-sleeved maid dress with white lace cuffs, white high collar with a large soft gray bow, long white frilled apron, no headdress, no glasses, referee on one side of the duel line holding up a small round start flag (blank);
  chibi girl maid intern Moa, long ash-beige wavy hair to the waist with neat bangs, white frilled maid headband with a thin white ribbon over the left ear, big round amber-brown eyes, white shirt with a red and navy plaid bow tie, camel knit cardigan, white frilled apron, referee on the other side holding a blank scorecard, ready to announce;
  three small cute chibi silhouette spectators, solid deep navy-black bodies (#1B1A2E) with a thin purple rim light, round white dot eyes, two pink cheek pixels, no mouth; X1 with a long side ponytail and a big pink ribbon, X2 with a round beret and round glasses with two teal reflections, X3 tiny with a cat-ear hood and a yellow pom-pom, not scary, sitting together in a small audience row at the bottom edge, reacting with surprise;
Scene: two square boards: one sparsely dotted, one densely and smoothly dotted.
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

### 9회차 · 베이지안 네트워크 — 인과관계 찾기

#### fig_09_lv1 — 칸 ① 노출에서 구매까지 — 조건부 확률의 사슬

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `09_bayesian_network.html#lv1` "일상으로 치면 — 가는 관" 옆 |
| 대체 글(alt) | 노출에서 구매까지 — 가장 가는 관 |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 4:3, 가로 1200px 이상
- 첨부한 참고 이미지의 캐릭터(조수(하루))를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Spot illustration for a web article, horizontal, 4:3.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  girl researcher, long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, jeans, pouring water;
Scene: a row of connected pipes from wide to narrow; one very thin pipe in the middle slows the flow.
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

#### fig_09_lv2 — 칸 ② 결과에서 원인으로 — 의료 진단과 양성 예측도

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `09_bayesian_network.html#lv2` "일상으로 치면 — 지문과 범인" 옆 |
| 대체 글(alt) | 결과에서 원인으로 — 양성 예측도 |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 4:3, 가로 1200px 이상
- 첨부한 참고 이미지의 캐릭터(초파리 연구원)를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Spot illustration for a web article, horizontal, 4:3.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, examining a fingerprint with a magnifier;
Scene: a door used by many tiny visitors, many fingerprints on its handle; only one silhouette is the actual culprit.
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

#### fig_09_lv3 — 칸 ③ 품질·서비스·만족·재구매 — 그물로 엮은 요인

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `09_bayesian_network.html#lv3` "일상으로 치면 — 조직도" 옆 |
| 대체 글(alt) | 요인의 그물 — 베이지안 네트워크 |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 4:3, 가로 1200px 이상
- 첨부한 참고 이미지의 캐릭터(박사)를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Spot illustration for a web article, horizontal, 4:3.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie, arranging nodes on a board;
Scene: a net of round nodes connected by arrows: quality and service feeding satisfaction, satisfaction feeding repurchase.
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

#### duel_09 — 대결: 광고 효과, 단순 비교로 재도 될까?

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `09_bayesian_network.html#duel` 맨 위 · 초파리 쪽 "관심도별로 나눠 비교한 뒤 합침" vs 주판봇 쪽 "광고 본 사람 vs 안 본 사람 단순 비교" |
| 대체 글(alt) | 대결: 교란 요인 |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 16:9, 가로 1600px 이상
- 첨부한 참고 이미지의 캐릭터(초파리 연구원, 주판봇, 박사, 시아, 모아, X1·X2·X3)를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Wide duel scene illustration for a web article, 16:9.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, sorting people into groups by interest level before comparing;
  boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, holding a wooden abacus, simply comparing a crowd that saw an ad against one that did not;
  chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie, commentator at the back pointing at a hidden third figure behind both crowds;
  chibi girl maid intern Sia, long straight jet-black hair to the waist with side-swept bangs, calm gray eyes, small silver drop earrings, charcoal-black long-sleeved maid dress with white lace cuffs, white high collar with a large soft gray bow, long white frilled apron, no headdress, no glasses, referee on one side of the duel line holding up a small round start flag (blank);
  chibi girl maid intern Moa, long ash-beige wavy hair to the waist with neat bangs, white frilled maid headband with a thin white ribbon over the left ear, big round amber-brown eyes, white shirt with a red and navy plaid bow tie, camel knit cardigan, white frilled apron, referee on the other side holding a blank scorecard, ready to announce;
  three small cute chibi silhouette spectators, solid deep navy-black bodies (#1B1A2E) with a thin purple rim light, round white dot eyes, two pink cheek pixels, no mouth; X1 with a long side ponytail and a big pink ribbon, X2 with a round beret and round glasses with two teal reflections, X3 tiny with a cat-ear hood and a yellow pom-pom, not scary, sitting together in a small audience row at the bottom edge, reacting with surprise;
Scene: a hidden "season" sun figure secretly influencing both the ad poster and the sales basket.
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

### 10회차 · 자연어 처리 — 텍스트 데이터의 베이지안 분석

#### fig_10_lv1 — 칸 ① 리뷰 한 줄의 긍정 확률 — 나이브 베이즈 감성 분석

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `10_nlp_bayes.html#lv1` "일상으로 치면 — 단어마다 던지는 한 표" 옆 |
| 대체 글(alt) | 단어마다 던지는 한 표 — 감성 분석 |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 4:3, 가로 1200px 이상
- 첨부한 참고 이미지의 캐릭터(조수(하루))를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Spot illustration for a web article, horizontal, 4:3.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  girl researcher, long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, jeans, reading a long receipt-like review strip (blank lines, no letters);
Scene: small word tokens jumping off a review strip and dropping votes into two jars, green and red.
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

#### fig_10_lv2 — 칸 ② 긍정 45%를 얼마나 믿을까 — 여론 비율의 신용구간

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `10_nlp_bayes.html#lv2` "일상으로 치면 — 리뷰 3개 vs 300개" 옆 |
| 대체 글(alt) | 리뷰 3개 vs 300개 — 신용구간 |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 4:3, 가로 1200px 이상
- 첨부한 참고 이미지의 캐릭터(주판봇)를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Spot illustration for a web article, horizontal, 4:3.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, holding a wooden abacus, comparing two restaurant signs;
Scene: one sign with three review cards and a wide fuzzy cloud above it, another with a tall stack of cards and a narrow sharp cloud.
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

#### fig_10_lv3 — 칸 ③ 뉴스는 어떤 주제로 이루어졌나 — 베이지안 토픽 모델링

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `10_nlp_bayes.html#lv3` "일상으로 치면 — 장바구니로 장보기 목적 짐작" 옆 |
| 대체 글(alt) | 장바구니로 목적 짐작 — 토픽 모델 |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 4:3, 가로 1200px 이상
- 첨부한 참고 이미지의 캐릭터(박사)를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Spot illustration for a web article, horizontal, 4:3.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie, sorting a basket;
Scene: a basket mixing breakfast items and party snacks, separated into two colored piles by proportion.
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

#### duel_10 — 대결: "좋아요" 한 단어 규칙 vs 모든 단어 나이브 베이즈

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `10_nlp_bayes.html#duel` 맨 위 · 초파리 쪽 ""좋아요"가 있으면 긍정" vs 주판봇 쪽 "모든 단어로 나이브 베이즈" |
| 대체 글(alt) | 대결: 한 단어 규칙 vs 나이브 베이즈 |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 16:9, 가로 1600px 이상
- 첨부한 참고 이미지의 캐릭터(초파리 연구원, 주판봇, 박사, 시아, 모아, X1·X2·X3)를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Wide duel scene illustration for a web article, 16:9.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, reading every word token on a strip one by one;
  boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, holding a wooden abacus, holding a single big "thumbs up" sticker;
  chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie, commentator at the back;
  chibi girl maid intern Sia, long straight jet-black hair to the waist with side-swept bangs, calm gray eyes, small silver drop earrings, charcoal-black long-sleeved maid dress with white lace cuffs, white high collar with a large soft gray bow, long white frilled apron, no headdress, no glasses, referee on one side of the duel line holding up a small round start flag (blank);
  chibi girl maid intern Moa, long ash-beige wavy hair to the waist with neat bangs, white frilled maid headband with a thin white ribbon over the left ear, big round amber-brown eyes, white shirt with a red and navy plaid bow tie, camel knit cardigan, white frilled apron, referee on the other side holding a blank scorecard, ready to announce;
  three small cute chibi silhouette spectators, solid deep navy-black bodies (#1B1A2E) with a thin purple rim light, round white dot eyes, two pink cheek pixels, no mouth; X1 with a long side ponytail and a big pink ribbon, X2 with a round beret and round glasses with two teal reflections, X3 tiny with a cat-ear hood and a yellow pom-pom, not scary, sitting together in a small audience row at the bottom edge, reacting with surprise;
Scene: a review strip with a thumbs-up token next to a frowning token.
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

### 11회차 · 이미지 & 미디어 데이터 — 베이지안 컴퓨터 비전

#### fig_11_lv1 — 칸 ① 사진에 어울리는 태그 — 특징을 증거로 한 베이즈 추천

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `11_bayesian_vision.html#lv1` "일상으로 치면 — 바리스타의 추천" 옆 |
| 대체 글(alt) | 사진에 어울리는 태그 — 바리스타의 추천 |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 4:3, 가로 1200px 이상
- 첨부한 참고 이미지의 캐릭터(조수(하루))를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Spot illustration for a web article, horizontal, 4:3.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  girl researcher, long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, jeans, as a barista;
Scene: a coffee counter with a photo frame (abstract landscape) and small floating tag chips (blank shapes) lining up next to it.
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

#### fig_11_lv2 — 칸 ② 폐렴 X-ray 판독 — 정확도와 판정의 불확실성

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `11_bayesian_vision.html#lv2` "일상으로 치면 — 범위가 있는 일기예보" 옆 |
| 대체 글(alt) | 폐렴 X-ray 판독 — 판정의 불확실성 |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 4:3, 가로 1200px 이상
- 첨부한 참고 이미지의 캐릭터(박사)를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Spot illustration for a web article, horizontal, 4:3.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie, reading a chest X-ray on a lightbox;
Scene: a lightbox with a blurry chest X-ray silhouette and a soft shaded zone; a small gauge shows uncertainty as a band, not a point.
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

#### fig_11_lv3 — 칸 ③ "모르겠다"를 숫자로 — 베이지안 딥러닝과 MC 드롭아웃

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `11_bayesian_vision.html#lv3` "일상으로 치면 — 전문가 50명에게 묻기" 옆 |
| 대체 글(alt) | 전문가 50명에게 묻기 — MC 드롭아웃 |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 4:3, 가로 1200px 이상
- 첨부한 참고 이미지의 캐릭터(초파리 연구원)를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Spot illustration for a web article, horizontal, 4:3.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, surrounded by 50 tiny expert figures raising hands;
Scene: fifty tiny experts each raising a slightly different colored card; where they agree the cards line up, where they disagree they scatter.
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

#### duel_11 — 대결: 한 번의 예측 vs 50번의 예측, 처음 보는 대상 앞에서

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `11_bayesian_vision.html#duel` 맨 위 · 초파리 쪽 "50번 예측, 흔들리면 보류" vs 주판봇 쪽 "한 번 예측, 50% 넘으면 보행자" |
| 대체 글(alt) | 대결: 한 번 예측 vs 흔들림 보기 |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 16:9, 가로 1600px 이상
- 첨부한 참고 이미지의 캐릭터(초파리 연구원, 주판봇, 박사, 시아, 모아, X1·X2·X3)를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Wide duel scene illustration for a web article, 16:9.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, holding a pause flag before a strange foggy silhouette;
  boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, holding a wooden abacus, confidently stamping a single label on the foggy silhouette;
  chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie, commentator at the back in a crossing guard vest;
  chibi girl maid intern Sia, long straight jet-black hair to the waist with side-swept bangs, calm gray eyes, small silver drop earrings, charcoal-black long-sleeved maid dress with white lace cuffs, white high collar with a large soft gray bow, long white frilled apron, no headdress, no glasses, referee on one side of the duel line holding up a small round start flag (blank);
  chibi girl maid intern Moa, long ash-beige wavy hair to the waist with neat bangs, white frilled maid headband with a thin white ribbon over the left ear, big round amber-brown eyes, white shirt with a red and navy plaid bow tie, camel knit cardigan, white frilled apron, referee on the other side holding a blank scorecard, ready to announce;
  three small cute chibi silhouette spectators, solid deep navy-black bodies (#1B1A2E) with a thin purple rim light, round white dot eyes, two pink cheek pixels, no mouth; X1 with a long side ponytail and a big pink ribbon, X2 with a round beret and round glasses with two teal reflections, X3 tiny with a cat-ear hood and a yellow pom-pom, not scary, sitting together in a small audience row at the bottom edge, reacting with surprise;
Scene: a street crossing in daylight with a never-seen-before oddly shaped object in fog.
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

### 12회차 · 기업 데이터 분석 — 계층적 베이지안 모델

#### fig_12_lv1 — 칸 ① 손님 수는 원래 출렁인다 — 포아송 분포와 작은 표본

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `12_hierarchical_bayes.html#lv1` "일상으로 치면 — 주사위 열 번" 옆 |
| 대체 글(alt) | 주사위 열 번 — 포아송과 작은 표본 |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 4:3, 가로 1200px 이상
- 첨부한 참고 이미지의 캐릭터(주판봇)를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Spot illustration for a web article, horizontal, 4:3.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, holding a wooden abacus, rolling dice ten times;
Scene: a short row of ten dice with three sixes; a big pile of hundreds of dice in the background looking evenly mixed.
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

#### fig_12_lv2 — 칸 ② 지역마다 다른 마케팅 효과 — 계층 모형과 부분 풀링

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `12_hierarchical_bayes.html#lv2` "일상으로 치면 — 전학생 두 명뿐인 반" 옆 |
| 대체 글(alt) | 부분 풀링 — 전학생 두 명뿐인 반 |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 4:3, 가로 1200px 이상
- 첨부한 참고 이미지의 캐릭터(박사)를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Spot illustration for a web article, horizontal, 4:3.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie, gently pulling strings;
Scene: several small classroom boxes, one with only two student figures; soft strings pull each box toward a central school average line.
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

#### fig_12_lv3 — 칸 ③ 후한 평가자, 엄격한 평가자 — 직원 성과의 공정성

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `12_hierarchical_bayes.html#lv3` "일상으로 치면 — 짠 선생님, 후한 선생님" 옆 |
| 대체 글(alt) | 짠 선생님, 후한 선생님 — 평가자 보정 |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 4:3, 가로 1200px 이상
- 첨부한 참고 이미지의 캐릭터(조수(하루))를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Spot illustration for a web article, horizontal, 4:3.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  girl researcher, long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, jeans, holding two identical answer sheets;
Scene: a strict teacher with a short ruler and a generous teacher with a long ruler grading the same paper; a balance in the middle evens them.
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

#### duel_12 — 대결: 매장 평균 그대로 vs 계층 모델, 기록이 적을 때 누가 더 정확할까?

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `12_hierarchical_bayes.html#duel` 맨 위 · 초파리 쪽 "매장 평균 그대로(따로)" vs 주판봇 쪽 "계층 모델(부분 풀링)" |
| 대체 글(alt) | 대결: 따로 vs 계층 |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 16:9, 가로 1600px 이상
- 첨부한 참고 이미지의 캐릭터(초파리 연구원, 주판봇, 박사, 시아, 모아, X1·X2·X3)를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Wide duel scene illustration for a web article, 16:9.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, looking at each tiny store alone with a magnifier;
  boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, holding a wooden abacus, tying all the stores together with a gentle rope to a central post;
  chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie, commentator at the back;
  chibi girl maid intern Sia, long straight jet-black hair to the waist with side-swept bangs, calm gray eyes, small silver drop earrings, charcoal-black long-sleeved maid dress with white lace cuffs, white high collar with a large soft gray bow, long white frilled apron, no headdress, no glasses, referee on one side of the duel line holding up a small round start flag (blank);
  chibi girl maid intern Moa, long ash-beige wavy hair to the waist with neat bangs, white frilled maid headband with a thin white ribbon over the left ear, big round amber-brown eyes, white shirt with a red and navy plaid bow tie, camel knit cardigan, white frilled apron, referee on the other side holding a blank scorecard, ready to announce;
  three small cute chibi silhouette spectators, solid deep navy-black bodies (#1B1A2E) with a thin purple rim light, round white dot eyes, two pink cheek pixels, no mouth; X1 with a long side ponytail and a big pink ribbon, X2 with a round beret and round glasses with two teal reflections, X3 tiny with a cat-ear hood and a yellow pom-pom, not scary, sitting together in a small audience row at the bottom edge, reacting with surprise;
Scene: a map table with five miniature stores, one brand-new with very few visitors.
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

### 13회차 · 종합 프로젝트 — 실전 데이터 사이언스

#### fig_13_lv1 — 칸 ① 누구에게 — 적은 데이터로 고객 취향 나누기

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `13_capstone.html#lv1` "일상으로 치면 — 메뉴마다 구슬 더하기" 옆 |
| 대체 글(alt) | 메뉴마다 구슬 더하기 — 디리클레 세분화 |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 4:3, 가로 1200px 이상
- 첨부한 참고 이미지의 캐릭터(조수(하루))를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Spot illustration for a web article, horizontal, 4:3.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  girl researcher, long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, jeans, dropping marbles into jars;
Scene: three menu jars filling with colored marbles each time a customer chooses; the jars become different heights.
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

#### fig_13_lv2 — 칸 ② 무엇을 — 베이지안 A/B로 앱 개선 효과 재기

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `13_capstone.html#lv2` "일상으로 치면 — 새 메뉴의 단계적 출시" 옆 |
| 대체 글(alt) | 단계적 출시 — 베이지안 A/B |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 4:3, 가로 1200px 이상
- 첨부한 참고 이미지의 캐릭터(주판봇)를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Spot illustration for a web article, horizontal, 4:3.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, holding a wooden abacus, opening a small pop-up shop first;
Scene: one small shop with a new dish, then a row of three, then a full street of shops lighting up step by step.
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

#### fig_13_lv3 — 칸 ③ 어떻게 — 시나리오와 의사결정 보고서

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `13_capstone.html#lv3` "일상으로 치면 — 날씨별 여행 계획" 옆 |
| 대체 글(alt) | 시나리오와 의사결정 — 날씨별 여행 계획 |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 4:3, 가로 1200px 이상
- 첨부한 참고 이미지의 캐릭터(박사)를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Spot illustration for a web article, horizontal, 4:3.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie, presenting a travel map;
Scene: a travel plan board with three routes for sun, cloud and rain icons (pictograms only, no text).
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

#### duel_13 — 대결: 90% 확률로 나은 B안, 바로 전체 적용 vs 단계적 적용

| 항목 | 내용 |
|---|---|
| 넣을 자리 | `13_capstone.html#duel` 맨 위 · 초파리 쪽 "10% → 50% → 100%로 넓히기" vs 주판봇 쪽 "바로 100% 적용" |
| 대체 글(alt) | 대결: 바로 적용 vs 단계적 적용 |

```
웹페이지 본문에 넣을 그림 1장을 만들어 줘.
- 비율 16:9, 가로 1600px 이상
- 첨부한 참고 이미지의 캐릭터(초파리 연구원, 주판봇, 박사, 시아, 모아, X1·X2·X3)를 같은 그림체·같은 외형으로
- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게
- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것
아래 영어 프롬프트를 그대로 써 줘.

Wide duel scene illustration for a web article, 16:9.
Match the art style, proportions and colors of the attached reference images exactly
  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).
Characters:
  anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, climbing a staircase step by step: 10%, 50%, full (shown as growing lights, no numbers);
  boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, holding a wooden abacus, jumping straight to the top floor with a big leap;
  chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie, commentator at the back holding two weather cards, sun and storm;
  chibi girl maid intern Sia, long straight jet-black hair to the waist with side-swept bangs, calm gray eyes, small silver drop earrings, charcoal-black long-sleeved maid dress with white lace cuffs, white high collar with a large soft gray bow, long white frilled apron, no headdress, no glasses, referee on one side of the duel line holding up a small round start flag (blank);
  chibi girl maid intern Moa, long ash-beige wavy hair to the waist with neat bangs, white frilled maid headband with a thin white ribbon over the left ear, big round amber-brown eyes, white shirt with a red and navy plaid bow tie, camel knit cardigan, white frilled apron, referee on the other side holding a blank scorecard, ready to announce;
  three small cute chibi silhouette spectators, solid deep navy-black bodies (#1B1A2E) with a thin purple rim light, round white dot eyes, two pink cheek pixels, no mouth; X1 with a long side ponytail and a big pink ribbon, X2 with a round beret and round glasses with two teal reflections, X3 tiny with a cat-ear hood and a yellow pom-pom, not scary, sitting together in a small audience row at the bottom edge, reacting with surprise;
Scene: a building with a staircase and an elevator shaft; uncertain weather overhead.
Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.
Mood: friendly, curious, clear at a glance.
No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.
```

## 매니페스트

```json
[
 {
  "key": "series_key",
  "size": "2400x1030",
  "place": "README·index",
  "status": "needed"
 },
 {
  "key": "og_series",
  "size": "1200x630",
  "place": "og:image",
  "status": "crop-from-series_key"
 },
 {
  "key": "fig_01_lv1",
  "size": "1200x900",
  "place": "01_what_is_statistics.html",
  "status": "needed"
 },
 {
  "key": "fig_01_lv2",
  "size": "1200x900",
  "place": "01_what_is_statistics.html",
  "status": "needed"
 },
 {
  "key": "fig_01_lv3",
  "size": "1200x900",
  "place": "01_what_is_statistics.html",
  "status": "needed"
 },
 {
  "key": "duel_01",
  "size": "1600x900",
  "place": "01_what_is_statistics.html",
  "status": "needed"
 },
 {
  "key": "fig_02_lv1",
  "size": "1200x900",
  "place": "02_probability.html",
  "status": "needed"
 },
 {
  "key": "fig_02_lv2",
  "size": "1200x900",
  "place": "02_probability.html",
  "status": "needed"
 },
 {
  "key": "fig_02_lv3",
  "size": "1200x900",
  "place": "02_probability.html",
  "status": "needed"
 },
 {
  "key": "duel_02",
  "size": "1600x900",
  "place": "02_probability.html",
  "status": "needed"
 },
 {
  "key": "fig_03_lv1",
  "size": "1200x900",
  "place": "03_bayesian_thinking.html",
  "status": "needed"
 },
 {
  "key": "fig_03_lv2",
  "size": "1200x900",
  "place": "03_bayesian_thinking.html",
  "status": "needed"
 },
 {
  "key": "fig_03_lv3",
  "size": "1200x900",
  "place": "03_bayesian_thinking.html",
  "status": "needed"
 },
 {
  "key": "duel_03",
  "size": "1600x900",
  "place": "03_bayesian_thinking.html",
  "status": "needed"
 },
 {
  "key": "fig_04_lv1",
  "size": "1200x900",
  "place": "04_ab_test.html",
  "status": "needed"
 },
 {
  "key": "fig_04_lv2",
  "size": "1200x900",
  "place": "04_ab_test.html",
  "status": "needed"
 },
 {
  "key": "fig_04_lv3",
  "size": "1200x900",
  "place": "04_ab_test.html",
  "status": "needed"
 },
 {
  "key": "duel_04",
  "size": "1600x900",
  "place": "04_ab_test.html",
  "status": "needed"
 },
 {
  "key": "fig_05_lv1",
  "size": "1200x900",
  "place": "05_recommender.html",
  "status": "needed"
 },
 {
  "key": "fig_05_lv2",
  "size": "1200x900",
  "place": "05_recommender.html",
  "status": "needed"
 },
 {
  "key": "fig_05_lv3",
  "size": "1200x900",
  "place": "05_recommender.html",
  "status": "needed"
 },
 {
  "key": "duel_05",
  "size": "1600x900",
  "place": "05_recommender.html",
  "status": "needed"
 },
 {
  "key": "fig_06_lv1",
  "size": "1200x900",
  "place": "06_financial_risk.html",
  "status": "needed"
 },
 {
  "key": "fig_06_lv2",
  "size": "1200x900",
  "place": "06_financial_risk.html",
  "status": "needed"
 },
 {
  "key": "fig_06_lv3",
  "size": "1200x900",
  "place": "06_financial_risk.html",
  "status": "needed"
 },
 {
  "key": "duel_06",
  "size": "1600x900",
  "place": "06_financial_risk.html",
  "status": "needed"
 },
 {
  "key": "fig_07_lv1",
  "size": "1200x900",
  "place": "07_markov_chain.html",
  "status": "needed"
 },
 {
  "key": "fig_07_lv2",
  "size": "1200x900",
  "place": "07_markov_chain.html",
  "status": "needed"
 },
 {
  "key": "fig_07_lv3",
  "size": "1200x900",
  "place": "07_markov_chain.html",
  "status": "needed"
 },
 {
  "key": "duel_07",
  "size": "1600x900",
  "place": "07_markov_chain.html",
  "status": "needed"
 },
 {
  "key": "fig_08_lv1",
  "size": "1200x900",
  "place": "08_monte_carlo.html",
  "status": "needed"
 },
 {
  "key": "fig_08_lv2",
  "size": "1200x900",
  "place": "08_monte_carlo.html",
  "status": "needed"
 },
 {
  "key": "fig_08_lv3",
  "size": "1200x900",
  "place": "08_monte_carlo.html",
  "status": "needed"
 },
 {
  "key": "duel_08",
  "size": "1600x900",
  "place": "08_monte_carlo.html",
  "status": "needed"
 },
 {
  "key": "fig_09_lv1",
  "size": "1200x900",
  "place": "09_bayesian_network.html",
  "status": "needed"
 },
 {
  "key": "fig_09_lv2",
  "size": "1200x900",
  "place": "09_bayesian_network.html",
  "status": "needed"
 },
 {
  "key": "fig_09_lv3",
  "size": "1200x900",
  "place": "09_bayesian_network.html",
  "status": "needed"
 },
 {
  "key": "duel_09",
  "size": "1600x900",
  "place": "09_bayesian_network.html",
  "status": "needed"
 },
 {
  "key": "fig_10_lv1",
  "size": "1200x900",
  "place": "10_nlp_bayes.html",
  "status": "needed"
 },
 {
  "key": "fig_10_lv2",
  "size": "1200x900",
  "place": "10_nlp_bayes.html",
  "status": "needed"
 },
 {
  "key": "fig_10_lv3",
  "size": "1200x900",
  "place": "10_nlp_bayes.html",
  "status": "needed"
 },
 {
  "key": "duel_10",
  "size": "1600x900",
  "place": "10_nlp_bayes.html",
  "status": "needed"
 },
 {
  "key": "fig_11_lv1",
  "size": "1200x900",
  "place": "11_bayesian_vision.html",
  "status": "needed"
 },
 {
  "key": "fig_11_lv2",
  "size": "1200x900",
  "place": "11_bayesian_vision.html",
  "status": "needed"
 },
 {
  "key": "fig_11_lv3",
  "size": "1200x900",
  "place": "11_bayesian_vision.html",
  "status": "needed"
 },
 {
  "key": "duel_11",
  "size": "1600x900",
  "place": "11_bayesian_vision.html",
  "status": "needed"
 },
 {
  "key": "fig_12_lv1",
  "size": "1200x900",
  "place": "12_hierarchical_bayes.html",
  "status": "needed"
 },
 {
  "key": "fig_12_lv2",
  "size": "1200x900",
  "place": "12_hierarchical_bayes.html",
  "status": "needed"
 },
 {
  "key": "fig_12_lv3",
  "size": "1200x900",
  "place": "12_hierarchical_bayes.html",
  "status": "needed"
 },
 {
  "key": "duel_12",
  "size": "1600x900",
  "place": "12_hierarchical_bayes.html",
  "status": "needed"
 },
 {
  "key": "fig_13_lv1",
  "size": "1200x900",
  "place": "13_capstone.html",
  "status": "needed"
 },
 {
  "key": "fig_13_lv2",
  "size": "1200x900",
  "place": "13_capstone.html",
  "status": "needed"
 },
 {
  "key": "fig_13_lv3",
  "size": "1200x900",
  "place": "13_capstone.html",
  "status": "needed"
 },
 {
  "key": "duel_13",
  "size": "1600x900",
  "place": "13_capstone.html",
  "status": "needed"
 }
]
```
