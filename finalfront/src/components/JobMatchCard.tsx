import React from 'react';
import { JobMatch } from '../api/apiService';
import { Briefcase, Users, Percent } from 'lucide-react';

interface JobMatchCardProps {
  jobMatch: JobMatch;
}

const JobMatchCard: React.FC<JobMatchCardProps> = ({ jobMatch }) => {
  const matchPercentage = Math.round(jobMatch.match_score * 100);
  
  const getMatchColor = (score: number): string => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-orange-600';
  };

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-300 overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <Briefcase className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{jobMatch.title}</h3>
              <div className="flex items-center text-sm text-gray-600">
                <Users className="h-3.5 w-3.5 mr-1" />
                <span>{jobMatch.company}</span>
              </div>
            </div>
          </div>

          <div className={`flex items-center ${getMatchColor(matchPercentage)}`}>
            <Percent className="h-4 w-4 mr-1" />
            <span className="font-bold">{matchPercentage}%</span>
          </div>
        </div>

        <div className="mt-4">
          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`absolute top-0 left-0 h-full transition-all duration-500 ${
                matchPercentage >= 80 
                  ? 'bg-green-500' 
                  : matchPercentage >= 60 
                    ? 'bg-blue-500' 
                    : matchPercentage >= 40 
                      ? 'bg-yellow-500' 
                      : 'bg-orange-500'
              }`} 
              style={{ width: `${matchPercentage}%` }}
            ></div>
          </div>

          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>Match Score</span>
            <span>{matchPercentage}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobMatchCard;