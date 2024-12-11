'use client';

import { classNames } from '@/components';
import { CreateUserDto, createUser } from '@/services/users.service';
import {
  EnvelopeIcon,
  LockClosedIcon,
  PhoneIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { Divider, Select, SelectItem, Selection } from '@nextui-org/react';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const genderItems = [{ label: 'None' }, { label: 'Male' }, { label: 'Female' }];

const SignUpPage = () => {
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');
  const [gender, setGender] = useState<Selection>(new Set(['None']));
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPass, setConfirmPass] = useState<string>('');
  const [errors, setErrors] = useState({
    name: '',
    username: '',
    birthday: '',
    email: '',
    phone: '',
    password: '',
    confirmPass: ''
  });

  const selectedGender = React.useMemo(
    () => Array.from(gender).join(', ').replaceAll('_', ' '),
    [gender]
  );

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
      username: username.trim() === '' ? 'Username is required' : '',
      birthday:
        birthday.trim() === ''
          ? 'Birthday is required'
          : !isValidAge
            ? 'Birthday must be at least 5 years ago'
            : '',
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ? ''
        : 'Invalid email address',
      phone: /^\d{10,15}$/.test(phone) ? '' : 'Invalid phone number',
      password: password.length >= 6 ? '' : 'Must be at least 6 characters',
      confirmPass: confirmPass === password ? '' : 'Passwords do not match'
    };

    setErrors(newErrors);

    // Check if any field has an error
    return Object.values(newErrors).every((error) => error === '');
  };

  const onSubmit = async () => {
    if (validateInputs()) {
      console.log('Form is valid. Submitting...');
      // Handle form submission logic here
      const data: CreateUserDto = {
        name: name,
        username: username,
        email: email,
        phone: phone,
        password: password,
        address: 'None',
        currentLevel: 'Beginner',
        cid: '885323141',
        birthday: birthday,
        gender: selectedGender
      };
      try {
        // Gọi API và đợi kết quả
        const result = await createUser(data);
        setName('');
        setUsername('');
        setBirthday('');
        setGender(new Set(['None']));
        setEmail('');
        setPassword('');
        setConfirmPass('');
        setPhone('');
        toast.success('User created successfully!');
      } catch (error) {
        console.error('🚫 ~ onSubmit ~ Error:', error);
        toast.error('Failed to create user. Please try again.');
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
    <div className="absolute top-0 flex h-full w-full items-center justify-center bg-b-primary">
      <div className="container flex max-w-[540px] flex-col gap-3 rounded-[20px] border border-outline bg-b-secondary px-11 py-5 sm:px-6">
        <span className="text-3xl font-bold text-outline-focus">Sign up</span>
        <Divider />
        <div className="flex flex-col gap-7">
          {/* Name & Username */}
          <div className="flex flex-row gap-6">
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
            <div className="flex w-full flex-col gap-2">
              <span className="text-xl font-normal text-black">
                Username<span className="text-danger">*</span>
              </span>
              <div className="relative">
                <div className="relative">
                  <input
                    type="text"
                    className={classNames(
                      'h-16 w-full rounded-[10px] border border-outline bg-b-primary p-5 text-2xl sm:h-12 sm:text-xl',
                      !username ? 'pl-14' : ''
                    )}
                    placeholder="leetone"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {!username && (
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 transform text-2xl text-outline sm:text-xl">
                      <UserIcon className="size-6 text-black/35" />
                    </span>
                  )}
                </div>
                {renderError('username')}
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-6">
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
                    disallowEmptySelection
                    selectedKeys={gender}
                    className="w-fulls bg-b-primary"
                    onSelectionChange={setGender}
                    size="lg"
                  >
                    {genderItems.map((position) => (
                      <SelectItem key={position.label}>
                        {position.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                {/* {renderError('name')} */}
              </div>
            </div>
          </div>
          {/* Email & Phone */}
          <div className="flex flex-row gap-6">
            <div className="flex w-full flex-col gap-2">
              <span className="text-xl font-normal text-black">
                Email<span className="text-danger">*</span>
              </span>
              <div className="relative">
                <div className="relative">
                  <input
                    type="email"
                    className={classNames(
                      'h-16 w-full rounded-[10px] border border-outline bg-b-primary p-5 text-2xl sm:h-12 sm:text-xl',
                      !email ? 'pl-14' : ''
                    )}
                    placeholder="123@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {!email && (
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 transform text-2xl text-outline sm:text-xl">
                      <EnvelopeIcon className="size-6 text-black/35" />
                    </span>
                  )}
                </div>
                {renderError('email')}
              </div>
            </div>
            <div className="flex w-full flex-col gap-2">
              <span className="text-xl font-normal text-black">
                Phone<span className="text-danger">*</span>
              </span>
              <div className="relative">
                <div className="relative">
                  <input
                    type="text"
                    className={classNames(
                      'h-16 w-full rounded-[10px] border border-outline bg-b-primary p-5 text-2xl sm:h-12 sm:text-xl',
                      !phone ? 'pl-14' : ''
                    )}
                    placeholder="0123456789"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {!phone && (
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 transform text-2xl text-outline sm:text-xl">
                      <PhoneIcon className="size-6 text-black/35" />
                    </span>
                  )}
                </div>
                {renderError('phone')}
              </div>
            </div>
          </div>
          {/* Password & Confirm */}
          <div className="flex flex-row gap-6">
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
                      !password ? 'pl-14' : ''
                    )}
                    placeholder=""
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {!password && (
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 transform text-2xl text-outline sm:text-xl">
                      <LockClosedIcon className="size-6 text-black/35" />
                    </span>
                  )}
                </div>
                {renderError('password')}
              </div>
            </div>
            <div className="flex w-full flex-col gap-2">
              <span className="text-xl font-normal text-black">
                Confirm password
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
            className="h-16 w-full rounded-md bg-button-si hover:brightness-110 sm:h-12"
            onClick={onSubmit}
          >
            <span className="text-2xl font-medium text-outline-focus">
              Sign up
            </span>
          </button>
        </div>
        <span>
          Already have an account?{' '}
          <span
            onClick={() => signIn()}
            className="font-semibold hover:cursor-pointer hover:underline"
          >
            Sign in
          </span>
        </span>
      </div>
    </div>
  );
};

export default SignUpPage;
