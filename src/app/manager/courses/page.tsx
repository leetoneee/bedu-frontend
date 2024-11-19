import Breadcrumb from '@/components/Breadcrumb';
import { Crumb } from '@/types';
import { Divider } from '@nextui-org/react';

export default function SSP() {
  const crumbs: Crumb[] = [
    {
      label: 'Courses',
      href: '/manager/Courses'
    }
  ];
  return (
    <main className="flex flex-col items-center gap-4 p-4 sm:items-start">
      <Breadcrumb crumbs={crumbs} />
      <Divider />
    </main>
  );
}
