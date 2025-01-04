import {
  Button,
  Checkbox,
  Select,
  Selection,
  SelectItem
} from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from '@/libs/axiosInstance';
import useSWR from 'swr';
import { Lesson } from '@/types/lesson.type';
import { editLesson, UpdateLessonDto } from '@/services/lessons.service';
import { toast } from 'react-toastify';

type Props = {
  lessonId: string;
};

const lessonTypes = [
  { key: 'live', label: 'LIVE' },
  { key: 'online', label: 'ONLINE' }
];

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const InformationTab = ({ lessonId }: Props) => {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [name, setName] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [type, setType] = useState<Selection>(new Set([]));
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

  const {
    data,
    error,
    mutate: refreshEndpoint
  } = useSWR(`/lessons/item/${lessonId}`, fetcher);

  useEffect(() => {
    if (data && data.metadata) {
      setLesson(data.metadata);
    }
  }, [data]);

  useEffect(() => {
    if (lesson) {
      setName(lesson.title);
      setIsPublic(lesson.isActive);
      setUrl(lesson.videoUrl);
      setType(new Set([`${lesson.type}`]));
    }
  }, [lesson]);

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
      // const today = new Date();

      const data: UpdateLessonDto = {
        title: name,
        videoUrl: url,
        isActive: isPublic
      };
      try {
        setIsSubmitting(true); // Bắt đầu gửi yêu cầu
        // Gọi API và đợi kết quả
        if (!lesson) return;
        const result = await editLesson(lesson.id, data);
        if (result) {
          toast.success('Lesson updated successfully');
          refreshEndpoint();
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

  const renderError = (field: keyof typeof errors) =>
    errors[field] && (
      <span className="absolute bottom-[-20px] left-2 h-4 min-w-max text-sm text-danger">
        {errors[field]}
      </span>
    );

  if (error) {
    return <div>Failed to load lesson</div>;
  }
  
  return (
    <div className="flex h-full w-full flex-col gap-2 rounded rounded-t-none border-on-surface/20 bg-white p-5 shadow-sm">
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
                  {lessonTypes.map((type) => (
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
                  placeholder="Enter video URL..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                {renderError('videoUrl')}
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

export default InformationTab;
