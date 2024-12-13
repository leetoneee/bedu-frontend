'use client';

import { Breadcrumb } from '@/components';
import { columns } from '@/data/program-course.data';
import { Crumb } from '@/types';
import { Course } from '@/types/course.type';
import { statusColorMap } from '@/types/lesson.type';
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
  PlusIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { SSProgram } from '@/types/program.type';
import { getProgramById } from '@/data/program.data';
import { getCoursesByProgramId } from '@/data/program-course.data';
import AddCoursesModal from './add-course.modal';

const ProgramDetail = ({ params }: any) => {
  const param: { programId: string } = use(params);
  const { programId } = param;
  const [courses, setCourses] = useState<Course[]>([]);
  const [program, setProgram] = useState<SSProgram>();
  const crumbs: Crumb[] = useMemo(() => {
    return [
      {
        label: 'Self-study Program',
        href: '/manager/self-study-program'
      },
      {
        label: `${program?.title}`,
        href: `/self-study-program/${programId}`
      }
    ];
  }, [programId, program]);

  useEffect(() => {
    const data: Course[] = getCoursesByProgramId(Number(programId));
    const data2: SSProgram = getProgramById(Number(programId));
    setCourses(data);
    setProgram(data2);
  }, [programId]);

  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // State for filter
  const [filterCourseName, setFilterCourseName] = useState<string>('');
  const hasSearchFilterName = Boolean(filterCourseName);
  const [filterStartDate, setFilterStartDate] = useState<CalendarDate>();
  const [filterEndDate, setFilterEndDate] = useState<CalendarDate>();
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
          return cellValue;
      }
    },
    []
  );

  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: '#',
    direction: 'ascending'
  });

  const [page, setPage] = useState(1);
  const rowsPerPage = 6;

  const pages = Math.ceil(courses.length / rowsPerPage);

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

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: Course, b: Course) => {
      const first = a[sortDescriptor.column as keyof Course] as number;
      const second = b[sortDescriptor.column as keyof Course] as number;
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
            value={filterCourseName}
            onChange={(e) => setFilterCourseName(e.target.value)}
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
  }, [filterCourseName]);

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
                type="text"
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
              {/* Code */}
              <div className="flex w-full shrink flex-col gap-2">
                <span className="text-xl font-semibold text-on-surface">
                  Code
                </span>
                <Input
                  type="text"
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
                  color={program?.isPublish ? 'success' : 'default'}
                  size="lg"
                  variant="flat"
                >
                  {program?.isPublish ? 'Published' : 'Unpublished'}
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
              <Textarea
                variant={'bordered'}
                size="lg"
                placeholder="Enter your description"
                className="col-span-12 mb-6 md:col-span-6 md:mb-0"
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
                  type="text"
                  variant="bordered"
                  className="w-full"
                  size="lg"
                  readOnly
                  placeholder="Enter your project name"
                  value={program?.sessionQuantity.toString()}
                  // onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
              <div className="flex w-full shrink flex-col gap-2">
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
              </div>
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
        </div>

        {/* Save Button  */}
        <div className="flex w-full">
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
          >
            Save
          </Button>
        </div>
      </div>
      <AddCoursesModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        courses={courses}
        setCourses={setCourses}
      />
    </main>
  );
};

export default ProgramDetail;
