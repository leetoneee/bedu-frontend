import { Exam } from '@/types/exam.type';
import React, { useEffect, useRef, useState } from 'react';
import axios from '@/libs/axiosInstance';
import useSWR from 'swr';
import { StaticQuestion } from '@/components';
import { Question } from '@/types/question-bank.type';
import { Reorder } from 'framer-motion';
import Image from 'next/image';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure
} from '@nextui-org/react';
import { EyeIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import AddQuestionsModal from './add-question.modal';
import { editExam, UpdateExamDto } from '@/services/exam.service';
import { toast } from 'react-toastify';

type Props = {
  id: number;
  setIsModalNewTaskOpen?: (isOpen: boolean) => void;
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

// const questionData: Question[] = [
//   {
//     id: 1,
//     question: '3 + 33 =',
//     totalPoints: 3,
//     pointDivision: '',
//     content: 'Chọn đáp án đúng nhất',
//     attach: '',
//     questionType: 'SingleChoice',
//     possibleAnswer: '33/36/2/3',
//     answer: '@/36/@/@',
//     examId: [],
//     documentId: []
//   },
//   {
//     id: 2,
//     question: 'Anh thích ... và ...',
//     totalPoints: 3,
//     pointDivision: '3',
//     content: 'Điền vào chỗ trống',
//     attach: '',
//     questionType: 'FillInTheBlankChoice',
//     possibleAnswer: 'Kem',
//     answer: 'Kem',
//     examId: [],
//     documentId: []
//   },
//   {
//     id: 3,
//     question: 'Anh ta thích cái gì?',
//     totalPoints: 1,
//     pointDivision: '',
//     content: 'Chọn nhiều đáp án',
//     attach: '',
//     questionType: 'MultipleChoice',
//     possibleAnswer: 'Kem/Bánh/Xem Video',
//     answer: 'Kem/Bánh/@',
//     examId: [],
//     documentId: []
//   }
// ];

const LOQ = ({ id }: Props) => {
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]); // Create refs for each question

  const [exam, setExam] = useState<Exam | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    data
    // isLoading,
    // error: classError,
    // mutate: refreshEndpoint
  } = useSWR(`/exams/item/${id}`, fetcher);

  useEffect(() => {
    if (!data) {
      setExam(null);
      setQuestions([]);
    }
    if (data?.metadata) {
      setExam(data.metadata);
      setQuestions(data.metadata.questions);
    }
  }, [data]);

  const handleSubmit = async () => {
    console.log('🚀 ~ handleSubmit ~ questions:', questions);
    const listQuestions = questions.map((question) => question.id);
    const updateData: UpdateExamDto = {
      questionId: listQuestions
    };
    try {
      setIsSubmitting(true); // Bắt đầu gửi yêu cầu
      // Gọi API và đợi kết quả
      if (exam) {
        const result = await editExam(exam.id, updateData);
        if (result) {
          toast.success('Save questions successfully!');
        }
      }
    } catch (error: any) {
      console.error('🚫 ~ onSubmit ~ Error:', error);
      toast.error(
        error.response?.data?.message || 'Failed to edit Exam.try again.'
      );
    } finally {
      setIsSubmitting(false); // Hoàn tất gửi yêu cầu
    }
  };

  const handleViewClick = (index: number) => {
    if (questionRefs.current[index]) {
      questionRefs.current[index]?.scrollIntoView({
        behavior: 'smooth', // Smooth scrolling
        block: 'center' // Center the question in the view
      });
    }
  };

  return (
    <div className="flex h-full w-full flex-col gap-2 rounded rounded-t-none border-on-surface/20 bg-white p-5 shadow-sm">
      {/* Code ở đây */}
      <div className="flex h-dvh w-full flex-row gap-2">
        <div className="flex h-full basis-[70%] flex-col gap-2">
          <span className="text-xl font-bold text-on-surface">
            {exam?.title}
          </span>
          <div className="flex h-full flex-col gap-4 overflow-y-auto shadow-md">
            {questions.map((question, index) => (
              <div
                key={question.id}
                ref={(el) => {
                  questionRefs.current[index] = el;
                }} // Assign ref to each question
              >
                <StaticQuestion question={question} index={index + 1} />
              </div>
            ))}
          </div>
        </div>
        <div className="basis-[30%]">
          <div className="pl-4">
            <div className="mb-4 flex w-full items-center justify-around">
              <Button
                className="h-10 rounded-xl bg-on-primary text-white"
                startContent={<PlusIcon className="size-6 text-white" />}
                size="lg"
                onClick={onOpen}
              >
                Add
              </Button>
              <Button
                className="h-10 rounded-xl bg-on-primary text-white"
                startContent={
                  <Image
                    src={'/icons/save.svg'}
                    alt="save"
                    className="size-6 text-white"
                    width={24}
                    height={24}
                  />
                }
                size="lg"
                onClick={handleSubmit}
              >
                {isSubmitting ? 'Saving...' : 'Save'}
              </Button>
            </div>
            <h2 className="mb-4 font-bold">List of questions</h2>
            <Reorder.Group
              axis="y"
              values={questions}
              onReorder={setQuestions}
              className="flex h-full flex-col gap-4"
            >
              {questions.map((item, index) => (
                <Reorder.Item
                  key={item.id}
                  value={item}
                  className="flex items-center justify-between rounded-md bg-white p-2 shadow-md hover:cursor-pointer"
                >
                  <span className="select-none truncate">
                    {`Q.${index + 1}`}: {item.question}
                  </span>
                  <Dropdown>
                    <DropdownTrigger>
                      <Image
                        src="/icons/reorder.svg"
                        alt="Reorder icon"
                        className="select-none"
                        width={15}
                        height={15}
                      />
                    </DropdownTrigger>
                    <DropdownMenu
                      variant="solid"
                      aria-label="Dropdown menu with icons"
                    >
                      <DropdownItem
                        key="view"
                        startContent={
                          <EyeIcon className={'size-6 text-primary'} />
                        }
                        onClick={() => {
                          handleViewClick(index);
                        }}
                      >
                        View
                      </DropdownItem>
                      <DropdownItem
                        key="delete"
                        startContent={
                          <TrashIcon className={'size-6 text-danger'} />
                        }
                        onClick={() => {
                          setQuestions((prev) =>
                            prev.filter((_, i) => i !== index)
                          );
                        }}
                      >
                        Delete
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </div>
        </div>
      </div>
      {exam && (
        <AddQuestionsModal
          isOpen={isOpen}
          onOpen={onOpen}
          courseType={exam?.examType}
          onOpenChange={onOpenChange}
          questions={questions}
          setQuestions={setQuestions}
        />
      )}
    </div>
  );
};

export default LOQ;
