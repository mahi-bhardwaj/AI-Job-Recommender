import axios from "axios";

const baseURL = "http://127.0.0.1:5000/api";

export interface User {
  id: number;
  name: string;
  skills: string[];
  primary_focus: string;
  experience_years: number;
}

export interface Job {
  id: number;
  title: string;
  company: string;
  skills: string[];
  role_type: string;
}

export interface JobMatch {
  id: number;
  title: string;
  company: string;
  match_score: number;
}

export interface SkillGap {
  skill: string;
  importance: number;
}

export interface RecommendationResponse {
  market_recommendations: string[];
  collaborative_recommendations: string[];
  analysis: string;
  job_matches: JobMatch[];
}

export interface SkillGapsResponse {
  skill_gaps: SkillGap[];
}

export interface StatusResponse {
  status: "ready" | "not_initialized";
  users_count?: number;
  jobs_count?: number;
  message?: string;
}

const apiService = {
  getUsers: async (): Promise<User[]> => {
    const response = await axios.get(`${baseURL}/users`);
    return response.data;
  },

  getJobs: async (): Promise<Job[]> => {
    const response = await axios.get(`${baseURL}/jobs`);
    return response.data;
  },

  getStatus: async (): Promise<StatusResponse> => {
    const response = await axios.get(`${baseURL}/status`);
    return response.data;
  },

  getRecommendations: async (
    userId: number,
  ): Promise<RecommendationResponse> => {
    const response = await axios.post(`${baseURL}/recommend-skills`, {
      user_id: userId,
    });
    return response.data;
  },

  getSkillGaps: async (userId: number): Promise<SkillGapsResponse> => {
    const response = await axios.post(`${baseURL}/analyze-skill-gaps`, {
      user_id: userId,
    });
    return response.data;
  },

  refreshRecommender: async (): Promise<{
    status: string;
    message: string;
    has_data: boolean;
  }> => {
    const response = await axios.post(`${baseURL}/refresh-recommender`);
    return response.data;
  },

  uploadUsers: async (
    file: File,
  ): Promise<{ status: string; message: string }> => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post(`${baseURL}/upload-users`, formData);
    return response.data;
  },

  uploadJobs: async (
    file: File,
  ): Promise<{ status: string; message: string }> => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post(`${baseURL}/upload-jobs`, formData);
    return response.data;
  },
};

export default apiService;
