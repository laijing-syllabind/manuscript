// Numbered anatomy callouts. `items`: [{ label, desc }].
export default function Anatomy({ items }) {
  return (
    <div className="ds-anatomy">
      {items.map((it, i) => (
        <div className="ds-anatomy-row" key={i}>
          <div className="ds-anatomy-num">{i + 1}</div>
          <div>
            <div className="ds-anatomy-label">{it.label}</div>
            <div className="ds-anatomy-desc">{it.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
