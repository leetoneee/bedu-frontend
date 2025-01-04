'use client';

import React, { useState } from 'react';
import { classNames } from '@/components';
import { LockClosedIcon } from '@heroicons/react/24/outline';

const ChangePass = () => {
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPass, setConfirmPass] = useState<string>('');

  const [errors, setErrors] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPass: ''
  });

  const validateInputs = () => {
    const newErrors: typeof errors = {
      oldPassword: oldPassword.trim() === '' ? 'Old password is required' : '',
      newPassword:
        newPassword.length >= 6
          ? ''
          : 'New password must be at least 6 characters',
      confirmPass: confirmPass === newPassword ? '' : 'Passwords do not match'
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
        Change password
      </span>
      <div className="my-2 flex w-full max-w-96 flex-col gap-7">
        {/* Password & Confirm */}
        <div className="flex w-full flex-col gap-2">
          <span className="text-xl font-normal text-black">
            Password<span className="text-danger">*</span>
          </span>
          <div className="relative">
            <div className="relative">
              <input
                type="password"
                className={classNames(
                  'h-16 w-full rounded-[10px] border border-outline bg-b-primary p-5 text-2xl sm:h-12 sm:text-xl',
                  !oldPassword ? 'pl-14' : ''
                )}
                placeholder=""
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              {!oldPassword && (
                <span className="absolute left-5 top-1/2 -translate-y-1/2 transform text-2xl text-outline sm:text-xl">
                  <LockClosedIcon className="size-6 text-black/35" />
                </span>
              )}
            </div>
            {renderError('oldPassword')}
          </div>
        </div>
        <div className="flex w-full flex-col gap-2">
          <span className="text-xl font-normal text-black">
            New password<span className="text-danger">*</span>
          </span>
          <div className="relative">
            <div className="relative">
              <input
                type="password"
                className={classNames(
                  'h-16 w-full rounded-[10px] border border-outline bg-b-primary p-5 text-2xl sm:h-12 sm:text-xl',
                  !newPassword ? 'pl-14' : ''
                )}
                placeholder=""
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              {!newPassword && (
                <span className="absolute left-5 top-1/2 -translate-y-1/2 transform text-2xl text-outline sm:text-xl">
                  <LockClosedIcon className="size-6 text-black/35" />
                </span>
              )}
            </div>
            {renderError('newPassword')}
          </div>
        </div>
        <div className="flex w-full flex-col gap-2">
          <span className="text-xl font-normal text-black">
            Confirm new password
          </span>
          <div className="relative">
            <div className="relative">
              <input
                type="password"
                className={classNames(
                  'h-16 w-full rounded-[10px] border border-outline bg-b-primary p-5 text-2xl sm:h-12 sm:text-xl',
                  !confirmPass ? 'pl-14' : ''
                )}
                placeholder=""
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
              />
              {!confirmPass && (
                <span className="absolute left-5 top-1/2 -translate-y-1/2 transform text-2xl text-outline sm:text-xl">
                  <LockClosedIcon className="size-6 text-black/35" />
                </span>
              )}
            </div>
            {renderError('confirmPass')}
          </div>
        </div>
      </div>
      <button
        className="mt-4 h-16 w-96 rounded-md bg-button-si hover:brightness-110 sm:h-12"
        onClick={onSubmit}
      >
        <span className="text-2xl font-medium text-outline-focus">Update</span>
      </button>
    </div>
  );
};

export default ChangePass;
