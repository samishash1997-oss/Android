/**
 * Right Panel Component
 * Displays dynamic table of selected services
 */

import React from 'react';
import { SelectedService } from '../types';
import '../styles/app.css';

interface RightPanelProps {
  selectedServices: SelectedService[];
  onRemoveService: (index: number) => void;
}

const RightPanel: React.FC<RightPanelProps> = ({
  selectedServices,
  onRemoveService,
}) => {
  const totalPrice = selectedServices.reduce((sum, service) => sum + service.price, 0);

  return (
    <div className="right-panel">
      <div className="right-panel-header">
        <h2>Selected Services</h2>
        <span className="service-count">{selectedServices.length} item(s)</span>
      </div>

      {selectedServices.length === 0 ? (
        <div className="empty-state">
          <p>No services selected yet.</p>
          <p>Add services from the left panel to get started.</p>
        </div>
      ) : (
        <>
          <div className="table-wrapper">
            <table className="services-table">
              <thead>
                <tr>
                  <th className="col-name">Service Name</th>
                  <th className="col-price">Price</th>
                  <th className="col-actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {selectedServices.map((service, index) => (
                  <tr key={index} className="service-row">
                    <td className="col-name">
                      <span className="service-name">{service.title}</span>
                    </td>
                    <td className="col-price">
                      <span className="service-price">${service.price.toFixed(2)}</span>
                    </td>
                    <td className="col-actions">
                      <button
                        className="remove-button"
                        onClick={() => onRemoveService(index)}
                        title={`Remove ${service.title}`}
                        aria-label={`Remove ${service.title} service`}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="table-footer">
            <div className="total-section">
              <span className="total-label">Total:</span>
              <span className="total-amount">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RightPanel;