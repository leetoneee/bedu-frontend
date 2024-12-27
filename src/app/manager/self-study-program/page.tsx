'use client';

import Breadcrumb from '@/components/Breadcrumb';
import ButtonSolid from '@/components/Button/ButtonSolid';
import { Crumb } from '@/types';
import { Program, statusColorMap } from '@/types/program.type';
import {
  EyeIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
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
import React, { Key, useEffect } from 'react';
import { ReactNode, useCallback, useState } from 'react';
import { columns, statusOptions } from '@/data/program.data';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import axios from '@/libs/axiosInstance';
import { toast } from 'react-toastify';
import AddProgramModal from './AddProgram.modal';
import EditProgramModal from './EditProgram.modal';
import DeleteProgramModal from './DeleteProgram.modal';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function SSP() {
  const router = useRouter();
  //!  CONTROL Add modal
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  //!  CONTROL Edit modal
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const {
    isOpen: isOpenE,
    onOpen: onOpenE,
    onOpenChange: onOpenChangeE,
    onClose: onCloseE
  } = useDisclosure();
  const handleEditClick = (program: Program) => {
    setSelectedProgram(program);
    onOpenE();
  };
  //!  CONTROL Delete modal
  const {
    isOpen: isOpenD,
    onOpen: onOpenD,
    onOpenChange: onOpenChangeD,
    onClose: onCloseD
  } = useDisclosure();
  const handleDeleteClick = (program: Program) => {
    setSelectedProgram(program);
    onOpenD();
  };
  // Hàm đóng modal và reset selectedCourse
  const handleCloseEditModal = () => {
    onCloseE();
    setSelectedProgram(null);
  };
  const handleCloseDeleteModal = () => {
    onCloseD();
    setSelectedProgram(null);
  };
  const crumbs: Crumb[] = [
    {
      label: 'Self-study Program',
      href: '/manager/self-study-program'
    }
  ];

  const [programs, setPrograms] = useState<Program[]>([]);
  const [filter, setFilter] = useState<string | null>(null); // 'ielts', 'toeic', 'toefl', or null
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

  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: '#',
    direction: 'ascending'
  });
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const endpoint = `/programs/all${filter ? `/type/${filter}` : ''}?page=${page}&limit=${rowsPerPage}`;

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
    isLoading || data?.metadata.programs.length === 0 ? 'loading' : 'idle';

  // Load data
  useEffect(() => {
    if (error) setPrograms([]);
    else if (data && data.metadata.programs) {
      setTotalPrograms(data.metadata.totalRecord);
      setPrograms(data.metadata.programs);
    }
  }, [data, filter]);
  //

  useEffect(() => {
    setTotalPrograms(programs.length);
  }, [programs]);

  const renderCell = useCallback(
    (program: Program, columnKey: Key): ReactNode => {
      const cellValue =
        columnKey !== 'actions'
          ? program[columnKey as keyof Program]
          : 'actions';

      switch (columnKey) {
        case 'id':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {cellValue.toString()}
              </p>
            </div>
          );
        case 'code':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {cellValue.toString()}
              </p>
            </div>
          );
        case 'title':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {cellValue.toString()}
              </p>
            </div>
          );
        case 'isPublish':
          return (
            <Chip
              className="capitalize"
              color={
                statusColorMap[
                  (program.isActive
                    ? 'Published'
                    : 'Unpublished') as keyof typeof statusColorMap
                ]
              }
              size="sm"
              variant="flat"
            >
              {program.isActive ? 'Published' : 'Unpublished'}
            </Chip>
          );
        case 'sessionQuantity':
          return (
            <div className="flex basis-[10%] flex-col">
              <p className="text-bold text-wraps text-sm capitalize">
                {cellValue.toString()}
              </p>
            </div>
          );
        case 'type':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {cellValue.toString().toUpperCase()}
              </p>
            </div>
          );
        case 'price':
          return (
            <div className="flex basis-[10%] flex-col">
              <p className="text-bold text-sm capitalize">
                {cellValue.toString()}
              </p>
            </div>
          );
        case 'actions':
          return (
            <div className="relative flex items-center justify-center gap-2">
              <Tooltip content="Details" className="bg-on-primary" delay={1000}>
                <span
                  className="cursor-pointer text-lg text-on-primary active:opacity-50"
                  onClick={() =>
                    router.push(`self-study-program/${program.id}`)
                  }
                >
                  <EyeIcon className="size-5" />
                </span>
              </Tooltip>
              <Tooltip content="Edit" color="warning" delay={1000}>
                <span
                  className="cursor-pointer text-lg text-on-secondary active:opacity-50"
                  onClick={() => handleEditClick(program)}
                >
                  <PencilIcon className="size-5" />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete" delay={1000}>
                <span
                  className="cursor-pointer text-lg text-danger active:opacity-50"
                  onClick={() => handleDeleteClick(program)}
                >
                  <TrashIcon className="size-5" />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue.toString();
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
    let filteredPrograms = [...programs];
    setPage(1);

    if (hasSearchFilter) {
      filteredPrograms = filteredPrograms.filter((program) =>
        program.title.toLowerCase().includes(filterProgramName.toLowerCase())
      );
    }

    if (
      selectedValue !== 'all' &&
      Array.from(selectedStatus).length !== statusOptions.length
    ) {
      filteredPrograms = filteredPrograms.filter((program) =>
        Array.from(selectedStatus).includes(
          program.isActive ? 'Published' : 'Unpublished'
        )
      );
    }
    return filteredPrograms;
  }, [programs, filterProgramName, selectedValue, selectedStatus]);

  // const items = React.useMemo(() => {
  //   const start = (page - 1) * rowsPerPage;
  //   const end = start + rowsPerPage;

  //   return filteredItems.slice(start, end);
  // }, [page, filteredItems]);

  const sortedItems = React.useMemo(() => {
    return [...filteredItems].sort((a: Program, b: Program) => {
      const first = a[sortDescriptor.column as keyof Program] as number;
      const second = b[sortDescriptor.column as keyof Program] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, filteredItems]);

  const handleFilterChange = (newFilter: string | null) => {
    setPage(1); // Reset page to 1
    setFilter((prevFilter) => (prevFilter === newFilter ? null : newFilter));
  };

  const handleCreated = () => {
    toast.success('Program created successfully!');
    refreshEndpoint();
  };

  const handleEdited = () => {
    toast.success('Program edited successfully!');
    refreshEndpoint();
  };

  const handleDeleted = () => {
    toast.success('Program deleted successfully!');
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
              content=""
              className="my-auto h-14 rounded-2xl bg-blue-500 text-white shadow-md"
              iconLeft={<MagnifyingGlassIcon className="size-6 text-white" />}
            />
            <ButtonSolid
              content="Create"
              className="my-auto ml-auto h-14 rounded-2xl bg-blue-500 text-white shadow-md"
              iconLeft={<PlusIcon className="size-6 text-white" />}
              onClick={onOpen}
            />
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
              Total: <span className="text-2xl">{totalPrograms}</span> programs
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
      <AddProgramModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        onCreated={handleCreated}
      />
      {isOpenE && selectedProgram && (
        <EditProgramModal
          isOpen={isOpenE}
          onOpen={onOpenE}
          onOpenChange={onOpenChangeE}
          program={selectedProgram}
          onClose={handleCloseEditModal}
          onEdited={handleEdited}
        />
      )}
      {isOpenD && selectedProgram && (
        <DeleteProgramModal
          isOpen={isOpenD}
          onOpen={onOpenD}
          onOpenChange={onOpenChangeD}
          onClose={handleCloseDeleteModal}
          programId={selectedProgram.id}
          programTitle={selectedProgram.title}
          onDeleted={handleDeleted}
        />
      )}
    </main>
  );
}
