/**
 * Native iOS Share Sheet Handler
 * Integrates with iPad system share menu for AirDrop, print, email, and file save
 */

import { ShareSheetOptions } from '../types';

/**
 * Triggers the native iOS share sheet
 * @param options - Share sheet configuration with file data
 */
export async function openNativeShareSheet(
  options: ShareSheetOptions
): Promise<void> {
  const { filename, mimeType, data } = options;

  try {
    // For React Native
    if (typeof window !== 'undefined' && (window as any).RNShare) {
      const base64Data = bufferToBase64(data);
      await (window as any).RNShare.open({
        url: `data:${mimeType};base64,${base64Data}`,
        type: mimeType,
        filename: filename,
      });
      return;
    }

    // For Web (Fallback)
    const blob = data instanceof Blob ? data : new Blob([data], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error opening share sheet:', error);
    throw new Error(`Failed to open share sheet: ${error}`);
  }
}

/**
 * Converts ArrayBuffer or Blob to Base64 string
 */
function bufferToBase64(data: Blob | ArrayBuffer): string {
  if (data instanceof Blob) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]); // Extract base64 part
      };
      reader.onerror = reject;
      reader.readAsDataURL(data);
    }) as unknown as string;
  }

  const view = new Uint8Array(data as ArrayBuffer);
  let binary = '';
  for (let i = 0; i < view.byteLength; i++) {
    binary += String.fromCharCode(view[i]);
  }
  return btoa(binary);
}

/**
 * iOS-specific share handler using WebView bridge
 * For native React Native integration
 */
export interface NativeShareOptions {
  title?: string;
  message?: string;
  url?: string;
  subject?: string;
}

export async function shareViaNativeMethod(
  pdfBlob: Blob,
  filename: string,
  options: NativeShareOptions = {}
): Promise<void> {
  // This function should be called from React Native
  // It bridges to native iOS share sheet through platform-specific code

  const nativeModule = (global as any).nativeModules?.ShareModule;
  if (!nativeModule) {
    console.warn('Native share module not available, using fallback');
    await openNativeShareSheet({
      filename,
      mimeType: 'application/pdf',
      data: pdfBlob,
    });
    return;
  }

  try {
    const base64Data = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(pdfBlob);
    });

    await nativeModule.sharePDF({
      base64: base64Data,
      filename: filename,
      title: options.title || 'Share PDF',
      message: options.message,
      subject: options.subject,
    });
  } catch (error) {
    console.error('Error in native share:', error);
    throw error;
  }
}