import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../common/headers/PageHeader';
import { Button } from '../../common/buttons/Button';
import { Card } from '../../common/cards/Card';
import { BoardingSummary } from './BoardingSummary';
import { EmployeeSearch } from './EmployeeSearch';
import { BoardingFilters, StopFilterType } from './BoardingFilters';
import { StopAccordion } from './StopAccordion';
import { ShuttleStop } from './StopCard';
import { EmployeeBoardingRecord } from './EmployeeCard';
import { stopService } from '../../../services/stopService';
import { employeeService } from '../../../services/employeeService';
import { routeService } from '../../../services/routeService';
import {
  ChevronDown,
  ChevronUp,
  Navigation,
  Bus,
} from 'lucide-react';

export const EmployeeBoardingList: React.FC = () => {
  const [stops, setStops] = useState<ShuttleStop[]>([]);
  const [employees, setEmployees] = useState<EmployeeBoardingRecord[]>([]);
  const [routeName, setRouteName] = useState('Route #402 - Commuter Express Shuttle');
  const [isLoading, setIsLoading] = useState(true);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [stopFilter, setStopFilter] = useState<StopFilterType>('ALL_STOPS');
  const [departmentFilter, setDepartmentFilter] = useState<string>('ALL_DEPTS');

  // Load live data from database services
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [dbStops, dbEmployees, dbRoutes] = await Promise.all([
          stopService.getStops(),
          employeeService.getEmployees(),
          routeService.getRoutes(),
        ]);

        if (dbRoutes.length > 0) {
          setRouteName(`${dbRoutes[0].code || 'RT-101'} - ${dbRoutes[0].name}`);
        }

        // Map database stops to ShuttleStop model
        const mappedStops: ShuttleStop[] = dbStops.slice(0, 5).map((s, idx) => ({
          id: s.id,
          order: idx + 1,
          name: s.name,
          address: s.address,
          eta: `08:${String(30 + idx * 12).padStart(2, '0')} AM`,
          distanceRemaining: idx === 0 ? '0 km (Arrived)' : `${(idx * 3.5).toFixed(1)} km away`,
          status: idx === 0 ? 'CURRENT' : 'UPCOMING',
          isDestination: idx === dbStops.length - 1,
        }));

        // Map database employees to EmployeeBoardingRecord
        const mappedEmployees: EmployeeBoardingRecord[] = dbEmployees.map((emp, idx) => {
          const assignedStop = mappedStops[idx % (mappedStops.length || 1)] || {
            id: 'stop-1',
            name: 'Main Transit Hub',
          };
          const lastStop = mappedStops[mappedStops.length - 1] || {
            id: 'stop-dest',
            name: 'Corporate HQ',
          };

          return {
            id: emp.id,
            name: `${emp.firstName} ${emp.lastName}`,
            employeeId: (emp as any).employeeCode || emp.employeeId || `EMP-${1000 + idx}`,
            department: emp.department || 'Operations',
            seatNumber: `${String(idx + 1).padStart(2, '0')}${['A', 'B', 'C', 'D'][idx % 4]}`,
            pickupStopId: assignedStop.id,
            pickupStopName: assignedStop.name,
            dropoffStopId: lastStop.id,
            dropoffStopName: lastStop.name,
          };
        });

        setStops(mappedStops.length > 0 ? mappedStops : [
          {
            id: 'stp-1',
            order: 1,
            name: 'Financial District Terminal',
            address: 'Market St & 1st St',
            eta: '08:30 AM',
            distanceRemaining: '0 km (Arrived)',
            status: 'CURRENT',
          }
        ]);
        setEmployees(mappedEmployees);
      } catch (err) {
        console.error('Error loading boarding data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Active Current Stop
  const currentStop = stops.find((s) => s.status === 'CURRENT') || stops[0] || { id: 'default', name: 'Starting Depot' };

  // Accordion Expanded State
  const [expandedStopIds, setExpandedStopIds] = useState<string[]>([]);

  useEffect(() => {
    if (currentStop && currentStop.id && expandedStopIds.length === 0) {
      setExpandedStopIds([currentStop.id]);
    }
  }, [currentStop]);

  // Extract unique departments for filter dropdown
  const uniqueDepartments = Array.from(new Set(employees.map((e) => e.department))).sort();

  // Synchronize and auto-expand current stop on load or focus
  useEffect(() => {
    if (currentStop && !expandedStopIds.includes(currentStop.id)) {
      setExpandedStopIds((prev) => [...prev, currentStop.id]);
    }
  }, []);

  // Action: Toggle Accordion
  const toggleStopExpand = (stopId: string) => {
    setExpandedStopIds((prev) =>
      prev.includes(stopId) ? prev.filter((id) => id !== stopId) : [...prev, stopId]
    );
  };

  const expandAllStops = () => setExpandedStopIds(stops.map((s) => s.id));
  const collapseAllStops = () => setExpandedStopIds([]);

  // Auto focus & scroll to current stop
  const focusCurrentStop = () => {
    if (!expandedStopIds.includes(currentStop.id)) {
      setExpandedStopIds((prev) => [...prev, currentStop.id]);
    }
    const elem = document.getElementById(`stop-accordion-${currentStop.id}`);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Metrics Calculation
  const totalStops = stops.length;
  const currentStopName = currentStop.name;
  const remainingStopsCount = stops.filter((s) => s.status === 'UPCOMING').length;
  const totalEmployees = employees.length;
  const expectedAtCurrentStop = employees.filter(
    (e) => e.pickupStopId === currentStop.id || e.dropoffStopId === currentStop.id
  ).length;
  const estimatedArrivalAtOffice = stops.find((s) => s.isDestination)?.eta || '09:15 AM';

  // Filter stops according to Stop Filter
  const filteredStops = stops.filter((stop) => {
    if (stopFilter === 'CURRENT_STOP') return stop.status === 'CURRENT';
    if (stopFilter === 'UPCOMING_STOPS') return stop.status === 'UPCOMING';
    if (stopFilter === 'COMPLETED_STOPS') return stop.status === 'COMPLETED';
    return true;
  });

  // Helper to filter employees assigned to a specific stop
  const getEmployeesForStop = (stopId: string) => {
    return employees.filter((emp) => {
      // Must belong to this pickup stop OR drop-off stop
      const isPickupHere = emp.pickupStopId === stopId;
      const isDropoffHere = emp.dropoffStopId === stopId;
      const belongsToStop = isPickupHere || isDropoffHere;

      if (!belongsToStop) return false;

      // Search Query filter (Name, ID, Department)
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        emp.name.toLowerCase().includes(query) ||
        emp.employeeId.toLowerCase().includes(query) ||
        emp.department.toLowerCase().includes(query);

      // Department filter
      const matchesDept =
        departmentFilter === 'ALL_DEPTS' || emp.department === departmentFilter;

      return matchesSearch && matchesDept;
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 pb-12">
      {/* Page Header */}
      <PageHeader
        title="Stop-wise Employee Boarding List"
        subtitle="Operational view of expected shift employees, assigned seats, and pickup locations grouped by scheduled route stops."
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={focusCurrentStop}
            leftIcon={<Navigation className="w-4 h-4 text-emerald-500 fill-emerald-500/20 animate-pulse" />}
          >
            Focus Current Stop
          </Button>
        }
      />

      {/* Summary Panel */}
      <BoardingSummary
        routeName={routeName}
        totalStops={totalStops}
        currentStopName={currentStopName}
        remainingStopsCount={remainingStopsCount}
        totalEmployees={totalEmployees}
        expectedAtCurrentStop={expectedAtCurrentStop}
        estimatedArrivalAtOffice={estimatedArrivalAtOffice}
      />

      {/* Toolbar: Search, Filters & Accordion Expand Controls */}
      <Card className="p-4 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <EmployeeSearch value={searchQuery} onChange={setSearchQuery} />

          {/* Accordion Expand / Collapse Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={expandAllStops}
              leftIcon={<ChevronDown className="w-4 h-4" />}
            >
              Expand All
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={collapseAllStops}
              leftIcon={<ChevronUp className="w-4 h-4" />}
            >
              Collapse All
            </Button>
          </div>
        </div>

        {/* Filters */}
        <BoardingFilters
          stopFilter={stopFilter}
          onStopFilterChange={setStopFilter}
          departmentFilter={departmentFilter}
          onDepartmentFilterChange={setDepartmentFilter}
          departments={uniqueDepartments}
        />
      </Card>

      {/* Stop Accordions List */}
      <div className="space-y-4">
        {filteredStops.length === 0 ? (
          <Card className="p-8 text-center space-y-2">
            <Bus className="w-8 h-8 text-slate-400 mx-auto" />
            <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
              No stops match your filter
            </h4>
            <p className="text-xs text-slate-500">Try adjusting the stop filter or search criteria above.</p>
          </Card>
        ) : (
          filteredStops.map((stop) => {
            const stopEmployees = getEmployeesForStop(stop.id);
            const isExpanded = expandedStopIds.includes(stop.id);

            return (
              <StopAccordion
                key={stop.id}
                stop={stop}
                employees={stopEmployees}
                isExpanded={isExpanded}
                onToggleExpand={() => toggleStopExpand(stop.id)}
              />
            );
          })
        )}
      </div>
    </div>
  );
};
