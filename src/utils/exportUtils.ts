import { ErrorItem } from '../types';

export const exportToCSV = (data: ErrorItem[], filename: string) => {
  // Prepare the CSV header row
  const header = ['Product ID', 'SKU', 'Product Title', 'Violation Count', 'Date Found'];
  
  // Prepare the CSV data rows
  const rows = data.map(item => [
    item.productId,
    item.sku,
    item.productTitle,
    item.violations.length.toString(),
    item.dateFound
  ]);
  
  // Combine header and rows
  const csvContent = [
    header.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
  
  // Create a Blob containing the CSV data
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
  // Create a temporary URL for the Blob
  const url = URL.createObjectURL(blob);
  
  // Create a link element to trigger the download
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${filename}-${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  
  // Trigger the download
  link.click();
  
  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};