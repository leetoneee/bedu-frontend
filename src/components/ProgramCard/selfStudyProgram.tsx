'use client';
import Image from 'next/image';
import { LuBookMinus, LuClock3 } from 'react-icons/lu';
import { RiUserLine } from 'react-icons/ri';
import { SSProgramCardProps } from '@/types/programCard.type';

const SelfStudyProgramCard = ({
  ProgramInfo
}: {
  ProgramInfo: SSProgramCardProps;
}) => {
  const {
    // id,
    // code,
    // description,
    avatar,
    lessonQuantity,
    price,
    studentQuantity,
    title,
    totalTime
  } = ProgramInfo;

  const formattedNumber = (number: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'decimal',
      maximumFractionDigits: 0 // Optional: Số chữ số sau dấu thập phân
    }).format(number);
  };

  return (
    <div className="w-[400px] cursor-pointer rounded-xl border-[1px] border-outline text-xs transition-shadow duration-200 hover:shadow-lg">
      <div>
        <Image
          src={avatar || '/icons/course_img.svg'}
          alt="Course image"
          width={400}
          height={200}
          className="rounded-t-xl object-cover"
        />
      </div>
      <div className="p-4">
        {/*Name course*/}
        <h3 className="truncate text-xl font-bold text-outline-focus">
          {title}
        </h3>
        {/*Information */}
        <div className="mt-3 space-y-2">
          <div className="flex gap-5">
            <div className="flex items-center gap-2 text-sm text-on-surface">
              <LuBookMinus />
              <p>{lessonQuantity} lessons</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-on-surface">
              <LuClock3 />
              <p>{totalTime} hours</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-on-surface">
              <RiUserLine />
              <p>{studentQuantity} students</p>
            </div>
          </div>
        </div>
        <div className="mt-3 h-[1px] w-[366px] justify-center rounded-lg bg-outline"></div>
        <div className="mt-3">
          <p className="text-lg font-bold text-outline-focus">
            {formattedNumber(price)} VND
          </p>
        </div>
      </div>
    </div>
  );
};

export default SelfStudyProgramCard;
