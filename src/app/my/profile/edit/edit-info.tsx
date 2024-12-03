'use client';

import { classNames } from '@/components';
import { UserIcon } from '@heroicons/react/24/outline';
import { Select, Selection, SelectItem } from '@nextui-org/react';
import React, { useState } from 'react';

const genderItems = [{ label: 'None' }, { label: 'Male' }, { label: 'Female' }];
const EditInfo = () => {
  const [name, setName] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');
  const [gender, setGender] = useState<Selection>(new Set(['None']));

  const [errors, setErrors] = useState({
    name: '',
    birthday: ''
  });

  const validateInputs = () => {
    const today = new Date();
    const birthDate = new Date(birthday);
    // Kiểm tra đủ tuổi
    const year = 5;
    const isValidAge =
      today.getFullYear() - birthDate.getFullYear() > year ||
      (today.getFullYear() - birthDate.getFullYear() === year &&
        today.getMonth() > birthDate.getMonth()) ||
      (today.getFullYear() - birthDate.getFullYear() === year &&
        today.getMonth() === birthDate.getMonth() &&
        today.getDate() >= birthDate.getDate());

    const newErrors: typeof errors = {
      name: name.trim() === '' ? 'Full name is required' : '',
      birthday:
        birthday.trim() === ''
          ? 'Birthday is required'
          : !isValidAge
            ? 'Birthday must be at least 5 years ago'
            : ''
    };

    setErrors(newErrors);

    // Check if any field has an error
    return Object.values(newErrors).every((error) => error === '');
  };

  const onSubmit = async () => {
    if (validateInputs()) {
      console.log('Form is valid. Submitting...');
      // Handle form submission logic here
    } else {
      console.log('Form has errors. Fix them to proceed.');
    }
  };

  const renderError = (field: keyof typeof errors) =>
    errors[field] && (
      <span className="absolute bottom-[-20px] left-2 h-4 text-sm text-danger">
        {errors[field]}
      </span>
    );

  return (
    <div className="flex w-full flex-col rounded-[4px] border border-outline bg-highlight p-6">
      <span className="text-2xl font-extrabold text-on-surface">
        Edit information
      </span>
      <div className="my-2 flex w-full max-w-96 flex-col gap-7">
        {/* Full name */}
        <div className="flex w-full flex-col gap-2">
          <span className="text-xl font-normal text-black">
            Full name<span className="text-danger">*</span>
          </span>
          <div className="relative">
            <div className="relative">
              <input
                type="text"
                className={classNames(
                  'h-16 w-full rounded-[10px] border border-outline bg-b-primary p-5 text-2xl sm:h-12 sm:text-xl',
                  !name ? 'pl-14' : ''
                )}
                placeholder="Le Toan"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {!name && (
                <span className="absolute left-5 top-1/2 -translate-y-1/2 transform text-2xl text-outline sm:text-xl">
                  <UserIcon className="size-6 text-black/35" />
                </span>
              )}
            </div>
            {renderError('name')}
          </div>
        </div>
        {/* Birthday */}
        <div className="flex w-full flex-col gap-2">
          <span className="text-xl font-normal text-black">Birthday</span>
          <div className="relative">
            <div className="relative">
              <input
                type="date"
                className={classNames(
                  'h-16 w-full rounded-[10px] border border-outline bg-b-primary p-5 text-2xl sm:h-12 sm:text-xl'
                )}
                placeholder="Le Toan"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </div>
            {renderError('birthday')}
          </div>
        </div>
        {/* Gender */}
        <div className="flex w-full flex-col gap-2">
          <span className="text-xl font-normal text-black">Gender</span>
          <div className="relative">
            <div className="relative">
              <Select
                variant="bordered"
                placeholder="--Gender--"
                selectedKeys={gender}
                className="w-96 bg-b-primary"
                onSelectionChange={setGender}
                size="lg"
              >
                {genderItems.map((position) => (
                  <SelectItem key={position.label}>{position.label}</SelectItem>
                ))}
              </Select>
            </div>
            {/* {renderError('name')} */}
          </div>
        </div>
        {/* Email */}
        <div className="flex w-full flex-col gap-2">
          <span className="text-xl font-normal text-black">Email</span>
          <div className="flex w-full flex-row items-center justify-between">
            buoitiu@email.com{' '}
            <span className="text-danger hover:cursor-pointer hover:underline">
              (Update)
            </span>
          </div>
        </div>
        {/* Phone */}
        <div className="flex w-full flex-col gap-2">
          <span className="text-xl font-normal text-black">Phone number</span>
          <div className="flex w-full flex-row items-center justify-between">
            0123456789{' '}
            <span className="text-danger hover:cursor-pointer hover:underline">
              (Update)
            </span>
          </div>
        </div>
      </div>
      <button
        className="mt-4 h-16 w-96 rounded-md bg-button-si sm:h-12 hover:brightness-110"
        onClick={onSubmit}
      >
        <span className="text-2xl font-medium text-outline-focus">Update</span>
      </button>
    </div>
  );
};

export default EditInfo;
