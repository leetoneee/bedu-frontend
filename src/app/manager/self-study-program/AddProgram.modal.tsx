'use client';

import { useRef, useState } from 'react';
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
  Button
} from '@nextui-org/react';
import { InputFile } from '@/components';
import { toast } from 'react-toastify';
import { createProgram, CreateProgramDto } from '@/services/programs.service';
import { InputFileHandle } from '@/types';

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  onClose: () => void;
  onCreated?: () => void; // Callback báo cho parent biết đã tạo xong
};

const programTypes = [
  { key: 'ielts', label: 'IELTS' },
  { key: 'toeic', label: 'TOEIC' },
  { key: 'toefl', label: 'TOEFL' }
];

export default function AddProgramModal({
  isOpen,
  onOpenChange,
  onClose,
  onCreated
}: Props) {
  const inputFileRef = useRef<InputFileHandle | null>(null);

  const [name, setName] = useState<string>('');
  // const [code, setCode] = useState<string>('');
  // const [price, setPrice] = useState<string>();
  const [sessionQuantity, setSessionQuantity] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [type, setType] = useState<Selection>(new Set([]));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState<{
    name: string;
    // code: string;
    type: string;
    sessionQuantity: string;
    description: string;
  }>({
    name: '',
    // code: '',
    type: '',
    sessionQuantity: '',
    description: ''
  });

  const validateInputs = () => {
    const newErrors = { ...errors };

    newErrors.name = name.trim() === '' ? 'Program name is required' : '';
    // newErrors.code = code.trim() === '' ? 'Program code is required' : '';
    newErrors.type =
      selectedType.trim() === '' ? 'Program type is required' : '';

    // Validate sessionQuantity as a positive integer
    if (!sessionQuantity) {
      newErrors.sessionQuantity = 'Session quantity is required';
    } else if (
      isNaN(Number(sessionQuantity)) ||
      !Number.isInteger(Number(sessionQuantity)) ||
      Number(sessionQuantity) <= 0
    ) {
      newErrors.sessionQuantity = 'Session quantity must be a positive integer';
    } else {
      newErrors.sessionQuantity = '';
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

  const handleUploadFile = async () => {
    try {
      if (!inputFileRef.current) throw new Error('File input is not available');
      const url = await inputFileRef.current.upload();
      if (!url) throw new Error('File upload failed');
      return url;
    } catch (error) {
      console.error('🚫 ~ handleUploadFile ~ Error:', error);
      toast.error('Failed to upload file. Please try again.');
      return null;
    }
  };

  const handleSubmit = async () => {
    if (validateInputs()) {
      console.log('Form is valid. Submitting...');
      // Handle form submission logic here
      try {
        setIsSubmitting(true); // Bắt đầu gửi yêu cầu
        // Upload file
        const url = await handleUploadFile();
        if (!url) throw new Error('File upload failed');
        // Gọi API và đợi kết quả
        const data: CreateProgramDto = {
          type: selectedType.toLowerCase(),
          // code: code,
          title: name,
          description: description,
          avatar: url,
          sessionQuantity: Number(sessionQuantity),
          courseId: []
        };
        const result = await createProgram(data);
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
            'Failed to create program. Please try again.'
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
    // setCode('');
    // setPrice('');
    setSessionQuantity('');
    setType(new Set([]));
    setDescription('');
    setIsPublic(false);
    setErrors({
      name: '',
      // code: '',
      type: '',
      sessionQuantity: '',
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
            <div className="text-lg font-semibold">Add new program</div>
            <div className="text-wrap text-sm font-normal">
              Create a new program to add available courses
            </div>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-7">
            {/* Program name */}
            <div className="flex flex-row">
              <div className="basis-[30%]">
                <span className="text-sm font-medium text-black">
                  Program name<span className="text-danger">*</span>
                </span>
              </div>
              <div className="relative basis-[70%]">
                <input
                  type="text"
                  className="w-full rounded-lg"
                  placeholder="Enter program name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {renderError('name')}
              </div>
            </div>
            {/* Program code */}
            {/* <div className="flex flex-row">
              <div className="basis-[30%]">
                <span className="text-sm font-medium text-black">
                  Program code<span className="text-danger">*</span>
                </span>
              </div>
              <div className="relative flex basis-[70%] gap-8">
                <input
                  type="text"
                  className="w-1/2 rounded-lg"
                  placeholder="Enter program code..."
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
                    {programTypes.map((type) => (
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
                  {programTypes.map((type) => (
                    <SelectItem key={type.key}>{type.label}</SelectItem>
                  ))}
                </Select>
                {renderError('type')}
              </div>
            </div>

            <Divider />

            {/* Program image  */}
            <div className="flex flex-row">
              <div className="basis-[30%]">
                <span className="text-sm font-medium text-black">
                  Program image<span className="text-danger">*</span>
                </span>
              </div>
              <div className="relative basis-[70%]">
                <InputFile ref={inputFileRef} />
                {/* {renderError('name')} */}
              </div>
            </div>

            <Divider />

            {/* Session quantity & public */}
            <div className="flex flex-row">
              <div className="basis-[30%]">
                <span className="text-sm font-medium text-black">
                  Session quantity<span className="text-danger">*</span>
                </span>
              </div>
              <div className="relative flex basis-[70%] gap-8">
                <input
                  type="text"
                  className="w-2/3 rounded-lg"
                  placeholder="Enter session quantity..."
                  value={sessionQuantity}
                  onChange={(e) => setSessionQuantity(e.target.value)}
                />
                {renderError('sessionQuantity')}
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
                  placeholder="Enter program description..."
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
