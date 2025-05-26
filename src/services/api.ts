import { ErrorItem } from '../types';

const API_BASE_URL = '/api/v1';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  metadata?: {
    total: number;
    page: number;
    pageSize: number;
  };
}

export interface CategoryScope {
  type: 'all' | 'specific';
  categories?: {
    level1?: string[];
    level2?: string[];
    level3?: string[];
  };
}

export interface ValidationCondition {
  field: string;
  operator: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'matches' | 'greaterThan' | 'lessThan';
  value: string | number;
}

export interface ValidationCriteria {
  type: 'Required' | 'Format' | 'Length' | 'Range' | 'Pattern' | 'Custom';
  conditions: ValidationCondition[];
  logic: 'AND' | 'OR';
  parameters: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    customValidation?: string;
    [key: string]: any;
  };
}

export interface ValidationRule {
  ruleId: string;
  name: string;
  description: string;
  field: string;
  checkType: string;
  enabled: boolean;
  severity: 'Low' | 'Medium' | 'High';
  categoryScope: CategoryScope;
  validationCriteria: ValidationCriteria;
}

export interface DashboardStats {
  totalItems: number;
  totalErrors: number;
  errorRate: number;
  activeRules: number;
  dailyTrends: {
    date: string;
    count: number;
  }[];
  errorTypeDistribution: {
    errorType: string;
    count: number;
  }[];
}

// Mock data and API implementation
const mockCategories = {
  level1: ['寵物', '食品飲料', '數位家電'],
  level2: ['狗飼料/零食', '貓飼料/零食', '水族用品'],
  level3: ['乾糧', '零食', '貓砂盆']
};

const mockValidationRules: ValidationRule[] = [
  {
    ruleId: "VR001",
    name: "Product Title Length Check",
    description: "Ensures product title meets length requirements",
    field: "productTitle",
    checkType: "Length",
    enabled: true,
    severity: "High",
    categoryScope: {
      type: 'all'
    },
    validationCriteria: {
      type: 'Length',
      conditions: [
        {
          field: 'length',
          operator: 'greaterThan',
          value: 20
        }
      ],
      logic: 'AND',
      parameters: {
        minLength: 20,
        maxLength: 100
      }
    }
  },
  {
    ruleId: "VR002",
    name: "Pet Food Specific Title Format",
    description: "Validates title format for pet food products",
    field: "productTitle",
    checkType: "Pattern",
    enabled: true,
    severity: "Medium",
    categoryScope: {
      type: 'specific',
      categories: {
        level1: ['寵物'],
        level2: ['狗飼料/零食', '貓飼料/零食']
      }
    },
    validationCriteria: {
      type: 'Pattern',
      conditions: [
        {
          field: 'brand',
          operator: 'matches',
          value: '^\\[.*\\]'
        },
        {
          field: 'weight',
          operator: 'matches',
          value: '\\d+(\\.\\d+)?(kg|g)'
        }
      ],
      logic: 'AND',
      parameters: {
        pattern: '^\\[.*\\].*\\d+(\\.\\d+)?(kg|g)$'
      }
    }
  }
];

const mockDashboardStats: DashboardStats = {
  totalItems: 1250,
  totalErrors: 156,
  errorRate: 12.48,
  activeRules: 8,
  dailyTrends: [
    { date: '2025-03-01', count: 156 },
    { date: '2025-03-02', count: 142 },
    { date: '2025-03-03', count: 164 },
    { date: '2025-03-04', count: 138 },
    { date: '2025-03-05', count: 145 },
    { date: '2025-03-06', count: 132 },
    { date: '2025-03-07', count: 128 },
  ],
  errorTypeDistribution: [
    { errorType: 'Misleading Information', count: 245 },
    { errorType: 'Irrelevant Content', count: 198 },
    { errorType: 'Formatting/Readability', count: 167 },
  ]
};

export const api = {
  async getCategories(): Promise<ApiResponse<typeof mockCategories>> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      success: true,
      data: mockCategories
    };
  },

  async getValidationRules(): Promise<ApiResponse<ValidationRule[]>> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      success: true,
      data: mockValidationRules
    };
  },

  async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      success: true,
      data: mockDashboardStats
    };
  },

  async createValidationRule(rule: Omit<ValidationRule, 'ruleId'>): Promise<ApiResponse<ValidationRule>> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newRule: ValidationRule = {
      ...rule,
      ruleId: `VR${Date.now()}`
    };
    return {
      success: true,
      data: newRule
    };
  },

  async updateValidationRule(ruleId: string, updates: Partial<ValidationRule>): Promise<ApiResponse<ValidationRule>> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const updatedRule = mockValidationRules.find(r => r.ruleId === ruleId);
    if (!updatedRule) {
      return {
        success: false,
        data: null as any,
        error: 'Rule not found'
      };
    }
    return {
      success: true,
      data: { ...updatedRule, ...updates }
    };
  },

  async deleteValidationRule(ruleId: string): Promise<ApiResponse<void>> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      success: true,
      data: undefined
    };
  }
};