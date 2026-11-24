import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type WindowState = {
  id: string;
  title: string;
  projectId?: string;      // links to data/projects.ts
  contentType: 'project' | 'about' | 'services' | 'tools' | 'gallery' | 'resume' | 'production' | 'contact';
  position: { x: number; y: number };
  minimized: boolean;
  maximized: boolean;
};

export type IconPosition = {
  x: number; // px
  y: number;
};

type DesktopStore = {
  // Windows
  windows: WindowState[];
  zCounter: number;
  zOrder: string[];          // window ids in z-index order (last = top)
  openWindow: (w: Omit<WindowState, 'position'>) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  moveWindow: (id: string, pos: { x: number; y: number }) => void;

  // Icon positions (persisted)
  iconPositions: Record<string, IconPosition>;
  setIconPosition: (id: string, pos: IconPosition) => void;
  resetIconPositions: () => void;

  // Easter egg
  trashOpen: boolean;
  setTrashOpen: (v: boolean) => void;
};

export const useDesktopStore = create<DesktopStore>()(
  persist(
    (set, get) => ({
      windows: [],
      zCounter: 100,
      zOrder: [],

      openWindow: (w) => {
        const existing = get().windows.find((win) => win.id === w.id);
        if (existing) {
          // Restore if minimized, then focus
          set((s) => ({
            windows: s.windows.map((win) =>
              win.id === w.id ? { ...win, minimized: false } : win
            ),
            zOrder: [...s.zOrder.filter((id) => id !== w.id), w.id],
          }));
          return;
        }
        // Responsive center calculation
        const isClient = typeof window !== 'undefined';
        const scrW = isClient ? window.innerWidth : 1200;
        const scrH = isClient ? window.innerHeight : 800;
        const winW = scrW < 768 ? scrW - 16 : Math.min(680, scrW - 40);
        const winH = scrW < 768 ? scrH - 80 : 500;
        const count = get().windows.length;
        const offset = (count % 5) * 22;

        const posX = scrW < 768 ? 8 : Math.max(20, Math.round((scrW - winW) / 2 + offset - 40));
        const posY = scrW < 768 ? 36 : Math.max(38, Math.round((scrH - winH) / 2 - 30 + offset));

        const position = { x: posX, y: posY };

        set((s) => ({
          windows: [...s.windows, { ...w, position }],
          zOrder: [...s.zOrder, w.id],
          zCounter: s.zCounter + 1,
        }));
      },

      closeWindow: (id) =>
        set((s) => ({
          windows: s.windows.filter((w) => w.id !== id),
          zOrder: s.zOrder.filter((zid) => zid !== id),
        })),

      focusWindow: (id) =>
        set((s) => ({
          zOrder: [...s.zOrder.filter((zid) => zid !== id), id],
        })),

      minimizeWindow: (id) =>
        set((s) => ({
          windows: s.windows.map((w) =>
            w.id === id ? { ...w, minimized: true } : w
          ),
        })),

      maximizeWindow: (id) =>
        set((s) => ({
          windows: s.windows.map((w) =>
            w.id === id ? { ...w, maximized: !w.maximized } : w
          ),
        })),

      moveWindow: (id, pos) =>
        set((s) => ({
          windows: s.windows.map((w) => (w.id === id ? { ...w, position: pos } : w)),
        })),

      iconPositions: {},
      setIconPosition: (id, pos) =>
        set((s) => ({ iconPositions: { ...s.iconPositions, [id]: pos } })),
      resetIconPositions: () => set({ iconPositions: {} }),

      trashOpen: false,
      setTrashOpen: (v) => set({ trashOpen: v }),
    }),
    {
      name: 'desktop-store',
      partialize: (s) => ({ iconPositions: s.iconPositions }),
    }
  )
);

