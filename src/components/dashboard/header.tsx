import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserNav } from './user-nav';

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <div className="flex-1">
        <Input placeholder="Search Keyword" className="w-full md:w-1/3" />
      </div>
      <div className="flex items-center justify-end gap-4">
        <UserNav />
      </div>
    </header>
  );
}
