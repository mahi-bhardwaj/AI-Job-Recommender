import React from 'react';
import { User } from '../api/apiService';
import { Award, Clock, Hash, List } from 'lucide-react';

interface UserSkillsOverviewProps {
  user: User | null;
}

const UserSkillsOverview: React.FC<UserSkillsOverviewProps> = ({ user }) => {
  if (!user) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
        <p>Select a user to view skills overview</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
          <div className="flex items-center mt-1 text-gray-600">
            <Award className="h-4 w-4 mr-1" />
            <span className="text-sm">{user.primary_focus}</span>
            <Clock className="h-4 w-4 ml-3 mr-1" />
            <span className="text-sm">{user.experience_years} years experience</span>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            <Hash className="h-3.5 w-3.5 mr-1" />
            {user.skills.length} Skills
          </span>
        </div>
      </div>

      <div>
        <div className="flex items-center mb-3">
          <List className="h-4 w-4 text-gray-600 mr-2" />
          <h3 className="font-medium text-gray-900">Current Skills</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {user.skills.map((skill, index) => (
            <span 
              key={index} 
              className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserSkillsOverview;