'use client';

import { Breadcrumb } from '@/components';
import { Crumb } from '@/types';
import { Permission, Resource, Role } from '@/types/role.type';
import { Divider } from '@nextui-org/react';
import { useParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import axios from '@/libs/axiosInstance';
import useSWR from 'swr';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const GrantPage = () => {
  const params = useParams();
  const roleId = params.roleId;

  const [role, setRole] = useState<Role | null>(null);
  const [resources, setResources] = useState<Resource[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);

  const crumbs: Crumb[] = useMemo(() => {
    return [
      {
        label: 'Permissions',
        href: '/manager/permissions'
      },
      {
        label: role?.name.toUpperCase() || 'Loading...',
        href: `/permissions/${roleId}`
      }
    ];
  }, [roleId, role]);

  const {
    data: roleData
    // isLoading,
    // error: classError,
    // mutate: refreshEndpoint
  } = useSWR(`/role`, fetcher);

  const {
    data: permissionsData
    // isLoading,
    // error: classError,
    // mutate: refreshEndpoint
  } = useSWR(`/role/grant/${roleId}`, fetcher);

  const {
    data: resourcesData
    // isLoading,
    // error: classError,
    // mutate: refreshEndpoint
  } = useSWR(`/role/resource`, fetcher);

  useEffect(() => {
    if (roleData && roleData.metadata) {
      const roles: Role[] = roleData.metadata;
      const role = roles.find((role) => (role.id = Number(roleId)));
      if (role) setRole(role);
      else setRole(null);
    }
  }, [roleData]);

  useEffect(() => {
    if (
      resourcesData &&
      resourcesData.metadata &&
      resourcesData.metadata.resources
    ) {
      setResources(resourcesData.metadata.resources);
    }
  }, [resourcesData]);

  useEffect(() => {
    if (permissionsData && permissionsData.metadata) {
      setPermissions(permissionsData.metadata);
    }
  }, [permissionsData]);

  // Hàm kiểm tra action có tồn tại trong permissions hay không
  const getActionType = (resourceName: string, actionType: string) => {
    const permission = permissions.find(
      (perm) =>
        perm.resource === resourceName && perm.action.startsWith(actionType)
    );
    return permission ? permission.action.split(':')[1] : 'none'; // Trả về "own" hoặc "any"
  };

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
                  Resource
                </th>
                <th
                  scope="col"
                  className="border border-gray-200 px-4 py-2 text-center"
                >
                  Create
                </th>
                <th
                  scope="col"
                  className="border border-gray-200 px-4 py-2 text-center"
                >
                  Read
                </th>
                <th
                  scope="col"
                  className="border border-gray-200 px-4 py-2 text-center"
                >
                  Update
                </th>
                <th
                  scope="col"
                  className="border border-gray-200 px-4 py-2 text-center"
                >
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {resources.map((resource) => (
                <tr key={resource.id} className="text-center align-middle">
                  <td className="border border-gray-200 px-4 py-2">
                    {resource.name}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {getActionType(resource.name, 'create')}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {getActionType(resource.name, 'read')}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {getActionType(resource.name, 'update')}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {getActionType(resource.name, 'delete')}
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

export default GrantPage;
