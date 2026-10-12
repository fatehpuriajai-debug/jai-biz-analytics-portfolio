import { createFileRoute } from '@tanstack/react-router';
import { ProjectsSection, portfolioHead } from '@/components/portfolio';
export const Route = createFileRoute('/projects')({ head: () => portfolioHead('Projects', 'Explore the project portfolio of Jai Fatehpuria, including Aroma Essence, an academic perfume branding and marketing project.'), component: Projects });
function Projects() { return <main className="detail-main"><ProjectsSection full/></main>; }