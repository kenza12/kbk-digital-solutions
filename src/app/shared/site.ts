export type Tone = 'teal' | 'sky' | 'peach' | 'plum' | 'sage' | 'sand';

export interface NavLink {
  label: string;
  route: string;
}

export const EMAIL = 'kenza-bk@live.fr';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/kenza-bazi-kabbaj-a59544102';
export const GITHUB_URL = 'https://github.com/kenza12';

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', route: '/' },
  { label: 'Services', route: '/services' },
  { label: 'About', route: '/about' },
  { label: 'Contact', route: '/contact' },
];

export const SCROLL_OFFSET: [number, number] = [0, 104];
