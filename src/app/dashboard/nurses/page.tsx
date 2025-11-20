import PageHeader from '@/components/dashboard/page-header';
import { NursesView } from './nurses-view';

export default function NursesPage() {
  return (
    <>
      <PageHeader title="Nurses" />
      <NursesView />
    </>
  );
}
