'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
} from '@/components/ui/sidebar';
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
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/patients', icon: Users, label: 'Patients' },
  { href: '/dashboard/doctors', icon: UserCog, label: 'Doctors' },
  { href: '/dashboard/nurses', icon: UserPlus, label: 'Nurses' },
  { href: '/dashboard/appointments', icon: Calendar, label: 'Appointments' },
  { href: '/dashboard/diagnosis', icon: Stethoscope, label: 'Diagnosis Tool' },
  { href: '/dashboard/inventory', icon: Boxes, label: 'Inventory' },
  { href: '/dashboard/billing', icon: FileText, label: 'Billing' },
  { href: '/dashboard/users', icon: Shield, label: 'Staff Roles' },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
          <HeartPulse className="w-7 h-7 text-primary" />
          <h2 className="text-xl font-bold tracking-tight">MediTrack</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <li key={item.href} className="group/menu-item relative">
              <Link
                href={item.href}
                className={cn(
                  buttonVariants({ variant: 'ghost', size: 'default' }),
                  'flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50',
                  pathname === item.href &&
                    'bg-sidebar-accent font-medium text-sidebar-accent-foreground'
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
