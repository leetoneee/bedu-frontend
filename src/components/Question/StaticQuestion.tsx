'use client';

import { Question } from '@/types/question-bank.type';
import { Checkbox, Chip, Divider, RadioGroup, Radio } from '@nextui-org/react';
import React, { Fragment, ReactNode, useCallback } from 'react';

type Props = {
  question: Question;
  index: number;
};

const StaticQuestion = ({ question, index }: Props) => {
  // const [selectedAnswer, setSelectedAnswer] = useState<string | string[]>(
  //   question.questionType === 'MultipleChoice' ? [] : ''
  // );

  const renderChip = useCallback((content: string): ReactNode => {
    switch (content) {
      case 'FillInTheBlankChoice':
        return (
          <Chip
            className="capitalize"
            color={'success'}
            size="lg"
            variant="bordered"
          >
            Fill in the blank
          </Chip>
        );
      case 'SingleChoice':
        return (
          <Chip
            className="capitalize"
            color={'warning'}
            size="lg"
            variant="bordered"
          >
            Single Choice Questions
          </Chip>
        );
      case 'MultipleChoice':
        return (
          <Chip
            className="capitalize"
            color={'danger'}
            size="lg"
            variant="bordered"
          >
            Multiple Choice Questions
          </Chip>
        );
      default:
        <span>{content}</span>;
    }
  }, []);

  // const handleAnswerChange = (answer: string) => {
  //   if (question.questionType === 'MultipleChoice') {
  //     setSelectedAnswer((prev) => {
  //       if (Array.isArray(prev)) {
  //         if (prev.includes(answer)) {
  //           return prev.filter((item) => item !== answer);
  //         } else {
  //           return [...prev, answer];
  //         }
  //       }
  //       return prev;
  //     });
  //   } else {
  //     setSelectedAnswer(answer);
  //   }
  // };

  const renderQuestionContent = () => {
    switch (question.questionType) {
      case 'FillInTheBlankChoice':
        const correctAnswersF = question.answer.split('/');
        return (
          <div className="flex flex-col gap-2">
            {correctAnswersF.map((ans, index) => (
              <input
                key={index}
                type="text"
                value={ans}
                className="w-full rounded border border-gray-300 p-2"
                readOnly
              />
            ))}
          </div>
        );
      case 'SingleChoice':
        const possibleChoices = question.possibleAnswer.split('/');
        const correctAnswers = question.answer
          .split('/')
          .filter((ans) => ans !== '@');
        return (
          <RadioGroup value={correctAnswers[0]}>
            {possibleChoices.map((choice, index) => (
              <Fragment key={index}>
                <Radio value={choice} readOnly>
                  {choice}
                </Radio>
              </Fragment>
            ))}
          </RadioGroup>
        );
      case 'MultipleChoice':
        const possibleChoicesM = question.possibleAnswer.split('/');
        const correctAnswersM = question.answer
          .split('/')
          .filter((ans) => ans !== '@');
        return (
          <div className="flex flex-col gap-2">
            {possibleChoicesM.map((choice, index) => (
              <div key={index}>
                <Checkbox
                  readOnly
                  isSelected={correctAnswersM.includes(choice)}
                >
                  {choice}
                </Checkbox>
              </div>
            ))}
          </div>
        );
      default:
        return <p>Unsupported question type</p>;
    }
  };

  return (
    <div className="w-full rounded border border-gray-300 bg-white shadow-md">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="font-bold">{question.content}</div>
        <div className="ml-auto pr-4 text-base font-bold text-danger">
          {question.totalPoints.toFixed(2)}đ
        </div>
        {renderChip(question.questionType)}
      </div>
      <Divider />
      <div className="flex flex-col gap-4 p-4">
        <span className="mb-2 text-wrap font-bold">
          Question {index}: {question.question}
        </span>
        {renderQuestionContent()}
      </div>
    </div>
  );
};

export default StaticQuestion;
