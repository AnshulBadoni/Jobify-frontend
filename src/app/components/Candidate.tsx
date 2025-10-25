"use client";
import React, { useState } from "react";

interface Candidate {
  id: number;
  name: string;
  avatar?: string;
  match?: string; // e.g., "92%"
  location?: string;
  experience?: string; // optional extra detail
  status?: "available" | "interviewing" | "hired" | "rejected"; // Added status for better visualization
  skills?: string[]; // Added skills for more professional representation
}

interface CandidateContainerProps {
  title: string;
  candidates: Candidate[];
  onCandidateSelect?: (candidate: Candidate) => void; // Added callback for interaction
}

export default function CandidateContainer({
  title,
  candidates,
  onCandidateSelect
}: CandidateContainerProps) {
  const [activeCandidate, setActiveCandidate] = useState<number | null>(null);

  const handleCandidateClick = (candidate: Candidate) => {
    setActiveCandidate(candidate.id);
    onCandidateSelect?.(candidate);
  };

  const statusColors = {
    available: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    interviewing: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    hired: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    rejected: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
  };

  return (
    <div className="rounded-xl bg-white dark:bg-neutral-900 p-6 shadow-sm border border-gray-200 dark:border-neutral-800">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-neutral-800 px-2.5 py-1 rounded-full">
          {candidates.length} candidates
        </span>
      </div>

      <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent scrollbar-thumb-rounded-full">
        {candidates.map((candidate) => (
          <div
            key={candidate.id}
            onClick={() => handleCandidateClick(candidate)}
            className={`min-w-[240px] flex-shrink-0 bg-white dark:bg-neutral-900 rounded-xl border transition-all duration-200 cursor-pointer p-4 flex flex-col ${activeCandidate === candidate.id
                ? "border-blue-500 shadow-md dark:border-blue-400"
                : "border-gray-200 dark:border-neutral-800 hover:border-gray-300 dark:hover:border-neutral-700"
              }`}
          >
            <div className="flex items-start justify-between mb-3">
              {candidate.avatar ? (
                <img
                  src={candidate.avatar}
                  alt={candidate.name}
                  className="w-14 h-14 rounded-lg object-cover"
                />
              ) : (
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 flex items-center justify-center text-blue-600 dark:text-blue-300 text-xl font-semibold">
                  {candidate.name.charAt(0)}
                </div>
              )}

              {candidate.status && (
                <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusColors[candidate.status]}`}>
                  {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                </span>
              )}
            </div>

            <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-1">{candidate.name}</h3>

            <div className="mt-2 space-y-1.5">
              {candidate.location && (
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {candidate.location}
                </div>
              )}

              {candidate.experience && (
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {candidate.experience}
                </div>
              )}
            </div>

            {candidate.skills && candidate.skills.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {candidate.skills.slice(0, 3).map((skill, index) => (
                  <span key={index} className="text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                    {skill}
                  </span>
                ))}
                {candidate.skills.length > 3 && (
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    +{candidate.skills.length - 3} more
                  </span>
                )}
              </div>
            )}

            {candidate.match && (
              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-neutral-800">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="text-gray-500 dark:text-gray-400">Match score</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">{candidate.match}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-neutral-700 rounded-full h-1.5">
                  <div
                    className="bg-blue-600 h-1.5 rounded-full"
                    style={{ width: candidate.match }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
// https://img39.pixhost.to/images/366/138313539_sz2375_018.jpg taylee wood
