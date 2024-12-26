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

const ExamDetail = () => {
  const params = useParams();
  const examId = params.examId;

  const [exam, setExam] = useState<Exam | null>(null);
  const [activeTab, setActiveTab] = useState<string>('List of questions');

  const crumbs: Crumb[] = useMemo(() => {
    return [
      {
        label: 'Courses',
        href: '/manager/courses'
      },
      {
        label: exam?.title || 'Loading...',
        href: `/manager/courses/${examId}`
      }
    ];
  }, [examId, exam]);

  return (
    <main className="flex flex-col items-center gap-4 p-4 sm:items-start">
      <Breadcrumb crumbs={crumbs} />
      <Divider />
      <div className="flex w-full flex-col">
        <ExamHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        <Divider />
        {activeTab === 'List of questions' && <LOQ id={Number(examId)} />}
        {activeTab === 'Configuration' && <Config id={Number(examId)} />}{' '}
        {activeTab === 'Statistical' && <Statistical id={Number(examId)} />}{' '}
        {activeTab === 'Result' && <Result id={Number(examId)} />}
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
