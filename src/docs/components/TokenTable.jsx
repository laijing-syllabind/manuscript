import Table from './Table';

// Token reference table. Default columns suit color/spacing/motion tokens;
// pass `columns` to override for a different shape.
const DEFAULT_COLS = [
  { key: 'name', label: 'Token' },
  { key: 'cssVar', label: 'CSS var', mono: true },
  { key: 'tw', label: 'Tailwind', mono: true },
  { key: 'value', label: 'Value', mono: true },
  { key: 'usage', label: 'Usage', muted: true },
];

export default function TokenTable({ rows, columns = DEFAULT_COLS }) {
  return <Table columns={columns} rows={rows} />;
}
