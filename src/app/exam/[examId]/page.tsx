'use client';

import { Exam } from '@/types/exam.type';
import { useParams, useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import axios from '@/libs/axiosInstance';
import useSWR from 'swr';
import PreExam from './PreExam';
import { ExamContext } from '@/contexts';
import { ExamContextType } from '@/types';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const ExamPage = () => {
  const { setQuestions, setDuration } = useContext(
    ExamContext
  ) as ExamContextType;

  const params = useParams();
  const examId = params.examId;
  const router = useRouter();
  const [exam, setExam] = useState<Exam | null>(null);

  const {
    data,
    // isLoading,
    error
    // mutate: refreshEndpoint
  } = useSWR(`/exams/item/${examId}`, fetcher);

  useEffect(() => {
    if (data?.metadata) {
      setExam(data.metadata);
      setQuestions(data.metadata.questions);
    }
  }, [data]);

  useEffect(() => {
    if (exam) setDuration(exam.duration);
  }, [exam]);

  const handleStartExam = () => {
    router.push(`/exam/${examId}/do`);
  };

  if (error) {
    return <div>Fail to load Exam data</div>;
  }

  return (
    <main className="flex flex-col items-center gap-4 sm:items-start">
      <ArrowUturnLeftIcon
        className="absolute left-3 top-3 size-10 text-primary hover:cursor-pointer"
        onClick={() => router.back()}
      />
      {exam && (
        <PreExam
          examType={exam.examType}
          duration={exam.duration}
          description={exam.description}
          title={exam.title}
          questionCount={exam.questions.length}
          onStart={handleStartExam}
        />
      )}
    </main>
  );
};

export default ExamPage;
