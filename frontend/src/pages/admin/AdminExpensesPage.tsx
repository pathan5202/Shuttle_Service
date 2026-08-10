import React from 'react';
import { PageHeader } from '../../components/common/headers/PageHeader';
import { TransportExpenseDashboard } from '../../components/expenses/TransportExpenseDashboard';
import { useExpenseReport } from '../../hooks/useExpenses';

export const AdminExpensesPage: React.FC = () => {
  const { summary, reports, isLoadingSummary, isLoadingReports } = useExpenseReport();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <PageHeader
        title="Employee Monthly Transport Expenses"
        subtitle="Review corporate shuttle expenditure reports, employee transport benefits, and payroll deduction summaries."
      />

      {summary && (
        <TransportExpenseDashboard
          summary={summary}
          reports={reports}
          isLoading={isLoadingSummary || isLoadingReports}
        />
      )}
    </div>
  );
};
