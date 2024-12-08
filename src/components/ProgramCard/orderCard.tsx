import ButtonSolid from '@/components/Button/ButtonSolid';
import {
  OrderCardProps,
  LiveProgramCardProps,
  SSProgramCardProps
} from '@/types/programCard.type';
import Image from 'next/image';

const OrderCard = ({ detail }: OrderCardProps) => {
  const formattedNumber = (price: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'decimal',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="w-[400px] rounded-xl border-[1px] border-outline text-xs transition-shadow duration-200 hover:shadow-lg">
      <div>
        <Image
          src={'/icons/course_img.svg'}
          alt={'Course Image'}
          width={400}
          height={200}
          className="rounded-t-xl object-cover"
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
          onClick={() => {}} /**Chuyển hướng tới payment */
        />
      </div>
    </div>
  );
};

export default OrderCard;
