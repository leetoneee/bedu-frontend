'use client';

import { ButtonSolid, Breadcrumb } from '@/components';
import { Crumb } from '@/types';
import {
  EyeIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import {
  Divider,
  SortDescriptor,
  Selection,
  Chip,
  Tooltip,
  Input,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableCell,
  TableRow,
  Pagination,
  Spinner,
  useDisclosure
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { Key, ReactNode, useCallback, useEffect } from 'react';
import { useState } from 'react';
import { columns, statusOptions } from '@/data/course.data';
import { Course, statusColorMap } from '@/types/course.type';
import axios from '@/libs/axiosInstance';
import useSWR from 'swr';
import AddCourseModal from './AddCourse.modal';
import { toast } from 'react-toastify';
import EditCourseModal from './EditCourse.modal';
import DeleteCourseModal from './DeleteCourse.modal';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function CoursesPage() {
  const router = useRouter();
  //!  CONTROL Add modal
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  //!  CONTROL Edit modal
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const {
    isOpen: isOpenE,
    onOpen: onOpenE,
    onOpenChange: onOpenChangeE,
    onClose: onCloseE
  } = useDisclosure();
  const handleEditClick = (course: Course) => {
    setSelectedCourse(course);
    onOpenE();
  };
  //!  CONTROL Delete modal
  const {
    isOpen: isOpenD,
    onOpen: onOpenD,
    onOpenChange: onOpenChangeD,
    onClose: onCloseD
  } = useDisclosure();
  const handleDeleteClick = (course: Course) => {
    setSelectedCourse(course);
    onOpenD();
  };
  // Hàm đóng modal và reset selectedCourse
  const handleCloseEditModal = () => {
    onCloseE();
    setSelectedCourse(null);
  };
  const handleCloseDeleteModal = () => {
    onCloseD();
    setSelectedCourse(null);
  };

  const crumbs: Crumb[] = [
    {
      label: 'Courses',
      href: '/manager/Courses'
    }
  ];

  const [courses, setCourses] = useState<Course[]>([]);
  const [filter, setFilter] = useState<string | null>(null); // 'ielts', 'toeic', 'toefl', or null
  const [totalCourses, setTotalCourses] = useState<number>(0);
  const [filterCourseName, setFilterCourseName] = useState<string>('');
  const hasSearchFilter = Boolean(filterCourseName);
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

  const endpoint = `/courses/all${filter ? `/${filter}` : ''}?page=${page}&limit=${rowsPerPage}`;

  const {
    data,
    error,
    isLoading,
    mutate: refreshEndpoint
  } = useSWR(endpoint, fetcher, {
    keepPreviousData: true
  });

  const pages = React.useMemo(() => {
    if (data)
      return data?.metadata.totalRecord
        ? Math.ceil(data.metadata.totalRecord / rowsPerPage)
        : 0;
    return 1;
  }, [data, rowsPerPage]);

  const loadingState =
    isLoading || data?.metadata.length === 0 ? 'loading' : 'idle';

  // Load data
  useEffect(() => {
    if (error) setCourses([]);
    else if (data && data.metadata.courses) {
      setCourses(data.metadata.courses);
      setTotalCourses(data.metadata.totalRecord);
    }
  }, [data, filter]);
  //

  // useEffect(() => {
  //   setTotalCourses(courses.length);
  // }, [courses]);

  const renderCell = useCallback(
    (course: Course, columnKey: Key): ReactNode => {
      const cellValue =
        columnKey !== 'actions' ? course[columnKey as keyof Course] : 'actions';

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
        case 'courseType':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {cellValue.toString().toUpperCase()}
              </p>
            </div>
          );
        case 'isPublish':
          return (
            <Chip
              className="capitalize"
              color={
                statusColorMap[
                  (course.isActive
                    ? 'Published'
                    : 'Unpublished') as keyof typeof statusColorMap
                ]
              }
              size="sm"
              variant="flat"
            >
              {course.isActive ? 'Published' : 'Unpublished'}
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
        case 'actions':
          return (
            <div className="relative flex items-center justify-center gap-2">
              <Tooltip content="Details" className="bg-on-primary" delay={1000}>
                <span
                  className="cursor-pointer text-lg text-on-primary active:opacity-50"
                  onClick={() => router.push(`courses/${course.id}`)}
                >
                  <EyeIcon className="size-5" />
                </span>
              </Tooltip>
              <Tooltip content="Edit" color="warning" delay={1000}>
                <span
                  className="cursor-pointer text-lg text-on-secondary active:opacity-50"
                  onClick={() => handleEditClick(course)}
                >
                  <PencilIcon className="size-5" />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete" delay={1000}>
                <span
                  className="cursor-pointer text-lg text-danger active:opacity-50"
                  onClick={() => handleDeleteClick(course)}
                >
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
    let filteredCourses = [...courses];

    if (hasSearchFilter) {
      filteredCourses = filteredCourses.filter((course) =>
        course.title.toLowerCase().includes(filterCourseName.toLowerCase())
      );
    }

    if (
      selectedValue !== 'all' &&
      Array.from(selectedStatus).length !== statusOptions.length
    ) {
      filteredCourses = filteredCourses.filter((course) =>
        Array.from(selectedStatus).includes(
          course.isActive ? 'Published' : 'Unpublished'
        )
      );
    }
    return filteredCourses;
  }, [courses, filterCourseName, selectedValue, selectedStatus]);

  // const items = React.useMemo(() => {
  //   const start = (page - 1) * rowsPerPage;
  //   const end = start + rowsPerPage;

  //   return filteredItems.slice(start, end);
  // }, [page, filteredItems]);

  const sortedItems = React.useMemo(() => {
    return [...filteredItems].sort((a: Course, b: Course) => {
      const first = a[sortDescriptor.column as keyof Course] as number;
      const second = b[sortDescriptor.column as keyof Course] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, filteredItems]);

  const handleFilterChange = (newFilter: string | null) => {
    setPage(1); // Reset page to 1
    setFilter((prevFilter) => (prevFilter === newFilter ? null : newFilter));
  };

  const handleCreated = () => {
    toast.success('Course created successfully!');
    refreshEndpoint();
  };

  const handleEdited = () => {
    toast.success('Course edited successfully!');
    refreshEndpoint();
  };

  const handleDeleted = () => {
    toast.success('Course deleted successfully!');
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
              <span>Course name</span>
              <Input
                className="bg-white"
                variant="bordered"
                size={'md'}
                type=""
                placeholder="Find your program name"
                value={filterCourseName}
                onChange={(e) => setFilterCourseName(e.target.value)}
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
              Total: <span className="text-2xl">{totalCourses}</span> courses
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
      <AddCourseModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        onCreated={handleCreated}
      />
      {isOpenE && selectedCourse && (
        <EditCourseModal
          isOpen={isOpenE}
          onOpen={onOpenE}
          onOpenChange={onOpenChangeE}
          course={selectedCourse}
          onClose={handleCloseEditModal}
          onEdited={handleEdited}
        />
      )}
      {isOpenD && selectedCourse && (
        <DeleteCourseModal
          isOpen={isOpenD}
          onOpen={onOpenD}
          onOpenChange={onOpenChangeD}
          onClose={handleCloseDeleteModal}
          courseId={selectedCourse.id}
          courseTitle={selectedCourse.title}
          onDeleted={handleDeleted}
        />
      )}
    </main>
  );
}
