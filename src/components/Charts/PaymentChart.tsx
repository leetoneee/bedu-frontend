import { formatNumberWithCommas } from '@/helpers';
import { Payment } from '@/types/payment.type';
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  // Legend,
  ResponsiveContainer,
  TooltipProps
} from 'recharts';

export type PaymentChartType = {
  month: string;
  value: number;
};

type Props = {
  data: PaymentChartType[];
};

const PaymentChart = ({ data }: Props) => {
  return (
    <div className="flex h-[34rem] flex-1 flex-col rounded-sm border border-gray-300 bg-white p-4">
      <strong className="self-center text-4xl font-bold text-gray-700">
        MONTH REVENUE
      </strong>
      <div className="mt-10 w-full flex-1 text-xl">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 10
            }}
          >
            <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip content={CustomTooltip} />
            {/* <Legend /> */}
            <Bar dataKey="value" fill="#295782" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PaymentChart;

const CustomTooltip = ({ active, payload, label }: TooltipProps<any, any>) => {
  if (active && payload && payload.length) {
    const amount = payload[0].payload.value;

    const convertToMonthYear = (dateString: string): string => {
      // Tách năm và tháng từ chuỗi
      const [year, month] = dateString.split('-');

      // Tạo đối tượng Date
      const date = new Date(Number(year), Number(month) - 1); // Trừ 1 vì tháng trong JS bắt đầu từ 0

      // Lấy tên tháng và năm
      const options: Intl.DateTimeFormatOptions = {
        month: 'long',
        year: 'numeric'
      };
      return date.toLocaleDateString('en-US', options);
    };

    return (
      <div className="flex flex-col gap-4 rounded-md bg-white p-4">
        <p className="text-xl font-medium">{convertToMonthYear(label)}</p>
        <p className="text-base text-[#0ea5e9]">
          Total amount: {formatNumberWithCommas(amount)} VND
        </p>
      </div>
    );
  }
};
