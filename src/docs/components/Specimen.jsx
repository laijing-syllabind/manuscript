// Framed live-demo surface. `bg`: 'checker' (default) | 'plain' | 'dark'.
// `bar`: optional caption row under the stage.
export default function Specimen({ children, bg = 'checker', center, block, bar }) {
  const cls = ['ds-specimen-stage'];
  if (bg === 'plain') cls.push('is-plain');
  if (bg === 'dark') cls.push('is-dark');
  if (center) cls.push('is-center');
  if (block) cls.push('is-block');
  return (
    <div className="ds-specimen">
      <div className={cls.join(' ')}>{children}</div>
      {bar && <div className="ds-specimen-bar">{bar}</div>}
    </div>
  );
}
