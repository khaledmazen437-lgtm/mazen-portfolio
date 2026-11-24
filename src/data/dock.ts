export type DockAction =
  | { type: 'window'; target: string }
  | { type: 'link'; href: string }
  | { type: 'easter-egg' };

export type DockApp = {
  id: string;
  label: string;
  icon: string;
  action: DockAction;
};

/** Build a 60×60 SVG data URI with rounded-rect macOS icon shape */
function icon(body: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">${body}</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/* ─── macOS Dock Icons ───────────────────────────────────────── */

const finderIcon = icon(`
  <defs>
    <linearGradient id="fg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#79D2FF"/>
      <stop offset="1" stop-color="#1070E0"/>
    </linearGradient>
  </defs>
  <rect width="60" height="60" rx="14" fill="url(#fg)"/>
  <rect x="5" y="14" width="25" height="21" rx="3" fill="rgba(0,10,100,0.45)"/>
  <rect x="30" y="14" width="25" height="21" rx="3" fill="rgba(255,255,255,0.95)"/>
  <circle cx="14" cy="22" r="2.5" fill="#A8E8FF"/>
  <circle cx="22" cy="22" r="2.5" fill="#A8E8FF"/>
  <circle cx="38" cy="22" r="2.5" fill="#1055C0"/>
  <circle cx="46" cy="22" r="2.5" fill="#1055C0"/>
  <path d="M11 28 Q18 33.5 25 28" stroke="#A8E8FF" stroke-width="2.2" fill="none" stroke-linecap="round"/>
  <path d="M35 28 Q42 33.5 49 28" stroke="#1055C0" stroke-width="2.2" fill="none" stroke-linecap="round"/>
  <rect x="5" y="37" width="50" height="10" rx="2" fill="rgba(0,0,0,0.12)"/>
`);

const githubIcon = icon(`
  <rect width="60" height="60" rx="14" fill="#1B1F23"/>
  <g transform="translate(8,8) scale(1.83)">
    <path fill="white" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </g>
`);

const linkedinIcon = icon(`
  <defs>
    <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#008FD3"/>
      <stop offset="1" stop-color="#005A9E"/>
    </linearGradient>
  </defs>
  <rect width="60" height="60" rx="14" fill="url(#lg)"/>
  <g transform="translate(10,10) scale(1.66)">
    <path fill="white" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
  </g>
`);

const vscodeIcon = icon(`
  <defs>
    <linearGradient id="vg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#29B5F6"/>
      <stop offset="1" stop-color="#0366D6"/>
    </linearGradient>
  </defs>
  <rect width="60" height="60" rx="14" fill="url(#vg)"/>
  <g transform="translate(9,9) scale(1.75)">
    <path fill="white" d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"/>
  </g>
`);

const terminalIcon = icon(`
  <rect width="60" height="60" rx="14" fill="#1D1D1D"/>
  <rect x="7" y="11" width="46" height="38" rx="6" fill="#2C2C2E"/>
  <circle cx="15" cy="19" r="3.2" fill="#FF5F57"/>
  <circle cx="23" cy="19" r="3.2" fill="#FEBC2E"/>
  <circle cx="31" cy="19" r="3.2" fill="#28C840"/>
  <text x="12" y="38" font-family="Courier New,Courier,monospace" font-size="14" fill="#30D158" font-weight="bold">% _</text>
`);

const instagramIcon = icon(`
  <defs>
    <linearGradient id="ig" x1="1" y1="1" x2="0" y2="0">
      <stop offset="0"    stop-color="#F9ED32"/>
      <stop offset="0.3"  stop-color="#EE2A7B"/>
      <stop offset="0.65" stop-color="#8A3AB9"/>
      <stop offset="1"    stop-color="#4C68D7"/>
    </linearGradient>
  </defs>
  <rect width="60" height="60" rx="14" fill="url(#ig)"/>
  <rect x="11" y="11" width="38" height="38" rx="9" fill="none" stroke="white" stroke-width="3"/>
  <circle cx="30" cy="30" r="9" fill="none" stroke="white" stroke-width="3"/>
  <circle cx="41.5" cy="18.5" r="2.5" fill="white"/>
`);

const mailIcon = icon(`
  <defs>
    <linearGradient id="ml" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#5AC8F5"/>
      <stop offset="1" stop-color="#1877F2"/>
    </linearGradient>
  </defs>
  <rect width="60" height="60" rx="14" fill="url(#ml)"/>
  <rect x="7" y="16" width="46" height="30" rx="4" fill="white"/>
  <path d="M7 18 L30 33 L53 18" stroke="#1877F2" stroke-width="2.6" fill="none" stroke-linecap="round"/>
`);

const trashIcon = icon(`
  <defs>
    <linearGradient id="tr" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#D1D1D6"/>
      <stop offset="1" stop-color="#8E8E93"/>
    </linearGradient>
  </defs>
  <rect width="60" height="60" rx="14" fill="url(#tr)"/>
  <rect x="23" y="11" width="14" height="7" rx="3" fill="white"/>
  <rect x="14" y="17" width="32" height="4" rx="2" fill="white"/>
  <rect x="17" y="22" width="26" height="26" rx="5" fill="white"/>
  <rect x="23" y="27" width="3.5" height="16" rx="1.75" fill="#8E8E93"/>
  <rect x="28.25" y="27" width="3.5" height="16" rx="1.75" fill="#8E8E93"/>
  <rect x="33.5" y="27" width="3.5" height="16" rx="1.75" fill="#8E8E93"/>
`);

const cvIcon = icon(`
  <defs>
    <linearGradient id="cvi" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#FF5252"/>
      <stop offset="1" stop-color="#B71C1C"/>
    </linearGradient>
  </defs>
  <rect width="60" height="60" rx="14" fill="url(#cvi)"/>
  <rect x="13" y="9" width="34" height="42" rx="4" fill="white"/>
  <path d="M33 9 L47 23 L33 23 Z" fill="#E2E8F0"/>
  <rect x="18" y="26" width="24" height="3" rx="1.5" fill="#B71C1C"/>
  <rect x="18" y="32" width="18" height="2" rx="1" fill="#94A3B8"/>
  <rect x="18" y="37" width="24" height="2" rx="1" fill="#94A3B8"/>
  <rect x="18" y="42" width="14" height="2" rx="1" fill="#94A3B8"/>
`);

const productionAppIcon = icon(`
  <defs>
    <linearGradient id="pdg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#10B981"/>
      <stop offset="1" stop-color="#047857"/>
    </linearGradient>
  </defs>
  <rect width="60" height="60" rx="14" fill="url(#pdg)"/>
  <circle cx="30" cy="30" r="17" fill="none" stroke="white" stroke-width="2.5"/>
  <ellipse cx="30" cy="30" rx="8" ry="17" fill="none" stroke="white" stroke-width="2"/>
  <line x1="13" y1="30" x2="47" y2="30" stroke="white" stroke-width="2"/>
  <circle cx="40" cy="20" r="3.5" fill="#34D399"/>
`);

/* ─── Dock config ───────────────────────────────────────────── */

export const dockApps: DockApp[] = [
  {
    id: 'finder',
    label: 'Finder (About)',
    icon: finderIcon,
    action: { type: 'window', target: 'about' },
  },
  {
    id: 'production',
    label: 'Production Apps (Live)',
    icon: productionAppIcon,
    action: { type: 'window', target: 'production' },
  },
  {
    id: 'cv',
    label: 'Resume (CV)',
    icon: cvIcon,
    action: { type: 'window', target: 'resume' },
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    icon: linkedinIcon,
    action: {
      type: 'link',
      href: 'https://www.linkedin.com/in/mazen-khaled-00aabb375?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    },
  },
  {
    id: 'github',
    label: 'GitHub',
    icon: githubIcon,
    action: { type: 'link', href: 'https://github.com/khaledmazen437-lgtm' },
  },
  {
    id: 'mail',
    label: 'Contact (Mail)',
    icon: mailIcon,
    action: { type: 'link', href: 'mailto:khaledmazen437@gmail.com' },
  },
  {
    id: 'instagram',
    label: 'Instagram',
    icon: instagramIcon,
    action: {
      type: 'link',
      href: 'https://www.instagram.com/mazenkhaled3538?gwpx=MWFyNWo3N3VxMGx4aw==',
    },
  },
  {
    id: 'vscode',
    label: 'VS Code (Stack)',
    icon: vscodeIcon,
    action: { type: 'window', target: 'tools' },
  },
  {
    id: 'terminal',
    label: 'Terminal',
    icon: terminalIcon,
    action: { type: 'window', target: 'services' },
  },
  {
    id: 'trash',
    label: 'Trash',
    icon: trashIcon,
    action: { type: 'easter-egg' },
  },
];
