import React from 'react';

/**
 * ErrorBoundary — last line of defense against a single component
 * (e.g. the three.js PlayCanvas) taking down the entire page.
 *
 * React unmounts the whole root when a render/lifecycle error goes
 * uncaught, which renders a blank page. This catches that error and
 * shows a minimal, on-brand fallback instead.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('Caught by ErrorBoundary:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        this.props.fallback ?? (
          <div
            role="alert"
            style={{
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 24,
              fontFamily: '"Newsreader", Georgia, serif',
              color: '#15131f',
              background: '#faf6ec',
              textAlign: 'center',
            }}
          >
            <div>
              <p style={{ fontSize: 20, margin: 0 }}>Something went wrong loading this page.</p>
              <p style={{ fontSize: 15, opacity: 0.7, marginTop: 8 }}>Please refresh to try again.</p>
            </div>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
