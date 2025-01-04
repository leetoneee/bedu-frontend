'use client';

import { classNames } from '@/components';
import { AppContext } from '@/contexts';
import { AuthType } from '@/types';
import { UserIcon } from '@heroicons/react/24/outline';
import { Select, Selection, SelectItem } from '@nextui-org/react';
import React, { useContext, useEffect, useState } from 'react';
import useSWR from 'swr';
import axios from '@/libs/axiosInstance';
import { User } from '@/types/user.type';
import { editUser, UpdateUserDto } from '@/services/users.service';
import { toast } from 'react-toastify';

const genderItems = [
  { key: 'none', label: 'None' },
  { key: 'male', label: 'Male' },
  { key: 'female', label: 'Female' }
];

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const EditInfo = () => {
  const { auth } = useContext(AppContext) as AuthType;
  const [user, setUser] = useState<User>();
  const {
    data,
    // isLoading,
    // error: courseError,
    mutate: refreshEndpoint
  } = useSWR(`/users/item/${auth?.id}`, fetcher);

  useEffect(() => {
    if (data) {
      setUser(data.metadata);
    }
  }, [data]);

  const [name, setName] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');
  const [gender, setGender] = useState<Selection>(new Set([]));
  const [address, setAddress] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const selectedGender = React.useMemo(
    () => Array.from(gender).join(', ').replaceAll('_', ' '),
    [gender]
  );

  useEffect(() => {
    if (user) {
      console.log('🚀 ~ useEffect ~ user:', user);
      setName(user.name);
      const date = new Date(user.birthday);
      setBirthday(date.toISOString().split('T')[0]);
      setGender(new Set([user.gender]));
      setAddress(user.address);
      setEmail(user.email);
      setPhone(user.phone);
    }
  }, [user]);

  const [errors, setErrors] = useState({
    name: '',
    birthday: '',
    address: ''
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
            : '',
      address: address.trim() === '' ? 'Address is required' : ''
    };

    setErrors(newErrors);

    // Check if any field has an error
    return Object.values(newErrors).every((error) => error === '');
  };

  const handleSubmit = async () => {
    if (validateInputs()) {
      console.log('Form is valid. Submitting...');
      // Handle form submission logic here
      const birthDate = new Date(birthday);
      const data: UpdateUserDto = {
        name: name,
        email: email,
        phone: phone,
        address: address,
        birthday: birthDate,
        gender: selectedGender
      };
      console.log('🚀 ~ handleSubmit ~ data:', data);
      try {
        setIsSubmitting(true);
        // Gọi API và đợi kết quả
        if (!user) return;
        const result = await editUser(user?.id, data);
        if (result) {
          // Reset form fields
          toast.success('User edited successfully');
          refreshEndpoint();
        } else {
          toast.error('Failed to edit user. Please try again.');
        }
      } catch (error: any) {
        console.error('🚫 ~ onSubmit ~ Error:', error);
        toast.error(
          error.response?.data?.message ||
            'Failed to edit user. Please try again.'
        );
      } finally {
        setIsSubmitting(false);
      }
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
                {genderItems.map((option) => (
                  <SelectItem key={option.key}>{option.label}</SelectItem>
                ))}
              </Select>
            </div>
            {/* {renderError('name')} */}
          </div>
        </div>
        {/* Address */}
        <div className="flex w-full flex-col gap-2">
          <span className="text-xl font-normal text-black">Address</span>
          <div className="relative">
            <div className="relative">
              <input
                type="text"
                className={classNames(
                  'h-16 w-full rounded-[10px] border border-outline bg-b-primary p-5 text-2xl sm:h-12 sm:text-xl',
                  !address ? 'pl-14' : ''
                )}
                placeholder="Le Toan"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              {!address && (
                <span className="absolute left-5 top-1/2 -translate-y-1/2 transform text-2xl text-outline sm:text-xl">
                  <UserIcon className="size-6 text-black/35" />
                </span>
              )}
            </div>
            {renderError('address')}
          </div>
        </div>

        {/* Email */}
        <div className="flex w-full flex-col gap-2">
          <span className="text-xl font-normal text-black">Email</span>
          <div className="flex w-full flex-row items-center justify-between">
            {email}{' '}
            <span className="text-danger hover:cursor-pointer hover:underline">
              (Update)
            </span>
          </div>
        </div>
        {/* Phone */}
        <div className="flex w-full flex-col gap-2">
          <span className="text-xl font-normal text-black">Phone number</span>
          <div className="flex w-full flex-row items-center justify-between">
            {phone}{' '}
            <span className="text-danger hover:cursor-pointer hover:underline">
              (Update)
            </span>
          </div>
        </div>
      </div>
      <button
        className="mt-4 h-16 w-96 rounded-md bg-button-si hover:brightness-110 sm:h-12"
        onClick={handleSubmit}
      >
        <span className="text-2xl font-medium text-outline-focus">
          {isSubmitting ? 'Summitting ...' : 'Update'}
        </span>
      </button>
    </div>
  );
};

export default EditInfo;
