import Breadcrumb from '@/components/Breadcrumb';
import { Crumb } from '@/types';

export default function SSP() {
  const crumbs: Crumb[] = [
    {
      label: 'Question Bank',
      href: '/manager/question-bank'
    }
  ];
  return (
    <main className="flex flex-col items-center p-3 sm:items-start">
      <Breadcrumb crumbs={crumbs} />
    </main>
  );
}