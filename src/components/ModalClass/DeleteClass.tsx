'use client';

import button, { useEffect, useRef, useState } from 'react';
import * as React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  ModalContent
} from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { Input, InputFile, Checkbox } from '@/components';

type DeleteClassModal_Props = {
  onSubmit?: () => void;
};

export default function DeleteClassModal({ onSubmit }: DeleteClassModal_Props) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const handleClose = () => {
    // Đóng modal
    onClose();
  };

  const size: 'xs' = 'xs';
  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button key={size} onPress={() => onOpen()}>
          Open Modal
        </Button>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="h-11 w-11 content-center rounded-full border-5 border-[#FEE4E2] bg-red-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="mx-auto size-6"
                    color="red"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </div>
              </ModalHeader>
              <ModalBody>
                <div className="space-y-2">
                  <div className="text-lg font-semibold">Remove class</div>
                  <div className="text-sm font-normal">
                    Are you sure you want to remove this class? All lessons
                    within it will be permanently deleted. This action cannot be
                    undone.
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="mb-4 flex justify-between space-x-6 py-4">
                <Button
                  onPress={handleClose}
                  className="w-1/2 rounded-lg border border-outline bg-white py-2 text-[16px] font-medium text-black hover:bg-highlight"
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={onSubmit}
                  className="w-1/2 rounded-lg border border-outline bg-error py-2 text-[16px] font-medium text-white"
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
