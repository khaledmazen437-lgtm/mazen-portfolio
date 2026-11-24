import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { useRef } from 'react';
import { DockItem } from './DockItem';
import { dockApps } from '../data/dock';
import { useDesktopStore } from '../store/useDesktopStore';
import { useReducedMotion } from '../hooks/useIsMobile';

type Props = {
  compact?: boolean;
};

export function Dock({ compact = false }: Props) {
  const reduced = useReducedMotion();
  const openWindow = useDesktopStore((s) => s.openWindow);
  const setTrashOpen = useDesktopStore((s) => s.setTrashOpen);
  const mouseX = useMotionValue(Infinity);
  const dockRef = useRef<HTMLDivElement>(null);

  const mobileIds = ['finder', 'production', 'cv', 'linkedin', 'github', 'mail', 'instagram'];
  const apps = compact ? dockApps.filter((a) => mobileIds.includes(a.id)) : dockApps;

  function onAction(id: string) {
    const app = dockApps.find((a) => a.id === id);
    if (!app) return;
    const { action } = app;
    if (action.type === 'link') {
      window.open(action.href, '_blank', 'noopener,noreferrer');
    } else if (action.type === 'window') {
      openWindow({
        id: `sys-${action.target}`,
        title: getTitle(action.target),
        contentType: action.target as 'about' | 'services' | 'tools' | 'gallery' | 'resume' | 'production',
        minimized: false,
        maximized: false,
      });
    } else if (action.type === 'easter-egg') {
      setTrashOpen(true);
      setTimeout(() => setTrashOpen(false), 3500);
    }
  }

  return (
    <motion.div
      ref={dockRef}
      onMouseMove={(e) => {
        if (!dockRef.current || compact) return;
        const rect = dockRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
      }}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={
        compact
          ? 'flex items-end gap-2 px-2.5 py-1.5 rounded-[18px] border border-white/50 max-w-[calc(100vw-16px)] overflow-x-auto no-scrollbar shadow-2xl backdrop-blur-xl'
          : 'flex items-end gap-[14px] px-3 py-2 rounded-[22px] border border-white/40 shadow-2xl backdrop-blur-xl'
      }
      style={{
        background: 'rgba(255,255,255,0.65)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
      role="toolbar"
      aria-label="Application Dock"
    >
      {apps.map((app, idx) => (
        <DockItem
          key={app.id}
          app={app}
          mouseX={mouseX}
          dockRef={dockRef}
          reduced={reduced}
          compact={compact}
          onActivate={() => onAction(app.id)}
          index={idx}
        />
      ))}
    </motion.div>
  );
}

export function TrashToast() {
  const trashOpen = useDesktopStore((s) => s.trashOpen);
  return (
    <AnimatePresence>
      {trashOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="fixed bottom-28 left-1/2 -translate-x-1/2 z-[600]
                     bg-white/95 backdrop-blur-xl rounded-2xl px-5 py-3
                     shadow-2xl border border-white/60 text-sm font-semibold text-neutral-800"
          role="alert"
        >
          Trash is empty. Your workspace is spotless.
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function getTitle(target: string): string {
  const titles: Record<string, string> = {
    about: 'About Mazen Khaled',
    services: 'Services & Solutions',
    tools: 'Skills & Tech Stack',
    gallery: 'Project Gallery',
    resume: 'Resume (CV)',
    production: 'Production Apps (Live)',
  };
  return titles[target] ?? target;
}
