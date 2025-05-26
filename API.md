# API Documentation

## Base URL
```
/api/v1
```

## Common Response Format
```typescript
interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  metadata?: {
    total: number;
    page: number;
    pageSize: number;
  };
}
```

## Endpoints

### Audit Entries

#### Get Audit Entries
```
GET /api/v1/audit-entries
```

Query Parameters:
- `page` (optional): Page number (default: 1)
- `pageSize` (optional): Items per page (default: 20)
- `startDate` (optional): Start date (YYYY-MM-DD)
- `endDate` (optional): End date (YYYY-MM-DD)
- `productId` (optional): Filter by product ID
- `auditorId` (optional): Filter by auditor
- `auditCycle` (optional): Filter by audit cycle
- `status` (optional): Filter by status
- `errorType` (optional): Filter by error type

Response:
```typescript
interface AuditEntry {
  auditEntryId: string;
  productId: string;
  auditDate: string;
  auditorId: string;
  auditCycle: string;
  overallProductAuditStatus: string;
  specificErrorFound: boolean;
  errorType?: string;
  errorField?: string;
  errorDescription?: string;
  severity?: 'Low' | 'Medium' | 'High';
  evidenceLink?: string;
  recommendedAction?: string;
  actionStatus?: string;
  correctionDate?: string;
  notesFollowUp?: string;
}
```

#### Get Audit Statistics
```
GET /api/v1/audit-entries/stats
```

Response:
```typescript
interface AuditStats {
  totalAudits: number;
  passedAudits: number;
  failedAudits: number;
  pendingCorrections: number;
  errorTypeDistribution: {
    errorType: string;
    count: number;
  }[];
  severityDistribution: {
    severity: string;
    count: number;
  }[];
  dailyAuditCounts: {
    date: string;
    count: number;
  }[];
}
```

### Products

#### Get Products
```
GET /api/v1/products
```

Query Parameters:
- `page` (optional): Page number (default: 1)
- `pageSize` (optional): Items per page (default: 20)
- `productId` (optional): Filter by product ID
- `brand` (optional): Filter by brand
- `category` (optional): Filter by category
- `stockStatus` (optional): Filter by stock status

Response:
```typescript
interface Product {
  productId: string;
  internalItemId: string;
  productName: string;
  brand: string;
  categoryLevel1: string;
  categoryLevel2: string;
  categoryLevel3: string;
  productDescription: string;
  bulletPoints: string[];
  pricing: {
    originalPrice: number;
    salePrice: number;
    currencyCode: string;
  };
  stockStatus: string;
  images: {
    main: string;
    additional: string[];
  };
  specifications: {
    color?: string;
    size?: string;
    weight?: string;
    otherSpecs?: Record<string, string>;
  };
  productPageUrl: string;
  lastModifiedDate: string;
}
```

### Validation Rules

#### Get Validation Rules
```
GET /api/v1/validation-rules
```

Response:
```typescript
interface ValidationRule {
  ruleId: string;
  name: string;
  field: string;
  checkType: string;
  enabled: boolean;
  severity: 'Low' | 'Medium' | 'High';
  validationCriteria: {
    type: 'Required' | 'Format' | 'Length' | 'Range' | 'Pattern';
    parameters: Record<string, any>;
  };
}
```

#### Create Validation Rule
```
POST /api/v1/validation-rules
```

Request Body:
```typescript
interface CreateRuleRequest {
  name: string;
  field: string;
  checkType: string;
  severity: 'Low' | 'Medium' | 'High';
  validationCriteria: {
    type: 'Required' | 'Format' | 'Length' | 'Range' | 'Pattern';
    parameters: Record<string, any>;
  };
}
```