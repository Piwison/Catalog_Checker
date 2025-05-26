import { ErrorItem } from '../types';

export const VIOLATION_TYPES = [
  'Title Empty',
  'Title Too Short',
  'Price Format Error',
  'Image Missing',
  'Description Empty',
  'Invalid Category',
  'Shipping Info Missing',
  'Incorrect Brand Format',
  'Invalid Specification'
];

export const mockErrorItems: ErrorItem[] = [
  {
    productId: 'CP-12345678',
    sku: 'SKU-ABCD1234',
    productTitle: 'Premium Wireless Headphones with Noise Cancellation',
    violations: [
      {
        ruleName: 'Price Format Error',
        field: 'price',
        valueFound: '10,000.00원',
        expected: 'Numeric value without currency symbol'
      },
      {
        ruleName: 'Image Missing',
        field: 'product_images',
        valueFound: '[]',
        expected: 'At least 3 product images'
      }
    ],
    dateFound: '2025-01-15'
  },
  {
    productId: 'CP-23456789',
    sku: 'SKU-BCDE2345',
    productTitle: '',
    violations: [
      {
        ruleName: 'Title Empty',
        field: 'product_title',
        valueFound: '""',
        expected: 'Non-empty string with 20-100 characters'
      }
    ],
    dateFound: '2025-01-15'
  },
  {
    productId: 'CP-34567890',
    sku: 'SKU-CDEF3456',
    productTitle: 'Smart Watch Series 5',
    violations: [
      {
        ruleName: 'Title Too Short',
        field: 'product_title',
        valueFound: 'Smart Watch Series 5',
        expected: 'Title with at least 20 characters'
      },
      {
        ruleName: 'Description Empty',
        field: 'product_description',
        valueFound: '""',
        expected: 'Non-empty description with at least 100 characters'
      },
      {
        ruleName: 'Shipping Info Missing',
        field: 'shipping_information',
        valueFound: 'null',
        expected: 'Valid shipping information object'
      }
    ],
    dateFound: '2025-01-14'
  },
  {
    productId: 'CP-45678901',
    sku: 'SKU-DEFG4567',
    productTitle: 'Professional DSLR Camera with 24-70mm Lens Kit and Accessories Bundle',
    violations: [
      {
        ruleName: 'Invalid Category',
        field: 'category_id',
        valueFound: '999999',
        expected: 'Valid category ID from Coupang category list'
      }
    ],
    dateFound: '2025-01-14'
  },
  {
    productId: 'CP-56789012',
    sku: 'SKU-EFGH5678',
    productTitle: 'Ergonomic Office Chair with Lumbar Support',
    violations: [
      {
        ruleName: 'Incorrect Brand Format',
        field: 'brand_name',
        valueFound: 'herman-miller',
        expected: 'Proper capitalization (Herman Miller)'
      },
      {
        ruleName: 'Invalid Specification',
        field: 'specifications.weight_capacity',
        valueFound: '120kg',
        expected: 'Numeric value without unit (120)'
      }
    ],
    dateFound: '2025-01-13'
  },
  {
    productId: 'CP-67890123',
    sku: 'SKU-FGHI6789',
    productTitle: 'Premium Quality Korean Red Ginseng Extract, 100% Authentic, 30 Day Supply',
    violations: [
      {
        ruleName: 'Price Format Error',
        field: 'sale_price',
        valueFound: 'Contact for Price',
        expected: 'Numeric value'
      }
    ],
    dateFound: '2025-01-13'
  },
  {
    productId: 'CP-78901234',
    sku: 'SKU-GHIJ7890',
    productTitle: 'Sm',
    violations: [
      {
        ruleName: 'Title Too Short',
        field: 'product_title',
        valueFound: 'Sm',
        expected: 'Title with at least 20 characters'
      },
      {
        ruleName: 'Image Missing',
        field: 'product_images',
        valueFound: '["/img1.jpg"]',
        expected: 'At least 3 product images'
      },
      {
        ruleName: 'Description Empty',
        field: 'product_description',
        valueFound: 'Short desc.',
        expected: 'Description with at least 100 characters'
      }
    ],
    dateFound: '2025-01-12'
  },
  {
    productId: 'CP-89012345',
    sku: 'SKU-HIJK8901',
    productTitle: 'Ultra HD 4K Smart TV with Voice Control and Streaming Apps Included',
    violations: [
      {
        ruleName: 'Invalid Specification',
        field: 'specifications.resolution',
        valueFound: '4K',
        expected: 'Specific resolution format (3840x2160)'
      }
    ],
    dateFound: '2025-01-12'
  }
];