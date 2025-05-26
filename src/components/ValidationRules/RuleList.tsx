import React from 'react';
import { ValidationRule } from '../../services/api';
import { Pencil, Trash2 } from 'lucide-react';

interface RuleListProps {
  rules: ValidationRule[];
  onEdit: (rule: ValidationRule) => void;
  onDelete: (ruleId: string) => void;
  onToggle: (ruleId: string) => void;
}

const RuleList: React.FC<RuleListProps> = ({
  rules,
  onEdit,
  onDelete,
  onToggle
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rule Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Field
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category Scope
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Validation Type
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Severity
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rules.map((rule) => (
            <tr key={rule.ruleId}>
              <td className="px-6 py-4 whitespace-nowrap">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={rule.enabled}
                    onChange={() => onToggle(rule.ruleId)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{rule.name}</div>
                <div className="text-sm text-gray-500">{rule.description}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {rule.field}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {rule.categoryScope.type === 'all' ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    All Categories
                  </span>
                ) : (
                  <div className="space-y-1">
                    {rule.categoryScope.categories?.level1?.map(cat => (
                      <span key={cat} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mr-1">
                        {cat}
                      </span>
                    ))}
                  </div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="space-y-1">
                  <div>{rule.checkType}</div>
                  <div className="text-xs text-gray-400">
                    {rule.validationCriteria.conditions.length} condition(s) ({rule.validationCriteria.logic})
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  rule.severity === 'High' ? 'bg-red-100 text-red-800' :
                  rule.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {rule.severity}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex space-x-3">
                  <button
                    onClick={() => onEdit(rule)}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(rule.ruleId)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RuleList;