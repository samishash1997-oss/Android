/**
 * Type definitions for the Secure iPad Service Selection Application
 */

export interface Service {
  id: string;
  title: string;
  price: number;
  description?: string;
}

export interface SelectedService extends Service {
  quantity?: number;
}

export interface AppState {
  availableServices: Service[];
  selectedServices: SelectedService[];
  isGeneratingPDF: boolean;
}

export interface PDFGenerationOptions {
  companyName?: string;
  companyLogo?: string;
  includeTimestamp?: boolean;
  currency?: string;
}

export interface ShareSheetOptions {
  filename: string;
  mimeType: string;
  data: Blob | ArrayBuffer;
}