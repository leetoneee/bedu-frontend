'use client';

import ButtonSolid from '@/components/Button/ButtonSolid';
import { OrderCardProps } from '@/types/programCard.type';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useContext } from 'react';
import { AppContext, TypeContext } from '@/contexts';
import { AuthType } from '@/types';

const OrderCard = ({ detail }: OrderCardProps) => {
  const router = useRouter();
  const { auth } = useContext(AppContext) as AuthType;
  const { type } = useContext(TypeContext);

  const formattedNumber = (price: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'decimal',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handlePayment = async () => {
    if (auth) {
      if (type === 'programs') {
        router.push(`/self-study-program/${detail.id}/payment`);
      } else {
        router.push(`/live-program/${detail.id}/payment`);
      }
    } else {
      signIn();
    }
  };

  return (
    <div className="w-[400px] rounded-xl border-[1px] border-outline text-xs transition-shadow duration-200 hover:shadow-lg">
      <div>
        <Image
          src={detail.avatar || '/icons/course_img.svg'}
          alt={'Course Image'}
          width={400}
          height={200}
          className="rounded-t-xl object-cover p-2"
        />
      </div>
      <div className="pb-4 pl-4 pr-4">
        <p className="mt-3 text-2xl font-bold text-outline-focus">
          {formattedNumber(detail.price)} VND
        </p>
      </div>
      <div className="pb-4 pl-4 pr-4">
        <ButtonSolid
          className="h-[70px] w-full rounded-md bg-on-primary !text-3xl !text-b-primary"
          content="Pay"
          onClick={handlePayment} /**Chuyển hướng tới payment */
        />
      </div>
    </div>
  );
};

export default OrderCard;
