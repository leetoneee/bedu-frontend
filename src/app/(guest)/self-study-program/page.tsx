import { Breadcrumb, Header, NavHeader } from '@/components';
import { Crumb } from '@/types';
import { Divider } from '@nextui-org/react';
import Image from 'next/image';

export default function ProgramPage() {
  const crumbs: Crumb[] = [
    {
      label: 'Homepage',
      href: '/'
    },
    {
      label: 'Self-study Program',
      href: '/self-study-program'
    },
  ];

  return (
    <main className="flex flex-col items-center gap-4 p-4 sm:items-start">
      <Breadcrumb crumbs={crumbs} />
      <Divider />
      <div className="flex w-full flex-row gap-4">
        
      </div>
    </main>
  );
}
