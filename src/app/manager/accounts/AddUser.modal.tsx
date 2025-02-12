import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  Selection,
  SelectItem
} from '@nextui-org/react';
import React, { useState } from 'react';
// import axios from '@/libs/axiosInstance';
import { toast } from 'react-toastify';
import { createUser, CreateUserDto } from '@/services/users.service';

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  onClose: () => void;
  onCreated?: () => void; // Callback báo cho parent biết đã tạo xong
};

// const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const roleOptions = [
  {
    key: '3',
    label: 'Student'
  },
  {
    key: '2',
    label: 'Teacher'
  }
];

const genderOptions = [
  {
    key: 'none',
    label: 'None'
  },
  {
    key: 'male',
    label: 'Male'
  },
  {
    key: 'female',
    label: 'Female'
  }
];

const AddUserModal = ({ isOpen, onOpenChange, onClose, onCreated }: Props) => {
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');
  const [gender, setGender] = useState<Selection>(new Set(['none']));
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPass, setConfirmPass] = useState<string>('');
  const [role, setRole] = useState<Selection>(new Set(['3']));
  const [errors, setErrors] = useState({
    name: '',
    username: '',
    birthday: '',
    email: '',
    phone: '',
    password: '',
    confirmPass: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedGender = React.useMemo(
    () => Array.from(gender).join(', ').replaceAll('_', ' '),
    [gender]
  );

  const selectedRole = React.useMemo(
    () => Array.from(role).join(', ').replaceAll('_', ' '),
    [role]
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

  const handleSubmit = async () => {
    if (validateInputs()) {
      console.log('Form is valid. Submitting...');
      // Handle form submission logic here
      const birthDate = new Date(birthday);
      const data: CreateUserDto = {
        name: name,
        username: username,
        email: email,
        phone: phone,
        password: password,
        address: 'None',
        currentLevel: 'Beginner',
        birthday: birthDate,
        gender: selectedGender,
        roleId: Number(selectedRole)
      };
      try {
        setIsSubmitting(true);
        // Gọi API và đợi kết quả
        const result = await createUser(data);
        if (result) {
          // Reset form fields
          handleClose();
          if (onCreated) {
            onCreated();
          }
        } else {
          toast.error('Failed to create user. Please try again.');
        }
      } catch (error: any) {
        console.error('🚫 ~ onSubmit ~ Error:', error);
        toast.error(
          error.response?.data?.message ||
            'Failed to create user. Please try again.'
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

  const handleClose = () => {
    setName('');
    setUsername('');
    setBirthday('');
    setGender(new Set(['none']));
    setEmail('');
    setPassword('');
    setConfirmPass('');
    setPhone('');

    // Đóng modal
    onClose();
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
            <div className="text-lg font-semibold">Add new user</div>
            <div className="text-wrap text-sm font-normal">
              Fill in the form below to create a new user
            </div>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-7">
            {/* Name */}
            <div className="flex flex-row">
              <div className="basis-[30%]">
                <span className="text-sm font-medium text-black">
                  Full name<span className="text-danger">*</span>
                </span>
              </div>
              <div className="relative flex basis-[70%] gap-8">
                <input
                  type="text"
                  value={name}
                  placeholder="Enter full name"
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-outline px-3 py-2 text-base focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {renderError('name')}
              </div>
            </div>

            {/* Username */}
            <div className="flex flex-row">
              <div className="basis-[30%]">
                <span className="text-sm font-medium text-black">
                  Username<span className="text-danger">*</span>
                </span>
              </div>
              <div className="relative flex basis-[70%] gap-8">
                <input
                  type="text"
                  value={username}
                  placeholder="Enter username"
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-lg border border-outline px-3 py-2 text-base focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {renderError('username')}
              </div>
            </div>

            {/* Birthday */}
            <div className="flex flex-row">
              <div className="basis-[30%]">
                <span className="text-sm font-medium text-black">
                  Birthday<span className="text-danger">*</span>
                </span>
              </div>
              <div className="relative flex basis-[70%] gap-8">
                <input
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  className="w-full rounded-lg border border-outline px-3 py-2 text-base focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {renderError('birthday')}
              </div>
            </div>

            {/* Gender */}
            <div className="flex flex-row">
              <div className="basis-[30%]">
                <span className="text-sm font-medium text-black">
                  Gender<span className="text-danger">*</span>
                </span>
              </div>
              <div className="relative flex basis-[70%] gap-8">
                <Select
                  className="max-w-xs"
                  placeholder="Select type"
                  disallowEmptySelection
                  selectedKeys={gender}
                  variant="bordered"
                  onSelectionChange={setGender}
                >
                  {genderOptions.map((role) => (
                    <SelectItem key={role.key} value={role.label}>
                      {role.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </div>

            {/* Phone */}
            <div className="flex flex-row">
              <div className="basis-[30%]">
                <span className="text-sm font-medium text-black">
                  Phone<span className="text-danger">*</span>
                </span>
              </div>
              <div className="relative flex basis-[70%] gap-8">
                <input
                  type="text"
                  value={phone}
                  placeholder="0123-456-789"
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-lg border border-outline px-3 py-2 text-base focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {renderError('phone')}
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-row">
              <div className="basis-[30%]">
                <span className="text-sm font-medium text-black">
                  Email<span className="text-danger">*</span>
                </span>
              </div>
              <div className="relative flex basis-[70%] gap-8">
                <input
                  type="email"
                  value={email}
                  placeholder="example@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-outline px-3 py-2 text-base focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {renderError('email')}
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-row">
              <div className="basis-[30%]">
                <span className="text-sm font-medium text-black">
                  Password<span className="text-danger">*</span>
                </span>
              </div>
              <div className="relative flex basis-[70%] gap-8">
                <input
                  type="password"
                  value={password}
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-outline px-3 py-2 text-base focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {renderError('password')}
              </div>
            </div>
            {/* confirm password */}
            <div className="flex flex-row">
              <div className="basis-[30%]">
                <span className="text-sm font-medium text-black">
                  Confirm Password<span className="text-danger">*</span>
                </span>
              </div>
              <div className="relative flex basis-[70%] gap-8">
                <input
                  type="password"
                  value={confirmPass}
                  placeholder="Confirm password"
                  onChange={(e) => setConfirmPass(e.target.value)}
                  className="w-full rounded-lg border border-outline px-3 py-2 text-base focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {renderError('confirmPass')}
              </div>
            </div>

            {/* role */}
            <div className="flex flex-row">
              <div className="basis-[30%]">
                <span className="text-sm font-medium text-black">
                  Role<span className="text-danger">*</span>
                </span>
              </div>
              <div className="relative flex basis-[70%] gap-8">
                <Select
                  className="max-w-xs"
                  placeholder="Select type"
                  disallowEmptySelection
                  selectedKeys={role}
                  variant="bordered"
                  onSelectionChange={setRole}
                >
                  {roleOptions.map((role) => (
                    <SelectItem key={role.key} value={role.label}>
                      {role.label}
                    </SelectItem>
                  ))}
                </Select>
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
};

export default AddUserModal;
