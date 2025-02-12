'use client';
import Image from 'next/image';
import { LuBookMinus, LuClock3 } from 'react-icons/lu';
import { RiUserLine } from 'react-icons/ri';
import { Program } from '@/types/program.type';
import { useEffect, useState } from 'react';
// import axios from '@/libs/axiosInstance';
import { useRouter } from 'next/navigation';

// const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const ProgramCard = ({ program }: { program: Program }) => {
  const router = useRouter();

  const { id, code, avatar, price, title, course } = program;

  const [lessonQuantity, setLessonQuantity] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [studentQuantity] = useState<number>(0);

  // const page = 1;
  // const rowsPerPage = 10;

  // const endpoint = `/users_programs/all/program/${program.id}?page=${page}&limit=${rowsPerPage}`;

  // const {
  //   data,
  //   error,
  //   isLoading,
  //   mutate: refreshEndpoint
  // } = useSWR(endpoint, fetcher, {
  //   keepPreviousData: true
  // });

  // useEffect(() => {
  //   if (error) {
  //     setStudentQuantity(0);
  //   } else if (data && data.metadata) {
  //     setStudentQuantity(data.metadata.totalRecord);
  //   }
  // }, [data]);

  useEffect(() => {
    if (course) {
      const totalLesson = course.reduce(
        (acc, cur) => acc + cur.lessonQuantity,
        0
      );
      const totalMins = course.reduce(
        (acc, cur) => acc + cur.lessonQuantity * cur.timePerLesson,
        0
      );
      setTotalTime(totalMins / 60);
      setLessonQuantity(totalLesson);
    }
  }, [course]);

  const formattedNumber = (number: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'decimal',
      maximumFractionDigits: 0 // Optional: Số chữ số sau dấu thập phân
    }).format(number);
  };

  return (
    <div className="flex flex-col w-[400px] cursor-pointer rounded-xl border-[1px] border-outline text-xs transition-shadow duration-200 hover:shadow-lg">
      <div
        className="h-full w-full place-content-center"
        onClick={() => router.push(`/self-study-program/${id}`)}
      >
        <Image
          src={avatar || '/icons/course_img.svg'}
          alt="Course image"
          width={400}
          height={200}
          className="rounded-t-xl object-cover p-2"
        />
      </div>
      <div className="mt-auto p-4">
        {/*Name course*/}
        <h3 className="truncate text-xl font-bold text-outline-focus">
          {title} - {code}
        </h3>
        {/*Information */}
        <div className="mt-3 space-y-2">
          <div className="flex gap-5">
            <div className="flex items-center gap-2 text-sm text-on-surface">
              <LuBookMinus />
              <p>
                {lessonQuantity} {lessonQuantity > 1 ? 'lessons' : 'lesson'}
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-on-surface">
              <LuClock3 />
              <p>
                {totalTime} {totalTime > 0 ? 'hours' : 'hour'}
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-on-surface">
              <RiUserLine />
              <p>
                {studentQuantity} {studentQuantity > 1 ? 'students' : 'student'}
              </p>
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

export default ProgramCard;
