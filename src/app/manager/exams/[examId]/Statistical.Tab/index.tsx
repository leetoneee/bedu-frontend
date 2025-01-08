import { Divider } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import axios from '@/libs/axiosInstance';
import useSWR from 'swr';

type Props = {
  examId: number;
  nameExam: string;
};

type BasicStatis = {
  averageScore: string;
  lessThanOne: number;
  greaterThanOrEqualFive: number;
  mostCommonScore: number;
  totalTries: number;
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const Statistical = ({ examId, nameExam }: Props) => {
  const [basic, setBasic] = useState<BasicStatis | null>(null);

  const {
    data: basicData
    // isLoading,
    // error: classError,
    // mutate: refreshEndpoint
  } = useSWR(`/answers/basicsStatistical/${examId}`, fetcher);

  useEffect(() => {
    if (basicData && basicData.metadata) {
      setBasic(basicData.metadata);
    }
  }, [basicData]);

  return (
    <div className="flex h-full w-full flex-col gap-2 rounded rounded-t-none border-on-surface/20 bg-white p-5 shadow-sm">
      {/* Code ở đây */}
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full flex-col">
          <span className="text-xl font-semibold text-on-surface">
            Basic statistics
          </span>
          <div className="flex items-center justify-center">
            <div className="flex flex-col space-x-8 rounded-lg bg-white p-8 shadow-md">
              <h1 className="mb-4 text-xl font-semibold">{nameExam}</h1>
              <div className="flex flex-row">
                <div className="mb-4 pr-8">
                  <div className="mb-4">
                    <i className="fas fa-edit mr-2 text-gray-400"></i>
                    <span className="text-gray-400">
                      NUMBER OF PARTICIPANTS
                    </span>
                    <div className="text-lg font-medium">
                      <i className="fas fa-edit mr-2 text-gray-400"></i>
                      10
                    </div>
                  </div>
                  <div className="mb-4">
                    <i className="fas fa-edit mr-2 text-gray-400"></i>
                    <span className="text-gray-400">TOTAL TRIES</span>
                    <div className="text-lg font-medium">
                      <i className="fas fa-edit mr-2 text-gray-400"></i>
                      {basic?.totalTries}
                    </div>
                  </div>
                </div>
                <div className="border-l border-gray-200 pl-8">
                  <div className="mb-4">
                    <span className="text-gray-400">AVERAGE SCORE</span>
                    <div className="text-lg font-medium">
                      {Number(basic?.averageScore).toFixed(2)}
                    </div>
                  </div>
                  <div className="mb-4">
                    <span className="text-gray-400">
                      NUMBER OF STUDENTS WITH SCORES &lt; 1
                    </span>
                    <div className="text-lg font-medium">
                      {basic?.lessThanOne}
                    </div>
                  </div>
                  <div className="mb-4">
                    <span className="text-gray-400">
                      NUMBER OF STUDENTS WITH SCORES &gt;= 5
                    </span>
                    <div className="text-lg font-medium">
                      {basic?.greaterThanOrEqualFive}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-400">
                      SCORE ACHIEVED BY THE MOST STUDENTS
                    </span>
                    <div className="text-lg font-medium">
                      {basic?.mostCommonScore}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Divider />
        <div className="flex w-full flex-col">
          {/* Title */}
          <span className="text-xl font-semibold text-on-surface">
            Score distribution
          </span>
        </div>
        <Divider />
        <div className="flex w-full flex-col">
          {/* Title */}
          <span className="text-xl font-semibold text-on-surface">
            Frequency Table
          </span>
        </div>
        <Divider />
        <div className="flex w-full flex-col">
          {/* Title */}
          <span className="text-xl font-semibold text-on-surface">
            Table of Corect and Incorrect Rates
          </span>
        </div>
      </div>
    </div>
  );
};

export default Statistical;
