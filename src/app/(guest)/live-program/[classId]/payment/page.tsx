'use client';

import { AppContext } from '@/contexts';
import { AuthType } from '@/types';
import { User } from '@/types/user.type';
import { Divider } from '@nextui-org/react';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import useSWR from 'swr';
import { useParams } from 'next/navigation';
import { RadioGroup, Radio } from '@nextui-org/radio';
import Image from 'next/image';
import { ButtonSolid } from '@/components';
import { EClass } from '@/types/class.type';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const PaymentPage = () => {
  const { auth } = useContext(AppContext) as AuthType;
  const { classId } = useParams();
  const { data: dataUser } = useSWR(`/users/item/${auth?.id}`, fetcher);
  const { data: dataClass } = useSWR(`/classes/item/${classId}`, fetcher);
  const [user, setUser] = useState<User>();
  const [eclass, setEClass] = useState<EClass>();
  const [selected, setSelected] = useState('');
  useEffect(() => {
    if (dataUser) {
      setUser(dataUser.metadata);
    }
  }, [dataUser]);

  useEffect(() => {
    if (dataClass) {
      setEClass(dataClass.metadata);
    }
  }, [dataClass]);

  const formattedNumber = (price: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'decimal',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="flex flex-row">
      <div className="flex h-[700px] w-1/2 flex-col items-center justify-center">
        <div className="flex w-2/3 flex-col gap-3">
          <div className="flex text-2xl font-bold text-on-surface">
            <span>Personal information</span>
          </div>
          {/* Full name */}
          <div className="flex flex-row items-center justify-between text-on-surface">
            <span>Full name</span>
            <span>{user?.name}</span>
          </div>
          <Divider />
          {/* Email */}
          <div className="flex flex-row items-center justify-between text-on-surface">
            <span>Email</span>
            <span>{user?.email}</span>
          </div>
          <Divider />
          {/* Phone */}
          <div className="flex flex-row items-center justify-between text-on-surface">
            <span>Phone number</span>
            <span>{user?.phone}</span>
          </div>
          <Divider />
        </div>
        <div className="flex w-2/3 flex-col gap-3 pt-10">
          <div className="flex text-2xl font-bold text-on-surface">
            <span>Payment method</span>
          </div>
          <div>
            <RadioGroup value={selected} onValueChange={setSelected}>
              <Radio value={`bank-transfer`}>Bank transfer</Radio>
            </RadioGroup>
          </div>
          <span className="text-on-surface">
            <strong className="text-error">*</strong> Note: If using &quot;Bank
            transfer,&quot; students need to inform the center and provide the
            transaction code for confirmation.
          </span>
        </div>
      </div>

      <div className="flex h-[700px] w-1/2 flex-col items-center justify-center gap-4">
        <div className="flex w-2/3 gap-4 rounded-xl border-2 border-outline bg-surface p-4">
          <div className="w-1/4">
            <Image
              src={eclass?.avatar || '/icons/course_img.svg'}
              alt="Course image"
              width={140}
              height={140}
              className="rounded-t-xl object-cover p-2"
            />
          </div>
          <div className="flex w-3/4 flex-col justify-center gap-2 text-xl font-bold text-outline-focus">
            <span className="truncate font-bold">{eclass?.name}</span>
            <span className="text-xl font-bold">
              {formattedNumber(eclass?.price ? eclass?.price : 0)} VND
            </span>
          </div>
        </div>
        <div className="flex w-2/3 flex-col gap-4 rounded-xl border-2 border-outline bg-surface p-4">
          {/* Unit price */}
          <div className="flex w-full flex-row justify-between">
            <span className="font-medium text-on-surface">Unit price</span>
            <span className="font-bold text-outline-focus">
              {formattedNumber(eclass?.price ? eclass?.price : 0)} VND
            </span>
          </div>
          <Divider />
          {/* total price */}
          <div className="flex w-full flex-row justify-between">
            <span className="font-medium text-on-surface">Total</span>
            <span className="font-bold text-outline-focus">
              {formattedNumber(eclass?.price ? eclass?.price : 0)} VND
            </span>
          </div>
        </div>
        <div className="flex w-2/3">
          <ButtonSolid
            content="Pay"
            className="w-full rounded-md bg-on-primary !text-3xl !text-b-primary"
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
