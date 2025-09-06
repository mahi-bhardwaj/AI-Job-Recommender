import React from 'react';
import { SkillGap } from '../api/apiService';
import { BarChartHorizontal } from 'lucide-react';

interface SkillGapAnalysisProps {
  skillGaps: SkillGap[];
  isLoading: boolean;
}

const SkillGapAnalysis: React.FC<SkillGapAnalysisProps> = ({ skillGaps, isLoading }) => {
  // Helper function to get color based on importance
  const getImportanceColor = (importance: number): string => {
    if (importance >= 0.8) return 'bg-red-500';
    if (importance >= 0.6) return 'bg-orange-500';
    if (importance >= 0.4) return 'bg-yellow-500';
    if (importance >= 0.2) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getImportanceText = (importance: number): string => {
    if (importance >= 0.8) return 'Critical';
    if (importance >= 0.6) return 'High';
    if (importance >= 0.4) return 'Medium';
    if (importance >= 0.2) return 'Moderate';
    return 'Low';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <BarChartHorizontal className="mr-2 text-blue-600 h-5 w-5" />
        <h2 className="text-xl font-semibold">Skill Gap Analysis</h2>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : skillGaps.length > 0 ? (
        <div className="space-y-4">
          {skillGaps.map((gap, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-medium">{gap.skill}</span>
                <span className="text-sm text-gray-600">
                  {getImportanceText(gap.importance)} Priority
                </span>
              </div>
              <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`absolute top-0 left-0 h-full transition-all duration-500 ${getImportanceColor(gap.importance)}`} 
                  style={{ width: `${gap.importance * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500">
                {Math.round(gap.importance * 100)}% market relevance
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-8 text-center text-gray-500">
          <p>No skill gaps identified or select a user to view skill gaps</p>
        </div>
      )}
    </div>
  );
};

export default SkillGapAnalysis;