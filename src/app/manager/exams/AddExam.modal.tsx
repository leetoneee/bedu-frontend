'use client';

import button, { useEffect, useRef, useState } from 'react';
import * as React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
  Divider,
  Checkbox,
  Textarea,
  Input,
  SelectItem,
  Select,
  Selection,
  Button
} from '@nextui-org/react';
import { InputFile } from '@/components';
import { toast } from 'react-toastify';
import { createCourse, CreateCourseDto } from '@/services/courses.service';

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  onClose: () => void;
  onCreated?: () => void; // Callback báo cho parent biết đã tạo xong
};

const courseTypes = [
  { key: 'ielts', label: 'IELTS' },
  { key: 'toeic', label: 'TOEIC' },
  { key: 'toefl', label: 'TOEFL' }
];

export default function AddExamModal({
  isOpen,
  onOpen,
  onOpenChange,
  onClose,
  onCreated
}: Props) {
  // const [urls, setUrls] = useState<{
  //   url: string;
  //   thumbnailUrl: string | null;
  // }>();

  const [name, setName] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [timePerLesson, setTimePerLesson] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [lessonQuantity, setLessonQuantity] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [type, setType] = useState<Selection>(new Set([]));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState<{
    name: string;
    // code: string;
    type: string;
    timePerLesson: string;
    price: string;
    lessonQuantity: string;
    description: string;
  }>({
    name: '',
    // code: '',
    type: '',
    timePerLesson: '',
    price: '',
    lessonQuantity: '',
    description: ''
  });

  const validateInputs = () => {
    const newErrors = { ...errors };

    newErrors.name = name.trim() === '' ? 'Course name is required' : '';
    // newErrors.code = code.trim() === '' ? 'Course code is required' : '';
    newErrors.type =
      selectedType.trim() === '' ? 'Course type is required' : '';

    // Validate timePerLesson as a positive integer
    if (!timePerLesson) {
      newErrors.timePerLesson = 'Time per lesson is required';
    } else if (isNaN(Number(timePerLesson)) || Number(timePerLesson) <= 0) {
      newErrors.timePerLesson = 'Time per lesson must be a positive number';
    } else {
      newErrors.timePerLesson = '';
    }

    // Validate price as a positive number
    if (!price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(Number(price)) || Number(price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    } else {
      newErrors.price = '';
    }

    // Validate lessonQuantity as a positive integer
    if (!lessonQuantity) {
      newErrors.lessonQuantity = 'Lesson quantity is required';
    } else if (
      isNaN(Number(lessonQuantity)) ||
      !Number.isInteger(Number(lessonQuantity)) ||
      Number(lessonQuantity) <= 0
    ) {
      newErrors.lessonQuantity = 'Lesson quantity must be a positive integer';
    } else {
      newErrors.lessonQuantity = '';
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
      const data: CreateCourseDto = {
        courseType: selectedType.toLowerCase(),
        title: name,
        description: description,
        image: '',
        lessonQuantity: Number(lessonQuantity),
        timePerLesson: Number(timePerLesson),
        price: Number(price),
        programId: [],
        isActive: isPublic
      };
      try {
        setIsSubmitting(true); // Bắt đầu gửi yêu cầu
        // Gọi API và đợi kết quả
        const result = await createCourse(data);
        if (result) {
          handleClose();
          if (onCreated) {
            onCreated();
          }
        }
      } catch (error: any) {
        console.error('🚫 ~ onSubmit ~ Error:', error);
        toast.error(
          error.response?.data?.message ||
            'Failed to create course. Please try again.'
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
    setCode('');
    setTimePerLesson('');
    setPrice('');
    setLessonQuantity('');
    setType(new Set([]));
    setDescription('');
    setIsPublic(false);
    setErrors({
      name: '',
      // code: '',
      type: '',
      timePerLesson: '',
      price: '',
      lessonQuantity: '',
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
            <div className="text-lg font-semibold">Add new course</div>
            <div className="text-wrap text-sm font-normal">
              Create a new course to structure lessons and assign exercises for
              students
            </div>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-7">
            {/* Course name */}
            <div className="flex flex-row">
              <div className="basis-[30%]">
                <span className="text-sm font-medium text-black">
                  Course name<span className="text-danger">*</span>
                </span>
              </div>
              <div className="relative basis-[70%]">
                <input
                  type="text"
                  className="w-full rounded-lg"
                  placeholder="Enter course name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {renderError('name')}
              </div>
            </div>
            {/* Course code */}
            {/* <div className="flex flex-row">
              <div className="basis-[30%]">
                <span className="text-sm font-medium text-black">
                  Course code<span className="text-danger">*</span>
                </span>
              </div>
              <div className="relative flex basis-[70%] gap-8">
                <input
                  type="text"
                  className="w-1/2 rounded-lg"
                  placeholder="Enter course code..."
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                {renderError('code')}

                <div className="relative flex w-1/2 flex-row gap-4">
                  <span className="text-sm font-medium text-black">
                    Type<span className="text-danger">*</span>
                  </span>
                  <Select
                    className="max-w-xs"
                    placeholder="Select type"
                    disallowEmptySelection
                    selectedKeys={type}
                    variant="bordered"
                    onSelectionChange={setType}
                  >
                    {courseTypes.map((type) => (
                      <SelectItem key={type}>{type}</SelectItem>
                    ))}
                  </Select>
                  {renderError('type')}
                </div>
              </div>
            </div> */}

            {/* Type */}
            <div className="flex flex-row">
              <div className="basis-[30%]">
                <span className="text-sm font-medium text-black">
                  Type<span className="text-danger">*</span>
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
                  {courseTypes.map((type) => (
                    <SelectItem key={type.key}>{type.label}</SelectItem>
                  ))}
                </Select>
                {renderError('type')}
              </div>
            </div>

            <Divider />

            {/* Program image  */}

            {/* Time per lesson & Price */}
            <div className="relative flex flex-row">
              <div className="basis-[30%]">
                <span className="text-sm font-medium text-black">
                  Time per lesson<span className="text-danger">*</span>
                </span>
              </div>
              {renderError('timePerLesson')}
              <div className="flex basis-[70%] gap-8">
                <div className="relative w-1/2">
                  <input
                    type="text"
                    className="w-full rounded-lg pr-16"
                    placeholder="Enter time"
                    value={timePerLesson}
                    onChange={(e) => setTimePerLesson(e.target.value)}
                  />
                  <div className="absolute right-14 top-1/2 h-full w-px -translate-y-1/2 transform bg-gray-300"></div>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500">
                    mins
                  </span>
                </div>
                {/* Price */}
                <div className="relative flex w-2/3 flex-row gap-4">
                  <span className="text-sm font-medium text-black">
                    Price<span className="text-danger">*</span>
                  </span>
                  {renderError('price')}
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full rounded-lg pr-16"
                      placeholder="Enter price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <div className="absolute right-14 top-1/2 h-full w-px -translate-y-1/2 transform bg-gray-300"></div>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500">
                      VND
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Divider />

            {/* Lesson quantity & public */}
            <div className="flex flex-row">
              <div className="basis-[30%]">
                <span className="text-sm font-medium text-black">
                  Lesson quantity<span className="text-danger">*</span>
                </span>
              </div>
              <div className="relative flex basis-[70%] gap-8">
                <input
                  type="text"
                  className="w-2/3 rounded-lg"
                  placeholder="Enter lesson quantity..."
                  value={lessonQuantity}
                  onChange={(e) => setLessonQuantity(e.target.value)}
                />
                {renderError('lessonQuantity')}
                <div className="flex w-1/3 flex-row">
                  <Checkbox isSelected={isPublic} onValueChange={setIsPublic}>
                    Public
                  </Checkbox>
                </div>
              </div>
            </div>

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
                  placeholder="Enter course description..."
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
