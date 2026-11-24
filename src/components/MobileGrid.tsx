import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import { useDesktopStore } from '../store/useDesktopStore';

/** Mobile home-screen style 3-column grid */
export function MobileGrid() {
  const openWindow = useDesktopStore((s) => s.openWindow);

  function handleOpen(id: string, title: string) {
    if (id === 'production-apps') {
      openWindow({
        id: 'sys-production',
        title: 'Mazen Khaled — Production Web Applications',
        contentType: 'production',
        minimized: false,
        maximized: false,
      });
      return;
    }
    if (id === 'resume-cv') {
      openWindow({
        id: 'sys-resume',
        title: 'Mazen Khaled — Resume (CV)',
        contentType: 'resume',
        minimized: false,
        maximized: false,
      });
      return;
    }
    openWindow({
      id: `project-${id}`,
      title,
      projectId: id,
      contentType: 'project',
      minimized: false,
      maximized: false,
    });
  }

  return (
    <div
      className="fixed inset-0 pt-9 pb-28 overflow-y-auto"
      style={{ WebkitOverflowScrolling: 'touch' }}
      role="main"
      aria-label="Projects"
    >
      <div className="grid grid-cols-3 gap-x-5 gap-y-6 px-4 py-4">
        {projects.map((project, i) => (
          <motion.button
            key={project.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.03, type: 'spring', stiffness: 320, damping: 24 }}
            onClick={() => handleOpen(project.id, project.title)}
            className="flex flex-col items-center gap-1.5 cursor-pointer
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl p-1"
            aria-label={`Open ${project.title}`}
          >
            <div
              className="w-full overflow-hidden rounded-2xl shadow-md"
              style={{ aspectRatio: '1 / 1' }}
            >
              <img
                src={project.cover}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
            <span
              className="text-white text-[10px] font-black uppercase text-center leading-tight"
              style={{
                textShadow: '0 1px 3px rgba(0,0,0,0.7)',
                letterSpacing: '0.03em',
                wordBreak: 'break-word',
              }}
            >
              {project.title}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

