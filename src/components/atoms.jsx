import { LJ } from '@/data/lj';
import { Button } from '@/components/ui/button';

const MONO = '"Space Mono", ui-monospace, monospace';

export function Eyebrow({ children, gold }) {
  return (
    <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: gold ? 'var(--gold)' : 'var(--label)' }}>
      {children}
    </div>
  );
}

export function TopLinks({ font = MONO, light }) {
  const [med, lin, em, syl] = LJ.links;
  const lcol = light ? 'rgba(250,246,236,.78)' : undefined;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      {[med, lin, em].map(([n, u]) => (
        <a key={n} href={u} target="_blank" rel="noreferrer" className="lj-link" style={{ fontFamily: font, fontSize: 12.5, color: lcol }}>{n}</a>
      ))}
      <a href={`${import.meta.env.BASE_URL}docs.html`} className="lj-link" style={{ fontFamily: font, fontSize: 12.5, color: lcol }}>Design system</a>
      <Button asChild variant="gold" size="sm">
        <a href={syl[1]} target="_blank" rel="noreferrer" style={{ fontFamily: font }}>Syllabind ↗</a>
      </Button>
    </div>
  );
}

export function Links() {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {LJ.links.map(([n, u]) =>
        n === 'Syllabind' ? (
          <Button key={n} asChild variant="gold" size="sm"><a href={u} target="_blank" rel="noreferrer" style={{ fontFamily: MONO }}>Syllabind ↗</a></Button>
        ) : (
          <Button key={n} asChild variant="outline" size="sm"><a href={u} target="_blank" rel="noreferrer" style={{ fontFamily: MONO }}>{n}</a></Button>
        )
      )}
    </div>
  );
}

export function PlayTag({ light }) {
  const col = light ? 'rgba(250,246,236,.6)' : 'var(--label)';
  return (
    <>
      <div style={{ position: 'absolute', left: 26, bottom: 22, fontFamily: MONO, fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: col }}>
        JazzBubble · play the grid
      </div>
      <div style={{ position: 'absolute', right: 26, top: 22, fontFamily: MONO, fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: col }}>
        ✦ creative-coding exercise
      </div>
    </>
  );
}
