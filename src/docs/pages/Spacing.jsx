import PageHeader from '../components/PageHeader';
import { Section, Prose, Note } from '../components/Layout';
import TokenTable from '../components/TokenTable';
import Specimen from '../components/Specimen';

const SCALE = [48, 44, 36, 30, 22, 18, 16, 14, 12, 8, 6];

const RADIUS_COLS = [
  { key: 'name', label: 'Token' },
  { key: 'tw', label: 'Tailwind', mono: true },
  { key: 'value', label: 'Value', mono: true },
  { key: 'usage', label: 'Usage', muted: true },
];
const RADII = [
  { name: 'sm', tw: 'rounded-sm', value: '0.25rem', usage: 'Rare — small insets' },
  { name: 'md', tw: 'rounded-md', value: '0.375rem', usage: 'Default control radius' },
  { name: 'lg', tw: 'rounded-lg', value: '0.5rem', usage: 'Cards / larger surfaces' },
  { name: 'pill', tw: 'rounded-full', value: '999px', usage: 'Buttons, badges, toggle, pills' },
];

const BORDER_COLS = [
  { key: 'weight', label: 'Weight', mono: true },
  { key: 'where', label: 'Applied to', muted: true },
];
const BORDERS = [
  { weight: '1.5px solid ink', where: 'Top bar, toggle, outline buttons, room dividers' },
  { weight: '1.4px solid ink', where: 'Pills (.lj-pill)' },
  { weight: '1.5px solid gold', where: 'ReadRoom editorial rule (left border)' },
];

const LAYOUT_COLS = [
  { key: 'name', label: 'Token' },
  { key: 'value', label: 'Value', mono: true },
  { key: 'usage', label: 'Usage', muted: true },
];
const LAYOUT = [
  { name: 'Hero grid', value: '1.55fr 1fr', usage: 'ReadRoom two-column split' },
  { name: 'Column gap', value: '48px', usage: 'Between hero columns' },
  { name: 'Room padding', value: '44px 50px 36px', usage: 'ReadRoom inset' },
  { name: 'Top bar padding', value: '18px 30px', usage: 'Stage header' },
  { name: 'Heading measure', value: '32ch', usage: 'Lede max-width' },
  { name: 'Body measure', value: '44ch', usage: 'Paragraph max-width' },
];

export default function Spacing() {
  return (
    <article>
      <PageHeader
        eyebrow="Foundations"
        title="Spacing & Layout"
        lede="Spacing is an editorial rhythm, not a strict 4/8 grid — a recurring set of px values used for padding and gaps. Layout is a single asymmetric two-column hero, with reading measures kept tight for legibility."
      />

      <Section title="Spacing scale">
        <Prose>The px values that recur across padding and gap declarations.</Prose>
        <Specimen bg="plain" block>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, flexWrap: 'wrap' }}>
            {SCALE.map((n) => (
              <div key={n} style={{ textAlign: 'center' }}>
                <div style={{ width: n, height: n, background: 'var(--indigo)', borderRadius: 3 }} />
                <div style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, color: 'var(--label)', marginTop: 6 }}>
                  {n}
                </div>
              </div>
            ))}
          </div>
        </Specimen>
      </Section>

      <Section title="Layout tokens">
        <TokenTable columns={LAYOUT_COLS} rows={LAYOUT} />
        <Note>
          The hero is deliberately asymmetric (<code>1.55fr 1fr</code>): a wide content column and a
          narrower testimonial rail divided by a gold rule.
        </Note>
      </Section>

      <Section title="Radius">
        <Prose>
          Controls are fully rounded (<code>999px</code> pills); the sm/md/lg ramp exists for
          larger surfaces.
        </Prose>
        <TokenTable columns={RADIUS_COLS} rows={RADII} />
        <Specimen>
          {RADII.map((r) => (
            <div key={r.name} style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: 72,
                  height: 56,
                  background: 'var(--paper)',
                  border: '1.5px solid var(--ink)',
                  borderRadius: r.value,
                }}
              />
              <div style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, color: 'var(--label)', marginTop: 6 }}>
                {r.name}
              </div>
            </div>
          ))}
        </Specimen>
      </Section>

      <Section title="Borders">
        <Prose>
          The system has <strong>no shadows</strong> — depth and separation come entirely from hairline
          borders.
        </Prose>
        <TokenTable columns={BORDER_COLS} rows={BORDERS} />
      </Section>
    </article>
  );
}
