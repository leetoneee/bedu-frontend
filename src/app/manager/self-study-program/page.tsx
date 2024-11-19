'use client';

import Breadcrumb from '@/components/Breadcrumb';
import ButtonSolid from '@/components/Button/ButtonSolid';
import { Crumb } from '@/types';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';
import {
  Button,
  Chip,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Selection
} from '@nextui-org/react';
import React from 'react';
import { ReactNode, useCallback, useState } from 'react';

export default function SSP() {
  const crumbs: Crumb[] = [
    {
      label: 'Self-study Program',
      href: '/manager/self-study-program'
    }
  ];

  const [program, setProgram] = useState<string[]>([]);
  const [publishedPrograms, setPublishedPrograms] = useState<number>(0);
  const [unpublishedPrograms, setUnpublishedPrograms] = useState<number>(0);
  const [totalPrograms, setTotalPrograms] = useState<number>(0);
  const [filterProgramName, setFilterProgramName] = useState<string>('');
  const hasSearchFilter = Boolean(filterProgramName);
  const [selectedStatus, setSelectedStatus] = useState<Selection>(
    new Set(['all'])
  );
  const selectedValue = React.useMemo(
    () => Array.from(selectedStatus).join(', ').replaceAll('_', ' '),
    [selectedStatus]
  );

  const renderChip = useCallback((content: string): ReactNode => {
    switch (content) {
      case 'Published':
        return (
          <Chip
            className="capitalize"
            color={'success'}
            size="sm"
            variant="flat"
          >
            {content}
          </Chip>
        );
      case 'Unpublished':
        return (
          <Chip
            className="capitalize"
            color={'default'}
            size="sm"
            variant="flat"
          >
            {content}
          </Chip>
        );
      default:
        <span>{content}</span>;
    }
  }, []);

  return (
    <main className="flex flex-col items-center gap-4 p-4 sm:items-start">
      <Breadcrumb crumbs={crumbs} />
      <Divider />
      <div className="flex h-full w-full flex-col gap-2 rounded border border-on-surface/20 bg-white p-5 shadow-sm">
        {/* Search & Filter */}
        <div className="flex w-full flex-col gap-5 rounded-2xl bg-primary p-8 shadow-md">
          {/* Thống kê */}
          <div className="flex w-full flex-row gap-16">
            <Chip
              className="rounded-sm capitalize"
              color={'success'}
              size="lg"
              variant="flat"
            >
              Published: {publishedPrograms}
            </Chip>
            <Chip
              className="rounded-sm capitalize"
              color={'default'}
              size="lg"
              variant="flat"
            >
              Unpublished: {unpublishedPrograms}
            </Chip>
            <span>
              Total: <span className="text-2xl">{totalPrograms}</span> programs
            </span>
          </div>
          {/* Search/Filter */}
          <div className="flex w-full flex-row gap-16">
            {/* Search Name*/}
            <div className="flex flex-col gap-2">
              <span>Program name</span>
              <Input
                className="bg-white"
                variant="bordered"
                size={'md'}
                type=""
                placeholder="Find your program name"
                value={filterProgramName}
                onChange={(e) => setFilterProgramName(e.target.value)}
              />
            </div>
            {/* Filter Status */}
            <div className="flex flex-col gap-2">
              <span>Status</span>
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="bordered" className="w-36 capitalize">
                    {selectedValue === 'all'
                      ? 'all'
                      : renderChip(selectedValue)}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Single selection example"
                  variant="flat"
                  selectionMode="single"
                  selectedKeys={selectedStatus}
                  onSelectionChange={setSelectedStatus}
                >
                  <DropdownItem key="all">All</DropdownItem>
                  <DropdownItem key="Published">
                    {renderChip('Published')}
                  </DropdownItem>
                  <DropdownItem key="Unpublished">
                    {renderChip('Unpublished')}
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <ButtonSolid
              className="my-auto h-14 rounded-2xl bg-blue-500 text-white shadow-md"
              iconLeft={<MagnifyingGlassIcon className="size-6 text-white" />}
            />
            <ButtonSolid
              content="Create"
              isPrimary={true}
              className="my-auto ml-auto h-14 rounded-2xl bg-blue-500 text-white shadow-md"
              iconLeft={<PlusIcon className="size-6 text-white" />}
            />
          </div>
        </div>
        {/* Table content */}
        <div className="rounded-2xl bg-primary">

        </div>
      </div>
    </main>
  );
}
