'use client';

import { Divider } from '@nextui-org/react';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ButtonSolid } from '@/components';
import useSWR from 'swr';
import { User } from '@/types/user.type';
import axios from '@/libs/axiosInstance';
import { AuthType } from '@/types';
import { AppContext } from '@/contexts';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const Profile = () => {
  const { auth } = useContext(AppContext) as AuthType;
  const router = useRouter();
  const [user, setUser] = useState<User>();
  const {
    data
    // isLoading,
    // error: courseError,
    // mutate: refreshEndpoint
  } = useSWR(`/users/item/${auth?.id}`, fetcher);

  useEffect(() => {
    if (data) {
      setUser(data.metadata);
    }
  }, [data]);

  return (
    <div className="flex w-full flex-col rounded-[4px] border border-outline bg-highlight p-6">
      <span className="text-2xl font-extrabold text-on-surface">
        Personal Information
      </span>
      <div className="my-2 flex w-full flex-col gap-1">
        {/* Full name */}
        <div className="flex flex-row items-center justify-between">
          <span>Full name</span>
          <span>{user?.name}</span>
        </div>
        <Divider />
        {/* Gender */}
        <div className="flex flex-row items-center justify-between">
          <span>Gender</span>
          <span className="capitalize">{user?.gender}</span>
        </div>
        <Divider />
        {/* Birthday */}
        <div className="flex flex-row items-center justify-between">
          <span>Birthday</span>
          <span>
            {user &&
              new Date(user.birthday.toString()).toLocaleDateString('vi-VE', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
              })}
          </span>
        </div>
        <Divider />
        {/* Address */}
        <div className="flex flex-row items-center justify-between">
          <span>Address</span>
          <span>{user?.address}</span>
        </div>
        <Divider />
        {/* Email */}
        <div className="flex flex-row items-center justify-between">
          <span>Email</span>
          <span>{user?.email}</span>
        </div>
        <Divider />
        {/* Phone */}
        <div className="flex flex-row items-center justify-between">
          <span>Phone number</span>
          <span>{user?.phone}</span>
        </div>
        <Divider />
        {/* Customer code */}
        <div className="flex flex-row items-center justify-between">
          <span>Customer code</span>
          <span>{user?.cid}</span>
        </div>
        <Divider />
      </div>
      <div className="mt-4 flex w-full flex-row place-content-end gap-7">
        <ButtonSolid
          className="w-52 place-content-center rounded-md bg-on-primary text-white"
          content="Change password"
          onClick={() => router.push('profile/change-password')}
        />
        <ButtonSolid
          className="w-52 place-content-center rounded-md bg-on-primary text-white"
          content="Edit information"
          onClick={() => router.push('profile/edit')}
        />
      </div>
    </div>
  );
};

export default Profile;
