import React from 'react';
import { 
  Briefcase, 
  Code, 
  Megaphone, 
  PenTool, 
  Layout
} from 'lucide-react';

export interface Job {
  id: number;
  title: string;
  company: string;
  logo: string;
  location: string;
  salary: string;
  tags: string[];
  date: string;
  cardColor: string;
  logoColor?: string;
}

export const JOBS: Job[] = [
  { 
    id: 1, 
    title: 'Senior UI/UX Designer', 
    company: 'Amazon', 
    location: 'San Francisco, CA', 
    salary: '$250/hr', 
    tags: ['Part time', 'Senior level', 'Distant', 'Project work'],
    date: '20 May, 2023',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg',
    cardColor: 'bg-[#FFE8D6]', // Peach
  },
  { 
    id: 2, 
    title: 'Junior UI/UX Designer', 
    company: 'Google', 
    location: 'California, CA', 
    salary: '$150/hr', 
    tags: ['Full time', 'Junior level', 'Distant', 'Project work', 'Flexible Schedule'],
    date: '4 Feb, 2023',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg',
    cardColor: 'bg-[#E0F7FA]', // Mint
  },
  { 
    id: 3, 
    title: 'Senior Motion Designer', 
    company: 'Dribbble', 
    location: 'New York, NY', 
    salary: '$260/hr', 
    tags: ['Part time', 'Senior level', 'Full Day', 'Shift work'],
    date: '29 Jan, 2023',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dribbble/dribbble-original.svg',
    cardColor: 'bg-[#EBE9FE]', // Lavender
  },
  { 
    id: 4, 
    title: 'UX Designer', 
    company: 'Twitter', 
    location: 'California, CA', 
    salary: '$120/hr', 
    tags: ['Full time', 'Middle level', 'Distant', 'Project work'],
    date: '11 Apr, 2023',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twitter/twitter-original.svg',
    cardColor: 'bg-[#E0F2FE]', // Light Blue
  },
  { 
    id: 5, 
    title: 'Graphic Designer', 
    company: 'Airbnb', 
    location: 'New York, NY', 
    salary: '$300/hr', 
    tags: ['Part time', 'Senior level'],
    date: '2 Apr, 2023',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/airbnb/airbnb-original.svg',
    cardColor: 'bg-[#FCE4EC]', // Pink
    logoColor: 'text-[#FF5A5F]'
  },
  { 
    id: 6, 
    title: 'Graphic Designer', 
    company: 'Apple', 
    location: 'San Francisco, CA', 
    salary: '$140/hr', 
    tags: ['Part time', 'Distant'],
    date: '18 Jan, 2023',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg',
    cardColor: 'bg-[#F3F4F6]', // Light Gray
  },
];

export const CATEGORIES = [
  {
    id: 1,
    title: 'Marketing & Communication',
    icon: <Megaphone className="w-6 h-6" />,
    jobs: '58',
    salary: '$1200'
  },
  {
    id: 2,
    title: 'UI / UX Design',
    icon: <PenTool className="w-6 h-6" />,
    jobs: '120',
    salary: '$2500'
  },
  {
    id: 3,
    title: 'Finance Management',
    icon: <Briefcase className="w-6 h-6" />,
    jobs: '89',
    salary: '$1800'
  },
  {
    id: 4,
    title: 'Web Development',
    icon: <Code className="w-6 h-6" />,
    jobs: '240',
    salary: '$3000'
  },
  {
    id: 5,
    title: 'Project Management',
    icon: <Layout className="w-6 h-6" />,
    jobs: '45',
    salary: '$2100'
  },
  {
    id: 6,
    title: 'Business & Consulting',
    icon: <Briefcase className="w-6 h-6" />,
    jobs: '67',
    salary: '$1900'
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Layla Abbas",
    role: "Marketing Manager",
    text: "I was using several job boards and getting overwhelmed. at Mony, it saved me tons of time and I landed my dream job at a great company!",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Shivam ",
    role: "PhD Researcher",
    text: "The platform's UI is incredibly intuitive. I found a position that perfectly matches my skillset within days of signing up.",
    image: "shivam.jpg"
  },
  {
    id: 3,
    name: "Sarah Chen",
    role: "Product Designer",
    text: "Connect helped me transition into a new industry seamlessly. The company reviews feature was a game changer for my decision making.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop"
  }
];

export const BRANDS = ["upwork", "dribbble", "github", "notion", "slack", "google", "dropbox"];