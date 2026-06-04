// States matrix. `states`: [{ label, cond?, demo, dark? }].
// `demo` is the real component pinned into the given state; `cond` names the
// trigger (e.g. ':hover', 'disabled') so transient looks are legible at rest.
// `wide` → one full-width column per state (for wide molecules that would
// otherwise overflow the narrow grid cells).
export default function StatesGrid({ states, wide }) {
  return (
    <div className={`ds-states${wide ? ' is-wide' : ''}`}>
      {states.map((s, i) => (
        <div className={`ds-state-cell${s.dark ? ' is-dark' : ''}`} key={i}>
          <div className="ds-state-demo">{s.demo}</div>
          <div className="ds-state-label">
            {s.label}
            {s.cond && <span className="ds-state-cond">{s.cond}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
