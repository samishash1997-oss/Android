/**
 * Left Panel Component
 * Displays available services with add buttons
 */

import React from 'react';
import { Service, SelectedService } from '../types';
import '../styles/app.css';

interface LeftPanelProps {
  services: Service[];
  onAddService: (service: Service) => void;
}

const LeftPanel: React.FC<LeftPanelProps> = ({ services, onAddService }) => {
  return (
    <div className="left-panel">
      <div className="left-panel-header">
        <h2>Available Services</h2>
      </div>
      <div className="services-list">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onAdd={() => onAddService(service)}
          />
        ))}
      </div>
    </div>
  );
};

interface ServiceCardProps {
  service: Service;
  onAdd: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onAdd }) => {
  return (
    <div className="service-card">
      <div className="service-card-content">
        <h3 className="service-title">{service.title}</h3>
        {service.description && (
          <p className="service-description">{service.description}</p>
        )}
        <div className="service-footer">
          <span className="service-price">${service.price.toFixed(2)}</span>
        </div>
      </div>
      <button
        className="add-button"
        onClick={onAdd}
        title={`Add ${service.title}`}
        aria-label={`Add ${service.title} service`}
      >
        +
      </button>
    </div>
  );
};

export default LeftPanel;