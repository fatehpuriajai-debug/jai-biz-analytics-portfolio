import { createFileRoute } from '@tanstack/react-router';
import { SkillsSection, PageIntro, portfolioHead } from '@/components/portfolio';
export const Route = createFileRoute('/skills')({ head: () => portfolioHead('Skills', 'Jai Fatehpuria’s confirmed skills: Public Speaking and Group Work.'), component: Skills });
function Skills() { return <main className="detail-main"><PageIntro label="Skills" title="Communication. Collaboration." description="My skills in public speaking and group work."/><SkillsSection/></main>; }