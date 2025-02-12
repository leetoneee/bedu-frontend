'use client';

import { Breadcrumb } from '@/components';
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
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { Key, useState, ReactNode, useCallback, useEffect } from 'react';
import { columns } from '@/data/class.data';
import {
  EyeIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { ButtonSolid } from '@/components';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import axios from '@/libs/axiosInstance';
import { formatNumberWithCommas } from '@/helpers';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function LiveProgramPage() {
  const router = useRouter();
  //!  CONTROL Add modal
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  //!  CONTROL Edit modal
  const [selectedClass, setSelectedClass] = useState<EClass | null>(null);
  const {
    isOpen: isOpenE,
    onOpen: onOpenE,
    onOpenChange: onOpenChangeE,
    onClose: onCloseE
  } = useDisclosure();
  const handleEditClick = (eclass: EClass) => {
    setSelectedClass(eclass);
    onOpenE();
  };
  //!  CONTROL Delete modal
  const {
    isOpen: isOpenD,
    onOpen: onOpenD,
    onOpenChange: onOpenChangeD,
    onClose: onCloseD
  } = useDisclosure();
  const handleDeleteClick = (eclass: EClass) => {
    setSelectedClass(eclass);
    onOpenD();
  };
  // Hàm đóng modal và reset selectedeclass
  const handleCloseEditModal = () => {
    onCloseE();
    setSelectedClass(null);
  };
  const handleCloseDeleteModal = () => {
    onCloseD();
    setSelectedClass(null);
  };

  const crumbs: Crumb[] = [
    {
      label: 'Live Program',
      href: '/teacher/live-program'
    }
  ];
  const [classes, setClasses] = useState<EClass[]>([]);
  const [filter, setFilter] = useState<string | null>(null); // 'ielts', 'toeic', 'toefl', or null
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

  // ! fix route???
  const endpoint = `/classes/all${filter ? `/type/${filter}` : ''}?page=${page}&limit=${rowsPerPage}`;

  const {
    data,
    error,
    isLoading,
    mutate: refreshEndpoint
  } = useSWR(endpoint, fetcher, {
    keepPreviousData: true
  });

  const pages = React.useMemo(() => {
    return data?.metadata.totalRecord
      ? Math.ceil(data.metadata.totalRecord / rowsPerPage)
      : 0;
  }, [data?.metadata.totalRecord, rowsPerPage]);

  const loadingState =
    isLoading || data?.metadata.classes.length === 0 ? 'loading' : 'idle';

  // Load data
  useEffect(() => {
    if (error) setClasses([]);
    else if (data && data.metadata.classes) {
      setTotalClasses(data.metadata.totalRecord);
      setClasses(data.metadata.classes);
    }
  }, [data, filter]);
  //

  useEffect(() => {
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
                  (eclass.isActive
                    ? 'Published'
                    : 'Unpublished') as keyof typeof statusColorMap
                ]
              }
              size="sm"
              variant="flat"
            >
              {eclass.isActive ? 'Published' : 'Unpublished'}
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
              <p className="text-bold text-sm capitalize">
                {formatNumberWithCommas(cellValue.toString())} VND
              </p>
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
                  onClick={() => router.push(`live-program/${eclass.id}`)}
                >
                  <EyeIcon className="size-5" />
                </span>
              </Tooltip>
              {/* <Tooltip content="Edit" color="warning" delay={1000}>
                <span
                  className="cursor-pointer text-lg text-on-secondary active:opacity-50"
                  onClick={() => handleEditClick(eclass)}
                >
                  <PencilIcon className="size-5" />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete" delay={1000}>
                <span
                  className="cursor-pointer text-lg text-danger active:opacity-50"
                  onClick={() => handleDeleteClick(eclass)}
                >
                  <TrashIcon className="size-5" />
                </span>
              </Tooltip> */}
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
      filteredClasses = filteredClasses.filter((eclass) =>
        eclass.name.toLowerCase().includes(filterClassName.toLowerCase())
      );
    }

    if (
      selectedValue !== 'all' &&
      Array.from(selectedStatus).length !== statusOptions.length
    ) {
      filteredClasses = filteredClasses.filter((eclass) =>
        Array.from(selectedStatus).includes(
          eclass.isActive ? 'Published' : 'Unpublished'
        )
      );
    }
    return filteredClasses;
  }, [classes, filterClassName, selectedValue, selectedStatus]);

  // const items = React.useMemo(() => {
  //   const start = (page - 1) * rowsPerPage;
  //   const end = start + rowsPerPage;

  //   return filteredItems.slice(start, end);
  // }, [page, filteredItems]);

  const sortedItems = React.useMemo(() => {
    return [...filteredItems].sort((a: EClass, b: EClass) => {
      const first = a[sortDescriptor.column as keyof EClass] as number;
      const second = b[sortDescriptor.column as keyof EClass] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, filteredItems]);

  const handleFilterChange = (newFilter: string | null) => {
    setPage(1); // Reset page to 1
    setFilter((prevFilter) => (prevFilter === newFilter ? null : newFilter));
  };

  const handleCreated = () => {
    toast.success('Class created successfully!');
    refreshEndpoint();
  };

  const handleEdited = () => {
    toast.success('Class edited successfully!');
    refreshEndpoint();
  };

  const handleDeleted = () => {
    toast.success('Class deleted successfully!');
    refreshEndpoint();
  };

  return (
    <main className="flex flex-col items-center gap-4 p-4 sm:items-start">
      <Breadcrumb crumbs={crumbs} />
      <Divider />
      <div className="flex h-full w-full flex-col gap-2 rounded border border-on-surface/20 bg-white p-5 shadow-sm">
        {/* Search & Filter */}
        <div className="flex w-full flex-col gap-5 rounded-2xl bg-b-primary p-8 shadow-md">
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
            {/* <ButtonSolid
              content="Create"
              className="my-auto ml-auto h-14 rounded-2xl bg-blue-500 text-white shadow-md"
              iconLeft={<PlusIcon className="size-6 text-white" />}
              onClick={onOpen}
            /> */}
          </div>
          {/* Filter */}
          <div className="flex w-full flex-row gap-16">
            <div className="w-20 justify-center">
              <Chip
                className="select-none capitalize hover:cursor-pointer"
                color={'danger'}
                size="lg"
                variant={filter === 'ielts' ? 'flat' : 'bordered'}
                onClick={() => handleFilterChange('ielts')}
              >
                IELTS
              </Chip>
            </div>
            <div className="w-20 justify-center">
              <Chip
                className="select-none capitalize hover:cursor-pointer"
                color={'warning'}
                size="lg"
                variant={filter === 'toeic' ? 'flat' : 'bordered'}
                onClick={() => handleFilterChange('toeic')}
              >
                TOEIC
              </Chip>
            </div>
            <div className="w-20 justify-center">
              <Chip
                className="select-none capitalize hover:cursor-pointer"
                color={'success'}
                size="lg"
                variant={filter === 'toefl' ? 'flat' : 'bordered'}
                onClick={() => handleFilterChange('toefl')}
              >
                TOEFL
              </Chip>
            </div>

            <span>
              Total: <span className="text-2xl">{totalClasses}</span> classes
            </span>
          </div>
        </div>
        {/* Table content */}
        <div className="h-[482px] shrink overflow-hidden rounded-2xl shadow-xl">
          <Table
            aria-label="Example table with client side pagination"
            className="h-full w-full"
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
            <TableBody
              items={sortedItems}
              emptyContent={'No rows to display.'}
              loadingContent={<Spinner />}
              loadingState={loadingState}
            >
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
            color="primary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </main>
  );
}
