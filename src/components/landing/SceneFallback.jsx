import React from 'react'

// Dessin statique affiché pendant le chargement de la scène, ou si WebGL manque.
export function SceneFallback() {
  return (
    <div className="story-fallback" aria-hidden="true">
      <svg viewBox="0 0 200 160" width="56%" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M100 18 L22 138 L178 138 Z" strokeDasharray="1 5" strokeLinecap="round" />
        <circle cx="100" cy="18" r="4" fill="#e5484d" stroke="none" />
        <circle cx="22" cy="138" r="4" fill="#e5484d" stroke="none" />
        <circle cx="178" cy="138" r="4" fill="#e5484d" stroke="none" />
      </svg>
    </div>
  )
}

export class SceneBoundary extends React.Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    return this.state.failed ? <SceneFallback /> : this.props.children
  }
}
