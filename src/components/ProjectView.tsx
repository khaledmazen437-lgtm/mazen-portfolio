import { type WindowState } from '../store/useDesktopStore';
import { projects } from '../data/projects';

type Props = { win: WindowState };

export function ProjectView({ win }: Props) {
  if (win.contentType === 'project') {
    const project = projects.find((p) => p.id === win.projectId);
    if (!project) return <div className="p-6 text-neutral-500">Project not found.</div>;
    return <ProjectContent project={project} />;
  }

  if (win.contentType === 'about' || win.contentType === 'contact') return <AboutContent />;
  if (win.contentType === 'services') return <ServicesContent />;
  if (win.contentType === 'tools') return <ToolsContent />;
  if (win.contentType === 'gallery') return <GalleryContent />;
  if (win.contentType === 'resume') return <ResumeContent />;
  if (win.contentType === 'production') return <ProductionContent />;

  return null;
}

function ProjectContent({ project }: { project: (typeof projects)[0] }) {
  return (
    <article className="p-6 space-y-5">
      {/* Header */}
      <header className="space-y-2 border-b border-neutral-200/60 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          {project.category && (
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-neutral-900 text-white">
              {project.category}
            </span>
          )}
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700">
            {project.language ?? 'Open Source'}
          </span>
          {project.year && (
            <span className="text-xs text-neutral-400 font-semibold">{project.year}</span>
          )}
        </div>
        <h2 className="text-2xl font-black uppercase tracking-tight leading-tight text-neutral-900">
          {project.title}
        </h2>
        {project.description && (
          <p className="text-sm text-neutral-600 leading-relaxed max-w-prose">
            {project.description}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-2.5 pt-2">
          {project.demoLink && (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm"
            >
              Live Demo
            </a>
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-neutral-900 text-white text-xs font-bold hover:bg-neutral-800 transition-colors shadow-sm"
            >
              View on GitHub
            </a>
          )}
        </div>
      </header>

      {/* Media gallery */}
      <div className="space-y-3">
        {project.media.map((item, i) =>
          item.type === 'image' ? (
            <img
              key={i}
              src={item.src}
              alt={item.alt ?? `${project.title} screenshot ${i + 1}`}
              loading="lazy"
              className="w-full rounded-lg object-cover shadow-sm border border-neutral-200/50"
              style={{ maxHeight: 420 }}
            />
          ) : (
            <video
              key={i}
              src={item.src}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              aria-label={item.alt ?? `${project.title} video ${i + 1}`}
              className="w-full rounded-lg object-cover shadow-sm border border-neutral-200/50"
              style={{ maxHeight: 420 }}
            />
          )
        )}
      </div>
    </article>
  );
}

function AboutContent() {
  return (
    <article className="p-6 space-y-5">
      <div className="flex items-center gap-4 border-b border-neutral-200/60 pb-5">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-2xl shadow-md">
          MK
        </div>
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-neutral-900">Mazen Khaled</h2>
          <p className="text-sm font-semibold text-blue-600">Software Engineer & Web Developer</p>
        </div>
      </div>

      <div className="space-y-3 text-sm text-neutral-700 leading-relaxed max-w-prose">
        <p>
          Hi, I&apos;m <strong>Mazen Khaled</strong>. A passionate software engineer specializing in building high-performance web applications, modern responsive interfaces, and practical software solutions.
        </p>
        <p>
          I focus on crafting clean, accessible code, scalable project architectures, and engaging interactive digital experiences.
        </p>
      </div>

      {/* Quick connect cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <a
          href="https://github.com/khaledmazen437-lgtm"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 rounded-xl bg-neutral-100 hover:bg-neutral-200/80 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center text-xs font-bold">
            GH
          </div>
          <div>
            <div className="text-xs font-bold text-neutral-900">GitHub</div>
            <div className="text-[11px] text-neutral-500">@khaledmazen437-lgtm</div>
          </div>
        </a>

        <a
          href="https://www.linkedin.com/in/mazen-khaled-00aabb375?utm_source=share_via&utm_content=profile&utm_medium=member_android"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 rounded-xl bg-neutral-100 hover:bg-neutral-200/80 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-700 text-white flex items-center justify-center text-xs font-bold">
            IN
          </div>
          <div>
            <div className="text-xs font-bold text-neutral-900">LinkedIn</div>
            <div className="text-[11px] text-neutral-500">Mazen Khaled</div>
          </div>
        </a>

        <a
          href="https://www.instagram.com/mazenkhaled3538?gwpx=MWFyNWo3N3VxMGx4aw=="
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 rounded-xl bg-neutral-100 hover:bg-neutral-200/80 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-pink-600 text-white flex items-center justify-center text-xs font-bold">
            IG
          </div>
          <div>
            <div className="text-xs font-bold text-neutral-900">Instagram</div>
            <div className="text-[11px] text-neutral-500">@mazenkhaled3538</div>
          </div>
        </a>

        <a
          href="./Mazen_Khaled_Resume.pdf"
          download="Mazen_Khaled_Resume.pdf"
          className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 border border-blue-200/80 hover:bg-blue-100 transition-colors sm:col-span-2"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
            CV
          </div>
          <div className="flex-1">
            <div className="text-xs font-bold text-blue-900">Curriculum Vitae (Resume PDF)</div>
            <div className="text-[11px] text-blue-600">Click to view & download official CV</div>
          </div>
          <span className="text-xs font-bold text-blue-700 bg-white px-2.5 py-1 rounded-md shadow-sm">
            Download PDF
          </span>
        </a>
      </div>
    </article>
  );
}

function ServicesContent() {
  const services = [
    { name: 'Full-Stack Web Development', desc: 'Custom web platforms, e-commerce, and responsive web apps.' },
    { name: 'Frontend Architecture', desc: 'Interactive React/TypeScript components, animations, and high performance.' },
    { name: 'Backend & Systems', desc: 'Python and PHP backend scripts, database handling, and API integration.' },
    { name: 'UI / UX Design', desc: 'Modern user-centric prototypes, wireframes, and design systems.' },
  ];
  return (
    <article className="p-6 space-y-4">
      <h2 className="text-xl font-black uppercase tracking-tight text-neutral-900">What I Do</h2>
      <ul className="space-y-3">
        {services.map((s) => (
          <li key={s.name} className="border-b border-neutral-100 pb-3">
            <span className="block text-sm font-bold text-neutral-900">{s.name}</span>
            <span className="block text-xs text-neutral-500 mt-0.5">{s.desc}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function ToolsContent() {
  const tools = [
    'JavaScript / TypeScript',
    'Python',
    'PHP',
    'React.js',
    'HTML5 & Modern CSS3',
    'Tailwind CSS',
    'Git & GitHub',
    'VS Code & Terminal',
    'E-Commerce Systems',
    'Figma & UI Prototyping',
  ];
  return (
    <article className="p-6 space-y-4">
      <h2 className="text-xl font-black uppercase tracking-tight text-neutral-900">Technical Skills & Stack</h2>
      <ul className="grid grid-cols-2 gap-2">
        {tools.map((t) => (
          <li key={t} className="text-xs font-bold text-neutral-800 bg-neutral-100/90 rounded-lg px-3 py-2.5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function GalleryContent() {
  return (
    <article className="p-6 space-y-4">
      <h2 className="text-xl font-black uppercase tracking-tight text-neutral-900">Project Highlights</h2>
      <div className="grid grid-cols-3 gap-3">
        {projects.map((p) => (
          <a
            key={p.id}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-xl border border-neutral-200/60 shadow-sm block bg-white"
          >
            <img
              src={p.cover}
              alt={p.title}
              loading="lazy"
              className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-200"
            />
            <div className="p-2 text-center bg-white/95">
              <span className="text-[10px] font-bold text-neutral-800 line-clamp-1 block">
                {p.title}
              </span>
            </div>
          </a>
        ))}
      </div>
    </article>
  );
}

function ResumeContent() {
  return (
    <article className="p-4 sm:p-6 flex flex-col h-full space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200/60 pb-3">
        <div>
          <h2 className="text-xl font-black uppercase tracking-tight text-neutral-900">
            Mazen Khaled — Curriculum Vitae
          </h2>
          <p className="text-xs text-neutral-500 font-medium">Software Engineer • FlowCV Document</p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="./Mazen_Khaled_Resume.pdf"
            download="Mazen_Khaled_Resume.pdf"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm"
          >
            <span>Download PDF</span>
          </a>
          <a
            href="./Mazen_Khaled_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-neutral-200/80 text-neutral-800 text-xs font-bold hover:bg-neutral-300 transition-colors"
          >
            <span>Open in Tab ↗</span>
          </a>
        </div>
      </div>
      <div className="w-full flex-1 min-h-[520px] rounded-xl overflow-hidden border border-neutral-200/80 bg-neutral-50 shadow-inner">
        <iframe
          src="./Mazen_Khaled_Resume.pdf#toolbar=1"
          title="Mazen Khaled Resume PDF"
          className="w-full h-full min-h-[520px] border-none"
        />
      </div>
    </article>
  );
}

function ProductionContent() {
  const productionSites = [
    {
      title: 'DALIL STUDY PLATFORM',
      tag: 'PHP 8 • MySQL • PWA • Live Chat',
      url: 'https://mhdteck.store/dalil/',
      github: 'https://github.com/khaledmazen437-lgtm/dalil-study-platform',
      desc: 'منصة دليل التعليمية المتكاملة مع نظام المحادثات الفورية المباشرة وقنوات النقاش واللوحة الإدارية الشاملة.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=85',
    },
    {
      title: 'MHD FASHION STORE',
      tag: 'E-Commerce • Cart & Shop • Responsive',
      url: 'https://mhdteck.store/store/store.php',
      github: 'https://github.com/khaledmazen437-lgtm/mhd-fashion-store',
      desc: 'المتجر الإلكتروني العصري للأزياء والملابس مع سلة تسوق تفاعلية وفلترة وتجربة مستخدم شراء متكاملة.',
      image: './1.jpg',
    },
    {
      title: 'MHD AGENCY TECH PORTAL',
      tag: 'Corporate • Tech Agency • Solutions',
      url: 'https://mhdteck.store/mhd/index.php',
      github: 'https://github.com/khaledmazen437-lgtm/mhd-agency-website',
      desc: 'بوابة وكالة MHD للحلول التقنية والبرمجية واستعراض الخدمات وباقات تطوير المواقع والأنظمة.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=85',
    },
  ];

  return (
    <article className="p-4 sm:p-6 space-y-5">
      <div className="border-b border-neutral-200/70 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
            Live Deployed Sites (mhdteck.store)
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-neutral-900 mt-2">
          Production Web Applications
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 mt-1">
          مشاريع فعلية ومواقع حيّة ومستضافة على السيرفر ومتاحة للزيارة والتجربة المباشرة:
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {productionSites.map((site) => (
          <div
            key={site.url}
            className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-neutral-200/80 bg-white hover:border-blue-400 hover:shadow-md transition-all duration-200"
          >
            <div className="sm:w-44 h-32 rounded-lg overflow-hidden shrink-0 border border-neutral-200/50 bg-neutral-100">
              <img
                src={site.image}
                alt={site.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between space-y-2">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    {site.tag}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Live Online
                  </span>
                </div>
                <h3 className="text-base font-bold text-neutral-900 mt-1">{site.title}</h3>
                <p className="text-xs text-neutral-600 leading-relaxed mt-1">{site.desc}</p>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors shadow-sm"
                >
                  <span>Launch Live Site</span>
                  <span>↗</span>
                </a>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors"
                >
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
