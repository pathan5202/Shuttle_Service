import React from 'react';
import { PageHeader } from '../../components/common/headers/PageHeader';
import { Card, CardContent } from '../../components/common/cards/Card';
import { Table, Column } from '../../components/common/tables/Table';
import { Button } from '../../components/common/buttons/Button';
import { User } from '../../types';
import { Plus, Users, Shield, CheckCircle2 } from 'lucide-react';

const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'Alex Rivera',
    email: 'alex.rivera@corp-offgo.com',
    role: 'ADMIN',
    department: 'Fleet Logistics',
    employeeId: 'EMP-9042',
    status: 'ACTIVE',
    createdAt: '2025-01-15T08:00:00Z',
  },
  {
    id: 'u2',
    name: 'Sarah Jenkins',
    email: 'sarah.j@corp-offgo.com',
    role: 'EMPLOYEE',
    department: 'Software Engineering',
    employeeId: 'EMP-1102',
    status: 'ACTIVE',
    createdAt: '2025-02-10T08:00:00Z',
  },
  {
    id: 'u3',
    name: 'Michael Vance',
    email: 'm.vance@corp-offgo.com',
    role: 'DRIVER',
    department: 'Transit Ops',
    employeeId: 'DRV-402',
    status: 'ACTIVE',
    createdAt: '2025-01-01T08:00:00Z',
  },
];

export const UserManagementPage: React.FC = () => {
  const columns: Column<User>[] = [
    {
      key: 'name',
      header: 'Employee Name & Email',
      render: (u) => (
        <div>
          <p className="font-extrabold text-slate-900 dark:text-white">{u.name}</p>
          <p className="text-xs text-slate-500">{u.email}</p>
        </div>
      ),
    },
    {
      key: 'employeeId',
      header: 'ID / Dept',
      render: (u) => (
        <div>
          <p className="font-mono text-xs font-bold text-indigo-600">{u.employeeId}</p>
          <p className="text-xs text-slate-500">{u.department}</p>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Access Role',
      render: (u) => (
        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
          {u.role}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (u) => (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600">
          <CheckCircle2 className="w-3 h-3" /> Active
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <PageHeader
        title="User & Access Directory"
        subtitle="Manage employee shuttle passes, driver credentials, and administrative permissions."
        actions={
          <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
            Provision User
          </Button>
        }
      />

      <Card>
        <CardContent className="p-0">
          <Table columns={columns} data={mockUsers} keyExtractor={(u) => u.id} />
        </CardContent>
      </Card>
    </div>
  );
};
