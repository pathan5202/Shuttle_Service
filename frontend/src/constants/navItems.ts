import { ROUTES } from './routes';
import { Role } from '../types';

export interface NavItem {
  id: string;
  label: string;
  path: string;
  iconName: string;
  badge?: string;
  badgeColor?: string;
  subItems?: { id: string; label: string; path: string }[];
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const ADMIN_NAV_SECTIONS: NavSection[] = [
  {
    title: 'OVERVIEW',
    items: [
      {
        id: 'admin-dashboard',
        label: 'Admin Dashboard',
        path: ROUTES.ADMIN.DASHBOARD,
        iconName: 'LayoutDashboard',
      },
      {
        id: 'admin-reports',
        label: 'Reports & Analytics',
        path: ROUTES.ADMIN.REPORTS,
        iconName: 'FileText',
      },
      {
        id: 'admin-live-tracking',
        label: 'Live Fleet Map',
        path: ROUTES.ADMIN.LIVE_TRACKING,
        iconName: 'Navigation',
        badge: 'LIVE',
        badgeColor: 'bg-emerald-500 text-white',
      },
      {
        id: 'admin-approvals',
        label: 'User Approval Center',
        path: ROUTES.ADMIN.APPROVALS,
        iconName: 'UserCheck',
        badge: 'Pending',
        badgeColor: 'bg-amber-500 text-white',
      },
    ],
  },
  {
    title: 'OPERATIONS',
    items: [
      {
        id: 'admin-routes',
        label: 'Route Network',
        path: ROUTES.ADMIN.ROUTES,
        iconName: 'GitMerge',
      },
      {
        id: 'admin-shuttles',
        label: 'Shuttle Fleet',
        path: ROUTES.ADMIN.SHUTTLES,
        iconName: 'Bus',
        badge: '18 Active',
        badgeColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
      },
      {
        id: 'admin-bookings',
        label: 'Shuttle Bookings',
        path: ROUTES.ADMIN.BOOKINGS,
        iconName: 'Ticket',
      },
      {
        id: 'admin-users',
        label: 'User Management',
        path: ROUTES.ADMIN.USERS,
        iconName: 'Users',
      },
    ],
  },
  {
    title: 'INSIGHTS & CONFIG',
    items: [
      {
        id: 'admin-expenses',
        label: 'Transport Expenses',
        path: ROUTES.ADMIN.EXPENSES,
        iconName: 'DollarSign',
      },
      {
        id: 'admin-complaints',
        label: 'Complaint Management',
        path: ROUTES.ADMIN.COMPLAINTS,
        iconName: 'AlertCircle',
        badge: 'HelpDesk',
        badgeColor: 'bg-amber-500/20 text-amber-500',
      },
      {
        id: 'admin-analytics',
        label: 'AI Fleet Analytics',
        path: ROUTES.ADMIN.ANALYTICS,
        iconName: 'BarChart3',
      },
      {
        id: 'admin-settings',
        label: 'System Settings',
        path: ROUTES.ADMIN.SETTINGS,
        iconName: 'Settings',
      },
    ],
  },
];

export const EMPLOYEE_NAV_SECTIONS: NavSection[] = [
  {
    title: 'COMMUTE',
    items: [
      {
        id: 'emp-dashboard',
        label: 'My Commute',
        path: ROUTES.EMPLOYEE.DASHBOARD,
        iconName: 'Home',
      },
      {
        id: 'emp-booking',
        label: 'Reserve Seat',
        path: ROUTES.EMPLOYEE.BOOKING,
        iconName: 'Ticket',
      },
      {
        id: 'emp-pass',
        label: 'Digital Boarding Pass',
        path: ROUTES.EMPLOYEE.PASS,
        iconName: 'Ticket',
      },
      {
        id: 'emp-expenses',
        label: 'My Transport Expenses',
        path: ROUTES.EMPLOYEE.EXPENSES,
        iconName: 'DollarSign',
      },
      {
        id: 'emp-complaints',
        label: 'Raise / Track Complaint',
        path: ROUTES.EMPLOYEE.COMPLAINTS,
        iconName: 'AlertCircle',
      },
      {
        id: 'emp-track',
        label: 'Track My Shuttle',
        path: ROUTES.EMPLOYEE.TRACK,
        iconName: 'MapPin',
        badge: 'ETA 4m',
        badgeColor: 'bg-blue-500 text-white',
      },
    ],
  },
];

export const DRIVER_NAV_SECTIONS: NavSection[] = [
  {
    title: 'DRIVER CONSOLE',
    items: [
      {
        id: 'driver-dashboard',
        label: 'Shift Console',
        path: ROUTES.DRIVER.DASHBOARD,
        iconName: 'Compass',
      },
      {
        id: 'driver-navigation',
        label: 'Live GPS Navigation',
        path: ROUTES.DRIVER.NAVIGATION,
        iconName: 'Navigation',
        badge: 'Live',
        badgeColor: 'bg-emerald-500 text-white',
      },
      {
        id: 'driver-trips',
        label: 'Assigned Trips',
        path: ROUTES.DRIVER.TRIPS,
        iconName: 'CalendarCheck',
      },
      {
        id: 'driver-checkin',
        label: 'Employee Boarding List',
        path: ROUTES.DRIVER.CHECKIN,
        iconName: 'UserCheck',
      },
      {
        id: 'driver-complaints',
        label: 'Driver Support & Complaints',
        path: ROUTES.DRIVER.COMPLAINTS,
        iconName: 'AlertCircle',
      },
    ],
  },
];

export function getNavSectionsForRole(role: Role): NavSection[] {
  switch (role) {
    case 'ADMIN':
    case 'FLEET_MANAGER':
      return ADMIN_NAV_SECTIONS;
    case 'EMPLOYEE':
      return EMPLOYEE_NAV_SECTIONS;
    case 'DRIVER':
      return DRIVER_NAV_SECTIONS;
    default:
      return EMPLOYEE_NAV_SECTIONS;
  }
}
