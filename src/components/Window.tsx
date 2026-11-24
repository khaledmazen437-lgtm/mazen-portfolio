import { motion, useDragControls, type PanInfo } from 'framer-motion';
import { useId } from 'react';
import { useDesktopStore, type WindowState } from '../store/useDesktopStore';
import { ProjectView } from './ProjectView';

type Props = {
  win: WindowState;
  zIndex: number;
  isFocused: boolean;
  onFocus: () => void;
  onClose: () => void;
  reduced: boolean;
};

export function Window({ win, zIndex, isFocused, onFocus, onClose, reduced }: Props) {
  const minimizeWindow = useDesktopStore((s) => s.minimizeWindow);
  const maximizeWindow = useDesktopStore((s) => s.maximizeWindow);
  const moveWindow = useDesktopStore((s) => s.moveWindow);
  const dragControls = useDragControls();
  const dialogId = useId();

  if (win.minimized) return null;

  const isClient = typeof window !== 'undefined';
  const isMobile = isClient && window.innerWidth < 768;
  const isMax = win.maximized;
  const winWidth = isMobile ? window.innerWidth - 16 : Math.min(680, (isClient ? window.innerWidth : 1200) - 32);

  const windowStyle = isMax
    ? { left: 0, top: 28, width: '100vw', height: 'calc(100vh - 28px)', borderRadius: 0 }
    : isMobile
    ? { left: 8, top: 34, width: 'calc(100vw - 16px)', height: 'calc(100vh - 84px)', borderRadius: 14 }
    : { left: win.position.x, top: win.position.y, width: winWidth, minHeight: 440, maxHeight: 'calc(100vh - 80px)', borderRadius: 12 };

  return (
    <motion.div
      key={win.id}
      role="dialog"
      aria-modal="true"
      aria-label={win.title}
      aria-labelledby={`${dialogId}-title`}
      style={{
        position: 'fixed',
        zIndex,
        ...windowStyle,
        overflow: 'hidden',
        boxShadow: isFocused
          ? '0 32px 80px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.15)'
          : '0 12px 40px rgba(0,0,0,0.2)',
      }}
      initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.88 }}
      transition={{ type: 'spring', stiffness: 380, damping: 30, mass: 0.6 }}
      drag={!isMax && !isMobile}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragConstraints={
        isClient
          ? {
              left: 0,
              top: 28,
              right: Math.max(0, window.innerWidth - winWidth),
              bottom: Math.max(28, window.innerHeight - 120),
            }
          : undefined
      }
      onDragEnd={(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const newPos = {
          x: Math.max(0, Math.min(win.position.x + info.offset.x, window.innerWidth - winWidth)),
          y: Math.max(28, Math.min(win.position.y + info.offset.y, window.innerHeight - 120)),
        };
        moveWindow(win.id, newPos);
      }}
      onMouseDown={onFocus}
      className="flex flex-col"
    >
      <div
        className="flex items-center gap-2 px-3 select-none shrink-0"
        style={{
          height: 36,
          background: isFocused ? 'rgba(236,236,236,0.95)' : 'rgba(236,236,236,0.7)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(0,0,0,0.08)',
          cursor: isMax || isMobile ? 'default' : 'move',
        }}
        onPointerDown={(e) => {
          if (!isMax && !isMobile) dragControls.start(e);
        }}
      >
        <div className="flex items-center gap-1.5" role="group" aria-label="Window controls">
          <TrafficButton
            color="#ff5f57"
            hoverColor="#ff3b30"
            label="Close"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          />
          <TrafficButton
            color="#febc2e"
            hoverColor="#ff9f0a"
            label="Minimize"
            onClick={(e) => {
              e.stopPropagation();
              minimizeWindow(win.id);
            }}
          />
          <TrafficButton
            color="#28c840"
            hoverColor="#32d74b"
            label="Maximize"
            onClick={(e) => {
              e.stopPropagation();
              maximizeWindow(win.id);
            }}
          />
        </div>

        <span
          id={`${dialogId}-title`}
          className="flex-1 text-center text-xs font-semibold text-neutral-600 tracking-wide truncate pr-14"
        >
          {win.title}
        </span>
      </div>

      <div
        className="flex-1 overflow-y-auto window-scroll"
        style={{ background: 'rgba(250,250,250,0.97)' }}
      >
        <ProjectView win={win} />
      </div>
    </motion.div>
  );
}

type TrafficProps = {
  color: string;
  hoverColor: string;
  label: string;
  onClick: (e: React.MouseEvent) => void;
};

function TrafficButton({ color, hoverColor, label, onClick }: TrafficProps) {
  return (
    <button
      className="w-3 h-3 rounded-full flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-blue-500 transition-colors"
      style={{ background: color }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = hoverColor;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = color;
      }}
      onClick={onClick}
      aria-label={label}
      title={label}
    />
  );
}
