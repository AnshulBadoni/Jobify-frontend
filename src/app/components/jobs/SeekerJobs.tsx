"use client"
import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('Senior UI/UX Designer');
  const [jobType, setJobType] = useState('Freelancer');
  const [location, setLocation] = useState('Work From Anywhere');

  const jobs = [
    {
      id: 1,
      title: 'Product Designer',
      company: 'Amazon',
      timePosted: '1h ago',
      type: 'Remote work',
      level: 'Expert',
      logo: 'a'
    },
    {
      id: 2,
      title: 'Mobile App Designer',
      company: 'Airbnb',
      timePosted: '18h ago',
      type: 'Remote work',
      level: 'Intermediate',
      logo: 'airbnb'
    },
    {
      id: 3,
      title: 'Sr. Cloud Engineer',
      company: 'Google',
      timePosted: '8h ago',
      type: 'Part time',
      level: 'Expert',
      logo: 'g'
    },
    {
      id: 4,
      title: 'Jr. UI/UX Designer',
      company: 'Netflix',
      timePosted: '3h ago',
      type: 'Remote work',
      level: 'Internship',
      logo: 'n'
    },
    {
      id: 5,
      title: 'Product Designer',
      company: 'Microsoft',
      timePosted: '18h ago',
      type: 'Remote work',
      level: 'Expert',
      logo: 'm'
    },
    {
      id: 6,
      title: 'Quality Assurance',
      company: 'Apple',
      timePosted: '5h ago',
      type: 'Remote work',
      level: 'Expert',
      logo: 'a'
    }
  ];

  const featuredJob = {
    title: 'Senior UI/UX Designer',
    company: 'Microsoft',
    type: 'Freelancer',
    level: 'Expert',
    description: 'We are seeking a talented and highly motivated UI/UX Designer to join our growing team. The ideal candidate will have a strong portfolio of design work and a passion for creating intuitive and visually appealing user experiences.',
    responsibilities: [
      'Collaborate with product management and engineering to define and implement innovative design solutions for the product direction, visuals, and experience',
      'Conduct user research and testing to gather insights and validate design decisions',
      'Continuously iterate and improve upon the design of our products',
      'Stay up-to-date with the latest design trends and techniques'
    ],
    skills: ['Wireframing', 'Figma', 'Adobe XD', 'UI/UX Designer', 'Team work'],
    client: {
      name: 'Microsoft',
      joined: 'January 12, 2016',
      location: 'Surabaya, Indonesia',
      rating: 4.5,
      paymentVerified: true,
      budget: '$65K+ Spend',
      hiring: '20+ hiring people, 5 is active'
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Jobscout - Job Listing</title>
        <meta name="description" content="Find your dream job with Jobscout" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center mr-2">
                  <span className="text-white text-xl font-bold">J</span>
                </div>
                <h1 className="text-xl font-bold text-gray-900">Jobscout</h1>
              </div>
            </div>
            <nav className="flex items-center space-x-8">
              <a href="#" className="text-gray-500 hover:text-gray-900">Home</a>
              <div className="relative group">
                <a href="#" className="text-gray-500 hover:text-gray-900 flex items-center">
                  Product
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
                <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md mt-2 py-1 w-48">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 1</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 2</a>
                </div>
              </div>
              <a href="#" className="text-gray-500 hover:text-gray-900">Promo</a>
              <a href="#" className="text-gray-500 hover:text-gray-900">Contact us</a>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:text-gray-900">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </button>
              <button className="text-gray-500 hover:text-gray-900">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.5L15 14.19l-2.203 2.571L8 14l2.57 2.95L10 21l4.5-4.5 2.57 2.95L22 17h-7z" />
                </svg>
              </button>
              <button className="text-gray-500 hover:text-gray-900 relative">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
              </button>
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                <img className="h-8 w-8 rounded-full" src="/user.jpg" alt="User" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Job title, keywords, or company</label>
                <div className="relative">
                  <input
                    type="text"
                    id="search"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="absolute left-0 inset-y-0 flex items-center pl-3 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-48">
                <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-1">Job type</label>
                <div className="relative">
                  <select
                    id="jobType"
                    className="w-full pl-3 pr-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none"
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                  >
                    <option value="Freelancer">Freelancer</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-48">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <div className="relative">
                  <select
                    id="location"
                    className="w-full pl-3 pr-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    <option value="Work From Anywhere">Work From Anywhere</option>
                    <option value="Remote">Remote</option>
                    <option value="On-site">On-site</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex items-end">
                <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md flex items-center justify-center">
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Job Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap gap-4">
          {['Frontend Dev', 'Frontend Dev', 'Frontend Dev', 'Frontend Dev', 'Frontend Dev', 'Frontend Dev', 'Frontend Dev', 'Frontend Dev'].map((category, index) => (
            <button key={index} className="bg-white border border-gray-300 rounded-md py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50">
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Related Jobs */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-900">Related Jobs</h2>
                  <button className="text-gray-500 hover:text-gray-900">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zM3 16a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" />
                    </svg>
                  </button>
                </div>
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <div key={job.id} className="flex items-start p-4 border border-gray-200 rounded-lg">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                        <span className="text-gray-600 text-lg font-medium">{job.logo}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <h3 className="text-sm font-medium text-gray-900 truncate">{job.title}</h3>
                          <div className="flex items-center">
                            <span className="text-xs text-gray-500 mr-2">{job.timePosted}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 truncate">{job.company}</p>
                        <div className="flex items-center mt-2">
                          <span className="text-xs text-gray-500 mr-2">{job.type}</span>
                          <span className="text-xs text-gray-500">{job.level}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Featured Job */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 h-8 w-8 rounded-md bg-gray-100 flex items-center justify-center mr-3">
                    <div className="h-6 w-6 rounded-sm bg-blue-500"></div>
                  </div>
                  <h1 className="text-xl font-medium text-gray-900">{featuredJob.title}</h1>
                </div>
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 h-8 w-8 rounded-md bg-gray-100 flex items-center justify-center mr-3">
                    <span className="text-gray-600 text-lg font-medium">m</span>
                  </div>
                  <span className="text-gray-500 mr-4">{featuredJob.company}</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2">
                    {featuredJob.type}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {featuredJob.level}
                  </span>
                </div>
                <div className="prose max-w-none">
                  <h2 className="text-lg font-medium text-gray-900 mb-2">Job Description:</h2>
                  <p className="text-gray-600 mb-4">{featuredJob.description}</p>
                  <h2 className="text-lg font-medium text-gray-900 mb-2">Key Responsibilities:</h2>
                  <ul className="list-disc pl-5 mb-4">
                    {featuredJob.responsibilities.map((responsibility, index) => (
                      <li key={index} className="text-gray-600">{responsibility}</li>
                    ))}
                  </ul>
                  <h2 className="text-lg font-medium text-gray-900 mb-2">Required skill:</h2>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featuredJob.skills.map((skill, index) => (
                      <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Client Info */}
            <div className="bg-white rounded-lg shadow overflow-hidden mt-6">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">About Client</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-600 mb-2">Client name</p>
                    <p className="text-gray-900 font-medium">{featuredJob.client.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-2">Joined time</p>
                    <p className="text-gray-900 font-medium">{featuredJob.client.joined}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-2">Location</p>
                    <p className="text-gray-900 font-medium">{featuredJob.client.location}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-2">Other Information</p>
                    <div className="flex items-center">
                      <div className="flex items-center mr-4">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`h-5 w-5 ${i < Math.floor(featuredJob.client.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-600">Payment verified</p>
                    </div>
                    <p className="text-gray-900 font-medium mt-2">{featuredJob.client.budget}</p>
                    <p className="text-gray-600 mt-2">20+ hiring people, 5 is active</p>
                  </div>
                </div>
                <div className="mt-6">
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md flex items-center justify-center">
                    Apply job
                  </button>
                  <button className="w-full bg-white border border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-md flex items-center justify-center mt-4">
                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2v-10a2 2 0 012-2z" />
                    </svg>
                    Save Job
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}