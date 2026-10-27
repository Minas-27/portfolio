const KEY = 'aa-theme';
const COLOR = { dark: '#0b0b0a', light: '#f7f6f3' };

export function currentTheme() {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

export function applyTheme(theme) {
  const next = theme === 'light' ? 'light' : 'dark';
  if (next === 'light') document.documentElement.dataset.theme = 'light';
  else delete document.documentElement.dataset.theme;
  document.documentElement.style.colorScheme = next;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', COLOR[next]);
  try { localStorage.setItem(KEY, next); } catch { /* private mode */ }
  return next;
}
