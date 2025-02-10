'use client';

import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  SelectItem,
  Select,
  Selection
} from '@nextui-org/react';
import React, { Fragment, useState } from 'react';
import { UploadDocumentDto } from '@/types/document.type';
import { uploadDocument } from '@/services/documents.service';
import { toast } from 'react-toastify';

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  lessonId: string;
  onOpenChange: () => void;
  onClose: () => void;
  onCreated?: () => void; // Callback báo cho parent biết đã tạo xong
};

const documentTypes = [
  { key: 'word', label: 'Word' },
  { key: 'excel', label: 'Excel' },
  { key: 'pptx', label: 'Power-Point' },
  { key: 'pdf', label: 'PDF' },
  { key: 'other', label: 'Other' }
];

const AddDocumentModal = ({
  isOpen,
  onOpen,
  lessonId,
  onOpenChange,
  onClose,
  onCreated
}: Props) => {
  //
  const [documentType, setDocumentType] = useState<Selection>(new Set([]));
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [files, setFiles] = useState<File>();
  const [attach, setAttach] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedType = React.useMemo(
    () => Array.from(documentType).join(', ').replaceAll('_', ' '),
    [documentType]
  );

  const handleClose = () => {
    setDocumentType(new Set([]));
    setTitle('');
    setContent('');
    //Đóng modal
    onClose();
  };

  const handleSubmit = async () => {
    if (!files) {
      toast.error('Please select a file before submitting.');
      return; // Ngăn không cho tiếp tục nếu files là null
    }

    console.log('file: ', files)
    let uploadFiles :File[] = [files];

    const data: UploadDocumentDto = {
      documentType: selectedType,
      title: title,
      content: content,
      lessonId: Number(lessonId)
    };

    console.log('🚀 ~ Sending data to server:', data); // Kiểm tra dữ liệu

    try {
      setIsSubmitting(true);
      const result = await uploadDocument(data, uploadFiles);
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
          'Failed to upload document. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <ModalHeader>
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
            <div className="text-lg font-semibold">Add document to lesson</div>
            <div className="text-wrap text-sm font-normal">
              By adding a document to a lesson, students can preview the lesson
              content closely.
            </div>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-7">
            {/**Document type */}
            <div className="flex flex-row">
              <div className="basis-[30%]">
                <span className="text-sm font-medium text-on-surface">
                  Document type <span className="text-danger">*</span>
                </span>
              </div>
              <div className="relative flex basis-[70%] gap-8">
                <Select
                  className="text-on-surface"
                  placeholder="Select an document type"
                  selectedKeys={documentType}
                  variant="bordered"
                  onSelectionChange={setDocumentType}
                >
                  {documentTypes.map((documentType) => (
                    <SelectItem key={documentType.key}>
                      {documentType.label}
                    </SelectItem>
                  ))}
                </Select>
                {/* {renderError('questionType')} */}
              </div>
            </div>
            {/**Title */}
            <div className="flex flex-row">
              <div className="basis-[30%]">
                <span className="text-sm font-medium text-on-surface">
                  Title <span className="text-danger">*</span>
                </span>
              </div>
              <div className="relative flex basis-[70%] gap-8">
                <input
                  type="text"
                  className="w-full rounded-lg text-on-surface"
                  placeholder="Enter title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {/* {renderError('totalPoints')} */}
              </div>
            </div>
            {/**Content */}
            <div className="flex flex-row">
              <div className="basis-[30%]">
                <span className="text-sm font-medium text-on-surface">
                  Content <span className="text-danger">*</span>
                </span>
              </div>
              <div className="relative flex basis-[70%] gap-8">
                <input
                  type="text"
                  className="w-full rounded-lg text-on-surface"
                  placeholder="Enter Content..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                {/* {renderError('totalPoints')} */}
              </div>
            </div>
            {/**File */}
            <div className="flex flex-row">
              <div className="basis-[30%]">
                <span className="text-sm font-medium text-on-surface">
                  File <span className="text-danger">*</span>
                </span>
              </div>
              <div className="flex basis-[70%] flex-row">
                <input
                  type="file"
                  name="file"
                  onChange={(e) => setFiles(e.target.files?.[0])}
                />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex w-full flex-row justify-between space-x-6">
            <Button
              onPress={handleClose}
              className="w-full rounded-lg border border-outline bg-white py-2 text-[16px] font-medium text-black hover:bg-highlight"
            >
              Cancel
            </Button>
            <Button
              color="primary"
              onPress={handleSubmit}
              className="w-full rounded-lg border border-outline bg-on-primary py-2 text-[16px] font-medium text-white"
            >
              {isSubmitting ? 'Submitting...' : 'Create'}
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddDocumentModal;
