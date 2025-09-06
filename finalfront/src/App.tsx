import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import UserSelector from "./components/UserSelector";
import UserSkillsOverview from "./components/UserSkillsOverview";
import SkillRecommendations from "./components/SkillRecommendations";
import SkillGapAnalysis from "./components/SkillGapAnalysis";
import JobMatches from "./components/JobMatches";
import StatusBar from "./components/StatusBar";
import apiService, {
  User,
  JobMatch,
  SkillGap,
  StatusResponse,
  RecommendationResponse,
} from "./api/apiService";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [apiStatus, setApiStatus] = useState<StatusResponse | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Results state
  const [marketRecommendations, setMarketRecommendations] = useState<string[]>(
    [],
  );
  const [collaborativeRecommendations, setCollaborativeRecommendations] =
    useState<string[]>([]);
  const [analysisText, setAnalysisText] = useState("");
  const [jobMatches, setJobMatches] = useState<JobMatch[]>([]);
  const [skillGaps, setSkillGaps] = useState<SkillGap[]>([]);

  // Fetch API status
  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const status = await apiService.getStatus();
        setApiStatus(status);
      } catch (error) {
        console.error("Error checking API status:", error);
        setApiStatus({
          status: "not_initialized",
          message: "Could not connect to API",
        });
      }
    };

    checkApiStatus();
    const interval = setInterval(checkApiStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSelectUser = async (selectedUser: User) => {
    setUser(selectedUser);
    setIsLoading(true);

    try {
      // Get recommendations
      const recommendations = await apiService.getRecommendations(
        selectedUser.id,
      );
      setMarketRecommendations(recommendations.market_recommendations);
      setCollaborativeRecommendations(
        recommendations.collaborative_recommendations,
      );
      setAnalysisText(recommendations.analysis);
      setJobMatches(recommendations.job_matches);

      // Get skill gaps
      const gaps = await apiService.getSkillGaps(selectedUser.id);
      setSkillGaps(gaps.skill_gaps);
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Handle error state here
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefreshData = async () => {
    setIsRefreshing(true);
    try {
      await apiService.refreshRecommender();
      const status = await apiService.getStatus();
      setApiStatus(status);
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleFileUpload = async (type: "users" | "jobs", file: File) => {
    try {
      if (type === "users") {
        await apiService.uploadUsers(file);
      } else {
        await apiService.uploadJobs(file);
      }
      await handleRefreshData();
    } catch (error) {
      console.error(`Error uploading ${type} data:`, error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <UserSelector
              onSelectUser={handleSelectUser}
              selectedUserId={user?.id || null}
            />
          </div>

          <div className="md:col-span-2 space-y-6">
            <UserSkillsOverview user={user} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SkillRecommendations
                marketRecommendations={marketRecommendations}
                collaborativeRecommendations={collaborativeRecommendations}
                analysisText={analysisText}
                isLoading={isLoading}
              />

              <SkillGapAnalysis skillGaps={skillGaps} isLoading={isLoading} />
            </div>

            <JobMatches jobMatches={jobMatches} isLoading={isLoading} />
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0">
        <StatusBar
          status={apiStatus}
          onRefreshData={handleRefreshData}
          isRefreshing={isRefreshing}
          onUploadUsers={(file) => handleFileUpload("users", file)}
          onUploadJobs={(file) => handleFileUpload("jobs", file)}
        />
      </footer>
    </div>
  );
}

export default App;

