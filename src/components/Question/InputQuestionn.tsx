'use client';

import { Question } from '@/types/question-bank.type';
import { Checkbox, Chip, Radio, RadioGroup } from '@nextui-org/react';
import React, { Fragment, ReactNode, useCallback } from 'react';

type Props = {
  question: Question;
  selectedAnswers: Record<number, string | string[]>; // To manage answers for all questions
  setSelectedAnswers: React.Dispatch<
    React.SetStateAction<Record<number, string | string[]>>
  >; // Setter for selectedAnswers state
};

const InputQuestion = ({
  question,
  selectedAnswers,
  setSelectedAnswers
}: Props) => {
  const currentAnswer =
    selectedAnswers[question.id] ||
    (question.questionType === 'MultipleChoice' ? [] : '');

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
        return <span>{content}</span>;
    }
  }, []);

  const handleMultipleChoiceChange = (answer: string) => {
    setSelectedAnswers((prevAnswers) => {
      const currentAnswers = (prevAnswers[question.id] as string[]) || [];
      const updatedAnswers = currentAnswers.includes(answer)
        ? currentAnswers.filter((item) => item !== answer) // Remove answer if it exists
        : [...currentAnswers, answer]; // Add answer if it doesn't exist

      return {
        ...prevAnswers,
        [question.id]: updatedAnswers
      };
    });
  };

  const renderQuestionContent = () => {
    switch (question.questionType) {
      case 'FillInTheBlankChoice':
        return (
          <div className="flex flex-col gap-2">
            {question.answer.split('/').map((ans, index) => (
              <input
                key={index}
                type="text"
                value={(currentAnswer as string[])[index] || ''}
                className="w-full rounded border border-gray-300 p-2"
                onChange={(e) => {
                  const newAnswers = [...(currentAnswer as string[])];
                  newAnswers[index] = e.target.value;
                  setSelectedAnswers((prevAnswers) => ({
                    ...prevAnswers,
                    [question.id]: newAnswers
                  }));
                }}
              />
            ))}
          </div>
        );
      case 'SingleChoice':
        return (
          <RadioGroup
            value={currentAnswer as string}
            onChange={(e) =>
              setSelectedAnswers((prevAnswers) => ({
                ...prevAnswers,
                [question.id]: e.target.value
              }))
            }
          >
            {question.possibleAnswer.split('/').map((choice, index) => (
              <Fragment key={index}>
                <Radio value={choice}>{choice}</Radio>
              </Fragment>
            ))}
          </RadioGroup>
        );
      case 'MultipleChoice':
        return (
          <div className="flex flex-col gap-2">
            {question.possibleAnswer.split('/').map((choice, index) => (
              <div key={index}>
                <Checkbox
                  isSelected={(currentAnswer as string[]).includes(choice)}
                  onChange={() => handleMultipleChoiceChange(choice)}
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
      <div className="mb-4 rounded bg-blue-100 p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-blue-600">{question.content}</h3>
          <div className="ml-auto pr-4 text-base font-bold text-danger">
            {question.totalPoints.toFixed(2)}đ
          </div>
          {renderChip(question.questionType)}
        </div>
        <p className="mt-2 text-wrap font-semibold">{question.question}</p>
      </div>
      <div className="flex flex-col gap-4 p-4">{renderQuestionContent()}</div>
    </div>
  );
};

export default InputQuestion;
