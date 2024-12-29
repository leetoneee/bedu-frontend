'use client';

import { Breadcrumb, ClassOverviewCard, Navigation } from '@/components';
import React, { Fragment, useEffect, useState } from 'react';
import { Crumb } from '@/types';
import { Divider, Input, Spinner } from '@nextui-org/react';
import axios from '@/libs/axiosInstance';
import useSWRInfinite from 'swr/infinite';
import { useSession } from 'next-auth/react';
import { EClass } from '@/types/class.type';
import { EnrollmentClass } from '@/types/enrollment.type';

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

  interface PageData {
    metadata: {
      userClasses: EnrollmentClass[];
      totalRecord: number;
    };
  }

  const getKey = (pageIndex: number, previousPageData: PageData | null) => {
    pageIndex += 1;
    if (previousPageData && !previousPageData.metadata.userClasses.length)
      return null; // reached the end
    return `/users-classes/all/student/${session?.user.id}?page=${pageIndex}&limit=10`; // SWR key
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

  useEffect(() => {
    if (data) {
      console.log('🚀 ~ useEffect ~ data:', data);
      const listEnrollments: EnrollmentClass[] = data.flatMap((item) =>
        item.metadata.userClasses ? item.metadata.userClasses : []
      );
      console.log('🚀 ~ useEffect ~ data:', listEnrollments);
      const listClassses: EClass[] = listEnrollments.map(
        (enrollment) => enrollment.class
      );
      console.log('🚀 ~ useEffect ~ listPrograms:', listClassses);
      setEClasses(listClassses);
      setTotalClasses(data[0].metadata.totalRecord);
    } else {
      setEClasses([]);
      setTotalClasses(0);
    }
  }, [data]);

  return (
    <main className="flex flex-col items-center gap-4 p-4 sm:items-start">
      <Breadcrumb crumbs={crumbs} />
      <Divider />
      <div className="flex w-full flex-row gap-4">
        <div className="w-72 flex-none">
          <Navigation />
        </div>
        {/* Code ở đây */}
        <div className="flex w-full shrink flex-col gap-4">
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
