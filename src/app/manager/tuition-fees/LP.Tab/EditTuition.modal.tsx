import { User } from '@/types/user.type';
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  Selection,
  SelectItem,
  Spinner
} from '@nextui-org/react';
import React, { Fragment, useEffect, useState } from 'react';
import axios from '@/libs/axiosInstance';
import { toast } from 'react-toastify';
import { findUserByCID } from '@/services/users.service';
import { editPayment, UpdatePaymentDto } from '@/services/payments.service';
import { EClass } from '@/types/class.type';
import { Payment } from '@/types/payment.type';

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  onClose: () => void;
  payment: Payment;
  onEdited?: () => void; // Callback báo cho parent biết đã tạo xong
};

// const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const tuitionTypes = [
  {
    key: 'self-study',
    label: 'Self-study Program'
  },
  {
    key: 'live',
    label: 'Live Program'
  }
];

const methodOptions = [
  {
    key: 'momo',
    label: 'MoMo wallet'
  },
  {
    key: 'zalopay',
    label: 'Zalo Pay'
  },
  {
    key: 'bank',
    label: 'Bank transfer / Internet banking'
  }
];

const EditTuition = ({
  isOpen,
  onOpenChange,
  onClose,
  payment,
  onEdited
}: Props) => {
  // State
  const [cid, setCID] = useState<string>('');
  const [user, setUser] = useState<User>();
  const [code, setCode] = useState<string>(''); // Class code
  const [eclass, setEClass] = useState<EClass>();
  const [type, setType] = useState<Selection>(new Set([tuitionTypes[1].key]));
  const [transactionId, setTransactionId] = useState<string>('');
  const [method, setMethod] = useState<Selection>(
    new Set([methodOptions[0].key])
  );
  const [amount, setAmount] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false);
  const [isClassLoading, setIsClassLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{
    cid: string;
    transactionId: string;
    code: string;
    amount: string;
  }>({
    cid: '',
    transactionId: '',
    code: '',
    amount: ''
  });

  useEffect(() => {
    if (payment) {
      setCID(payment.user.cid);
      setUser(payment.user);
      setCode(payment.class.code);
      setEClass(payment.class);
      setAmount(payment.amount.toString());
      setTransactionId(payment.transactionId);
      setMethod(new Set([payment.method]));
    }
  }, []);

  const selectedMethod = React.useMemo(
    () => Array.from(method).join(', ').replaceAll('_', ' '),
    [method]
  );

  const handleFindUser = async () => {
    if (!cid) {
      setErrors({
        ...errors,
        cid: 'CID is required'
      });
      return;
    }

    // Call API
    try {
      setIsUserLoading(true);
      const result = await findUserByCID(cid);
      if (result && result.metadata) {
        setUser(result.metadata);
        setIsUserLoading(false);
      } else {
        setErrors({
          ...errors,
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
      setIsUserLoading(false);
    }
  };

  const handleFindClass = async () => {
    if (!code) {
      setErrors({
        ...errors,
        code: 'Class code is required'
      });
      return;
    }

    // Call API
    try {
      setIsClassLoading(true);
      const result = await findUserByCID(cid);
      if (result && result.metadata) {
        setUser(result.metadata);
        setIsClassLoading(false);
      } else {
        setErrors({
          ...errors,
          code: 'Class not found'
        });
        setUser(undefined);
      }
    } catch (error: any) {
      console.error('🚫 ~ onSubmit ~ Error:', error);
      toast.error(
        error.response?.data?.message ||
          'Failed to find class. Please try again.'
      );
    } finally {
      setIsClassLoading(false);
    }
  };

  const handleClose = () => {
    setCID('');
    setUser(undefined);
    setEClass(undefined);
    setAmount('');
    setTransactionId('');
    setErrors({
      transactionId: '',
      cid: '',
      code: '',
      amount: ''
    });
    // Đóng modal
    onClose();
  };

  const validateInputs = () => {
    const newErrors = { ...errors };

    if (!cid && !user) {
      newErrors.cid = 'CID is required or user not found';
    }

    if (!code && !eclass) {
      newErrors.code = 'Class code is required or class not found';
    }

    // Validate amount as a positive integer
    if (!amount) {
      newErrors.amount = 'Amount is required';
    } else if (
      isNaN(Number(amount)) ||
      !Number.isInteger(Number(amount)) ||
      Number(amount) <= 0
    ) {
      newErrors.amount = 'Amount must be a positive integer';
    } else {
      newErrors.amount = '';
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === '');
  };

  const handleSubmit = async () => {
    if (validateInputs()) {
      console.log('Form is valid. Submitting...');
      // Handle form submission logic here
      // Call API
      try {
        setIsSubmitting(true);
        if (!user) return;
        if (!eclass) return;
        const data: UpdatePaymentDto = {
          userId: user.id,
          classId: eclass.id,
          programId: null,
          amount: Number(amount),
          method: selectedMethod,
          transactionId: transactionId
        };
        const result = await editPayment(payment.id, data);
        if (result) {
          handleClose();
          if (onEdited) {
            onEdited();
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
    } else {
      console.log('Form has errors. Fix them to proceed.');
    }
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
            <div className="text-lg font-semibold">Add tuition fee</div>
            {/* <div className="text-wrap text-sm font-normal">
              Add 
            </div> */}
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-7">
            {/*  type */}
            <div className="flex flex-row">
              <div className="basis-[30%]">
                <span className="text-sm font-medium text-black">
                  Type program<span className="text-danger">*</span>
                </span>
              </div>
              <div className="relative flex basis-[70%] gap-8">
                <Select
                  className="max-w-xs"
                  placeholder="Select type"
                  disallowEmptySelection
                  selectedKeys={type}
                  variant="bordered"
                  // onSelectionChange={setType}
                >
                  {tuitionTypes.map((type) => (
                    <SelectItem key={type.key}>{type.label}</SelectItem>
                  ))}
                </Select>
              </div>
            </div>

            {/* Transaction ID */}
            <div className="flex flex-row">
              <div className="basis-[30%]">
                <span className="text-sm font-medium text-black">
                  Transaction ID<span className="text-danger">*</span>
                </span>
              </div>
              <div className="relative basis-[70%]">
                <input
                  type="text"
                  className="w-full rounded-lg"
                  placeholder="Enter transaction ID..."
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                />
                {renderError('transactionId')}
              </div>
            </div>

            <Divider />

            {/* Class code */}
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
                      ...errors,
                      cid: ''
                    });
                  }}
                />
                {renderError('cid')}
              </div>
            </div>

            {/* User Info */}
            {isUserLoading && <Spinner />}
            {user && (
              <Fragment>
                <div className="flex flex-row">
                  {/* Name */}
                  <div className="basis-[30%]">
                    <span className="text-sm font-medium text-black">
                      Student name
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
              </Fragment>
            )}

            <Divider />

            {/* Class code */}
            <div className="flex flex-row">
              <div className="basis-[30%]">
                <span className="text-sm font-medium text-black">
                  Class code<span className="text-danger">*</span>
                </span>
              </div>
              <div className="relative basis-[70%]">
                <input
                  type="text"
                  className="w-full rounded-lg"
                  placeholder="Find class..."
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onBlur={() => handleFindClass()}
                  onFocus={() => {
                    setErrors({
                      ...errors,
                      cid: ''
                    });
                  }}
                />
                {renderError('code')}
              </div>
            </div>

            {/* User Info */}
            {isClassLoading && <Spinner />}
            {eclass && (
              <Fragment>
                <div className="flex flex-row">
                  {/* Name */}
                  <div className="basis-[30%]">
                    <span className="text-sm font-medium text-black">
                      Class name
                    </span>
                  </div>
                  <div className="relative basis-[70%]">
                    <input
                      type="text"
                      className="w-full rounded-lg"
                      readOnly
                      value={eclass.name}
                    />
                  </div>
                </div>
              </Fragment>
            )}

            <Divider />

            {/* Method */}
            <div className="flex flex-row">
              <div className="basis-[30%]">
                <span className="text-sm font-medium text-black">
                  Payment method<span className="text-danger">*</span>
                </span>
              </div>
              <div className="relative basis-[70%]">
                <Select
                  className="max-w-xs"
                  placeholder="Select method"
                  disallowEmptySelection
                  variant="bordered"
                  selectedKeys={method}
                  onSelectionChange={setMethod}
                >
                  {methodOptions.map((method) => (
                    <SelectItem key={method.key}>{method.label}</SelectItem>
                  ))}
                </Select>
              </div>
            </div>

            {/* Amount */}
            <div className="flex flex-row">
              <div className="basis-[30%]">
                <span className="text-sm font-medium text-black">
                  Amount<span className="text-danger">*</span>
                </span>
              </div>
              <div className="relative basis-[70%]">
                <input
                  type="text"
                  className="w-full rounded-lg"
                  placeholder="Enter amount..."
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                {renderError('amount')}
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
              {isSubmitting ? 'Submitting...' : 'Update'}
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditTuition;
