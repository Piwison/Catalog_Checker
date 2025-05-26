import React from 'react';
import { AlertCircle, ExternalLink } from 'lucide-react';
import { ErrorItem } from '../../types';

interface ExpandedRowDetailProps {
  item: ErrorItem;
}

const ExpandedRowDetail: React.FC<ExpandedRowDetailProps> = ({ item }) => {
  const getErrorTypeColor = (errorType: string) => {
    switch (errorType.toLowerCase()) {
      case 'misleading information':
        return 'bg-red-50 text-red-700 border-red-100';
      case 'irrelevant content':
        return 'bg-orange-50 text-orange-700 border-orange-100';
      case 'formatting/readability':
        return 'bg-yellow-50 text-yellow-700 border-yellow-100';
      default:
        return 'bg-blue-50 text-blue-700 border-blue-100';
    }
  };

  return (
    <div className="animate-fadeIn p-6 bg-gray-50/50">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
        <div className="w-full sm:w-auto">
          <div className="flex flex-wrap gap-2 mb-3">
            {item.errorType?.map((error, index) => (
              <span
                key={index}
                className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium border ${getErrorTypeColor(error)}`}
              >
                {error}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-600">
            Found in {item.issueFields?.length || 0} affected {(item.issueFields?.length || 0) === 1 ? 'field' : 'fields'}
          </p>
        </div>
        <a 
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 border border-blue-300 text-sm font-medium rounded-lg 
                   text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors whitespace-nowrap"
          onClick={(e) => e.stopPropagation()}
        >
          View in Coupang <ExternalLink size={16} className="ml-2" />
        </a>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Description Section */}
        <div className="lg:col-span-8 order-2 lg:order-1">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden h-full">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
              <h4 className="text-sm font-medium text-gray-700">Description</h4>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                {item.justification}
              </p>
            </div>
          </div>
        </div>

        {/* Affected Fields Section */}
        <div className="lg:col-span-4 order-1 lg:order-2">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
              <h4 className="text-sm font-medium text-gray-700">Affected Fields</h4>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                {item.issueFields?.map((field, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    <AlertCircle className="h-4 w-4 text-gray-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{field}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandedRowDetail;