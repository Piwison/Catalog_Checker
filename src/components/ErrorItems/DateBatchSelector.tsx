import React from 'react';
import { Calendar } from 'lucide-react';

interface DateBatchSelectorProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

const DateBatchSelector: React.FC<DateBatchSelectorProps> = ({
  selectedDate,
  onDateChange
}) => {
  return (
    <div className="relative flex-1 md:flex-none">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Calendar size={18} className="text-[#B3D9FF]" />
      </div>
      <select
        value={selectedDate}
        onChange={(e) => onDateChange(e.target.value)}
        className="pl-10 pr-10 py-2 bg-[#0065D0] text-white border border-[#1A82EA] rounded-lg
                 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#B3D9FF]
                 hover:bg-[#0057B7] transition-colors text-sm font-medium w-full"
      >
        <option value="today">Today's Errors</option>
        <option value="yesterday">Yesterday's Errors</option>
        <option value="last7days">Last 7 Days</option>
        <option value="last30days">Last 30 Days</option>
        <option value="custom">Custom Date Range</option>
      </select>
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-[#B3D9FF]" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3z" clipRule="evenodd" />
          <path fillRule="evenodd" d="M10 17a.75.75 0 01-.55-.24l-3.25-3.5a.75.75 0 111.1-1.02L10 15.148l2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5A.75.75 0 0110 17z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
};

export default DateBatchSelector;