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

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  onClose: () => void;
  eclassId: number;
  eclassName: string;
  eclassType: string;
  onCreated?: () => void; // Callback báo cho parent biết đã tạo xong
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

export default function AddLessonModal({
  isOpen,
  onOpenChange,
  onClose,
  eclassId,
  eclassName,
  eclassType,
  onCreated
}: Props) {
  // const [urls, setUrls] = useState<{
  //   url: string;
  //   thumbnailUrl: string | null;
  // }>();

  const [name, setName] = useState<string>('');
  // const [url, setUrl] = useState<string>('');
  const [type, setType] = useState<Selection>(new Set([`${eclassType}`]));
  const [teacher, setTeacher] = useState<Selection>(new Set([]));
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [endBy, setEndBy] = useState<Selection>(new Set(['endafter']));
  const [lessonQuantity, setLessonQuantity] = useState<string>('');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [cycle, setCycle] = useState<Selection>(new Set([]));
  const [listTeacher, setListTeacher] = useState<User[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState<{
    name: string;
    type: string;
    teacher: string;
    startDate: string;
    endBy: string;
    // endDate: string;
    lessonQuantity: string;
    startTime: string;
    endTime: string;
    cycle: string;
  }>({
    name: '',
    type: '',
    teacher: '',
    startDate: '',
    endBy: '',
    // endDate: '',
    lessonQuantity: '',
    startTime: '',
    endTime: '',
    cycle: ''
  });

  const selectedType = React.useMemo(
    () => Array.from(type).join(', ').replaceAll('_', ' '),
    [type]
  );

  const selectedTeacher = React.useMemo(
    () => Array.from(teacher).join(', '),
    [teacher]
  );

  const selectedEndBy = React.useMemo(
    () => Array.from(endBy).join(', ').replaceAll('_', ' '),
    [endBy]
  );

  const selectedCycle = React.useMemo(
    () => Array.from(cycle).join(', ').replaceAll('_', ' '),
    [cycle]
  );

  const {
    data: listTeacherData,
    isLoading,
    // error: classError,
    // mutate: refreshEndpoint
  } = useSWR(`/users/groupUser/teacher?page=1&limit=10`, fetcher);

  useEffect(() => {
    if (eclassId && eclassName && eclassType) {
      setName(eclassName);
      setType(new Set([`${eclassType}`]));
    }
  }, [eclassId]);

  useEffect(() => {
    if (selectedCycle === 'all') {
      setSelectedDays(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
    } else if (selectedCycle === 'days') {
      setSelectedDays([]);
    }
  }, [selectedCycle]);

  useEffect(() => {
    if (listTeacherData) {
      setListTeacher(listTeacherData.metadata.users);
    }
  }, [listTeacherData]);

  const validateInputs = () => {
    const newErrors = { ...errors };

    // Validate name
    // newErrors.name = name.trim() === '' ? 'Lesson name is required' : '';

    // Validate type
    // newErrors.type =
    //   selectedType.trim() === '' ? 'Lesson type is required' : '';

    // Validate teacher
    newErrors.teacher =
      selectedTeacher.trim() === '' ? 'Teacher is required' : '';

    // Validate startDate
    if (!startDate) {
      newErrors.startDate = 'Start date is required';
    } else {
      const selectedDate = new Date(startDate);
      const today = new Date();

      // Remove the time part of the date for comparison
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.startDate = 'Start date must be today or later';
      } else {
        newErrors.startDate = '';
      }
    }

    // Validate endDate
    // if (!endDate) {
    //   newErrors.endDate = 'End date is required';
    // } else {
    //   const selectedEndDate = new Date(endDate);
    //   const selectedStartDate = new Date(startDate);

    //   if (selectedEndDate <= selectedStartDate) {
    //     newErrors.endDate = 'End date must be after the start date';
    //   } else {
    //     newErrors.endDate = '';
    //   }
    // }

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

    // Validate ending condition
    newErrors.endBy =
      selectedEndBy.trim() === '' ? 'Ending condition is required' : '';

    // Validate start time
    if (!startTime) {
      newErrors.startTime = 'Start time is required';
    } else {
      newErrors.startTime = '';
    }

    // Validate end time
    if (!endTime) {
      newErrors.endTime = 'End time is required';
    } else if (startTime && endTime <= startTime) {
      newErrors.endTime = 'End time must be after the start time';
    } else {
      newErrors.endTime = '';
    }

    // Validate cycle
    newErrors.cycle = selectedCycle.trim() === '' ? 'Cycle is required' : '';

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === '');
  };

  const handleSubmit = async () => {
    if (validateInputs()) {
      console.log('Form is valid. Submitting...');
      // Handle form submission logic here
      // const today = new Date();

      try {
        setIsSubmitting(true); // Bắt đầu gửi yêu cầu
        // Gọi API và đợi kết quả
        const data: CreateRecurringLessonDto = {
          classId: eclassId,
          teacherId: Number(Array.from(teacher)[0]),
          summary: eclassName,
          description: `This is the online class ${eclassName}`,
          startDate: startDate,
          startTime: startTime,
          endTime: endTime,
          selectedDays: selectedDays,
          lessonQuantity: Number(lessonQuantity)
        };
        console.log('🚀 ~ handleSubmit ~ data:', data);
        const result = await createRecurringLesson(data);
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
            'Failed to create lessons. Please try again.'
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
    setTeacher(new Set([]));
    setStartDate('');
    setEndDate('');
    setEndBy(new Set(['endafter']));
    setLessonQuantity('');
    setSelectedDays([]);
    setStartTime('');
    setEndTime('');
    setCycle(new Set([]));
    // setUrl('');
    // setIsPublic(false);
    setErrors({
      name: '',
      type: '',
      teacher: '',
      startDate: '',
      endBy: '',
      // endDate: '',
      lessonQuantity: '',
      startTime: '',
      endTime: '',
      cycle: ''
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

  const getSortedDays = (selectedDays: string[]): string[] => {
    const dayOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return selectedDays.sort(
      (a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b)
    );
  };

  const handleCheckboxChange = (day: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedDays((prev) => getSortedDays([...prev, day]));
    } else {
      setSelectedDays((prev) => getSortedDays(prev.filter((d) => d !== day)));
    }
  };

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
            <div className="text-lg font-semibold">Add teacher calendar</div>
            <div className="text-wrap text-sm font-normal">
              Schedule and manage class lessons with ease
            </div>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-7">
            {/* Class name */}
            <div className="flex flex-row">
              <div className="basis-[30%]">
                <span className="text-sm font-medium text-black">
                  Class name<span className="text-danger">*</span>
                </span>
              </div>
              <div className="relative basis-[70%]">
                <input
                  type="text"
                  className="w-full rounded-lg bg-default"
                  value={eclassName}
                  readOnly
                />
                {renderError('name')}
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
                  color="default"
                  variant="bordered"
                  // onSelectionChange={setType}
                >
                  {courseTypes.map((type) => (
                    <SelectItem key={type.key}>{type.label}</SelectItem>
                  ))}
                </Select>
                {renderError('type')}
              </div>
            </div>

            {/* Teacher */}
            <div className="flex flex-row">
              <div className="basis-[30%]">
                <span className="text-sm font-medium text-black">
                  Teacher<span className="text-danger">*</span>
                </span>
              </div>
              <div className="relative flex basis-[70%] gap-8">
                <Select
                  className="max-w-xs"
                  isLoading={isLoading}
                  selectedKeys={teacher}
                  items={listTeacher || []}
                  placeholder="Select a Teacher"
                  disallowEmptySelection
                  selectionMode="single"
                  onSelectionChange={setTeacher}
                >
                  {(item: User) => (
                    <SelectItem key={item.id} className="capitalize">
                      {item.name}
                    </SelectItem>
                  )}
                </Select>
                {renderError('type')}
              </div>
            </div>

            <Divider />

            {/* Start date */}
            <div className="flex flex-row">
              <div className="basis-[30%]">
                <span className="text-sm font-medium text-black">
                  Start date<span className="text-danger">*</span>
                </span>
              </div>
              <div className="relative flex basis-[70%] gap-8">
                <input
                  type="date"
                  className="w-1/2 rounded-lg"
                  // placeholder="Enter class code..."
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                {renderError('startDate')}
              </div>
            </div>

            {/* EndBy & lessonQuantity */}
            <div className="flex flex-row">
              <div className="basis-[30%]">
                <span className="text-sm font-medium text-black">
                  Ending condition<span className="text-danger">*</span>
                </span>
              </div>
              <div className="relative flex basis-[70%] gap-8">
                <Select
                  className="w-1/3"
                  placeholder="Select Ending Condition"
                  disallowEmptySelection
                  selectedKeys={endBy}
                  color="default"
                  variant="bordered"
                  onSelectionChange={setEndBy}
                >
                  {endBys.map((type) => (
                    <SelectItem key={type.key}>{type.label}</SelectItem>
                  ))}
                </Select>
                {renderError('endBy')}

                <div className="relative flex w-2/3 flex-row gap-4">
                  <span className="text-sm font-medium text-black">
                    {Array.from(endBy).includes('to')
                      ? 'End date'
                      : 'Number of lessons'}
                    <span className="text-danger">*</span>
                  </span>
                  {Array.from(endBy).includes('to') ? (
                    <>
                      <input
                        type="date"
                        className="w-full rounded-lg"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                      {/* {renderError('studyForm')} */}
                    </>
                  ) : (
                    <>
                      <input
                        type="text"
                        className="w-full rounded-lg"
                        value={lessonQuantity}
                        onChange={(e) => setLessonQuantity(e.target.value)}
                      />
                      {renderError('lessonQuantity')}
                    </>
                  )}
                </div>
              </div>
            </div>

            <Divider />

            {/* StartTime & EndTime & Cycle */}
            <div className="flex flex-row gap-8">
              <div className="relative flex basis-[30%] gap-4">
                <span className="w-1/2 text-nowrap text-sm font-medium text-black">
                  Start time<span className="text-danger">*</span>
                </span>
                <input
                  type="time"
                  className="w-38 rounded-lg"
                  // placeholder="Enter class code..."
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
                {renderError('startTime')}
              </div>
              <div className="relative flex basis-[30%] gap-4">
                <span className="text-nowrap text-sm font-medium text-black">
                  End time<span className="text-danger">*</span>
                </span>
                <input
                  type="time"
                  className="w-30 rounded-lg"
                  // placeholder="Enter class code..."
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
                {renderError('endTime')}
              </div>
              <div className="relative flex basis-[40%] gap-4">
                <span className="text-sm font-medium text-black">
                  Cycle<span className="text-danger">*</span>
                </span>
                <Select
                  className=""
                  placeholder="Select Cycle"
                  disallowEmptySelection
                  selectedKeys={cycle}
                  color="default"
                  variant="bordered"
                  onSelectionChange={setCycle}
                >
                  {cycles.map((type) => (
                    <SelectItem key={type.key}>{type.label}</SelectItem>
                  ))}
                </Select>
                {renderError('cycle')}
              </div>
            </div>

            <Divider />

            {/* Days of the week */}
            {selectedCycle !== '' ? (
              <>
                <div className="flex flex-row justify-center gap-8">
                  {days.map((day) => (
                    <Checkbox
                      key={day}
                      isSelected={selectedDays.includes(day)}
                      onValueChange={(isSelected) =>
                        handleCheckboxChange(day, isSelected)
                      }
                    >
                      {day}
                    </Checkbox>
                  ))}
                </div>
              </>
            ) : null}

            {/* List days */}
            {startTime &&
            endTime &&
            (selectedDays.length > 0 || selectedCycle === 'all') ? (
              <>
                {selectedDays.map((day) => (
                  <React.Fragment key={day}>
                    <div className="flex flex-row items-center justify-center gap-8">
                      <div className="w-32 rounded-lg border border-outline p-2 text-center">
                        <span className="text-sm font-medium text-black">
                          {getFullDayName(day)}
                        </span>
                      </div>
                      <div className="flex flex-row gap-8">
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
                            readOnly
                          />
                        </div>
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
                            readOnly
                          />
                        </div>
                      </div>
                      <Tooltip color="danger" content="Delete" delay={1000}>
                        <span
                          className="cursor-pointer text-lg text-danger active:opacity-50"
                          onClick={() =>
                            setSelectedDays((prev) =>
                              prev.filter((d) => d !== day)
                            )
                          }
                        >
                          <TrashIcon className="size-5" />
                        </span>
                      </Tooltip>
                    </div>
                  </React.Fragment>
                ))}
              </>
            ) : null}
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
