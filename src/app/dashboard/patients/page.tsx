import PageHeader from '@/components/dashboard/page-header';
import { PatientsView } from './patients-view';

export default function PatientsPage() {
  return (
    <>
      <PageHeader title="Patients" />
      <PatientsView />
    </>
  );
}
