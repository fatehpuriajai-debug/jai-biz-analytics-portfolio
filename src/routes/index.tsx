import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight, ArrowUpRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import architecture from '@/assets/architecture.jpg';
import { AboutSection, SkillsSection, ProjectsSection, EducationSection, CourseAssistantSection, ContactSection, portfolioHead } from '@/components/portfolio';

export const Route = createFileRoute('/')({
  head: () => portfolioHead('Business student & aspiring MBA candidate', 'Meet Jai Fatehpuria, a first-year BBA student at JECRC University, Jaipur, interested in Business Analytics and Marketing.'),
  component: Index,
});

function Index() {
  return <main><section id="home" className="hero"><img className="hero-image" src={architecture} alt="Minimal white architectural staircase against a blue sky" width={1536} height={1024}/><div className="page-width hero-inner reveal"><div className="eyebrow"><span className="eyebrow-dot"/> Business student. Curious thinker.</div><h1>Hi, I'm Jai<br/><span>Fatehpuria.</span></h1><p className="hero-description">A first-year BBA student at JECRC University,<br className="hidden sm:block"/> exploring the world of business, data, and ideas.</p><div className="interest-line">Interested in <span>Business Analytics</span><span>·</span><span>Marketing</span></div><div className="hero-actions"><Button asChild><Link to="/projects">View Projects <ArrowUpRight/></Link></Button><Button asChild variant="outline"><Link to="/contact">Contact <ArrowRight/></Link></Button></div><div className="hero-location"><MapPin size={13}/> Jaipur, India <span className="mx-1">·</span> JECRC University</div></div></section><AboutSection/><SkillsSection/><ProjectsSection/><EducationSection/><CourseAssistantSection/><ContactSection/></main>;
}
