interface DashboardSummaryProps {
  totalSubmissions: number;
  latestSubmission?: Date;
  submissionsByType: Record<string, number>;
}

export const DashboardSummary = ({ 
  totalSubmissions, 
  latestSubmission,
  submissionsByType 
}: DashboardSummaryProps) => {
  const totalAssetTypes = Object.keys(submissionsByType).length;
  const mostCommonType = Object.entries(submissionsByType)
    .sort(([,a], [,b]) => b - a)[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Total Submissions</h3>
        <p className="mt-2 text-3xl font-bold text-gray-900">{totalSubmissions}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Latest Submission</h3>
        <p className="mt-2 text-3xl font-bold text-gray-900">
          {latestSubmission 
            ? latestSubmission.toLocaleDateString() 
            : 'No submissions'}
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Asset Types</h3>
        <p className="mt-2 text-3xl font-bold text-gray-900">{totalAssetTypes}</p>
        <p className="mt-1 text-sm text-gray-500">Different types recorded</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Most Common Asset</h3>
        {mostCommonType ? (
          <>
            <p className="mt-2 text-3xl font-bold text-gray-900 capitalize">
              {mostCommonType[0]}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {mostCommonType[1]} submissions
            </p>
          </>
        ) : (
          <p className="mt-2 text-gray-500">No data available</p>
        )}
      </div>
    </div>
  );
};
