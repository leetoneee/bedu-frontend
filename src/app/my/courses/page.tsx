'use client';

import {
  Breadcrumb,
  NavHeader,
  Navigation,
  ProgramCard,
  ProgramOverviewCard
} from '@/components';
import React, { Fragment, useEffect, useState } from 'react';
import Image from 'next/image';
import { Crumb } from '@/types';
import { Divider, Input, Spinner } from '@nextui-org/react';
import axios from '@/libs/axiosInstance';
import useSWRInfinite from 'swr/infinite';
import { Program } from '@/types/program.type';
import { Enrollment } from '@/types/enrollment.type';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const MyCoursesPage = () => {
  const crumbs: Crumb[] = [
    {
      label: 'Homepage',
      href: '/'
    },
    {
      label: 'My Courses',
      href: '/my/courses'
    }
  ];

  const getKey = (pageIndex: number, previousPageData: any) => {
    pageIndex += 1;
    if (previousPageData && !previousPageData.length) return null; // reached the end
    return `/users_programs/all/user/2?page=${pageIndex}&limit=10`; // SWR key
  };

  const [programs, setPrograms] = useState<Program[]>([]);
  const [totalPrograms, setTotalPrograms] = useState<number>(0);
  const [filterProgramName, setFilterProgramName] = useState<string>('');
  const hasSearchFilter = Boolean(filterProgramName);

  const { data, isLoading, size, setSize } = useSWRInfinite(getKey, fetcher, {
    parallel: true
  });

  useEffect(() => {
    if (data) {
      const listEnrollments: Enrollment[] = data.flatMap((item) =>
        item.metadata.enrollments ? item.metadata.enrollments : []
      );
      console.log('🚀 ~ useEffect ~ data:', listEnrollments);
      const listPrograms: Program[] = listEnrollments.map(
        (enrollment) => enrollment.program
      );
      console.log('🚀 ~ useEffect ~ listPrograms:', listPrograms);
      setPrograms(listPrograms);
      setTotalPrograms(data[0].metadata.total);
    } else {
      setPrograms([]);
      setTotalPrograms(0);
    }
  }, [data]);

  const filteredItems = React.useMemo(() => {
    let filteredPrograms = [...programs];

    if (hasSearchFilter) {
      filteredPrograms = filteredPrograms.filter((program) =>
        program.title.toLowerCase().includes(filterProgramName.toLowerCase())
      );
    }

    return filteredPrograms;
  }, [programs, filterProgramName]);

  return (
    <main className="flex flex-col items-center gap-4 p-4 sm:items-start">
      <Breadcrumb crumbs={crumbs} />
      <Divider />
      <div className="flex flex-row gap-4">
        <div className="w-72">
          <Navigation />
        </div>
        {/* Code ở đây */}
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <Input
            className="mr-auto w-56 bg-white"
            variant="bordered"
            size={'md'}
            type=""
            placeholder="Find your program name"
            value={filterProgramName}
            onChange={(e) => setFilterProgramName(e.target.value)}
          />

          <Divider />

          {/* List program */}
          <div className="mx-auto flex w-full flex-row flex-wrap justify-start gap-4">
            {filteredItems.map((program) => (
              <Fragment key={program.id}>
                <ProgramOverviewCard program={program} />
              </Fragment>
            ))}
          </div>

          {/* Load more */}
          <div className="flex w-full items-center justify-center p-2">
            {isLoading && <Spinner />}
            {programs.length < totalPrograms && (
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

export default MyCoursesPage;
