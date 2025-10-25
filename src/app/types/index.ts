export interface Job {
    id: number;
    title: string;
    company: string;
    type: string;
    location: string;
    date: string;
    tags: string[];
    color: string;
    salary?: string;
    companyIcon: string;
}