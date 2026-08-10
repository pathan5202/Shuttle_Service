import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useMyProfile,
  useUpdateMyProfile,
  useTodayTrip,
  useMyUpcomingBookings,
  useMyBookingHistory,
  useCommuteAnalytics,
} from '../../hooks/useEmployeePortal';
import { WelcomeBanner } from '../../components/employee/WelcomeBanner';
import { ReserveSeatWidget } from '../../components/employee/ReserveSeatWidget';
import { LiveRidesWidget } from '../../components/employee/LiveRidesWidget';
import { MyRidesSection } from '../../components/employee/MyRidesSection';
import { TransportAlertsWidget } from '../../components/employee/TransportAlertsWidget';
import { QuickActions } from '../../components/employee/QuickActions';
import { CommuteSummaryCards } from '../../components/employee/CommuteSummaryCards';
import { EmployeeProfileCard } from '../../components/employee/EmployeeProfileCard';
import { ProfileDrawer } from '../../components/employee/ProfileDrawer';
import { RefreshCw } from 'lucide-react';

export const EmployeeDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { data: profile } = useMyProfile();
  const updateProfileMutation = useUpdateMyProfile();

  const { data: todayTrip, refetch: refetchTodayTrip } = useTodayTrip();
  const { data: upcomingBookings, refetch: refetchUpcoming } = useMyUpcomingBookings();
  const { data: history, refetch: refetchHistory } = useMyBookingHistory();
  const { data: analytics, refetch: refetchAnalytics } = useCommuteAnalytics();

  const handleRefreshAll = () => {
    refetchTodayTrip();
    refetchUpcoming();
    refetchHistory();
    refetchAnalytics();
  };

  const handleCancelBooking = (bookingId: string) => {
    refetchUpcoming();
    refetchHistory();
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto animate-in fade-in duration-200">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <WelcomeBanner profile={profile || null} hasActiveTrip={!!todayTrip} />
        <button
          onClick={handleRefreshAll}
          className="self-end sm:self-center p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl transition-all shadow-sm flex items-center gap-2 text-xs font-bold shrink-0"
          title="Refresh Commute Data"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Sync Live Feeds</span>
        </button>
      </div>

      {/* 1. RESERVE SEAT - Hero Booking Widget */}
      <section>
        <ReserveSeatWidget />
      </section>

      {/* 2. LIVE RIDES & 4. ALERTS Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LiveRidesWidget trip={todayTrip || null} />
        </div>
        <div>
          <TransportAlertsWidget />
        </div>
      </section>

      {/* 5. QUICK ACTIONS */}
      <section>
        <QuickActions
          onCreateBooking={() => navigate('/employee/booking')}
          onTrackShuttle={() => navigate('/employee/track')}
          onViewTrips={() => navigate('/employee/dashboard')}
          onOpenExpenses={() => navigate('/employee/expenses')}
          onOpenNotifications={() => navigate('/notifications')}
          onOpenSupport={() => navigate('/support')}
        />
      </section>

      {/* 6. COMMUTE SUMMARY Analytics Cards */}
      <section>
        <div className="mb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Monthly Commute Summary & Benefit Analytics
          </h3>
        </div>
        <CommuteSummaryCards analytics={analytics || null} />
      </section>

      {/* 3. MY RIDES & Profile Card Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MyRidesSection
            upcomingBookings={upcomingBookings || []}
            bookingHistory={history || []}
            onCancelBooking={handleCancelBooking}
          />
        </div>

        <div>
          <EmployeeProfileCard
            profile={profile || null}
            onOpenProfileDrawer={() => setIsProfileOpen(true)}
          />
        </div>
      </section>

      {/* Profile Edit Drawer */}
      <ProfileDrawer
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={profile || null}
        onSaveProfile={(updated) => updateProfileMutation.mutate(updated)}
      />
    </div>
  );
};
