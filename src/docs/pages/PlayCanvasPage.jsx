import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { Section, Prose, Note } from '../components/Layout';
import PropsTable from '../components/PropsTable';
import CodeBlock from '../components/CodeBlock';
import PlayCanvas from '@/components/PlayCanvas';

const MODES = ['field', 'network', 'wave', 'grid'];

const PROPS = [
  { prop: 'active', type: 'boolean', def: 'true', desc: 'Run the animation loop only when the Play room is showing.' },
  { prop: 'mode', type: "'field' | 'network' | 'wave' | 'grid'", def: "'field'", desc: 'Which generative scene to render.' },
  { prop: 'colors', type: '{ a, b }', def: "{ a:'#28289c', b:'#86632c' }", desc: 'Two hex colors tinting the point cloud.' },
];

const SNIPPET = `import PlayCanvas from '@/components/PlayCanvas';

<PlayCanvas
  active={mode === 'play'}
  mode="lines"            // 'field' | 'network' | 'wave' | 'grid'
  colors={{ a: '#28289C', b: '#86632C' }}
/>`;

// Interactive specimen — switch scene mode / pause the loop.
function Live() {
  const [mode, setMode] = useState('field');
  const [active, setActive] = useState(true);
  return (
    <div>
      <div style={{ marginTop: 18, height: 320, border: '1.5px solid var(--ink)', borderRadius: 12, overflow: 'hidden', background: 'var(--navy)' }}>
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
        lede="The three.js generative scaffold that fills the Play room — a drifting, brand-tinted point cloud. An honest placeholder meant to be replaced with a real creative-coding sketch. Four scene modes; runs only while active."
      />

      <Section title="Live">
        <Live />
        <Prose>Switch <code>mode</code> to rebuild the scene; flip <code>active</code> to pause. The static modes below are for reference.</Prose>
      </Section>

      <Section title="Modes">
        <Prose>
          The four scene modes, each painted as a single static frame: <code>field</code> — drifting
          point field · <code>network</code> — points with thin links between near neighbors ·{' '}
          <code>wave</code> — a sine displacement on Y · <code>grid</code> — a 9×9×9 lattice. In the live
          page all rotate slowly on Y.
        </Prose>
        <div className="ds-frame-grid">
          {MODES.map((m) => (
            <div className="ds-frame" key={m}>
              <div style={{ height: 220, background: 'var(--navy)' }}>
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
          <strong>active</strong> gates the <code>requestAnimationFrame</code> loop; when false (or off
          the Play room) it paints a single static frame. Under{' '}
          <code>prefers-reduced-motion: reduce</code> it never animates — first paint only. The scene
          disposes its geometry/material on unmount.
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
