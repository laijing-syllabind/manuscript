// Small content-scaffolding helpers shared by every doc page.

export function Section({ title, children }) {
  return (
    <section className="ds-section">
      {title && <h2 className="ds-h2">{title}</h2>}
      {children}
    </section>
  );
}

export function H3({ children }) {
  return <h3 className="ds-h3">{children}</h3>;
}

export function Prose({ children }) {
  return <p className="ds-prose">{children}</p>;
}

export function Note({ children }) {
  return <div className="ds-note">{children}</div>;
}
