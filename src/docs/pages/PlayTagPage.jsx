import PageHeader from '../components/PageHeader';
import { Section, Prose } from '../components/Layout';
import PropsTable from '../components/PropsTable';
import CodeBlock from '../components/CodeBlock';
import { PlayTag } from '@/components/atoms';

const PROPS = [
  { prop: 'light', type: 'boolean', def: 'false', desc: 'Tint labels paper-translucent for the dark Play canvas.' },
];

const SNIPPET = `import { PlayTag } from '@/components/atoms';

// Overlaid on the canvas via Stage's playRoom slot
<Stage playRoom={<PlayTag />} … />

// On a dark canvas
<PlayTag light />`;

// PlayTag is absolutely positioned, so it needs a positioned host box.
function Frame({ dark, children }) {
  return (
    <div
      style={{
        position: 'relative',
        height: 150,
        borderRadius: 10,
        border: '1.5px solid var(--ink)',
        overflow: 'hidden',
        background: dark ? 'var(--navy)' : 'var(--paper)',
      }}
    >
      {children}
    </div>
  );
}

export default function PlayTagPage() {
  return (
    <article>
      <PageHeader
        eyebrow="Molecules"
        title="PlayTag"
        lede="The two corner captions overlaid on the Play canvas — a bottom-left scaffold note and a top-right ‘creative-coding exercise’ tag. Mono, uppercase, .14em tracking. Positioned absolutely into the room's corners."
      />

      <Section title="On paper (default)">
        <div style={{ marginTop: 18 }}>
          <Frame>
            <PlayTag />
          </Frame>
        </div>
      </Section>

      <Section title="On dark (light)">
        <Prose>The <code>light</code> prop switches the labels to translucent paper for the dark canvas.</Prose>
        <Frame dark>
          <PlayTag light />
        </Frame>
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
