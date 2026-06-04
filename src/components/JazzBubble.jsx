import { useEffect, useRef, useState } from 'react';
import { createShader } from 'shaders/js';
import { initThreeScene } from '@/lib/jazzbubble/scene';
import { makeConfig } from '@/lib/jazzbubble/config';
import { preloadSamples } from '@/lib/jazzbubble/piano';
import { setupMixer, loadSettings } from '@/lib/jazzbubble/mixer';

/**
 * JazzBubble — the real creative-coding exercise that fills the Play room.
 *
 * A glass blob bounces around a 4×4 grid, playing a Dm-pentatonic scale
 * (Tone.js piano) as you steer it with the keyboard or mouse, over an animated
 * FlowingGradient background (shaders/js) used as the three.js scene backdrop.
 * The original Tweakpane "Mixer Controls" (live tuning + Export Code) and the
 * keycap help legend are both preserved.
 *
 * Props:
 *   active — run the render loop + accept input only while the Play room shows.
 *            Also gates the (heavy) one-time piano-sample download and the
 *            visibility of the mixer panel.
 *   colors — { a, b } brand palette; drives the grid center/line colors.
 */

// 4×4 keyboard legend (front row at the bottom, matching the note grid).
const KEY_ROWS = [
  { keys: [['1', '1'], ['2', '2'], ['3', '3'], ['4', '4']], note: 'row 4 notes' },
  { keys: [['q', 'Q'], ['w', 'W'], ['e', 'E'], ['r', 'R']], note: 'row 3 notes' },
  { keys: [['a', 'A'], ['s', 'S'], ['d', 'D'], ['f', 'F']], note: 'row 2 notes' },
  { keys: [['z', 'Z'], ['x', 'X'], ['c', 'C'], ['v', 'V']], note: 'row 1 notes' },
];
const ARROW_KEYS = [['ArrowUp', '↑'], ['ArrowDown', '↓'], ['ArrowLeft', '←'], ['ArrowRight', '→']];

function keyToken(e) {
  if (e.code === 'Space') return 'Space';
  if (e.key.startsWith('Arrow')) return e.key;
  return e.key.toLowerCase();
}

export default function JazzBubble({ active = true, colors = { a: '#28289C', b: '#86632C' } }) {
  const mountRef = useRef(null);
  const shaderCanvasRef = useRef(null);
  const threeCanvasRef = useRef(null);
  const activeRef = useRef(active);
  const sceneRef = useRef(null);
  const shaderRef = useRef(null);
  const mixerRef = useRef(null);

  const [status, setStatus] = useState('init'); // 'init' | 'ready' | 'unsupported'
  const [showTip, setShowTip] = useState(true);
  const [primedAudio, setPrimedAudio] = useState(false);
  const [pressed, setPressed] = useState(() => new Set());

  // Live ref so the scene's global keydown handler reads `active` without rebuilds.
  activeRef.current = active;

  // ---- Scene / shader / mixer lifecycle (mount once) ----
  useEffect(() => {
    const container = mountRef.current;
    const shaderCanvas = shaderCanvasRef.current;
    const threeCanvas = threeCanvasRef.current;
    if (!container || !shaderCanvas || !threeCanvas) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const config = makeConfig(colors);
    const defaults = makeConfig(colors); // pristine snapshot for the mixer's Reset
    loadSettings(config); // apply any persisted mixer tweaks before first paint
    let cancelled = false;

    const sizeShaderCanvas = () => {
      const r = container.getBoundingClientRect();
      return { w: Math.max(1, Math.round(r.width)), h: Math.max(1, Math.round(r.height)) };
    };

    (async () => {
      let shader;
      try {
        // observeElement:false — we drive resize/pause/resume ourselves so the
        // shader's own observers don't fight the Play-room active gating.
        shader = await createShader(
          shaderCanvas,
          { components: [{ type: 'FlowingGradient', id: 'bg_gradient', props: config.gradient }] },
          { observeElement: false },
        );
      } catch (err) {
        // WebGL can be unavailable/blocked (accel off, blocklist, headless).
        // A decorative scaffold must never blank the page — bail gracefully.
        console.warn('JazzBubble: shader/WebGL unavailable, skipping the Play scene.', err);
        if (!cancelled) setStatus('unsupported');
        return;
      }
      if (cancelled) { shader.destroy(); return; }
      shaderRef.current = shader;
      const { w, h } = sizeShaderCanvas();
      shader.resize(w, h);

      let scene;
      try {
        scene = initThreeScene({
          threeCanvas,
          shaderCanvas,
          container,
          config,
          isActive: () => activeRef.current,
          reduceMotion,
        });
      } catch (err) {
        console.warn('JazzBubble: three.js scene failed to initialise.', err);
        shader.destroy();
        shaderRef.current = null;
        if (!cancelled) setStatus('unsupported');
        return;
      }
      sceneRef.current = scene;

      // Mixer — DEV ONLY. The live-tuning panel must never ship to production.
      // `import.meta.env.DEV` is statically false in `vite build`, so this block
      // (and the Tweakpane dependency it pulls) is dead-code-eliminated from the
      // published bundle — the panel is only ever visible on local `npm run dev`.
      // Gradient edits push fresh uniforms to the shader; glass/sphere/grid edits
      // are read by the scene's per-frame syncs.
      if (import.meta.env.DEV) {
        const pushGradient = () => shaderRef.current?.update('bg_gradient', config.gradient);
        const mixer = setupMixer({
          config,
          defaults,
          onGradientChange: pushGradient,
          onReloadDefaults: pushGradient,
          container, // scope the panel to this host so it stays inside bounded specimens
        });
        mixerRef.current = mixer;
        mixer.element.style.display = activeRef.current ? '' : 'none';
      }

      setStatus('ready');
      if (activeRef.current) { shader.resume(); scene.start(); }
      else { shader.pause(); }
    })();

    const ro = new ResizeObserver(() => {
      const s = shaderRef.current;
      if (!s) return;
      const { w, h } = sizeShaderCanvas();
      s.resize(w, h);
    });
    ro.observe(container);

    return () => {
      cancelled = true;
      ro.disconnect();
      if (mixerRef.current) { mixerRef.current.dispose(); mixerRef.current = null; }
      if (sceneRef.current) { sceneRef.current.dispose(); sceneRef.current = null; }
      if (shaderRef.current) { shaderRef.current.destroy(); shaderRef.current = null; }
    };
    // colors are read once at mount; the host remounts (key) if they change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- Start/stop loop + gradient, lazy audio, mixer visibility on active ----
  useEffect(() => {
    const scene = sceneRef.current;
    const shader = shaderRef.current;
    if (active && !primedAudio) {
      setPrimedAudio(true);
      preloadSamples().catch((e) => console.warn('JazzBubble: piano samples failed to load.', e));
    }
    if (mixerRef.current) mixerRef.current.element.style.display = active ? '' : 'none';
    if (status !== 'ready') return;
    if (active) { shader?.resume(); scene?.start(); }
    else { scene?.stop(); shader?.pause(); }
  }, [active, status, primedAudio]);

  // ---- Live keycap highlighting (only while the Play room shows) ----
  useEffect(() => {
    function down(e) {
      if (!activeRef.current) return;
      const t = keyToken(e);
      setPressed((p) => (p.has(t) ? p : new Set(p).add(t)));
    }
    function up(e) {
      const t = keyToken(e);
      setPressed((p) => { if (!p.has(t)) return p; const n = new Set(p); n.delete(t); return n; });
    }
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, []);

  const Key = ({ token, label }) => (
    <kbd className={pressed.has(token) ? 'jb-key is-down' : 'jb-key'}>{label}</kbd>
  );

  return (
    <div ref={mountRef} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {/* Hidden gradient canvas — sampled as the three.js scene background. */}
      <canvas
        ref={shaderCanvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, pointerEvents: 'none' }}
      />
      {/* The 3D scene. */}
      <canvas
        ref={threeCanvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
      />

      {status === 'unsupported' && (
        <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', fontFamily: '"Space Mono", monospace', fontSize: 12, letterSpacing: '.08em', color: 'var(--label)' }}>
          3D unavailable in this browser
        </div>
      )}

      {status === 'ready' && showTip && (
        <div className="jb-tip">
          <button className="jb-dismiss" onClick={() => setShowTip(false)} aria-label="Dismiss">×</button>
          <p className="jb-tip-sound">🔊 Click to enable sound</p>
          <ul>
            {KEY_ROWS.map((row) => (
              <li key={row.note}>
                {row.keys.map(([token, label]) => <Key key={token} token={token} label={label} />)}
                <span className="jb-sep">—</span> {row.note}
              </li>
            ))}
            <li>
              {ARROW_KEYS.map(([token, label]) => <Key key={token} token={token} label={label} />)}
              <span className="jb-sep">—</span> move (hold to repeat)
            </li>
            <li>
              <Key token="Space" label="Space" />
              <span className="jb-sep">—</span> bounce &amp; play
            </li>
            <li>
              <span className="jb-mouse">Click grid</span>
              <span className="jb-sep">—</span> navigate to cell
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
