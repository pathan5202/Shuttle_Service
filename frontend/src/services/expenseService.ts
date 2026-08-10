import apiClient from '../api/axios';
import {
  TransportExpenseReportItem,
  OrganizationExpenseSummary,
  EmployeePersonalExpenses,
} from '../types';

const mockOrgSummary: OrganizationExpenseSummary = {
  currentMonthName: 'July 2026',
  totalExpenseUSD: 148250,
  previousMonthExpenseUSD: 142100,
  monthlyGrowthPercent: 4.3,
  budgetAllocatedUSD: 160000,
  budgetUtilizationPercent: 92.6,
  totalTripsCompleted: 4820,
  averageCostPerTripUSD: 30.75,
  departmentBreakdown: [
    { department: 'Engineering & Tech', expenseUSD: 52400, tripCount: 1840, percentageOfTotal: 35.3 },
    { department: 'Product Operations', expenseUSD: 31200, tripCount: 1020, percentageOfTotal: 21.0 },
    { department: 'Enterprise Sales', expenseUSD: 28900, tripCount: 910, percentageOfTotal: 19.5 },
    { department: 'Human Resources', expenseUSD: 18500, tripCount: 580, percentageOfTotal: 12.5 },
    { department: 'Finance & Legal', expenseUSD: 17250, tripCount: 470, percentageOfTotal: 11.7 },
  ],
  monthlyTrend: [
    { month: 'Feb 2026', totalUSD: 128000, tripCount: 4100 },
    { month: 'Mar 2026', totalUSD: 134500, tripCount: 4320 },
    { month: 'Apr 2026', totalUSD: 139000, tripCount: 4450 },
    { month: 'May 2026', totalUSD: 141200, tripCount: 4600 },
    { month: 'Jun 2026', totalUSD: 142100, tripCount: 4680 },
    { month: 'Jul 2026', totalUSD: 148250, tripCount: 4820 },
  ],
};

const mockExpenseItems: TransportExpenseReportItem[] = [
  {
    id: 'exp-101',
    employeeId: 'EMP-1001',
    employeeName: 'Alexander Wright',
    department: 'Engineering',
    month: 'July 2026',
    totalTrips: 22,
    subsidizedCostUSD: 660,
    employeeOutofPocketUSD: 0,
    status: 'APPROVED',
  },
  {
    id: 'exp-102',
    employeeId: 'EMP-1002',
    employeeName: 'Sophia Rodriguez',
    department: 'Product',
    month: 'July 2026',
    totalTrips: 18,
    subsidizedCostUSD: 540,
    employeeOutofPocketUSD: 0,
    status: 'APPROVED',
  },
  {
    id: 'exp-103',
    employeeId: 'EMP-1003',
    employeeName: 'Marcus Vance',
    department: 'Sales',
    month: 'July 2026',
    totalTrips: 20,
    subsidizedCostUSD: 600,
    employeeOutofPocketUSD: 0,
    status: 'APPROVED',
  },
  {
    id: 'exp-104',
    employeeId: 'EMP-1004',
    employeeName: 'Elena Rostova',
    department: 'Human Resources',
    month: 'July 2026',
    totalTrips: 15,
    subsidizedCostUSD: 450,
    employeeOutofPocketUSD: 0,
    status: 'PENDING',
  },
  {
    id: 'exp-105',
    employeeId: 'EMP-1005',
    employeeName: 'David Chen',
    department: 'Finance',
    month: 'July 2026',
    totalTrips: 24,
    subsidizedCostUSD: 720,
    employeeOutofPocketUSD: 0,
    status: 'APPROVED',
  },
];

const mockPersonalExpense: EmployeePersonalExpenses = {
  employeeId: 'EMP-1001',
  employeeName: 'Alexander Wright',
  currentMonth: 'July 2026',
  totalTripsThisMonth: 22,
  totalSubsidizedUSD: 660,
  taxExemptBenefitUSD: 660,
  monthlyLimitUSD: 1000,
  limitUtilizationPercent: 66.0,
  recentTrips: [
    { date: '2026-07-22', routeName: 'Outer Ring Road Express', pickupStop: 'Indiranagar Metro', dropStop: 'HQ', valueUSD: 30, status: 'COMPLETED' },
    { date: '2026-07-21', routeName: 'Outer Ring Road Express', pickupStop: 'HQ', dropStop: 'Indiranagar Metro', valueUSD: 30, status: 'COMPLETED' },
    { date: '2026-07-20', routeName: 'Outer Ring Road Express', pickupStop: 'Indiranagar Metro', dropStop: 'HQ', valueUSD: 30, status: 'COMPLETED' },
    { date: '2026-07-19', routeName: 'Outer Ring Road Express', pickupStop: 'HQ', dropStop: 'Indiranagar Metro', valueUSD: 30, status: 'COMPLETED' },
    { date: '2026-07-18', routeName: 'Outer Ring Road Express', pickupStop: 'Indiranagar Metro', dropStop: 'HQ', valueUSD: 30, status: 'COMPLETED' },
  ],
};

export const expenseService = {
  /**
   * GET /api/v1/admin/expenses/summary
   */
  getOrganizationExpenseSummary: async (): Promise<OrganizationExpenseSummary> => {
    try {
      const response = await apiClient.get<OrganizationExpenseSummary>('/admin/expenses/summary');
      return response.data;
    } catch {
      return mockOrgSummary;
    }
  },

  /**
   * GET /api/v1/admin/expenses/reports
   */
  getExpenseReportItems: async (): Promise<TransportExpenseReportItem[]> => {
    try {
      const response = await apiClient.get<TransportExpenseReportItem[]>('/admin/expenses/reports');
      return response.data;
    } catch {
      return mockExpenseItems;
    }
  },

  /**
   * GET /api/v1/employee/expenses
   */
  getEmployeePersonalExpenses: async (employeeId?: string): Promise<EmployeePersonalExpenses> => {
    try {
      const response = await apiClient.get<EmployeePersonalExpenses>('/employee/expenses', {
        params: { employeeId },
      });
      return response.data;
    } catch {
      return mockPersonalExpense;
    }
  },
};
