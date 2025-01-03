'use client';

import { useEffect, useState } from 'react';
import { SelectItem, Select, Selection, Button } from '@nextui-org/react';
import { toast } from 'react-toastify';
import { editExam, UpdateExamDto } from '@/services/exam.service';
// import { Exam } from '@/types/exam.type';
import axios from '@/libs/axiosInstance';
import React from 'react';
import useSWR from 'swr';
import Image from 'next/image';

type Props = {
  id: number;
  setIsModalNewTaskOpen?: (isOpen: boolean) => void;
};

const examTypes = [
  { key: 'assignments', label: 'Assignments' },
  { key: 'mid-term', label: 'Mid-Term' },
  { key: 'final-term', label: 'Final-Term' }
];

const scroringTypes = [{ key: 'highest', label: 'Highest score' }];

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const Config = ({ id }: Props) => {
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

  const selectedType = React.useMemo(
    () => Array.from(type).join(', ').replaceAll('_', ' '),
    [type]
  );

  const endpoint = `/exams/item/${id}`;

  const {
    data,
    error,
    isLoading,
    mutate: refreshEndpoint
  } = useSWR(endpoint, fetcher, {
    keepPreviousData: true
  });

  useEffect(() => {
    if (data && data.metadata) {
      setName(data.metadata.title);
      setDuration(`${data.metadata.duration}`);
      setMaxTries(`${data.metadata.maxTries}`);
      setResultTime(`${data.metadata.resultTime}`);
      setDescription(data.metadata.description);
      setType(new Set([`${data.metadata.examType}`]));
    }
  }, [data]);

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
        const result = await editExam(id, data);
        if (result) {
          toast.success('Exam updated successfully.');
          refreshEndpoint(); // Refresh dữ liệu
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

  const renderError = (field: keyof typeof errors) =>
    errors[field] && (
      <span className="absolute bottom-[-20px] left-2 h-4 min-w-max text-sm text-danger">
        {errors[field]}
      </span>
    );

  return (
    <div className="flex h-full w-full flex-col rounded rounded-t-none border-on-surface/20 bg-white p-5 shadow-sm">
      {/* Code ở đây */}
      <div className="flex w-full flex-row gap-2">
        <div className="flex h-full basis-[70%] flex-col gap-2">
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
        </div>
      </div>
      <Button
        className="ml-auto h-14 rounded-xl bg-on-primary text-white"
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
  );
};

export default Config;
