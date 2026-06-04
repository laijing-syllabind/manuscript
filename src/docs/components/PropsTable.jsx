import Table from './Table';

const COLS = [
  { key: 'prop', label: 'Prop', mono: true },
  { key: 'type', label: 'Type', mono: true },
  { key: 'def', label: 'Default', mono: true },
  { key: 'desc', label: 'Description', muted: true },
];

export default function PropsTable({ rows }) {
  return <Table columns={COLS} rows={rows} />;
}
