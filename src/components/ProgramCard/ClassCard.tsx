'use client';
import Image from 'next/image';
import { Rating } from '@/components';
import { LuBookMinus, LuClock3 } from 'react-icons/lu';
import { MdOutlineDateRange } from 'react-icons/md';
import { useRouter } from 'next/router';
import { LiveProgramCardProps } from '@/types/programCard.type';
import { EClass } from '@/types/class.type';

const ClassCard = ({ eclass }: { eclass: EClass }) => {
  const {
    id,
    code,
    description,
    avatar,
    lessonQuantity,
    name,
    price,
    startDate,
    studyForm,
    timePerLesson
  } = eclass;

  const rating: number = 4.5;
  const feedbacks: number = 100;
  const formattedNumber = (number: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'decimal',
      maximumFractionDigits: 0 // Optional: Số chữ số sau dấu thập phân
    }).format(number);
  };

  const formatSchedule = (schedule: string[]): string => {
    return schedule.join(', '); // Nối tất cả phần tử bằng dấu phẩy và khoảng trắng
  };

  const formattedDate = (startDate: string) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long', // Tháng dạng chữ (January)
      day: 'numeric',
      timeZone: 'UTC'
    }).format(new Date(startDate));
  };

  return (
    <div
      // onClick={handleNavigate}
      className="w-[400px] cursor-pointer rounded-xl border-[1px] border-outline text-xs transition-shadow duration-200 hover:shadow-lg"
    >
      <div>
        <Image
          src={avatar || '/icons/course_img.svg'}
          alt="Course image"
          width={400}
          height={200}
          className="rounded-t-xl object-cover p-2"
        />
      </div>
      {/* Nội dung chi tiết */}
      <div className="p-4">
        {/* Rating và Feedback */}
        <div className="flex items-center gap-2">
          <Rating rating={rating} maxStar={5} />
          <p className="text-sm font-medium text-on-surface">
            ({feedbacks} feedbacks)
          </p>
        </div>

        {/* Tên khóa học */}
        <h3 className="mt-3 truncate text-xl font-bold text-outline-focus">
          {name} - {code}
        </h3>

        {/* Thông tin bổ sung */}
        <div className="mt-3 space-y-2">
          <div className="flex items-center gap-2 text-sm text-on-surface">
            <LuBookMinus />
            <p>{lessonQuantity} lessons</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-on-surface">
            <MdOutlineDateRange />
            <p>
              Opening: <b>{formattedDate(startDate)}</b>
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-on-surface">
            <LuClock3 />
            <p>
              Time per lesson: <b>{timePerLesson} minutes</b>
            </p>
          </div>
        </div>

        {/* Giá */}
        <p className="mt-3 text-lg font-bold text-outline-focus">
          {formattedNumber(price)} VND
        </p>
      </div>
    </div>
  );
};

export default ClassCard;
