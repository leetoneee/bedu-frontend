import { Divider } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import axios from '@/libs/axiosInstance';
import useSWR from 'swr';
import ScoreStaticChart from '@/components/Charts/ScoreStaticChart';

type Props = {
  examId: number;
  nameExam: string;
};

type BasicStatis = {
  studentJoinIn: number;
  averageScore: string;
  lessThanOne: number;
  greaterThanOrEqualFive: number;
  mostCommonScore: number;
  totalTries: number;
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const Statistical = ({ examId, nameExam }: Props) => {
  const [basic, setBasic] = useState<BasicStatis | null>(null);
  const [scoresDistribution, setScoresDistribution] = useState<number[]>([]);
  const {
    data: basicData
    // isLoading,
    // error: classError,
    // mutate: refreshEndpoint
  } = useSWR(`/answers/basicsStatistical/${examId}`, fetcher);

  const {
    data: scoreDisData
    // isLoading,
    // error: classError,
    // mutate: refreshEndpoint
  } = useSWR(`/answers/scoreDistributor/${examId}`, fetcher);

  useEffect(() => {
    if (basicData && basicData.metadata) {
      setBasic(basicData.metadata);
    }
  }, [basicData]);

  useEffect(() => {
    if (scoreDisData && scoreDisData.metadata) {
      setScoresDistribution(scoreDisData.metadata);
    }
  }, [scoreDisData]);

  //! Frequency table
  const totalParticipants = basic?.studentJoinIn;
  const totalTries = basic?.totalTries;
  const formattedData = scoresDistribution.map((quantity, index) => {
    if (!totalTries)
      return {
        quantity,
        percentage: `0`,
        label: `<${index + 1}` // Label for the column
      };
    const percentage = ((quantity / totalTries) * 100).toFixed(0); // Calculate percentage
    return {
      quantity,
      percentage: `${percentage}`,
      label: `<${index + 1}` // Label for the column
    };
  });

  // Additional columns: >=5 and Average
  const greaterThanOrEqualTo5 = scoresDistribution[9] - scoresDistribution[4];
  const greaterThanOrEqualTo5Percentage = (
    (greaterThanOrEqualTo5 / (totalTries ?? 1)) *
    100
  ).toFixed(0);

  const tableData = {
    participants: totalParticipants,
    columns: formattedData,
    greaterThanOrEqualTo5: {
      quantity: greaterThanOrEqualTo5,
      percentage: `${greaterThanOrEqualTo5Percentage}`
    }
  };

  return (
    <div className="flex h-full w-full flex-col gap-2 rounded rounded-t-none border-on-surface/20 bg-white p-5 shadow-sm">
      {/* Code ở đây */}
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full flex-col gap-2">
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
                      {basic?.studentJoinIn}
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
        <div className="flex w-full flex-col gap-2">
          {/* Title */}
          <span className="text-xl font-semibold text-on-surface">
            Score distribution
          </span>
          <div className="h-[550px] w-full">
            {scoresDistribution.length > 0 && (
              <ScoreStaticChart scores={scoresDistribution} />
            )}
          </div>
        </div>
        <Divider />
        <div className="flex w-full flex-col gap-2">
          {/* Title */}
          <span className="text-xl font-semibold text-on-surface">
            Frequency Table
          </span>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border border-gray-300 px-4 py-2" rowSpan={1}>
                    Quantity
                  </th>
                  <th className="border border-gray-300 px-4 py-2" colSpan={2}>
                    &lt; 1
                  </th>
                  <th className="border border-gray-300 px-4 py-2" colSpan={2}>
                    &lt; 2
                  </th>
                  <th className="border border-gray-300 px-4 py-2" colSpan={2}>
                    &lt; 3
                  </th>
                  <th className="border border-gray-300 px-4 py-2" colSpan={2}>
                    &lt; 4
                  </th>
                  <th className="border border-gray-300 px-4 py-2" colSpan={2}>
                    &lt; 5
                  </th>
                  <th className="border border-gray-300 px-4 py-2" colSpan={2}>
                    &lt; 6
                  </th>
                  <th className="border border-gray-300 px-4 py-2" colSpan={2}>
                    &lt; 7
                  </th>
                  <th className="border border-gray-300 px-4 py-2" colSpan={2}>
                    &lt; 8
                  </th>
                  <th className="border border-gray-300 px-4 py-2" colSpan={2}>
                    &lt; 9
                  </th>
                  <th className="border border-gray-300 px-4 py-2" colSpan={2}>
                    &lt;= 10
                  </th>
                  <th className="border border-gray-300 px-4 py-2" colSpan={2}>
                    <span className="text-nowrap">Average(&gt;= 5)</span>
                  </th>
                </tr>
                <tr className="bg-blue-100">
                  <th className="border border-gray-300 px-4 py-2">
                    Participants
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Q</th>
                  <th className="border border-gray-300 px-4 py-2">%</th>
                  <th className="border border-gray-300 px-4 py-2">Q</th>
                  <th className="border border-gray-300 px-4 py-2">%</th>
                  <th className="border border-gray-300 px-4 py-2">Q</th>
                  <th className="border border-gray-300 px-4 py-2">%</th>
                  <th className="border border-gray-300 px-4 py-2">Q</th>
                  <th className="border border-gray-300 px-4 py-2">%</th>
                  <th className="border border-gray-300 px-4 py-2">Q</th>
                  <th className="border border-gray-300 px-4 py-2">%</th>
                  <th className="border border-gray-300 px-4 py-2">Q</th>
                  <th className="border border-gray-300 px-4 py-2">%</th>
                  <th className="border border-gray-300 px-4 py-2">Q</th>
                  <th className="border border-gray-300 px-4 py-2">%</th>
                  <th className="border border-gray-300 px-4 py-2">Q</th>
                  <th className="border border-gray-300 px-4 py-2">%</th>
                  <th className="border border-gray-300 px-4 py-2">Q</th>
                  <th className="border border-gray-300 px-4 py-2">%</th>
                  <th className="border border-gray-300 px-4 py-2">Q</th>
                  <th className="border border-gray-300 px-4 py-2">%</th>
                  <th className="border border-gray-300 px-4 py-2">Q</th>
                  <th className="border border-gray-300 px-4 py-2">%</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">
                    {tableData.participants}
                  </td>
                  {tableData.columns.map((col, index) => (
                    <React.Fragment key={index}>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {col.quantity}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {col.percentage}
                      </td>
                    </React.Fragment>
                  ))}
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {tableData.greaterThanOrEqualTo5.quantity}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {tableData.greaterThanOrEqualTo5.percentage}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Divider />
        <div className="flex w-full flex-col gap-2">
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
