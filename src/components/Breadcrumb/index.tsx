import { Crumb } from '@/types';
import Link from 'next/link';
import React from 'react';

type Props = {
  crumbs: Crumb[];
};

const Breadcrumb = ({ crumbs }: Props) => {
  return (
    <nav>
      <ol className="flex space-x-2">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;

          return (
            <li key={crumb.href}>
              {!isLast ? (
                <Link href={crumb.href}>
                  <span className="text-2xl font-bold text-on-primary hover:underline truncate">
                    {crumb.label}
                  </span>
                </Link>
              ) : (
                <span className="text-2xl font-bold text-on-primary truncate">
                  {crumb.label}
                </span>
              )}
              {index < crumbs.length - 1 && <span> &gt; </span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
