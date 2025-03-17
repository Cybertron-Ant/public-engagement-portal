export interface Submission {
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
  timestamp: {
    toDate: () => Date;
  };
}

export interface DashboardStats {
  totalSubmissions: number;
  submissionsByOption: Record<string, number>;
  latestSubmission?: Date;
}
