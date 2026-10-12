import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowRight, ArrowUpRight, BookOpen, GraduationCap, Github, Linkedin, Mail, Menu, Mic, Users, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const pages = [ ['Home', '/'], ['About', '/about'], ['Skills', '/skills'], ['Projects', '/projects'], ['Education', '/education'], ['Contact', '/contact'] ] as const;

export function PortfolioHeader() {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="page-width nav-inner">
    <Link to="/" className="wordmark" aria-label="Jai Fatehpuria home" onClick={() => setOpen(false)}>Jai<span>.</span></Link>
    <nav aria-label="Main navigation" className={`nav-links ${open ? 'is-open' : ''}`}>
      {pages.map(([label, path]) => <Link key={path} to={path} activeOptions={{ exact: true }} className="nav-link" onClick={() => setOpen(false)}>{label}</Link>)}
    </nav>
    <Button variant="ghost" size="icon" className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
  </div></header>;
}

export function PortfolioFooter() {
  return <footer className="site-footer"><div className="page-width footer-inner"><Link to="/" className="footer-brand">Jai Fatehpuria<span className="text-primary">.</span></Link><span>Business student · Jaipur, India</span><a href="mailto:fatehpuriajai@gmail.com" aria-label="Email Jai"><Mail size={16}/></a></div></footer>;
}

export function AboutSection({ full = false }: { full?: boolean }) {
  return <section className="section"><div className="page-width about-grid"><div><div className="section-label">01 / About me</div><h2>A curious mind.<br/>A business perspective.</h2>{!full && <Link to="/about" className="text-link mt-6">More about me <ArrowUpRight size={15}/></Link>}</div><div><p className="body-copy">I'm Jai, a first-year Bachelor of Business Administration student at JECRC University in Jaipur. My interests lie at the intersection of Business Analytics and Marketing.</p><p className="body-copy">I'm building my foundation in business, with a long-term goal of pursuing an MBA from a reputed institution.</p><div className="fact-row"><GraduationCap size={22}/><div><strong>BBA · JECRC University</strong><span>2025–2028 · Jaipur, India</span></div></div></div></div></section>;
}

export function SkillsSection() {
  return <section className="section section-tinted"><div className="page-width"><div className="section-heading"><div><div className="section-label">02 / My skills</div><h2>What I bring to the table.</h2></div><p>People-focused skills that form the foundation of how I communicate and collaborate.</p></div><div className="skills-grid"><article className="skill-card"><div className="icon-tile"><Mic size={24}/></div><div><h3>Public Speaking</h3><p>Communication</p></div></article><article className="skill-card"><div className="icon-tile"><Users size={24}/></div><div><h3>Group Work</h3><p>Collaboration</p></div></article></div></div></section>;
}

const projects = [
  {
    number: '01',
    name: 'Aroma Essence',
    subtitle: 'Perfume Brand & Marketing',
    description: 'Created an academic perfume-branding project focused on developing the Aroma Essence brand concept and presenting its products through a marketing-oriented approach.',
    tags: ['Academic project', 'Brand concept', 'Marketing'],
  },
] as const;

export function ProjectsSection({ full = false }: { full?: boolean }) {
  return <section className="section"><div className="page-width"><div className="section-heading"><div><div className="section-label">{full ? 'Jai Fatehpuria / Projects' : '03 / Projects'}</div>{full ? <h1>Learning, put into practice.</h1> : <h2>Learning, put into practice.</h2>}</div><p>Academic work where a business idea is shaped into something presentable.</p></div><div className="projects-list">{projects.map(project => <article className="project-card" key={project.number}><div className="project-number">{project.number}</div><div><h3>{project.name}</h3><span className="project-subtitle">{project.subtitle}</span><p>{project.description}</p><div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div></article>)}</div></div></section>;
}

type EducationEntry = {
  period: string;
  title: string;
  status?: string;
  stream?: string;
  result?: string;
  details: [string, string][];
};

const educationEntries: EducationEntry[] = [
  {
    period: '2025 — 2028',
    title: 'Bachelor of Business Administration',
    status: 'Currently Pursuing',
    details: [['Institution', 'JECRC University'], ['Location', 'Jaipur, Rajasthan']],
  },
  {
    period: 'Class 12',
    title: 'Senior Secondary Education',
    stream: 'Commerce with Informatics Practices',
    result: '86.2%',
    details: [['Board', 'CBSE'], ['Location', 'Jaipur, Rajasthan']],
  },
  {
    period: 'Class 10',
    title: 'Secondary Education',
    result: '86%',
    details: [['Board', 'CBSE'], ['Location', 'Jaipur, Rajasthan']],
  },
];

export function EducationSection() {
  return <section className="section section-tinted"><div className="page-width"><div className="section-heading"><div><div className="section-label">04 / Education</div><h2>Building my foundation.</h2></div><BookOpen className="text-primary" size={30}/></div><div className="education-timeline">{educationEntries.map(entry => <article className="education-item" key={entry.title}><div className="education-period">{entry.period}</div><div><div className="education-head"><div><h3>{entry.title}</h3>{entry.stream && <span className="education-stream">{entry.stream}</span>}</div>{entry.result ? <span className="education-result">{entry.result}</span> : entry.status ? <span className="education-status"><span className="eyebrow-dot"/>{entry.status}</span> : null}</div><dl className="education-meta">{entry.details.map(([label, value]) => <div className="education-meta-item" key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></div></article>)}</div></div></section>;
}

export function ContactSection() {
  return <section className="section"><div className="page-width contact-grid"><div><div className="section-label">05 / Get in touch</div><h2>Let's connect.</h2><p className="body-copy mt-5">A conversation about business, analytics,<br className="hidden sm:block"/> or marketing starts here.</p></div><div className="contact-links"><a className="contact-link" href="mailto:fatehpuriajai@gmail.com"><Mail/><div><strong>Email</strong><span>fatehpuriajai@gmail.com</span></div><ArrowUpRight/></a><a className="contact-link" href="https://www.linkedin.com/feed/" target="_blank" rel="noopener noreferrer"><Linkedin/><div><strong>LinkedIn</strong><span>linkedin.com/feed</span></div><ArrowUpRight/></a><a className="contact-link" href="https://github.com" target="_blank" rel="noopener noreferrer"><Github/><div><strong>GitHub</strong><span>github.com</span></div><ArrowUpRight/></a></div></div></section>;
}

export function PageIntro({ label, title, description }: { label: string; title: string; description: string }) {
  return <div className="page-intro"><div className="page-width reveal"><div className="section-label">Jai Fatehpuria / {label}</div><h1 className="page-title">{title}</h1><p>{description}</p></div></div>;
}

export function portfolioHead(title: string, description: string) {
  return { meta: [{ title: `${title} | Jai Fatehpuria` }, { name: 'description', content: description }, { property: 'og:title', content: `${title} | Jai Fatehpuria` }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] };
}