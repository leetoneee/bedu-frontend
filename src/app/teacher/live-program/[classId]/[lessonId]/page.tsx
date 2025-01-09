'use client';

import { Breadcrumb } from '@/components';
import { Crumb } from '@/types';
import { Lesson } from '@/types/lesson.type';
import { Divider } from '@nextui-org/react';
import { useParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import axios from '@/libs/axiosInstance';
import useSWR from 'swr';
import LessonHeader from './LessonHeader';
import CommentTab from './Comment.Tab';
import DocumentTab from './Document.Tab';
import ExercisesTab from './Exercises.Tab';
import InformationTab from './Infomation.Tab';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const LessonPage = () => {
  const params = useParams();
  const lessonId = params.lessonId;

  const [activeTab, setActiveTab] = useState<string>('Information');
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const crumbs: Crumb[] = useMemo(() => {
    return [
      {
        label: 'Live Program',
        href: '/teacher/live-program'
      },
      {
        label: lesson?.class?.name || 'Loading...',
        href: `/teacher/live-program/${lesson?.class?.id}`
      },
      {
        label: `Lesson ${lesson?.title}` || 'Loading...',
        href: `/teacher/live-program/${lessonId}`
      }
    ];
  }, [lessonId, lesson]);

  const { data, error } = useSWR(`/lessons/item/${lessonId}`, fetcher);

  useEffect(() => {
    if (data && data.metadata) {
      setLesson(data.metadata);
    }
  }, [data]);

  if (error) {
    return <div>Loading error</div>;
  }

  return (
    <main className="flex flex-col items-center gap-4 p-4 sm:items-start">
      <Breadcrumb crumbs={crumbs} />
      <Divider />
      <div className="flex w-full flex-col">
        <LessonHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        <Divider />
        {activeTab === 'Information' && (
          <InformationTab lessonId={lessonId as string} />
        )}
        {activeTab === 'Comments' && (
          <CommentTab lessonId={lessonId as string} />
        )}
        {activeTab === 'Documents' && (
          <DocumentTab lessonId={lessonId as string} />
        )}
        {activeTab === 'Exercises' && <ExercisesTab lessonId={lessonId as string} />}
      </div>
    </main>
  );
};

export default LessonPage;
