/* A field of particles drawn into one element. It gathers into the
   portrait (sampled from the cut-out photo), then morphs into a three-layer
   "full stack": mobile, web, backend. Shapes are plain Float32Arrays and
   the GPU blends two of them, so tens of thousands of points stay smooth. */
import * as THREE from 'three';

const VERT = `
  attribute vec3 aFrom; attribute vec3 aTo; attribute vec3 aColFrom; attribute vec3 aColTo;
  attribute float aTagTo; attribute vec4 aRand;
  uniform float uMix, uTime, uSizeFrom, uSizeTo, uHi, uReveal, uFade;
  uniform vec2 uMouse;
  varying vec3 vCol; varying float vAlpha;
  void main() {
    float t = clamp(uMix * 1.5 - aRand.x * 0.5, 0.0, 1.0);
    t = t * t * (3.0 - 2.0 * t);
    vec3 p = mix(aFrom, aTo, t);
    float fl = sin(t * 3.14159);
    p += vec3(sin(aRand.y * 40.0 + uTime * 0.6), cos(aRand.z * 40.0 + uTime * 0.5), sin(aRand.w * 40.0)) * fl * 0.9;
    p.xy += vec2(sin(uTime * 0.7 + aRand.y * 6.28), cos(uTime * 0.6 + aRand.z * 6.28)) * 0.012;
    vec2 d = p.xy - uMouse; float dl = length(d);
    p.xy += normalize(d + 1e-4) * 0.4 * exp(-dl * dl * 2.6);
    float hi = (uHi > -0.5 && abs(aTagTo - uHi) < 0.5) ? 1.0 : 0.0;
    float dim = (uHi > -0.5 && aTagTo > -0.5 && hi < 0.5) ? 0.35 : 1.0;
    vCol = mix(aColFrom, aColTo, t);
    vAlpha = dim * uFade * smoothstep(0.0, 0.25, uReveal - aRand.x * 0.75);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = mix(uSizeFrom, uSizeTo, t) * (0.8 + aRand.y * 0.45) * (10.0 / -mv.z);
  }`;
const FRAG = `
  precision mediump float;
  varying vec3 vCol; varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.36, d) * vAlpha;
    if (a < 0.01) discard;
    gl_FragColor = vec4(vCol, a);
  }`;

let seed = 1;
const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
const gauss = () => (rnd() + rnd() + rnd() + rnd() - 2) / 2;
const cssColor = (name) => {
  const c = new THREE.Color(getComputedStyle(document.documentElement).getPropertyValue(name).trim() || '#fff');
  return [c.r, c.g, c.b];
};

export const LAYERS = 3;

/* imgUrl: the cut-out portrait, or null to start from a phone outline
   instead (phoneBox() returns that phone's size in CSS pixels). */
export async function createField(host, canvas, imgUrl, phoneBox) {
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true }); } catch { return null; }
  const small = Math.min(window.innerWidth, window.innerHeight) < 700;
  const N = small ? 26000 : 46000;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(dpr);
  renderer.setClearColor(0x000000, 0);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.z = 10;
  const H = 2 * 10 * Math.tan((50 * Math.PI) / 360);
  let W = H;

  const img = new Image();
  if (imgUrl) {
    img.src = imgUrl;
    try { await img.decode(); } catch { return null; }
  }
  const ar = imgUrl ? img.naturalWidth / img.naturalHeight : 1;
  const GH = small ? 230 : 300, GW = Math.round(GH * ar);
  const cv = document.createElement('canvas');
  cv.width = GW; cv.height = GH;
  const cx = cv.getContext('2d', { willReadFrequently: true });
  if (imgUrl) cx.drawImage(img, 0, 0, GW, GH);
  const data = cx.getImageData(0, 0, GW, GH).data;
  const pix = [];
  for (let y = 0; y < GH; y++) for (let x = 0; x < GW; x++) {
    const i = (y * GW + x) * 4;
    if (data[i + 3] < 128) continue;
    pix.push(x / GW, y / GH, data[i] / 255, data[i + 1] / 255, data[i + 2] / 255);
  }
  const PN = pix.length / 5;
  seed = 19;
  const order = new Uint32Array(PN);
  for (let i = 0; i < PN; i++) order[i] = i;
  for (let i = PN - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); const t = order[i]; order[i] = order[j]; order[j] = t; }

  const rand = new Float32Array(N * 4);
  seed = 11;
  for (let i = 0; i < N * 4; i++) rand[i] = rnd();
  const fine = (small ? 1.5 : 1.8) * dpr;
  const blank = () => ({ pos: new Float32Array(N * 3), col: new Float32Array(N * 3), tag: new Float32Array(N).fill(-1), size: fine });
  const put = (s, i, x, y, z, c, tag = -1) => {
    s.pos[i * 3] = x; s.pos[i * 3 + 1] = y; s.pos[i * 3 + 2] = z;
    s.col[i * 3] = c[0]; s.col[i * 3 + 1] = c[1]; s.col[i * 3 + 2] = c[2];
    s.tag[i] = tag;
  };

  const shapes = {};
  const anchors = { layers: [] };
  const box = { h: 1 }; // portrait height in world units

  function build() {
    const FG = cssColor('--fg'), ACC = cssColor('--accent');
    const DIM = FG.map((v, k) => v * 0.55 + cssColor('--bg')[k] * 0.45);

    seed = 3;
    const dust = blank();
    for (let i = 0; i < N; i++) {
      const a = rnd() * Math.PI * 2, r = Math.pow(rnd(), 0.5) * Math.min(W, H) * 0.46;
      put(dust, i, Math.cos(a) * r, Math.sin(a) * r, (rnd() - 0.5) * 4, rand[i * 4 + 3] < 0.12 ? ACC : DIM);
    }
    shapes.dust = dust;

    // portrait: fits the element, every kept pixel covered before any repeats
    // sized to sit inside the element, which is smaller than the canvas
    const ph = Math.min(H * 0.76, (W * 0.66) / ar), pw = ph * ar;
    box.h = ph;
    seed = 23;
    const por = blank();
    for (let i = 0; PN && i < N; i++) {
      const k = order[i % PN] * 5;
      const jx = ((rnd() - 0.5) * 0.7) / GW, jy = ((rnd() - 0.5) * 0.7) / GH;
      put(por, i, (pix[k] + jx - 0.5) * pw, -(pix[k + 1] + jy - 0.5) * ph, 0, [pix[k + 2], pix[k + 3], pix[k + 4]]);
    }
    por.size = Math.max(fine, ((ph / H) * canvas.clientHeight / GH) * 2.3 * dpr);
    if (PN) shapes.portrait = por;

    // phone: an outline the size of the real phone on the page, so the
    // particles appear to lift off it
    if (phoneBox) {
      seed = 29;
      const b = phoneBox();
      const fw = ((b.w || 290) / (canvas.clientWidth || 300)) * W, fh = ((b.h || 590) / (canvas.clientHeight || 300)) * H;
      const rad = fw * 0.16;
      const phone = blank();
      for (let i = 0; i < N; i++) {
        let x, y;
        if (rnd() < 0.45) {                       // rounded frame
          const t = rnd() * 4, side = Math.floor(t), u = (t - side) * 2 - 1;
          x = side % 2 ? (side === 1 ? 1 : -1) * fw / 2 : u * (fw / 2 - rad);
          y = side % 2 ? u * (fh / 2 - rad) : (side === 0 ? 1 : -1) * fh / 2;
          if (rnd() < 0.2) { const a = rnd() * Math.PI * 2; x = Math.sign(Math.cos(a)) * (fw / 2 - rad) + Math.cos(a) * rad; y = Math.sign(Math.sin(a)) * (fh / 2 - rad) + Math.sin(a) * rad; }
          put(phone, i, x + gauss() * 0.01, y + gauss() * 0.01, 0, FG);
        } else {                                  // screen
          put(phone, i, (rnd() - 0.5) * (fw - rad * 0.8), (rnd() - 0.5) * (fh - rad * 0.8), 0, rnd() < 0.15 ? ACC : DIM);
        }
      }
      shapes.phone = phone;
    }

    // the stack: three isometric layers, joined by thin risers
    seed = 7;
    const st = blank();
    const a = Math.min(W * 0.27, H * 0.27);      // half-width of a layer
    const ox = -W * 0.2;                         // sits left, leaving room for the labels
    const gap = a * 0.62;
    const iso = (u, v, lvl) => [ox + (u - v) * a * 0.72, (u + v) * a * 0.36 + (1 - lvl) * gap - gap * 0.1, (u + v) * -0.4];
    anchors.layers = [];
    for (let l = 0; l < LAYERS; l++) { const p = iso(1, -1, l); anchors.layers.push({ x: p[0], y: p[1] }); }
    for (let i = 0; i < N; i++) {
      const l = Math.floor(rnd() * LAYERS);
      const pick = rnd();
      let u, v, c = l === 0 ? ACC : FG;
      if (pick < 0.34) {                          // crisp outline
        const e = Math.floor(rnd() * 4), t = rnd() * 2 - 1;
        [u, v] = e === 0 ? [t, -1] : e === 1 ? [t, 1] : e === 2 ? [-1, t] : [1, t];
        u += gauss() * 0.012; v += gauss() * 0.012;
      } else if (pick < 0.86) {                   // dotted surface grid
        const g = 11;
        u = (Math.floor(rnd() * (g + 1)) / g) * 2 - 1 + gauss() * 0.012;
        v = (Math.floor(rnd() * (g + 1)) / g) * 2 - 1 + gauss() * 0.012;
        c = l === 0 ? ACC : DIM;
      } else {                                    // risers between layers
        if (l === LAYERS - 1) { u = rnd() * 2 - 1; v = rnd() * 2 - 1; c = DIM; }
        else {
          const cnr = Math.floor(rnd() * 4);
          u = cnr % 2 ? 1 : -1; v = cnr < 2 ? 1 : -1;
          const p = iso(u, v, l), t = rnd();
          put(st, i, p[0] + gauss() * 0.01, p[1] - t * gap, p[2], DIM, l);
          continue;
        }
      }
      const p = iso(u, v, l);
      put(st, i, p[0], p[1], p[2], c, l);
    }
    shapes.stack = st;
  }

  const geo = new THREE.BufferGeometry();
  const attr = (name, size, arr) => {
    const b = new THREE.BufferAttribute(arr || new Float32Array(N * size), size);
    b.setUsage(THREE.DynamicDrawUsage);
    geo.setAttribute(name, b);
    return b;
  };
  attr('position', 3);
  const aFrom = attr('aFrom', 3), aTo = attr('aTo', 3), aColFrom = attr('aColFrom', 3), aColTo = attr('aColTo', 3), aTagTo = attr('aTagTo', 1);
  attr('aRand', 4, rand);
  geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e3);
  const uniforms = {
    uMix: { value: 0 }, uTime: { value: 0 }, uSizeFrom: { value: fine }, uSizeTo: { value: fine }, uHi: { value: -1 },
    uMouse: { value: new THREE.Vector2(99, 99) }, uReveal: { value: 0 }, uFade: { value: 1 },
  };
  const points = new THREE.Points(geo, new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms, transparent: true, depthTest: false, depthWrite: false }));
  points.frustumCulled = false;
  scene.add(points);

  let curFrom = '', curTo = '';
  const load = (from, to) => {
    if (from !== curFrom) { aFrom.array.set(shapes[from].pos); aColFrom.array.set(shapes[from].col); aFrom.needsUpdate = aColFrom.needsUpdate = true; uniforms.uSizeFrom.value = shapes[from].size; curFrom = from; }
    if (to !== curTo) { aTo.array.set(shapes[to].pos); aColTo.array.set(shapes[to].col); aTagTo.array.set(shapes[to].tag); aTo.needsUpdate = aColTo.needsUpdate = aTagTo.needsUpdate = true; uniforms.uSizeTo.value = shapes[to].size; curTo = to; }
  };
  const layoutFns = [];
  const size = () => {
    const w = canvas.clientWidth || 300, h = canvas.clientHeight || 300;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    W = H * camera.aspect;
    build();
    const f = curFrom || 'dust', t = curTo || (shapes.portrait ? 'portrait' : 'phone');
    curFrom = curTo = '';
    load(f, t);
    layoutFns.forEach((fn) => fn());
  };
  size();
  const ro = new ResizeObserver(() => size());
  ro.observe(canvas);
  // theme switch: the stack takes the page's colours
  const mo = new MutationObserver(() => size());
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  const target = new THREE.Vector2(99, 99);
  const onMove = (e) => {
    const r = canvas.getBoundingClientRect();
    const inside = e.clientX > r.left && e.clientX < r.right && e.clientY > r.top && e.clientY < r.bottom;
    if (inside) target.set(((e.clientX - r.left) / r.width - 0.5) * W, -((e.clientY - r.top) / r.height - 0.5) * H);
    else target.set(99, 99);
  };
  if (!small) window.addEventListener('pointermove', onMove, { passive: true });

  let raf = 0, running = true, visible = true;
  const t0 = performance.now();
  const tick = () => {
    raf = 0;
    if (!running || !visible) return;
    uniforms.uTime.value = (performance.now() - t0) / 1000;
    const m = uniforms.uMouse.value;
    if (target.x > 50) m.set(99, 99); else if (m.x > 50) m.copy(target); else m.lerp(target, 0.12);
    renderer.render(scene, camera);
    raf = requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !raf) tick(); });
  io.observe(canvas);
  tick();

  return {
    anchors,
    setMorph(from, to, mix) { load(from, to); uniforms.uMix.value = mix; },
    highlight(tag) { uniforms.uHi.value = tag; },
    fade(a) { uniforms.uFade.value = a; },
    setReveal(v) { uniforms.uReveal.value = v; },
    /* portrait height as a fraction of the element, for the photo overlay */
    portraitHeight: () => box.h / H,
    toLocal: (p) => ({ left: (p.x / W + 0.5) * canvas.clientWidth, top: (0.5 - p.y / H) * canvas.clientHeight }),
    onLayout(fn) { layoutFns.push(fn); fn(); },
    destroy() { running = false; cancelAnimationFrame(raf); ro.disconnect(); mo.disconnect(); io.disconnect(); window.removeEventListener('pointermove', onMove); renderer.dispose(); geo.dispose(); },
  };
}
