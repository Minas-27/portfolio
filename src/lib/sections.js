/* Navigation map: order, index, shortcut key. Labels point at real
   sections; the words inside those sections live in data/content.js. */
export const NAV = [
  { id: 'projects', label: 'Work', key: 'W' },
  { id: 'about', label: 'About', key: 'A' },
  { id: 'services', label: 'Services', key: 'S' },
  { id: 'experience', label: 'Experience', key: 'E' },
  { id: 'certifications', label: 'Recognition', key: 'R' },
  { id: 'contact', label: 'Contact', key: 'C' },
].map((item, i) => ({ ...item, n: i + 1, index: String(i + 1).padStart(2, '0') }));

export const navFor = (id) => NAV.find((n) => n.id === id);
