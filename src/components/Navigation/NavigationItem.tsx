import Link from 'next/link';
import React, { ReactNode } from 'react'
import { classNames } from '../classNames';

const NavigationItem = ({
  label,
  icon,
  path,
  active,
}: {
  label: string;
  icon: ReactNode;
  path: string;
  active: boolean;
}) => {
  return (
    <Link
          href={path}
          className={classNames(
            'relative flex h-full items-center whitespace-nowrap rounded-md px-3 py-1.5 text-base',
            active
              ? 'bg-on-primary font-medium text-b-primary shadow-sm'
              : 'text-on-surface hover:bg-on-primary/10'
          )}
        >
          <div className="relative flex flex-row items-center space-x-2 rounded-md text-sm duration-100">
            {icon}
            <span className='text-base'>{label}</span>
          </div>
        </Link>
  )
}

export default NavigationItem