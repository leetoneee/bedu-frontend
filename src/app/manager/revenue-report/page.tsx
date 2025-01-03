import Breadcrumb from '@/components/Breadcrumb';
import { Crumb } from '@/types';

export default function SSP() {
  const crumbs: Crumb[] = [
    {
      label: 'Revenue Report',
      href: '/manager/revenue-report'
    }
  ];
  return (
    <main className="flex flex-col items-center p-3 sm:items-start">
      <Breadcrumb crumbs={crumbs} />
    </main>
  );
}