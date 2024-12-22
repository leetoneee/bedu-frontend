'use client';

import {
  Breadcrumb,
  Header,
  NavHeader,
  ProgramCard,
  SelfStudyProgramCard
} from '@/components';
import { Crumb } from '@/types';
import { Program } from '@/types/program.type';
import { Chip, Divider, Spinner } from '@nextui-org/react';
import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';
import axios from '@/libs/axiosInstance';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function ProgramPage() {
  const crumbs: Crumb[] = [
    {
      label: 'Homepage',
      href: '/'
    },
    {
      label: 'Self-study Program',
      href: '/self-study-program'
    }
  ];

  const getKey = (pageIndex: number, previousPageData: any) => {
    pageIndex += 1;
    if (previousPageData && !previousPageData.length) return null; // reached the end
    return `/programs/all${filter ? `/type/${filter}` : ''}?page=${pageIndex}&limit=10`; // SWR key
  };

  const [programs, setPrograms] = useState<Program[]>([]);
  const [totalPrograms, setTotalPrograms] = useState<number>(0);

  const [filter, setFilter] = useState<string | null>(null); // 'ielts', 'toeic', 'toefl', or null

  const { data, isLoading, size, setSize } = useSWRInfinite(getKey, fetcher, {
    parallel: true
  });

  useEffect(() => {
    if (data) {
      const listPrograms: Program[] = data.flatMap((item) =>
        item.metadata.programs ? item.metadata.programs : []
      );
      setPrograms(listPrograms);
      setTotalPrograms(data[0].metadata.totalRecord);
    }
  }, [data]);

  const handleFilterChange = (newFilter: string | null) => {
    setFilter((prevFilter) => (prevFilter === newFilter ? null : newFilter));
    setSize(1);
  };

  return (
    <main className="flex flex-col items-center gap-4 p-4 sm:items-start">
      <Breadcrumb crumbs={crumbs} />
      <Divider />
      {/* Filter */}
      <div className="flex w-full flex-row justify-center gap-16">
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

        <span>
          Total: <span className="text-2xl">{totalPrograms}</span> programs
        </span>
      </div>
      <div className="mx-auto flex w-full flex-row flex-wrap justify-start gap-4">
        {programs.map((program) => (
          <Fragment key={program.id}>
            <ProgramCard program={program} />
          </Fragment>
        ))}
      </div>
      {isLoading && <Spinner />}
      <button
        className="mx-auto cursor-pointer rounded-lg bg-primary p-2 text-white shadow-md"
        onClick={() => setSize(size + 1)}
      >
        Load more
      </button>
    </main>
  );
}
