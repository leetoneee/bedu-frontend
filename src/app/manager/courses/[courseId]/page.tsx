'use client';

import { Breadcrumb, ButtonSolid } from '@/components';
import { columnsForCouse as columns } from '@/data/lesson.data';
import { Crumb } from '@/types';
import { Course } from '@/types/course.type';
import { Lesson, statusColorMap } from '@/types/lesson.type';
import {
  Button,
  CalendarDate,
  Chip,
  DateInput,
  Divider,
  Input,
  Pagination,
  SortDescriptor,
  Spinner,
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
import {
  EyeIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { useParams, useRouter } from 'next/navigation';
import axios from '@/libs/axiosInstance';
import useSWR, { mutate } from 'swr';
import AddLessonModal from './AddLesson.modal';
import { toast } from 'react-toastify';
import EditLessonModal from './EditLesson.modal';
import DeleteLessonModal from './DeleteLesson.modal';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const CourseDetail = () => {
  const router = useRouter();
  const params = useParams();
  const courseId = params.courseId;
  //!  CONTROL Add modal
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  //!  CONTROL Edit modal
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const {
    isOpen: isOpenE,
    onOpen: onOpenE,
    onOpenChange: onOpenChangeE,
    onClose: onCloseE
  } = useDisclosure();
  const handleEditClick = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    onOpenE();
  };
  //!  CONTROL Delete modal
  const {
    isOpen: isOpenD,
    onOpen: onOpenD,
    onOpenChange: onOpenChangeD,
    onClose: onCloseD
  } = useDisclosure();
  const handleDeleteClick = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    onOpenD();
  };
  // Hàm đóng modal và reset selectedCourse
  const handleCloseEditModal = () => {
    onCloseE();
    setSelectedLesson(null);
  };
  const handleCloseDeleteModal = () => {
    onCloseD();
    setSelectedLesson(null);
  };

  const {
    data,
    isLoading,
    error: courseError,
    mutate: refreshEndpoint
  } = useSWR(`/courses/item/${courseId}`, fetcher);

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [course, setCourse] = useState<Course>();
  const crumbs: Crumb[] = useMemo(() => {
    return [
      {
        label: 'Courses',
        href: '/manager/courses'
      },
      {
        label: course?.title || 'Loading...',
        href: `/manager/courses/${courseId}`
      }
    ];
  }, [courseId, course]);

  useEffect(() => {
    if (data?.metadata) {
      setCourse(data.metadata);
      setLessons(data.metadata.lesson);
    }
  }, [data]);

  const loadingState =
    isLoading || data?.metadata.lesson.length === 0 ? 'loading' : 'idle';

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
              <p className="text-bold text-sm capitalize">{cellValue}</p>
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
        case 'title':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{cellValue}</p>
            </div>
          );
        case 'startDate':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {new Date(cellValue.toString()).toLocaleDateString('vi-VE', {
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
                {new Date(cellValue.toString()).toLocaleDateString('vi-VE', {
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
        case 'isPublish':
          return (
            <Chip
              className="capitalize"
              color={
                statusColorMap[
                  (lesson.isActive
                    ? 'Published'
                    : 'Unpublished') as keyof typeof statusColorMap
                ]
              }
              size="sm"
              variant="flat"
            >
              {lesson.isActive ? 'Published' : 'Unpublished'}
            </Chip>
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
                  onClick={() => router.push(`lessons/${lesson.id}`)}
                >
                  <EyeIcon className="size-5" />
                </span>
              </Tooltip>
              <Tooltip content="Edit" color="warning" delay={1000}>
                <span
                  className="cursor-pointer text-lg text-on-secondary active:opacity-50"
                  onClick={() => handleEditClick(lesson)}
                >
                  <PencilIcon className="size-5" />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete" delay={1000}>
                <span
                  className="cursor-pointer text-lg text-danger active:opacity-50"
                  onClick={() => handleDeleteClick(lesson)}
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
        <ButtonSolid
          content="Add"
          className="my-auto ml-auto h-14 rounded-xl bg-blue-500 text-white shadow-md"
          iconLeft={<PlusIcon className="size-6 text-white" />}
          onClick={onOpen}
        />
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

  if (courseError) {
    return <div>Error loading data</div>;
  }

  return (
    <main className="flex flex-col items-center gap-4 p-4 sm:items-start">
      <Breadcrumb crumbs={crumbs} />
      <Divider />
      <div className="flex h-full w-full flex-col gap-2 rounded border border-on-surface/20 bg-white p-5 shadow-sm">
        <div className="flex min-h-max w-full flex-col gap-4">
          <div className="flex w-full flex-row gap-20">
            {/* Course Name */}
            <div className="flex w-full shrink basis-[40%] flex-col gap-2">
              <span className="text-xl font-semibold text-on-surface">
                Course Name
              </span>
              <Input
                type=""
                variant="bordered"
                className="w-full"
                size="lg"
                readOnly
                placeholder="Enter your project name"
                value={course?.title}
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
                  value={course?.courseType.toUpperCase()}
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
                  value={course?.code}
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
                  color={course?.isActive ? 'success' : 'default'}
                  size="lg"
                  variant="flat"
                >
                  {course?.isActive ? 'Published' : 'Unpublished'}
                </Chip>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-row gap-10">
            {/* Description */}
            <div className="flex w-full basis-[40%] flex-col gap-2">
              <span className="text-xl font-semibold text-on-surface">
                Description
              </span>
              <Textarea
                type=""
                variant={'bordered'}
                size="lg"
                placeholder="Enter your description"
                className="col-span-12 mb-6 md:col-span-6 md:mb-0"
                readOnly
                value={course?.description}
                // onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex w-full basis-[60%] flex-row gap-10">
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
                  value={course?.lessonQuantity.toString()}
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
                  value={course?.timePerLesson.toString()}
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
                  value={course?.price.toString()}
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
      {course && (
        <AddLessonModal
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
          courseId={course.id}
          courseName={course.title}
          courseType={course.courseType}
          onOpenChange={onOpenChange}
          onCreated={handleCreated}
        />
      )}
      {course && selectedLesson && (
        <EditLessonModal
          isOpen={isOpenE}
          onClose={handleCloseEditModal}
          onOpen={onOpenE}
          onOpenChange={onOpenChangeE}
          onEdited={handleEdited}
          courseName={course.title}
          lesson={selectedLesson}
        />
      )}
      {selectedLesson && (
        <DeleteLessonModal
          isOpen={isOpenD}
          onClose={handleCloseDeleteModal}
          onOpen={onOpenD}
          onOpenChange={onOpenChangeD}
          lessonId={selectedLesson.id}
          lessonTitle={'selectedLesson.title'}
          onDeleted={handleDeleted}
        />
      )}
    </main>
  );
};

export default CourseDetail;
