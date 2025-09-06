import React from 'react';
import { JobMatch } from '../api/apiService';
import JobMatchCard from './JobMatchCard';
import { CheckCircle as CircleCheck } from 'lucide-react';

interface JobMatchesProps {
  jobMatches: JobMatch[];
  isLoading: boolean;
}

const JobMatches: React.FC<JobMatchesProps> = ({ jobMatches, isLoading }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <CircleCheck className="mr-2 text-green-600 h-5 w-5" />
        <h2 className="text-xl font-semibold">Top Job Matches</h2>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : jobMatches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobMatches.map((jobMatch) => (
            <JobMatchCard key={jobMatch.id} jobMatch={jobMatch} />
          ))}
        </div>
      ) : (
        <div className="py-8 text-center text-gray-500">
          <p>No job matches found or select a user to view matches</p>
        </div>
      )}
    </div>
  );
};

export default JobMatches;