export type AgencyType = 'government' | 'ngo' | 'council';

export type AssetType = 'road' | 'stoplight' | 'building' | 'bridge' | 'park' | 'other';

export interface FormData {
  agency: {
    type: AgencyType;
    name: string;
  };
  asset: {
    type: AssetType;
    details: string;
  };
  description: string;
  files: File[];
  location?: string;
}

export interface FormState {
  data: FormData;
  isSubmitting: boolean;
  error: string | null;
  isOffline: boolean;
}

export interface FormSubmissionResponse {
  success: boolean;
  error?: string;
  submissionId?: string;
}

export const DEFAULT_FORM_DATA: FormData = {
  agency: {
    type: 'government',
    name: '',
  },
  asset: {
    type: 'road',
    details: '',
  },
  description: '',
  files: [] as File[],
};

export interface OfflineSubmission {
  data: FormData;
  timestamp: number;
  pendingSync: boolean;
}
