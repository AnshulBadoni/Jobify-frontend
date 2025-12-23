"use client";
import Link from "next/link";
import { useState, useEffect, useMemo, FC, ReactNode, useRef, useCallback } from "react";

const DUMMY_JOBS = [
    { id: 1, title: "Senior Frontend Engineer", company: "Innovate Inc.", logo: "https://logo.clearbit.com/google.com", location: "Remote, USA", type: "Full-time", experience: "Senior", salary: { min: 140000, max: 160000 }, companySize: "Mid-size", industry: "SaaS", postedDate: "2024-07-20T10:00:00Z", tags: ["React", "TypeScript", "Next.js"], isFeatured: true, description: "Lead the development of our next-generation user interfaces, working with a talented team to build high-performance, scalable, and beautiful web applications.", responsibilities: ["Lead feature design", "Build reusable code", "Optimize for speed"], qualifications: ["5+ years in frontend", "Expert in React/Next.js", "Loves TypeScript"] },
    { id: 2, title: "Backend Developer (Node.js)", company: "DataStream Solutions", logo: "https://logo.clearbit.com/amazon.com", location: "New York, NY", type: "Full-time", experience: "Mid-level", salary: { min: 110000, max: 130000 }, companySize: "Enterprise", industry: "FinTech", postedDate: "2024-07-19T14:30:00Z", tags: ["Node.js", "PostgreSQL", "AWS"], isFeatured: false, description: "Build and maintain the APIs that power our data-intensive applications.", responsibilities: ["Develop server-side logic", "Design database schemas", "Operate services on AWS"], qualifications: ["3+ years with Node.js", "Proficient in SQL", "Cloud experience"] },
    { id: 3, title: "Product Designer", company: "Creative Co.", logo: "https://logo.clearbit.com/netflix.com", location: "Remote", type: "Contract", experience: "Mid-level", salary: { min: 90000, max: 110000 }, companySize: "Startup", industry: "Design", postedDate: "2024-07-21T09:00:00Z", tags: ["Figma", "UI/UX"], isFeatured: false, description: "Create amazing user experiences with an eye for clean and artful design.", responsibilities: ["Collaborate on solutions", "Create wireframes & prototypes", "Evaluate user feedback"], qualifications: ["Strong UX/UI portfolio", "Proficient in Figma", "Creative problem solver"] },
    { id: 4, title: "Junior DevOps Engineer", company: "CloudSphere", logo: "https://logo.clearbit.com/airbnb.com", location: "Austin, TX", type: "Full-time", experience: "Entry-level", salary: { min: 75000, max: 90000 }, companySize: "Mid-size", industry: "Cloud", postedDate: "2024-07-22T11:00:00Z", tags: ["AWS", "Terraform", "CI/CD"], isFeatured: false, description: "Join our growing infrastructure team and help us build and scale our cloud platform.", responsibilities: ["Manage AWS infrastructure", "Maintain CI/CD pipelines", "Monitor system performance"], qualifications: ["1+ years with cloud platforms", "Basic scripting knowledge", "IaC familiarity is a plus"] },
    { id: 5, title: "Data Scientist", company: "QuantumLeap AI", logo: "https://logo.clearbit.com/stripe.com", location: "Boston, MA", type: "Full-time", experience: "Senior", salary: { min: 160000, max: 190000 }, companySize: "Startup", industry: "AI/ML", postedDate: "2024-07-18T09:00:00Z", tags: ["Python", "PyTorch", "NLP"], isFeatured: true, description: "Develop cutting-edge machine learning models to solve complex problems.", responsibilities: ["Research and implement ML models", "Process and analyze large datasets", "Collaborate with engineering teams"], qualifications: ["PhD or MS in a quantitative field", "Expert in Python and ML frameworks", "Experience with NLP"] },
    { id: 6, title: "iOS Developer", company: "MobileFirst", logo: "https://tailwindui.com/img/logos/mark.svg?color=gray&shade=600", location: "Remote, Global", type: "Full-time", experience: "Mid-level", salary: { min: 120000, max: 145000 }, companySize: "Mid-size", industry: "Mobile", postedDate: "2024-07-23T15:00:00Z", tags: ["Swift", "SwiftUI", "CoreData"], isFeatured: false, description: "Craft beautiful and performant applications for the iOS platform.", responsibilities: ["Develop new features in Swift", "Maintain and improve existing code", "Work with product and design teams"], qualifications: ["3+ years of iOS development", "Proficient in Swift & SwiftUI", "Published apps on the App Store"] },
    { id: 7, title: "UX Researcher", company: "UserFlow", logo: "https://tailwindui.com/img/logos/mark.svg?color=purple&shade=600", location: "San Francisco, CA", type: "Contract", experience: "Senior", salary: { min: 130000, max: 150000 }, companySize: "Startup", industry: "SaaS", postedDate: "2024-07-21T18:00:00Z", tags: ["User Research", "Qualitative", "Quantitative"], isFeatured: false, description: "Be the voice of the user. Plan and conduct research to uncover insights.", responsibilities: ["Design and execute research studies", "Synthesize findings into actionable insights", "Present research to stakeholders"], qualifications: ["5+ years in UX research", "Expert in various research methodologies", "Excellent communication skills"] },
    { id: 8, title: "Marketing Manager", company: "GrowthHackers", logo: "https://tailwindui.com/img/logos/mark.svg?color=red&shade=600", location: "Remote", type: "Full-time", experience: "Mid-level", salary: { min: 85000, max: 105000 }, companySize: "Startup", industry: "Marketing", postedDate: "2024-07-24T10:00:00Z", tags: ["SEO", "Content Marketing", "PPC"], isFeatured: false, description: "Drive user acquisition and brand awareness through innovative marketing campaigns.", responsibilities: ["Develop and manage marketing campaigns", "Analyze campaign performance", "Oversee content strategy"], qualifications: ["3+ years in digital marketing", "Proven experience with SEO/SEM", "Strong analytical skills"] },
    { id: 9, title: "Full Stack Developer", company: "TechCorp", logo: "https://tailwindui.com/img/logos/mark.svg?color=blue&shade=500", location: "Seattle, WA", type: "Full-time", experience: "Mid-level", salary: { min: 115000, max: 135000 }, companySize: "Enterprise", industry: "SaaS", postedDate: "2024-07-25T10:00:00Z", tags: ["React", "Node.js", "MongoDB"], isFeatured: false, description: "Build end-to-end features for our enterprise SaaS platform.", responsibilities: ["Develop frontend and backend features", "Write tests", "Collaborate with designers"], qualifications: ["4+ years full stack experience", "Strong JavaScript skills", "Experience with databases"] },
    { id: 10, title: "Android Developer", company: "AppMakers", logo: "https://tailwindui.com/img/logos/mark.svg?color=green&shade=500", location: "Remote", type: "Full-time", experience: "Senior", salary: { min: 130000, max: 155000 }, companySize: "Mid-size", industry: "Mobile", postedDate: "2024-07-26T09:00:00Z", tags: ["Kotlin", "Jetpack Compose", "MVVM"], isFeatured: false, description: "Lead Android development for our flagship mobile application.", responsibilities: ["Architect new features", "Mentor junior developers", "Optimize app performance"], qualifications: ["5+ years Android development", "Expert in Kotlin", "Published apps with 1M+ downloads"] },
    { id: 11, title: "Security Engineer", company: "SecureNet", logo: "https://tailwindui.com/img/logos/mark.svg?color=red&shade=500", location: "Washington, DC", type: "Full-time", experience: "Senior", salary: { min: 150000, max: 180000 }, companySize: "Enterprise", industry: "FinTech", postedDate: "2024-07-27T11:00:00Z", tags: ["Security", "Penetration Testing", "CISSP"], isFeatured: true, description: "Protect our financial infrastructure from emerging threats.", responsibilities: ["Conduct security audits", "Implement security protocols", "Respond to incidents"], qualifications: ["7+ years in cybersecurity", "CISSP certified", "Experience in financial services"] },
    { id: 12, title: "Technical Writer", company: "DocuTech", logo: "https://tailwindui.com/img/logos/mark.svg?color=yellow&shade=600", location: "Remote", type: "Contract", experience: "Mid-level", salary: { min: 70000, max: 90000 }, companySize: "Startup", industry: "SaaS", postedDate: "2024-07-28T14:00:00Z", tags: ["Documentation", "API Docs", "Technical Writing"], isFeatured: false, description: "Create clear, comprehensive documentation for our developer tools.", responsibilities: ["Write API documentation", "Create tutorials", "Maintain knowledge base"], qualifications: ["3+ years technical writing", "Experience with developer tools", "Excellent writing skills"] },
    { id: 13, title: "QA Engineer", company: "TestLabs", logo: "https://tailwindui.com/img/logos/mark.svg?color=orange&shade=600", location: "Denver, CO", type: "Full-time", experience: "Entry-level", salary: { min: 65000, max: 80000 }, companySize: "Mid-size", industry: "E-commerce", postedDate: "2024-07-29T10:00:00Z", tags: ["Testing", "Selenium", "Automation"], isFeatured: false, description: "Ensure the quality of our e-commerce platform through comprehensive testing.", responsibilities: ["Write automated tests", "Manual testing", "Report bugs"], qualifications: ["1+ years QA experience", "Familiar with testing frameworks", "Detail-oriented"] },
    { id: 14, title: "Product Manager", company: "InnovatePM", logo: "https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500", location: "San Francisco, CA", type: "Full-time", experience: "Senior", salary: { min: 140000, max: 170000 }, companySize: "Startup", industry: "SaaS", postedDate: "2024-07-30T09:00:00Z", tags: ["Product Management", "Roadmap", "Analytics"], isFeatured: true, description: "Drive product strategy and execution for our B2B SaaS platform.", responsibilities: ["Define product roadmap", "Work with engineering", "Analyze user data"], qualifications: ["5+ years product management", "B2B SaaS experience", "Strong analytical skills"] },
    { id: 15, title: "DevRel Engineer", company: "OpenAPI", logo: "https://tailwindui.com/img/logos/mark.svg?color=purple&shade=500", location: "Remote, Global", type: "Full-time", experience: "Mid-level", salary: { min: 100000, max: 125000 }, companySize: "Startup", industry: "Cloud", postedDate: "2024-07-31T12:00:00Z", tags: ["Developer Relations", "Public Speaking", "Community"], isFeatured: false, description: "Build relationships with our developer community and create educational content.", responsibilities: ["Create technical content", "Speak at conferences", "Engage with community"], qualifications: ["3+ years in DevRel or similar", "Strong communication skills", "Technical background"] },
    { id: 16, title: "Machine Learning Engineer", company: "AI Dynamics", logo: "https://tailwindui.com/img/logos/mark.svg?color=cyan&shade=600", location: "Boston, MA", type: "Full-time", experience: "Senior", salary: { min: 155000, max: 185000 }, companySize: "Mid-size", industry: "AI/ML", postedDate: "2024-08-01T08:00:00Z", tags: ["TensorFlow", "Python", "MLOps"], isFeatured: true, description: "Build and deploy machine learning models at scale.", responsibilities: ["Train ML models", "Deploy to production", "Optimize model performance"], qualifications: ["5+ years ML experience", "PhD preferred", "Experience with production ML"] },
    { id: 17, title: "Sales Engineer", company: "SalesForce Pro", logo: "https://tailwindui.com/img/logos/mark.svg?color=teal&shade=600", location: "Chicago, IL", type: "Full-time", experience: "Mid-level", salary: { min: 95000, max: 120000 }, companySize: "Enterprise", industry: "SaaS", postedDate: "2024-08-02T10:00:00Z", tags: ["Sales", "Demos", "Technical Presentations"], isFeatured: false, description: "Work with sales team to provide technical expertise during customer engagements.", responsibilities: ["Deliver product demos", "Answer technical questions", "Support sales process"], qualifications: ["3+ years as sales engineer", "Strong presentation skills", "Technical background"] },
    { id: 18, title: "Database Administrator", company: "DataWorks", logo: "https://tailwindui.com/img/logos/mark.svg?color=gray&shade=500", location: "Atlanta, GA", type: "Full-time", experience: "Senior", salary: { min: 125000, max: 150000 }, companySize: "Enterprise", industry: "FinTech", postedDate: "2024-08-03T11:00:00Z", tags: ["PostgreSQL", "MySQL", "Database Optimization"], isFeatured: false, description: "Manage and optimize our database infrastructure.", responsibilities: ["Maintain databases", "Optimize queries", "Ensure data integrity"], qualifications: ["6+ years DBA experience", "Expert in PostgreSQL", "Experience with large-scale systems"] },
    { id: 19, title: "Scrum Master", company: "AgileTeams", logo: "https://tailwindui.com/img/logos/mark.svg?color=lime&shade=600", location: "Remote", type: "Contract", experience: "Mid-level", salary: { min: 80000, max: 100000 }, companySize: "Mid-size", industry: "SaaS", postedDate: "2024-08-04T09:00:00Z", tags: ["Agile", "Scrum", "Facilitation"], isFeatured: false, description: "Facilitate agile ceremonies and remove blockers for engineering teams.", responsibilities: ["Lead sprint planning", "Remove impediments", "Coach team on agile"], qualifications: ["CSM certified", "3+ years as Scrum Master", "Strong facilitation skills"] },
    { id: 20, title: "Solutions Architect", company: "CloudArch", logo: "https://tailwindui.com/img/logos/mark.svg?color=sky&shade=600", location: "Seattle, WA", type: "Full-time", experience: "Senior", salary: { min: 165000, max: 195000 }, companySize: "Enterprise", industry: "Cloud", postedDate: "2024-08-05T10:00:00Z", tags: ["AWS", "Architecture", "Enterprise Solutions"], isFeatured: true, description: "Design and implement cloud solutions for enterprise customers.", responsibilities: ["Design cloud architectures", "Work with customers", "Create best practices"], qualifications: ["7+ years architecture experience", "AWS certified", "Enterprise experience"] },
];

// --- TYPES ---
type Job = typeof DUMMY_JOBS[0];
type FiltersState = { searchTerm: string; jobType: string; experience: string; salaryRange: { min: number; max: number }; companySize: string[]; industry: string[]; location: string; remoteOnly: boolean; };

// --- HELPER FUNCTIONS ---
const formatSalary = (salary: { min: number; max: number }) => { const format = (num: number) => `$${(num / 1000).toFixed(0)}k`; return `${format(salary.min)} - ${format(salary.max)}`; };
const timeAgo = (date: string) => { const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000); let interval = seconds / 31536000; if (interval > 1) return Math.floor(interval) + " years ago"; interval = seconds / 2592000; if (interval > 1) return Math.floor(interval) + " months ago"; interval = seconds / 86400; if (interval > 1) return Math.floor(interval) + " days ago"; interval = seconds / 3600; if (interval > 1) return Math.floor(interval) + " hours ago"; interval = seconds / 60; if (interval > 1) return Math.floor(interval) + " minutes ago"; return "Just now"; };
const ICONS = {
    search: (props: any) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
    location: (props: any) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    dollar: (props: any) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>,
    briefcase: (props: any) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    chevronDown: (props: any) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>,
    chevronLeft: (props: any) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>,
    chevronRight: (props: any) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>,
    filter: (props: any) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>,
};

// --- UI SUB-COMPONENTS ---

const FilterPill: FC<{ label: string; onRemove: () => void }> = ({ label, onRemove }) => (
    <span className="flex items-center gap-1.5 bg-indigo-100 dark:bg-indigo-500/10 text-indigo-800 dark:text-indigo-300 text-xs font-semibold px-2.5 py-1 rounded-full animate-fade-in">
        {label}
        <button onClick={onRemove} aria-label={`Remove ${label} filter`} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-200 transition-colors">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
        </button>
    </span>
);

const FilterButton: FC<{ label: string; isActive: boolean; onClick: () => void }> = ({ label, isActive, onClick }) => (
    <button onClick={onClick} className={`px-3.5 py-2 text-sm font-semibold rounded-lg border-2 transition-all duration-200 transform hover:scale-105 ${isActive ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-500/50 shadow-sm' : 'bg-white dark:bg-neutral-800 text-gray-700 dark:text-neutral-300 border-gray-200 dark:border-neutral-700 hover:border-gray-300 dark:hover:border-neutral-600'}`}>
        {label}
    </button>
);

const CollapsibleFilterSection: FC<{ title: string; children: ReactNode; defaultOpen?: boolean }> = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="border-b border-gray-200 dark:border-neutral-700">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center py-3 text-left group">
                <h3 className="text-sm font-semibold text-gray-600 dark:text-neutral-400 uppercase tracking-wider group-hover:text-gray-900 dark:group-hover:text-neutral-200 transition-colors">{title}</h3>
                <svg className={`w-5 h-5 text-gray-400 dark:text-neutral-500 transition-transform duration-300 ease-out ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="pb-4 space-y-3">{children}</div>
            </div>
        </div>
    );
};

const SalaryRangeSlider: FC<{ min: number; max: number; step: number; values: { min: number; max: number }; onChange: (values: { min: number; max: number }) => void; }> = ({ min, max, step, values, onChange }) => {
    const [minVal, setMinVal] = useState(values.min);
    const [maxVal, setMaxVal] = useState(values.max);
    const range = useRef<HTMLDivElement>(null);
    const getPercent = useCallback((value: number) => Math.round(((value - min) / (max - min)) * 100), [min, max]);

    useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxVal);
        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minVal, getPercent]);

    useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxVal);
        if (range.current) {
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [maxVal, getPercent]);

    const handleMouseUp = () => { onChange({ min: minVal, max: maxVal }); };

    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700 dark:text-neutral-300">Salary Range</span>
                <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">${(minVal / 1000)}k - ${(maxVal / 1000)}k</span>
            </div>
            <div className="relative h-8 flex items-center">
                <input type="range" min={min} max={max} step={step} value={minVal} onChange={(event) => { const value = Math.min(Number(event.target.value), maxVal - step); setMinVal(value); }} onMouseUp={handleMouseUp} onTouchEnd={handleMouseUp} className="thumb thumb--left" />
                <input type="range" min={min} max={max} step={step} value={maxVal} onChange={(event) => { const value = Math.max(Number(event.target.value), minVal + step); setMaxVal(value); }} onMouseUp={handleMouseUp} onTouchEnd={handleMouseUp} className="thumb thumb--right" />
                <div className="relative w-full h-1">
                    <div className="absolute rounded h-1 bg-gray-200 dark:bg-neutral-700 w-full z-10" />
                    <div ref={range} className="absolute rounded h-1 bg-indigo-500 dark:bg-indigo-600 z-20 transition-all duration-150" />
                </div>
            </div>
        </div>
    );
};

const CheckboxFilterGroup: FC<{ options: string[]; selected: string[]; onChange: (value: string) => void; }> = ({ options, selected, onChange }) => (
    <div className="space-y-2">
        {options.map(option => (
            <label key={option} className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" checked={selected.includes(option)} onChange={() => onChange(option)} className="h-4 w-4 rounded border-gray-300 dark:border-neutral-600 text-indigo-600 dark:text-indigo-500 focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:bg-neutral-800 transition-transform duration-200 group-hover:scale-110" />
                <span className="text-sm text-gray-700 dark:text-neutral-300 group-hover:text-gray-900 dark:group-hover:text-neutral-100 transition-colors">{option}</span>
            </label>
        ))}
    </div>
);

const Filters: FC<{ filters: FiltersState; onFilterChange: (name: keyof FiltersState, value: any) => void; }> = ({ filters, onFilterChange }) => {
    const companySizeOptions = ["Startup", "Mid-size", "Enterprise"];
    const industryOptions = ["SaaS", "FinTech", "HealthTech", "AI/ML", "E-commerce", "Mobile", "Marketing", "Cloud", "Design"];
    const handleCheckboxChange = (filterKey: 'companySize' | 'industry', value: string) => {
        const currentValues = filters[filterKey];
        const newValues = currentValues.includes(value) ? currentValues.filter(v => v !== value) : [...currentValues, value];
        onFilterChange(filterKey, newValues);
    };
    return (
        <div className="divide-y divide-gray-200 dark:divide-neutral-700">
            <CollapsibleFilterSection title="Job Type" defaultOpen>
                <div className="flex flex-wrap gap-2">
                    <FilterButton label="Full-time" isActive={filters.jobType === 'Full-time'} onClick={() => onFilterChange('jobType', filters.jobType === 'Full-time' ? '' : 'Full-time')} />
                    <FilterButton label="Contract" isActive={filters.jobType === 'Contract'} onClick={() => onFilterChange('jobType', filters.jobType === 'Contract' ? '' : 'Contract')} />
                </div>
            </CollapsibleFilterSection>
            <CollapsibleFilterSection title="Experience" defaultOpen>
                <div className="flex flex-wrap gap-2">
                    <FilterButton label="Entry-level" isActive={filters.experience === 'Entry-level'} onClick={() => onFilterChange('experience', filters.experience === 'Entry-level' ? '' : 'Entry-level')} />
                    <FilterButton label="Mid-level" isActive={filters.experience === 'Mid-level'} onClick={() => onFilterChange('experience', filters.experience === 'Mid-level' ? '' : 'Mid-level')} />
                    <FilterButton label="Senior" isActive={filters.experience === 'Senior'} onClick={() => onFilterChange('experience', filters.experience === 'Senior' ? '' : 'Senior')} />
                </div>
            </CollapsibleFilterSection>
            <CollapsibleFilterSection title="Salary" defaultOpen>
                <SalaryRangeSlider min={50000} max={250000} step={5000} values={filters.salaryRange} onChange={(newRange) => onFilterChange('salaryRange', newRange)} />
            </CollapsibleFilterSection>
            <CollapsibleFilterSection title="Company Size">
                <CheckboxFilterGroup options={companySizeOptions} selected={filters.companySize} onChange={(value) => handleCheckboxChange('companySize', value)} />
            </CollapsibleFilterSection>
            <CollapsibleFilterSection title="Industry">
                <CheckboxFilterGroup options={industryOptions} selected={filters.industry} onChange={(value) => handleCheckboxChange('industry', value)} />
            </CollapsibleFilterSection>
            <CollapsibleFilterSection title="Location">
                <div className="relative">
                    <ICONS.location className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-neutral-500" />
                    <input type="text" placeholder="City, state, zip..." value={filters.location} onChange={(e) => onFilterChange('location', e.target.value)} className="w-full h-11 pl-11 pr-4 bg-white dark:bg-neutral-800 border-2 border-gray-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-500/50 outline-none text-gray-900 dark:text-neutral-100 placeholder:text-gray-400 dark:placeholder:text-neutral-500 transition-all" />
                </div>
                <label className="flex items-center gap-2 pt-2 cursor-pointer group">
                    <input type="checkbox" checked={filters.remoteOnly} onChange={(e) => onFilterChange('remoteOnly', e.target.checked)} className="h-4 w-4 rounded border-gray-300 dark:border-neutral-600 text-indigo-600 dark:text-indigo-500 focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:bg-neutral-800 transition-transform duration-200 group-hover:scale-110" />
                    <span className="text-sm text-gray-700 dark:text-neutral-300 group-hover:text-gray-900 dark:group-hover:text-neutral-100 transition-colors">Remote only</span>
                </label>
            </CollapsibleFilterSection>
        </div>
    );
};

const JobCard: FC<{ job: Job; isActive: boolean; onSelect: () => void; }> = ({ job, isActive, onSelect }) => (
    <div onClick={onSelect} className={`group p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 ${isActive ? 'bg-white dark:bg-neutral-950 border-indigo-400 dark:border-indigo-500/50 shadow-lg scale-[1.02]' : 'bg-white dark:bg-neutral-800 border-gray-200 dark:border-neutral-700 hover:border-gray-300 dark:hover:border-neutral-600 hover:shadow-md'}`}>
        <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg flex-shrink-0 bg-white dark:bg-neutral-700 border border-gray-100 dark:border-neutral-600 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <img src={job.logo} alt={`${job.company} logo`} width={40} height={40} className="object-contain" />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                    <h3 className="font-bold text-gray-900 dark:text-neutral-100 text-base truncate transition-colors">{job.title}</h3>
                    {job.isFeatured && <div className="text-xs font-bold text-indigo-700 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-500/10 px-2 py-0.5 rounded-full flex-shrink-0 animate-pulse-slow">Featured</div>}
                </div>
                <p className="text-sm text-gray-600 dark:text-neutral-400 truncate">{job.company}</p>
                <p className="text-xs text-gray-500 dark:text-neutral-500 mt-1 truncate">{job.location}</p>
                <div className="mt-3 flex items-center gap-2 text-xs flex-wrap">
                    <span className="bg-gray-100 dark:bg-neutral-700 text-gray-700 dark:text-neutral-300 px-2 py-1 rounded-md font-medium transition-colors">{job.type}</span>
                    <span className="bg-gray-100 dark:bg-neutral-700 text-gray-700 dark:text-neutral-300 px-2 py-1 rounded-md font-medium transition-colors">{job.experience}</span>
                </div>
            </div>
        </div>
    </div>
);

const JobDetails: FC<{ job: Job | null }> = ({ job }) => {
    if (!job) {
        return (
            <div className="flex items-center justify-center h-full text-gray-500 dark:text-neutral-400 p-8 text-center">
                <div>
                    <h3 className="font-semibold text-lg">Select a job</h3>
                    <p className="text-sm">...to see the details here.</p>
                </div>
            </div>
        );
    }
    return (
        <div className="p-6 lg:p-8 space-y-6 animate-fade-in-up">
            <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-xl flex-shrink-0 bg-white dark:bg-neutral-700 border border-gray-100 dark:border-neutral-600 flex items-center justify-center">
                    <img src={job.logo} alt={`${job.company} logo`} width={56} height={56} className="object-contain" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-neutral-100" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{job.title}</h2>
                    <p className="text-md text-gray-700 dark:text-neutral-300">{job.company} • {job.location}</p>
                    <p className="text-sm text-gray-500 dark:text-neutral-400 mt-1">Posted {timeAgo(job.postedDate)}</p>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <button className="w-full sm:w-auto h-11 px-8 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-semibold rounded-xl transition-all transform hover:scale-105">
                    Apply Now
                </button>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-neutral-400">
                    <div className="flex items-center gap-1.5">
                        <ICONS.dollar className="w-5 h-5 text-gray-400 dark:text-neutral-500" />
                        {formatSalary(job.salary)}
                    </div>
                    <div className="flex items-center gap-1.5">
                        <ICONS.briefcase className="w-5 h-5 text-gray-400 dark:text-neutral-500" />
                        {job.type}
                    </div>
                </div>
            </div>
            <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-neutral-300 leading-relaxed">
                <h3 className="font-bold text-gray-800 dark:text-neutral-200">Job Description</h3>
                <p>{job.description}</p>
                <h3 className="font-bold text-gray-800 dark:text-neutral-200">Responsibilities</h3>
                <ul>{job.responsibilities.map((item, i) => <li key={i}>{item}</li>)}</ul>
                <h3 className="font-bold text-gray-800 dark:text-neutral-200">Qualifications</h3>
                <ul>{job.qualifications.map((item, i) => <li key={i}>{item}</li>)}</ul>
            </div>
            <div className="flex flex-wrap gap-2">
                {job.tags.map(tag => (
                    <span key={tag} className="bg-indigo-100 dark:bg-indigo-500/10 text-indigo-800 dark:text-indigo-300 text-xs font-medium px-2.5 py-1 rounded-full transition-transform hover:scale-105">{tag}</span>
                ))}
            </div>
        </div>
    );
};

// --- MAIN PAGE COMPONENT ---
export default function JobsPage() {
    const [jobs] = useState<Job[]>(DUMMY_JOBS);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const initialFilters: FiltersState = { searchTerm: "", jobType: "", experience: "", salaryRange: { min: 50000, max: 250000 }, companySize: [], industry: [], location: "", remoteOnly: false, };
    const [filters, setFilters] = useState<FiltersState>(initialFilters);
    const [showDetailsMobile, setShowDetailsMobile] = useState(false);
    const [isFilterCollapsed, setIsFilterCollapsed] = useState(false);

    useEffect(() => { setSelectedJob(jobs[0] ?? null); }, [jobs]);

    const handleFilterChange = useCallback((name: keyof FiltersState, value: any) => { setFilters(prev => ({ ...prev, [name]: value })); }, []);
    const handleClearFilters = () => { setFilters(initialFilters); };

    const filteredJobs = useMemo(() => {
        return jobs.filter(job => {
            const f = filters;
            const searchTermMatch = f.searchTerm === "" || job.title.toLowerCase().includes(f.searchTerm.toLowerCase()) || job.company.toLowerCase().includes(f.searchTerm.toLowerCase()) || job.tags.some(tag => tag.toLowerCase().includes(f.searchTerm.toLowerCase()));
            const salaryMatch = job.salary.min <= f.salaryRange.max && job.salary.max >= f.salaryRange.min;
            const companySizeMatch = f.companySize.length === 0 || f.companySize.includes(job.companySize);
            const industryMatch = f.industry.length === 0 || f.industry.includes(job.industry);

            return searchTermMatch && salaryMatch && companySizeMatch && industryMatch &&
                (f.jobType === "" || job.type === f.jobType) &&
                (f.experience === "" || job.experience === f.experience) &&
                (f.location === "" || job.location.toLowerCase().includes(f.location.toLowerCase())) &&
                (!f.remoteOnly || job.location.toLowerCase().includes('remote'));
        });
    }, [jobs, filters]);

    useEffect(() => { if (filteredJobs.length > 0 && (!selectedJob || !filteredJobs.some(j => j.id === selectedJob.id))) { setSelectedJob(filteredJobs[0]); } else if (filteredJobs.length === 0) { setSelectedJob(null); } }, [filteredJobs, selectedJob]);

    const handleSelectJob = (job: Job) => { setSelectedJob(job); if (window.innerWidth < 1024) { setShowDetailsMobile(true); } };

    const getAppliedFilters = () => {
        const applied: { label: string; onRemove: () => void }[] = [];
        if (filters.jobType) applied.push({ label: filters.jobType, onRemove: () => handleFilterChange('jobType', '') });
        if (filters.experience) applied.push({ label: filters.experience, onRemove: () => handleFilterChange('experience', '') });
        if (filters.salaryRange.min > initialFilters.salaryRange.min || filters.salaryRange.max < initialFilters.salaryRange.max) { applied.push({ label: `$${(filters.salaryRange.min / 1000)}k - $${(filters.salaryRange.max / 1000)}k`, onRemove: () => handleFilterChange('salaryRange', initialFilters.salaryRange) }); }
        filters.companySize.forEach(cs => applied.push({ label: cs, onRemove: () => handleFilterChange('companySize', filters.companySize.filter(v => v !== cs)) }));
        filters.industry.forEach(ind => applied.push({ label: ind, onRemove: () => handleFilterChange('industry', filters.industry.filter(v => v !== ind)) }));
        if (filters.location) applied.push({ label: filters.location, onRemove: () => handleFilterChange('location', '') });
        if (filters.remoteOnly) applied.push({ label: "Remote", onRemove: () => handleFilterChange('remoteOnly', false) });
        return applied;
    }
    const appliedFilters = getAppliedFilters();

    return (
        <>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap');
                body { font-family: 'Outfit', sans-serif; }
                .prose ul > li::before { background-color: #6366f1; }
                .dark .prose ul > li::before { background-color: #818cf8; }
                
                /* Custom Range Slider Styles */
                .thumb { pointer-events: all; -webkit-appearance: none; -moz-appearance: none; appearance: none; z-index: 30; height: 0; width: 100%; position: absolute; top: 0; left: 0; background: none; }
                .thumb::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; pointer-events: all; width: 1.25rem; height: 1.25rem; background-color: #fff; border-radius: 9999px; border: 2px solid #6366f1; cursor: pointer; box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1); transition: transform 0.2s; }
                .thumb::-moz-range-thumb { -moz-appearance: none; appearance: none; pointer-events: all; width: 1.25rem; height: 1.25rem; background-color: #fff; border-radius: 9999px; border: 2px solid #6366f1; cursor: pointer; transition: transform 0.2s; }
                .thumb::-webkit-slider-thumb:hover { transform: scale(1.1); }
                .thumb::-moz-range-thumb:hover { transform: scale(1.1); }
                .dark .thumb::-webkit-slider-thumb { background-color: #171717; border-color: #818cf8; }
                .dark .thumb::-moz-range-thumb { background-color: #171717; border-color: #818cf8; }

                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                @keyframes fade-in-up { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes pulse-slow { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
                
                .animate-fade-in { animation: fade-in 0.3s ease-out; }
                .animate-fade-in-up { animation: fade-in-up 0.4s ease-out; }
                .animate-pulse-slow { animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
            `}</style>
            <div className="h-[86dvh] flex bg-gray-50 dark:bg-neutral-950 overflow-hidden rounded-2xl shadow-xl">
                <main className="flex-1 grid grid-cols-1 transition-all duration-300 overflow-hidden" style={{ gridTemplateColumns: isFilterCollapsed ? '0fr 1fr' : '3fr 9fr' }}>
                    {/* Left Column: Filters */}
                    <aside className={`min-h-0 flex flex-col border-r border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 transition-all duration-300 overflow-hidden ${showDetailsMobile ? 'hidden lg:flex' : 'flex'} ${isFilterCollapsed ? 'lg:w-0 lg:border-r-0' : 'lg:w-auto'}`}>
                        <div className={`h-full flex flex-col ${isFilterCollapsed ? 'hidden' : 'flex'}`}>
                            <div className="p-6 flex-shrink-0 border-b border-gray-200 dark:border-neutral-800">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-bold text-gray-800 dark:text-neutral-200 flex items-center gap-2">
                                        <ICONS.filter className="w-5 h-5" />
                                        Filters
                                    </h2>
                                    <button
                                        onClick={() => setIsFilterCollapsed(true)}
                                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-lg transition-all transform hover:scale-110"
                                        aria-label="Hide filters"
                                    >
                                        <ICONS.chevronLeft className="w-5 h-5 text-gray-600 dark:text-neutral-400" />
                                    </button>
                                </div>
                                <input type="text" placeholder="Search by title, keyword..." value={filters.searchTerm} onChange={(e) => handleFilterChange('searchTerm', e.target.value)} className="w-full h-11 pl-4 pr-4 bg-gray-50 dark:bg-neutral-900 border-2 border-gray-200 dark:border-neutral-700 rounded-lg focus:bg-white dark:focus:bg-neutral-800 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-500/50 outline-none text-gray-900 dark:text-neutral-100 placeholder:text-gray-500 dark:placeholder:text-neutral-500 transition-all" />
                            </div>
                            <div className="flex-1 px-6 overflow-y-auto">
                                <Filters filters={filters} onFilterChange={handleFilterChange} />
                            </div>
                            <div className="p-6 flex-shrink-0 border-t border-gray-200 dark:border-neutral-800">
                                <button onClick={handleClearFilters} className="w-full h-10 bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 text-gray-700 dark:text-neutral-300 font-semibold rounded-lg text-sm transition-all transform hover:scale-105">Clear All Filters</button>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <div className="min-h-0 flex flex-col overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden">
                            {/* Center Column: Job List */}
                            <div className={`lg:col-span-5 min-h-0 flex flex-col bg-gray-50 dark:bg-neutral-900 border-r border-gray-200 dark:border-neutral-800 ${showDetailsMobile ? 'hidden lg:flex' : 'flex'}`}>
                                <div className="p-4 border-b border-gray-200 dark:border-neutral-800 flex-shrink-0 space-y-3 bg-gray-50 dark:bg-neutral-900">
                                    <div className="flex items-center justify-between .scrollbar-hide">
                                        <h2 className="font-bold text-gray-800 dark:text-neutral-200">{filteredJobs.length} jobs found</h2>
                                        {isFilterCollapsed && (
                                            <button
                                                onClick={() => setIsFilterCollapsed(false)}
                                                className="flex items-center gap-2 px-3 py-1.5 bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-500/20 transition-all text-sm font-medium transform hover:scale-105"
                                            >
                                                <ICONS.filter className="w-4 h-4" />
                                                Show Filters
                                            </button>
                                        )}
                                    </div>
                                    {appliedFilters.length > 0 && (<div className="flex flex-wrap gap-2">{appliedFilters.map((pill, i) => <FilterPill key={i} {...pill} />)}</div>)}
                                </div>
                                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                                    {filteredJobs.length > 0 ? (
                                        filteredJobs.map(job => <JobCard key={job.id} job={job} isActive={selectedJob?.id === job.id} onSelect={() => handleSelectJob(job)} />)
                                    ) : (
                                        <div className="p-8 text-center text-gray-500 dark:text-neutral-400"><h3 className="font-semibold text-lg">No jobs match your criteria</h3><p className="text-sm">Try removing some filters to see more results.</p></div>
                                    )}
                                </div>
                            </div>

                            {/* Right Column: Job Details */}
                            <div className={`lg:col-span-7 min-h-0 overflow-y-auto bg-white dark:bg-neutral-950 ${showDetailsMobile ? 'flex' : 'hidden lg:flex'} flex-col`}>
                                {showDetailsMobile && (<button onClick={() => setShowDetailsMobile(false)} className="lg:hidden sticky top-0 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-sm p-3 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-neutral-300 z-10 border-b border-gray-200 dark:border-neutral-800"><ICONS.chevronLeft className="w-5 h-5" /> Back to list</button>)}
                                <JobDetails job={selectedJob} />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}