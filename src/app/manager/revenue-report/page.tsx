'use client';

import Breadcrumb from '@/components/Breadcrumb';
import { Crumb } from '@/types';
import { Chip, Divider, Input } from '@nextui-org/react';
import { useState } from 'react';

export default function SSP() {
  const crumbs: Crumb[] = [
    {
      label: 'Revenue Report',
      href: '/manager/revenue-report'
    }
  ];

  const [filter, setFilter] = useState<string | null>(null); // 'ielts', 'toeic', 'toefl', or null
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const handleFilterChange = (newFilter: string | null) => {
    setFilter((prevFilter) => (prevFilter === newFilter ? null : newFilter));
  };

  return (
    <main className="flex flex-col items-center gap-4 p-4 sm:items-start">
      <Breadcrumb crumbs={crumbs} />
      <Divider />
      <div className="flex h-full w-full flex-col gap-2 rounded border border-on-surface/20 bg-white p-5 shadow-sm">
        <div className="flex flex-row gap-10">
          {/* Start Date*/}
          <div className="flex flex-row gap-2">
            <span className="text-nowrap text-base text-black">Start Date</span>
            <input
              type="date"
              className={
                'h-16 rounded-[10px] border border-outline bg-b-primary p-5 text-2xl sm:h-12 sm:text-xl'
              }
              placeholder="Le Toan"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="flex flex-row gap-2">
            <span className="text-nowrap text-base text-black">End Date</span>
            <input
              type="date"
              className={
                'h-16 rounded-[10px] border border-outline bg-b-primary p-5 text-2xl sm:h-12 sm:text-xl'
              }
              placeholder="Le Toan"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <Divider />
        {/* Filter */}
        <div className="flex w-full flex-row gap-16">
          <div className="w-20 justify-center">
            <Chip
              className="select-none capitalize hover:cursor-pointer"
              color={'danger'}
              size="lg"
              variant={filter === 'ielts' ? 'flat' : 'bordered'}
              onClick={() => handleFilterChange('ielts')}
            >
              IELTS
            </Chip>
          </div>
          <div className="w-20 justify-center">
            <Chip
              className="select-none capitalize hover:cursor-pointer"
              color={'warning'}
              size="lg"
              variant={filter === 'toeic' ? 'flat' : 'bordered'}
              onClick={() => handleFilterChange('toeic')}
            >
              TOEIC
            </Chip>
          </div>
          <div className="w-20 justify-center">
            <Chip
              className="select-none capitalize hover:cursor-pointer"
              color={'success'}
              size="lg"
              variant={filter === 'toefl' ? 'flat' : 'bordered'}
              onClick={() => handleFilterChange('toefl')}
            >
              TOEFL
            </Chip>
          </div>
        </div>
      </div>
    </main>
  );
}
