'use client';

import { Divider } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ButtonSolid } from '@/components';

const Profile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <div className="flex w-full flex-col rounded-[4px] border border-outline bg-highlight p-6">
      <span className="text-2xl font-extrabold text-on-surface">
        Personal Information
      </span>
      <div className="my-2 flex w-full flex-col gap-1">
        {/* Full name */}
        <div className="flex flex-row items-center justify-between">
          <span>Full name</span>
          <span>{session?.user.firstName}</span>
        </div>
        <Divider />
        {/* Gender */}
        <div className="flex flex-row items-center justify-between">
          <span>Gender</span>
          <span>{session?.user.gender}</span>
        </div>
        <Divider />
        {/* Birthday */}
        <div className="flex flex-row items-center justify-between">
          <span>Birthday</span>
          <span>{session?.user.lastName}</span>
        </div>
        <Divider />
        {/* Email */}
        <div className="flex flex-row items-center justify-between">
          <span>Email</span>
          <span>{session?.user.email}</span>
        </div>
        <Divider />
        {/* Phone */}
        <div className="flex flex-row items-center justify-between">
          <span>Phone number</span>
          <span>{session?.user.firstName}</span>
        </div>
        <Divider />
        {/* Customer code */}
        <div className="flex flex-row items-center justify-between">
          <span>Customer code</span>
          <span>{session?.user.id}</span>
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
