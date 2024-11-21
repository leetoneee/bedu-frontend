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
import Image from 'next/image';
import Rating from '@/components/rating';
import { LuBookMinus, LuClock3  } from 'react-icons/lu';
import { RiUserLine } from "react-icons/ri";
import { MdOutlineDateRange } from "react-icons/md";

const Card = ({ props }: { props: any }) => {
  const data = { ...props };
  return (
    <div className="w-[400px] rounded-xl border-[1px] border-Outline text-xs">
      <div>
        <Image
          src={'/icons/course_img.svg'}
          alt="Course image"
          width={400}
          height={200}
        />
      </div>
      <div className="ml-3 mt-5 flex gap-2">
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
      </div>
    </div>
  );
};

export default Card;
