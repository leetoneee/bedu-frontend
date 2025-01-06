'use client';

import { useParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import axios from '@/libs/axiosInstance';
import { Lesson } from '@/types/lesson.type';
import { Breadcrumb, NavLessonPreview } from '@/components';
import { Divider, Spinner } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';
import LessonHeader from './LessonHeader';
import CommentTab from './Comment.Tab';
import DocumentTab from './Document.Tab';
import ExercisesTab from './Exercises.Tab';
import { Crumb } from '@/types';
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const LessonDetail = () => {
  const searchParams = useSearchParams();
  const classId = searchParams.get('classId'); // Get classId from query

  const params = useParams();
  const lessonId = params.lessonId;
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [activeTab, setActiveTab] = useState<string>('Discussion');
  const [index, setIndex] = useState<number>(0);
  const { data, error } = useSWR(`/lessons/item/${lessonId}`, fetcher);

  const crumbs: Crumb[] = useMemo(() => {
    return [
      {
        label: lesson?.class.name || 'Loading...',
        href: `/my/eclasses/${lesson?.class.id}`
      },
      {
        label: `Lesson ${index} - ${lesson?.title || 'Loading...'}`,
        href: `/my/eclasses/lesson${lesson?.id}`
      }
    ];
  }, [index, lesson]);

  const { data: classData, isLoading } = useSWR(
    `/classes/item/${classId}`,
    fetcher
  );

  useEffect(() => {
    if (data && data.metadata) {
      setLesson(data.metadata);
    }
  }, [data]);

  useEffect(() => {
    if (lesson && lessons) {
      const idx = lessons.findIndex((l) => l.id === lesson.id);
      setIndex(idx + 1);
    }
  }, [lesson]);

  useEffect(() => {
    if (classData && classData.metadata) {
      setLessons(classData.metadata.lesson);
    }
  }, [classData]);

  if (error) return <div>Failed to load data</div>;

  return (
    <main className="flex flex-col items-center gap-4 p-4 sm:items-start">
      <Breadcrumb crumbs={crumbs} />
      <Divider />
      <div className="flex w-full flex-row gap-2">
        <div className="flex h-full w-full basis-[70%] flex-col gap-2">
          <div className="flex w-full justify-center rounded border border-gray-200 p-2 shadow-lg">
            <iframe src={lesson?.videoUrl} width={850} height={475} />
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
          {lessons && <NavLessonPreview lessons={lessons} />}
        </div>
      </div>
    </main>
  );
};

export default LessonDetail;
