import React, { useState } from 'react';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  ExternalLink,
  Eye,
  FileSpreadsheet,
  Download
} from 'lucide-react';

export default function DataTable({ data, onSelectInsight, onExportCSV }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortField, setSortField] = useState('intensity');
  const [sortOrder, setSortOrder] = useState('desc');
  const [localSearch, setLocalSearch] = useState('');

  // Local filter
  const filteredData = data.filter((item) => {
    if (!localSearch.trim()) return true;
    const q = localSearch.toLowerCase();
    return (
      (item.title && item.title.toLowerCase().includes(q)) ||
      (item.sector && item.sector.toLowerCase().includes(q)) ||
      (item.topic && item.topic.toLowerCase().includes(q)) ||
      (item.country && item.country.toLowerCase().includes(q)) ||
      (item.source && item.source.toLowerCase().includes(q))
    );
  });

  // Sort
  const sortedData = [...filteredData].sort((a, b) => {
    let valA = a[sortField];
    let valB = b[sortField];

    if (valA === undefined || valA === null) valA = '';
    if (valB === undefined || valB === null) valB = '';

    if (!isNaN(valA) && !isNaN(valB) && valA !== '' && valB !== '') {
      return sortOrder === 'asc' ? Number(valA) - Number(valB) : Number(valB) - Number(valA);
    }
    return sortOrder === 'asc'
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = sortedData.slice(startIndex, startIndex + pageSize);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
    setCurrentPage(1);
  };

  return (
    <div className="rounded-3xl bg-white border border-[#edf0f2] shadow-sm overflow-hidden flex flex-col">
      
      {/* Table Toolbar */}
      <div className="p-6 border-b border-[#edf0f2] flex flex-wrap items-center justify-between gap-4 bg-[#fbfcfd]">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-700">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 font-display">Strategic Intelligence Records</h3>
            <p className="text-xs text-slate-400 font-medium">
              Showing {sortedData.length} records matching active filters
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 flex-1 max-w-md justify-end">
          {/* Quick Search */}
          <div className="relative w-full max-w-xs">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => {
                setLocalSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Filter table rows..."
              className="w-full pl-8 pr-3 py-2 text-xs rounded-xl bg-white border border-[#edf0f2] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-sm"
            />
          </div>

          {/* Rows per page */}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-3 py-2 text-xs font-semibold rounded-xl bg-white border border-[#edf0f2] text-slate-700 focus:outline-none shadow-sm"
          >
            <option value={10}>10 rows</option>
            <option value={25}>25 rows</option>
            <option value={50}>50 rows</option>
          </select>

          {/* Export button */}
          <button
            onClick={onExportCSV}
            className="p-2 rounded-xl border border-[#edf0f2] bg-white text-slate-600 hover:text-emerald-700 hover:border-emerald-200 shadow-sm"
            title="Download CSV"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-[#edf0f2] bg-[#f8fafc] text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <th className="py-3.5 px-6 cursor-pointer hover:text-emerald-700" onClick={() => handleSort('title')}>
                <div className="flex items-center space-x-1">
                  <span>Insight Title</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3.5 px-4 cursor-pointer hover:text-emerald-700" onClick={() => handleSort('sector')}>
                <div className="flex items-center space-x-1">
                  <span>Sector</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3.5 px-4 cursor-pointer hover:text-emerald-700" onClick={() => handleSort('topic')}>
                <div className="flex items-center space-x-1">
                  <span>Topic</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3.5 px-4 cursor-pointer hover:text-emerald-700" onClick={() => handleSort('region')}>
                <div className="flex items-center space-x-1">
                  <span>Region / Country</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3.5 px-3 cursor-pointer hover:text-emerald-700 text-center" onClick={() => handleSort('end_year')}>
                <div className="flex items-center justify-center space-x-1">
                  <span>End Year</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3.5 px-3 cursor-pointer hover:text-emerald-700 text-center" onClick={() => handleSort('intensity')}>
                <div className="flex items-center justify-center space-x-1">
                  <span>Intensity</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3.5 px-3 cursor-pointer hover:text-emerald-700 text-center" onClick={() => handleSort('likelihood')}>
                <div className="flex items-center justify-center space-x-1">
                  <span>Likelihood</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3.5 px-3 cursor-pointer hover:text-emerald-700 text-center" onClick={() => handleSort('relevance')}>
                <div className="flex items-center justify-center space-x-1">
                  <span>Relevance</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3.5 px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#edf0f2]">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-12 text-slate-400 font-medium">
                  No records match the current filter criteria
                </td>
              </tr>
            ) : (
              paginatedData.map((row, idx) => (
                <tr
                  key={row._id || idx}
                  onClick={() => onSelectInsight && onSelectInsight(row)}
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                >
                  {/* Title */}
                  <td className="py-3.5 px-6 max-w-xs">
                    <p className="font-semibold text-slate-800 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                      {row.title || 'Untitled Strategic Report'}
                    </p>
                    <p className="text-[10px] text-slate-400 truncate mt-0.5 font-medium">
                      Source: {row.source || 'N/A'}
                    </p>
                  </td>

                  {/* Sector */}
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-100 whitespace-nowrap">
                      {row.sector || 'Unassigned'}
                    </span>
                  </td>

                  {/* Topic */}
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200 whitespace-nowrap">
                      {row.topic || 'General'}
                    </span>
                  </td>

                  {/* Region & Country */}
                  <td className="py-3.5 px-4 text-slate-700 whitespace-nowrap">
                    <div className="font-semibold">{row.region || 'Global'}</div>
                    {row.country && (
                      <div className="text-[10px] text-slate-400">{row.country}</div>
                    )}
                  </td>

                  {/* End Year */}
                  <td className="py-3.5 px-3 text-center text-slate-600 font-bold font-mono">
                    {row.end_year || '-'}
                  </td>

                  {/* Intensity */}
                  <td className="py-3.5 px-3 text-center">
                    <span className="font-extrabold text-amber-600">
                      ⚡ {row.intensity || 0}
                    </span>
                  </td>

                  {/* Likelihood */}
                  <td className="py-3.5 px-3 text-center">
                    <span className="font-bold text-purple-700">
                      {row.likelihood || 0}
                    </span>
                  </td>

                  {/* Relevance */}
                  <td className="py-3.5 px-3 text-center">
                    <span className="font-bold text-emerald-700">
                      {row.relevance || 0}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-6 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end space-x-1.5" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => onSelectInsight && onSelectInsight(row)}
                        className="p-1.5 rounded-xl bg-slate-100 hover:bg-[#0f482f] hover:text-white text-slate-600 transition-all"
                        title="View Full Story"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      {row.url && (
                        <a
                          href={row.url}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-xl bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-600 transition-all"
                          title="Original Source URL"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-5 border-t border-[#edf0f2] bg-[#fbfcfd] flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 font-medium">
        <div>
          Showing {sortedData.length === 0 ? 0 : startIndex + 1} to{' '}
          {Math.min(startIndex + pageSize, sortedData.length)} of {sortedData.length} entries
        </div>

        <div className="flex items-center space-x-1.5">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-40 transition-all shadow-sm"
          >
            <ChevronsLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-40 transition-all shadow-sm"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          
          <span className="px-3 py-1 font-bold text-slate-800">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-40 transition-all shadow-sm"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-40 transition-all shadow-sm"
          >
            <ChevronsRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
}
