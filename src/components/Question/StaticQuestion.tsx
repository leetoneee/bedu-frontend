'use client';

import { Question } from '@/types/question-bank.type';
import { Chip, Divider } from '@nextui-org/react';
import React, { ReactNode, useCallback, useState } from 'react';

type Props = {
  question: Question;
  index: number;
};

const StaticQuestion = ({ question, index }: Props) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | string[]>(
    question.questionType === 'MultipleChoice' ? [] : ''
  );

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

  const handleAnswerChange = (answer: string) => {
    if (question.questionType === 'MultipleChoice') {
      setSelectedAnswer((prev) => {
        if (Array.isArray(prev)) {
          if (prev.includes(answer)) {
            return prev.filter((item) => item !== answer);
          } else {
            return [...prev, answer];
          }
        }
        return prev;
      });
    } else {
      setSelectedAnswer(answer);
    }
  };

  const renderQuestionContent = () => {
    switch (question.questionType) {
      case 'FillInTheBlankChoice':
        return (
          <div>
            <p>{question.content}</p>
            <input
              type="text"
              value={selectedAnswer as string}
              onChange={(e) => setSelectedAnswer(e.target.value)}
              placeholder="Enter your answer"
            />
          </div>
        );
      case 'SingleChoice':
        const singleChoices = question.possibleAnswer.split('/');
        return (
          <div>
            <p>{question.content}</p>
            {singleChoices.map((choice, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name="singleChoice"
                  value={choice}
                  checked={selectedAnswer === choice}
                  onChange={() => handleAnswerChange(choice)}
                />
                {choice}
              </label>
            ))}
          </div>
        );
      case 'MultipleChoice':
        const multipleChoices = question.possibleAnswer.split('/');
        return (
          <div>
            <p>{question.content}</p>
            {multipleChoices.map((choice, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  value={choice}
                  checked={(selectedAnswer as string[]).includes(choice)}
                  onChange={() => handleAnswerChange(choice)}
                />
                {choice}
              </label>
            ))}
          </div>
        );
      default:
        return <p>Unsupported question type</p>;
    }
  };

  return (
    <div className="w-full rounded border border-gray-300 bg-white">
      <div className="mb-4 flex items-center justify-between">
        <div className="font-bold">{question.content}</div>
        <div className="ml-auto p-4 text-danger font-bold text-base">{question.totalPoints}đ</div>
        {renderChip(question.questionType)}
      </div>
      <Divider />
      <div>
        <p className="mb-2 font-bold text-wrap">
          Question {index}: {question.question}
        </p>
        <div className="mb-2">
          <input
            type="radio"
            id="option1"
            name="question1"
            className="mr-2"
            checked
          />
          <label htmlFor="option1">BinhDoHuyToanLoan</label>
        </div>
        <div className="mb-2">
          <input type="radio" id="option2" name="question1" className="mr-2" />
          <label htmlFor="option2">Binh</label>
        </div>
        <div className="mb-2">
          <input type="radio" id="option3" name="question1" className="mr-2" />
          <label htmlFor="option3">Do</label>
        </div>
        <div className="mb-2">
          <input type="radio" id="option4" name="question1" className="mr-2" />
          <label htmlFor="option4">Huy</label>
        </div>
        <div className="mb-2">
          <input type="radio" id="option5" name="question1" className="mr-2" />
          <label htmlFor="option5">Toan</label>
        </div>
        <div className="mb-2">
          <input type="radio" id="option6" name="question1" className="mr-2" />
          <label htmlFor="option6">Loan</label>
        </div>
      </div>
    </div>
  );
};

export default StaticQuestion;
