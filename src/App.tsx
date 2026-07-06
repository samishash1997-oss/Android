/**
 * Main Application Component
 * Secure iPad Service Selection & PDF Export Application
 * Optimized for landscape iPad view with split-screen design
 */

import React, { useState, useCallback } from 'react';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import FinishButton from './components/FinishButton';
import { Service, SelectedService, AppState } from './types';
import './styles/app.css';

// Sample company services data
const DEFAULT_SERVICES: Service[] = [
  {
    id: '1',
    title: 'Web Development',
    price: 2500,
    description: 'Full-stack web application',
  },
  {
    id: '2',
    title: 'Mobile App Design',
    price: 1800,
    description: 'UI/UX design for iOS',
  },
  {
    id: '3',
    title: 'Cloud Infrastructure',
    price: 3500,
    description: 'AWS setup and configuration',
  },
  {
    id: '4',
    title: 'Security Audit',
    price: 2000,
    description: 'Comprehensive security review',
  },
  {
    id: '5',
    title: 'Database Optimization',
    price: 1500,
    description: 'Performance tuning and indexing',
  },
  {
    id: '6',
    title: 'API Development',
    price: 2200,
    description: 'RESTful API design and implementation',
  },
  {
    id: '7',
    title: 'QA Testing',
    price: 1200,
    description: 'Automated and manual testing',
  },
  {
    id: '8',
    title: 'Technical Documentation',
    price: 800,
    description: 'Comprehensive system documentation',
  },
];

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    availableServices: DEFAULT_SERVICES,
    selectedServices: [],
    isGeneratingPDF: false,
  });

  /**
   * Handles adding a service to the selection
   * Appends the service to selectedServices array and triggers re-render
   */
  const handleAddService = useCallback((service: Service) => {
    setState((prevState) => {
      const newSelected: SelectedService = {
        ...service,
        quantity: 1,
      };
      return {
        ...prevState,
        selectedServices: [...prevState.selectedServices, newSelected],
      };
    });
  }, []);

  /**
   * Handles removing a service from the selection
   * Removes service at specified index and triggers re-render
   */
  const handleRemoveService = useCallback((index: number) => {
    setState((prevState) => {
      const newSelected = [...prevState.selectedServices];
      newSelected.splice(index, 1);
      return {
        ...prevState,
        selectedServices: newSelected,
      };
    });
  }, []);

  /**
   * Handles finish button click
   * Sets loading state and handles PDF generation callback
   */
  const handleFinish = useCallback((success: boolean) => {
    setState((prevState) => ({
      ...prevState,
      isGeneratingPDF: false,
    }));

    if (success) {
      console.log('PDF generated and shared successfully');
      // Optional: Reset selected services after successful export
      // setState(prevState => ({
      //   ...prevState,
      //   selectedServices: [],
      // }));
    }
  }, []);

  return (
    <div className="app-container">
      {/* Left Panel - Service Selection Menu */}
      <LeftPanel
        services={state.availableServices}
        onAddService={handleAddService}
      />

      {/* Right Panel - Dynamic Service Table and Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <RightPanel
          selectedServices={state.selectedServices}
          onRemoveService={handleRemoveService}
        />

        {/* Finish Button and Export Controls */}
        <FinishButton
          selectedServices={state.selectedServices}
          isDisabled={state.isGeneratingPDF}
          onFinish={handleFinish}
        />
      </div>
    </div>
  );
};

export default App;