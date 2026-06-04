/* No-build preview bundle — Manuscript. Mirrors the src/ build, in one
   global-scope file (React + three.js from CDN). The real project lives in src/. */
const { useState, useEffect, useRef } = React;

const LJ = {
  lede: 'Product designer and PM with 7 years in tech and a decade in architecture + education. I’ve shipped across 3D/spatial tech, design systems, and growth.',
  syllabind: 'Now I’m building Syllabind — a vehicle to bring joy and curiosity back to learning in the AI age. Not frantic catch-up: timeless knowledge over hype, vetted sources, a clear linear path, and a real human community.',
  now: 'Reimagining product & design education for the AI age.',
  quotes: [
    ['One of the most technically capable designers I’ve worked with — design precision, curiosity and technical capability that’s rare.', 'Nick Woods', 'Head of Product · Polycam'],
  ],
  links: [
    ['Medium', 'https://laijingchu.medium.com'],
    ['LinkedIn', 'https://www.linkedin.com/in/laijingchu'],
    ['Email', 'mailto:laijing.chu@gmail.com'],
    ['Syllabind', 'https://www.syllabind.com'],
  ],
};
const SERIF = '"Newsreader", Georgia, serif';
const MONO = '"Space Mono", ui-monospace, monospace';

function Eyebrow({ children, gold }) {
  return <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: gold ? 'var(--gold)' : 'var(--label)' }}>{children}</div>;
}
function TopLinks() {
  const [med, lin, em, syl] = LJ.links;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      {[med, lin, em].map(([n, u]) => <a key={n} href={u} target="_blank" rel="noreferrer" className="lj-link" style={{ fontFamily: MONO, fontSize: 12.5 }}>{n}</a>)}
      <a href={syl[1]} target="_blank" rel="noreferrer" className="lj-pill gold">Syllabind ↗</a>
    </div>
  );
}
function Links() {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {LJ.links.map(([n, u]) => <a key={n} href={u} target="_blank" rel="noreferrer" className={'lj-pill' + (n === 'Syllabind' ? ' gold' : '')}>{n === 'Syllabind' ? 'Syllabind ↗' : n}</a>)}
    </div>
  );
}
function PlayTag() {
  return (
    <>
      <div style={{ position: 'absolute', left: 26, bottom: 22, fontFamily: MONO, fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--label)' }}>Play · three.js scaffold — replace with your sketch</div>
      <div style={{ position: 'absolute', right: 26, top: 22, fontFamily: MONO, fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--label)' }}>✦ creative-coding exercise</div>
    </>
  );
}

function PlayCanvas({ active, mode = 'field', colors }) {
  const mountRef = useRef(null);
  useEffect(() => {
    const el = mountRef.current; if (!el || !window.THREE) return;
    const THREE = window.THREE;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(58, 1, 0.1, 200);
    camera.position.z = 16;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    renderer.domElement.style.cssText = 'width:100%;height:100%;display:block';
    el.appendChild(renderer.domElement);

    const COUNT = 460;
    const positions = new Float32Array(COUNT * 3);
    const colorAttr = new Float32Array(COUNT * 3);
    const cA = new THREE.Color(colors.a), cB = new THREE.Color(colors.b);
    const span = 24;
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * span;
      positions[i * 3 + 1] = (Math.random() - 0.5) * span * 0.6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * span * 0.5;
      const c = Math.random() < 0.2 ? cB : cA;
      colorAttr[i * 3] = c.r; colorAttr[i * 3 + 1] = c.g; colorAttr[i * 3 + 2] = c.b;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colorAttr, 3));
    const mat = new THREE.PointsMaterial({ size: 0.18, vertexColors: true, transparent: true, opacity: 0.92, sizeAttenuation: true });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    function resize() {
      const r = el.getBoundingClientRect();
      const w = Math.max(1, r.width), h = Math.max(1, r.height);
      renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
    }
    const ro = new ResizeObserver(resize); ro.observe(el); resize();

    let raf = 0, t = 0;
    function frame() { t += 0.006; points.rotation.y = t * 0.22; points.rotation.x = Math.sin(t * 0.3) * 0.12; renderer.render(scene, camera); raf = requestAnimationFrame(frame); }
    renderer.render(scene, camera);
    if (active && !reduce) frame();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); geo.dispose(); mat.dispose(); renderer.dispose(); if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement); };
  }, [active, mode, colors.a, colors.b]);
  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
}

function Toggle({ mode, setMode }) {
  return (
    <div className="lj-seg" data-mode={mode} role="tablist">
      <span className="lj-thumb" aria-hidden="true" />
      <button className="read" onClick={() => setMode('read')}>Read</button>
      <button className="play" onClick={() => setMode('play')}>Play</button>
    </div>
  );
}

function ReadRoom() {
  const q0 = LJ.quotes[0];
  return (
    <div style={{ height: '100%', boxSizing: 'border-box', padding: '44px 50px 36px', display: 'grid', gridTemplateColumns: '1.55fr 1fr', gap: 48 }}>
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Eyebrow gold>Product designer &amp; PM · 7 years</Eyebrow>
        <h1 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 76, lineHeight: 0.96, letterSpacing: '-.022em', margin: '16px 0 0', color: 'var(--ink)' }}>Hi, I’m <span style={{ fontStyle: 'italic' }}>LJ</span>.</h1>
        <p style={{ fontFamily: SERIF, fontSize: 21, lineHeight: 1.5, maxWidth: '32ch', margin: '24px 0 0', color: '#29263a' }}>{LJ.lede}</p>
        <p style={{ fontFamily: SERIF, fontSize: 16.5, lineHeight: 1.6, maxWidth: '44ch', margin: '16px 0 0', color: 'var(--label)' }}>{LJ.syllabind}</p>
        <div style={{ marginTop: 'auto', paddingTop: 22 }}><Links /></div>
      </div>
      <div style={{ borderLeft: '1.5px solid var(--gold)', paddingLeft: 30, display: 'flex', flexDirection: 'column' }}>
        <Eyebrow>In their words</Eyebrow>
        <blockquote style={{ margin: '16px 0 0', fontFamily: SERIF, fontStyle: 'italic', fontSize: 22, lineHeight: 1.4, color: 'var(--ink)' }}>“{q0[0]}”</blockquote>
        <div style={{ marginTop: 12, fontFamily: MONO, fontSize: 11.5, letterSpacing: '.04em', color: 'var(--label)' }}>{q0[1]} · {q0[2]}</div>
        <div style={{ marginTop: 'auto', paddingTop: 22 }}>
          <Eyebrow gold>Now</Eyebrow>
          <p style={{ fontFamily: SERIF, fontSize: 18, lineHeight: 1.45, margin: '8px 0 0', color: 'var(--ink)' }}>{LJ.now}</p>
        </div>
      </div>
    </div>
  );
}

function Stage() {
  const [mode, setMode] = useState('read');
  const theme = { '--paper': '#FAF6EC', '--ink': '#15131F', '--indigo': '#28289C', '--gold': '#86632C', '--label': '#56566E', '--seg-thumb': '#28289C', '--seg-on': '#FAF6EC', '--play-bg': '#FAF6EC', fontFamily: SERIF };
  return (
    <div className="lj-stage" style={theme}>
      <header className="lj-top">
        <div className="lj-wordmark"><span style={{ fontFamily: SERIF, fontSize: 23, letterSpacing: '-.01em', color: 'var(--ink)' }}>Lai‑Jing&nbsp;Chu</span></div>
        <div className="lj-topright"><Toggle mode={mode} setMode={setMode} /><TopLinks /></div>
      </header>
      <div className="lj-rooms" data-tr="flip" data-mode={mode}>
        <section className="lj-room read"><ReadRoom /></section>
        <section className="lj-room play"><PlayCanvas active={mode === 'play'} mode="field" colors={{ a: '#28289C', b: '#86632C' }} /><PlayTag /></section>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Stage />);
