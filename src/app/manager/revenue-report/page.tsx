'use client';

import Breadcrumb from '@/components/Breadcrumb';
import { AuthType, Column, Crumb } from '@/types';
import { Chip, Divider, Spinner } from '@nextui-org/react';
import { useContext, useEffect, useState } from 'react';
import axios from '@/libs/axiosInstance';
import useSWR from 'swr';
import { Payment } from '@/types/payment.type';
import PaymentChart, {
  PaymentChartType
} from '@/components/Charts/PaymentChart';
import { ButtonSolid } from '@/components';
import * as XLSX from 'xlsx';
import { formatNumberWithCommas } from '@/helpers';
import { AppContext } from '@/contexts';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const columns: Column<Payment>[] = [
  { title: 'Code', key: 'class' },
  { title: 'Program name', key: 'program' },
  { title: 'User', key: 'user' },
  { title: 'Transaction ID', key: 'transactionId' },
  { title: 'Method', key: 'paymentMethod' },
  { title: 'Amount', key: 'amount' },
  { title: 'Status', key: 'status' }
];

export default function RevenuePage() {
  const { auth } = useContext(AppContext) as AuthType;

  const crumbs: Crumb[] = [
    {
      label: 'Revenue Report',
      href: '/manager/revenue-report'
    }
  ];

  const [filter, setFilter] = useState<string | 'all'>('all'); // 'ielts', 'toeic', 'toefl', or null
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [payments, setPayments] = useState<Payment[]>([]);
  const [chartData, setChartData] = useState<PaymentChartType[]>([]);

  const handleFilterChange = (newFilter: string | 'all') => {
    setFilter((prevFilter) => (prevFilter === newFilter ? 'all' : newFilter));
  };

  const endpoint = `/payments/export/${startDate}/${endDate}/${filter}`;
  const endpoint2 = `/payments/search/${startDate}/${endDate}/${filter}`;

  const {
    data: exportData,
    error,
    isLoading,
    mutate: refreshEndpoint
  } = useSWR(endpoint, fetcher, {
    keepPreviousData: true
  });
  const {
    data: searchData
    // error,
    // isLoading,
    // mutate: refreshEndpoint
  } = useSWR(endpoint2, fetcher, {
    keepPreviousData: true
  });

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const startOfYear = new Date(currentYear, 0, 1); // Tháng 0 (January), ngày 1
    const today = new Date();

    const formatDate = (date: Date) => date.toISOString().split('T')[0];
    setStartDate(formatDate(startOfYear));
    setEndDate(formatDate(today));
  }, []);

  useEffect(() => {
    if (exportData && exportData.metadata) {
      setPayments(exportData.metadata);
    }
  }, [exportData]);

  useEffect(() => {
    if (searchData && searchData.metadata) {
      setChartData(searchData.metadata);
    }
  }, [searchData]);

  const exportToExcel = () => {
    // 1. Tạo một mảng chứa tiêu đề và thông tin báo cáo
    const start = new Date(startDate).toLocaleString('vi-VN', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit'
    });
    const end = new Date(endDate).toLocaleString('vi-VN', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit'
    });
    const reportTitle = `Report month revenue from ${start} to ${end}`;
    const exportDate = new Date().toLocaleString('vi-VN', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit'
    });
    const exportedBy = auth && auth.name;
    const headerInfo = [
      [`${reportTitle}`], // Dòng 1: Tiêu đề báo cáo
      [`Report Date: ${exportDate}`], // Dòng 2: Ngày xuất báo cáo
      [`Exported By: ${exportedBy}`], // Dòng 3: Người xuất báo cáo
      [] // Dòng trống trước bảng dữ liệu
    ];

    // 2. Tạo dữ liệu bảng chính
    const mainData = [
      [
        'No.',
        'Program Name',
        'User Name',
        'Transaction ID',
        'Method',
        'Amount',
        'Status'
      ], // Header
      ...payments.map((payment, index) => [
        index + 1, // No.
        payment.program
          ? payment.program.title
          : payment.class
            ? payment.class.name
            : null, // Program Name
        payment.user ? payment.user.name : null, // User Name
        payment.transactionId, // Transaction ID
        payment.paymentMethod ? payment.paymentMethod.name : null, // Method
        payment.amount, // Amount
        payment.status // Status
      ])
    ];

    const finalData = [...headerInfo, ...mainData];

    const worksheet = XLSX.utils.aoa_to_sheet(finalData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');

    // Tạo file blob và tải xuống
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'export.xlsx';
    link.click();
  };

  return (
    <main className="flex flex-col items-center gap-4 p-4 sm:items-start">
      <Breadcrumb crumbs={crumbs} />
      <Divider />
      <div className="flex h-full w-full flex-col gap-4 rounded border border-on-surface/20 bg-white p-5 shadow-sm">
        <div className="flex flex-row gap-10">
          {/* Start Date*/}
          <div className="flex flex-row gap-2">
            <span className="text-nowrap text-base text-black">Start Date</span>
            <input
              type="date"
              className={
                'h-16 rounded-[10px] border border-outline bg-b-primary p-5 text-2xl sm:h-12 sm:text-xl'
              }
              placeholder="Le Toan"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="flex flex-row gap-2">
            <span className="text-nowrap text-base text-black">End Date</span>
            <input
              type="date"
              className={
                'h-16 rounded-[10px] border border-outline bg-b-primary p-5 text-2xl sm:h-12 sm:text-xl'
              }
              placeholder="Le Toan"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <Divider />
        {/* Filter */}
        <div className="flex w-full flex-row gap-16">
          <div className="w-20 justify-center">
            <Chip
              className="select-none capitalize hover:cursor-pointer"
              color={'danger'}
              size="lg"
              variant={filter === 'ielts' ? 'flat' : 'bordered'}
              onClick={() => handleFilterChange('ielts')}
            >
              IELTS
            </Chip>
          </div>
          <div className="w-20 justify-center">
            <Chip
              className="select-none capitalize hover:cursor-pointer"
              color={'warning'}
              size="lg"
              variant={filter === 'toeic' ? 'flat' : 'bordered'}
              onClick={() => handleFilterChange('toeic')}
            >
              TOEIC
            </Chip>
          </div>
          <div className="w-20 justify-center">
            <Chip
              className="select-none capitalize hover:cursor-pointer"
              color={'success'}
              size="lg"
              variant={filter === 'toefl' ? 'flat' : 'bordered'}
              onClick={() => handleFilterChange('toefl')}
            >
              TOEFL
            </Chip>
          </div>
        </div>
        <div className="h-[550px] w-full">
          {!chartData && <Spinner />}
          {chartData.length > 0 && <PaymentChart data={chartData} />}
        </div>
        <Divider />
        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full flex-row items-center justify-between">
            <span className="text-xl font-semibold text-on-surface">
              Payments Information
            </span>
            <ButtonSolid
              content="Export"
              className="shadow-m/d my-auto ml-auto h-14 rounded-xl bg-blue-500 text-white"
              // iconLeft={<PlusIcon className="size-6 text-white" />}
              onClick={exportToExcel}
            />
          </div>
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
                {payments &&
                  payments.map((row, rowIndex) => (
                    <tr key={rowIndex} className="text-center align-middle">
                      <td className="border border-gray-200 px-4 py-2">
                        {rowIndex + 1}
                      </td>
                      {columns.map((column, colIndex) => (
                        <td
                          key={colIndex}
                          className="border border-gray-200 px-4 py-2"
                        >
                          {column.key === 'user' && row.user
                            ? row.user.name
                            : column.key === 'program'
                              ? row.program
                                ? row.program.title
                                : row.class.name
                              : column.key === 'class'
                                ? row.class
                                  ? row.class.code
                                  : row.program.code
                                : column.key === 'paymentMethod' &&
                                    row.paymentMethod
                                  ? row.paymentMethod.name
                                  : column.key === 'amount'
                                    ? `${formatNumberWithCommas(Number(row.amount).toFixed(0))}  VND`
                                    : (row[column.key] as keyof Payment)}
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>
            {!exportData && <Spinner />}
          </div>
        </div>
      </div>
    </main>
  );
}
