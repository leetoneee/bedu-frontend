'use client';

import Breadcrumb from '@/components/Breadcrumb';
import { Crumb } from '@/types';
import { Divider } from '@nextui-org/react';
import AccountHeader from './AccountHeader';
import { useState } from 'react';
import StudentsTab from './Students.Tab';
import TeachersTab from './Teachers.Tab';

export default function Accountspage() {
  const crumbs: Crumb[] = [
    {
      label: 'Accounts',
      href: '/manager/accounts'
    }
  ];
  const [activeTab, setActiveTab] = useState<string>('Students');

  return (
    <main className="flex flex-col items-center gap-4 p-4 sm:items-start">
      <Breadcrumb crumbs={crumbs} />
      <Divider />
      <div className="flex w-full flex-col">
        <AccountHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        <Divider />
        {activeTab === 'Students' && <StudentsTab />}
        {activeTab === 'Teachers' && <TeachersTab />}
      </div>
    </main>
  );
}
