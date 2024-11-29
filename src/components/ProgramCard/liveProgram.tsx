'use client';

// {
//   id: 1,
//   rating: 4.9,
//   feedback: 320,
//   title: 'IELTS Preparation Course',
//   lessonQuantity: 100,
//   studentQuantity: 45,
//   startDate: '2025-01-05T17:00:00Z',
//   schedule: ['Monday', 'Wednesday', 'Friday'],
//   timeStart: '5pm',
//   timeEnd: '7pm',
//   price: 12000000,
// },

import Image from 'next/image';
import { Rating } from '@/components';
import { LuBookMinus, LuClock3 } from 'react-icons/lu';
import { RiUserLine } from 'react-icons/ri';
import { MdOutlineDateRange } from 'react-icons/md';
import { useRouter } from 'next/router';

const LiveProgramCard = ({ props }: { props: any }) => {
  // const router = useRouter();
  // const handleNavigate = () => {
  //   router.push(`/course/${data.id}`)
  // }

  const data = { ...props };

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
      timeZone: 'UTC' // Đảm bảo múi giờ UTC
    }).format(new Date(startDate));
  };

  return (
    <div
      // onClick={handleNavigate}
      className="w-[400px] cursor-pointer rounded-xl border-[1px] border-outline text-xs transition-shadow duration-200 hover:shadow-lg"
    >
      <div>
        <Image
          src={'/icons/course_img.svg'}
          alt="Course image"
          width={400}
          height={200}
          className="rounded-t-xl object-cover"
        />
      </div>
      {/* Nội dung chi tiết */}
      <div className="p-4">
        {/* Rating và Feedback */}
        <div className="flex items-center gap-2">
          <Rating rating={data.rating} maxStar={5} />
          <p className="text-sm font-medium text-on-surface">
            ({data.feedbacks} feedbacks)
          </p>
        </div>

        {/* Tên khóa học */}
        <h3 className="mt-3 truncate text-xl font-bold text-outline-focus">
          {data.title}
        </h3>

        {/* Thông tin bổ sung */}
        <div className="mt-3 space-y-2">
          <div className="flex items-center gap-2 text-sm text-on-surface">
            <LuBookMinus />
            <p>{data.lessonQuantity} lessons</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-on-surface">
            <RiUserLine />
            <p>{data.studentQuantity} students</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-on-surface">
            <MdOutlineDateRange />
            <p>
              Opening: <b>{formattedDate(data.startDate)}</b>
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-on-surface">
            <MdOutlineDateRange />
            <p>
              Class schedule: <b>{formatSchedule(data.schedule)}</b>
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-on-surface">
            <LuClock3 />
            <p>
              Class time:{' '}
              <b>
                {data.timeStart} - {data.timeEnd}
              </b>
            </p>
          </div>
        </div>

        {/* Giá */}
        <p className="mt-3 text-lg font-bold text-outline-focus">
          {formattedNumber(data.price)} VND
        </p>
      </div>
    </div>
  );
};

export default LiveProgramCard;
