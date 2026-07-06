/**
 * Finish Button Component
 * Triggers PDF generation and native share sheet
 */

import React, { useState } from 'react';
import { SelectedService } from '../types';
import '../styles/app.css';

interface FinishButtonProps {
  selectedServices: SelectedService[];
  isDisabled?: boolean;
  onFinish?: (success: boolean) => void;
}

const FinishButton: React.FC<FinishButtonProps> = ({
  selectedServices,
  isDisabled = false,
  onFinish,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFinish = async () => {
    if (selectedServices.length === 0) {
      setError('Please select at least one service');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Dynamic imports to avoid circular dependencies
      const { generateServicePDF } = await import('../services/pdfGenerator');
      const { shareViaNativeMethod } = await import('../services/shareHandler');

      // Generate PDF
      const pdfBlob = await generateServicePDF(selectedServices, {
        companyName: 'Company Services',
        includeTimestamp: true,
        currency: '$',
      });

      // Trigger native share sheet
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `services-${timestamp}.pdf`;

      await shareViaNativeMethod(pdfBlob, filename, {
        title: 'Share Service List',
        message: 'Share your selected services',
        subject: 'Service Selection Document',
      });

      if (onFinish) {
        onFinish(true);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to generate and share PDF';
      setError(errorMessage);
      console.error('Error in handleFinish:', err);
      if (onFinish) {
        onFinish(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="finish-button-container">
      {error && <div className="error-message">{error}</div>}
      <button
        className="finish-button"
        onClick={handleFinish}
        disabled={isDisabled || isLoading || selectedServices.length === 0}
        aria-label="Finish and export PDF"
      >
        {isLoading ? (
          <>
            <span className="spinner"></span>
            Generating PDF...
          </>
        ) : (
          'Finish & Export PDF'
        )}
      </button>
    </div>
  );
};

export default FinishButton;