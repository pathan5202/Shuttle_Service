import React from 'react';
import { PageHeader } from '../../components/common/headers/PageHeader';
import { Card, CardContent } from '../../components/common/cards/Card';
import { Table, Column } from '../../components/common/tables/Table';
import { Calendar, Clock, MapPin } from 'lucide-react';

interface DriverTrip {
  id: string;
  tripCode: string;
  routeName: string;
  departureTime: string;
  passengerCount: number;
  status: string;
}

const mockTrips: DriverTrip[] = [
  {
    id: 't1',
    tripCode: 'TRIP-801',
    routeName: 'Outer Ring Road Express',
    departureTime: '08:30 AM',
    passengerCount: 38,
    status: 'SCHEDULED',
  },
  {
    id: 't2',
    tripCode: 'TRIP-802',
    routeName: 'Electronic City Corridor',
    departureTime: '05:30 PM',
    passengerCount: 32,
    status: 'SCHEDULED',
  },
];

export const DriverTripsPage: React.FC = () => {
  const columns: Column<DriverTrip>[] = [
    {
      key: 'tripCode',
      header: 'Trip Code',
      render: (t) => <span className="font-mono font-bold text-indigo-600">{t.tripCode}</span>,
    },
    { key: 'routeName', header: 'Route' },
    { key: 'departureTime', header: 'Departure' },
    { key: 'passengerCount', header: 'Booked Passengers' },
    { key: 'status', header: 'Status' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <PageHeader
        title="Assigned Roster Trips"
        subtitle="Review scheduled shuttle runs for your active shift."
      />

      <Card>
        <CardContent className="p-0">
          <Table columns={columns} data={mockTrips} keyExtractor={(t) => t.id} />
        </CardContent>
      </Card>
    </div>
  );
};
