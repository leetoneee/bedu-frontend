// 'use client';

import Link from 'next/link';
import React from 'react';
import { classNames } from '../classNames';
import { Tooltip } from '@nextui-org/react';

const SidebarItem = ({
  label,
  icon,
  path,
  active,
  isSidebarExpanded
}: {
  label: string;
  icon: React.ReactNode;
  path: string;
  active: boolean;
  isSidebarExpanded: boolean;
}) => {
  return (
    <>
      {isSidebarExpanded ? (
        <Link
          href={path}
          className={classNames(
            'relative flex h-full items-center whitespace-nowrap rounded-[100px] px-3 py-1.5 text-sm',
            active
              ? 'bg-highlight font-semibold text-outline-focus shadow-sm'
              : 'text-outline hover:bg-highlight hover:text-outline-focus'
          )}
        >
          <div className="relative flex flex-row items-center space-x-2 rounded-md text-sm duration-100">
            {icon}
            <span>{label}</span>
          </div>
        </Link>
      ) : (
        <Tooltip
          content={label}
          placement="right"
          color="foreground"
          delay={1000}
        >
          <Link
            href={path}
            className={classNames(
              'relative flex h-full items-center whitespace-nowrap rounded-md text-sm',
              active
                ? 'bg-highlight font-semibold text-outline-focus shadow-sm'
                : 'text-outline hover:bg-highlight hover:text-outline-focus'
            )}
          >
            <div className="font-base relative flex flex-row items-center space-x-2 rounded-md p-2 text-sm duration-100">
              {icon}
            </div>
          </Link>
        </Tooltip>
      )}
    </>
  );
};

export default SidebarItem;
