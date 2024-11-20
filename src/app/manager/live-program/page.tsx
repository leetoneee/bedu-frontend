'use client';

import Breadcrumb from '@/components/Breadcrumb';
import { Crumb } from '@/types';
import { EClass, statusColorMap, statusOptions } from '@/types/class.type';
import {
  Button,
  Chip,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  Selection,
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { Key, useState, ReactNode, useCallback, useEffect } from 'react';
import { classes as data, columns } from '@/data/class.data';
import {
  EyeIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { ButtonSolid } from '@/components';

export default function LiveProgramPage() {
  const router = useRouter();

  const crumbs: Crumb[] = [
    {
      label: 'Live Program',
      href: '/manager/live-program'
    }
  ];
  const [classes, setClasses] = useState<EClass[]>([]);
  const [publishedClasses, setPublishedClasses] = useState<number>(0);
  const [unpublishedClasses, setUnpublishedClasses] = useState<number>(0);
  const [totalClasses, setTotalClasses] = useState<number>(0);
  const [filterClassName, setFilterClassName] = useState<string>('');
  const hasSearchFilter = Boolean(filterClassName);
  const [selectedStatus, setSelectedStatus] = useState<Selection>(
    new Set(['all'])
  );
  const selectedValue = React.useMemo(
    () => Array.from(selectedStatus).join(', ').replaceAll('_', ' '),
    [selectedStatus]
  );

  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: '#',
    direction: 'ascending'
  });
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(classes.length / rowsPerPage);

  // Load data
  useEffect(() => {
    setClasses(data);

    return () => {};
  }, [data]);
  //

  useEffect(() => {
    setPublishedClasses(
      classes.filter((course) => course.isPublish === true).length
    );
    setUnpublishedClasses(
      classes.filter((course) => course.isPublish === false).length
    );
    setTotalClasses(classes.length);
  }, [classes]);

  const renderCell = useCallback(
    (eclass: EClass, columnKey: Key): ReactNode => {
      const cellValue =
        columnKey !== 'actions' ? eclass[columnKey as keyof EClass] : 'actions';

      switch (columnKey) {
        case 'id':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{cellValue}</p>
            </div>
          );
        case 'code':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{cellValue}</p>
            </div>
          );
        case 'title':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{cellValue}</p>
            </div>
          );
        case 'isPublish':
          return (
            <Chip
              className="capitalize"
              color={
                statusColorMap[
                  (eclass.isPublish
                    ? 'Published'
                    : 'Unpublished') as keyof typeof statusColorMap
                ]
              }
              size="sm"
              variant="flat"
            >
              {eclass.isPublish ? 'Published' : 'Unpublished'}
            </Chip>
          );
        case 'lessonQuantity':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-wraps text-sm capitalize">
                {cellValue}
              </p>
            </div>
          );
        case 'price':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{cellValue}</p>
            </div>
          );
        case 'timePerLesson':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {cellValue} minutes
              </p>
            </div>
          );
        case 'startDate':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {new Date(eclass.startDate).toLocaleDateString('vi-VE', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                })}
              </p>
            </div>
          );
        case 'actions':
          return (
            <div className="relative flex items-center justify-center gap-2">
              <Tooltip content="Details" className="bg-on-primary" delay={1000}>
                <span
                  className="cursor-pointer text-lg text-on-primary active:opacity-50"
                  onClick={() => router.push(`projects/${eclass.id}`)}
                >
                  <EyeIcon className="size-5" />
                </span>
              </Tooltip>
              <Tooltip content="Edit" color="warning" delay={1000}>
                <span className="cursor-pointer text-lg text-on-secondary active:opacity-50">
                  <PencilIcon className="size-5" />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete" delay={1000}>
                <span className="cursor-pointer text-lg text-danger active:opacity-50">
                  <TrashIcon className="size-5" />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
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

  const filteredItems = React.useMemo(() => {
    let filteredClasses = [...classes];
    setPage(1);

    if (hasSearchFilter) {
      filteredClasses = filteredClasses.filter((course) =>
        course.name.toLowerCase().includes(filterClassName.toLowerCase())
      );
    }

    if (
      selectedValue !== 'all' &&
      Array.from(selectedStatus).length !== statusOptions.length
    ) {
      filteredClasses = filteredClasses.filter((course) =>
        Array.from(selectedStatus).includes(
          course.isPublish ? 'Published' : 'Unpublished'
        )
      );
    }
    return filteredClasses;
  }, [classes, filterClassName, selectedValue, selectedStatus]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: EClass, b: EClass) => {
      const first = a[sortDescriptor.column as keyof EClass] as number;
      const second = b[sortDescriptor.column as keyof EClass] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

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
              Published: {publishedClasses}
            </Chip>
            <Chip
              className="rounded-sm capitalize"
              color={'default'}
              size="lg"
              variant="flat"
            >
              Unpublished: {unpublishedClasses}
            </Chip>
            <span>
              Total: <span className="text-2xl">{totalClasses}</span> classes
            </span>
          </div>
          {/* Search/Filter */}
          <div className="flex w-full flex-row gap-16">
            {/* Search Name*/}
            <div className="flex flex-col gap-2">
              <span>Class name</span>
              <Input
                className="bg-white"
                variant="bordered"
                size={'md'}
                type=""
                placeholder="Find your program name"
                value={filterClassName}
                onChange={(e) => setFilterClassName(e.target.value)}
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
              content=""
              className="my-auto h-14 rounded-2xl bg-blue-500 text-white shadow-md"
              iconLeft={<MagnifyingGlassIcon className="size-6 text-white" />}
            />
            <ButtonSolid
              content="Create"
              className="my-auto ml-auto h-14 rounded-2xl bg-blue-500 text-white shadow-md"
              iconLeft={<PlusIcon className="size-6 text-white" />}
            />
          </div>
        </div>
        {/* Table content */}
        <div className="h-[482px] shrink overflow-hidden rounded-2xl bg-primary shadow-xl">
          <Table
            aria-label="Example table with client side pagination"
            className="h-full w-full bg-primary"
            selectionMode="single"
            // color="#F9FAFB"
            shadow="none"
            sortDescriptor={sortDescriptor}
            onSortChange={setSortDescriptor}
            isHeaderSticky
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === 'actions' ? 'center' : 'start'}
                  allowsSorting={column.sortable}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={sortedItems} emptyContent={'No rows to display.'}>
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {/* Pagiantion */}
        <div className="mb-auto flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="default"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </main>
  );
}
