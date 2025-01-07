import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner
} from '@nextui-org/react';
import React, { Fragment, useState } from 'react';
// import axios from '@/libs/axiosInstance';
import { toast } from 'react-toastify';
import { Exam } from '@/types/exam.type';
import { editLesson, UpdateLessonDto } from '@/services/lessons.service';
import { findExamByCode } from '@/services/exam.service';

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  lessonId: string;
  onOpenChange: () => void;
  onClose: () => void;
  onCreated?: () => void; // Callback báo cho parent biết đã tạo xong
};

// const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const examTypes = [
  { key: 'assignments', label: 'Assignments' },
  { key: 'mid-term', label: 'Mid-Term' },
  { key: 'final-term', label: 'Final-Term' }
];

const AddExamModal = ({
  isOpen,
  onOpenChange,
  onClose,
  lessonId,
  onCreated
}: Props) => {
  // State
  const [code, setCode] = useState<string>('');
  const [exam, setExam] = useState<Exam>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{
    code: string;
  }>({
    code: ''
  });

  const handleFindExam = async () => {
    if (!code) {
      setErrors({
        code: 'CODE is required'
      });
      return;
    }

    // Call API
    try {
      setIsLoading(true);
      const perseudoCode = code.toLowerCase().replace('ex', '');
      const result = await findExamByCode(perseudoCode);
      if (result && result.metadata) {
        setExam(result.metadata);
        setIsLoading(false);
      } else {
        setErrors({
          code: 'Exam not found'
        });
        setExam(undefined);
      }
    } catch (error: any) {
      console.error('🚫 ~ onSubmit ~ Error:', error);
      setExam(undefined);
      setErrors({
        code: 'Exam not found'
      });
      toast.error(
        error.response?.data?.message ||
          'Failed to find exam. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setCode('');
    setExam(undefined);
    setErrors({
      code: ''
    });
    // Đóng modal
    onClose();
  };

  const handleSubmit = async () => {
    if (!code && !exam) {
      setErrors({
        code: 'CODE is required or user not found'
      });
      return;
    }

    setIsSubmitting(true);
    // Call API
    try {
      if (!exam) return;
      const data: UpdateLessonDto = {
        examId: exam.id
      };
      const result = await editLesson(Number(lessonId), data);
      if (result) {
        handleClose();
        if (onCreated) {
          onCreated();
        }
      }
    } catch (error: any) {
      console.error('🚫 ~ onSubmit ~ Error:', error);
      toast.error(
        error.response?.data?.message || 'Failed to add exam to lesson.'
      );
    } finally {
      setIsSubmitting(false);
    }

    setIsSubmitting(false);
  };

  const renderError = (field: keyof typeof errors) =>
    errors[field] && (
      <span className="absolute bottom-[-20px] left-2 h-4 min-w-max text-sm text-danger">
        {errors[field]}
      </span>
    );

  const size = '2xl';
  return (
    <Modal
      size={size}
      isOpen={isOpen}
      radius="lg"
      onOpenChange={onOpenChange}
      onClose={handleClose}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      scrollBehavior="outside"
      classNames={{
        body: 'py-5 px-6 bg-white border-outline-var',
        backdrop: 'bg-[#292f46]/50 backdrop-opacity-40',
        base: 'border-outline-var bg-outline-var',
        header: 'border-b-[1px] border-border bg-white',
        footer: 'border-t-[1px] border-border bg-white'
        // closeButton: 'hover:bg-on-primary/5 active:bg-on-primary/10 disable'
      }}
    >
      <ModalContent>
        <ModalHeader className="w-full rounded-t-xl border">
          <div className="border-b--b-primary h-11 w-11 content-center rounded-lg border-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="mx-auto size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
              />
            </svg>
          </div>
          <div className="ml-5">
            <div className="text-lg font-semibold">Add exam to lesson</div>
            <div className="text-wrap text-sm font-normal">
              By adding an exam to a lesson, students can take assignment
              directly tied to the lesson content.
            </div>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-7">
            {/* User CID */}
            <div className="flex flex-row">
              <div className="basis-[30%]">
                <span className="text-sm font-medium text-black">
                  Exam code<span className="text-danger">*</span>
                </span>
              </div>
              <div className="relative basis-[70%]">
                <input
                  type="text"
                  className="w-full rounded-lg"
                  placeholder="Find exam..."
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onBlur={() => handleFindExam()}
                  onFocus={() => {
                    setErrors({
                      code: ''
                    });
                  }}
                />
                {renderError('code')}
              </div>
            </div>

            <Divider />

            {/* User information */}
            {isLoading && <Spinner />}
            {exam && (
              <Fragment>
                <div className="text-lg font-semibold">Exam information</div>
                <div className="flex flex-col gap-7">
                  <div className="flex flex-row">
                    {/* Name */}
                    <div className="basis-[30%]">
                      <span className="text-sm font-medium text-black">
                        Title
                      </span>
                    </div>
                    <div className="relative basis-[70%]">
                      <input
                        type="text"
                        className="w-full rounded-lg"
                        readOnly
                        value={exam.title}
                      />
                    </div>
                  </div>
                  {/* Type */}
                  <div className="flex flex-row">
                    <div className="basis-[30%]">
                      <span className="text-sm font-medium text-black">
                        Type
                      </span>
                    </div>
                    <div className="relative basis-[70%]">
                      <input
                        type="text"
                        className="w-full rounded-lg"
                        readOnly
                        value={
                          examTypes.find((type) => type.key === exam.examType)
                            ?.label || 'Unknown'
                        }
                      />
                    </div>
                  </div>
                  {/* Duration */}
                  <div className="flex flex-row">
                    <div className="basis-[30%]">
                      <span className="text-sm font-medium text-black">
                        Duration
                      </span>
                    </div>
                    <div className="relative basis-[70%]">
                      <input
                        type="text"
                        className="w-full rounded-lg"
                        readOnly
                        value={exam.duration + ` minites`}
                      />
                    </div>
                  </div>
                  {/* Number of questions */}
                  <div className="flex flex-row">
                    <div className="basis-[30%]">
                      <span className="text-sm font-medium text-black">
                        Number of questions
                      </span>
                    </div>
                    <div className="relative basis-[70%]">
                      <input
                        type="text"
                        className="w-full rounded-lg"
                        readOnly
                        value={exam.questions.length}
                      />
                    </div>
                  </div>
                </div>
              </Fragment>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex w-full flex-row justify-between space-x-6">
            <Button
              onPress={handleClose}
              className="w-1/2 rounded-lg border border-outline bg-white py-2 text-[16px] font-medium text-black hover:bg-highlight"
            >
              Cancel
            </Button>
            <Button
              color="primary"
              onPress={handleSubmit}
              className="w-1/2 rounded-lg border border-outline bg-on-primary py-2 text-[16px] font-medium text-white"
            >
              {isSubmitting ? 'Submitting...' : 'Add'}
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddExamModal;
