/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0a0f1e',
        ink: '#0f172a',
        body: '#1e293b',
        muted: '#64748b',
        blue: '#2563eb',
        'blue-d': '#1d4ed8',
        'blue-l': '#dbeafe',
        green: '#059669',
        amber: '#d97706',
        red: '#dc2626',
        purple: '#7c3aed',
        teal: '#0d9488',
        gold: '#f59e0b',
        rule: '#e2e8f0',
        card: '#f8fafc',
        stripe: '#f1f5f9',
      },
      fontFamily: {
        sans: ['Segoe UI', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        r: '14px',
        'r-sm': '8px',
      },
      boxShadow: {
        card: '0 4px 24px #0f172a14',
        'card-lg': '0 12px 48px #0f172a24',
        'modal': '0 24px 64px #0000004d',
      },
    },
  },
  plugins: [],
}