import PageHeader from '../components/PageHeader';
import { Section, Prose, Note } from '../components/Layout';
import TokenTable from '../components/TokenTable';
import CodeBlock from '../components/CodeBlock';
import ScaledViewport from '../components/ScaledViewport';
import Stage from '@/components/Stage';
import ReadRoom from '@/components/ReadRoom';
import { TopLinks, PlayTag } from '@/components/atoms';

const SERIF = '"Newsreader", Georgia, serif';
const THEME = {
  '--paper': '#FAF6EC',
  '--ink': '#15131F',
  '--indigo': '#28289C',
  '--gold': '#86632C',
  '--label': '#56566E',
  '--seg-thumb': '#28289C',
  '--seg-on': '#FAF6EC',
  '--play-bg': '#FAF6EC',
  fontFamily: SERIF,
};

const CONFIG_COLS = [
  { key: 'key', label: 'Setting', mono: true },
  { key: 'value', label: 'Value', mono: true },
  { key: 'note', label: 'Note', muted: true },
];
const CONFIG = [
  { key: 'transition', value: 'flip', note: '3D rotateY room swap' },
  { key: 'canvasMode', value: 'lines', note: 'three.js scene' },
  { key: 'canvasColors', value: '{ a:#28289C, b:#86632C }', note: 'indigo + gold points' },
  { key: 'fontFamily', value: 'Newsreader, Georgia, serif', note: 'serif editorial voice' },
  { key: '--seg-thumb', value: '#28289C', note: 'indigo toggle thumb' },
  { key: '--play-bg', value: '#FAF6EC', note: 'light Play room' },
];

const SNIPPET = `// App.jsx — the Manuscript page is just Stage + theme.
const theme = {
  '--paper': '#FAF6EC', '--ink': '#15131F', '--indigo': '#28289C',
  '--gold': '#86632C', '--label': '#56566E',
  '--seg-thumb': '#28289C', '--seg-on': '#FAF6EC', '--play-bg': '#FAF6EC',
  fontFamily: '"Newsreader", Georgia, serif',
};

<Stage
  theme={theme}
  transition="flip"
  canvasMode="lines"
  canvasColors={{ a: '#28289C', b: '#86632C' }}
  wordmark={<span>Lai‑Jing Chu</span>}
  topRight={<TopLinks />}
  playRoom={<PlayTag />}
  read={<ReadRoom />}
/>;`;

export default function ManuscriptPage() {
  return (
    <article>
      <PageHeader
        eyebrow="Pages"
        title="Manuscript"
        lede="The realized page — every foundation and component composed into the shipping landing page. Manuscript is the serif-editorial direction: a literary Read room and a flip transition into the Play canvas."
      />

      <Section title="Live page">
        <Prose>
          The realized landing page at its true 1280×800 viewport, scaled to fit — interactive: toggle
          Read / Play to run the flip.
        </Prose>
        <ScaledViewport width={1280} height={800} interactive label="Interactive">
          <Stage
            theme={THEME}
            transition="flip"
            canvasMode="lines"
            canvasColors={{ a: '#28289C', b: '#86632C' }}
            wordmark={<span style={{ fontFamily: SERIF, fontSize: 23, letterSpacing: '-.01em', color: 'var(--ink)' }}>Lai‑Jing&nbsp;Chu</span>}
            topRight={<TopLinks />}
            playRoom={<PlayTag />}
            read={<ReadRoom />}
          />
        </ScaledViewport>
      </Section>

      <Section title="States · both rooms">
        <Prose>The two room states, rendered statically for reference and capture.</Prose>
        <div className="ds-frame-grid">
          {['read', 'play'].map((m) => (
            <ScaledViewport key={m} width={1280} height={800} label={m === 'read' ? 'Read room' : 'Play room'}>
              <Stage
                initialMode={m}
                theme={THEME}
                transition="flip"
                canvasMode="lines"
                canvasColors={{ a: '#28289C', b: '#86632C' }}
                wordmark={<span style={{ fontFamily: SERIF, fontSize: 23, letterSpacing: '-.01em', color: 'var(--ink)' }}>Lai‑Jing&nbsp;Chu</span>}
                topRight={<TopLinks />}
                playRoom={<PlayTag />}
                read={<ReadRoom />}
              />
            </ScaledViewport>
          ))}
        </div>
        <Note>
          Opens full-screen at <a className="lj-link" href={`${import.meta.env.BASE_URL}index.html`}>/index.html</a>. This docs
          site lives alongside it at <code>/docs/</code> — neither touches the other.
        </Note>
      </Section>

      <Section title="Direction config">
        <Prose>What makes this page “Manuscript” rather than one of the sibling directions.</Prose>
        <TokenTable columns={CONFIG_COLS} rows={CONFIG} />
      </Section>

      <Section title="Composition">
        <Prose>
          The page is a single <a className="lj-link" href="#/templates/stage">Stage</a> with a themed
          object and four slots — there is no other page-level code.
        </Prose>
        <CodeBlock code={SNIPPET} />
      </Section>
    </article>
  );
}
