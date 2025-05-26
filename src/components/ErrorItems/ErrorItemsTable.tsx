import React from 'react';
import { ChevronDown, ChevronUp, ChevronRight, ExternalLink } from 'lucide-react';
import { ErrorItem } from '../../types';
import ExpandedRowDetail from './ExpandedRowDetail';

interface ErrorItemsTableProps {
  items: ErrorItem[];
  expandedRows: Set<string>;
  onToggleExpand: (productId: string) => void;
}

const ErrorItemsTable: React.FC<ErrorItemsTableProps> = ({
  items,
  expandedRows,
  onToggleExpand
}) => {
  const [sortField, setSortField] = React.useState<keyof ErrorItem>('lastModifiedDate');
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('desc');
  const [hoveredRow, setHoveredRow] = React.useState<string | null>(null);

  const handleSort = (field: keyof ErrorItem) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      if (sortField === 'errorType') {
        const aLength = a.errorType?.length ?? 0;
        const bLength = b.errorType?.length ?? 0;
        return sortDirection === 'asc' 
          ? aLength - bLength 
          : bLength - aLength;
      }
      
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
      
      return 0;
    });
  }, [items, sortField, sortDirection]);

  const getErrorSeverityClass = (errorCount: number) => {
    if (errorCount >= 3) return 'bg-red-100 text-red-800';
    if (errorCount === 2) return 'bg-orange-100 text-orange-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-8 px-4 py-3"></th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('productId')}
              >
                <div className="flex items-center">
                  Product ID
                  {sortField === 'productId' && (
                    sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                  )}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('productName')}
              >
                <div className="flex items-center">
                  Product Name
                  {sortField === 'productName' && (
                    sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('errorType')}
              >
                <div className="flex items-center">
                  Issues
                  {sortField === 'errorType' && (
                    sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                  )}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('lastModifiedDate')}
              >
                <div className="flex items-center">
                  Last Modified
                  {sortField === 'lastModifiedDate' && (
                    sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                View
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedItems.map((item) => (
              <React.Fragment key={item.productId}>
                <tr 
                  className={`group transition-all duration-200 hover:bg-blue-50 cursor-pointer ${
                    hoveredRow === item.productId ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => onToggleExpand(item.productId)}
                  onMouseEnter={() => setHoveredRow(item.productId)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td className="w-8 px-4 py-4">
                    <ChevronRight
                      size={16}
                      className={`text-gray-400 transition-transform duration-200 ${
                        expandedRows.has(item.productId) ? 'rotate-90 text-blue-600' : ''
                      } ${hoveredRow === item.productId ? 'text-blue-600' : ''}`}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {item.productId}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{item.productName}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col space-y-1">
                      <span className="text-xs text-gray-500">{item.CategoryLevel1}</span>
                      <span className="text-xs text-gray-500">→ {item.CategoryLevel2}</span>
                      <span className="text-xs text-gray-500">→ {item.CategoryLevel3}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        getErrorSeverityClass(item.errorType?.length ?? 0)
                      }`}>
                        {item.errorType?.length ?? 0} {(item.errorType?.length ?? 0) === 1 ? 'Issue' : 'Issues'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(item.lastModifiedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <a 
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-600 transition-colors p-1 rounded-full hover:bg-blue-50"
                      title="View in Coupang"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={16} />
                    </a>
                  </td>
                </tr>
                {expandedRows.has(item.productId) && (
                  <tr className="bg-blue-50">
                    <td colSpan={7} className="px-6 py-4">
                      <ExpandedRowDetail item={item} />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ErrorItemsTable;