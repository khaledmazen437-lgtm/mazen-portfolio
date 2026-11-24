import { motion, type PanInfo } from 'framer-motion';
import { useState, useRef } from 'react';
import type { Project } from '../data/projects';
import { useDesktopStore } from '../store/useDesktopStore';

type Props = {
  project: Project;
  staggerIndex: number;
  reduced: boolean;
};

export function DesktopIcon({ project, staggerIndex, reduced }: Props) {
  const iconPositions = useDesktopStore((s) => s.iconPositions);
  const setIconPosition = useDesktopStore((s) => s.setIconPosition);
  const openWindow = useDesktopStore((s) => s.openWindow);

  const [selected, setSelected] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const moved = useRef(false);
  const size = project.size ?? 78;

  const stored = iconPositions[project.id];
  const screenW = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const screenH = typeof window !== 'undefined' ? window.innerHeight : 800;
  const initX = stored?.x ?? (project.position.x / 100) * screenW;
  const initY = stored?.y ?? (project.position.y / 100) * (screenH - 28);

  const delay = staggerIndex * 0.03;

  function onOpen() {
    if (project.id === 'production-apps') {
      openWindow({
        id: 'sys-production',
        title: 'Mazen Khaled — Production Web Applications',
        contentType: 'production',
        minimized: false,
        maximized: false,
      });
      setSelected(false);
      return;
    }
    if (project.id === 'resume-cv') {
      openWindow({
        id: 'sys-resume',
        title: 'Mazen Khaled — Resume (CV)',
        contentType: 'resume',
        minimized: false,
        maximized: false,
      });
      setSelected(false);
      return;
    }
    openWindow({
      id: `project-${project.id}`,
      title: project.title,
      projectId: project.id,
      contentType: 'project',
      minimized: false,
      maximized: false,
    });
    setSelected(false);
  }

  function onDragStart(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    setIsDragging(true);
    moved.current = false;
    dragStart.current = { x: info.point.x, y: info.point.y };
  }

  function onDrag(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    if (!dragStart.current) return;
    const dist = Math.hypot(info.point.x - dragStart.current.x, info.point.y - dragStart.current.y);
    if (dist > 6) moved.current = true;
  }

  function onDragEnd(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    setIsDragging(false);
    if (!moved.current) return;
    const newX = Math.max(0, Math.min(info.point.x - size / 2, screenW - size));
    const newY = Math.max(28, Math.min(info.point.y - size / 2, screenH - 120));
    setIconPosition(project.id, { x: newX, y: newY });
  }

  function onClick() {
    if (moved.current) return;
    onOpen();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpen();
    }
  }

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDragStart={onDragStart as (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void}
      onDrag={onDrag as (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void}
      onDragEnd={onDragEnd as (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void}
      dragConstraints={{
        left: 0,
        top: 28,
        right: Math.max(0, screenW - size),
        bottom: Math.max(28, screenH - 120),
      }}
      initial={reduced ? { opacity: 1, scale: 1 } : { scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={
        reduced
          ? { duration: 0 }
          : { delay, type: 'spring', stiffness: 380, damping: 22, mass: 0.8 }
      }
      style={{
        position: 'absolute',
        left: initX,
        top: initY,
        width: size,
        cursor: isDragging ? 'grabbing' : 'pointer',
        zIndex: isDragging ? 300 : 10,
        willChange: isDragging ? 'transform' : 'auto',
      }}
      whileHover={!isDragging ? { scale: 1.08, y: -4 } : {}}
      whileDrag={{ scale: 1.12 }}
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`${project.title}. Click to open.`}
      aria-pressed={selected}
      className="flex flex-col items-center gap-1.5 focus:outline-none group"
    >
      <div
        className="relative overflow-hidden rounded-xl border border-white/60 bg-white shadow-lg transition-shadow duration-200 group-hover:shadow-xl"
        style={{
          width: size,
          height: size,
          boxShadow: isDragging
            ? '0 12px 30px rgba(0,0,0,0.45)'
            : '0 4px 14px rgba(0,0,0,0.22)',
        }}
      >
        <img
          src={project.cover}
          alt={project.title}
          width={size}
          height={size}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          draggable={false}
        />
        {selected && (
          <div
            className="absolute inset-0 rounded-xl bg-blue-500/25 border-2 border-blue-400"
            aria-hidden="true"
          />
        )}
      </div>

      <div
        className="text-center px-1 py-0.5 rounded"
        style={{
          background: selected ? 'rgba(66,120,255,0.3)' : 'transparent',
          maxWidth: 140,
        }}
      >
        <span
          className="block text-white font-black uppercase leading-tight"
          style={{
            fontSize: 13,
            letterSpacing: '0.02em',
            textShadow: '0 1px 3px rgba(0,0,0,0.7), 0 0 8px rgba(0,0,0,0.3)',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          } as React.CSSProperties}
        >
          {project.title}
        </span>
      </div>
    </motion.div>
  );
}
