import PageHeader from '@/components/dashboard/page-header';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { DoctorsView } from './doctors-view';

export default function DoctorsPage() {
  return (
    <>
      <PageHeader title="Doctors">
        {/* The Dialog for adding a doctor is now inside DoctorsView */}
      </PageHeader>
      <DoctorsView />
    </>
  );
}
