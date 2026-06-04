import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { Section, Prose, Note } from '../components/Layout';
import TokenTable from '../components/TokenTable';
import CodeBlock from '../components/CodeBlock';

const MONO = '"Space Mono", monospace';

const EASE_COLS = [
  { key: 'name', label: 'Token' },
  { key: 'value', label: 'Value', mono: true },
  { key: 'usage', label: 'Usage', muted: true },
];
const EASING = [
  { name: 'Standard ease-out', value: 'cubic-bezier(.66,0,.2,1)', usage: 'Every room + toggle motion — snappy out' },
  { name: 'Linear', value: 'linear', usage: 'Marquee scroll' },
];
const DURATIONS = [
  { name: 'Micro', value: '.15s', usage: 'Link / pill color + background' },
  { name: 'Text swap', value: '.3s', usage: 'Toggle active-label color' },
  { name: 'Thumb', value: '.42s', usage: 'Toggle sliding thumb' },
  { name: 'Room opacity', value: '.5s', usage: 'Room cross-fade' },
  { name: 'Room transform', value: '.62s', usage: 'Default room transition' },
  { name: 'Flip', value: '.64s', usage: 'Flip rotateY (opacity hard-swaps at .32s)' },
  { name: 'Clip / iris', value: '.66s', usage: 'Iris clip-path wipe' },
];

const TR_COLS = [
  { key: 'name', label: 'transition', mono: true },
  { key: 'mech', label: 'Mechanic', muted: true },
];
const TR_ROWS = [
  { name: 'flip', mech: 'Rooms sit back-to-back in 3D; rotateY 180° swaps them, opacity hard-cuts at the 90° midpoint. (Manuscript default.)' },
  { name: 'iris', mech: 'Play room revealed by a circular clip-path expanding from top-center (0% → 160%).' },
  { name: 'cover', mech: 'Play room slides up from below — translateY 101% → 0.' },
  { name: 'dissolve', mech: 'Play room cross-fades in with a slight scale (1.04 → 1) as the Read room fades out.' },
];

const TRANSITIONS = ['flip', 'iris', 'cover', 'dissolve'];

// Interactive replay demo reusing the real .lj-rooms / .lj-room CSS.
function MiniRooms({ tr }) {
  const [mode, setMode] = useState('read');
  return (
    <div className="ds-frame">
      <div className="lj-rooms" data-tr={tr} data-mode={mode} style={{ position: 'relative', height: 150 }}>
        <section className="lj-room read" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: '"Newsreader", serif', fontSize: 24 }}>Read</span>
        </section>
        <section
          className="lj-room play"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--indigo)', color: 'var(--paper)' }}
        >
          <span style={{ fontFamily: MONO, fontSize: 14, letterSpacing: '.14em', textTransform: 'uppercase' }}>Play</span>
        </section>
      </div>
      <div className="ds-frame-cap">
        <code>{tr}</code>
        <button
          type="button"
          onClick={() => setMode((m) => (m === 'read' ? 'play' : 'read'))}
          style={{ cursor: 'pointer', border: '1.4px solid var(--ink)', borderRadius: 999, background: 'transparent', fontFamily: MONO, fontSize: 11, padding: '4px 12px', color: 'var(--ink)' }}
        >
          Replay →
        </button>
      </div>
    </div>
  );
}

// Static endpoint frame reusing the real .lj-rooms / .lj-room CSS. data-mode is
// fixed (no transition runs) so each frame shows a resting end-state, flat.
function RoomEnd({ mode }) {
  return (
    <div className="ds-frame">
      <div className="lj-rooms" data-tr="dissolve" data-mode={mode} style={{ position: 'relative', height: 160 }}>
        <section className="lj-room read" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: '"Newsreader", serif', fontSize: 26 }}>Read</span>
        </section>
        <section
          className="lj-room play"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--indigo)', color: 'var(--paper)' }}
        >
          <span style={{ fontFamily: MONO, fontSize: 14, letterSpacing: '.14em', textTransform: 'uppercase' }}>Play</span>
        </section>
      </div>
      <div className="ds-frame-cap">
        <span>{mode === 'read' ? 'Read room' : 'Play room'}</span>
        <code>data-mode="{mode}"</code>
      </div>
    </div>
  );
}

const SNIPPET = `/* index.css — the standard easing + a transition */
.lj-room {
  transition:
    transform .62s cubic-bezier(.66, 0, .2, 1),
    opacity   .5s  ease,
    clip-path .66s ease;
}
.lj-rooms[data-tr="iris"] .play { clip-path: circle(0% at 50% 0%); }
.lj-rooms[data-tr="iris"][data-mode="play"] .play { clip-path: circle(160% at 50% 0%); }`;

export default function Motion() {
  return (
    <article>
      <PageHeader
        eyebrow="Foundations"
        title="Motion"
        lede="One easing curve governs everything — a fast-out cubic-bezier — paired with a tight set of durations. The signature gesture is the room transition: four interchangeable ways the Play room takes over the Read room."
      />

      <Section title="Easing">
        <TokenTable columns={EASE_COLS} rows={EASING} />
      </Section>

      <Section title="Durations">
        <TokenTable columns={EASE_COLS} rows={DURATIONS} />
      </Section>

      <Section title="Room transitions">
        <Prose>
          One shell, four interchangeable transitions — set via <code>transition</code> on{' '}
          <code>Stage</code>. Hit <em>Replay</em> on any to watch it; Manuscript ships <code>flip</code>.
        </Prose>
        <div className="ds-frame-label">Replay (interactive)</div>
        <div className="ds-frame-grid">
          {TRANSITIONS.map((tr) => (
            <MiniRooms key={tr} tr={tr} />
          ))}
        </div>
        <div className="ds-frame-label">End-states (static — the motion happens between these)</div>
        <div className="ds-frame-grid">
          <RoomEnd mode="read" />
          <RoomEnd mode="play" />
        </div>
        <div className="ds-frame-label">The four mechanics</div>
        <TokenTable columns={TR_COLS} rows={TR_ROWS} />
        <CodeBlock lang="css" code={SNIPPET} />
      </Section>

      <Section title="Marquee">
        <Prose>
          A single keyframe, <code>lj-marq</code>, translates content <code>-50%</code> over 30s linear,
          looping — used by the Marquee/Index directions for scrolling testimonials.
        </Prose>
      </Section>

      <Section title="Reduced motion">
        <Note>
          Under <code>prefers-reduced-motion: reduce</code>, room transforms collapse to a plain{' '}
          <code>.25s</code> opacity fade, the marquee animation stops, and <code>PlayCanvas</code> paints
          a single static frame instead of animating. Honor this when adding new motion.
        </Note>
      </Section>
    </article>
  );
}
