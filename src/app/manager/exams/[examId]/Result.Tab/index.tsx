import React from 'react';

type Props = {
  id: number;
  setIsModalNewTaskOpen?: (isOpen: boolean) => void;
};

// Define types for columns and data
interface Column {
  header: string;
  field: string;
  sortable?: boolean;
}

interface DynamicTableProps {
  columns: Column[];
  data: Record<string, any>[];
}

const columns: Column[] = [
  { header: 'No.', field: 'id', sortable: false },
  { header: 'Full Name', field: 'name', sortable: true },
  { header: 'Score', field: 'score', sortable: true }
];

const data: Record<string, any>[] = [
  { id: 1, name: 'NVB', score: 1 },
  { id: 2, name: 'LHD', score: 2 },
  { id: 3, name: 'TNCH', score: 3 },
  { id: 4, name: 'LT', score: 4 },
  { id: 5, name: 'NTTL', score: 5 }
];

const Result = ({ id }: Props) => {
  const averageScore =
    data.reduce((sum, row) => sum + (row.score || 0), 0) / data.length || 0;

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
                  className="border border-gray-200 px-4 py-2 text-left"
                >
                  {column.header}
                  {column.sortable && <i className="fas fa-sort ml-2"></i>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className="border border-gray-200 px-4 py-2"
                  >
                    {row[column.field]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td
                className="border border-gray-200 px-4 py-2"
                colSpan={columns.length - 1}
              >
                Average Score
              </td>
              <td className="border border-gray-200 px-4 py-2">
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
