import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { Section, Prose, Note } from '../components/Layout';
import Specimen from '../components/Specimen';
import StatesGrid from '../components/StatesGrid';
import PropsTable from '../components/PropsTable';
import Anatomy from '../components/Anatomy';
import CodeBlock from '../components/CodeBlock';
import Toggle from '@/components/Toggle';

const noop = () => {};

const STATES = [
  { label: 'Read selected', cond: 'mode="read"', demo: <Toggle mode="read" setMode={noop} /> },
  { label: 'Play selected', cond: 'mode="play" · thumb right', demo: <Toggle mode="play" setMode={noop} /> },
  { label: 'Focus', cond: ':focus-visible', demo: <span className="ds-force-ring"><Toggle mode="read" setMode={noop} /></span> },
];

const ANATOMY = [
  { label: 'Segment track', desc: '1.5px ink border, fully-rounded (999px) container.' },
  { label: 'Sliding thumb', desc: 'Indigo (--seg-thumb) fill that translates 100% over .42s on mode change.' },
  { label: 'Read / Play tabs', desc: 'role="tab" buttons; the active one flips to paper text (--seg-on), weight 600.' },
];

const PROPS = [
  { prop: 'mode', type: "'read' | 'play'", def: '—', desc: 'Which tab is active (controlled).' },
  { prop: 'setMode', type: '(mode) => void', def: '—', desc: 'Called with the next mode on click.' },
];

const SNIPPET = `import { useState } from 'react';
import Toggle from '@/components/Toggle';

const [mode, setMode] = useState('read');
<Toggle mode={mode} setMode={setMode} />`;

// Interactive specimen — click to slide the thumb.
function Live() {
  const [mode, setMode] = useState('read');
  return (
    <Specimen center>
      <Toggle mode={mode} setMode={setMode} />
    </Specimen>
  );
}

export default function TogglePage() {
  return (
    <article>
      <PageHeader
        eyebrow="Molecules"
        title="Toggle"
        lede="The Read / Play segmented control that drives the whole stage. A sliding indigo thumb animates between two role=tab buttons. Fully themed through CSS variables (--seg-thumb, --seg-on)."
      />

      <Section title="Live">
        <Live />
        <Prose>Click to slide the thumb; the active label flips to paper. The states below are static.</Prose>
      </Section>

      <Section title="States">
        <StatesGrid states={STATES} />
        <Note>
          Keyboard focus draws a <code>2px indigo</code> outline on the focused tab
          (<code>:focus-visible</code>). The thumb position is the “selected” state, driven entirely by{' '}
          <code>data-mode</code> on the track.
        </Note>
      </Section>

      <Section title="Anatomy">
        <Anatomy items={ANATOMY} />
      </Section>

      <Section title="Props">
        <PropsTable rows={PROPS} />
      </Section>

      <Section title="Code">
        <CodeBlock code={SNIPPET} />
        <Note>
          In the real page you rarely render <code>Toggle</code> directly — <code>Stage</code> owns the{' '}
          <code>mode</code> state and renders it for you. See <a className="lj-link" href="#/templates/stage">Stage</a>.
        </Note>
      </Section>
    </article>
  );
}
