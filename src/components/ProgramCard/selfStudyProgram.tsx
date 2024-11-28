'use client';
import Image from 'next/image';
import { LuBookMinus, LuClock3 } from 'react-icons/lu';
import { RiUserLine } from 'react-icons/ri';

// {
//   id: 100,
//   title: 'IELTS Preparation Course',
//   lessonQuantity: 100,
//   studentQuantity: 45,
//   totalTime: 100,
//   price: 12000000,
// },

const SelfStudyProgramCard = ({ props }: { props: any }) => {
  const data = { ...props };

  const formattedNumber = (number: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'decimal',
      maximumFractionDigits: 0, // Optional: Số chữ số sau dấu thập phân
    }).format(number);
  };

  return (
    <div className="w-[400px] cursor-pointer rounded-xl border-[1px] border-outline text-xs transition-shadow duration-200 hover:shadow-lg">
      <div>
        <Image
          src={'/icons/course_img.svg'}
          alt="Course image"
          width={400}
          height={200}
          className="rounded-t-xl object-cover"
        />
      </div>
      <div className="p-4">
        {/*Name course*/}
        <h3 className="truncate text-xl font-bold text-outline-focus">
          {data.title}
        </h3>
        {/*Information */}
        <div className="mt-3 space-y-2">
          <div className="flex gap-5">
            <div className="flex items-center gap-2 text-sm text-on-surface">
              <LuBookMinus />
              <p>{data.lessonQuantity} lessons</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-on-surface">
              <LuClock3 />
              <p>{data.totalTime} hours</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-on-surface">
              <RiUserLine />
              <p>{data.studentQuantity} students</p>
            </div>
          </div>
        </div>
        <div className="mt-3 h-[1px] w-[366px] justify-center rounded-lg bg-outline"></div>
        <div className="mt-3">
          <p className="text-outline-focus text-lg font-bold">
            {formattedNumber(data.price)} VND
          </p>
        </div>
      </div>
    </div>
  );
};

export default SelfStudyProgramCard;
