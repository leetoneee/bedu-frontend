'use client';

import {
  Accordion,
  Breadcrumb,
  Header,
  NavHeader,
  OrderCard,
  Rating,
  Footer
} from '@/components';
import Image from 'next/image';
import { Crumb } from '@/types';
import { useParams } from 'next/navigation';
import { getCoursesByProgramId } from '@/data/program-course.data';
import { getLessonsByCourseId } from '@/data/lesson.data';
import { SSProgramCardProps } from '@/types/programCard.type';

export default function DetailProgramPage() {
  const params = useParams();
  const Id = params.programId;
  console.log('id router: ', Id);

  //FakeAPI
  {
    /**Chỗ cần sửa - Lấy API thực tế cho Program, Course, Lesson*/
  }
  const dataProgramAPI = (id: number): SSProgramCardProps => {
    return {
      id: 1,
      code: 'IELTS-AC-2024',
      title: 'IELTS Academic Preparation',
      description:
        'Prepare for the IELTS Academic test with a focus on reading, writing, speaking, and listening skills.',
      lessonQuantity: 20,
      studentQuantity: 25,
      totalTime: 40,
      price: 7000000,
      image: '/images/ielts-academic.jpg',
      type: 2,
      isPublish: true,
      rating: 4.5,
      feedbacks: 150
    };
  };
  const currCourse = getCoursesByProgramId(Number(Id) ?? 0);
  const lessonCourse = currCourse.map((course) =>
    getLessonsByCourseId(course.id)
  );

  const crumbs: Crumb[] = [
    {
      label: 'Homepage',
      href: '/',
      className: 'text-lg font-semibold'
    },
    {
      label: 'Self-study Program',
      href: '/self-study-program',
      className: ' text-lg font-semibold'
    },
    {
      label: `${dataProgramAPI(Number(Id)).title}`,
      href: `/self-study-program/${Id}`,
      className: ' text-lg font-semibold'
    }
  ];
  return (
    <div className="flex flex-col">
      <NavHeader />
      <div className="flex w-full bg-highlight py-3 xsm:px-4 sm:px-10 md:px-24 lg:px-36">
        <Breadcrumb crumbs={crumbs} />
      </div>
      <div className="w-full bg-primary">
        <div className="relative h-[212px] bg-outline-focus">
          <Image
            src={'/images/banner.svg'}
            alt="banner"
            fill
            className="object-cover"
          />

          <div className="absolute left-0 top-0 flex h-full w-full flex-col justify-center gap-4 p-16 text-surface xsm:px-4 sm:px-10 md:px-24 lg:px-36">
            <div className="truncate text-3xl font-bold">{`${dataProgramAPI(Number(Id) ?? 0).title}`}</div>{' '}
            {/**Chỗ cần sửa */}
            <div className="flex items-center gap-4">
              <div>
                {/**Chỗ cần sửa */}
                <Rating
                  rating={dataProgramAPI(Number(Id) ?? 0).rating}
                  maxStar={5}
                  size={20}
                />
              </div>
              <div className="text-xl">{`(${dataProgramAPI(Number(Id) ?? 0).feedbacks}) feedbacks`}</div>{' '}
              {/**Chỗ cần sửa */}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row bg-b-primary pb-16">
        <div className="h-full w-2/3 bg-b-primary">
          <div className="py-10 text-3xl font-bold text-on-surface xsm:px-4 sm:px-10 md:px-24 lg:px-36">
            Overview of the learning path
          </div>
          <div className="flex flex-col sm:gap-6 md:gap-10 lg:gap-14">
            <div className="flex justify-between xsm:flex-col xsm:px-4 sm:flex-col sm:gap-6 sm:px-10 md:flex-col md:px-24 lg:flex-row lg:px-36">
              <div className="flex h-[106px] w-[450px] justify-between rounded-[20px] border-2 border-outline xsm:w-[300px] sm:w-[400px] md:w-[400px]">
                <div className="flex flex-col justify-center truncate px-6">
                  <div className="truncate font-semibold text-on-primary sm:text-lg md:text-2xl lg:text-3xl">
                    {`${currCourse.length} milestone`} {/**Chỗ cần sửa */}
                  </div>
                  <div className="truncate text-on-surface sm:text-sm md:text-base lg:text-lg">
                    Allocation of learning path
                  </div>
                </div>
                <div className="flex justify-center px-6">
                  <Image
                    src={'/images/location.svg'}
                    alt="location"
                    width={50}
                    height={50}
                    className="hidden sm:block"
                  />
                </div>
              </div>
              <div className="flex h-[106px] w-[450px] justify-between rounded-[20px] border-2 border-outline xsm:w-[300px] sm:w-[400px] md:w-[400px]">
                <div className="flex flex-col justify-center truncate px-6">
                  <div className="truncate font-semibold text-on-primary sm:text-lg md:text-2xl lg:text-3xl">
                    {`${lessonCourse.length} lessons`} {/**Chỗ cần sửa */}
                  </div>
                  <div className="truncate text-on-surface sm:text-sm md:text-base lg:text-lg">
                    Correction with teacher
                  </div>
                </div>
                <div className="flex justify-center px-6">
                  <Image
                    src={'/images/quantityLesson.svg'}
                    alt="quantityLesson"
                    width={50}
                    height={50}
                    className="hidden sm:block"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between xsm:flex-col xsm:px-4 sm:flex-col sm:gap-6 sm:px-10 md:flex-col md:px-24 lg:flex-row lg:px-36">
              <div className="flex h-[106px] w-[450px] justify-between rounded-[20px] border-2 border-outline xsm:w-[300px] sm:w-[400px] md:w-[400px]">
                <div className="flex flex-col justify-center truncate px-6">
                  <div className="truncate font-semibold text-on-primary sm:text-lg md:text-2xl lg:text-3xl">
                    {`4 hours`} {/**Chỗ cần sửa */}
                  </div>
                  <div className="truncate text-on-surface sm:text-sm md:text-base lg:text-lg">
                    Own the roadmap
                  </div>
                </div>
                <div className="flex justify-center px-6">
                  <Image
                    src={'/images/hourglass_timeProgram.svg'}
                    alt="hourglass_timeProgram"
                    width={50}
                    height={50}
                    className="hidden sm:block"
                  />
                </div>
              </div>
              <div className="flex h-[106px] w-[450px] justify-between rounded-[20px] border-2 border-outline xsm:w-[300px] sm:w-[400px] md:w-[400px]">
                <div className="flex flex-col justify-center truncate px-6">
                  <div className="truncate font-semibold text-on-primary sm:text-lg md:text-2xl lg:text-3xl">
                    Toeic 700+ {/**Chỗ cần sửa */}
                  </div>
                  <div className="truncate text-on-surface sm:text-sm md:text-base lg:text-lg">
                    Commitment to output
                    <br></br>targets
                  </div>
                </div>
                <div className="flex justify-center px-6">
                  <Image
                    src={'/images/target.svg'}
                    alt="target"
                    width={70}
                    height={70}
                    className="hidden sm:block"
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="pb-6 pt-10 text-3xl font-bold text-on-surface xsm:px-4 sm:px-10 md:px-24 lg:px-36">
              Program detail
            </div>
            <div className="h-full xsm:px-4 sm:px-10 md:px-24 lg:px-36">
              <Accordion programId={Number(Id)} />
            </div>
          </div>
        </div>
        <div className="w-1/3 bg-b-primary py-16">
          <div className="flex justify-center">
            <OrderCard detail={dataProgramAPI(Number(Id) ?? 0)} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
