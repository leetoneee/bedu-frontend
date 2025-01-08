'use client';

import * as React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent
} from '@nextui-org/react';
import { StaticQuestion } from '@/components';

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  onClose: () => void;
  list: string[];
  title: string;
};

export default function ViewListModal({
  isOpen,
  onOpenChange,
  onClose,
  list,
  title
}: Props) {
  return (
    <Modal
      size={'2xl'}
      isOpen={isOpen}
      radius="lg"
      onOpenChange={onOpenChange}
      onClose={onClose}
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
            <div className="text-lg font-semibold">{title}</div>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-7">
            <table className="min-w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border border-gray-200 px-4 py-2">No.</th>
                  <th className="border border-gray-200 px-4 py-2">Student</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list.map((item, index) => (
                    <tr key={index} className="bg-white">
                      <td className="border border-gray-200 px-4 py-2 text-center">
                        {index + 1}
                      </td>
                      <td className="flex flex-nowrap items-center justify-between gap-1 text-nowrap border border-gray-200 px-4 py-2 text-left">
                        {item}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
