'use client';

import { classNames, InputQuestion } from '@/components';
import { ExamContext } from '@/contexts';
import { formatAnswer, useFormattedTime } from '@/helpers';
import { ExamContextType, TimeContextType } from '@/types';
import { Question } from '@/types/question-bank.type';
import { useDisclosure } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import SubmitAnswerModal from './SubmitAnswer.modal';

const DoExam = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const { questions, duration, setAnswers } = useContext(
    ExamContext
  ) as ExamContextType;
  const { remainingTime, startTimer, stopTimer } = useContext(
    ExamContext
  ) as TimeContextType;
  const formattedTime = useFormattedTime(remainingTime);
  const [selectedQuestion, setSelectedQuestion] = useState<Question>(
    questions[0]
  );
  const [index, setIndex] = useState<number>(0);
  const [markedQuestions, setMarkedQuestions] = useState<Set<number>>(
    new Set()
  );
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string | string[];
  }>({});

  useEffect(() => {
    // Giả sử thời gian làm bài là 1800 giây (30 phút)
    startTimer(duration * 60);

    return () => stopTimer(); // Dừng timer khi rời trang
  }, []);

  useEffect(() => {
    if (remainingTime === 0) {
      handleTimeUp(); // Gọi hàm xử lý khi hết thời gian
    }
  }, [remainingTime]);

  const handleSubmit = () => {
    onOpen();
  };

  useEffect(() => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = formatAnswer(
        selectedAnswers[selectedQuestion.id],
        selectedQuestion.possibleAnswer.split('/'),
        selectedQuestion.questionType
      );

      return {
        ...prevAnswers,
        [selectedQuestion.id]: updatedAnswers
      };
    });
  }, [selectedAnswers]);

  // Hàm xử lý khi thời gian hết
  const handleTimeUp = () => {
    stopTimer(); // Dừng timer khi hết thời gian
    toast.info("Time's up! Your exam has been submitted.");
    // Có thể gọi một hàm khác để gửi kết quả bài thi hoặc xử lý thêm
  };

  const handleBack = () => {
    if (index > 0) {
      setIndex(index - 1); // Giảm index để quay lại câu hỏi trước
      setSelectedQuestion(questions[index - 1]);
    }
  };

  const handleNext = () => {
    if (index < questions.length - 1) {
      setIndex(index + 1); // Tăng index để tiến tới câu hỏi tiếp theo
      setSelectedQuestion(questions[index + 1]);
    }
  };

  const handleMarkQuestion = () => {
    const newMarkedQuestions = new Set(markedQuestions);
    if (newMarkedQuestions.has(index)) {
      newMarkedQuestions.delete(index); // Nếu câu hỏi đã đánh dấu, bỏ đánh dấu
    } else {
      newMarkedQuestions.add(index); // Nếu chưa đánh dấu, thêm vào danh sách đánh dấu
    }
    setMarkedQuestions(newMarkedQuestions);
  };

  const handleMoveToQuestion = (idx: number) => {
    setIndex(idx);
    setSelectedQuestion(questions[idx]);
  };

  // Compute statistics
  const stats = useMemo(() => {
    let answered = 0;
    let notAnswered = 0;
    let answeredAndMarked = 0;

    questions.forEach((question, idx) => {
      const answer = selectedAnswers[question.id];
      const isMarked = markedQuestions.has(idx);

      if (
        answer &&
        (Array.isArray(answer) ? answer.length > 0 : answer.trim() !== '')
      ) {
        answered++;
        if (isMarked) {
          answeredAndMarked++;
        }
      } else {
        notAnswered++;
      }
    });

    return {
      answered,
      notAnswered,
      answeredAndMarked,
      marked: markedQuestions.size
    };
  }, [questions, selectedAnswers, markedQuestions]);

  if (!(questions.length > 0)) {
    router.replace('/');
    return;
  }
  
  return (
    <div className="container mx-auto p-4">
      <header className="flex items-center justify-between py-4">
        <div className="text-2xl font-bold text-purple-600">
          B<span className="text-orange-500">education</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-gray-600">
            Remaining time: <span className="font-bold">{formattedTime}</span>
          </div>
          <button
            className="rounded bg-green-500 px-4 py-2 text-white hover:brightness-110"
            onClick={handleSubmit}
          >
            SUBMIT
          </button>
        </div>
      </header>
      <main className="rounded bg-white p-4 shadow">
        <div>
          <div className="mb-4 border-b-2 border-gray-200">
            <h2 className="text-lg font-bold text-blue-600">
              QUESTION {index + 1}
            </h2>
          </div>
          <InputQuestion
            question={selectedQuestion}
            selectedAnswers={selectedAnswers}
            setSelectedAnswers={setSelectedAnswers}
          />
        </div>
        <div className="mt-4 flex items-center justify-between">
          <button
            className="rounded bg-gray-200 px-4 py-2 text-blue-600 hover:brightness-75"
            onClick={handleBack}
          >
            BACK
          </button>
          <button
            className="rounded bg-purple-200 px-4 py-2 text-blue-600 hover:brightness-90"
            onClick={handleMarkQuestion}
          >
            MARK QUESTION
          </button>
          <button
            className="rounded bg-blue-500 px-4 py-2 text-white hover:brightness-110"
            onClick={handleNext}
          >
            NEXT
          </button>
        </div>
      </main>
      <aside className="mt-4">
        <div className="rounded bg-white p-4 shadow">
          <div className="mb-4 border-b-2 border-gray-200">
            <h2 className="text-lg font-bold text-gray-600">
              TOTAL QUESTIONS ({questions.length})
            </h2>
          </div>
          <div className="mb-4 flex flex-wrap space-x-2">
            {questions.map((_, i) => (
              <div
                key={i}
                className={classNames(
                  `flex size-10 items-center justify-center rounded-full hover:cursor-pointer`,
                  index === i
                    ? 'bg-red-500 text-white' // Highlight the current question
                    : selectedAnswers[questions[i].id] &&
                        (Array.isArray(selectedAnswers[questions[i].id])
                          ? (selectedAnswers[questions[i].id] as string[])
                              .length > 0
                          : (
                              selectedAnswers[questions[i].id] as string
                            ).trim() !== '')
                      ? `${markedQuestions.has(i) ? 'bg-blue-500 text-white' : 'bg-teal-500 text-white'}` // Mark as answered
                      : markedQuestions.has(i)
                        ? 'bg-purple-500 text-white' // Marked but not answered
                        : 'bg-gray-200 text-gray-600' // Default unmarked
                )}
                onClick={() => {
                  handleMoveToQuestion(i);
                }}
              >
                {i + 1}
              </div>
            ))}
          </div>
          <div>
            <h3 className="mb-2 font-bold text-gray-600">NOTES</h3>
            <div className="mb-2 flex items-center">
              <div className="mr-2 flex size-10 items-center justify-center rounded-full bg-teal-500 text-white">
                {stats.answered}
              </div>
              <span className="text-xl">Answered</span>
            </div>
            {/* <div className="mb-2 flex items-center">
              <div className="mr-2 flex size-10 items-center justify-center rounded-full bg-red-500 text-white">
                1
              </div>
              <div>Viewed</div>
            </div> */}
            <div className="mb-2 flex items-center">
              <div className="mr-2 flex size-10 items-center justify-center rounded-full bg-gray-200 text-gray-600">
                {stats.notAnswered}
              </div>
              <span className="text-xl">Not answered</span>
            </div>
            <div className="mb-2 flex items-center">
              <div className="mr-2 flex size-10 items-center justify-center rounded-full bg-purple-500 text-white">
                {stats.marked}
              </div>
              <span className="text-xl">Marked</span>
            </div>
            <div className="flex items-center">
              <div className="mr-2 flex size-10 items-center justify-center rounded-full bg-blue-500 text-white">
                {stats.answeredAndMarked}
              </div>
              <span className="text-xl">Answered and marked</span>
            </div>
          </div>
        </div>
      </aside>
      <SubmitAnswerModal
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        stats={stats}
      />
    </div>
  );
};

export default DoExam;
