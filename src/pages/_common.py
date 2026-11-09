def REF0(n, t):
    return {'id': f'ahn2025bayes{n:02d}', 'type': 'manuscript', 'title': f'데이터 사이언티스트를 위한 베이지안 통계학 {n}회차: {t} (강의 원고)', 'author': [{'family': '안', 'given': '상선'}], 'issued': {'date-parts': [[2025]]},
            'lab': {'work': f'lab:work/ahn2025bayes{n:02d}', 'role': 'primary', 'verified': {'title': True, 'authors': True, 'year': True, 'venue': False}, 'checkedBy': '원고 PDF 버전 정보(v.1.0 2025)', 'note': '온라인 강의 원고(스토리보드). 게재처 정보 없음'}}
def REF(id, typ, title, authors, year, venue='', role='background', note='', url=''):
    r = {'id': id, 'type': typ, 'title': title, 'author': authors, 'issued': {'date-parts': [[year]]}, 'lab': {'work': f'lab:work/{id}', 'role': role, 'verified': {'title': False, 'authors': False, 'year': False, 'venue': False, 'doi': False}, 'checkedBy': '미확인 — 원문 대조 필요', 'note': note}}
    if venue: r['container-title'] = venue
    if url: r['URL'] = url
    return r
def SRC0(n, t):
    return f'안상선 (2025). 데이터 사이언티스트를 위한 베이지안 통계학 {n}회차 「{t}」 강의 원고 v2.1. 이 페이지의 주 자료.'
