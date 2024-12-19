import { Schedule } from '@/components';
import Breadcrumb from '@/components/Breadcrumb';
import { Crumb, EventProps } from '@/types';
import { Divider } from '@nextui-org/react';

export default function SSP() {
  const crumbs: Crumb[] = [
    {
      label: 'Shedule',
      href: '/manager/schedule'
    }
  ];

  const events: EventProps[] = [
    {
      id: 1,
      title: 'Meeting',
      start: '2024-12-19 10:00',
      end: '2024-12-19 11:00',
      description: 'hello'
    },
    {
      id: 2,
      title: 'Lunch Break',
      start: '2024-12-19 12:00',
      end: '2024-12-19 13:00',
      description: 'hello'
    }
  ];

  return (
    <main className="flex flex-col items-center gap-4 p-4 sm:items-start">
      <Breadcrumb crumbs={crumbs} />
      <Divider />
      <div className="flex h-full w-full flex-col gap-2 rounded border border-on-surface/20 bg-white p-5 shadow-sm">
        <Schedule events={events}/>
      </div>
    </main>
  );
}
