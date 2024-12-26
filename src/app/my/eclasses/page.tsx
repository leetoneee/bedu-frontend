'use client';

import {
  Breadcrumb,
  ClassOverviewCard,
  NavHeader,
  Navigation
} from '@/components';
import React, { Fragment, useState } from 'react';
import { Crumb } from '@/types';
import { Divider, Input, Spinner } from '@nextui-org/react';
import axios from '@/libs/axiosInstance';
import useSWRInfinite from 'swr/infinite';
import { useSession } from 'next-auth/react';
import { EClass } from '@/types/class.type';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const MyClassPage = () => {
  const { data: session } = useSession();

  const crumbs: Crumb[] = [
    {
      label: 'Homepage',
      href: '/'
    },
    {
      label: 'My Classes',
      href: '/my/classes'
    }
  ];

  const [eclasses, setEClasses] = useState<EClass[]>([]);
  const [totalClasses, setTotalClasses] = useState<number>(0);
  const [filterClassName, setFilterClassName] = useState<string>('');
  const hasSearchFilter = Boolean(filterClassName);

  const getKey = (pageIndex: number, previousPageData: any) => {
    pageIndex += 1;
    if (previousPageData && !previousPageData.length) return null; // reached the end
    return `/users-classes/all/user/${session?.user.id}?page=${pageIndex}&limit=10`; // SWR key
  };

  const { data, isLoading, size, setSize } = useSWRInfinite(getKey, fetcher, {
    parallel: true
  });

  const filteredItems = React.useMemo(() => {
    let filteredClasses = [...eclasses];

    if (hasSearchFilter) {
      filteredClasses = filteredClasses.filter((eclass) =>
        eclass.name.toLowerCase().includes(filterClassName.toLowerCase())
      );
    }

    return filteredClasses;
  }, [eclasses, filterClassName]);
  return (
    <main className="flex flex-col items-center gap-4 p-4 sm:items-start">
      <Breadcrumb crumbs={crumbs} />
      <Divider />
      <div className="flex flex-row gap-4 w-full">
        <div className="w-72 flex-none">
          <Navigation />
        </div>
        {/* Code ở đây */}
        <div className="flex shrink w-full flex-col gap-4 ">
          <Input
            className="mr-auto w-56 bg-white"
            variant="bordered"
            size={'md'}
            type=""
            placeholder="Find your class name"
            value={filterClassName}
            onChange={(e) => setFilterClassName(e.target.value)}
          />

          <Divider />

          {/* List program */}
          <div className="mx-auto flex w-full flex-row flex-wrap justify-start gap-4">
            {filteredItems.map((program) => (
              <Fragment key={program.id}>
                <ClassOverviewCard eclass={program} />
              </Fragment>
            ))}
          </div>

          {/* Load more */}
          <div className="flex w-full items-center justify-center p-2">
            {isLoading && <Spinner />}
            {eclasses.length < totalClasses && (
              <button
                className="mx-auto cursor-pointer rounded-lg bg-primary p-2 text-white shadow-md"
                onClick={() => setSize(size + 1)}
              >
                Load more
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default MyClassPage;
