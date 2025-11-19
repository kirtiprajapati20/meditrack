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
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from '@/components/ui/sidebar';
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
        <nav>
          <ul className="flex flex-col gap-1 p-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    buttonVariants({
                      variant: pathname === item.href ? 'secondary' : 'ghost',
                      size: 'default',
                    }),
                    'flex w-full justify-start items-center gap-2'
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </SidebarContent>
    </Sidebar>
  );
}
