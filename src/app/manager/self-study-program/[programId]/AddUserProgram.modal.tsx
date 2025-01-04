import { User } from '@/types/user.type';
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner
} from '@nextui-org/react';
import React, { Fragment, useState } from 'react';
// import axios from '@/libs/axiosInstance';
import { toast } from 'react-toastify';
import { findUserByCID } from '@/services/users.service';
import {
  createUserProgram,
  CreateUserProgramDto
} from '@/services/users-programs.service';

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  programId: string;
  onOpenChange: () => void;
  onClose: () => void;
  onCreated?: () => void; // Callback báo cho parent biết đã tạo xong
};

// const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const AddUserProgram = ({
  isOpen,
  onOpenChange,
  onClose,
  programId,
  onCreated
}: Props) => {
  // State
  const [cid, setCID] = useState<string>('');
  const [user, setUser] = useState<User>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{
    cid: string;
  }>({
    cid: ''
  });

  const handleFindUser = async () => {
    if (!cid) {
      setErrors({
        cid: 'CID is required'
      });
      return;
    }

    // Call API
    try {
      setIsLoading(true);
      const result = await findUserByCID(cid);
      if (result && result.metadata) {
        setUser(result.metadata);
        setIsLoading(false);
      } else {
        setErrors({
          cid: 'User not found'
        });
        setUser(undefined);
      }
    } catch (error: any) {
      console.error('🚫 ~ onSubmit ~ Error:', error);
      toast.error(
        error.response?.data?.message ||
          'Failed to find user. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setCID('');
    setUser(undefined);
    setErrors({
      cid: ''
    });
    // Đóng modal
    onClose();
  };

  const handleSubmit = async () => {
    if (!cid && !user) {
      setErrors({
        cid: 'CID is required or user not found'
      });
      return;
    }

    setIsSubmitting(true);
    // Call API
    try {
      if (!user) return;
      const now = new Date();
      const data: CreateUserProgramDto = {
        userId: user.id,
        programId: Number(programId),
        time: now
      };
      const result = await createUserProgram(data);
      if (result) {
        handleClose();
        if (onCreated) {
          onCreated();
        }
      }
    } catch (error: any) {
      console.error('🚫 ~ onSubmit ~ Error:', error);
      toast.error(
        error.response?.data?.message || 'Failed to add user to program.'
      );
    } finally {
      setIsSubmitting(false);
    }

    setIsSubmitting(false);
  };

  const renderError = (field: keyof typeof errors) =>
    errors[field] && (
      <span className="absolute bottom-[-20px] left-2 h-4 min-w-max text-sm text-danger">
        {errors[field]}
      </span>
    );

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
            <div className="text-lg font-semibold">Add user to program</div>
            <div className="text-wrap text-sm font-normal">
              Add user to the program to give them access to the program content
            </div>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-7">
            {/* User CID */}
            <div className="flex flex-row">
              <div className="basis-[30%]">
                <span className="text-sm font-medium text-black">
                  User CID<span className="text-danger">*</span>
                </span>
              </div>
              <div className="relative basis-[70%]">
                <input
                  type="text"
                  className="w-full rounded-lg"
                  placeholder="Find user..."
                  value={cid}
                  onChange={(e) => setCID(e.target.value)}
                  onBlur={() => handleFindUser()}
                  onFocus={() => {
                    setErrors({
                      cid: ''
                    });
                  }}
                />
                {renderError('cid')}
              </div>
            </div>

            <Divider />

            {/* User information */}
            {isLoading && <Spinner />}
            {user && (
              <Fragment>
                <div className="text-lg font-semibold">User information</div>
                <div className="flex flex-col gap-7">
                  <div className="flex flex-row">
                    {/* Name */}
                    <div className="basis-[30%]">
                      <span className="text-sm font-medium text-black">
                        Name
                      </span>
                    </div>
                    <div className="relative basis-[70%]">
                      <input
                        type="text"
                        className="w-full rounded-lg"
                        readOnly
                        value={user.name}
                      />
                    </div>
                  </div>
                  {/* Role */}
                  <div className="flex flex-row">
                    <div className="basis-[30%]">
                      <span className="text-sm font-medium text-black">
                        Role
                      </span>
                    </div>
                    <div className="relative basis-[70%]">
                      <input
                        type="text"
                        className="w-full rounded-lg"
                        readOnly
                        value={user.role?.name}
                      />
                    </div>
                  </div>
                  {/* Email */}
                  <div className="flex flex-row">
                    <div className="basis-[30%]">
                      <span className="text-sm font-medium text-black">
                        Email
                      </span>
                    </div>
                    <div className="relative basis-[70%]">
                      <input
                        type="text"
                        className="w-full rounded-lg"
                        readOnly
                        value={user.email}
                      />
                    </div>
                  </div>
                  {/* Phone */}
                  <div className="flex flex-row">
                    <div className="basis-[30%]">
                      <span className="text-sm font-medium text-black">
                        Phone
                      </span>
                    </div>
                    <div className="relative basis-[70%]">
                      <input
                        type="text"
                        className="w-full rounded-lg"
                        readOnly
                        value={user.phone}
                      />
                    </div>
                  </div>
                </div>
              </Fragment>
            )}
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
              {isSubmitting ? 'Submitting...' : 'Add'}
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddUserProgram;
