import Breadcrumb from '@/components/Breadcrumb';
import { Crumb } from '@/types';
import { Divider } from '@nextui-org/react';

export default function SSP() {
  const crumbs: Crumb[] = [
    {
      label: 'Live Program',
      href: '/manager/live-program'
    }
  ];
  return (
    <main className="flex flex-col items-center p-4 gap-4 sm:items-start">
      <Breadcrumb crumbs={crumbs} />
      <Divider />
    </main>
  );
}