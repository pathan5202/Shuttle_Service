import React from 'react';
import { PageHeader } from '../../components/common/headers/PageHeader';
import { SeatSelectionPage } from '../../components/employee/booking/SeatSelectionPage';

export const EmployeeBookingPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <PageHeader
        title="Interactive Shuttle Seat Selection"
        subtitle="Choose your preferred seat on corporate shuttles with real-time overhead vehicle layouts."
      />

      <SeatSelectionPage />
    </div>
  );
};

