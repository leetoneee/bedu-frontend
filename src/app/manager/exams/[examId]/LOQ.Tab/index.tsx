import { Exam } from '@/types/exam.type';
import React, { useEffect, useState } from 'react';
import axios from '@/libs/axiosInstance';
import useSWR from 'swr';
import { BasicQuestion, StaticQuestion } from '@/components';
import { Question } from '@/types/question-bank.type';

type Props = {
  id: number;
  setIsModalNewTaskOpen?: (isOpen: boolean) => void;
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const LOQ = ({ id }: Props) => {
  const [exam, setExam] = useState<Exam | null>(null);

  const {
    data,
    // isLoading,
    // error: classError,
    // mutate: refreshEndpoint
  } = useSWR(`/exams/item/${id}`, fetcher);

  useEffect(() => {
    if (data?.metadata) {
      setExam(data.metadata);
      // setLessons(data.metadata.lesson);
    }
  }, [data]);

  const questionData: Question[] = [
    {
      id: 1,
      question: '3 + 33 =',
      totalPoints: 3,
      pointDivision: '',
      content: 'Chọn đáp án đúng nhất',
      attach: '',
      questionType: 'SingleChoice',
      possibleAnswer: '33/36/2/3',
      answer: '@/36/@/@',
      examId: [],
      documentId: []
    },
    {
      id: 2,
      question: 'Anh thích ... và ...',
      totalPoints: 3,
      pointDivision: '3',
      content: 'Điền vào chỗ trống',
      attach: '',
      questionType: 'FillInTheBlankChoice',
      possibleAnswer: 'Kem',
      answer: 'Kem',
      examId: [],
      documentId: []
    },
    {
      id: 3,
      question: 'Anh ta thích cái gì?',
      totalPoints: 1,
      pointDivision: '',
      content: 'Chọn nhiều đáp án',
      attach: '',
      questionType: 'MultipleChoice',
      possibleAnswer: 'Kem/Bánh/Xem Video',
      answer: 'Kem/Bánh/@',
      examId: [],
      documentId: []
    }
  ];

  return (
    <div className="flex h-full w-full flex-col gap-2 rounded rounded-t-none border-on-surface/20 bg-white p-5 shadow-sm">
      {/* Code ở đây */}
      <div className="flex h-dvh w-full flex-row gap-2">
        <div className="flex h-full basis-[70%] flex-col gap-2">
          <span className="text-xl font-bold text-on-surface">
            {exam?.title}
          </span>
          <div className="h-[90%] overflow-y-auto shadow-md">
            {questionData.map((question, index) => (
              <StaticQuestion
                key={question.id}
                question={question}
                index={index + 1}
              />
            ))}
          </div>
        </div>
        <div className="basis-[30%] bg-secondary">
          <div className="pl-4">
            <h2 className="mb-4 font-bold">List of questions</h2>
            <div className="mb-2 flex items-center">
              <div className="mr-2">Q.1</div>
              <div className="flex-1">Choose the correct answer</div>
              <i className="fas fa-ellipsis-v"></i>
            </div>
            <div className="mb-2 flex items-center">
              <div className="mr-2">Q.2</div>
              <div className="flex-1">Choose the correct answer</div>
              <i className="fas fa-ellipsis-v"></i>
            </div>
            <div className="mb-2 flex items-center">
              <div className="mr-2">Q.3</div>
              <div className="flex-1">Choose the correct answer</div>
              <i className="fas fa-ellipsis-v"></i>
            </div>
            <div className="mb-2 flex items-center">
              <div className="mr-2">Q.4</div>
              <div className="flex-1">Choose the correct answer</div>
              <i className="fas fa-ellipsis-v"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LOQ;
