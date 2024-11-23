import { Crumb } from '@/types';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React from 'react';

type Props = {
  crumbs: Crumb[];
};

const Breadcrumb = ({ crumbs }: Props) => {
  return (
    <nav>
      <ol className="flex">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;

          return (
            <li key={crumb.href} className='flex flex-row'>
              {!isLast ? (
                <Link href={crumb.href}>
                  <span className="text-2xl font-bold text-on-primary hover:underline truncate w-72">
                    {crumb.label}
                  </span>
                </Link>
              ) : (
                <span className="text-2xl font-bold text-on-primary truncate w-72">
                  {crumb.label}
                </span>
              )}
              {index < crumbs.length - 1 && <ChevronRightIcon className='text-on-primary inline size-7 my-auto'/>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
