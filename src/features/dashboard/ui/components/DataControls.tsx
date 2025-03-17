import { useState } from 'react';
import { FilterCriteria } from '../../application/dataProcessing';
import { Download } from 'lucide-react';

interface DataControlsProps {
  onFilterChange: (filters: FilterCriteria) => void;
  onExport: () => void;
  assetTypes: string[];
  agencyTypes: string[];
}

export const DataControls = ({
  onFilterChange,
  onExport,
  assetTypes,
  agencyTypes,
}: DataControlsProps) => {
  const [filters, setFilters] = useState<FilterCriteria>({});

  const handleFilterChange = (
    key: keyof FilterCriteria,
    value: string | { start: Date; end: Date } | undefined
  ) => {
    const newFilters = { ...filters, [key]: value };
    if (!value) delete newFilters[key];
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex flex-wrap items-center gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Asset Type
          </label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            onChange={(e) =>
              handleFilterChange(
                'assetType',
                e.target.value || undefined
              )}
            value={filters.assetType || ''}
          >
            <option value="">All Types</option>
            {assetTypes.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Agency Type
          </label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            onChange={(e) =>
              handleFilterChange(
                'agencyType',
                e.target.value || undefined
              )}
            value={filters.agencyType || ''}
          >
            <option value="">All Agencies</option>
            {agencyTypes.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Filter by location..."
            onChange={(e) =>
              handleFilterChange(
                'location',
                e.target.value || undefined
              )}
            value={filters.location || ''}
          />
        </div>

        <div className="ml-auto self-end">
          <button
            onClick={onExport}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </button>
        </div>
      </div>
    </div>
  );
};
