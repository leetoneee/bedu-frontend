import { Column } from '@/types';
import { ReportExam } from '@/types/exam.type';
import React, { useEffect, useState } from 'react';
import axios from '@/libs/axiosInstance';
import useSWR from 'swr';
import { formatNumberToOrdinal } from '@/helpers';

type Props = {
  examId: number;
  setIsModalNewTaskOpen?: (isOpen: boolean) => void;
};

// Define types for columns and data

const columns: Column<ReportExam>[] = [
  { title: 'Full name', key: 'name' },
  { title: 'Attempts', key: 'attempts' },
  { title: 'Total score', key: 'total' }
];

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const Result = ({ examId }: Props) => {
  const [reports, setReports] = useState<ReportExam[]>([]);
  const {
    data
    // isLoading,
    // error: classError,
    // mutate: refreshEndpoint
  } = useSWR(`/answers/result/${examId}`, fetcher);

  useEffect(() => {
    if (data && data.metadata) {
      setReports(data.metadata);
    }
  }, [data]);

  const averageScore =
    reports.reduce(
      (sum, row) => sum + (Number(row.total) || 0),
      0
    ) / reports.length || 0;

  return (
    <div className="flex h-full w-full flex-col gap-2 rounded rounded-t-none border-on-surface/20 bg-white p-5 shadow-sm">
      {/* Code ở đây */}
      <div className="container mx-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead className="bg-blue-100">
            <tr>
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
            {reports?.map((row, rowIndex) => (
              <tr key={rowIndex} className="text-center align-middle">
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className="border border-gray-200 px-4 py-2"
                  >
                    {column.key === 'total'
                      ? Number(row.total).toFixed(2)
                      : column.key === 'attempts'
                        ? formatNumberToOrdinal(row.attempts)
                        : (row[column.key] as keyof ReportExam)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="border border-gray-200 px-4 py-2" colSpan={2}>
                <strong>Average Score</strong>
              </td>
              <td className="border border-gray-200 px-4 py-2 text-center align-middle">
                {averageScore.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Result;
