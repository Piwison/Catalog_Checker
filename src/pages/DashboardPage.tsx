import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Pencil, Trash2, Plus, Save, X, AlertCircle, CheckCircle2, Activity, Clock, BarChart2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { api, ValidationRule, DashboardStats } from '../services/api';
import RuleForm from '../components/ValidationRules/RuleForm';
import RuleList from '../components/ValidationRules/RuleList';

const DashboardPage: React.FC = () => {
  const [rules, setRules] = useState<ValidationRule[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [categories, setCategories] = useState({
    level1: [],
    level2: [],
    level3: []
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [rulesResponse, statsResponse, categoriesResponse] = await Promise.all([
        api.getValidationRules(),
        api.getDashboardStats(),
        api.getCategories()
      ]);

      if (rulesResponse.success && statsResponse.success && categoriesResponse.success) {
        setRules(rulesResponse.data);
        setStats(statsResponse.data);
        setCategories(categoriesResponse.data);
      } else {
        toast.error('Failed to load dashboard data');
      }
    } catch (error) {
      toast.error('Error loading dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const toggleRule = async (ruleId: string) => {
    const ruleToUpdate = rules.find(rule => rule.ruleId === ruleId);
    if (!ruleToUpdate) return;

    const newEnabled = !ruleToUpdate.enabled;
    
    try {
      setRules(rules.map(rule => 
        rule.ruleId === ruleId ? { ...rule, enabled: newEnabled } : rule
      ));
      toast.success(`Rule ${newEnabled ? 'enabled' : 'disabled'} successfully!`);
    } catch (error) {
      setRules(rules);
      toast.error('Failed to update rule status');
    }
  };

  const handleAddRule = async (rule: Omit<ValidationRule, 'ruleId'>) => {
    try {
      const response = await api.createValidationRule(rule);
      if (response.success) {
        setRules([...rules, response.data]);
        setIsModalOpen(false);
        toast.success('New rule added successfully!');
      } else {
        toast.error('Failed to add new rule');
      }
    } catch (error) {
      toast.error('Error adding new rule');
    }
  };

  const handleDeleteRule = async (ruleId: string) => {
    try {
      setRules(rules.filter(rule => rule.ruleId !== ruleId));
      toast.success('Rule deleted successfully!');
    } catch (error) {
      loadData();
      toast.error('Failed to delete rule');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Toaster />
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#00174f] to-[#002c84] shadow-lg">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <BarChart2 className="h-6 w-6" />
                Dashboard Overview
              </h1>
              <p className="text-blue-200 text-sm">
                Monitor data quality and validation rules
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center px-4 py-2.5 bg-white/10 text-white rounded-lg 
                     hover:bg-white/20 transition-colors shadow-sm font-medium backdrop-blur-sm
                     border border-white/20"
            >
              <Plus size={18} className="mr-2" />
              Add New Rule
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:border-blue-200 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">Items Processed</h3>
              <Activity className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-2">{stats?.totalItems || 0}</p>
            <p className="text-sm text-gray-500">+12.5% from yesterday</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:border-red-200 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">Total Errors</h3>
              <AlertCircle className="h-5 w-5 text-red-600" />
            </div>
            <p className="text-3xl font-bold text-red-600 mb-2">{stats?.totalErrors || 0}</p>
            <p className="text-sm text-gray-500">-3.2% from yesterday</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:border-orange-200 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">Error Rate</h3>
              <Activity className="h-5 w-5 text-orange-600" />
            </div>
            <p className="text-3xl font-bold text-orange-600 mb-2">
              {stats?.errorRate.toFixed(1)}%
            </p>
            <p className="text-sm text-gray-500">Target: &lt; 8%</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:border-green-200 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">Active Rules</h3>
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-2">{stats?.activeRules || 0}</p>
            <p className="text-sm text-gray-500">of {rules.length} total rules</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Daily Error Trend</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats?.dailyTrends || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', strokeWidth: 2 }}
                    activeDot={{ r: 6, fill: '#2563eb' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Error Type Distribution</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats?.errorTypeDistribution || []} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" stroke="#6b7280" />
                  <YAxis dataKey="errorType" type="category" width={150} stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Bar 
                    dataKey="count" 
                    fill="#3b82f6"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Validation Rules Section */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 mt-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Validation Rules</h2>
              <p className="text-sm text-gray-500 mt-1">Configure and manage data validation rules</p>
            </div>
          </div>

          <RuleList
            rules={rules}
            onEdit={(rule) => {
              // Handle edit
            }}
            onDelete={handleDeleteRule}
            onToggle={toggleRule}
          />
        </div>
      </div>

      {/* Add/Edit Rule Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add New Validation Rule</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-500 transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
            
            <RuleForm
              onSubmit={handleAddRule}
              onCancel={() => setIsModalOpen(false)}
              categories={categories}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;