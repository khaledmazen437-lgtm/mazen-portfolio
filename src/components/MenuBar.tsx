import { useState, useEffect } from 'react';

export function MenuBar() {
  const [time, setTime] = useState(() => formatTime(new Date()));

  useEffect(() => {
    const id = setInterval(() => setTime(formatTime(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[500] h-7 flex items-center justify-between px-4
                 bg-white/70 backdrop-blur-xl border-b border-white/40 no-select shadow-sm"
      style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}
    >
      {/* Left: brand name */}
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-neutral-800" />
        <span className="text-xs font-bold tracking-wider uppercase text-neutral-800">
          Mazen Khaled
        </span>
      </div>

      {/* Center: nav items */}
      <nav className="flex items-center gap-3 sm:gap-5" aria-label="Site navigation" style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}>
        <button
          className="text-xs font-semibold text-neutral-700 hover:text-black transition-colors"
          onClick={() => window.dispatchEvent(new CustomEvent('open-about'))}
        >
          About
        </button>
        <button
          className="text-xs font-semibold text-neutral-700 hover:text-black transition-colors"
          onClick={() => window.dispatchEvent(new CustomEvent('open-contact'))}
        >
          Contact
        </button>
        <a
          href="https://www.linkedin.com/in/mazen-khaled-00aabb375?utm_source=share_via&utm_content=profile&utm_medium=member_android"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors hidden xs:inline-block"
        >
          LinkedIn ↗
        </a>
        <a
          href="https://github.com/khaledmazen437-lgtm"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-neutral-600 hover:text-black transition-colors hidden sm:inline-block"
        >
          GitHub ↗
        </a>
      </nav>

      {/* Right: clock */}
      <time className="text-xs text-neutral-700 tabular-nums font-medium" dateTime={new Date().toISOString()}>
        {time}
      </time>
    </div>
  );
}

function formatTime(d: Date): string {
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
}
