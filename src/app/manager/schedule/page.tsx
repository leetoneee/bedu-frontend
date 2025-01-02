'use client';

import { Schedule } from '@/components';
import Breadcrumb from '@/components/Breadcrumb';
import { Crumb, EventProps } from '@/types';
import { Divider } from '@nextui-org/react';
import axios from '@/libs/axiosInstance';
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import { Lesson } from '@/types/lesson.type';
import { formatDateSchedule } from '@/helpers';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function SSP() {
  const crumbs: Crumb[] = [
    {
      label: 'Shedule',
      href: '/manager/schedule'
    }
  ];

  const [events, setEvents] = useState<EventProps[]>([]);

  const page = 1;
  const rowsPerPage = 100;

  const {
    data,
    isLoading
    // mutate: refreshEndpoint
  } = useSWR(`/lessons/all?page=${page}&limit=${rowsPerPage}`, fetcher, {
    keepPreviousData: true
  });

  useEffect(() => {
    if (data && data.metadata && data.metadata.lessons) {
      console.log(
        '🚀 ~ useEffect ~ eventsData.metadata.lessons:',
        data.metadata.lessons
      );
      // convert eventsData to EventPropsF
      const eventsData: EventProps[] = data.metadata.lessons
        .filter((lesson: Lesson) => lesson?.class !== null)
        .map((lesson: Lesson) => ({
          id: lesson.id,
          title: lesson?.class?.name,
          start: formatDateSchedule(lesson.startDate),
          end: formatDateSchedule(lesson.endDate),
          description: `This is the online class ${lesson?.class?.name}`,
          people: [lesson?.teacher?.name]
        }));
      console.log('🚀 ~ useEffect ~ events:', events);
      if (eventsData.length) setEvents(eventsData);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;

  // const eventsss: EventProps[] = [
  //   {
  //     id: 12,
  //     title: 'Listening 900+',
  //     start: '2024-12-26 10:30',
  //     end: '2024-12-26 11:30',
  //     description: 'This is the online class Listening 900+',
  //     people: ['Teacher']
  //   },
  //   {
  //     id: 11,
  //     title: 'Listening 900+',
  //     start: '2024-12-24 10:30',
  //     end: '2024-12-24 11:30',
  //     description: 'This is the online class Listening 900+',
  //     people: ['Teacher']
  //   },
  //   {
  //     id: 10,
  //     title: 'Listening 900+',
  //     start: '2024-12-21 10:30',
  //     end: '2024-12-21 11:30',
  //     description: 'This is the online class Listening 900+',
  //     people: ['Teacher']
  //   }
  // ];

  return (
    <main className="flex flex-col items-center gap-4 p-4 sm:items-start">
      <Breadcrumb crumbs={crumbs} />
      <Divider />
      <div className="flex h-full w-full flex-col gap-2 rounded border border-on-surface/20 bg-white p-5 shadow-sm">
        <Schedule events={events} />
      </div>
    </main>
  );
}
