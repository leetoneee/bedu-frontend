import { AppContext, ExamContext } from '@/contexts';
import { useFormattedTime } from '@/helpers';
import { CreateAnswerDto, createAnswers } from '@/services/answers.service';
import { AuthType, ExamContextType, TimeContextType } from '@/types';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from '@nextui-org/react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onOpenChange?: () => void;
  stats: {
    answered: number;
    notAnswered: number;
    answeredAndMarked: number;
    marked: number;
  };
};

const SubmitAnswerModal = ({
  isOpen,
  onClose,
  onOpen,
  onOpenChange,
  stats
}: Props) => {
  const router = useRouter();
  const { auth } = useContext(AppContext) as AuthType;
  const { questions, answers } = useContext(ExamContext) as ExamContextType;
  const { remainingTime, startTimer, stopTimer } = useContext(
    ExamContext
  ) as TimeContextType;
  const formattedTime = useFormattedTime(remainingTime);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const params = useParams();
  const examId = Number(params.examId);

  const handleSubmit = async () => {
    const data: CreateAnswerDto[] = questions.map((question) => ({
      userId: 10,
      examId: examId,
      questionId: question.id,
      content: answers[question.id],
      points: 0
    }));
    try {
      setIsSubmitting(true); // Bắt đầu gửi yêu cầu
      // Gọi API và đợi kết quả
      const result = await createAnswers(data);
      if (result) {
        toast.success('Submit the answers successfully!');
        stopTimer();
        router.push('result');
      }
    } catch (error: any) {
      console.error('🚫 ~ onSubmit ~ Error:', error);
      toast.error(
        error.response?.data?.message || 'Failed to submit. Please try again.'
      );
    } finally {
      setIsSubmitting(false); // Hoàn tất gửi yêu cầu
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      size={'2xl'}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      onOpenChange={onOpenChange}
      hideCloseButton
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {/* Modal Title */}
            </ModalHeader>
            <ModalBody>
              <div className="mx-auto">
                <div className="mb-4 flex justify-center">
                  <Image
                    src={'/images/form.jpg'}
                    alt="Clipboard with checkmarks"
                    width={100}
                    height={100}
                  />
                </div>
                <h2 className="mb-6 text-center text-xl font-semibold">
                  Are you sure you want to submit the exam ?
                </h2>
                <div className="mb-6 grid grid-cols-2 gap-4">
                  <div className="mb-2 flex items-center">
                    <div className="mr-2 flex size-10 items-center justify-center rounded-full bg-teal-500 text-white">
                      {stats.answered}
                    </div>
                    <span className="text-xl">Answered</span>
                  </div>
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
                <div className="mb-6 flex items-center justify-center">
                  <i className="fas fa-clock mr-2 text-blue-500"></i>
                  <span>
                    Remaining time:{' '}
                    <span className="font-semibold">{formattedTime}</span>
                  </span>
                </div>
                <div className="flex justify-evenly">
                  <button
                    className="rounded-lg bg-blue-100 px-4 py-2 text-blue-500 hover:brightness-90"
                    onClick={onClose}
                  >
                    CONTINUE THE TEST
                  </button>
                  <button
                    className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:brightness-110"
                    onClick={handleSubmit}
                  >
                    {isSubmitting ? 'Submitting...' : 'SUBMIT ANSWERS'}
                  </button>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              {/* <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
                Action
              </Button> */}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default SubmitAnswerModal;
