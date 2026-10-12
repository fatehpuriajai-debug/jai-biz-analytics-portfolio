import { createFileRoute } from '@tanstack/react-router';
import { ContactSection, PageIntro, portfolioHead } from '@/components/portfolio';
export const Route = createFileRoute('/contact')({ head: () => portfolioHead('Contact', 'Contact Jai Fatehpuria by email and visit his supplied LinkedIn and GitHub links.'), component: Contact });
function Contact() { return <main className="detail-main"><PageIntro label="Contact" title="Good conversations start here." description="Get in touch by email, or find the links below."/><ContactSection/></main>; }