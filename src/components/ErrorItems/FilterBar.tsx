import React from 'react';
import { Search, Filter } from 'lucide-react';
import { VIOLATION_TYPES } from '../../data/mockData';

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  violationFilter: string;
  onViolationFilterChange: (value: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchTerm,
  onSearchChange,
  violationFilter,
  onViolationFilterChange
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="relative md:max-w-2xl w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by Product ID, SKU, or Title..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="block w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm
                       placeholder-gray-500 bg-gray-50 focus:bg-white
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       transition-colors duration-200"
            />
          </div>
          
          <div className="relative w-full md:w-72">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Filter size={18} className="text-gray-400" />
            </div>
            <select
              value={violationFilter}
              onChange={(e) => onViolationFilterChange(e.target.value)}
              className="block w-full pl-11 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm
                       bg-gray-50 focus:bg-white
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       appearance-none cursor-pointer transition-colors duration-200"
            >
              <option value="">All Violation Types</option>
              {VIOLATION_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M10 17a.75.75 0 01-.55-.24l-3.25-3.5a.75.75 0 111.1-1.02L10 15.148l2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5A.75.75 0 0110 17z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;