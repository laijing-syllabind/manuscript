// Generic doc table. `columns`: [{ key, label, mono, muted }]. `rows`: objects
// keyed by column key; a cell value may be a string or JSX. Null → em dash.
function cell(val, col) {
  if (val == null || val === '') return <span className="ds-muted">—</span>;
  if (col.mono) return <code>{val}</code>;
  if (col.muted) return <span className="ds-muted">{val}</span>;
  return val;
}

export default function Table({ columns, rows }) {
  return (
    <div className="ds-table-wrap">
      <table className="ds-table">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {columns.map((c) => (
                <td key={c.key}>{cell(row[c.key], c)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
