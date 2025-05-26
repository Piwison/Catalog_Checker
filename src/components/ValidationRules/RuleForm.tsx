import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { ValidationRule, ValidationCondition, CategoryScope } from '../../services/api';

interface RuleFormProps {
  onSubmit: (rule: Omit<ValidationRule, 'ruleId'>) => void;
  onCancel: () => void;
  initialData?: ValidationRule;
  categories: {
    level1: string[];
    level2: string[];
    level3: string[];
  };
}

const OPERATORS = [
  { value: 'equals', label: 'Equals' },
  { value: 'contains', label: 'Contains' },
  { value: 'startsWith', label: 'Starts With' },
  { value: 'endsWith', label: 'Ends With' },
  { value: 'matches', label: 'Matches (Regex)' },
  { value: 'greaterThan', label: 'Greater Than' },
  { value: 'lessThan', label: 'Less Than' }
];

const CHECK_TYPES = [
  'Required',
  'Format',
  'Length',
  'Range',
  'Pattern',
  'Custom'
];

const RuleForm: React.FC<RuleFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  categories
}) => {
  const [formData, setFormData] = useState<Omit<ValidationRule, 'ruleId'>>({
    name: '',
    description: '',
    field: '',
    checkType: 'Required',
    enabled: true,
    severity: 'Medium',
    categoryScope: {
      type: 'all'
    },
    validationCriteria: {
      type: 'Required',
      conditions: [{
        field: '',
        operator: 'equals',
        value: ''
      }],
      logic: 'AND',
      parameters: {}
    }
  });

  // State for filtered categories
  const [availableCategories, setAvailableCategories] = useState({
    level2: [] as string[],
    level3: [] as string[]
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  // Update available categories when level1 or level2 selection changes
  useEffect(() => {
    if (formData.categoryScope.type === 'specific') {
      const selectedLevel1 = formData.categoryScope.categories?.level1 || [];
      const selectedLevel2 = formData.categoryScope.categories?.level2 || [];

      // Filter level2 categories based on selected level1
      const level2Filtered = categories.level2.filter(cat2 => 
        selectedLevel1.some(l1 => cat2.startsWith(l1))
      );

      // Filter level3 categories based on selected level2
      const level3Filtered = categories.level3.filter(cat3 => 
        selectedLevel2.some(l2 => cat3.startsWith(l2))
      );

      setAvailableCategories({
        level2: level2Filtered,
        level3: level3Filtered
      });
    }
  }, [
    formData.categoryScope.type,
    formData.categoryScope.categories?.level1,
    formData.categoryScope.categories?.level2,
    categories
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addCondition = () => {
    setFormData(prev => ({
      ...prev,
      validationCriteria: {
        ...prev.validationCriteria,
        conditions: [
          ...prev.validationCriteria.conditions,
          { field: '', operator: 'equals', value: '' }
        ]
      }
    }));
  };

  const removeCondition = (index: number) => {
    setFormData(prev => ({
      ...prev,
      validationCriteria: {
        ...prev.validationCriteria,
        conditions: prev.validationCriteria.conditions.filter((_, i) => i !== index)
      }
    }));
  };

  const updateCondition = (index: number, updates: Partial<ValidationCondition>) => {
    setFormData(prev => ({
      ...prev,
      validationCriteria: {
        ...prev.validationCriteria,
        conditions: prev.validationCriteria.conditions.map((condition, i) =>
          i === index ? { ...condition, ...updates } : condition
        )
      }
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Basic Information */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Basic Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rule Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="e.g., Product Title Length Check"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Field</label>
                <input
                  type="text"
                  required
                  value={formData.field}
                  onChange={e => setFormData({ ...formData, field: e.target.value })}
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="e.g., productTitle"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check Type</label>
                  <select
                    value={formData.checkType}
                    onChange={e => setFormData({ ...formData, checkType: e.target.value })}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    {CHECK_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                  <select
                    value={formData.severity}
                    onChange={e => setFormData({ ...formData, severity: e.target.value as 'Low' | 'Medium' | 'High' })}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  rows={3}
                  placeholder="Describe the purpose and behavior of this validation rule"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Category Scope */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Category Scope</h3>
            
            <div className="space-y-4">
              <div className="flex space-x-6 p-4 bg-gray-50 rounded-lg">
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={formData.categoryScope.type === 'all'}
                    onChange={() => setFormData({
                      ...formData,
                      categoryScope: { type: 'all' }
                    })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">All Categories</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={formData.categoryScope.type === 'specific'}
                    onChange={() => setFormData({
                      ...formData,
                      categoryScope: {
                        type: 'specific',
                        categories: { level1: [], level2: [], level3: [] }
                      }
                    })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Specific Categories</span>
                </label>
              </div>

              {formData.categoryScope.type === 'specific' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Level 1</label>
                    <select
                      multiple
                      size={4}
                      value={formData.categoryScope.categories?.level1 || []}
                      onChange={e => {
                        const selected = Array.from(e.target.selectedOptions, option => option.value);
                        setFormData({
                          ...formData,
                          categoryScope: {
                            ...formData.categoryScope,
                            categories: {
                              level1: selected,
                              level2: [],
                              level3: []
                            }
                          }
                        });
                      }}
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                    >
                      {categories.level1.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Level 2</label>
                    <select
                      multiple
                      size={4}
                      value={formData.categoryScope.categories?.level2 || []}
                      onChange={e => {
                        const selected = Array.from(e.target.selectedOptions, option => option.value);
                        setFormData({
                          ...formData,
                          categoryScope: {
                            ...formData.categoryScope,
                            categories: {
                              ...formData.categoryScope.categories,
                              level2: selected,
                              level3: []
                            }
                          }
                        });
                      }}
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                      disabled={!formData.categoryScope.categories?.level1?.length}
                    >
                      {availableCategories.level2.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Level 3</label>
                    <select
                      multiple
                      size={4}
                      value={formData.categoryScope.categories?.level3 || []}
                      onChange={e => {
                        const selected = Array.from(e.target.selectedOptions, option => option.value);
                        setFormData({
                          ...formData,
                          categoryScope: {
                            ...formData.categoryScope,
                            categories: {
                              ...formData.categoryScope.categories,
                              level3: selected
                            }
                          }
                        });
                      }}
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                      disabled={!formData.categoryScope.categories?.level2?.length}
                    >
                      {availableCategories.level3.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Validation Conditions */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-900">Validation Conditions</h3>
          <button
            type="button"
            onClick={addCondition}
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus size={16} className="mr-1" />
            Add Condition
          </button>
        </div>

        <div className="space-y-3">
          {formData.validationCriteria.conditions.map((condition, index) => (
            <div key={index} className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
              <input
                type="text"
                placeholder="Field"
                value={condition.field}
                onChange={e => updateCondition(index, { field: e.target.value })}
                className="block flex-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              
              <select
                value={condition.operator}
                onChange={e => updateCondition(index, { operator: e.target.value as any })}
                className="block w-48 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                {OPERATORS.map(op => (
                  <option key={op.value} value={op.value}>{op.label}</option>
                ))}
              </select>
              
              <input
                type="text"
                placeholder="Value"
                value={condition.value}
                onChange={e => updateCondition(index, { value: e.target.value })}
                className="block flex-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              
              <button
                type="button"
                onClick={() => removeCondition(index)}
                className="text-gray-400 hover:text-red-600 p-1.5 rounded-full hover:bg-red-50 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}

          <div className="flex items-center justify-center space-x-6 py-4 bg-gray-50 rounded-lg mt-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                checked={formData.validationCriteria.logic === 'AND'}
                onChange={() => setFormData({
                  ...formData,
                  validationCriteria: {
                    ...formData.validationCriteria,
                    logic: 'AND'
                  }
                })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">ALL conditions must match (AND)</span>
            </label>
            
            <label className="inline-flex items-center">
              <input
                type="radio"
                checked={formData.validationCriteria.logic === 'OR'}
                onChange={() => setFormData({
                  ...formData,
                  validationCriteria: {
                    ...formData.validationCriteria,
                    logic: 'OR'
                  }
                })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">ANY condition must match (OR)</span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Rule
        </button>
      </div>
    </form>
  );
};

export default RuleForm;