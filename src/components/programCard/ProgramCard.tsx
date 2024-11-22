/**
 *  "name": "Advanced JavaScript",
    "lectures": 120,
    "students": 40,
    "opening": "15/11/2024",
    "schedule": "Monday, Wednesday, Friday",
    "time": "6pm-8pm",
    "price": "10,000,000 VND",
    "oldPrice": "18,000,000 VND",
    "feedbacks": 250,
    "rating": 4.8
*/
'use client';

import Image from 'next/image';
import Rating from '@/components/rating';
import { LuBookMinus, LuClock3 } from 'react-icons/lu';
import { RiUserLine } from 'react-icons/ri';
import { MdOutlineDateRange } from 'react-icons/md';
import { useRouter } from 'next/router';

const ProgramCard = ({ props }: { props: any }) => {
  // const router = useRouter();
  // const handleNavigate = () => {
  //   router.push(`/course/${data.id}`)
  // }

  const data = { ...props };
  return (
    <div
      // onClick={handleNavigate}
      className="w-[400px] cursor-pointer rounded-xl border-[1px] border-Outline text-xs transition-shadow duration-200 hover:shadow-lg"
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
          <p className="text-sm font-medium text-OnSurface">
            ({data.feedbacks} feedbacks)
          </p>
        </div>

        {/* Tên khóa học */}
        <h3 className="mt-3 truncate text-xl font-bold text-OutlineFocus">
          {data.name}
        </h3>

        {/* Thông tin bổ sung */}
        <div className="mt-3 space-y-2">
          <div className="flex items-center gap-2 text-sm text-OnSurface">
            <LuBookMinus />
            <p>{data.lectures} lessons</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-OnSurface">
            <RiUserLine />
            <p>{data.students} students</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-OnSurface">
            <MdOutlineDateRange />
            <p>
              Opening: <b>{data.opening}</b>
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-OnSurface">
            <MdOutlineDateRange />
            <p>
              Class schedule: <b>{data.schedule}</b>
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-OnSurface">
            <LuClock3 />
            <p>
              Class time: <b>{data.time}</b>
            </p>
          </div>
        </div>

        {/* Giá */}
        <p className="mt-3 text-lg font-bold text-OutlineFocus">{data.price}</p>
      </div>
      {/* <div className="ml-3 mt-5 flex gap-2">
        <Rating rating={data.rating} maxStar={5} />
        <p className="text-xs font-normal text-OnSurface">
          ({data.feedbacks} feedbacks)
        </p>
      </div>
      <div className="ml-3 mt-2">
        <p className="text-xl font-bold text-OutlineFocus truncate overflow-hidden">{data.name}</p>
      </div>
      <div className='flex items-center ml-3 mt-3 gap-2'>
        <LuBookMinus className='text-OnSurface'/>
        <p className='text-OnSurface'>{data.lectures} lessons</p>
      </div>
      <div className='flex items-center ml-3 mt-3 gap-2'>
        <RiUserLine className='text-OnSurface'/>
        <p className='text-OnSurface'>{data.students} students</p>
      </div>
      <div className='flex items-center ml-3 mt-3 gap-2'>
        <MdOutlineDateRange className='text-OnSurface'/>
        <p className='text-OnSurface'>Opening: <b>{data.opening}</b></p>
      </div>
      <div className='flex items-center ml-3 mt-3 gap-2'>
        <MdOutlineDateRange className='text-OnSurface'/>
        <p className='text-OnSurface'>Class schedule: <b>{data.schedule}</b></p>
      </div>
      <div className='flex items-center ml-3 mt-3 gap-2'>
        <LuClock3 className='text-OnSurface'/>
        <p className='text-OnSurface'>Class time: <b>{data.time}</b></p>
      </div>
      <div className="ml-3 mt-3 mb-3">
        <p className="text-lg font-bold text-OutlineFocus">{data.price}</p>
      </div> */}
    </div>
  );
};

export default ProgramCard;
