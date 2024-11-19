'use client';

import { Fragment, useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { classNames } from '../classNames';
import { NavItems } from './NavItems';
import SidebarItem from './SidebarItem';

const Sidebar = () => {
  const navItems = NavItems();

  const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(true);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className="">
      <div
        className={classNames(
          isSidebarExpanded ? 'w-[228px]' : 'w-[68px]',
          'hidden h-full transform border-on-primary bg-on-surface drop-shadow transition-all duration-300 ease-in-out sm:flex'
        )}
      >
        <aside className="flex h-full w-full columns-1 flex-col overflow-x-hidden break-words p-3">
          {/* Program */}
          {isSidebarExpanded && (
            <span className={'text-lg text-highlight'}>Program</span>
          )}
          <div className="relative mt-3 pb-2">
            <div className="flex flex-col space-y-1">
              {navItems.map((item, idx) => {
                if (item.group === 'program') {
                  return (
                    <Fragment key={idx}>
                      <div className="space-y-1">
                        <SidebarItem
                          label={item.name}
                          icon={item.icon}
                          path={item.href}
                          active={item.active}
                          isSidebarExpanded={isSidebarExpanded}
                        />
                      </div>
                    </Fragment>
                  );
                }
              })}
            </div>
          </div>
          <div className={'mb-2 h-[1px] w-full bg-outline'}></div>
          {/* Resources */}
          {isSidebarExpanded && (
            <span className={'text-lg text-highlight'}>Resources</span>
          )}
          <div className="relative mt-3 pb-2">
            <div className="flex flex-col space-y-1">
              {navItems.map((item, idx) => {
                if (item.group === 'resources') {
                  return (
                    <Fragment key={idx}>
                      <div className="space-y-1">
                        <SidebarItem
                          label={item.name}
                          icon={item.icon}
                          path={item.href}
                          active={item.active}
                          isSidebarExpanded={isSidebarExpanded}
                        />
                      </div>
                    </Fragment>
                  );
                }
              })}
            </div>
          </div>
          <div className={'mb-2 h-[1px] w-full bg-outline'}></div>
          {/* System */}
          {isSidebarExpanded && (
            <span className={'text-lg text-highlight'}>System</span>
          )}
          <div className="relative mt-3 pb-2">
            <div className="flex flex-col space-y-1">
              {navItems.map((item, idx) => {
                if (item.group === 'system') {
                  return (
                    <Fragment key={idx}>
                      <div className="space-y-1">
                        <SidebarItem
                          label={item.name}
                          icon={item.icon}
                          path={item.href}
                          active={item.active}
                          isSidebarExpanded={isSidebarExpanded}
                        />
                      </div>
                    </Fragment>
                  );
                }
              })}
            </div>
          </div>
          {/* Bottom */}
          {/* <div className="sticky bottom-0 mb-4 mt-auto block whitespace-nowrap transition duration-200">
            {navItems.map((item, idx) => {
              if (item.group === 'bottom') {
                return (
                  <Fragment key={idx}>
                    <div className="space-y-1">
                      <SidebarItem
                        label={item.name}
                        icon={item.icon}
                        path={item.href}
                        active={item.active}
                        isSidebarExpanded={isSidebarExpanded}
                      />
                    </div>
                  </Fragment>
                );
              }
            })}
          </div> */}
        </aside>
        <div className="relative mt-[calc(calc(90vh)-40px)]">
          <button
            type="button"
            className="border-muted-foreground/20 bg-primary absolute bottom-32 right-[-12px] flex h-6 w-6 items-center justify-center rounded-full border shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg"
            onClick={toggleSidebar}
          >
            {isSidebarExpanded ? (
              <ChevronLeftIcon className="size-4 stroke-foreground" />
            ) : (
              <ChevronRightIcon className="size-4 stroke-foreground" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
