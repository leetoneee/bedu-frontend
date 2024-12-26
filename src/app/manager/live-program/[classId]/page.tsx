'use client';

import { Breadcrumb } from '@/components';
import { columns, getLessonsByClassId } from '@/data/lesson.data';
import { Crumb } from '@/types';
import { Lesson } from '@/types/lesson.type';
import {
  Button,
  CalendarDate,
  Chip,
  DateInput,
  Divider,
  Input,
  Pagination,
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Textarea,
  Tooltip,
  useDisclosure
} from '@nextui-org/react';
import React, {
  Key,
  ReactNode,
  use,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import Image from 'next/image';
import {
  EyeIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { useParams, useRouter } from 'next/navigation';
import { EClass } from '@/types/class.type';
import useSWR from 'swr';
import axios from '@/libs/axiosInstance';
import AddLessonModal from './AddLesson.modal';
import { toast } from 'react-toastify';
import ReactPlayer from 'react-player';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const EClassDetail = () => {
  const params = useParams();
  const classId = params.classId;
  const router = useRouter();
  //!  CONTROL Add modal
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [eclass, setEClass] = useState<EClass>();

  const {
    data,
    isLoading,
    error: classError,
    mutate: refreshEndpoint
  } = useSWR(`/classes/item/${classId}`, fetcher);

  const crumbs: Crumb[] = useMemo(() => {
    return [
      {
        label: 'Live Program',
        href: '/manager/live-program'
      },
      {
        label: eclass?.name || 'Loading...',
        href: `/live-program/${classId}`
      }
    ];
  }, [classId, eclass]);

  useEffect(() => {
    if (data?.metadata) {
      setEClass(data.metadata);
      setLessons(data.metadata.lesson);
    }
  }, [data]);

  const [filterLessonName, setFilterLessonName] = useState<string>('');
  const hasSearchFilterName = Boolean(filterLessonName);
  const [filterStartDate, setFilterStartDate] = useState<CalendarDate>();
  const [filterEndDate, setFilterEndDate] = useState<CalendarDate>();

  const renderCell = useCallback(
    (lesson: Lesson, columnKey: Key): ReactNode => {
      const cellValue =
        columnKey !== 'actions' ? lesson[columnKey as keyof Lesson] : 'actions';

      switch (columnKey) {
        case 'id':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {cellValue?.toString()}
              </p>
            </div>
          );
        case 'type':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {cellValue ? cellValue.toString().toUpperCase() : ''}
              </p>
            </div>
          );
        case 'title':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {cellValue?.toString()}
              </p>
            </div>
          );
        case 'startDate':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {cellValue &&
                  new Date(cellValue.toString()).toLocaleDateString('vi-VE', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}
              </p>
            </div>
          );
        case 'endDate':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {cellValue &&
                  new Date(cellValue.toString()).toLocaleDateString('vi-VE', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}
              </p>
            </div>
          );
        case 'lessonQuantity':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-wraps text-sm capitalize">
                {cellValue?.toString()}
              </p>
            </div>
          );
        case 'price':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {cellValue?.toString()}
              </p>
            </div>
          );
        case 'timePerLesson':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {cellValue?.toString()} minutes
              </p>
            </div>
          );
        case 'actions':
          return (
            <div className="relative flex items-center justify-center gap-2">
              <Tooltip content="Details" className="bg-on-primary" delay={1000}>
                <span
                  className="cursor-pointer text-lg text-on-primary active:opacity-50"
                  onClick={() => router.push(`lessons/${lesson.id}`)}
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
          return cellValue?.toString();
      }
    },
    []
  );

  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: '#',
    direction: 'ascending'
  });

  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const pages = Math.ceil(lessons.length / rowsPerPage);

  const filteredItems = React.useMemo(() => {
    let filteredLessons = [...lessons];
    setPage(1);

    if (hasSearchFilterName) {
      filteredLessons = filteredLessons.filter((lesson) =>
        lesson.name.toLowerCase().includes(filterLessonName.toLowerCase())
      );
    }

    if (filterStartDate) {
      const startDate = new Date(
        filterStartDate.year,
        filterStartDate.month,
        filterStartDate.day
      );
      filteredLessons = filteredLessons.filter(
        (lesson) => new Date(lesson.startDate) >= startDate
      );
    }
    if (filterEndDate) {
      const endDate = new Date(
        filterEndDate.year,
        filterEndDate.month,
        filterEndDate.day
      );
      filteredLessons = filteredLessons.filter(
        (lesson) => new Date(lesson.endDate) <= endDate
      );
    }

    return filteredLessons;
  }, [lessons, filterLessonName, filterStartDate, filterEndDate]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: Lesson, b: Lesson) => {
      const first = a[sortDescriptor.column as keyof Lesson] as number;
      const second = b[sortDescriptor.column as keyof Lesson] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const topContent: ReactNode = React.useMemo(() => {
    return (
      // Search/Filter
      <div className="flex w-full flex-row gap-16">
        {/* Search Name*/}
        <div className="flex flex-col gap-2">
          <span>Lesson name</span>
          <Input
            className="w-full bg-white"
            variant="bordered"
            size={'md'}
            type=""
            placeholder="Find your team member"
            value={filterLessonName}
            onChange={(e) => setFilterLessonName(e.target.value)}
          />
        </div>
        {/* Filter Start date */}
        <div className="flex flex-col gap-2">
          <span>Start date</span>
          <DateInput
            key={'start-date'}
            variant="bordered"
            className="w-[210px]"
            value={filterStartDate}
            onChange={setFilterStartDate}
          />
        </div>
        {/* Filter end date */}
        <div className="flex flex-col gap-2">
          <span>End date</span>
          <DateInput
            key={'end-date'}
            variant="bordered"
            className="w-[210px]"
            value={filterEndDate}
            onChange={setFilterEndDate}
          />
        </div>
        <Button
          className="my-auto ml-auto h-14 rounded-2xl bg-on-primary text-white shadow-md"
          startContent={<PlusIcon className="size-6 text-white" />}
          size="lg"
          onClick={onOpen}
        >
          Add
        </Button>
      </div>
    );
  }, [filterLessonName]);

  const handleCreated = () => {
    toast.success('Lesson created successfully!');
    refreshEndpoint();
  };

  const handleEdited = () => {
    toast.success('Lesson edited successfully!');
    refreshEndpoint();
  };

  const handleDeleted = () => {
    toast.success('Lesson deleted successfully!');
    refreshEndpoint();
  };

  const loadingState =
    isLoading || data?.metadata.lesson.length === 0 ? 'loading' : 'idle';
  return (
    <main className="flex flex-col items-center gap-4 p-4 sm:items-start">
      <Breadcrumb crumbs={crumbs} />
      <Divider />
      <div className="flex h-full w-full flex-col gap-2 rounded border border-on-surface/20 bg-white p-5 shadow-sm">
        <div className="flex min-h-max w-full flex-col gap-4">
          <div className="flex w-full flex-row gap-20">
            {/* Name */}
            <div className="flex w-full shrink basis-[40%] flex-col gap-2">
              <span className="text-xl font-semibold text-on-surface">
                Class Name
              </span>
              <Input
                type=""
                variant="bordered"
                className="w-full"
                size="lg"
                readOnly
                placeholder="Enter your project name"
                value={eclass?.name}
                // onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
            <div className="flex w-full basis-[60%] flex-row gap-20">
              {/* Type */}
              <div className="flex w-full shrink flex-col gap-2">
                <span className="text-xl font-semibold text-on-surface">
                  Type
                </span>
                <Input
                  type=""
                  variant="bordered"
                  className="min-w-max"
                  size="lg"
                  readOnly
                  placeholder="Enter your project name"
                  value={eclass?.type.toLocaleUpperCase()}
                  // onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
              {/* Code */}
              <div className="flex w-full shrink flex-col gap-2">
                <span className="text-xl font-semibold text-on-surface">
                  Code
                </span>
                <Input
                  type=""
                  variant="bordered"
                  className="min-w-max"
                  size="lg"
                  readOnly
                  placeholder="Enter your project name"
                  value={eclass?.code}
                  // onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
              {/* Status */}
              <div className="flex w-full shrink flex-col gap-2">
                <span className="text-xl font-semibold text-on-surface">
                  Status
                </span>
                <Chip
                  className="h-full w-full rounded-sm capitalize"
                  color={eclass?.isActive ? 'success' : 'default'}
                  size="lg"
                  variant="flat"
                >
                  {eclass?.isActive ? 'Published' : 'Unpublished'}
                </Chip>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-row gap-20">
            {/* Description */}
            <div className="flex w-full basis-[30%] flex-col gap-2">
              <span className="text-xl font-semibold text-on-surface">
                Description
              </span>
              <Textarea
                variant={'bordered'}
                size="lg"
                placeholder="Enter your description"
                className="col-span-12 mb-6 md:col-span-6 md:mb-0"
                readOnly
                value={eclass?.description}
                // onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex w-full basis-[70%] flex-row gap-20">
              <div className="flex w-full shrink flex-col gap-2">
                <span className="text-xl font-semibold text-on-surface">
                  Lesson Quantity
                </span>
                <Input
                  type=""
                  variant="bordered"
                  className="w-full"
                  size="lg"
                  readOnly
                  placeholder="Enter your project name"
                  value={eclass?.lessonQuantity.toString()}
                  // onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
              <div className="flex w-full shrink flex-col gap-2">
                <span className="text-xl font-semibold text-on-surface">
                  Time per Lesson
                </span>
                <Input
                  type=""
                  variant="bordered"
                  className="w-full"
                  size="lg"
                  readOnly
                  placeholder="Enter your project name"
                  value={eclass?.timePerLesson.toString()}
                  // onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
              <div className="flex w-full shrink flex-col gap-2">
                <span className="text-xl font-semibold text-on-surface">
                  Price
                </span>
                <Input
                  type=""
                  variant="bordered"
                  className="w-full"
                  size="lg"
                  readOnly
                  placeholder="Enter your project name"
                  value={eclass?.price.toString()}
                  // onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
            </div>
          </div>
          <Divider />
          <div className="flex w-full flex-col">
            {/* Title */}
            <span className="text-xl font-semibold text-on-surface">
              Lesson List
            </span>

            {/* Table Content*/}
            <div className="flex h-[430px] flex-col gap-2">
              {/* Table */}
              <div className="h-full shrink overflow-hidden rounded-xl shadow-xl">
                <Table
                  aria-label="Example table with client side pagination"
                  className="h-full w-full"
                  selectionMode="single"
                  shadow="none"
                  topContent={topContent}
                  topContentPlacement="inside"
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
                    className=""
                    items={sortedItems}
                    emptyContent={'No rows to display.'}
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
              {/* Pagination */}
              <div className="mb-auto flex w-full justify-center">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  className="text-on-primary"
                  // color="#00AAFF"
                  page={page}
                  total={pages}
                  onChange={(page) => setPage(page)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        {/* <div className="flex w-full">
          <Button
            className="bg-on-primary ml-auto h-14 rounded-2xl text-white"
            startContent={
              <Image
                src={'/icons/save.svg'}
                alt="save"
                className="size-6 text-white"
                width={24}
                height={24}
              />
            }
            size="lg"
          >
            Save
          </Button>
        </div> */}
      </div>
      {eclass && (
        <AddLessonModal
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
          eclassId={eclass.id}
          eclassName={eclass.name}
          eclassType={eclass.type}
          onOpenChange={onOpenChange}
          onCreated={handleCreated}
        />
      )}
    </main>
  );
};

export default EClassDetail;
