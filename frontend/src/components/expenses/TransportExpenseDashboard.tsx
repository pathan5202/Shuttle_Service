import React, { useState } from 'react';
import { ExpenseSummary } from './ExpenseSummary';
import { ExpenseChart } from './ExpenseChart';
import { ExpenseTable } from './ExpenseTable';
import { EmployeeExpenseDrawer } from './EmployeeExpenseDrawer';
import { TransportExpenseReportItem, OrganizationExpenseSummary } from '../../types';
import { Button } from '../common/buttons/Button';
import { Input } from '../common/inputs/Input';
import { Search, Download, FileSpreadsheet, Printer, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

interface TransportExpenseDashboardProps {
  summary: OrganizationExpenseSummary;
  reports: TransportExpenseReportItem[];
  isLoading?: boolean;
}

export const TransportExpenseDashboard: React.FC<TransportExpenseDashboardProps> = ({
  summary,
  reports,
  isLoading,
}) => {
  const [selectedMonth, setSelectedMonth] = useState('July');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedDepartment, setSelectedDepartment] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeReport, setActiveReport] = useState<TransportExpenseReportItem | null>(null);

  // Export Handlers
  const handleExportCSV = () => {
    toast.success('Exporting Transport Expenses to CSV...');
  };

  const handleExportExcel = () => {
    toast.success('Generating Transport Expenses Excel workbook...');
  };

  const handlePrint = () => {
    toast.success('Opening print dialog for Transport Expense Report...');
    window.print();
  };

  // Filtered reports
  const filteredReports = reports.filter((r) => {
    const matchesSearch =
      r.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = selectedDepartment === 'ALL' || r.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'ALL' || r.status === selectedStatus;

    return matchesSearch && matchesDept && matchesStatus;
  });

  const totalEmployees = summary.totalEmployeesCount || reports.length;
  const totalTrips = summary.totalTripsCompleted || reports.reduce((acc, r) => acc + r.totalTrips, 0);
  const totalMonthlyCost = summary.totalExpenseUSD || reports.reduce((acc, r) => acc + r.subsidizedCostUSD, 0);
  const avgCostPerEmployee = totalEmployees ? totalMonthlyCost / totalEmployees : 0;

  const highestEmployee = reports.length
    ? reports.reduce((prev, curr) => (curr.totalTrips > prev.totalTrips ? curr : prev), reports[0])
    : { employeeName: 'N/A', department: 'N/A', totalTrips: 0, subsidizedCostUSD: 0 };

  const lowestEmployee = reports.length
    ? reports.reduce((prev, curr) => (curr.totalTrips < prev.totalTrips ? curr : prev), reports[0])
    : { employeeName: 'N/A', department: 'N/A', totalTrips: 0, subsidizedCostUSD: 0 };

  return (
    <div className="space-y-6">
      {/* Action Header & Exports */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Employee Transport Expense Management
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Internal organization transportation costs & HR payroll tax deduction audit.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCSV}
            leftIcon={<Download className="w-4 h-4" />}
          >
            Export CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportExcel}
            leftIcon={<FileSpreadsheet className="w-4 h-4 text-emerald-500" />}
          >
            Excel
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handlePrint}
            leftIcon={<Printer className="w-4 h-4" />}
          >
            Print Report
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <ExpenseSummary
        totalEmployees={totalEmployees}
        totalTrips={totalTrips}
        totalMonthlyCostUsd={totalMonthlyCost}
        avgCostPerEmployeeUsd={avgCostPerEmployee}
        highestUsageEmployee={{
          name: highestEmployee.employeeName,
          dept: highestEmployee.department,
          trips: highestEmployee.totalTrips,
          costUsd: highestEmployee.subsidizedCostUSD,
        }}
        lowestUsageEmployee={{
          name: lowestEmployee.employeeName,
          dept: lowestEmployee.department,
          trips: lowestEmployee.totalTrips,
          costUsd: lowestEmployee.subsidizedCostUSD,
        }}
      />

      {/* Filters Toolbar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Filter employee name, ID, or dept..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none w-full md:w-64"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto flex-wrap text-xs">
          {/* Month */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-bold text-[11px]">Month:</span>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold focus:outline-none"
            >
              <option value="July">July</option>
              <option value="June">June</option>
              <option value="May">May</option>
              <option value="April">April</option>
            </select>
          </div>

          {/* Year */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-bold text-[11px]">Year:</span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold focus:outline-none"
            >
              <option value="2026">2026</option>
              <option value="2025">2025</option>
            </select>
          </div>

          {/* Department */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-bold text-[11px]">Dept:</span>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold focus:outline-none"
            >
              <option value="ALL">All Departments</option>
              <option value="Engineering">Engineering</option>
              <option value="Product">Product</option>
              <option value="Sales">Sales</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Finance">Finance</option>
            </select>
          </div>

          {/* Status */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-bold text-[11px]">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="APPROVED">Approved</option>
              <option value="PENDING">Pending Settlement</option>
            </select>
          </div>
        </div>
      </div>

      {/* Visual Recharts Section */}
      <ExpenseChart
        monthlyTrend={summary.monthlyTrend}
        departmentBreakdown={summary.departmentBreakdown}
      />

      {/* Expense Data Table */}
      <ExpenseTable
        reports={filteredReports}
        isLoading={isLoading}
        onSelectEmployee={(rep) => setActiveReport(rep)}
      />

      {/* Employee Details Drawer */}
      <EmployeeExpenseDrawer
        isOpen={Boolean(activeReport)}
        onClose={() => setActiveReport(null)}
        report={activeReport}
      />
    </div>
  );
};
