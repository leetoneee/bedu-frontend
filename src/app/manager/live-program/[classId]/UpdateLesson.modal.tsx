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
  Checkbox,
  SelectItem,
  Select,
  Selection,
  Button,
  Tooltip
} from '@nextui-org/react';
import { toast } from 'react-toastify';
import {
  createRecurringLesson,
  CreateRecurringLessonDto
} from '@/services/lessons.service';
import useSWR from 'swr';
import axios from '@/libs/axiosInstance';
import { User } from '@/types/user.type';
import { getFullDayName } from '@/helpers';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Lesson } from '@/types/lesson.type';
import { ReScheduleLessonDto, editReschedule } from '@/services/lessons.service';

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  onClose: () => void;
  eclassId: number;
  lessonUpdate: Lesson | null;
  onEdit?: () => void; // Callback báo cho parent biết đã tạo xong
};

const courseTypes = [
  { key: 'ielts', label: 'IELTS' },
  { key: 'toeic', label: 'TOEIC' },
  { key: 'toefl', label: 'TOEFL' }
];

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const endBys = [
  { key: 'to', label: 'To' },
  { key: 'endafter', label: 'End after' }
];

const cycles = [
  { key: 'days', label: 'Days' },
  { key: 'all', label: 'All' }
];

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function UpdateLessonModal({
  isOpen,
  onOpenChange,
  onClose,
  eclassId,
  lessonUpdate,
  onEdit
}: Props) {
  const [startDate, setStartDate] = useState<string>(''); 
  const [endDate, setEndDate] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState<{
    startDate: string;
    endDate: string;
    // endDate: string;
  }>({
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    if (lessonUpdate) {
      const startDateTime = new Date(lessonUpdate.startDate);
      const endDateTime = new Date(lessonUpdate.endDate);
  
      // Format date: YYYY-MM-DD
      setStartDate(startDateTime.toISOString().split('T')[0]);
      setEndDate(endDateTime.toISOString().split('T')[0]);
  
      // Format time: HH:mm
      setStartTime(startDateTime.toLocaleTimeString('en-GB').slice(0, 5));
      setEndTime(endDateTime.toLocaleTimeString('en-GB').slice(0, 5));
    }
  }, [lessonUpdate]);

  const validateInputs = () => {
    const newErrors = { ...errors };
  
    if (!startDate) {
      newErrors.startDate = 'Start date is required';
    } else {
      const selectedDate = new Date(`${startDate}T00:00:00`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
  
      if (selectedDate < today) {
        newErrors.startDate = 'Start date must be today or later';
      } else {
        newErrors.startDate = '';
      }
    }
  
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

  const handleSubmit = async () => {
    if (validateInputs()) {
      try {
        setIsSubmitting(true);
        const data: ReScheduleLessonDto = {
          classId: eclassId,
          lessonId: lessonUpdate!.id,
          startDate: new Date(`${startDate}T${startTime}:00`), // Chuyển đổi thành Date
          endDate: new Date(`${endDate}T${endTime}:00`)       // Chuyển đổi thành Date    
        };
  
        console.log('🚀 ~ handleSubmit ~ data:', data);
        const result = await editReschedule(data);
        
        if (result) {
          handleClose();
          if (onEdit) {
            onEdit();
          }
          toast.success('Lesson rescheduled successfully!');
        }
      } catch (error: any) {
        console.error('🚫 ~ onSubmit ~ Error:', error);
        toast.error(
          error.response?.data?.message ||
          'Failed to reschedule lesson. Please try again.'
        );
      } finally {
        setIsSubmitting(false);
      }
    } else {
      console.log('Form has errors. Fix them to proceed.');
    }
  };

  const handleClose = () => {
    setStartDate('');
    setEndDate('');
    setStartTime('');
    setEndTime('');
    setErrors({
      startDate: '',
      endDate: ''
    });
    onClose();
  };

  const renderError = (field: keyof typeof errors) =>
    errors[field] && (
      <span className="absolute bottom-[-20px] left-2 h-4 min-w-max text-sm text-danger">
        {errors[field]}
      </span>
    );

  const size = '3xl';
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
        <ModalHeader className="w-full items-center rounded-t-xl border">
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
            <div className="text-lg font-semibold">Update date calendar</div>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-7">
            {/* Start Date */}
            <div className="flex flex-row">
              <div className="basis-[30%]">
                <span className="text-sm font-medium text-black">
                  Start Date<span className="text-danger">*</span>
                </span>
              </div>
              <div className="relative flex basis-[70%] gap-8">
                <input
                  type="date"
                  className="w-full rounded-lg"
                  value={startDate}
                  
                  onChange={(e) => setStartDate(e.target.value)}
                />
                {renderError('startDate')}
                <div className="flex w-1/3 flex-row">
                  <div className="relative w-32">
                    <label
                      htmlFor="start-time"
                      className="absolute left-2 top-0 -translate-y-1/2 bg-white px-1 text-xs text-gray-500"
                    >
                      From
                    </label>
                    <input
                      id="start-time"
                      type="time"
                      className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                      value={startTime}
                      // readOnly
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* End Date */}
            <div className="flex flex-row">
              <div className="basis-[30%]">
                <span className="text-sm font-medium text-black">
                  End Date<span className="text-danger">*</span>
                </span>
              </div>
              <div className="relative flex basis-[70%] gap-8">
                <input
                  type="date"
                  className="w-full rounded-lg"
                  value={endDate}
                  // readOnly
                  onChange={(e) => setEndDate(e.target.value)}
                />
                {renderError('endDate')}
                <div className="flex w-1/3 flex-row">
                  <div className="relative w-32">
                    <label
                      htmlFor="end-time"
                      className="absolute left-2 top-0 -translate-y-1/2 bg-white px-1 text-xs text-gray-500"
                    >
                      To
                    </label>
                    <input
                      id="end-time"
                      type="time"
                      className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                      value={endTime}
                      // readOnly
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                  </div>
                </div>
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
              {isSubmitting ? 'Submitting...' : 'Update'}
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
