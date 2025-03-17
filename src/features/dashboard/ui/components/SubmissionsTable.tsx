import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { useState } from 'react';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { motionVariants } from '@/lib/motion';

const MotionTh = motion.th;
const MotionTr = motion.tr;
const MotionTd = motion.td;

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

interface SubmissionsTableProps {
  data: Submission[];
}

const columnHelper = createColumnHelper<Submission>();

const columns = [
  columnHelper.accessor(row => row.timestamp?.toDate().toLocaleDateString(), {
    id: 'date',
    cell: info => info.getValue(),
    header: 'Date',
  }),
  columnHelper.accessor(row => row.data.agency.name, {
    id: 'agency',
    cell: info => info.getValue(),
    header: 'Agency',
  }),
  columnHelper.accessor(row => row.data.asset.type, {
    id: 'assetType',
    cell: info => info.getValue(),
    header: 'Asset Type',
  }),
  columnHelper.accessor(row => row.data.description, {
    id: 'description',
    cell: info => info.getValue(),
    header: 'Description',
  }),
  columnHelper.accessor(row => row.data.location || 'N/A', {
    id: 'location',
    cell: info => info.getValue(),
    header: 'Location',
  }),
  columnHelper.accessor(row => row.files.length, {
    id: 'files',
    cell: info => `${info.getValue()} file(s)`,
    header: 'Files',
  }),
];

const PaginationButton = motion.button;

export const SubmissionsTable = ({ data }: SubmissionsTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <motion.div
      className="rounded-sm border border-[#4d5b8c]/30 overflow-hidden backdrop-blur-md bg-[#1a2942]/90"
      variants={motionVariants.fadeIn}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[#4d5b8c]/20">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <MotionTh
                    key={header.id}
                    className="px-6 py-4 text-left text-xs font-medium text-[#a8c6ff] uppercase tracking-wider cursor-pointer select-none bg-[#2d3f59]/30"
                    onClick={header.column.getToggleSortingHandler()}
                    whileHover={{
                      backgroundColor: "rgba(77, 91, 140, 0.3)",
                      transition: { duration: 0.2 }
                    }}
                  >
                    <motion.div 
                      className="flex items-center gap-2"
                      whileHover={motionVariants.hoverEnergize}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getIsSorted() === 'asc' ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : header.column.getIsSorted() === 'desc' ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : null}
                    </motion.div>
                  </MotionTh>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-[#4d5b8c]/20">
            <AnimatePresence>
              {table.getRowModel().rows.map(row => (
                <MotionTr
                  key={row.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{
                    backgroundColor: "rgba(45, 63, 89, 0.3)",
                    transition: { duration: 0.2 }
                  }}
                >
                  {row.getVisibleCells().map(cell => (
                    <MotionTd
                      key={cell.id}
                      className="px-6 py-4 whitespace-nowrap text-sm text-[#8ba2cc]"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </MotionTd>
                  ))}
                </MotionTr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
      
      {/* Pagination Controls */}
      <div className="flex items-center justify-between border-t border-[#4d5b8c]/20 px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <PaginationButton
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className={cn(
              "relative inline-flex items-center rounded-sm px-4 py-2 text-sm",
              "border border-[#4d5b8c]/30 bg-[#2d3f59]/30 text-[#8ba2cc]",
              "transition-all duration-200",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "hover:border-[#8ba2cc]/30 hover:text-[#a8c6ff] hover:shadow-[0_0_10px_rgba(168,198,255,0.05)]"
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Previous
          </PaginationButton>
          <PaginationButton
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className={cn(
              "relative inline-flex items-center rounded-sm px-4 py-2 text-sm ml-3",
              "border border-[#4d5b8c]/30 bg-[#2d3f59]/30 text-[#8ba2cc]",
              "transition-all duration-200",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "hover:border-[#8ba2cc]/30 hover:text-[#a8c6ff] hover:shadow-[0_0_10px_rgba(168,198,255,0.05)]"
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Next
          </PaginationButton>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-[#8ba2cc]">
              Showing{' '}
              <span className="font-medium text-[#a8c6ff]">{table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}</span>{' '}
              to{' '}
              <span className="font-medium text-[#a8c6ff]">
                {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, data.length)}
              </span>{' '}
              of{' '}
              <span className="font-medium text-[#a8c6ff]">{data.length}</span>{' '}
              results
            </p>
          </div>
          <div className="flex gap-2">
            <PaginationButton
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className={cn(
                "relative inline-flex items-center gap-1 rounded-sm px-3 py-2 text-sm",
                "border border-[#4d5b8c]/30 bg-[#2d3f59]/30 text-[#8ba2cc]",
                "transition-all duration-200",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "hover:border-[#8ba2cc]/30 hover:text-[#a8c6ff] hover:shadow-[0_0_10px_rgba(168,198,255,0.05)]"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </PaginationButton>
            <PaginationButton
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className={cn(
                "relative inline-flex items-center gap-1 rounded-sm px-3 py-2 text-sm",
                "border border-[#4d5b8c]/30 bg-[#2d3f59]/30 text-[#8ba2cc]",
                "transition-all duration-200",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "hover:border-[#8ba2cc]/30 hover:text-[#a8c6ff] hover:shadow-[0_0_10px_rgba(168,198,255,0.05)]"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </PaginationButton>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
