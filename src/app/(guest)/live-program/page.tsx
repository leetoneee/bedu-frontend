'use client';

import { Breadcrumb, ClassCard } from '@/components';
import { Crumb } from '@/types';
import { Fragment, useEffect, useState } from 'react';
import useSWRInfinite from 'swr/infinite';
import axios from '@/libs/axiosInstance';
import { Chip, Divider, Spinner } from '@nextui-org/react';
import { EClass } from '@/types/class.type';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function LivePage() {
  const crumbs: Crumb[] = [
    {
      label: 'Homepage',
      href: '/'
    },
    {
      label: 'Live Program',
      href: '/self-study-program'
    }
  ];

  const getKey = (pageIndex: number, previousPageData: any) => {
    pageIndex += 1;
    if (previousPageData && !previousPageData.length) return null; // reached the end
    return `/classes/all${filter ? `/type/${filter}` : ''}?page=${pageIndex}&limit=10`; // SWR key
  };

  const [eclasses, setEClasses] = useState<EClass[]>([]);
  const [totalClasses, setTotalClasses] = useState<number>(0);

  const [filter, setFilter] = useState<string | null>(null); // 'ielts', 'toeic', 'toefl', or null

  const { data, isLoading, size, setSize } = useSWRInfinite(getKey, fetcher, {
    parallel: true
  });

  useEffect(() => {
    if (data) {
      const listClassess: EClass[] = data.flatMap((item) =>
        item.metadata.classes ? item.metadata.classes : []
      );
      setEClasses(listClassess);
      setTotalClasses(data[0].metadata.totalRecord);
    } else {
      setEClasses([]);
      setTotalClasses(0);
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
          Total: <span className="text-2xl">{totalClasses}</span> programs
        </span>
      </div>
      <div className="mx-auto flex w-full flex-row flex-wrap justify-start gap-4">
        {eclasses.map((eclass) => (
          <Fragment key={eclass.id}>
            <ClassCard eclass={eclass} />
          </Fragment>
        ))}
      </div>
      {isLoading && (
        <div className="mx-auto p-2">
          <Spinner />
        </div>
      )}
      {eclasses.length < totalClasses && (
        <button
          className="mx-auto cursor-pointer rounded-lg bg-primary p-2 text-white shadow-md"
          onClick={() => setSize(size + 1)}
        >
          Load more
        </button>
      )}
    </main>
  );
}
