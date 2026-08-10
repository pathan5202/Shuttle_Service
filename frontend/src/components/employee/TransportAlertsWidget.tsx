import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../common/cards/Card';
import {
  AlertTriangle,
  Route,
  Calendar,
  Wrench,
  Megaphone,
  CheckCircle2,
  Bell,
  Clock,
} from 'lucide-react';

export interface TransportAlert {
  id: string;
  type: 'DELAY' | 'ROUTE_CHANGE' | 'HOLIDAY' | 'MAINTENANCE' | 'ANNOUNCEMENT';
  title: string;
  message: string;
  timestamp: string;
  severity: 'high' | 'medium' | 'info';
}

const mockAlerts: TransportAlert[] = [
  {
    id: 'alt-1',
    type: 'DELAY',
    title: 'Shuttle Delayed (ORR Express)',
    message: 'Shuttle OG-BUS-104 is running ~10 mins late due to Outer Ring Road heavy traffic.',
    timestamp: '10 mins ago',
    severity: 'high',
  },
  {
    id: 'alt-2',
    type: 'ROUTE_CHANGE',
    title: 'Route Alternate Notice',
    message: 'Whitefield Tech Express temporarily bypassing Gate 1 construction; using Gate 2 drop point.',
    timestamp: '1 hour ago',
    severity: 'medium',
  },
  {
    id: 'alt-3',
    type: 'HOLIDAY',
    title: 'Holiday Schedule Announcement',
    message: 'Reduced corporate shuttle schedule active on Friday for Corporate Independence Day.',
    timestamp: 'Yesterday',
    severity: 'info',
  },
  {
    id: 'alt-4',
    type: 'MAINTENANCE',
    title: 'Fleet Fleet Maintenance Notice',
    message: 'Shuttle OG-BUS-208 undergoing scheduled vehicle maintenance; replacement coach assigned.',
    timestamp: '2 days ago',
    severity: 'medium',
  },
  {
    id: 'alt-5',
    type: 'ANNOUNCEMENT',
    title: 'New Night Shift Shuttle Added',
    message: 'Late evening 09:30 PM departure now available on all major hub routes.',
    timestamp: '3 days ago',
    severity: 'info',
  },
];

export const TransportAlertsWidget: React.FC = () => {
  const getAlertIcon = (type: TransportAlert['type']) => {
    switch (type) {
      case 'DELAY':
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case 'ROUTE_CHANGE':
        return <Route className="w-4 h-4 text-blue-500" />;
      case 'HOLIDAY':
        return <Calendar className="w-4 h-4 text-purple-500" />;
      case 'MAINTENANCE':
        return <Wrench className="w-4 h-4 text-orange-500" />;
      case 'ANNOUNCEMENT':
        return <Megaphone className="w-4 h-4 text-indigo-500" />;
      default:
        return <Bell className="w-4 h-4 text-slate-500" />;
    }
  };

  const getAlertStyle = (type: TransportAlert['type']) => {
    switch (type) {
      case 'DELAY':
        return 'bg-amber-500/10 border-amber-500/20 text-amber-900 dark:text-amber-200';
      case 'ROUTE_CHANGE':
        return 'bg-blue-500/10 border-blue-500/20 text-blue-900 dark:text-blue-200';
      case 'HOLIDAY':
        return 'bg-purple-500/10 border-purple-500/20 text-purple-900 dark:text-purple-200';
      case 'MAINTENANCE':
        return 'bg-orange-500/10 border-orange-500/20 text-orange-900 dark:text-orange-200';
      case 'ANNOUNCEMENT':
        return 'bg-indigo-500/10 border-indigo-500/20 text-indigo-900 dark:text-indigo-200';
      default:
        return 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base flex items-center gap-2">
          <Bell className="w-4 h-4 text-indigo-500" />
          Transportation & Fleet Alerts
        </CardTitle>
        <span className="text-xs font-bold text-slate-400 font-mono">
          {mockAlerts.length} Active Notices
        </span>
      </CardHeader>

      <CardContent className="space-y-3">
        {mockAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-3.5 rounded-2xl border ${getAlertStyle(alert.type)} transition-all`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-white/80 dark:bg-slate-900/80 shadow-sm shrink-0">
                  {getAlertIcon(alert.type)}
                </div>
                <h4 className="font-extrabold text-xs">{alert.title}</h4>
              </div>

              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 shrink-0 flex items-center gap-1">
                <Clock className="w-3 h-3" /> {alert.timestamp}
              </span>
            </div>

            <p className="text-xs mt-2 pl-8 opacity-90 leading-relaxed font-medium">
              {alert.message}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
