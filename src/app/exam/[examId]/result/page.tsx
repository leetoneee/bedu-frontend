'use client';

import { ExamContext } from '@/contexts';
import { ExamContextType } from '@/types';
import { CircularProgress } from '@nextui-org/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useContext, useMemo } from 'react';

const ExamResult = () => {
  const { questions, answers } = useContext(ExamContext) as ExamContextType;
  const router = useRouter();
  const totalQuestions = questions.length;

  // Compute statistics
  const stats = useMemo(() => {
    let answered = 0;
    let notAnswered = 0;
    let correctAnswers = 0;
    let wrongAnswers = 0;

    questions.forEach((question, idx) => {
      const answer = answers[question.id];

      if (
        answer &&
        (Array.isArray(answer) ? answer.length > 0 : answer.trim() !== '')
      ) {
        answered++;

        if (question.answer === answer) {
          correctAnswers++;
        } else {
          wrongAnswers++;
        }
      } else {
        notAnswered++;
        wrongAnswers++;
      }
    });

    let answeredPercent = Number(
      ((answered / questions.length) * 100).toFixed(0)
    );
    let notAnsweredPercent = Number(
      ((notAnswered / questions.length) * 100).toFixed(0)
    );
    let correctAnswersPercent = Number(
      ((correctAnswers / questions.length) * 100).toFixed(0)
    );
    let wrongAnswersPercent = Number(
      ((wrongAnswers / questions.length) * 100).toFixed(0)
    );

    return {
      answered,
      notAnswered,
      correctAnswers,
      wrongAnswers,
      answeredPercent,
      notAnsweredPercent,
      correctAnswersPercent,
      wrongAnswersPercent
    };
  }, [questions, answers]);

  const emotionMessage =
    stats.correctAnswers / totalQuestions > 0.5
      ? {
          img: '/images/happy.png',
          text: 'Congratulations! You did very well.',
          color: 'text-green-500'
        }
      : {
          img: '/images/sad.png',
          text: 'What a pity! Try harder next time.',
          color: 'text-red-500'
        };

  return (
    <div className="mx-auto mt-10 max-w-5xl bg-white p-4 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Result Exam</h1>
        <span className="text-sm text-blue-500 hover:cursor-pointer" onClick={() => router.push('questions')}>
          &larr; Return to the list of questions
        </span>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="col-span-2">
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div className="rounded border p-4">
              <p className="font-semibold text-gray-600">
                Total questions: {totalQuestions}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center gap-2 text-center">
              <p className="font-semibold text-gray-600">
                Answered: {stats.answered}
              </p>
              <CircularProgress
                aria-label="Loading..."
                color="primary"
                showValueLabel={true}
                size="lg"
                value={stats.answeredPercent}
              />
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <p className="font-semibold text-gray-600">
                Not answered: {stats.notAnswered}
              </p>
              <CircularProgress
                aria-label="Loading..."
                color="default"
                showValueLabel={true}
                size="lg"
                value={stats.notAnsweredPercent}
              />
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <p className="mt-2 font-semibold text-gray-600">
                Correct answers: {stats.correctAnswers}
              </p>
              <CircularProgress
                aria-label="Loading..."
                color="success"
                showValueLabel={true}
                size="lg"
                value={stats.correctAnswersPercent}
              />
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <p className="font-semibold text-gray-600">
                Wrong answers: {stats.wrongAnswers}
              </p>
              <CircularProgress
                aria-label="Loading..."
                color="danger"
                showValueLabel={true}
                size="lg"
                value={stats.wrongAnswersPercent}
              />
            </div>
          </div>
        </div>
        <div className="rounded border p-4 text-center">
          <p className="font-semibold text-gray-600">EMOTIONAL MESSAGE</p>
          <div className="mt-4">
            <Image
              src={emotionMessage.img}
              alt="Emotion"
              className="mx-auto"
              width={60}
              height={60}
            />
            <p className={`mt-2 text-gray-600 ${emotionMessage.color}`}>
              {emotionMessage.text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamResult;
