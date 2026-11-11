// P&E 글로벌 본사 타워 — 3D 첫 화면 (three.js). 목차: 건물 전체, 회차: 그 층을 꺼내 평면으로 안내
const TW = document.getElementById('tower');
const TD = JSON.parse(document.getElementById('towerData').textContent);
const $t = s => TW.querySelector(s);
const stage = $t('.tw-stage'), cvBox = $t('.tw-cv'), lbBox = $t('.tw-labels'), card = $t('.tw-card');
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const IDX = TD.cur === '00';

// 세계 지사 시각(목차)
TW.querySelectorAll('.tw-clock span').forEach(el => {
  const f = new Intl.DateTimeFormat('ko-KR', { timeZone: el.dataset.tz, hour: '2-digit', minute: '2-digit', hour12: false });
  const tick = () => { try { el.querySelector('i').textContent = f.format(new Date()); } catch (e) {} };
  tick(); setInterval(tick, 30000);
});

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const goSec = id => { const el = document.getElementById(id); if (el) { el.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' }); history.replaceState(null, '', '#' + id); } };

let api = null;
try { api = await build(); } catch (err) { console.error(err); $t('.tw-err').hidden = false; }
$t('.tw-load').hidden = true;

async function build() {
  const THREE = await import('three');
  const { OrbitControls } = await import('three/addons/controls/OrbitControls.js');
  const W = 8, DP = 5, PULL = DP + 2.6;
  const FL = TD.floors;
  const FH = k => k === '00' ? 1.7 : k === '07m' ? 0.8 : k === '13f' ? 0.55 : 1.15;
  let y = 0; FL.forEach(f => { f.y = y; f.h = FH(f.key); y += f.h; });
  const TOP = y;
  const cur = FL.find(f => f.key === TD.cur);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  cvBox.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xf4f7fc, 60, 140);
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 400);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; controls.dampingFactor = 0.08; controls.enablePan = false;
  controls.minPolarAngle = 0.15; controls.maxPolarAngle = Math.PI / 2 - 0.04;
  controls.minDistance = 6; controls.maxDistance = 120;
  controls.autoRotateSpeed = 0.55;

  scene.add(new THREE.HemisphereLight(0xffffff, 0xc9d3e3, 1.6));
  const sun = new THREE.DirectionalLight(0xffffff, 1.7); sun.position.set(18, 30, 22); scene.add(sun);
  const fill = new THREE.DirectionalLight(0xdfe8ff, 0.6); fill.position.set(-20, 10, -12); scene.add(fill);

  const M = (c, o = {}) => new THREE.MeshStandardMaterial(Object.assign({ color: c, roughness: 0.75, metalness: 0.05 }, o));
  const box = (w, h, d, mat) => new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);

  // 땅 · 광장 · 나무
  const ground = new THREE.Mesh(new THREE.CircleGeometry(48, 64), M(0xe9edf4, { roughness: 1 }));
  ground.rotation.x = -Math.PI / 2; ground.position.y = -0.02; scene.add(ground);
  const plaza = box(W + 7, 0.04, DP + PULL + 5, M(0xf5f6f9, { roughness: 1 })); plaza.position.set(0, 0, (PULL) / 2); scene.add(plaza);
  const road = box(60, 0.03, 3, M(0xd5dbe6, { roughness: 1 })); road.position.set(0, 0, DP / 2 + PULL + 4.5); scene.add(road);
  const treeG = new THREE.ConeGeometry(0.55, 1.6, 10), trunkG = new THREE.CylinderGeometry(0.08, 0.08, 0.5, 6);
  const treeM = M(0x6fae84), trunkM = M(0x9b7b5c);
  [[-6.5, 2], [-6.5, 5], [-6.5, 8], [6.5, 2], [6.5, 5], [6.5, 8], [-7.5, -3], [7.5, -3]].forEach(([x, z]) => {
    const t = new THREE.Mesh(treeG, treeM); t.position.set(x, 1.05, z); scene.add(t);
    const k = new THREE.Mesh(trunkG, trunkM); k.position.set(x, 0.25, z); scene.add(k);
  });
  // 낮은 별관 두 동(다국적 기업 캠퍼스 느낌)
  [[-13, -4, 5, 3.2, 4], [13, -2, 4, 2.4, 5]].forEach(([x, z, w, h, d]) => {
    const a = box(w, h, d, M(0xdfe5ef)); a.position.set(x, h / 2, z); scene.add(a);
    const g = box(w + 0.02, h * 0.55, d + 0.02, M(0xa9bfdc, { transparent: true, opacity: 0.55, roughness: 0.2 })); g.position.set(x, h * 0.55, z); scene.add(g);
  });

  // 글자 판(캔버스)
  function signTex(lines, w = 1024, h = 256, bg = '#1d2a44', fg = '#ffffff') {
    const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d');
    x.fillStyle = bg; x.fillRect(0, 0, w, h); x.fillStyle = fg; x.textAlign = 'center'; x.textBaseline = 'middle';
    const n = lines.length;
    lines.forEach((t, i) => { x.font = `${i === 0 ? 700 : 500} ${i === 0 ? h * 0.42 / n * 1.25 : h * 0.22}px "IBM Plex Sans KR", system-ui, sans-serif`; x.fillText(t, w / 2, h * (i + 0.5) / n + (n > 1 ? (i === 0 ? h * 0.06 : -h * 0.04) : 0)); });
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t;
  }

  // 코어(엘리베이터 샤프트)
  const core = box(1.6, TOP + 0.9, 1.0, M(0xcfd6e3)); core.position.set(0, (TOP + 0.9) / 2, -DP / 2 - 0.45); scene.add(core);

  const tower = new THREE.Group(); scene.add(tower);
  const hits = [], floorObj = {};
  const glassM = M(0x9cb7da, { transparent: true, opacity: 0.38, roughness: 0.15, metalness: 0.2, depthWrite: false });
  const glassG = M(0xa7d4bb, { transparent: true, opacity: 0.42, roughness: 0.2, depthWrite: false });
  const slabM = M(0xe3e7ef), mullM = new THREE.LineBasicMaterial({ color: 0x8796ae, transparent: true, opacity: 0.55 });

  FL.forEach(f => {
    const g = new THREE.Group(); g.position.y = f.y; tower.add(g);
    const col = new THREE.Color(f.color);
    const bandM = M(col, { emissive: col.clone(), emissiveIntensity: 0.0 });
    const band = box(W + 0.3, 0.1, DP + 0.3, bandM); band.position.y = 0.06; g.add(band);
    const slab = box(W + 0.2, 0.04, DP + 0.2, slabM); slab.position.y = 0.12; g.add(slab);
    const o = { f, g, bandM, glass: null, mats: [] };
    if (f.key === '13f') {
      // 옥상: 난간 · 지구본 · 간판
      const pm = M(0xdfe5ee);
      [[W + 0.2, 0.4, 0.12, 0, DP / 2 + 0.04], [W + 0.2, 0.4, 0.12, 0, -DP / 2 - 0.04], [0.12, 0.4, DP + 0.2, W / 2 + 0.04, 0], [0.12, 0.4, DP + 0.2, -W / 2 - 0.04, 0]]
        .forEach(([w, h, d, x, z]) => { const p = box(w, h, d, pm); p.position.set(x, 0.3, z); g.add(p); });
      const deck = box(W - 0.4, 0.02, DP - 0.4, M(0xcfe7d8)); deck.position.y = 0.11; g.add(deck);
      const globe = new THREE.Mesh(new THREE.IcosahedronGeometry(0.9, 2), new THREE.MeshBasicMaterial({ color: 0x3f5fa8, wireframe: true, transparent: true, opacity: 0.7 }));
      globe.position.set(2.4, 1.35, -0.6); g.add(globe); o.globe = globe; o.deco = [globe];
      const stand = box(0.12, 0.6, 0.12, pm); stand.position.set(2.4, 0.4, -0.6); g.add(stand); o.deco.push(stand);
      const sign = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 1.05), new THREE.MeshBasicMaterial({ map: signTex(['P&E GLOBAL', 'Prior & Evidence']), side: THREE.DoubleSide }));
      sign.position.set(-1.4, 1.25, -DP / 2 + 0.25); g.add(sign); o.deco.push(sign);
      const sl = box(0.08, 0.7, 0.08, pm); sl.position.set(-2.8, 0.45, -DP / 2 + 0.25); g.add(sl);
      const sr = sl.clone(); sr.position.x = 0; g.add(sr); o.deco.push(sl, sr);
    } else {
      const inset = f.key === '07m' ? 0.7 : 0;
      const gh = f.h - 0.12;
      const glass = box(W - inset, gh, DP - inset, f.key === '07m' ? glassG.clone() : glassM.clone());
      glass.position.y = 0.12 + gh / 2; g.add(glass); o.glass = glass;
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(glass.geometry), mullM); edges.position.copy(glass.position); g.add(edges);
      // 세로 창살
      const pts = []; const hw = (W - inset) / 2, hd = (DP - inset) / 2;
      for (let x = -hw + 1; x < hw - 0.01; x += 1) { pts.push(x, 0.12, hd + 0.001, x, 0.12 + gh, hd + 0.001, x, 0.12, -hd - 0.001, x, 0.12 + gh, -hd - 0.001); }
      for (let z = -hd + 1; z < hd - 0.01; z += 1) { pts.push(hw + 0.001, 0.12, z, hw + 0.001, 0.12 + gh, z, -hw - 0.001, 0.12, z, -hw - 0.001, 0.12 + gh, z); }
      const mg = new THREE.BufferGeometry(); mg.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
      g.add(new THREE.LineSegments(mg, mullM));
      if (f.key === '07m') { [[-3.6, 2.2], [3.6, 2.2], [-3.6, -2.2], [3.6, -2.2]].forEach(([x, z]) => { const t = new THREE.Mesh(new THREE.SphereGeometry(0.28, 10, 8), treeM); t.position.set(x, 0.42, z); g.add(t); }); }
      if (f.key === '00') {
        const can = box(3.6, 0.1, 1.6, M(0xdfe5ee)); can.position.set(0, 1.25, DP / 2 + 0.8); g.add(can);
        [-1.6, 1.6].forEach(x => { const p = box(0.1, 1.2, 0.1, M(0xb8c2d3)); p.position.set(x, 0.62, DP / 2 + 1.5); g.add(p); });
        const sign = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 0.42), new THREE.MeshBasicMaterial({ map: signTex(['P&E GLOBAL  ·  서울 본사'], 1024, 128) }));
        sign.position.set(0, 1.45, DP / 2 + 1.61); g.add(sign);
      }
    }
    const hit = new THREE.Mesh(new THREE.BoxGeometry(W + 0.4, Math.max(f.h, 0.6), DP + 0.4), new THREE.MeshBasicMaterial({ visible: false }));
    hit.position.y = Math.max(f.h, 0.6) / 2; hit.userData.key = f.key; g.add(hit); hits.push(hit);
    floorObj[f.key] = o;
  });

  // ── 층 평면(회차 쪽) ──────────────────────────────────
  let plan = null, rooms = [], route = null, walker = null, routeLen = 0, desk = null;
  if (!IDX) {
    plan = new THREE.Group(); plan.visible = false; floorObj[cur.key].g.add(plan);
    const PY = 0.16;
    const floorM = M(0xf7f8fb, { roughness: 1 });
    const pf = box(W - 0.1, 0.02, DP - 0.1, floorM); pf.position.y = PY; plan.add(pf);
    const corr = box(W - 1.6, 0.012, 0.9, M(0xe7ebf3, { roughness: 1 })); corr.position.set(0.7, PY + 0.016, 0); plan.add(corr);
    const hall0 = -W / 2, hall1 = -W / 2 + 1.5;
    const ev = box(1.0, 0.9, 1.3, M(0x5d6a85)); ev.position.set(hall0 + 0.65, PY + 0.45, -1.55); plan.add(ev);
    const evs = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.3), new THREE.MeshBasicMaterial({ map: signTex(['EV  ▲▼'], 512, 192, '#5d6a85') }));
    evs.position.set(hall0 + 0.65, PY + 0.7, -0.89); plan.add(evs);
    const rs = cur.rooms;
    // 안내 데스크(rooms[0])
    desk = { r: rs[0], i: 0, x: hall0 + 0.75, z: 1.0 };
    const dm = M(cur.color, { transparent: true, opacity: 0.85 });
    const dk = box(1.0, 0.4, 0.5, dm); dk.position.set(desk.x, PY + 0.2, desk.z); dk.userData.room = 0; plan.add(dk);
    desk.mesh = dk; desk.mat = dm; desk.pos = new THREE.Vector3(desk.x, PY + 0.55, desk.z);
    rooms.push(desk);
    const rest = rs.slice(1), n1 = Math.ceil(rest.length / 2), n2 = rest.length - n1;
    const x0 = hall1, x1 = W / 2, cw = 0.45;
    const roomCol = r => ({ dash: '#2563c9', duel: '#d23f2c', sum: '#138a52', kg: '#5d6278', cast: '#a8329f', summary: '#3f5fa8', orig: '#b77800', calc: '#14899a', score: '#d23f2c', export: '#5d6278' }[r.id] || cur.color);
    rest.forEach((r, j) => {
      const top = j < n1, k = top ? j : j - n1, n = top ? n1 : n2;
      const w = (x1 - x0) / n;
      const xi = top ? k : (n - 1 - k);          // 아래 줄은 오른쪽에서 왼쪽으로(ㄷ자 동선)
      const cx = x0 + w * (xi + 0.5), d = DP / 2 - cw, cz = top ? -(cw + d / 2) : (cw + d / 2);
      const c = new THREE.Color(roomCol(r));
      const fm = M(c, { transparent: true, opacity: 0.28, emissive: c.clone(), emissiveIntensity: 0, depthWrite: false });
      const tile = box(w - 0.14, 0.03, d - 0.12, fm); tile.position.set(cx, PY + 0.03, cz); tile.userData.room = rooms.length; plan.add(tile);
      const wallG = new THREE.BoxGeometry(w - 0.14, 0.55, d - 0.12);
      const wm = M(c, { transparent: true, opacity: 0.1, depthWrite: false });
      const wall = new THREE.Mesh(wallG, wm); wall.position.set(cx, PY + 0.3, cz); wall.userData.room = rooms.length; plan.add(wall);
      const le = new THREE.LineSegments(new THREE.EdgesGeometry(wallG), new THREE.LineBasicMaterial({ color: c, transparent: true, opacity: 0.85 }));
      le.position.copy(wall.position); plan.add(le);
      const tb = box(Math.min(0.9, w * 0.45), 0.22, 0.5, M(0xffffff)); tb.position.set(cx, PY + 0.14, cz); plan.add(tb);
      rooms.push({ r, i: rooms.length, x: cx, z: cz, w, top, fm, wm, pos: new THREE.Vector3(cx, PY + 0.75, cz), meshes: [tile, wall] });
    });
    // 동선: 엘리베이터 → 데스크 → 위 줄(→) → 끝에서 돌아 아래 줄(←) → 엘리베이터
    const P = [[hall0 + 0.65, -0.6], [hall0 + 0.75, 0.45], [x0, -0.18], [x1 - 0.3, -0.18], [x1 - 0.3, 0.18], [x0, 0.18], [hall0 + 0.9, 0.18], [hall0 + 0.65, -0.6]]
      .map(([x, z]) => new THREE.Vector3(x, PY + 0.05, z));
    route = new THREE.CurvePath(); for (let i = 0; i < P.length - 1; i++) route.add(new THREE.LineCurve3(P[i], P[i + 1]));
    routeLen = route.getLength();
    const rg = new THREE.BufferGeometry().setFromPoints(route.getSpacedPoints(160));
    const rl = new THREE.Line(rg, new THREE.LineDashedMaterial({ color: new THREE.Color(cur.color), dashSize: 0.18, gapSize: 0.12 })); rl.computeLineDistances(); plan.add(rl);
    // 화살표
    const arG = new THREE.ConeGeometry(0.09, 0.22, 8), arM = new THREE.MeshBasicMaterial({ color: new THREE.Color(cur.color) });
    for (let t = 0.04; t < 1; t += 0.06) {
      const p = route.getPointAt(t), q = route.getTangentAt(t);
      const a = new THREE.Mesh(arG, arM); a.position.copy(p); a.position.y += 0.02;
      a.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), q); plan.add(a);
    }
    // 걷는 사람
    walker = new THREE.Group();
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.13, 0.28, 4, 10), M(new THREE.Color(cur.color), { emissive: new THREE.Color(cur.color), emissiveIntensity: 0.25 }));
    body.position.y = 0.27; walker.add(body);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.11, 12, 10), M(0xf2d2b6)); head.position.y = 0.6; walker.add(head);
    plan.add(walker);
  }

  // ── 라벨 ─────────────────────────────────────────────
  const labels = [];
  function mkLabel(cls, html, color, onClick) {
    const el = document.createElement('div'); el.className = 'tw-lb ' + cls; el.innerHTML = html; el.style.setProperty('--c', color);
    if (onClick) el.addEventListener('click', onClick);
    lbBox.appendChild(el); return el;
  }
  FL.forEach(f => {
    const short = f.key === '00' ? '로비' : f.dept;
    const el = mkLabel('fl' + (f.key === TD.cur ? ' cur' : ''), `<b>${esc(f.label)}</b><span>${esc(short)}</span><small>${esc(f.ep)}</small>`, f.color, () => openCard(f.key));
    labels.push({ el, kind: 'fl', key: f.key, f });
  });
  rooms.forEach((rm, i) => {
    const el = mkLabel('rm', `<b>${i === 0 ? 'EV' : i}</b><span>${esc(rm.r.name)}</span><small>${esc(rm.r.sec)}</small>`, rm.i === 0 ? cur.color : (rm.fm ? '#' + rm.fm.color.getHexString() : cur.color), () => goSec(rm.r.id));
    labels.push({ el, kind: 'rm', rm, i });
  });

  // ── 카메라 시점 ───────────────────────────────────────
  const tmp = new THREE.Vector3();
  function viewBuilding() {
    const a = Math.max(camera.aspect, 0.45), t = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const narrow = camera.aspect < 0.9;
    const d = Math.max((TOP + 4) / 2 / t, (W * 2.1) / 2 / (t * a)) * (narrow ? 1.12 : 1.04);
    const dir = new THREE.Vector3(0.78, 0.36, 1).normalize();
    const tg = new THREE.Vector3(0, TOP / 2 + (narrow ? 0.6 : -0.2), 1.0);
    return { pos: tg.clone().addScaledVector(dir, d), tg };
  }
  function viewPlan() {
    const a = Math.max(camera.aspect, 0.45), t = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const narrow = camera.aspect < 0.9;
    const d = Math.max(4.2 / t, (W + 1.0) / 2 / (t * a)) * (narrow ? 1.0 : 1.12);
    const dir = (narrow ? new THREE.Vector3(0.05, 1.5, 0.75) : new THREE.Vector3(0.18, 0.95, 0.85)).normalize();
    const tg = new THREE.Vector3(0.2, cur.y + 0.2, PULL + (narrow ? 0.3 : 0.55));
    return { pos: tg.clone().addScaledVector(dir, d), tg };
  }
  let tween = null;
  function flyTo(v, ms = 1400) {
    if (REDUCED) { camera.position.copy(v.pos); controls.target.copy(v.tg); controls.update(); return; }
    tween = { p0: camera.position.clone(), t0: controls.target.clone(), p1: v.pos, t1: v.tg, s: performance.now(), ms };
  }
  const ease = x => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

  let mode = IDX ? 'b' : 'b', pull = 0, pullTo = 0;
  function setMode(m, fly = true) {
    mode = m;
    TW.querySelectorAll('.tw-tools button[data-v=b],.tw-tools button[data-v=p]').forEach(b => b.classList.toggle('on', b.dataset.v === m));
    if (!IDX) pullTo = m === 'p' ? 1 : 0;
    if (m === 'p') { controls.autoRotate = false; closeCard(); }
    $t('.tw-hint').textContent = m === 'p' ? '방을 누르면 그 칸으로 내려갑니다 · 드래그로 돌려 보기' : (IDX ? '드래그로 돌려 보고 층을 누르면 안내 카드가 열려요' : '층을 누르면 안내 카드가 열려요 · 「이 층 평면」으로 돌아가기');
    if (fly) flyTo(m === 'p' ? viewPlan() : viewBuilding(), m === 'p' ? 1700 : 1300);
  }

  // ── 카드 ─────────────────────────────────────────────
  let cardKey = null;
  function openCard(key) {
    const f = FL.find(x => x.key === key); if (!f) return;
    if (!IDX && mode === 'p') return;
    cardKey = key; card.style.setProperty('--c', f.color);
    const here = key === TD.cur;
    const go = here ? (IDX ? `<a class="go" href="#map">층별 회차 지도 보기 ↓</a>` : `<a class="go" href="#" data-plan>이 층 평면 보기</a>`)
      : `<a class="go" href="${esc(f.file)}">${esc(f.label)} ${key === '00' ? '로비(목차)' : '이 층으로 올라가기'} →</a>`;
    card.innerHTML = `<button class="x" type="button" aria-label="닫기">×</button><span class="k">${esc(f.label)} · ${esc(f.en)} · ${esc(f.branch)}</span><h4>${esc(f.dept)}</h4><p><b>${esc(f.ep)}</b> ${esc(f.title)}</p><p>${esc(f.biz)}</p>${here && !IDX ? '<p class="k">지금 계신 층입니다.</p>' : ''}${go}`;
    card.hidden = false;
    card.querySelector('.x').onclick = closeCard;
    const pl = card.querySelector('[data-plan]'); if (pl) pl.onclick = ev => { ev.preventDefault(); setMode('p'); };
    if (IDX) markDir(key);
  }
  function closeCard() { card.hidden = true; cardKey = null; if (IDX) markDir(null); }
  function markDir(k) { TW.querySelectorAll('.tw-dir li').forEach(li => li.classList.toggle('on', li.dataset.k === k)); }

  // ── 포인터 ───────────────────────────────────────────
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  let hoverKey = null, hoverRoom = -1, downAt = null;
  function pick(ev) {
    const r = renderer.domElement.getBoundingClientRect();
    ndc.set(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    if (!IDX && mode === 'p') {
      const ms = []; rooms.forEach(rm => { if (rm.meshes) ms.push(...rm.meshes); else ms.push(rm.mesh); });
      const h = ray.intersectObjects(ms, false)[0];
      return { room: h ? h.object.userData.room : -1 };
    }
    const h = ray.intersectObjects(hits, false)[0];
    return { key: h ? h.object.userData.key : null };
  }
  renderer.domElement.addEventListener('pointermove', ev => {
    const p = pick(ev);
    hoverKey = p.key || null; hoverRoom = p.room ?? -1;
    renderer.domElement.style.cursor = (hoverKey || hoverRoom >= 0) ? 'pointer' : '';
  });
  renderer.domElement.addEventListener('pointerleave', () => { hoverKey = null; hoverRoom = -1; });
  renderer.domElement.addEventListener('pointerdown', ev => { downAt = [ev.clientX, ev.clientY]; controls.autoRotate = false; setSpin(false); tween = null; });
  renderer.domElement.addEventListener('pointerup', ev => {
    if (!downAt || Math.hypot(ev.clientX - downAt[0], ev.clientY - downAt[1]) > 6) return;
    const p = pick(ev);
    if (p.room >= 0) goSec(rooms[p.room].r.id);
    else if (p.key) openCard(p.key);
    else closeCard();
  });

  // 안내판과 연동
  TW.querySelectorAll('.tw-dir li').forEach(li => {
    li.addEventListener('mouseenter', () => { hoverKey = li.dataset.k; });
    li.addEventListener('mouseleave', () => { hoverKey = null; });
    li.addEventListener('focusin', () => { hoverKey = li.dataset.k; });
  });
  const routeLis = [...TW.querySelectorAll('.tw-route li')];
  routeLis.forEach((li, i) => { li.addEventListener('mouseenter', () => { hoverRoom = i; }); li.addEventListener('mouseleave', () => { hoverRoom = -1; }); });

  function setSpin(on) {
    const b = $t('.tw-tools button[data-v=spin]'); if (!b) return;
    b.setAttribute('aria-pressed', on ? 'true' : 'false'); controls.autoRotate = on && !REDUCED;
  }
  TW.querySelectorAll('.tw-tools button').forEach(b => b.addEventListener('click', () => {
    const v = b.dataset.v;
    if (v === 'spin') { setSpin(b.getAttribute('aria-pressed') !== 'true'); return; }
    setMode(v);
  }));

  // ── 크기 · 화면에 보일 때만 그리기 ──────────────────────
  function resize() {
    const w = stage.clientWidth, h = stage.clientHeight; if (!w || !h) return;
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  new ResizeObserver(() => resize()).observe(stage); resize();
  let visible = true;
  new IntersectionObserver(es => { visible = es[0].isIntersecting; }, { threshold: 0.01 }).observe(stage);

  // 첫 시점
  const vb = viewBuilding(); camera.position.copy(vb.pos); controls.target.copy(vb.tg); controls.update();
  if (IDX) { setSpin(true); }
  else {
    floorObj[cur.key].bandM.emissiveIntensity = 0.6;
    if (REDUCED) { setMode('p'); pull = 1; }
    else setTimeout(() => { if (mode === 'b' && !tween) setMode('p'); }, 1100);
  }

  // ── 그리기 ───────────────────────────────────────────
  const clock = new THREE.Clock();
  let walkT = 0, lastNow = -1;
  const right = new THREE.Vector3(), up = new THREE.Vector3(0, 1, 0), fwd = new THREE.Vector3();
  function frame() {
    requestAnimationFrame(frame);
    const dt = Math.min(clock.getDelta(), 0.05);
    if (!visible || document.hidden) return;
    const now = performance.now();
    if (tween) {
      const k = Math.min(1, (now - tween.s) / tween.ms), e2 = ease(k);
      camera.position.lerpVectors(tween.p0, tween.p1, e2); controls.target.lerpVectors(tween.t0, tween.t1, e2);
      if (k >= 1) tween = null;
    }
    controls.update();
    // 층 꺼내기
    if (!IDX) {
      pull += (pullTo - pull) * Math.min(1, dt * (REDUCED ? 60 : 3.2));
      if (Math.abs(pullTo - pull) < 0.001) pull = pullTo;
      const o = floorObj[cur.key]; o.g.position.z = PULL * pull; o.g.position.x = 0;
      plan.visible = pull > 0.55;
      if (o.glass) { o.glass.visible = pull < 0.35; }
      if (o.deco) o.deco.forEach(m => { m.visible = pull < 0.35; });
      FL.forEach(f => { const g = floorObj[f.key].glass; if (g && f.key !== cur.key) g.material.opacity = (f.key === '07m' ? 0.42 : 0.38) * (1 - 0.45 * pull); });
    }
    // 강조
    FL.forEach(f => {
      const o = floorObj[f.key];
      const on = f.key === hoverKey || f.key === cardKey;
      const base = (!IDX && f.key === cur.key) ? 0.35 + 0.3 * Math.sin(now / 380) : 0;
      o.bandM.emissiveIntensity = on ? 0.9 : base;
      if (o.glass) o.glass.material.emissive?.set(on ? f.color : 0x000000), o.glass.material.emissiveIntensity = on ? 0.25 : 0;
      if (o.globe) o.globe.rotation.y += dt * 0.4;
    });
    // 걷는 사람
    let nowRoom = -1;
    if (walker && plan.visible) {
      walkT = (walkT + dt * (REDUCED ? 0 : 0.9) / routeLen) % 1;
      const p = route.getPointAt(walkT), q = route.getTangentAt(walkT);
      walker.position.copy(p); walker.rotation.y = Math.atan2(q.x, q.z);
      walker.children[0].position.y = 0.27 + Math.abs(Math.sin(now / 140)) * 0.04;
      if (p.x < -W / 2 + 1.55) nowRoom = 0;
      else rooms.forEach(rm => { if (rm.fm && Math.abs(p.x - rm.x) < rm.w / 2 && (rm.top ? p.z < 0 : p.z > 0)) nowRoom = rm.i; });
    }
    rooms.forEach(rm => {
      const on = rm.i === hoverRoom, w = rm.i === nowRoom;
      if (rm.fm) { rm.fm.opacity = on ? 0.6 : w ? 0.45 : 0.28; rm.fm.emissiveIntensity = on ? 0.5 : w ? 0.25 : 0; rm.wm.opacity = on ? 0.22 : 0.1; }
      else if (rm.mat) rm.mat.emissive?.set(on || w ? cur.color : 0x000000);
    });
    if (nowRoom !== lastNow) { routeLis.forEach((li, i) => li.classList.toggle('now', i === nowRoom)); lastNow = nowRoom; }
    // 라벨 위치
    const cw = stage.clientWidth, ch = stage.clientHeight;
    camera.getWorldDirection(fwd); right.crossVectors(fwd, up).normalize();
    labels.forEach(L => {
      let show;
      if (L.kind === 'fl') {
        show = IDX || mode === 'b' || L.key === TD.cur;
        if (!IDX && mode === 'p' && L.key === TD.cur) show = false;
        const f = L.f, o = floorObj[f.key];
        tmp.set(0, f.y + Math.max(f.h, 0.6) / 2, o.g.position.z).addScaledVector(right, W * 0.62 + 0.35);
      } else {
        show = mode === 'p' && plan.visible;
        tmp.copy(L.rm.pos); plan.localToWorld(tmp);
      }
      tmp.project(camera);
      const vis = show && tmp.z < 1 && tmp.x > -1.2 && tmp.x < 1.2 && tmp.y > -1.2 && tmp.y < 1.2;
      L.el.classList.toggle('hide', !vis);
      if (vis) L.el.style.transform = `translate(${((tmp.x + 1) / 2 * cw).toFixed(1)}px,${((1 - tmp.y) / 2 * ch).toFixed(1)}px) ${L.kind === 'fl' ? 'translate(0,-50%)' : 'translate(-50%,-100%)'}`;
      const on = L.kind === 'fl' ? (L.key === hoverKey || L.key === cardKey) : (L.i === hoverRoom || L.i === nowRoom);
      L.el.classList.toggle('on', on);
    });
    renderer.render(scene, camera);
  }
  frame();
  return { setMode };
}
