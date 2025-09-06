import React from 'react';
import { PieChart, Lightbulb } from 'lucide-react';

interface SkillRecommendationsProps {
  marketRecommendations: string[];
  collaborativeRecommendations: string[];
  analysisText: string;
  isLoading: boolean;
}

const SkillRecommendations: React.FC<SkillRecommendationsProps> = ({
  marketRecommendations,
  collaborativeRecommendations,
  analysisText,
  isLoading
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <Lightbulb className="mr-2 text-yellow-500 h-5 w-5" />
        <h2 className="text-xl font-semibold">Skill Recommendations</h2>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <PieChart className="h-4 w-4 text-blue-600 mr-2" />
                <h3 className="font-medium text-gray-900">Market Recommendations</h3>
              </div>
              {marketRecommendations.length > 0 ? (
                <ul className="space-y-2">
                  {marketRecommendations.map((skill, index) => (
                    <li key={index} className="flex items-center">
                      <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">No market recommendations available</p>
              )}
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <PieChart className="h-4 w-4 text-green-600 mr-2" />
                <h3 className="font-medium text-gray-900">Collaborative Recommendations</h3>
              </div>
              {collaborativeRecommendations.length > 0 ? (
                <ul className="space-y-2">
                  {collaborativeRecommendations.map((skill, index) => (
                    <li key={index} className="flex items-center">
                      <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">No collaborative recommendations available</p>
              )}
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-medium text-blue-800 mb-2">Analysis Insights</h3>
            {analysisText ? (
              <div className="text-blue-700 text-sm whitespace-pre-line">
                {analysisText}
              </div>
            ) : (
              <p className="text-blue-700 text-sm">No analysis insights available</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SkillRecommendations;