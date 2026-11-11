"""시리즈 대표 표지 + 회차별 본문 그림(칸 ①②③ 비유 컷, 대결 장면) 지시문 생성 → docs/IMG_PROMPTS_chapters.md"""
import os, sys, re, json
sys.path.insert(0, os.path.join(os.path.dirname(__file__)))
from make_docs import C, pages  # 캐릭터 외형 문장과 페이지 데이터 재사용

STYLE = ('Match the art style, proportions and colors of the attached reference images exactly\n'
         '  (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).')
WHITE_SPOT = ('Background: plain pure white (#ffffff) with only a soft light-gray floor shadow, no room walls, no frame, no vignette, '
              'so the picture sits directly on a white web page. Small accents of magenta (#a8329f), green (#138a52) and blue (#2563c9).')
BAN = 'No text, no letters, no numbers, no logos, no speech bubbles, no weapons, no cigarettes, no alcohol, no blood, no real brands or real people.'
NAME = {'doc': '박사', 'asst': '조수(하루)', 'fly': '초파리 연구원', 'robo': '주판봇', 'sia': '시아', 'moa': '모아', 'xs': 'X1·X2·X3'}
C = dict(C)
C['sia'] = 'chibi girl maid intern Sia, long straight jet-black hair to the waist with side-swept bangs, calm gray eyes, small silver drop earrings, charcoal-black long-sleeved maid dress with white lace cuffs, white high collar with a large soft gray bow, long white frilled apron, no headdress, no glasses'
C['moa'] = 'chibi girl maid intern Moa, long ash-beige wavy hair to the waist with neat bangs, white frilled maid headband with a thin white ribbon over the left ear, big round amber-brown eyes, white shirt with a red and navy plaid bow tie, camel knit cardigan, white frilled apron'
C['xs'] = ('three small cute chibi silhouette spectators, solid deep navy-black bodies (#1B1A2E) with a thin purple rim light, round white dot eyes, two pink cheek pixels, no mouth; '
           'X1 with a long side ponytail and a big pink ribbon, X2 with a round beret and round glasses with two teal reflections, X3 tiny with a cat-ear hood and a yellow pom-pom, not scary')
REFEREE = {'sia': 'referee on one side of the duel line holding up a small round start flag (blank)', 'moa': 'referee on the other side holding a blank scorecard, ready to announce'}
AUD = {'xs': 'sitting together in a small audience row at the bottom edge, reacting with surprise'}

# 키: (등장 캐릭터와 동작, 장면 은유(영어), 대체 글 요지(한국어))
F = {
 '01': [
  ({'doc': 'holding two small trophies'}, 'two baseball batters side by side; behind the left one a calm, nearly flat line of six dots, behind the right one six dots jumping up and down wildly; both stand on the same height marker', '평균은 같지만 기복이 다른 두 타자'),
  ({'asst': 'tasting from a small spoon', 'robo': 'stirring a huge pot'}, 'a giant well-stirred soup pot, one spoonful of glowing soup lifted out; a tiny pot and a huge pot with the same-size spoon', '잘 저은 국은 한 숟가락으로 간을 안다'),
  ({'doc': 'calmly holding a big umbrella over many tiny cars'}, 'hundreds of tiny toy cars on a road under one big umbrella; a few cars have small dents, a jar of coins is evenly filled beside them', '많이 모으면 사고 수가 예측 가능해지는 보험'),
  ({'fly': 'holding a small, neatly shuffled card box with 1,000 cards', 'robo': 'pushing a gigantic but tilted pile of cards that leans to one side', 'doc': 'referee at the center holding a balance scale'}, 'a small well-mixed sample versus a huge lopsided sample; the balance scale tips toward the small mixed box', '대결: 무작위 1,000명 vs 자발적 응답 2만 명'),
 ],
 '02': [
  ({'asst': 'pointing at a smaller group'}, 'a class of 30 tiny figures; a spotlight narrows onto half of them, and inside the spotlight the share of figures wearing glasses changes', '조건이 붙으면 확률이 바뀐다 — 안경 쓴 학생'),
  ({'robo': 'running a small shop stall'}, 'a two-sided shop stall: umbrellas on one side under a rain cloud, sunglasses on the other side under a sun, the cash box stays level in the middle', '반대로 팔리는 우산과 선글라스'),
  ({'fly': 'tossing a coin'}, 'a long trail of coins landing heads and tails; a wobbly line on a board starts zig-zagging and settles flat toward the middle', '동전을 많이 던지면 비율이 반쯤으로 모인다'),
  ({'fly': 'calm, pointing at a wheel that has the same mix of red and black slots every spin', 'robo': 'excited, betting a stack of abacus beads on red after five black pockets in a row', 'doc': 'referee holding a stopwatch'}, 'a toy roulette wheel with red and black pockets, five black marbles lined up in a tray beside it', '대결: 도박꾼의 오류'),
 ],
 '03': [
  ({'asst': 'waving away smoke from a frying pan'}, 'a ceiling smoke alarm flashing; most of the time it is just cooking smoke, a tiny real flame appears only in one of many little picture tiles', '화재경보기 — 드문 사건의 울림'),
  ({'robo': 'stamping envelopes'}, 'a mail sorting desk; each envelope carries a few glowing word-shaped tokens (blank shapes, no letters), some tokens push the envelope toward a red bin, others toward a green tray', '단어를 증거로 쓰는 스팸 필터'),
  ({'doc': 'as a detective with a magnifying glass', 'asst': 'updating a blank notebook'}, 'a detective board with three clue cards pinned in a row and a glowing gauge that rises a little after each clue', '탐정의 단서 노트 — 증거로 하나씩 업데이트'),
  ({'fly': 'pointing at a 10-by-10 grid of dots where only one dot is red', 'robo': 'proudly holding a large shiny 90% style meter (no numbers, just a big filled gauge)', 'doc': 'referee'}, 'a positive test strip in the middle; the dot grid shows that true cases are rare', '대결: 기저율을 반영한 사후확률'),
 ],
 '04': [
  ({'doc': 'drawing lots from a box', 'asst': 'sending tiny visitors through two doors'}, 'two identical doors, one with a red button and one with a blue button; tiny visitors are split by drawing lots', '제비뽑기로 나눈 두 그룹 — A/B 테스트'),
  ({'fly': 'looking suspiciously at a single star card'}, 'a restaurant sign with only one shiny star card versus a sign with a long stack of star cards; a gentle magnet pulls the single card toward the middle height', '리뷰 1개짜리 별점은 평균 쪽으로 당겨 읽는다'),
  ({'asst': 'pointing at two clouds'}, 'two soft clouds floating over a ruler-like rail, one gray and one blue; they barely overlap', '점이 아니라 구름으로 — 베타 분포'),
  ({'fly': 'patiently waiting beside a tall stack of visitor tickets', 'robo': 'rushing to press a big blue button after only a tiny stack of tickets', 'doc': 'referee with an hourglass'}, 'a calendar page with the first day circled and an hourglass', '대결: 첫날 결정 vs 충분한 표본'),
 ],
 '05': [
  ({'robo': 'as a friendly shopkeeper'}, 'a small grocery shelf where instant noodle packs sit right next to egg cartons, a shopping basket holding both', '함께 사는 상품 — 장바구니 분석'),
  ({'asst': 'holding a stopwatch at a shop entrance'}, 'a flashy neon-like sign (no letters) attracting many quick visitors who leave at once, while a few visitors sit comfortably inside for a long time', '클릭 vs 머무는 시간'),
  ({'asst': 'holding up a blank film poster', 'fly': 'nodding at the same poster'}, 'two friends with matching shelves of the same movie reels; an arrow of light passes a recommended reel from one shelf to the other', '취향이 닮은 친구의 추천 — 협업 필터링'),
  ({'fly': 'holding three personalized gift boxes, each different', 'robo': 'holding three identical best-seller boxes', 'doc': 'referee'}, 'a row of small customer silhouettes each with a different favorite color', '대결: 인기순 vs 협업 필터링'),
 ],
 '06': [
  ({'doc': 'as a bank clerk sliding a document across the desk'}, 'a loan desk with a stack of documents; a small dial tilts a bit with each page read', '등급에서 출발해 서류마다 고치는 대출 심사'),
  ({'fly': 'calmly holding a thermometer'}, 'a crowd of tiny chat bubbles (empty, no text) shouting excitedly around a stock chart line drawn without labels', '소문인가 정보인가 — 열기를 신호와 구분'),
  ({'robo': 'carrying two baskets'}, 'eggs spread across several baskets on a balance pole, one basket wobbling but the pole staying steady', '한 바구니에 담지 않기 — 분산투자'),
  ({'fly': 'holding two half-full baskets steadily', 'robo': 'carrying one overflowing basket on a slippery path', 'doc': 'referee under a storm cloud'}, 'a stormy "bad year" cloud overhead; the single basket loses more eggs', '대결: 나눠 담기 vs 몰아 담기'),
 ],
 '07': [
  ({'asst': 'rolling a big die'}, 'a board game with three colored squares connected by curved arrows; a token moves depending only on its current square', '오늘이 내일을 정한다 — 마르코프 체인'),
  ({'doc': 'reading a single heavy golden recommendation letter (blank)'}, 'a web of small houses connected by bridges; a little surfer figure walks the bridges and the most visited house glows brightest', '무작위 서퍼와 페이지랭크'),
  ({'robo': 'watering a small plant that becomes a tree over several steps'}, 'a customer silhouette passing through three doors: active (green), dormant (gray), gone (faded); a growing piggy bank follows the active path', '활성·휴면·이탈 — 고객 생애가치'),
  ({'fly': 'tending a slow-growing sturdy tree with many rings', 'robo': 'holding a big shiny fruit picked from a small sapling', 'doc': 'referee holding a five-step calendar'}, 'two paths stretching into the future, one with more coins collecting far away', '대결: 지금 매출 vs 유지율'),
 ],
 '08': [
  ({'asst': 'pointing at a fan of paths'}, 'many thin paths fanning out from one starting point into the future; three highlighted lanes: a low one, a middle one and a high one', '하나가 아닌 범위로 — P10·P50·P90'),
  ({'robo': 'pulling a long chain'}, 'a chain of factory parts connected link by link; one thin link is cracking under tension', '가장 약한 고리 — 공급망 위험'),
  ({'doc': 'scattering rice grains', 'fly': 'blindfolded, carefully walking on a hill'}, 'rice grains scattered evenly on a square board with a quarter circle drawn on it; nearby a hill covered with footprints, densest at the top', '쌀알로 원 넓이 재기와 눈 가린 등산(MCMC)'),
  ({'fly': 'calmly with a large sack of 10,000 grains', 'robo': 'confidently with a tiny handful of 100 grains', 'doc': 'referee with the square board'}, 'two square boards: one sparsely dotted, one densely and smoothly dotted', '대결: 100번 vs 1만 번'),
 ],
 '09': [
  ({'asst': 'pouring water'}, 'a row of connected pipes from wide to narrow; one very thin pipe in the middle slows the flow', '노출에서 구매까지 — 가장 가는 관'),
  ({'fly': 'examining a fingerprint with a magnifier'}, 'a door used by many tiny visitors, many fingerprints on its handle; only one silhouette is the actual culprit', '결과에서 원인으로 — 양성 예측도'),
  ({'doc': 'arranging nodes on a board'}, 'a net of round nodes connected by arrows: quality and service feeding satisfaction, satisfaction feeding repurchase', '요인의 그물 — 베이지안 네트워크'),
  ({'fly': 'sorting people into groups by interest level before comparing', 'robo': 'simply comparing a crowd that saw an ad against one that did not', 'doc': 'referee pointing at a hidden third figure behind both crowds'}, 'a hidden "season" sun figure secretly influencing both the ad poster and the sales basket', '대결: 교란 요인'),
 ],
 '10': [
  ({'asst': 'reading a long receipt-like review strip (blank lines, no letters)'}, 'small word tokens jumping off a review strip and dropping votes into two jars, green and red', '단어마다 던지는 한 표 — 감성 분석'),
  ({'robo': 'comparing two restaurant signs'}, 'one sign with three review cards and a wide fuzzy cloud above it, another with a tall stack of cards and a narrow sharp cloud', '리뷰 3개 vs 300개 — 신용구간'),
  ({'doc': 'sorting a basket'}, 'a basket mixing breakfast items and party snacks, separated into two colored piles by proportion', '장바구니로 목적 짐작 — 토픽 모델'),
  ({'fly': 'reading every word token on a strip one by one', 'robo': 'holding a single big "thumbs up" sticker', 'doc': 'referee'}, 'a review strip with a thumbs-up token next to a frowning token', '대결: 한 단어 규칙 vs 나이브 베이즈'),
 ],
 '11': [
  ({'asst': 'as a barista'}, 'a coffee counter with a photo frame (abstract landscape) and small floating tag chips (blank shapes) lining up next to it', '사진에 어울리는 태그 — 바리스타의 추천'),
  ({'doc': 'reading a chest X-ray on a lightbox'}, 'a lightbox with a blurry chest X-ray silhouette and a soft shaded zone; a small gauge shows uncertainty as a band, not a point', '폐렴 X-ray 판독 — 판정의 불확실성'),
  ({'fly': 'surrounded by 50 tiny expert figures raising hands'}, 'fifty tiny experts each raising a slightly different colored card; where they agree the cards line up, where they disagree they scatter', '전문가 50명에게 묻기 — MC 드롭아웃'),
  ({'fly': 'holding a pause flag before a strange foggy silhouette', 'robo': 'confidently stamping a single label on the foggy silhouette', 'doc': 'referee in a crossing guard vest'}, 'a street crossing in daylight with a never-seen-before oddly shaped object in fog', '대결: 한 번 예측 vs 흔들림 보기'),
 ],
 '12': [
  ({'robo': 'rolling dice ten times'}, 'a short row of ten dice with three sixes; a big pile of hundreds of dice in the background looking evenly mixed', '주사위 열 번 — 포아송과 작은 표본'),
  ({'doc': 'gently pulling strings'}, 'several small classroom boxes, one with only two student figures; soft strings pull each box toward a central school average line', '부분 풀링 — 전학생 두 명뿐인 반'),
  ({'asst': 'holding two identical answer sheets'}, 'a strict teacher with a short ruler and a generous teacher with a long ruler grading the same paper; a balance in the middle evens them', '짠 선생님, 후한 선생님 — 평가자 보정'),
  ({'fly': 'looking at each tiny store alone with a magnifier', 'robo': 'tying all the stores together with a gentle rope to a central post', 'doc': 'referee'}, 'a map table with five miniature stores, one brand-new with very few visitors', '대결: 따로 vs 계층'),
 ],
 '13': [
  ({'asst': 'dropping marbles into jars'}, 'three menu jars filling with colored marbles each time a customer chooses; the jars become different heights', '메뉴마다 구슬 더하기 — 디리클레 세분화'),
  ({'robo': 'opening a small pop-up shop first'}, 'one small shop with a new dish, then a row of three, then a full street of shops lighting up step by step', '단계적 출시 — 베이지안 A/B'),
  ({'doc': 'presenting a travel map'}, 'a travel plan board with three routes for sun, cloud and rain icons (pictograms only, no text)', '시나리오와 의사결정 — 날씨별 여행 계획'),
  ({'fly': 'climbing a staircase step by step: 10%, 50%, full (shown as growing lights, no numbers)', 'robo': 'jumping straight to the top floor with a big leap', 'doc': 'referee holding two weather cards, sun and storm'}, 'a building with a staircase and an elevator shaft; uncertain weather overhead', '대결: 바로 적용 vs 단계적 적용'),
 ],
}

def chars(d):
    return '\n'.join(f'  {C[k]}, {v};' for k, v in d.items())

def block(kind, ratio, size, d, scene, alt):
    who = ', '.join(NAME[k] for k in d)
    ko = (f'웹페이지 본문에 넣을 그림 1장을 만들어 줘.\n- 비율 {ratio}, {size}\n- 첨부한 참고 이미지의 캐릭터({who})를 같은 그림체·같은 외형으로\n'
          '- 배경은 순수한 흰색(#ffffff), 방·벽·테두리 없이 흰 웹페이지 위에 바로 놓이게\n- 그림 안에 글자·숫자·로고·말풍선을 넣지 말 것\n아래 영어 프롬프트를 그대로 써 줘.')
    en = (f'{kind}, {ratio}.\n{STYLE}\n{WHITE_SPOT}\nCharacters:\n{chars(d)}\nScene: {scene}.\n'
          'Composition: characters and the main prop fill the middle 80%, generous white margin around, readable at 600px wide.\n'
          f'Mood: friendly, curious, clear at a glance.\n{BAN}')
    return ko + '\n\n' + en

L = ['# 그림 지시문 — 시리즈 표지 · 개별 표지 · 회차별 본문 그림', '',
     '흰 배경 페이지용(2026-11-11 개정: 대결 그림 13장과 시리즈 대표 표지에 인턴 시아·모아(심판)와 미공개 식구 X1~X3(방청객) 추가). 모든 그림은 글자 없음, 캐릭터 외형은 `adminmrobo/fruitfly-lab-expressions` 기본 그림을 참고 이미지로 함께 올립니다(인턴은 `images/_sheets/lab6_lineup.png`, 실루엣은 `images/x1`~`x3`). 개별 표지 16장은 네 캐릭터판으로 이미 받았으므로 다시 받지 않아도 됩니다.', '',
     '| 묶음 | 키 | 장수 | 비율 · 크기 | 넣을 자리 |', '|---|---|---|---|---|',
     '| ① 시리즈 대표 표지 | series_key, og_series | 2 | 21:9 2400×1030 / 1200×630 | README 맨 위, 목차 공유 미리보기 |',
     '| ② 개별 표지 | cover_00 ~ cover_13, cover_07m, cover_13f | 16 | 16:9 1600×900 | 각 페이지 맨 위 — 지시문은 `COVER_PROMPTS_series.md` |',
     '| ③ 칸 그림 | fig_{회차}_lv1 ~ lv3 | 39 | 4:3 1200×900 | 각 칸의 "일상으로 치면 \\| 통계로는" 상자 옆 |',
     '| ④ 대결 그림 | duel_{회차} | 13 | 16:9 1600×900 | 각 회차 대결 칸 맨 위 |', '',
     '모두 70장입니다. 받는 순서: ① series_key → ② cover_00 → (그림체 확정) → ② 나머지 표지 → ③·④ 회차 순서대로. 받은 그림은 WebP로 줄여(표지 220 KB, 칸 그림 120 KB 이하) 각 자리에 넣습니다.', '',
     '고칠 때(공통): `Same characters, same art style and composition. Change only: {고칠 점}. Still no text, white background.`', '']

# ① 시리즈 대표 표지
L += ['## ① 시리즈 대표 표지', '', '### series_key — 데이터 사이언티스트를 위한 베이지안 통계학 (대표 그림)', '',
      '| 항목 | 내용 |', '|---|---|', '| 키 · 크기 | series_key · 21:9, 2400×1030 이상 |', '| 넣을 자리 | README 맨 위, 목차 표지 대체 후보 |',
      '| 대체 글(alt) | 연구실 식구 여섯과 방청석의 실루엣 셋이 밝은 연구실에서 증거를 하나씩 더해 믿음을 고쳐 가는 커다란 저울을 둘러싼 장면 |', '',
      '**Genspark에 붙여 넣기 ↓**', '```',
      '시리즈 전체를 대표하는 가로로 긴 표지 그림 1장을 만들어 줘.\n- 비율 21:9, 가로 2400px 이상\n- 첨부한 참고 이미지의 연구실 식구 여섯(박사·조수·초파리 연구원·주판봇·시아·모아)과 미공개 실루엣 X1·X2·X3를 같은 그림체·같은 외형으로 모두 등장\n- 밝은 낮의 흰 연구실, 아래 가장자리는 흰색으로 자연스럽게 사라지게\n- 그림 안에 글자·숫자·로고 없음\n아래 영어 프롬프트를 그대로 써 줘.\n\n'
      'Series key visual, ultra-wide 21:9.\n' + STYLE + '\n'
      'Scene: a bright, airy research lab in soft daylight, clean white walls (#ffffff to #f6f7fb), pale blue monitor glow, accents of magenta (#a8329f), green (#138a52) and blue (#2563c9). High-key, no dark background.\n'
      'Center: a large brass balance scale; on one pan a soft glowing cloud (the prior belief), on the other a growing stack of small glowing evidence cubes; above it the cloud is reshaping into a sharper cloud (the updated belief).\n'
      'Around it, a gentle path of thirteen small stepping stones curving from left to right, each stone holding a tiny icon of a lesson prop (coin, dice, button pair, shopping basket, umbrella and sunglasses, chain, board game square, rice grains, pipe, review strip, X-ray frame, nested boxes, staircase).\n'
      'All four characters:\n' + chars({'doc': 'center-back, adding one evidence cube to the scale', 'asst': 'beside the scale, holding a blank clipboard', 'fly': 'on the left facing right, squinting skeptically at the cloud', 'robo': 'on the right facing left, cheerfully sliding abacus beads', 'sia': 'standing at the far left edge as a referee with a small blank flag', 'moa': 'standing at the far right edge as a referee with a blank scorecard', 'xs': 'peeking from a small audience bench in the lower middle background'}) + '\n'
      'Composition: faces and hands inside the central safe area (15% margin left and right, 10% top, 20% bottom); the bottom edge fades to near-white.\n'
      'Mood: curious, friendly rivalry, learning step by step.\n' + BAN, '```', '',
      '### og_series — 공유 미리보기', '', 'series_key를 받은 뒤 가운데를 1200×630(1.91:1)으로 잘라 `assets/og_series.jpg`를 바꿉니다. 새로 그릴 필요 없음. 자를 때 가운데 네 캐릭터 얼굴이 모두 들어가게 합니다.', '',
      '## ② 개별 표지 16장', '', '각 페이지 맨 위 16:9 표지입니다(`COVER_PROMPTS_series.md`와 같은 내용, 흰 배경판).', '']
cov = open(os.path.join(os.path.dirname(__file__), '..', 'out', 'docs', 'COVER_PROMPTS_series.md'), encoding='utf-8').read().split('\n## ', 1)[1]
L += [('### ' + cov).replace('\n## ', '\n### '), '']
L += [
      '## ③·④ 회차별 본문 그림', '', '회차마다 칸 그림 3장(①②③ 각 칸의 "일상으로 치면" 비유) + 대결 그림 1장. 배경은 순수 흰색, 방 배경 없이 캐릭터와 소품만 그립니다.', '']
man = [{'key': 'series_key', 'size': '2400x1030', 'place': 'README·index', 'status': 'needed'}, {'key': 'og_series', 'size': '1200x630', 'place': 'og:image', 'status': 'crop-from-series_key'}]
LP = {P['num']: P for P in pages if P.get('kind', 'lesson') == 'lesson'}
for n in sorted(F):
    P = LP[n]
    L += [f'### {int(n)}회차 · {re.sub("<[^>]+>", "", P["title"])}', '']
    for i, (d, scene, alt) in enumerate(F[n]):
        if i < 3:
            lv = P['levels'][i]; key = f'fig_{n}_lv{i+1}'
            head = f'#### {key} — 칸 {"①②③"[i]} {re.sub("<[^>]+>", "", lv["title"])}'
            info = f'| 넣을 자리 | `{P["file"]}#{lv["id"]}` "일상으로 치면 — {lv["pair"]["short"]}" 옆 |'
            body = block('Spot illustration for a web article, horizontal', '4:3', '가로 1200px 이상', d, scene, alt); size = '1200x900'
        else:
            key = f'duel_{n}'; dd = P['duel']
            head = f'#### {key} — 대결: {dd["question"]}'
            info = f'| 넣을 자리 | `{P["file"]}#duel` 맨 위 · 초파리 쪽 "{dd["fly_choice"]}" vs 주판봇 쪽 "{dd["robo_choice"]}" |'
            d = dict(d); d.update(REFEREE); d.update(AUD)
            if 'doc' in d: d['doc'] = d['doc'].replace('referee', 'commentator at the back')
            body = block('Wide duel scene illustration for a web article', '16:9', '가로 1600px 이상', d, scene, alt); size = '1600x900'
        L += [head, '', '| 항목 | 내용 |', '|---|---|', info, f'| 대체 글(alt) | {alt} |', '', '```', body, '```', '']
        man.append({'key': key, 'size': size, 'place': P['file'], 'status': 'needed'})
L += ['## 매니페스트', '', '```json', json.dumps(man, ensure_ascii=False, indent=1), '```', '']
out = sys.argv[1] if len(sys.argv) > 1 else 'docs/IMG_PROMPTS_chapters.md'
open(out, 'w', encoding='utf-8').write('\n'.join(L))
print(out, len(man), 'items')
