import PageHeader from '@/components/dashboard/page-header';
import { DiagnosisForm } from './diagnosis-form';

export default function DiagnosisPage() {
  return (
    <>
      <PageHeader title="Automated Diagnosis Tool" />
      <DiagnosisForm />
    </>
  );
}
