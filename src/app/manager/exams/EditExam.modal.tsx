'use client';

import { useEffect, useState } from 'react';
import * as React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
  Divider,
  SelectItem,
  Select,
  Selection,
  Button
} from '@nextui-org/react';
import { toast } from 'react-toastify';
import { editExam, UpdateExamDto } from '@/services/exam.service';
import { Exam } from '@/types/exam.type';

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  onClose: () => void;
  exam: Exam;
  onEdited?: () => void; // Callback báo cho parent biết đã tạo xong
};

const examTypes = [
  { key: 'assignments', label: 'Assignments' },
  { key: 'mid-term', label: 'Mid-Term' },
  { key: 'final-term', label: 'Final-Term' }
];

const scroringTypes = [{ key: 'highest', label: 'Highest score' }];

export default function EditExamModal({
  isOpen,
  onOpenChange,
  onClose,
  exam,
  onEdited
}: Props) {
  // const [urls, setUrls] = useState<{
  //   url: string;
  //   thumbnailUrl: string | null;
  // }>();

  const [name, setName] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [maxTries, setMaxTries] = useState<string>('');
  const [resultTime, setResultTime] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  // const [isPublic, setIsPublic] = useState<boolean>(false);
  const [type, setType] = useState<Selection>(new Set([]));
  const [scoringtype, setScoringType] = useState<Selection>(
    new Set(['highest'])
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState<{
    name: string;
    type: string;
    duration: string;
    maxTries: string;
    resultTime: string;
    description: string;
  }>({
    name: '',
    type: '',
    duration: '',
    maxTries: '',
    resultTime: '',
    description: ''
  });

  useEffect(() => {
    if (exam) {
      setName(exam.title);
      setDuration(`${exam.duration}`);
      setMaxTries(`${exam.maxTries}`);
      setResultTime(`${exam.resultTime}`);
      setDescription(exam.description);
      setType(new Set([`${exam.examType}`]));
    }
  }, [exam]);

  const validateInputs = () => {
    const newErrors = { ...errors };

    newErrors.name = name.trim() === '' ? 'Exam name is required' : '';
    newErrors.type = selectedType.trim() === '' ? 'Exam type is required' : '';

    // Validate duration as a positive integer
    if (!duration) {
      newErrors.duration = 'Duration is required';
    } else if (isNaN(Number(duration)) || Number(duration) <= 0) {
      newErrors.duration = 'Duration must be a positive number';
    } else {
      newErrors.duration = '';
    }

    // Validate price as a positive number
    if (!maxTries) {
      newErrors.maxTries = 'Max tries is required';
    } else if (isNaN(Number(maxTries)) || Number(maxTries) <= 0) {
      newErrors.maxTries = 'Max tries must be a positive number';
    } else {
      newErrors.maxTries = '';
    }

    // Validate resultTime as a positive integer
    if (!resultTime) {
      newErrors.resultTime = 'Result time is required';
    } else if (
      isNaN(Number(resultTime)) ||
      !Number.isInteger(Number(resultTime)) ||
      Number(resultTime) <= 0
    ) {
      newErrors.resultTime = 'Result time must be a positive integer';
    } else {
      newErrors.resultTime = '';
    }

    newErrors.description =
      description.trim() === '' ? 'Description is required' : '';

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === '');
  };

  const selectedType = React.useMemo(
    () => Array.from(type).join(', ').replaceAll('_', ' '),
    [type]
  );

  const handleSubmit = async () => {
    if (validateInputs()) {
      console.log('Form is valid. Submitting...');
      // Handle form submission logic here
      const data: UpdateExamDto = {
        title: name,
        examType: selectedType,
        duration: Number(duration),
        maxTries: Number(maxTries),
        resultTime: Number(resultTime),
        description: description
      };
      try {
        setIsSubmitting(true); // Bắt đầu gửi yêu cầu
        // Gọi API và đợi kết quả
        const result = await editExam(exam.id, data);
        if (result) {
          handleClose();
          if (onEdited) {
            onEdited();
          }
        }
      } catch (error: any) {
        console.error('🚫 ~ onSubmit ~ Error:', error);
        toast.error(
          error.response?.data?.message ||
            'Failed to create exam. Please try again.'
        );
      } finally {
        setIsSubmitting(false); // Hoàn tất gửi yêu cầu
      }
    } else {
      console.log('Form has errors. Fix them to proceed.');
    }
  };

  const handleClose = () => {
    setName('');
    setDuration('');
    setMaxTries('');
    setResultTime('');
    setType(new Set([]));
    setScoringType(new Set(['highest']));
    setDescription('');
    setErrors({
      name: '',
      type: '',
      duration: '',
      maxTries: '',
      resultTime: '',
      description: ''
    });
    // Đóng modal
    onClose();
  };

  const renderError = (field: keyof typeof errors) =>
    errors[field] && (
      <span className="absolute bottom-[-20px] left-2 h-4 min-w-max text-sm text-danger">
        {errors[field]}
      </span>
    );

  const size: '2xl' = '2xl';
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
            <div className="text-lg font-semibold">Edit an exam</div>
            <div className="text-wrap text-sm font-normal">
              Edit information about an exam.
            </div>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-7">
            {/* Exam name */}
            <div className="flex flex-row">
              <div className="basis-[30%]">
                <span className="text-sm font-medium text-black">
                  Title<span className="text-danger">*</span>
                </span>
              </div>
              <div className="relative basis-[70%]">
                <input
                  type="text"
                  className="w-full rounded-lg"
                  placeholder="Enter title of exam..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {renderError('name')}
              </div>
            </div>

            {/* Type */}
            <div className="flex flex-row">
              <div className="basis-[30%]">
                <span className="text-sm font-medium text-black">
                  Exam type<span className="text-danger">*</span>
                </span>
              </div>
              <div className="relative flex basis-[70%] gap-8">
                <Select
                  className="max-w-xs"
                  placeholder="Select type"
                  disallowEmptySelection
                  selectedKeys={type}
                  variant="bordered"
                  onSelectionChange={setType}
                >
                  {examTypes.map((type) => (
                    <SelectItem key={type.key}>{type.label}</SelectItem>
                  ))}
                </Select>
                {renderError('type')}
              </div>
            </div>

            {/* Time per lesson & Price */}
            <div className="relative flex flex-row">
              <div className="basis-[30%]">
                <span className="text-sm font-medium text-black">
                  Duration<span className="text-danger">*</span>
                </span>
              </div>
              <div className="flex basis-[70%] gap-8">
                <div className="relative w-1/2">
                  <input
                    type="text"
                    className="w-full rounded-lg pr-16"
                    placeholder="Enter duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                  <div className="absolute right-14 top-1/2 h-full w-px -translate-y-1/2 transform bg-gray-300"></div>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500">
                    mins
                  </span>
                  {renderError('duration')}
                </div>
                {/* Max tries */}
                <div className="relative flex w-2/3 flex-row gap-4">
                  <span className="text-sm font-medium text-black">
                    Max tries<span className="text-danger">*</span>
                  </span>
                  {renderError('maxTries')}
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full rounded-lg pr-16"
                      placeholder=""
                      value={maxTries}
                      onChange={(e) => setMaxTries(e.target.value)}
                    />
                    <div className="absolute right-14 top-1/2 h-full w-px -translate-y-1/2 transform bg-gray-300"></div>
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 transform text-gray-500">
                      times
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Scoring Type */}
            <div className="flex flex-row">
              <div className="basis-[30%]">
                <span className="text-sm font-medium text-black">
                  Scroring type<span className="text-danger">*</span>
                </span>
              </div>
              <div className="relative flex basis-[70%] gap-8">
                <Select
                  className="max-w-xs"
                  placeholder="Select type"
                  disallowEmptySelection
                  selectedKeys={scoringtype}
                  variant="bordered"
                  onSelectionChange={setScoringType}
                >
                  {scroringTypes.map((type) => (
                    <SelectItem key={type.key}>{type.label}</SelectItem>
                  ))}
                </Select>
                {/* {renderError('type')} */}
              </div>
            </div>

            {/* Time of result display */}
            <div className="flex flex-row">
              <div className="basis-[30%]">
                <span className="text-sm font-medium text-black">
                  Time of result display<span className="text-danger">*</span>
                </span>
              </div>
              <div className="relative basis-[70%]">
                <input
                  type="text"
                  className="w-full rounded-lg"
                  placeholder="Enter result time..."
                  value={resultTime}
                  onChange={(e) => setResultTime(e.target.value)}
                />
                {renderError('resultTime')}
              </div>
            </div>

            <Divider />

            {/* Description */}
            <div className="flex flex-row">
              <div className="basis-[30%]">
                <span className="text-sm font-medium text-black">
                  Description<span className="text-danger">*</span>
                </span>
              </div>
              <div className="relative basis-[70%]">
                <textarea
                  className="w-full rounded-lg bg-white"
                  placeholder="Enter exam description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                {renderError('description')}
              </div>
            </div>
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
              {isSubmitting ? 'Submitting...' : 'Create'}
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
