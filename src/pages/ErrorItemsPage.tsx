import * as React from 'react';
import { useState, useMemo, useEffect, useCallback } from 'react';
import { AlertCircle, Filter, Search, RefreshCw } from 'lucide-react';
import ErrorItemsTable from '../components/ErrorItems/ErrorItemsTable';
import { ErrorItem } from '../types';

// For Vite, environment variables are exposed on import.meta.env
// and must be prefixed with VITE_ in the .env file.
const VITE_N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL;

// Fallback for Create React App (process.env) or if no env var is set at all.
const REACT_APP_N8N_WEBHOOK_URL = typeof process !== 'undefined' && process.env && process.env.REACT_APP_N8N_WEBHOOK_URL;
const FALLBACK_URL = 'http://localhost:5678/webhook/contentValidation';

const N8N_WEBHOOK_URL = VITE_N8N_WEBHOOK_URL || REACT_APP_N8N_WEBHOOK_URL || FALLBACK_URL;

const ErrorItemsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [violationFilter, setViolationFilter] = useState<string>('');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [errorItems, setErrorItems] = useState<ErrorItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchErrorItems = useCallback(async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const response = await fetch(N8N_WEBHOOK_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Assuming the API returns a single item, wrap it in an array
      // If it already returns an array, you can use setErrorItems(data);
      setErrorItems(Array.isArray(data) ? data : [data]);
    } catch (error) {
      console.error("Failed to fetch error items:", error);
      if (error instanceof Error) {
        setFetchError(`Failed to load data: ${error.message}. Please ensure the n8n webhook is running and accessible.`);
      } else {
        setFetchError("An unknown error occurred while fetching data.");
      }
      setErrorItems([]); // Clear data on error
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchErrorItems();
  }, [fetchErrorItems]);

  const filteredItems = useMemo(() => {
    return errorItems.filter((item: ErrorItem) => {
      const matchesSearch = searchTerm === '' ||
        item.productId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.productName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesViolation = violationFilter === '' ||
        item.errorType.some((v: string) => v.toLowerCase().includes(violationFilter.toLowerCase()));

      return matchesSearch && matchesViolation;
    });
  }, [searchTerm, violationFilter, errorItems]);

  const toggleRowExpansion = (productId: string) => {
    setExpandedRows((prev: Set<string>) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#00174f] to-[#002c84] shadow-lg">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <AlertCircle className="h-6 w-6" />
                Error Items List
              </h1>
              <p className="text-blue-200 text-sm">
                {isLoading ? "Loading items..." : `Found ${filteredItems.length} items with potential issues`}
              </p>
            </div>
            <button
              onClick={fetchErrorItems}
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
              {isLoading ? "Fetching..." : "Fetch Latest Data"}
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-6 -mt-6">
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by Product ID or Name..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm
                         placeholder-gray-500 bg-gray-50 focus:bg-white
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition-colors duration-200"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="w-full md:w-72 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter size={18} className="text-gray-400" />
              </div>
              <select
                value={violationFilter}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setViolationFilter(e.target.value)}
                className="block w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg text-sm
                         bg-gray-50 focus:bg-white
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         appearance-none cursor-pointer transition-colors duration-200"
              >
                <option value="">All Error Types</option>
                <option value="Misleading Information">Misleading Information</option>
                <option value="Irrelevant Content">Irrelevant Content</option>
                <option value="Formatting/Readability">Formatting/Readability</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M10 17a.75.75 0 01-.55-.24l-3.25-3.5a.75.75 0 111.1-1.02L10 15.148l2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5A.75.75 0 0110 17z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section or Error/Loading Message */}
      <div className="container mx-auto px-6 py-8">
        {isLoading && (
          <div className="flex justify-center items-center p-12">
            <RefreshCw size={48} className="text-blue-500 animate-spin" />
            <p className="ml-4 text-lg text-gray-600">Loading error items...</p>
          </div>
        )}
        {!isLoading && fetchError && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-md shadow-md" role="alert">
            <div className="flex">
              <div className="py-1"><AlertCircle className="h-6 w-6 text-red-500 mr-3" /></div>
              <div>
                <p className="font-bold">Error Fetching Data</p>
                <p className="text-sm">{fetchError}</p>
              </div>
            </div>
          </div>
        )}
        {!isLoading && !fetchError && filteredItems.length === 0 && (
          <div className="bg-white rounded-xl shadow-md p-12 text-center border border-gray-100">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="text-gray-400">
                <AlertCircle size={48} className="mx-auto" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No errors found</h3>
                <p className="text-gray-500 max-w-sm mx-auto">
                  No error items match your current filters, or no data was returned from the source.
                </p>
              </div>
            </div>
          </div>
        )}
        {!isLoading && !fetchError && filteredItems.length > 0 && (
          <ErrorItemsTable
            items={filteredItems}
            expandedRows={expandedRows}
            onToggleExpand={toggleRowExpansion}
          />
        )}
      </div>
    </div>
  );
};

export default ErrorItemsPage;