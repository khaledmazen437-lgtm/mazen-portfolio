# Mazen Khaled — Portfolio

My personal desktop-style portfolio built with React, TypeScript, Tailwind CSS, and Framer Motion. It emulates a macOS environment with draggable desktop icons, floating windows, traffic-light controls, a magnifying dock, and an interactive mobile grid.

## Getting Started

Make sure you have Node.js 18+ installed.

```bash
# Install packages
npm install

# Run development server
npm run dev

# Run type check
npm run lint

# Build production bundle
npm run build
```

The dev server will run locally at `http://localhost:5173`.

## Adding or Editing Projects

All project data lives in `src/data/projects.ts`.

To add a project, append an object to the `projects` array:

```ts
{
  id: 'my-project-slug',
  title: 'PROJECT TITLE',
  cover: '/projects/cover.jpg',
  position: { x: 50, y: 50 }, // desktop coordinate in %
  size: 90,
  year: '2026',
  language: 'TypeScript / React',
  category: 'Web App',
  description: 'What the project does and the problems it solves.',
  link: 'https://github.com/khaledmazen437-lgtm/repo',
  demoLink: 'https://example.com/demo',
  media: [
    { type: 'image', src: '/projects/screenshot1.jpg', alt: 'Screenshot 1' },
    { type: 'image', src: '/projects/screenshot2.jpg', alt: 'Screenshot 2' },
  ],
}
```

Static media (images, videos, PDF resume) go in the `public/` directory.

## Live Production Links

The live applications deployed on `mhdteck.store`:
- Dalil Study Platform: `https://mhdteck.store/dalil/`
- MHD Fashion Store: `https://mhdteck.store/store/store.php`
- MHD Agency Portal: `https://mhdteck.store/mhd/index.php`

## License

MIT
