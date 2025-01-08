'use client';

import { Breadcrumb } from '@/components';
import { Crumb } from '@/types';
import { Exam } from '@/types/exam.type';
import { Divider } from '@nextui-org/react';
import { useParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import ExamHeader from './ExamHeader';
import LOQ from './LOQ.Tab';
import Config from './Configuration.Tab';
import Statistical from './Statistical.Tab';
import Result from './Result.Tab';
import axios from '@/libs/axiosInstance';
import useSWR from 'swr';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const ExamDetail = () => {
  const params = useParams();
  const examId = params.examId;

  const [exam, setExam] = useState<Exam | null>(null);
  const [activeTab, setActiveTab] = useState<string>('List of questions');

  const {
    data
    // isLoading,
    // error: classError,
    // mutate: refreshEndpoint
  } = useSWR(`/exams/item/${examId}`, fetcher);

  const crumbs: Crumb[] = useMemo(() => {
    return [
      {
        label: 'Exams',
        href: '/manager/exams'
      },
      {
        label: exam?.title || 'Loading...',
        href: `/manager/courses/${examId}`
      }
    ];
  }, [examId, exam]);

  useEffect(() => {
    if (data?.metadata) {
      setExam(data.metadata);
      // setLessons(data.metadata.lesson);
    }
  }, [data]);

  return (
    <main className="flex flex-col items-center gap-4 p-4 sm:items-start">
      <Breadcrumb crumbs={crumbs} />
      <Divider />
      <div className="flex w-full flex-col">
        <ExamHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        <Divider />
        {activeTab === 'List of questions' && <LOQ examId={Number(examId)} />}
        {activeTab === 'Configuration' && <Config examId={Number(examId)} />}
        {activeTab === 'Statistical' && exam && (
          <Statistical examId={Number(examId)} nameExam={exam.title} />
        )}
        {activeTab === 'Result' && <Result examId={Number(examId)} />}
      </div>
      {/* Save Button */}
      {/* <div className="flex w-full">
        <Button
          className="bg-on-primary ml-auto h-14 rounded-2xl text-white"
          startContent={
            <Image
              src={'/icons/save.svg'}
              alt="save"
              className="size-6 text-white"
              width={24}
              height={24}
            />
          }
          size="lg"
        >
          Save
        </Button>
      </div> */}
    </main>
  );
};

export default ExamDetail;
