# 이미지 제작 명세서 — 데이터 사이언티스트를 위한 베이지안 통계학 (시리즈 공용)

## 1. 그림체와 고정 외형
캐릭터 팩 `CHAR_lab4` 18-3·18-4를 따릅니다. 16비트 RPG풍 픽셀아트, 굵은 어두운 외곽선, 흰 배경에 어울리는 밝은 낮 연구실 조명. 그림 안에 글자·숫자·로고 없음.

## 2. 지금 쓰는 그림
- 캐릭터 표정: 캐릭터 팩 1.3(fruitfly-lab-expressions @ 5269662) 96px를 페이지마다 필요한 키만 base64로 넣었습니다(페이지당 약 13~16장, 100 KB 안팎). 새로 그릴 표정은 없습니다.
- 장면·컷: 모든 실험 그림은 Canvas로 그려 그림 파일이 필요 없습니다.
- 표지: 16쪽 모두 대체 표지(그림 없이 완성 상태). 표지 지시문은 `COVER_PROMPTS_series.md`.

## 3. 새로 그릴 그림 (우선순위)
| 우선 | 키 | 판 | 내용 |
|---|---|---|---|
| P1 | cover_00 | L | 목차 표지(그림체 기준) |
| P1 | cover_01 ~ cover_13 | L | 회차 표지 13장 |
| P2 | cover_07m, cover_13f | L | 중간·기말 요약 표지 |
| P2 | thumb_01 ~ thumb_13 | I | 목차 카드 썸네일(표지를 3:2로 자르기) |
| P1 | series_key | K | 시리즈 대표 그림 21:9 (README 맨 위) |
| P3 | og_series | K | series_key를 1200×630으로 잘라 교체 |
| P2 | fig_01_lv1 ~ fig_13_lv3 | M | 칸 그림 39장, 4:3, 흰 배경 |
| P2 | duel_01 ~ duel_13 | L | 대결 그림 13장, 16:9, 흰 배경 |

전체 지시문은 `IMG_PROMPTS_all.md`에 있습니다.

## 4. 넘겨받은 뒤 처리
1. 16:9·글자 없음·네 캐릭터 외형 확인 → 2. WebP 1600×900(220 KB 이하) → 3. `<header class="cover" data-img="cover_{N}">` 자리에 넣기(빌드의 cover 함수) → 4. 390·768·1280 폭에서 얼굴 잘림 확인 → 5. 아래 매니페스트 status를 done으로.

## 5. 매니페스트
```json
[
 {
  "key": "cover_00",
  "board": "L",
  "size": "1600x900",
  "page": "index.html",
  "status": "needed",
  "fallback": "CSS 그라데이션 + 캐릭터 팩 4명 나란히"
 },
 {
  "key": "cover_01",
  "board": "L",
  "size": "1600x900",
  "page": "01_what_is_statistics.html",
  "status": "needed",
  "fallback": "CSS 그라데이션 + 캐릭터 팩 4명 나란히"
 },
 {
  "key": "thumb_01",
  "board": "I",
  "size": "600x400",
  "page": "index.html",
  "status": "needed",
  "fallback": "목차 카드는 글자만"
 },
 {
  "key": "cover_02",
  "board": "L",
  "size": "1600x900",
  "page": "02_probability.html",
  "status": "needed",
  "fallback": "CSS 그라데이션 + 캐릭터 팩 4명 나란히"
 },
 {
  "key": "thumb_02",
  "board": "I",
  "size": "600x400",
  "page": "index.html",
  "status": "needed",
  "fallback": "목차 카드는 글자만"
 },
 {
  "key": "cover_03",
  "board": "L",
  "size": "1600x900",
  "page": "03_bayesian_thinking.html",
  "status": "needed",
  "fallback": "CSS 그라데이션 + 캐릭터 팩 4명 나란히"
 },
 {
  "key": "thumb_03",
  "board": "I",
  "size": "600x400",
  "page": "index.html",
  "status": "needed",
  "fallback": "목차 카드는 글자만"
 },
 {
  "key": "cover_04",
  "board": "L",
  "size": "1600x900",
  "page": "04_ab_test.html",
  "status": "needed",
  "fallback": "CSS 그라데이션 + 캐릭터 팩 4명 나란히"
 },
 {
  "key": "thumb_04",
  "board": "I",
  "size": "600x400",
  "page": "index.html",
  "status": "needed",
  "fallback": "목차 카드는 글자만"
 },
 {
  "key": "cover_05",
  "board": "L",
  "size": "1600x900",
  "page": "05_recommender.html",
  "status": "needed",
  "fallback": "CSS 그라데이션 + 캐릭터 팩 4명 나란히"
 },
 {
  "key": "thumb_05",
  "board": "I",
  "size": "600x400",
  "page": "index.html",
  "status": "needed",
  "fallback": "목차 카드는 글자만"
 },
 {
  "key": "cover_06",
  "board": "L",
  "size": "1600x900",
  "page": "06_financial_risk.html",
  "status": "needed",
  "fallback": "CSS 그라데이션 + 캐릭터 팩 4명 나란히"
 },
 {
  "key": "thumb_06",
  "board": "I",
  "size": "600x400",
  "page": "index.html",
  "status": "needed",
  "fallback": "목차 카드는 글자만"
 },
 {
  "key": "cover_07",
  "board": "L",
  "size": "1600x900",
  "page": "07_markov_chain.html",
  "status": "needed",
  "fallback": "CSS 그라데이션 + 캐릭터 팩 4명 나란히"
 },
 {
  "key": "thumb_07",
  "board": "I",
  "size": "600x400",
  "page": "index.html",
  "status": "needed",
  "fallback": "목차 카드는 글자만"
 },
 {
  "key": "cover_07m",
  "board": "L",
  "size": "1600x900",
  "page": "07m_midterm_review.html",
  "status": "needed",
  "fallback": "CSS 그라데이션 + 캐릭터 팩 4명 나란히"
 },
 {
  "key": "cover_08",
  "board": "L",
  "size": "1600x900",
  "page": "08_monte_carlo.html",
  "status": "needed",
  "fallback": "CSS 그라데이션 + 캐릭터 팩 4명 나란히"
 },
 {
  "key": "thumb_08",
  "board": "I",
  "size": "600x400",
  "page": "index.html",
  "status": "needed",
  "fallback": "목차 카드는 글자만"
 },
 {
  "key": "cover_09",
  "board": "L",
  "size": "1600x900",
  "page": "09_bayesian_network.html",
  "status": "needed",
  "fallback": "CSS 그라데이션 + 캐릭터 팩 4명 나란히"
 },
 {
  "key": "thumb_09",
  "board": "I",
  "size": "600x400",
  "page": "index.html",
  "status": "needed",
  "fallback": "목차 카드는 글자만"
 },
 {
  "key": "cover_10",
  "board": "L",
  "size": "1600x900",
  "page": "10_nlp_bayes.html",
  "status": "needed",
  "fallback": "CSS 그라데이션 + 캐릭터 팩 4명 나란히"
 },
 {
  "key": "thumb_10",
  "board": "I",
  "size": "600x400",
  "page": "index.html",
  "status": "needed",
  "fallback": "목차 카드는 글자만"
 },
 {
  "key": "cover_11",
  "board": "L",
  "size": "1600x900",
  "page": "11_bayesian_vision.html",
  "status": "needed",
  "fallback": "CSS 그라데이션 + 캐릭터 팩 4명 나란히"
 },
 {
  "key": "thumb_11",
  "board": "I",
  "size": "600x400",
  "page": "index.html",
  "status": "needed",
  "fallback": "목차 카드는 글자만"
 },
 {
  "key": "cover_12",
  "board": "L",
  "size": "1600x900",
  "page": "12_hierarchical_bayes.html",
  "status": "needed",
  "fallback": "CSS 그라데이션 + 캐릭터 팩 4명 나란히"
 },
 {
  "key": "thumb_12",
  "board": "I",
  "size": "600x400",
  "page": "index.html",
  "status": "needed",
  "fallback": "목차 카드는 글자만"
 },
 {
  "key": "cover_13",
  "board": "L",
  "size": "1600x900",
  "page": "13_capstone.html",
  "status": "needed",
  "fallback": "CSS 그라데이션 + 캐릭터 팩 4명 나란히"
 },
 {
  "key": "thumb_13",
  "board": "I",
  "size": "600x400",
  "page": "index.html",
  "status": "needed",
  "fallback": "목차 카드는 글자만"
 },
 {
  "key": "cover_13f",
  "board": "L",
  "size": "1600x900",
  "page": "13f_final_review.html",
  "status": "needed",
  "fallback": "CSS 그라데이션 + 캐릭터 팩 4명 나란히"
 },
 {
  "key": "og_series",
  "board": "K",
  "size": "1200x630",
  "page": "all",
  "status": "done",
  "file": "assets/og_series.jpg",
  "note": "대체 표지 화면을 찍은 임시 공유 그림. 목차 표지를 받으면 잘라 바꿈"
 }
]
```