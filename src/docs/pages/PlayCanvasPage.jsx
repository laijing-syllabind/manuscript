import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { Section, Prose, Note } from '../components/Layout';
import PropsTable from '../components/PropsTable';
import CodeBlock from '../components/CodeBlock';
import PlayCanvas from '@/components/PlayCanvas';

const MODES = ['bubble', 'field', 'network', 'wave', 'grid'];

const PROPS = [
  { prop: 'active', type: 'boolean', def: 'true', desc: 'Run the loop only while the Play room shows. In bubble mode this also gates the one-time piano-sample download (lazy, on first activation — never on page load).' },
  { prop: 'mode', type: "'bubble' | 'field' | 'network' | 'wave' | 'grid'", def: "'field'", desc: "Which scene to render. 'bubble' is the real JazzBubble exercise; the rest are the generative point-cloud scaffold." },
  { prop: 'colors', type: '{ a, b }', def: "{ a:'#28289c', b:'#86632c' }", desc: 'Two brand hex colors — tint the point cloud (scaffold modes) or the grid center/line (bubble).' },
];

const SNIPPET = `import PlayCanvas from '@/components/PlayCanvas';

<PlayCanvas
  active={mode === 'play'}
  mode="bubble"           // 'bubble' (JazzBubble) | 'field' | 'network' | 'wave' | 'grid'
  colors={{ a: '#28289C', b: '#86632C' }}
/>`;

// Interactive specimen — switch scene mode / pause the loop.
function Live() {
  const [mode, setMode] = useState('field');
  const [active, setActive] = useState(true);
  return (
    <div>
      <div style={{ position: 'relative', marginTop: 18, height: 320, border: '1.5px solid var(--ink)', borderRadius: 12, overflow: 'hidden', background: 'var(--navy)' }}>
        {/* remount on mode change so the scene rebuilds */}
        <PlayCanvas key={mode} active={active} mode={mode} colors={{ a: '#6f6fe0', b: '#caa45a' }} />
      </div>
      <div className="ds-controls">
        <div className="ds-control">
          <span className="ds-control-label">mode</span>
          <div className="ds-seg">
            {MODES.map((m) => (
              <button key={m} className={mode === m ? 'is-on' : ''} onClick={() => setMode(m)} type="button">
                {m}
              </button>
            ))}
          </div>
        </div>
        <div className="ds-control">
          <span className="ds-control-label">active</span>
          <div className="ds-seg">
            {[true, false].map((a) => (
              <button key={String(a)} className={active === a ? 'is-on' : ''} onClick={() => setActive(a)} type="button">
                {a ? 'true' : 'false'}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PlayCanvasPage() {
  return (
    <article>
      <PageHeader
        eyebrow="Organisms"
        title="Play Canvas"
        lede="The three.js surface that fills the Play room. The landing page runs mode='bubble' — JazzBubble, a glass blob that plays a Dm-pentatonic scale across a grid over an animated FlowingGradient backdrop, with a live Tweakpane mixer (top-right, while active) and a keycap legend. The four point-cloud modes are the original generative scaffold, kept as a lightweight reference. Runs only while active."
      />

      <Section title="Live">
        <Live />
        <Prose>Switch <code>mode</code> to rebuild the scene; flip <code>active</code> to pause. The static modes below are for reference.</Prose>
      </Section>

      <Section title="Modes">
        <Prose>
          <code>bubble</code> — the JazzBubble exercise (glass blob + grid + piano); shown here as a
          single static frame, fully interactive in the live page. The four scaffold modes, each a
          static frame: <code>field</code> — drifting point field · <code>network</code> — points with
          thin links between near neighbors · <code>wave</code> — a sine displacement on Y ·{' '}
          <code>grid</code> — a 9×9×9 lattice. In the live page the scaffold modes rotate slowly on Y.
        </Prose>
        <div className="ds-frame-grid">
          {MODES.map((m) => (
            <div className="ds-frame" key={m}>
              <div style={{ position: 'relative', height: 220, overflow: 'hidden', background: 'var(--navy)' }}>
                <PlayCanvas active={false} mode={m} colors={{ a: '#6f6fe0', b: '#caa45a' }} />
              </div>
              <div className="ds-frame-cap">
                <span>mode</span>
                <code>{m}</code>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="States">
        <Note>
          <strong>active</strong> gates the render loop; when false (or off the Play room) it paints a
          single static frame. In <code>bubble</code> mode it also gates audio: the piano samples are
          fetched only the first time the room becomes active (never on page load), and the
          AudioContext resumes on the first click/keypress inside the room. Under{' '}
          <code>prefers-reduced-motion: reduce</code> the scaffold never animates (first paint only),
          and JazzBubble drops its idle auto-rotation. Both scenes dispose their geometry/material/
          renderer (and JazzBubble its shader + listeners) on unmount. If WebGL is unavailable or
          blocked (hardware acceleration off, GPU blocklisted, headless), it logs a warning and renders
          a fallback rather than throwing — the Play room must never blank the page.
        </Note>
      </Section>

      <Section title="Props">
        <PropsTable rows={PROPS} />
      </Section>

      <Section title="Code">
        <CodeBlock code={SNIPPET} />
      </Section>
    </article>
  );
}
