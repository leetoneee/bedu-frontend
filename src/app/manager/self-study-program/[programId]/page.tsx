'use client';

import { Breadcrumb } from '@/components';
import { columns } from '@/data/program-course.data';
import { Crumb } from '@/types';
import { Course } from '@/types/course.type';
import { statusColorMap } from '@/types/lesson.type';
import {
  Button,
  Chip,
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
  Tooltip,
  useDisclosure
} from '@nextui-org/react';
import React, {
  Key,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import Image from 'next/image';
import { EyeIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useParams, useRouter } from 'next/navigation';
import { Program } from '@/types/program.type';
import AddCoursesModal from './add-course.modal';
import useSWR from 'swr';
import axios from '@/libs/axiosInstance';
import { editProgram, UpdateProgramDto } from '@/services/programs.service';
import { toast } from 'react-toastify';
import ListStudent from './list-student.comp';
import { formatNumberWithCommas } from '@/helpers';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const ProgramDetail = () => {
  const params = useParams();
  const programId = params.programId;
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { data } = useSWR(`/programs/item/${programId}`, fetcher);

  const [courses, setCourses] = useState<Course[]>([]);
  const [program, setProgram] = useState<Program>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const crumbs: Crumb[] = useMemo(() => {
    return [
      {
        label: 'Self-study Program',
        href: '/manager/self-study-program'
      },
      {
        label: program?.title || 'Loading...',
        href: `/self-study-program/${programId}`
      }
    ];
  }, [programId, program]);

  useEffect(() => {
    if (data?.metadata) {
      setProgram(data.metadata);
      setCourses(data.metadata.course);
    }
  }, [data]);

  // State for filter
  const [filterCourseName, setFilterCourseName] = useState<string>('');
  const hasSearchFilterName = Boolean(filterCourseName);
  // const [filterStartDate, setFilterStartDate] = useState<CalendarDate>();
  // const [filterEndDate, setFilterEndDate] = useState<CalendarDate>();
  //

  const handleDelete = useCallback(
    (courseId: number) => {
      console.log('🚀 ~ ProgramDetail ~ courseId:', courseId);
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.id !== courseId)
      );
    },
    [setCourses]
  );

  const renderCell = useCallback(
    (course: Course, columnKey: Key): ReactNode => {
      const cellValue =
        columnKey !== 'actions' ? course[columnKey as keyof Course] : 'actions';

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
                {cellValue.toString()}
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
                {cellValue.toString()} minutes
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
                    router.replace(`/manager/courses/${course.id}`)
                  }
                >
                  <EyeIcon className="size-5" />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete" delay={1000}>
                <span
                  className="cursor-pointer text-lg text-danger active:opacity-50"
                  onClick={() => handleDelete(course.id)}
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

  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: '#',
    direction: 'ascending'
  });

  const [page, setPage] = useState(1);
  // const rowsPerPage = 6;

  // const pages = React.useMemo(() => {
  //   return data?.count ? Math.ceil(data.count / rowsPerPage) : 0;
  // }, [data?.count, rowsPerPage]);

  const pages = 3;

  const filteredItems = React.useMemo(() => {
    let filteredCourses = [...courses];
    setPage(1);

    if (hasSearchFilterName) {
      filteredCourses = filteredCourses.filter((course) =>
        course.title.toLowerCase().includes(filterCourseName.toLowerCase())
      );
    }

    return filteredCourses;
  }, [courses, filterCourseName]);

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

  const topContent: ReactNode = React.useMemo(() => {
    return (
      // Search/Filter
      <div className="flex w-full flex-row">
        {/* Search Name*/}
        <div className="flex flex-col gap-2">
          <span>Lesson name</span>
          <Input
            className="w-full bg-white"
            variant="bordered"
            size={'md'}
            type=""
            placeholder="Find course"
            value={filterCourseName}
            onChange={(e) => setFilterCourseName(e.target.value)}
          />
        </div>
        {/* Filter Start date */}
        {/* <div className="flex flex-col gap-2">
          <span>Start date</span>
          <DateInput
            key={'start-date'}
            variant="bordered"
            className="w-[210px]"
            value={filterStartDate}
            onChange={setFilterStartDate}
          />
        </div> */}
        {/* Filter end date */}
        {/* <div className="flex flex-col gap-2">
          <span>End date</span>
          <DateInput
            key={'end-date'}
            variant="bordered"
            className="w-[210px]"
            value={filterEndDate}
            onChange={setFilterEndDate}
          />
        </div> */}
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
  }, [filterCourseName]);

  const handleSubmit = async () => {
    const listCourses = courses.map((course) => course.id);
    const updateData: UpdateProgramDto = {
      courseId: listCourses
    };
    try {
      setIsSubmitting(true); // Bắt đầu gửi yêu cầu
      // Gọi API và đợi kết quả
      if (program) {
        const result = await editProgram(program.id, updateData);
        if (result) {
          toast.success('Program edited successfully!');
        }
      }
    } catch (error: any) {
      console.error('🚫 ~ onSubmit ~ Error:', error);
      toast.error(
        error.response?.data?.message ||
          'Failed to edit program. Please try again.'
      );
    } finally {
      setIsSubmitting(false); // Hoàn tất gửi yêu cầu
    }
  };

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
                Program Name
              </span>
              <Input
                type=""
                variant="bordered"
                className="w-full"
                size="lg"
                readOnly
                placeholder="Enter your project name"
                value={program?.title}
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
                  value={program?.type.toUpperCase()}
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
                  value={program?.code}
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
                  color={program?.isActive ? 'success' : 'default'}
                  size="lg"
                  variant="flat"
                >
                  {program?.isActive ? 'Published' : 'Unpublished'}
                </Chip>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-row gap-28">
            {/* Description */}
            <div className="flex w-full basis-[50%] flex-col gap-2">
              <span className="text-xl font-semibold text-on-surface">
                Description
              </span>
              <textarea
                // variant={'bordered'}
                // size="lg"
                placeholder="Enter your description"
                className="col-span-12 mb-6 h-40 w-full rounded-2xl border border-on-surface/20 p-3 md:col-span-6 md:mb-0"
                readOnly
                value={program?.description}
                // onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex w-full basis-[50%] flex-row gap-28">
              <div className="flex w-full shrink flex-col gap-2">
                <span className="text-xl font-semibold text-on-surface">
                  Session Quantity
                </span>
                <Input
                  type=""
                  variant="bordered"
                  className="w-full"
                  size="lg"
                  readOnly
                  placeholder="Enter your project name"
                  value={program?.sessionQuantity.toString()}
                  // onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
              {/* price */}
              {/* <div className="flex w-full shrink flex-col gap-2">
                <span className="text-xl font-semibold text-on-surface">
                  Price
                </span>
                <Input
                  type="text"
                  variant="bordered"
                  className="w-full"
                  size="lg"
                  readOnly
                  placeholder="Enter your project name"
                  value={program?.price.toString()}
                  // onChange={(e) => setProjectName(e.target.value)}
                />
              </div> */}
            </div>
          </div>
          <Divider />
          <div className="flex w-full flex-col">
            {/* Title */}
            <span className="text-xl font-semibold text-on-surface">
              Course List
            </span>

            {/* Table Content*/}
            <div className="flex h-[490px] flex-col gap-2">
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
          {/* Save Button  */}
          <Button
            className="ml-auto h-14 rounded-2xl bg-on-primary text-white"
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
            onClick={handleSubmit}
          >
            {isSubmitting ? 'Summitting...' : 'Save'}
          </Button>
          <Divider />
          <ListStudent programId={programId as string} />
        </div>
      </div>
      {program && (
        <AddCoursesModal
          isOpen={isOpen}
          onOpen={onOpen}
          courseType={program.type}
          onOpenChange={onOpenChange}
          courses={courses}
          setCourses={setCourses}
        />
      )}
    </main>
  );
};

export default ProgramDetail;
