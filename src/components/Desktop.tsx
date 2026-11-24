import { AnimatePresence } from 'framer-motion';
import { useRef, useCallback, useEffect } from 'react';
import { useDesktopStore } from '../store/useDesktopStore';
import { MenuBar } from './MenuBar';
import { Window } from './Window';
import { DesktopIcon } from './DesktopIcon';
import { Dock, TrashToast } from './Dock';
import { projects } from '../data/projects';
import { useIsMobile, useReducedMotion } from '../hooks/useIsMobile';
import { MobileGrid } from './MobileGrid';

export function Desktop() {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();
  const windows = useDesktopStore((s) => s.windows);
  const zOrder = useDesktopStore((s) => s.zOrder);
  const closeWindow = useDesktopStore((s) => s.closeWindow);
  const focusWindow = useDesktopStore((s) => s.focusWindow);
  const openWindow = useDesktopStore((s) => s.openWindow);

  const wallpaperRef = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (reduced || isMobile || !wallpaperRef.current) return;
      const cx = (e.clientX / window.innerWidth - 0.5) * 2;
      const cy = (e.clientY / window.innerHeight - 0.5) * 2;
      wallpaperRef.current.style.transform = `scale(1.03) translate(${cx * -6}px, ${cy * -6}px)`;
    },
    [reduced, isMobile]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && zOrder.length > 0) {
        closeWindow(zOrder[zOrder.length - 1]);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeWindow, zOrder]);

  const onMenu = useCallback(
    (target: string) => {
      openWindow({
        id: `sys-${target}`,
        title: target === 'about' ? 'About Mazen Khaled' : 'Contact Mazen Khaled',
        contentType: target as 'about' | 'contact',
        minimized: false,
        maximized: false,
      });
    },
    [openWindow]
  );

  useEffect(() => {
    const h1 = () => onMenu('about');
    const h2 = () => onMenu('contact');
    window.addEventListener('open-about', h1);
    window.addEventListener('open-contact', h2);
    return () => {
      window.removeEventListener('open-about', h1);
      window.removeEventListener('open-contact', h2);
    };
  }, [onMenu]);

  return (
    <div
      className="relative w-full h-full overflow-hidden select-none"
      onMouseMove={onMouseMove}
    >
      <div className="fixed inset-0 overflow-hidden bg-[#0d131f]">
        <div
          ref={wallpaperRef}
          className="absolute inset-0 wallpaper-blur"
          style={{
            backgroundImage: 'url(/wallpaper.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: reduced ? 'none' : 'transform 0.08s linear',
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 vignette pointer-events-none" aria-hidden="true" />
      </div>

      <MenuBar />

      {isMobile ? (
        <MobileGrid />
      ) : (
        <div className="fixed inset-0 pt-7" role="main" aria-label="Desktop icons">
          {projects.map((proj, idx) => (
            <DesktopIcon
              key={proj.id}
              project={proj}
              staggerIndex={idx}
              reduced={reduced}
            />
          ))}
        </div>
      )}

      <AnimatePresence>
        {windows.map((win) => {
          const zIndex = 200 + zOrder.indexOf(win.id);
          return (
            <Window
              key={win.id}
              win={win}
              zIndex={zIndex}
              isFocused={zOrder[zOrder.length - 1] === win.id}
              onFocus={() => focusWindow(win.id)}
              onClose={() => closeWindow(win.id)}
              reduced={reduced}
            />
          );
        })}
      </AnimatePresence>

      <div className="fixed bottom-4 left-0 right-0 flex justify-center z-[400] pointer-events-none">
        <div className="pointer-events-auto">
          <Dock compact={isMobile} />
        </div>
      </div>

      <TrashToast />
    </div>
  );
}
