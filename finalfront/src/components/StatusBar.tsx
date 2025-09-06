import React, { useRef } from 'react';
import { Database, RefreshCcw, Upload } from 'lucide-react';
import { StatusResponse } from '../api/apiService';

interface StatusBarProps {
  status: StatusResponse | null;
  onRefreshData: () => void;
  isRefreshing: boolean;
  onUploadUsers: (file: File) => void;
  onUploadJobs: (file: File) => void;
}

const StatusBar: React.FC<StatusBarProps> = ({ 
  status, 
  onRefreshData, 
  isRefreshing,
  onUploadUsers,
  onUploadJobs 
}) => {
  const usersInputRef = useRef<HTMLInputElement>(null);
  const jobsInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    uploadHandler: (file: File) => void
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadHandler(file);
    }
  };

  return (
    <div className="bg-white border-t border-gray-200 py-3 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Database className="h-4 w-4 text-gray-500 mr-2" />
            <span className="text-sm text-gray-600">
              {status ? (
                status.status === 'ready' ? (
                  <>
                    <span className="text-green-600 font-medium">Connected</span>
                    {' • '}
                    <span>{status.users_count} Users</span>
                    {' • '}
                    <span>{status.jobs_count} Jobs</span>
                  </>
                ) : (
                  <span className="text-orange-600 font-medium">{status.message}</span>
                )
              ) : (
                <span className="text-gray-600">Checking connection...</span>
              )}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <input
            type="file"
            ref={usersInputRef}
            className="hidden"
            accept=".json"
            onChange={(e) => handleFileChange(e, onUploadUsers)}
          />
          <button
            onClick={() => usersInputRef.current?.click()}
            className="text-sm flex items-center px-3 py-1 rounded bg-green-50 text-green-600 hover:bg-green-100"
          >
            <Upload className="h-3.5 w-3.5 mr-1" />
            Upload Users
          </button>

          <input
            type="file"
            ref={jobsInputRef}
            className="hidden"
            accept=".json"
            onChange={(e) => handleFileChange(e, onUploadJobs)}
          />
          <button
            onClick={() => jobsInputRef.current?.click()}
            className="text-sm flex items-center px-3 py-1 rounded bg-purple-50 text-purple-600 hover:bg-purple-100"
          >
            <Upload className="h-3.5 w-3.5 mr-1" />
            Upload Jobs
          </button>
          
          <button
            onClick={onRefreshData}
            disabled={isRefreshing}
            className={`text-sm flex items-center px-3 py-1 rounded ${
              isRefreshing 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
            }`}
          >
            <RefreshCcw className={`h-3.5 w-3.5 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;