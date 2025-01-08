import React, { useEffect, useState } from 'react';
import axios from '@/libs/axiosInstance';
import useSWR from 'swr';
import { Exam } from '@/types/exam.type';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Lesson } from '@/types/lesson.type';

type Props = {
  lessonId: string;
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const ExercisesTab = ({ lessonId }: Props) => {
  const router = useRouter();
  const [examId, setExamId] = useState<number>(0);
  const [exam, setExam] = useState<Exam | null>(null);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const {
    data,
    error
    // mutate: refreshEndpoint
  } = useSWR(`/lessons/item/${lessonId}`, fetcher);

  const {
    data: examData
    // error: errorExam,
    // mutate: refreshEndpoint
  } = useSWR(`/exams/item/${examId}`, fetcher);

  const getExamTypeLabel = (type: string) => {
    switch (type) {
      case 'assignments':
        return 'Assignment';
      case 'mid-term':
        return 'Midterm Exam';
      case 'final-term':
        return 'Final Exam';
      default:
        return 'Test type not specified';
    }
  };

  useEffect(() => {
    if (error) {
      setLesson(null);
    } else if (data && data.metadata) {
      setLesson(data.metadata);
      if (data.metadata.exam) {
        setExamId(data.metadata.exam.id);
      }
    }
  }, [data]);

  useEffect(() => {
    if (examData && examData.metadata) {
      setExam(examData.metadata);
    }
  }, [examId, examData]);

  useEffect(() => {
    console.log(exam);
  }, [exam]);

  if (error) {
    return <div>Fail to load exercises</div>;
  }

  return (
    <div className="flex h-full w-full flex-col gap-2 rounded rounded-t-none border-on-surface/20 bg-white p-5 shadow-sm">
      {/* Code ở đây */}
      <div className="flex w-full flex-col">
        <div className="w-full">
          {exam && (
            <div className="max-w-sm overflow-hidden rounded bg-white p-4 shadow-lg">
              <Image
                className="w-full"
                src="/images/exam.svg"
                alt="image exam"
                width={600}
                height={400}
              />
              <div className="space-y-4 p-6">
                <div className="mb-2 text-xl font-bold">{exam.title}</div>
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-700">Type:</p>
                  <p className="text-gray-600">
                    {getExamTypeLabel(exam.examType)}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-700">
                    Time to do the test:
                  </p>
                  <p className="text-gray-600">{exam.duration} minites</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-700">
                    Number of questions:
                  </p>
                  <p className="text-gray-600">
                    {exam.questions.length} questions
                  </p>
                </div>
              </div>
              <div className="flex justify-center px-6 pb-2 pt-4">
                <button
                  className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
                  onClick={() => router.push(`/exam/${exam.id}`)}
                >
                  Take Exam
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExercisesTab;
