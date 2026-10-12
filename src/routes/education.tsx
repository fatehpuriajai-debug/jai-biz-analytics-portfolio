import { createFileRoute } from '@tanstack/react-router';
import { EducationSection, PageIntro, portfolioHead } from '@/components/portfolio';
export const Route = createFileRoute('/education')({ head: () => portfolioHead('Education', 'Jai Fatehpuria is pursuing a BBA at JECRC University, Jaipur, 2025–2028.'), component: Education });
function Education() { return <main className="detail-main"><PageIntro label="Education" title="The start of my journey." description="Studying business today, with the goal of pursuing an MBA from a reputed institution."/><EducationSection/></main>; }