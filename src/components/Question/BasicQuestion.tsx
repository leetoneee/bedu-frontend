'use client';

import { Question } from '@/types/question-bank.type';
import React, { useState } from 'react';

type Props = {
  question: Question;
};

const BasicQuestion = ({ question }: Props) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | string[]>(
    question.questionType === 'MultipleChoice' ? [] : ''
  );

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
    <div>
      <h3>{question.question}</h3>
      <p>Total Points: {question.totalPoints}</p>
      {renderQuestionContent()}
      <p>
        Your Answer:{' '}
        {Array.isArray(selectedAnswer)
          ? selectedAnswer.join('/')
          : selectedAnswer}
      </p>
    </div>
  );
};

export default BasicQuestion;
