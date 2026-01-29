"use client";
import React, { useEffect, useRef, useState } from 'react';
import {
  Search,
  X,
  ArrowUp,
  ArrowDown,
  CornerDownLeft,
  Briefcase,
  Building2,
  Users,
  MoreHorizontal,
  PieChart,
  CheckCircle2,
  Clock,
  XCircle,
  Trophy
} from 'lucide-react';
import { RECENT_CANDIDATES, ACTIVE_JOBS, FEATURED_COMPANIES } from '../constant';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      // Reset selection when opening
      setSelectedIndex(0);
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev < 10 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === 'Enter') {
        // Handle selection logic here
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      className={`
        fixed inset-0 z-[60] flex items-start justify-center 
        md:pt-[10vh] md:px-4 
        transition-all duration-300 ease-in-out
        ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
      `}
      aria-hidden={!isOpen}
    >
      {/* Backdrop */}
      <div
        className={`
          absolute inset-0 bg-neutral-900/40 backdrop-blur-sm 
          transition-opacity duration-300
          ${isOpen ? 'opacity-100' : 'opacity-0'}
        `}
        onClick={onClose}
      />

      {/* Modal Content - Full Screen on Mobile, Rounded Modal on Desktop */}
      <div className={`
        relative w-full md:max-w-2xl bg-white dark:bg-neutral-900 
        h-full md:h-auto md:max-h-[80vh] md:rounded-2xl shadow-2xl overflow-hidden 
        border-none md:border border-neutral-200 dark:border-neutral-700 flex flex-col 
        transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]
        ${isOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 md:-translate-y-4 translate-y-4 opacity-0'}
      `}>

        {/* Search Header */}
        <div className="flex items-center gap-3 p-4 border-b border-neutral-100 dark:border-neutral-800 shrink-0 pt-safe-top">
          <Search className="w-6 h-6 text-emerald-600 dark:text-emerald-500" strokeWidth={2.5} />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 text-lg md:text-xl text-neutral-900 dark:text-white placeholder-neutral-400 bg-transparent border-none focus:outline-none focus:ring-0"
            placeholder="Search..."
            tabIndex={isOpen ? 0 : -1}
          />
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full text-neutral-400 transition-colors"
            tabIndex={isOpen ? 0 : -1}
          >
            <span className="md:hidden text-sm font-medium text-neutral-500">Cancel</span>
            <XCircle size={20} className="hidden md:block fill-neutral-200 dark:fill-neutral-700 text-neutral-500 dark:text-neutral-400" />
          </button>
        </div>

        {/* Helper Bar (Desktop Only) */}
        <div className="hidden md:flex items-center justify-between px-4 py-2 bg-neutral-50 dark:bg-neutral-800/50 border-b border-neutral-100 dark:border-neutral-800 text-xs text-neutral-500 dark:text-neutral-400 shrink-0">
          <div className="flex items-center gap-2">
            <span>Navigate</span>
            <div className="flex gap-1">
              <kbd className="px-1.5 py-0.5 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded shadow-sm text-[10px]"><ArrowUp size={10} /></kbd>
              <kbd className="px-1.5 py-0.5 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded shadow-sm text-[10px]"><ArrowDown size={10} /></kbd>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span>Close</span>
            <kbd className="px-1.5 py-0.5 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded shadow-sm font-medium">esc</kbd>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex gap-2 p-4 pb-2 shrink-0 overflow-x-auto no-scrollbar">
          <FilterChip icon={Briefcase} label="Jobs" active />
          <FilterChip icon={Users} label="Candidates" />
          <FilterChip icon={Building2} label="Companies" />
          <FilterChip icon={MoreHorizontal} label="More" />
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-4 pt-2 space-y-6 scrollbar-thin scrollbar-thumb-neutral-200 dark:scrollbar-thumb-neutral-700 pb-24 md:pb-4">

          {/* Candidates Section */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Candidates</span>
              <span className="px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 text-[10px] font-bold rounded-full">{RECENT_CANDIDATES.length}</span>
            </div>
            <div className="space-y-1">
              {RECENT_CANDIDATES.map((candidate, idx) => (
                <div
                  key={candidate.id}
                  className={`group flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${idx === selectedIndex ? 'bg-neutral-100 dark:bg-neutral-800' : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                    }`}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <div className="flex items-center gap-3">
                    <img src={candidate.avatarUrl} alt={candidate.name} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <div className="text-sm font-medium text-neutral-900 dark:text-white flex items-center gap-2">
                        {candidate.name}
                        <span className="text-neutral-400 dark:text-neutral-500 font-normal">{candidate.handle}</span>
                      </div>
                      <div className="text-xs text-neutral-500 dark:text-neutral-400">{candidate.role}</div>
                    </div>
                  </div>
                  {idx === selectedIndex && (
                    <div className="hidden md:flex items-center gap-2 text-xs text-neutral-400 animate-in fade-in duration-200">
                      Select <CornerDownLeft size={14} />
                    </div>
                  )}
                </div>
              ))}
              <button className="text-xs font-medium text-emerald-600 dark:text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 mt-2 ml-2 flex items-center gap-1">
                Show more <ArrowDown size={12} />
              </button>
            </div>
          </section>

          {/* Active Jobs Section */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Active Jobs</span>
              <span className="px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 text-[10px] font-bold rounded-full">{ACTIVE_JOBS.length}</span>
            </div>
            <div className="space-y-2">
              {ACTIVE_JOBS.map((job: any) => (
                <div key={job.id} className="flex items-center justify-between p-3 border border-neutral-100 dark:border-neutral-800 rounded-xl hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors cursor-pointer group bg-white dark:bg-neutral-900">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                      <Briefcase size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">{job.title}</h4>
                        <span className="text-xs text-neutral-400">{job.idNumber}</span>
                      </div>
                      <StatusBadge status={job.status} />
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">{job.company}</div>
                    <div className="flex items-center justify-end gap-1 text-xs font-semibold text-neutral-700 dark:text-neutral-200">
                      <PieChart size={14} className="text-amber-500" /> {job.matchScore}% Match
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Companies Grid */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Featured Companies</span>
              <span className="px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 text-[10px] font-bold rounded-full">{FEATURED_COMPANIES.length}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {FEATURED_COMPANIES.map((company: any) => {
                const Icon = company.logo;
                return (
                  <button key={company.id} className="flex items-center gap-3 p-3 rounded-xl border border-neutral-100 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-600 hover:shadow-sm bg-white dark:bg-neutral-900 transition-all text-left">
                    <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-500 dark:text-neutral-400">
                      <Icon size={18} />
                    </div>
                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200 truncate">{company.name}</span>
                  </button>
                );
              })}
            </div>
          </section>

        </div>

      </div>
    </div>
  );
};

// Helper Components

const FilterChip = ({ icon: Icon, label, active }: { icon: any, label: string, active?: boolean }) => (
  <button className={`
      flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors whitespace-nowrap
      ${active
      ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
      : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'}
   `}>
    <Icon size={14} />
    {label}
  </button>
);

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    'Applied': 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400',
    'Interviewing': 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    'Offer': 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
    'Rejected': 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400'
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${styles[status] || styles['Applied']}`}>
      {status === 'Offer' && <Trophy size={10} />}
      {status === 'Interviewing' && <Clock size={10} />}
      {status}
    </span>
  );
};