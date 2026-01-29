// remove later
import {
    LayoutDashboard,
    MessageCircle,
    CalendarDays,
    LayoutGrid,
    Building2,
    Globe,
    Cpu,
    ShoppingBag,
    Compass
} from 'lucide-react';
import { NavItem, UserProfile, Candidate, Job, Company } from './types';


export const NAV_ITEMS: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { id: 'explore', label: 'Explore', icon: Compass, href: '/explore' },
    { id: 'messages', label: 'Messages', icon: MessageCircle, href: '/messages' },
    { id: 'Analytics', label: 'Analytics', icon: CalendarDays, href: '/analytics' },
];

export const CURRENT_USER: UserProfile = {
    name: 'Anshul Badoni',
    email: 'anshul@gmail.com',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
    status: 'online',
};

export const RECENT_CANDIDATES: Candidate[] = [
    { id: '1', name: 'Leslie Alexander', handle: '@leslie.a', role: 'Product Designer', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
    { id: '2', name: 'Ronald Richards', handle: '@ronald.r27', role: 'Senior Developer', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
    { id: '3', name: 'Esther Howard', handle: '@esther.howard', role: 'Marketing Lead', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
];

export const ACTIVE_JOBS: any[] = [
    { id: '101', title: 'Senior React Dev', idNumber: '#J-001', status: 'Interviewing', company: 'TechCorp', matchScore: 95 },
    { id: '102', title: 'UI/UX Designer', idNumber: '#J-042', status: 'Applied', company: 'DesignStudio', matchScore: 88 },
    { id: '103', title: 'Product Manager', idNumber: '#J-115', status: 'Offer', company: 'Innovate Inc', matchScore: 92 },
];

export const FEATURED_COMPANIES: Company[] = [
    { id: 'c1', name: 'Google', logo: Globe },
    { id: 'c2', name: 'Microsoft', logo: Cpu },
    { id: 'c3', name: 'Amazon', logo: ShoppingBag },
    { id: 'c4', name: 'Airbnb', logo: Building2 },
];


import { Job } from './types';

export const MOCK_JOBS: Job[] = [
    {
        id: '1',
        title: 'Senior UIUX Designer',
        company: 'Microsoft',
        companyLogo: 'https://img.icons8.com/color/48/microsoft.png',
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
        companyLogo: 'https://img.icons8.com/color/48/amazon.png',
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
        companyLogo: 'https://img.icons8.com/color/48/zomato.png',
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
        companyLogo: 'https://img.icons8.com/color/48/google-logo.png',
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
        companyLogo: 'https://img.icons8.com/color/48/flipkart.png',
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
    },
    {
        id: '6',
        title: 'Jr. UIUX Designer',
        company: 'Flipkart',
        companyLogo: 'https://img.icons8.com/color/48/flipkart.png',
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