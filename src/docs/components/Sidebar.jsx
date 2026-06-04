import { NAV } from '../routes';

// Grouped left nav. Active link is derived from the current hash route.
export default function Sidebar({ current }) {
  return (
    <aside className="ds-sidebar">
      <a className="ds-brand" href="#/">
        <div className="ds-brand-name">Manuscript</div>
        <div className="ds-brand-sub">Design System</div>
      </a>

      {NAV.map((group) => (
        <nav className="ds-nav-group" key={group.title}>
          <div className="ds-nav-group-title">{group.title}</div>
          {group.items.map((item) => (
            <a
              key={item.path}
              href={`#/${item.path}`}
              className={`ds-nav-link${current === item.path ? ' is-active' : ''}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      ))}

      <div className="ds-sidebar-foot">
        Serif editorial · 3D flip
        <br />
        <a href="./index.html">↗ View the live page</a>
      </div>
    </aside>
  );
}
