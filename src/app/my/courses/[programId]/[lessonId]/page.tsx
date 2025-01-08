'use client';

import { useParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import axios from '@/libs/axiosInstance';
import { Lesson } from '@/types/lesson.type';
import { Breadcrumb, NavAccordion } from '@/components';
import { Divider, Spinner } from '@nextui-org/react';
import ReactPlayer from 'react-player/lazy';
import { Course } from '@/types/course.type';
import { useSearchParams } from 'next/navigation';
import LessonHeader from './LessonHeader';
import CommentTab from './Comment.Tab';
import DocumentTab from './Document.Tab';
import ExercisesTab from './Exercises.Tab';
import { Program } from '@/types/program.type';
import { Crumb } from '@/types';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const LessonDetail = () => {
  const searchParams = useSearchParams();
  const programId = searchParams.get('programId'); // Get programId from query

  const params = useParams();
  const lessonId = params.lessonId;
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [program, setProgram] = useState<Program | null>(null);
  const [activeTab, setActiveTab] = useState<string>('Discussion');

  const crumbs: Crumb[] = useMemo(() => {
    return [
      {
        label: program?.title || 'Loading...',
        href: `/my/courses/${programId}`
      },
      {
        label: `Lesson - ${lesson?.title || 'Loading...'}`,
        href: `/my/courses/lesson/${programId}`
      }
    ];
  }, [programId, program, lesson]);

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
      setProgram(programData.metadata);
      setCourses(programData.metadata.course);
    }
  }, [programData]);

  if (error) return <div>Failed to load data</div>;

  return (
    <main className="flex flex-col items-center gap-4 p-4 sm:items-start">
      <Breadcrumb crumbs={crumbs} />
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
          <div className="flex w-full flex-col">
            <LessonHeader activeTab={activeTab} setActiveTab={setActiveTab} />
            <Divider />
            {activeTab === 'Discussion' && (
              <CommentTab lessonId={lessonId as string} />
            )}
            {activeTab === 'Documents' && (
              <DocumentTab lessonId={lessonId as string} />
            )}
            {activeTab === 'Exercises' && (
              <ExercisesTab lessonId={lessonId as string} />
            )}
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
