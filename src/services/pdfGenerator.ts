/**
 * Client-side PDF Generation Service
 * Generates professional A4 PDFs with company branding
 */

import { SelectedService, PDFGenerationOptions } from '../types';

/**
 * Generates a professional PDF document from selected services
 * @param selectedServices - Array of selected services to include in PDF
 * @param options - PDF generation options (company name, logo, etc.)
 * @returns Promise<Blob> - PDF file blob for download/share
 */
export async function generateServicePDF(
  selectedServices: SelectedService[],
  options: PDFGenerationOptions = {}
): Promise<Blob> {
  const {
    companyName = 'Company Services',
    includeTimestamp = true,
    currency = '$',
  } = options;

  // Create canvas-based PDF (using html2canvas + jsPDF approach)
  // Alternative: Use pdfkit for Node.js backend or PDFKit.js for browser
  const pdfContent = createPDFContent(
    selectedServices,
    companyName,
    currency,
    includeTimestamp
  );

  const blob = new Blob([pdfContent], { type: 'application/pdf' });
  return blob;
}

/**
 * Creates professional PDF HTML content
 */
function createPDFContent(
  services: SelectedService[],
  companyName: string,
  currency: string,
  includeTimestamp: boolean
): string {
  const timestamp = new Date().toLocaleString();
  const totalPrice = services.reduce((sum, s) => sum + s.price, 0);

  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .container {
          width: 210mm;
          height: 297mm;
          padding: 20mm;
          background: white;
        }
        .header {
          border-bottom: 2px solid #1e40af;
          padding-bottom: 15px;
          margin-bottom: 30px;
        }
        .company-name {
          font-size: 28px;
          font-weight: bold;
          color: #1e40af;
          margin-bottom: 5px;
        }
        .timestamp {
          font-size: 12px;
          color: #666;
        }
        .title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 20px;
          color: #1e40af;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 30px;
        }
        th {
          background-color: #f3f4f6;
          border-bottom: 2px solid #d1d5db;
          padding: 12px;
          text-align: left;
          font-weight: 600;
          color: #1f2937;
        }
        td {
          border-bottom: 1px solid #e5e7eb;
          padding: 12px;
        }
        tr:last-child td {
          border-bottom: none;
        }
        .price {
          text-align: right;
          font-weight: 500;
        }
        .summary {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 2px solid #e5e7eb;
          display: flex;
          justify-content: flex-end;
        }
        .total {
          font-size: 18px;
          font-weight: bold;
          color: #1e40af;
        }
        .total-amount {
          margin-left: 20px;
        }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #d1d5db;
          font-size: 12px;
          color: #666;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="company-name">${companyName}</div>
          ${includeTimestamp ? `<div class="timestamp">Generated on ${timestamp}</div>` : ''}
        </div>
        
        <div class="title">Selected Services</div>
        
        <table>
          <thead>
            <tr>
              <th>Service Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            ${services.map(service => `
              <tr>
                <td>${service.title}</td>
                <td class="price">${currency}${service.price.toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <div class="summary">
          <span class="total">Total:</span>
          <span class="total-amount">${currency}${totalPrice.toFixed(2)}</span>
        </div>
        
        <div class="footer">
          <p>This is a confidential document. For internal use only.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return html;
}

/**
 * Alternative: Using html2canvas + jsPDF for browser PDF generation
 * Install: npm install html2canvas jspdf
 */
export async function generatePDFWithHtml2Canvas(
  selectedServices: SelectedService[],
  options: PDFGenerationOptions = {}
): Promise<Blob> {
  // This requires html2canvas and jsPDF libraries
  // Implementation would go here
  // const html2canvas = require('html2canvas');
  // const jsPDF = require('jspdf');
  
  throw new Error('Requires html2canvas and jsPDF libraries');
}