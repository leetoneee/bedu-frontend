'use client';

import { Breadcrumb, ButtonSolid } from '@/components';
import { Column, Crumb } from '@/types';
import { Role } from '@/types/role.type';
import { Divider, Tooltip, useDisclosure } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import axios from '@/libs/axiosInstance';
import useSWR from 'swr';
import { EyeIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import AddRoleModal from './AddRole.modal';
import { toast } from 'react-toastify';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const columns: Column<Role>[] = [
  { title: 'Name', key: 'name' },
  { title: 'Description', key: 'description' }
];

const PermistionPage = () => {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const crumbs: Crumb[] = [
    {
      label: 'Permissions',
      href: '/manager/permissions'
    }
  ];

  const [roles, setRoles] = useState<Role[]>([]);

  const {
    data,
    // isLoading,
    // error: classError,
    mutate: refreshEndpoint
  } = useSWR(`/role`, fetcher);

  useEffect(() => {
    if (data && data.metadata) {
      setRoles(data.metadata);
    }
  }, [data]);

  const handleCreated = () => {
    toast.success('Role created successfully!');
    refreshEndpoint();
  };

  return (
    <main className="flex flex-col items-center gap-4 p-4 sm:items-start">
      <Breadcrumb crumbs={crumbs} />
      <Divider />
      <div className="flex h-full w-full flex-col gap-4 rounded border border-on-surface/20 bg-white p-5 shadow-sm">
        <div className="flex w-full flex-row items-center justify-between">
          <span className="text-xl font-semibold text-on-surface">
            Roles List
          </span>
          <ButtonSolid
            content="Create"
            className="shadow-m/d my-auto ml-auto h-14 rounded-xl bg-blue-500 text-white"
            // iconLeft={<PlusIcon className="size-6 text-white" />}
            onClick={onOpen}
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
                        content="View grants list"
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
      <AddRoleModal
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        onCreated={handleCreated}
      />
    </main>
  );
};

export default PermistionPage;
