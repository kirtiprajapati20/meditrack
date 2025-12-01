'use client';

import {
  HeartPulse,
  LayoutDashboard,
  Users,
  Calendar,
  Boxes,
  Stethoscope,
  FileText,
  Shield,
  UserPlus,
  UserCog,
  Settings,
  HelpCircle,
  LogOut,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from '@/components/ui/sidebar';

type NavItem = {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  badge?: string;
};

const menuItems: NavItem[] = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/patients', icon: Users, label: 'Patients' },
  { href: '/dashboard/doctors', icon: UserCog, label: 'Doctors' },
  { href: '/dashboard/nurses', icon: UserPlus, label: 'Nurses' },
  { href: '/dashboard/appointments', icon: Calendar, label: 'Appointments' },
  { href: '/dashboard/diagnosis', icon: HeartPulse, label: 'Diagnosis Tool' },
  { href: '/dashboard/inventory', icon: Boxes, label: 'Inventory' },
  { href: '/dashboard/billing', icon: FileText, label: 'Billing' },
  { href: '/dashboard/users', icon: Shield, label: 'Staff Roles' },
];

export function DashboardNav() {
  const pathname = usePathname();

  const NavLink = ({ item }: { item: NavItem }) => {
    const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
    const Icon = item.icon;

    return (
      <Link
        href={item.href}
        className={cn(
          'relative flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group',
          isActive
            ? 'text-primary font-semibold'
            : 'text-gray-500 hover:bg-primary/10'
        )}
      >
        {/* Active indicator bar */}
        {isActive && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full" />
        )}
        
        <Icon
          className={cn(
            'h-5 w-5 flex-shrink-0',
            isActive ? 'text-primary' : 'text-gray-500'
          )}
        />
        
        <span className="flex-1">{item.label}</span>
        
        {item.badge && (
          <span className="px-2 py-0.5 text-xs font-medium bg-primary text-white rounded-md">
            {item.badge}
          </span>
        )}
      </Link>
    );
  };

  return (
    <Sidebar className="bg-white border-r">
     <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
          <Stethoscope className="w-7 h-7 text-primary" />
          <h2 className="text-xl font-bold tracking-tight">MediTrack</h2>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <nav className="space-y-6">
          {/* MENU Section */}
          <div>
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <NavLink item={item} />
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </SidebarContent>
    </Sidebar>
  );
}
