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
    name: "John Smith",
    role: "Senior Developer",
    text: "The platform's UI is incredibly intuitive. I found a position that perfectly matches my skillset within days of signing up.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"
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



export const MOCK_JOBS: any[] = [
  {
    id: '1',
    title: 'Senior UIUX Designer',
    company: 'Microsoft',
    companyIcon: 'https://img.icons8.com/color/48/microsoft.png',
    companyBanner: 'https://picsum.photos/id/42/1200/400',
    postedTime: 'Posted 1h ago',
    workType: 'Remote work',
    level: 'Expert',
    description: 'We are seeking a talented and highly motivated UI/UX Designer to join our growing team in India. The ideal candidate will have a strong portfolio of design work and a passion for creating intuitive and visually appealing user experiences for a global audience.',
    responsibilities: [
      'Collaborate with product management and engineering to define and implement innovative design solutions for the product direction, visuals, and experience',
      'Conduct user research and testing to gather insights and validate design decisions',
      'Continuously iterate and improve upon the design of our products',
      'Stay up-to-date with the latest design trends and techniques'
    ],
    skills: ['Wireframing', 'Figma', 'Adobe XD', 'UIUX Designer', 'Team work'],
    client: {
      name: 'Microsoft India',
      isVerified: true,
      joinedDate: 'January 12, 2016',
      location: 'Bengaluru, Karnataka',
      rating: 5,
      spend: '₹5Cr+',
      hiringCount: 200,
      activeCount: 15
    }
  },
  {
    id: '2',
    title: 'Product Designer',
    company: 'Amazon',
    companyIcon: 'https://img.icons8.com/color/48/amazon.png',
    companyBanner: 'https://picsum.photos/id/60/1200/400',
    postedTime: 'Posted 2h ago',
    workType: 'Remote work',
    level: 'Expert',
    description: 'Join Amazon India as a Product Designer to shape the future of e-commerce experiences for millions of users.',
    responsibilities: [
      'Create end-to-end customer journeys',
      'Translate abstract concepts into interactive prototypes',
      'Collaborate with global cross-functional teams'
    ],
    skills: ['Prototyping', 'User Research', 'Sketch', 'Interaction Design'],
    client: {
      name: 'Amazon India',
      isVerified: true,
      joinedDate: 'March 15, 2010',
      location: 'Hyderabad, Telangana',
      rating: 4.8,
      spend: '₹10Cr+',
      hiringCount: 500,
      activeCount: 45
    }
  },
  {
    id: '3',
    title: 'Mobile App Designer',
    company: 'Zomato',
    companyIcon: 'https://img.icons8.com/color/48/zomato.png',
    companyBanner: 'https://picsum.photos/id/55/1200/400',
    postedTime: 'Posted 18h ago',
    workType: 'Remote work',
    level: 'Intermediate',
    description: 'Help us redefine how India eats by designing world-class mobile experiences.',
    responsibilities: [
      'Design pixel-perfect mobile interfaces',
      'Optimize performance for iOS and Android platforms',
      'Maintain design systems'
    ],
    skills: ['Mobile Design', 'SwiftUI', 'Design Systems', 'Figma'],
    client: {
      name: 'Zomato',
      isVerified: true,
      joinedDate: 'August 10, 2012',
      location: 'Gurugram, Haryana',
      rating: 4.9,
      spend: '₹2Cr+',
      hiringCount: 80,
      activeCount: 12
    }
  },
  {
    id: '4',
    title: 'Sr. Cloud Engineer',
    company: 'Google',
    companyIcon: 'https://img.icons8.com/color/48/google-logo.png',
    companyBanner: 'https://picsum.photos/id/20/1200/400',
    postedTime: 'Posted 8h ago',
    workType: 'Part time',
    level: 'Expert',
    description: 'Scale complex systems and drive infrastructure innovations at Google Cloud India.',
    responsibilities: [
      'Architect scalable cloud solutions',
      'Optimize infrastructure costs',
      'Lead incident response teams'
    ],
    skills: ['GCP', 'Kubernetes', 'Terraform', 'Python'],
    client: {
      name: 'Google India',
      isVerified: true,
      joinedDate: 'June 20, 2008',
      location: 'Mumbai, Maharashtra',
      rating: 5,
      spend: '₹15Cr+',
      hiringCount: 1200,
      activeCount: 200
    }
  },
  {
    id: '5',
    title: 'Jr. UIUX Designer',
    company: 'Flipkart',
    companyIcon: 'https://img.icons8.com/color/48/flipkart.png',
    companyBanner: 'https://picsum.photos/id/1/1200/400',
    postedTime: 'Posted 3h ago',
    workType: 'Remote work',
    level: 'Internship',
    description: 'Begin your design journey by assisting in crafting the shopping experience for millions of Indians.',
    responsibilities: [
      'Assist in user flows mapping',
      'Support lead designers with asset production',
      'Participate in design critiques'
    ],
    skills: ['Visual Design', 'Collaboration', 'Quick Learner'],
    client: {
      name: 'Flipkart',
      isVerified: true,
      joinedDate: 'Nov 5, 2018',
      location: 'Bengaluru, India',
      rating: 4.5,
      spend: '₹1Cr+',
      hiringCount: 15,
      activeCount: 2
    }
  }
];

export const CATEGORIES = [
  'Frontend Dev',
  'UIUX Designer',
  'Product Manager',
  'Backend Engineer',
  'Fullstack Dev',
  'Data Scientist',
  'DevOps',
  'Mobile Dev'
];

export const FILTER_OPTIONS = {
  jobTypes: ['Full time', 'Part time', 'Contract', 'Freelance', 'Internship'],
  workModes: ['Remote', 'Hybrid', 'On-site'],
  locations: [
    'Bengaluru', 'Mumbai', 'Delhi NCR', 'Hyderabad', 'Pune', 'Chennai',
    'Kolkata', 'Ahmedabad', 'Noida', 'Gurugram', 'Chandigarh', 'Jaipur',
    'Lucknow', 'Indore', 'Bhopal', 'Thane', 'Visakhapatnam', 'Surat',
    'Coimbatore', 'Kochi', 'Nagpur', 'Mysuru', 'Patna', 'Ranchi'
  ],
  salaryRangesLPA: ['0-10 LPA', '10-20 LPA', '20-35 LPA', '35-50 LPA', '50+ LPA'],
  experienceLevels: ['Entry Level (0-2y)', 'Intermediate (2-5y)', 'Senior (5-10y)', 'Expert (10y+)'],
  postDates: ['Any time', 'Past 24 hours', 'Past week', 'Past month']
};