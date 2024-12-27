import { Breadcrumb } from '@/components';
import { Crumb } from '@/types';

export default function SSP() {
  const crumbs: Crumb[] = [
    {
      label: 'Feedback Report',
      href: '/manager/feedback-report'
    }
  ];
  return (
    <main className="flex flex-col items-center gap-4 p-4 sm:items-start">
      <Breadcrumb crumbs={crumbs} />
    </main>
  );
}