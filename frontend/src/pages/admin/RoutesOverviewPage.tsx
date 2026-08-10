import React from 'react';
import { PageHeader } from '../../components/common/headers/PageHeader';
import { Card, CardContent } from '../../components/common/cards/Card';
import { Table, Column } from '../../components/common/tables/Table';
import { Button } from '../../components/common/buttons/Button';
import { ShuttleRoute } from '../../types';
import { Plus, GitMerge, MapPin, Clock } from 'lucide-react';

const mockRoutes: ShuttleRoute[] = [
  {
    id: 'r1',
    code: 'RT-101',
    name: 'Outer Ring Road Express',
    startPoint: 'Silk Board Hub',
    endPoint: 'Hebbal Flyover',
    totalDistanceKm: 28.4,
    estimatedDurationMinutes: 52,
    stops: [],
    activeShuttlesCount: 6,
    dailyRidership: 1420,
    status: 'ACTIVE',
  },
  {
    id: 'r2',
    code: 'RT-204',
    name: 'Electronic City Corridor',
    startPoint: 'Koramangala BDA',
    endPoint: 'Infosys Main Gate Phase 1',
    totalDistanceKm: 18.2,
    estimatedDurationMinutes: 38,
    stops: [],
    activeShuttlesCount: 5,
    dailyRidership: 980,
    status: 'ACTIVE',
  },
  {
    id: 'r3',
    code: 'RT-308',
    name: 'Whitefield Campus Line',
    startPoint: 'Indiranagar Metro',
    endPoint: 'ITPL Main Gate',
    totalDistanceKm: 21.0,
    estimatedDurationMinutes: 45,
    stops: [],
    activeShuttlesCount: 4,
    dailyRidership: 1140,
    status: 'ACTIVE',
  },
];

export const RoutesOverviewPage: React.FC = () => {
  const columns: Column<ShuttleRoute>[] = [
    {
      key: 'code',
      header: 'Code & Name',
      render: (r) => (
        <div>
          <span className="font-mono text-xs text-indigo-600 dark:text-indigo-400 font-bold mr-2">{r.code}</span>
          <span className="font-bold text-slate-900 dark:text-white">{r.name}</span>
        </div>
      ),
    },
    {
      key: 'points',
      header: 'Terminals',
      render: (r) => (
        <span className="text-xs text-slate-600 dark:text-slate-300">
          {r.startPoint} &rarr; {r.endPoint}
        </span>
      ),
    },
    {
      key: 'distance',
      header: 'Distance / Est. Time',
      render: (r) => (
        <span className="text-xs font-semibold">
          {r.totalDistanceKm} km ({r.estimatedDurationMinutes}m)
        </span>
      ),
    },
    {
      key: 'activeShuttlesCount',
      header: 'Active Shuttles',
      render: (r) => (
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-600">
          {r.activeShuttlesCount} Vans
        </span>
      ),
    },
    {
      key: 'dailyRidership',
      header: 'Daily Pass',
      render: (r) => <span className="font-extrabold text-xs">{r.dailyRidership} pax/day</span>,
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <PageHeader
        title="Route Network Management"
        subtitle="Configure shuttle routes, terminal stops, target frequencies, and capacity allocations."
        actions={
          <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
            Add New Route
          </Button>
        }
      />

      <Card>
        <CardContent className="p-0">
          <Table columns={columns} data={mockRoutes} keyExtractor={(r) => r.id} />
        </CardContent>
      </Card>
    </div>
  );
};
