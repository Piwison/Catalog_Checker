export interface ErrorType {
  type: string;
  description?: string;
}

export interface IssueField {
  field: string;
  details?: string;
}

export interface ErrorItem {
  productId: string;
  productName: string;
  CategoryLevel1: string;
  CategoryLevel2: string;
  CategoryLevel3: string;
  relevanceScore: number;
  errorType: string[];
  justification: string;
  issueFields: string[];
  url: string;
  lastModifiedDate: string;
}