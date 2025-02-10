'use client';

import { Divider } from '@nextui-org/react';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import axios from '@/libs/axiosInstance';
import useSWR from 'swr';
import ScoreStaticChart from '@/components/Charts/ScoreStaticChart';
import { AuthType, Column, Crumb } from '@/types';
import { formatNumberToOrdinal } from '@/helpers';
import { useParams } from 'next/navigation';
import { AppContext } from '@/contexts';
import { Breadcrumb } from '@/components';
import { EClass } from '@/types/class.type';

type BasicStatis = {
  totalExam: number;
  doneExam: number;
  averageScore: number;
  highestScore: number;
  lowestScore: string;
  scoreTable: ReportScore[];
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

type ReportScore = {
  userId: number;
  name: string;
  examName: string;
  attempts: number;
  total: string;
};

const columns: Column<ReportScore>[] = [
  { title: 'Exam name', key: 'examName' },
  { title: 'Full name', key: 'name' },
  { title: 'Attempts', key: 'attempts' },
  { title: 'Total score', key: 'total' }
];

const OutcomePage = () => {
  const { auth } = useContext(AppContext) as AuthType;
  const [basic, setBasic] = useState<BasicStatis | null>(null);
  // const [scoresDistribution, setScoresDistribution] = useState<number[]>([]);
  const [scoreData, setScoreData] = useState<ReportScore[]>([]);
  const [eclass, setEClass] = useState<EClass>();

  const params = useParams();
  const classId = params.eclassId;

  const crumbs: Crumb[] = useMemo(() => {
    return [
      {
        label: 'My Classes',
        href: '/my/eclasses'
      },
      {
        label: eclass?.name || 'Loading...',
        href: `/my/eclasses/${eclass?.id}`
      },
      {
        label: 'Learning Process',
        href: `/live-program/${eclass?.id}`
      }
    ];
  }, [classId, eclass]);

  const { data, error, isLoading } = useSWR(
    `/classes/item/${classId}`,
    fetcher
  );

  const {
    data: basicData
    // isLoading,
    // error: classError,
    // mutate: refreshEndpoint
  } = useSWR(`/answers/student/${auth?.id}/class/${classId}`, fetcher);

  useEffect(() => {
    if (basicData && basicData.metadata) {
      setBasic(basicData.metadata);
    }
  }, [basicData]);

  useEffect(() => {
    if (error) {
      setEClass(undefined);
    }
    if (data?.metadata) {
      setEClass(data.metadata);
    }
  }, [data]);

  useEffect(() => {
    if (basic) {
      setScoreData(basic.scoreTable);
    }
  }, [basic]);

  const countDistinctExamNames = (scoreTable: ReportScore[]): number => {
    const uniqueExamNames = new Set(scoreTable.map((row) => row.examName));
    return uniqueExamNames.size;
  };

  const averageScore =
    scoreData.reduce((sum, row) => sum + (Number(row.total) || 0), 0) /
      scoreData.length || 0;

  return (
    <main className="flex flex-col items-center gap-4 p-4 sm:items-start">
      <Breadcrumb crumbs={crumbs} />
      <Divider />

      <div className="flex h-full w-full flex-col gap-2 rounded rounded-t-none border-on-surface/20 bg-white p-5 shadow-sm">
        {/* Code ở đây */}
        <div className="flex w-full flex-col gap-6">
          <div className="flex w-full flex-col gap-2">
            <span className="text-xl font-semibold text-on-surface">
              Basic statistics
            </span>
            <div className="flex items-center justify-center">
              <div className="flex flex-col space-x-8 rounded-lg bg-white p-8 shadow-md">
                <div className="flex flex-row">
                  <div className="mb-4 pr-8">
                    <div className="mb-4">
                      <i className="fas fa-edit mr-2 text-gray-400"></i>
                      <span className="text-gray-400">TOTAL EXERCISES</span>
                      <div className="text-lg font-medium">
                        <i className="fas fa-edit mr-2 text-gray-400"></i>
                        {basic?.totalExam}
                      </div>
                    </div>
                    <div className="mb-4">
                      <i className="fas fa-edit mr-2 text-gray-400"></i>
                      <span className="text-gray-400">
                        NUMBER OF EXERCISES DONE
                      </span>
                      <div className="text-lg font-medium">
                        <i className="fas fa-edit mr-2 text-gray-400"></i>
                        {basic && basic.scoreTable
                          ? countDistinctExamNames(basic.scoreTable)
                          : 0}
                      </div>
                    </div>
                  </div>
                  <div className="border-l border-gray-200 pl-8">
                    <div className="mb-4">
                      <span className="text-gray-400">HIGHEST SCORE</span>
                      <div className="text-lg font-medium">
                        {Number(basic?.highestScore).toFixed(2)}
                      </div>
                    </div>
                    <div className="mb-4">
                      <span className="text-gray-400">LOWEST SCORE</span>
                      <div className="text-lg font-medium">
                        {basic?.lowestScore}
                      </div>
                    </div>
                    <div className="mb-4">
                      <span className="text-gray-400">AVERAGE SCORE</span>
                      <div className="text-lg font-medium">
                        {averageScore.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <Divider />
        <div className="flex w-full flex-col gap-2">
          <span className="text-xl font-semibold text-on-surface">
            Score distribution
          </span>
          <div className="h-[550px] w-full">
            {scoresDistribution.length > 0 && (
              <ScoreStaticChart scores={scoresDistribution} />
            )}
          </div>
        </div> */}

          <Divider />
          <div className="flex w-full flex-col gap-2">
            {/* Title */}
            <span className="text-xl font-semibold text-on-surface">
              Table of exercises
            </span>
            <div className="container mx-auto">
              <table className="min-w-full border-collapse border border-gray-200">
                <thead className="bg-blue-100">
                  <tr>
                    <th
                      scope="col"
                      className="border border-gray-200 px-4 py-2 text-center"
                    >
                      No.
                    </th>
                    {columns.map((column, index) => (
                      <th
                        key={index}
                        scope="col"
                        className="border border-gray-200 px-4 py-2 text-center"
                      >
                        {column.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {scoreData?.map((row, rowIndex) => (
                    <tr key={rowIndex} className="text-center align-middle">
                      <td className="border border-gray-200 px-4 py-2">
                        {rowIndex + 1}
                      </td>
                      {columns.map((column, colIndex) => (
                        <td
                          key={colIndex}
                          className="border border-gray-200 px-4 py-2"
                        >
                          {column.key === 'attempts'
                            ? formatNumberToOrdinal(row.attempts)
                            : (row[column.key] as keyof ReportScore)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td
                      className="border border-gray-200 px-4 py-2"
                      colSpan={4}
                    >
                      <strong>Average Score</strong>
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-center align-middle">
                      <strong>{averageScore.toFixed(2)}</strong>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default OutcomePage;
