import React, { useEffect, useState } from 'react';
import axios from '@/libs/axiosInstance';
import { Button, useDisclosure } from '@nextui-org/react';
import { PlusIcon } from '@heroicons/react/24/outline';
import AddDocumentModal from '@/app/manager/courses/[courseId]/[lessonId]/Document.Tab/AddDocument.modal';
import { toast } from 'react-toastify';
import useSWR from 'swr';

type Document = {
  title: string;
  url: string;
};

type Props = {
  lessonId: string;
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const DocumentTab = ({ lessonId }: Props) => {
  const [document, setDocument] = useState<Document>();

  const {
    data: documentData,
    // error: errorExam,
    mutate: refreshEndpoint
  } = useSWR(`/lessons/list-document/${lessonId}`, fetcher);

  useEffect(() => {
    if (documentData?.metadata) {
      console.log('documentData.metadata: ', documentData.metadata);
      setDocument(documentData.metadata[0] as Document);
    }
  }, [documentData]);

  const handleDownload = (fileUrl: string) => {
    window.open(fileUrl, '_blank'); // Mở URL trong một tab mới
  };

  return (
    <div className="flex h-full w-full flex-col gap-2 rounded rounded-t-none border-on-surface/20 bg-white p-5 shadow-sm">
      <div className="flex w-full flex-col">
        <div className="w-full p-2">
          {document && (
            <div className="flex flex-row rounded p-2 shadow-lg justify-between border-2 border-outline">
              <div className="space-y-4 p-6">
                <span className="mb-2 text-xl font-bold text-on-surface">
                  {document?.title}
                </span>
              </div>
              <div className='flex gap-4'>
                <button
                  className="rounded bg-green-500 py-1 px-2 font-bold text-white hover:bg-green-700"
                  onClick={() => handleDownload(document?.url)}
                >
                  Download
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentTab;
