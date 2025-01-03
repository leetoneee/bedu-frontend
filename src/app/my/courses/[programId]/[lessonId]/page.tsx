'use client';

import { useParams } from 'next/navigation';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import axios from '@/libs/axiosInstance';
import { Lesson } from '@/types/lesson.type';
import { NavAccordion } from '@/components';
import { Divider, Spinner } from '@nextui-org/react';
import ReactPlayer from 'react-player/lazy';
import { Course } from '@/types/course.type';
import { useSearchParams } from 'next/navigation';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const LessonDetail = () => {
  const searchParams = useSearchParams();
  const programId = searchParams.get('programId'); // Get programId from query

  const params = useParams();
  const lessonId = params.lessonId;
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);

  const { data, error } = useSWR(`/lessons/item/${lessonId}`, fetcher);

  const { data: programData, isLoading } = useSWR(
    `/programs/item/${programId}`,
    fetcher
  );

  useEffect(() => {
    if (data && data.metadata) {
      setLesson(data.metadata);
    }
  }, [data]);

  useEffect(() => {
    if (programData && programData.metadata) {
      setCourses(programData.metadata.course);
    }
  }, [programData]);

  if (error) return <div>Failed to load data</div>;

  return (
    <main className="flex flex-col items-center gap-4 p-4 sm:items-start">
      <span className={'w-full text-2xl font-bold text-on-primary'}>
        {`Lesson - ${lesson?.title || 'Loading...'}`}
      </span>
      <Divider />
      <div className="flex w-full flex-row gap-2">
        <div className="flex h-full w-full basis-[70%] flex-col gap-2">
          <div className="flex w-full justify-center rounded border border-gray-200 p-2 shadow-lg">
            <ReactPlayer
              url={lesson?.videoUrl}
              controls={true}
              width={850}
              height={475}
            />
          </div>
          
        </div>
        <div className="flex basis-[30%] flex-col items-center">
          {isLoading && <Spinner />}
          {courses && <NavAccordion courses={courses} />}
        </div>
      </div>
    </main>
  );
};

export default LessonDetail;
