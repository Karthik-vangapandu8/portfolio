export interface Promotion {
  id: string;
  type: 'achievement' | 'quote' | 'highlight';
  title: string;
  description: string;
  cta: string;
  link: string;
  image?: string;
}

export const PROMOTIONS: Promotion[] = [
  {
    id: 'ml-pro',
    type: 'achievement',
    title: '10 ML Projects, 10 Days',
    description: 'From face recognition to automated clustering. Witness the journey of intense learning.',
    cta: 'Explore Projects',
    link: '/work',
    image: '/ads/ml-projects.png',
  },
  {
    id: 'quote-1',
    type: 'quote',
    title: '"Build for tomorrow, today."',
    description: 'My philosophy on software engineering and sustainable architecture.',
    cta: 'Read Philosophy',
    link: '/blog',
  },
  {
    id: 'achieve-notes',
    type: 'achievement',
    title: 'Note-Taking Reimagined',
    description: 'Check out my custom-built Mac app for managing reading highlights with glassmorphism.',
    cta: 'View App',
    link: '/work',
    image: '/ads/notes-app.png',
  },
  {
    id: 'dukaan-clone',
    type: 'achievement',
    title: 'E-commerce Engine',
    description: 'A full-stack Dukaan clone built with Django and Next.js. Scalable, fast, and feature-rich.',
    cta: 'View Case Study',
    link: '/work',
  }
];
