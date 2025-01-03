'use client'

import Breadcrumb from '@/components/Breadcrumb';
import { Crumb } from '@/types';
import { Divider } from '@nextui-org/react';
import { useState } from 'react';
import TuitionHeader from './TuitionHeader';
import SSPTab from './SSP.Tab';
import LPTab from './LP.Tab';

export default function TuitionPage() {
  const crumbs: Crumb[] = [
    {
      label: 'Tuition Fees',
      href: '/manager/tuition-fees'
    }
  ];
  const [activeTab, setActiveTab] = useState<string>('Self-study Program');

  return (
    <main className="flex flex-col items-center gap-4 p-4 sm:items-start">
      <Breadcrumb crumbs={crumbs} />
      <Divider />
      <div className="flex w-full flex-col">
        <TuitionHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        <Divider />
        {activeTab === 'Self-study Program' && <SSPTab />}
        {activeTab === 'Live Program' && <LPTab />}
      </div>
    </main>
  );
}
