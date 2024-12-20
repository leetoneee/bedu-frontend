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
import { createLesson, CreateLessonDto } from '@/services/lessons.service';

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  onClose: () => void;
  courseId: number;
  courseName: string;
  courseType: string;
  onCreated?: () => void; // Callback báo cho parent biết đã tạo xong
};

const courseTypes = [
  { key: 'ielts', label: 'IELTS' },
  { key: 'toeic', label: 'TOEIC' },
  { key: 'toefl', label: 'TOEFL' }
];

export default function AddLessonModal({
  isOpen,
  onOpen,
  onOpenChange,
  onClose,
  courseId,
  courseName,
  courseType,
  onCreated
}: Props) {
  // const [urls, setUrls] = useState<{
  //   url: string;
  //   thumbnailUrl: string | null;
  // }>();

  const [name, setName] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [type, setType] = useState<Selection>(new Set([`${courseType}`]));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState<{
    name: string;
    type: string;
    videoUrl: string;
  }>({
    name: '',
    type: '',
    videoUrl: ''
  });

  const validateInputs = () => {
    const newErrors = { ...errors };

    newErrors.name = name.trim() === '' ? 'Lesson name is required' : '';

    newErrors.type =
      selectedType.trim() === '' ? 'Lesson type is required' : '';

    const urlPattern = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\/\w-]*)*(\?.*)?$/;
    newErrors.videoUrl =
      url.trim() === ''
        ? 'Video URL is required'
        : !urlPattern.test(url)
          ? 'Invalid URL format'
          : '';

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
      const today = new Date();

      const data: CreateLessonDto = {
        startDate: today.toISOString(),
        endDate: today.toISOString(),
        type: selectedType.toLowerCase(),
        courseId: courseId,
        // title: name,
        videoUrl: url,
        isActive: isPublic
      };
      try {
        setIsSubmitting(true); // Bắt đầu gửi yêu cầu
        // Gọi API và đợi kết quả
        const result = await createLesson(data);
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
            'Failed to create lesson. Please try again.'
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
    setType(new Set([]));
    setUrl('');
    // setIsPublic(false);
    setErrors({
      name: '',
      type: '',
      videoUrl: ''
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
            <div className="text-lg font-semibold">Add new lesson</div>
            <div className="text-wrap text-sm font-normal">
              Create a new lesson in a course and assign exercises for students
            </div>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-7">
            {/* Lesson name */}
            <div className="flex flex-row">
              <div className="basis-[30%]">
                <span className="text-sm font-medium text-black">
                  Lesson name<span className="text-danger">*</span>
                </span>
              </div>
              <div className="relative basis-[70%]">
                <input
                  type="text"
                  className="w-full rounded-lg"
                  placeholder="Enter lesson name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {renderError('name')}
              </div>
            </div>

            {/* Lesson name */}
            <div className="flex flex-row">
              <div className="basis-[30%]">
                <span className="text-sm font-medium text-black">
                  Course name<span className="text-danger">*</span>
                </span>
              </div>
              <div className="relative basis-[70%]">
                <input
                  type="text"
                  className="w-full rounded-lg bg-default"
                  value={courseName}
                  readOnly
                />
              </div>
            </div>

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
                  color='default'
                  variant="bordered"
                  // onSelectionChange={setType}
                >
                  {courseTypes.map((type) => (
                    <SelectItem key={type.key}>{type.label}</SelectItem>
                  ))}
                </Select>
                {renderError('type')}
                <div className="flex w-1/3 flex-row">
                  <Checkbox isSelected={isPublic} onValueChange={setIsPublic}>
                    Public
                  </Checkbox>
                </div>
              </div>
            </div>

            <Divider />

            {/* Video URL */}
            <div className="flex flex-row">
              <div className="basis-[30%]">
                <span className="text-sm font-medium text-black">
                  Video URL<span className="text-danger">*</span>
                </span>
              </div>
              <div className="relative basis-[70%]">
                <input
                  type="text"
                  className="w-full rounded-lg"
                  placeholder="https://www.youtube.com/"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                {renderError('videoUrl')}
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
