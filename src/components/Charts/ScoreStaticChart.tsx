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

type Props = {
  scores: number[];
};

type ScoreChartType = {
  name: string;
  quantity: number;
};

const ScoreStaticChart = ({ scores }: Props) => {
  const formattedData: ScoreChartType[] = scores.map((quantity, index) => ({
    name: index + 1 === 10 ? `<= 10` : `< ${index + 1}`, // '<1', '<2', ..., '<=10'
    quantity // giá trị quantity tương ứng
  }));

  return (
    <div className="flex h-[34rem] flex-1 flex-col rounded-sm border border-gray-300 bg-white p-4">
      <strong className="self-center text-4xl font-bold text-gray-700">
        EXAM SCORE STATISTICS
      </strong>
      <div className="mt-10 w-full flex-1 text-xl">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={formattedData}
            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 10
            }}
          >
            <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={CustomTooltip} />
            {/* <Legend /> */}
            <Bar dataKey="quantity" fill="#295782" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ScoreStaticChart;

const CustomTooltip = ({ active, payload, label }: TooltipProps<any, any>) => {
  if (active && payload && payload.length) {
    const quantity = payload[0].payload.quantity;

    return (
      <div className="flex flex-col gap-4 rounded-md bg-white p-4">
        <p className="text-xl font-medium">score {label}</p>
        <p className="text-base text-[#0ea5e9]">Quantity: {quantity}</p>
      </div>
    );
  }
};
