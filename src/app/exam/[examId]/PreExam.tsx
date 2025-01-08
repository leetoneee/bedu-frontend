import React from 'react';

type Props = {
  examType: string;
  duration: number; // Thời gian làm bài (phút)
  description: string;
  title: string;
  questionCount: number;
  onStart: () => void; // Hàm xử lý khi nhấn nút bắt đầu làm bài
};

const PreExam = ({
  examType,
  duration,
  description,
  title,
  questionCount,
  onStart
}: Props) => {
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

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <div className="w-11/12 max-w-2xl rounded-lg bg-white shadow-lg">
        {/* Tiêu đề bài thi */}
        <div className="border-b border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          <p className="mt-2 text-sm text-gray-500">
            {getExamTypeLabel(examType)}
          </p>
        </div>

        {/* Thông tin chi tiết bài thi */}
        <div className="space-y-4 p-6">
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-700">Time to do the test:</p>
            <p className="text-gray-600">{duration} minites</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-700">Number of questions:</p>
            <p className="text-gray-600">{questionCount} questions</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">
              Information about the test:
            </p>
            <p className="mt-1 text-gray-600">{description}</p>
          </div>
        </div>

        {/* Nút bắt đầu làm bài */}
        <div className="border-t border-gray-200 p-6">
          <button
            onClick={onStart}
            className="w-full rounded-lg bg-blue-500 px-4 py-3 font-medium text-white transition hover:bg-blue-600"
          >
            Start Exam
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreExam;
