import { Submission } from '../domain/types';

export interface FilterCriteria {
  assetType?: string;
  agencyType?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  location?: string;
}

export interface SortConfig {
  field: keyof Submission | 'asset.type' | 'agency.type';
  direction: 'asc' | 'desc';
}

export const filterSubmissions = (
  submissions: Submission[],
  criteria: FilterCriteria
): Submission[] => {
  return submissions.filter(submission => {
    let matches = true;

    if (criteria.assetType) {
      matches = matches && submission.data.asset.type === criteria.assetType;
    }

    if (criteria.agencyType) {
      matches = matches && submission.data.agency.type === criteria.agencyType;
    }

    if (criteria.dateRange) {
      const submissionDate = submission.timestamp.toDate();
      matches = matches && 
        submissionDate >= criteria.dateRange.start &&
        submissionDate <= criteria.dateRange.end;
    }

    if (criteria.location) {
      matches = matches && (
        submission.data.location?.toLowerCase().includes(criteria.location.toLowerCase()) ?? false
      );
    }

    return matches;
  });
};

export const sortSubmissions = (
  submissions: Submission[],
  { field, direction }: SortConfig
): Submission[] => {
  return [...submissions].sort((a, b) => {
    let valueA: any;
    let valueB: any;

    // Handle nested fields
    if (field === 'asset.type') {
      valueA = a.data.asset.type;
      valueB = b.data.asset.type;
    } else if (field === 'agency.type') {
      valueA = a.data.agency.type;
      valueB = b.data.agency.type;
    } else if (field === 'timestamp') {
      valueA = a.timestamp.toDate();
      valueB = b.timestamp.toDate();
    } else {
      valueA = a[field];
      valueB = b[field];
    }

    if (valueA < valueB) return direction === 'asc' ? -1 : 1;
    if (valueA > valueB) return direction === 'asc' ? 1 : -1;
    return 0;
  });
};

export const processSubmissionsForExport = (
  submissions: Submission[]
): Record<string, any>[] => {
  return submissions.map(submission => ({
    id: submission.id,
    date: submission.timestamp.toDate().toISOString(),
    agencyType: submission.data.agency.type,
    agencyName: submission.data.agency.name,
    assetType: submission.data.asset.type,
    assetDetails: submission.data.asset.details,
    description: submission.data.description,
    location: submission.data.location || 'N/A',
    numberOfFiles: submission.files.length
  }));
};

export const exportToCSV = (data: Record<string, any>[]): string => {
  if (data.length === 0) return '';

  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        let cell = row[header]?.toString() || '';
        // Escape quotes and wrap in quotes if contains comma
        if (cell.includes(',') || cell.includes('"')) {
          cell = `"${cell.replace(/"/g, '""')}"`;
        }
        return cell;
      }).join(',')
    )
  ];

  return csvRows.join('\n');
};

export const downloadCSV = (csv: string, filename: string): void => {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const nav = navigator as Navigator & { msSaveBlob?: (blob: Blob, filename: string) => void };
  if (nav.msSaveBlob) {
    // IE 10+
    nav.msSaveBlob(blob, filename);
  } else {
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
