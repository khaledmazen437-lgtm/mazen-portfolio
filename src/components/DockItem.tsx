import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { useRef, useState } from 'react';
import type { DockApp } from '../data/dock';

type Props = {
  app: DockApp;
  mouseX: MotionValue<number>;
  dockRef: React.RefObject<HTMLDivElement | null>;
  reduced: boolean;
  compact?: boolean;
  onActivate: () => void;
  index: number;
};

export function DockItem({ app, mouseX, dockRef, reduced, compact = false, onActivate, index }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const [tooltip, setTooltip] = useState(false);

  const iconSize = compact ? 38 : 52;
  const maxScale = compact ? 1.25 : 1.75;
  const spread = compact ? 70 : 100;

  const distance = useMotionValue(Infinity);

  useTransform(mouseX, (mx) => {
    if (!ref.current || !dockRef.current || compact) return Infinity;
    const rect = ref.current.getBoundingClientRect();
    const dockRect = dockRef.current.getBoundingClientRect();
    const center = rect.left - dockRect.left + rect.width / 2;
    distance.set(Math.abs(mx - center));
    return 0;
  });

  const scale = useTransform(distance, [0, spread], [maxScale, 1], { clamp: true });
  const springScale = useSpring(reduced || compact ? 1 : scale, {
    stiffness: 350,
    damping: 28,
    mass: 0.4,
  });
  const y = useTransform(springScale, [1, maxScale], [0, compact ? -4 : -12]);

  return (
    <motion.div
      style={{ y: compact ? 0 : y }}
      className="relative flex flex-col items-center shrink-0"
      onMouseEnter={() => setTooltip(true)}
      onMouseLeave={() => setTooltip(false)}
    >
      {tooltip && !compact && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12 }}
          className="absolute -top-9 left-1/2 -translate-x-1/2
                     bg-black/85 text-white text-[11px] font-semibold
                     px-2 py-1 rounded-md whitespace-nowrap pointer-events-none z-50 shadow-md"
          role="tooltip"
          id={`dock-tooltip-${app.id}`}
        >
          {app.label}
        </motion.div>
      )}

      <motion.button
        ref={ref}
        style={{ width: iconSize, height: iconSize, scale: springScale }}
        className="flex items-center justify-center rounded-[10px] sm:rounded-[12px] overflow-hidden
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1
                   cursor-pointer active:scale-95 transition-transform"
        onClick={onActivate}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') onActivate();
        }}
        tabIndex={0}
        aria-label={app.label}
        aria-describedby={tooltip ? `dock-tooltip-${app.id}` : undefined}
        data-index={index}
      >
        <img
          src={app.icon}
          alt=""
          aria-hidden="true"
          width={iconSize}
          height={iconSize}
          className="w-full h-full object-cover"
          draggable={false}
        />
      </motion.button>
    </motion.div>
  );
}
