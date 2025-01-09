'use client';

import { Breadcrumb, LessonPreview, OrderCard, Rating } from '@/components';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Crumb } from '@/types';
import useSWR from 'swr';
import axios from '@/libs/axiosInstance';
import { EClass } from '@/types/class.type';
import { Lesson } from '@/types/lesson.type';
import { Divider } from '@nextui-org/react';
import { TypeContext } from '@/contexts';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const ClassPage = () => {
  const params = useParams();
  const classId = params.classId;
  const {setType} = useContext(TypeContext);
  setType('eclass');

  const { data, error } = useSWR(`/classes/item/${classId}`, fetcher);

  const rating = 4.5;
  const feedbacks = 150;

  const [eclass, setEClass] = useState<EClass>();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [totalTime, setTotalTime] = useState<number>(0);

  const crumbs: Crumb[] = useMemo(() => {
    return [
      {
        label: 'Live Program',
        href: '/live-program'
      },
      {
        label: eclass?.name || 'Loading...',
        href: `/live-program/${eclass?.id}`
      }
    ];
  }, [classId, eclass]);

  useEffect(() => {
    if (error) {
      setEClass(undefined);
      setLessons([]);
    }
    if (data?.metadata) {
      setEClass(data.metadata);
      setLessons(data.metadata.lesson);
    }
  }, [data]);

  useEffect(() => {
    if (eclass) {
      const totalTime = lessons.reduce((acc, lesson) => {
        const startDate = new Date(lesson.startDate);
        const endDate = new Date(lesson.endDate);
        return acc + (endDate.getTime() - startDate.getTime()) / 3600000;
      }, 0);
      setTotalTime(totalTime);
    }
  }, [eclass]);

  if (error) {
    return <div>Fail to load class data</div>;
  }

  return (
    <main className="flex flex-col items-center gap-4 p-4 sm:items-start">
      <Breadcrumb crumbs={crumbs} />
      <Divider />
      <div className="flex w-full flex-col gap-4">
        <div className="w-full overflow-hidden rounded-b-[40px] bg-primary">
          <div className="relative h-[212px] bg-outline-focus">
            <Image
              src={'/images/banner.svg'}
              alt="banner"
              fill
              className="overflow-hidden object-cover"
            />

            <div className="absolute left-0 top-0 flex h-full w-full flex-col justify-center gap-4 p-16 text-surface xsm:px-4 sm:px-10 md:px-24 lg:px-36">
              <div className="text-3xl font-bold">
                {eclass?.name} - {eclass?.code}
              </div>
              <div className="text-2xl font-semibold">
                {eclass?.description}
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <Rating rating={rating} maxStar={5} size={20} />
                </div>
                <div className="text-xl">{feedbacks}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row bg-b-primary pb-16">
          <div className="h-full w-2/3 bg-b-primary">
            <div className="px-24 py-10 text-3xl font-bold text-on-surface lg:px-36">
              Overview of the learning path
            </div>
            <div className="flex flex-col sm:gap-6 md:gap-10 lg:gap-14">
              <div className="flex justify-between xsm:flex-col xsm:px-4 sm:flex-col sm:gap-6 sm:px-10 md:flex-col md:px-24 lg:flex-row lg:px-36">
                <div className="flex h-[106px] w-[450px] justify-between rounded-[20px] border-2 border-outline xsm:w-[300px] sm:w-[400px] md:w-[400px]">
                  <div className="flex flex-col justify-center truncate px-6">
                    <div className="truncate font-semibold text-on-primary sm:text-lg md:text-2xl lg:text-3xl">
                      {lessons.length}{' '}
                      {lessons.length > 1 ? 'lessons' : 'lesson'}{' '}
                      {/**Chỗ cần sửa */}
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
                      {totalTime} {totalTime > 1 ? 'hours' : 'hour'}
                    </div>
                    <div className="truncate text-on-surface sm:text-sm md:text-base lg:text-lg">
                      Total time to complete
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
                      {eclass &&
                        new Date(eclass?.startDate).toLocaleDateString(
                          'vi-VE',
                          {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          }
                        )}
                    </div>
                    <div className="truncate text-on-surface sm:text-sm md:text-base lg:text-lg">
                      First day of class
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
                  <div className="flex w-full flex-col justify-center truncate px-6">
                    <div className="truncate font-semibold text-on-primary sm:text-lg md:text-2xl lg:text-3xl">
                      {eclass?.type.toUpperCase()}
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
                Class detail
              </div>
              <div className="h-full xsm:px-4 sm:px-10 md:px-24 lg:px-36">
                {lessons && lessons.length > 0 && (
                  <LessonPreview lessons={lessons} />
                )}
              </div>
            </div>
          </div>
          <div className="w-1/3 bg-b-primary py-16">
            <div className="flex justify-center">
              {eclass && <OrderCard detail={eclass} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ClassPage;
