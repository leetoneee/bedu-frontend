'use client';

import { ExamContext } from '@/contexts';
import { Question } from '@/types/question-bank.type';
import { useCallback, useEffect, useRef, useState } from 'react';

function ExamProvider({ children }: { children: React.ReactNode }) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [duration, setDuration] = useState<number>(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [remainingTime, setRemainingTime] = useState(-1);
  const timerId = useRef<NodeJS.Timeout | null>(null); // Dùng useRef để giữ giá trị timerId không bị cập nhật lại.

  // Bắt đầu đếm ngược
  const startTimer = useCallback((duration: number) => {
    setRemainingTime(duration); // Cập nhật remainingTime
    if (timerId.current) clearInterval(timerId.current); // Xóa interval cũ nếu có

    timerId.current = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(timerId.current!); // Dừng khi hết giờ
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  // Dừng đếm ngược
  const stopTimer = useCallback(() => {
    if (timerId.current) clearInterval(timerId.current);
  }, []);

  useEffect(() => {
    return () => {
      if (timerId.current) clearInterval(timerId.current); // Dừng timer khi component unmount
    };
  }, []);

  return (
    <ExamContext.Provider
      value={{
        questions,
        setQuestions,
        remainingTime,
        startTimer,
        stopTimer,
        duration,
        setDuration,
        answers,
        setAnswers
      }}
    >
      {children}
    </ExamContext.Provider>
  );
}

export default ExamProvider;
