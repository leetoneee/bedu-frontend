'use client';

import { Breadcrumb } from '@/components';
import { Column, Crumb } from '@/types';
import { Role } from '@/types/role.type';
import { Divider, Tooltip } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import axios from '@/libs/axiosInstance';
import useSWR from 'swr';
import { EyeIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const columns: Column<Role>[] = [
  { title: 'Name', key: 'name' },
  { title: 'Description', key: 'description' }
];

const PermistionPage = () => {
  const router = useRouter();

  const crumbs: Crumb[] = [
    {
      label: 'Permissions',
      href: '/manager/permissions'
    }
  ];

  const [roles, setRoles] = useState<Role[]>([]);

  const {
    data
    // isLoading,
    // error: classError,
    // mutate: refreshEndpoint
  } = useSWR(`/role`, fetcher);

  useEffect(() => {
    if (data && data.metadata) {
      setRoles(data.metadata);
    }
  }, [data]);

  return (
    <main className="flex flex-col items-center gap-4 p-4 sm:items-start">
      <Breadcrumb crumbs={crumbs} />
      <Divider />
      <div className="flex h-full w-full flex-col gap-4 rounded border border-on-surface/20 bg-white p-5 shadow-sm">
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
                <th
                  scope="col"
                  className="border border-gray-200 px-4 py-2 text-center"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {roles &&
                roles.map((row, rowIndex) => (
                  <tr key={rowIndex} className="text-center align-middle">
                    <td className="border border-gray-200 px-4 py-2">
                      {rowIndex + 1}
                    </td>
                    {columns.map((column, colIndex) => (
                      <td
                        key={colIndex}
                        className="border border-gray-200 px-4 py-2"
                      >
                        {row[column.key] as keyof Role}
                      </td>
                    ))}
                    <td className="border border-gray-200 px-4 py-2">
                      <Tooltip
                        content="View list grants"
                        className="h-full bg-on-primary"
                        delay={1000}
                      >
                        <span
                          className="flex cursor-pointer items-center justify-center text-lg text-on-primary active:opacity-50"
                          onClick={() => router.push(`permissions/${row.id}`)}
                        >
                          <EyeIcon className="size-5" />
                        </span>
                      </Tooltip>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default PermistionPage;
