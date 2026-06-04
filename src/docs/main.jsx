import React from 'react';
import ReactDOM from 'react-dom/client';
import DocsApp from './DocsApp';
import '../index.css'; // brand tokens + .lj-* so real component specimens render true
import './docs.css'; // .ds-* documentation chrome

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DocsApp />
  </React.StrictMode>
);
