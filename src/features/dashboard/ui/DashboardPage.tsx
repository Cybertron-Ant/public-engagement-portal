import { useState, useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { useVisibilityStore } from "../../../features/shared/store/visibilityStore";
import { db } from "../../../infrastructure/firebase";
import type { DashboardStats } from "../domain/types";
import { DashboardSummary } from "./components/DashboardSummary";
import { SubmissionsBarChart } from "./components/SubmissionsBarChart";
import { SubmissionsTable } from "./components/SubmissionsTable";
import { DataControls } from "./components/DataControls";
import { MonthlyTrendLineChart } from "./components/MonthlyTrendLineChart";
import { FilterCriteria, filterSubmissions, processSubmissionsForExport, exportToCSV, downloadCSV } from "../application/dataProcessing";

interface Submission {
  id: string;
  userId: string;
  data: {
    agency: {
      type: string;
      name: string;
    };
    asset: {
      type: string;
      details: string;
    };
    description: string;
    location?: string;
  };
  files: string[];
  timestamp: any;
}

interface PublicSettings {
  isPublicDataEnabled: boolean;
}

export default function DashboardPage() {
  const { userId } = useAuth();
  const { user } = useUser();
  const [allSubmissions, setAllSubmissions] = useState<Submission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<Submission[]>([]);
  const { isPublicDataEnabled, initialize } = useVisibilityStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    totalSubmissions: 0,
    submissionsByOption: {},
  });

  const isAdmin = user?.publicMetadata?.role === 'admin';
  const isOrganization = user?.publicMetadata?.role === 'organization';
  const isPublic = !isAdmin && !isOrganization;

  useEffect(() => {
    initialize(); // Initialize visibility state
  }, [initialize]);

  // Fetch submissions
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch submissions
        const submissionsRef = collection(db, "submissions");
        const q = query(
          submissionsRef,
          orderBy("timestamp", "desc")
        );

        const querySnapshot = await getDocs(q);
        const submissionsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Submission[];

        setAllSubmissions(submissionsData);
        setFilteredSubmissions(submissionsData);
        
        // Calculate stats
        const submissionsByOption = submissionsData.reduce((acc, submission) => {
          const option = submission.data.asset.type;
          acc[option] = (acc[option] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        setStats({
          totalSubmissions: submissionsData.length,
          latestSubmission: submissionsData[0]?.timestamp?.toDate(),
          submissionsByOption,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };

      // Only fetch if data is public or user is admin/org
      if (isPublicDataEnabled || !isPublic) {
        fetchData();
      } else {
        setIsLoading(false);
      }
    }, [isPublic, isPublicDataEnabled]);

  const handleFilterChange = (filters: FilterCriteria) => {
    const filtered = filterSubmissions(allSubmissions, filters);
    setFilteredSubmissions(filtered);
    
    // Update stats for filtered data
    const submissionsByOption = filtered.reduce((acc, submission) => {
      const option = submission.data.asset.type;
      acc[option] = (acc[option] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    setStats({
      totalSubmissions: filtered.length,
      latestSubmission: filtered[0]?.timestamp?.toDate(),
      submissionsByOption,
    });
  };

  const handleExport = () => {
    const processedData = processSubmissionsForExport(filteredSubmissions);
    const csv = exportToCSV(processedData);
    downloadCSV(csv, `submissions-export-${new Date().toISOString().split('T')[0]}.csv`);
  };

  // Get unique asset and agency types for filters
  const assetTypes = [...new Set(allSubmissions.map(s => s.data.asset.type))];
  const agencyTypes = [...new Set(allSubmissions.map(s => s.data.agency.type))];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Show message for public users when data is private
  if (isPublic && !isPublicDataEnabled) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-yellow-800 mb-2">Data is Currently Private</h2>
          <p className="text-yellow-600">Check back later when administrators make the data publicly available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className={`text-sm font-medium ${isPublicDataEnabled ? 'text-green-600' : 'text-gray-500'}`}>
          {isPublicDataEnabled ? 'Data is Public' : 'Data is Private'}
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Data Controls */}
      <DataControls
        onFilterChange={handleFilterChange}
        onExport={handleExport}
        assetTypes={assetTypes}
        agencyTypes={agencyTypes}
      />

      {/* Summary Cards */}
      <DashboardSummary 
        totalSubmissions={stats.totalSubmissions}
        latestSubmission={stats.latestSubmission}
        submissionsByType={stats.submissionsByOption}
      />

      {/* Charts Section */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Submissions by Asset Type</h2>
          <SubmissionsBarChart data={stats.submissionsByOption} />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Monthly Trend</h2>
          <MonthlyTrendLineChart data={{ Jan: 10, Feb: 20, Mar: 15 }} />
        </div>
      </div>

      {/* Submissions Table */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Submissions</h2>
        <SubmissionsTable data={filteredSubmissions} />
      </div>
    </div>
  );
}
