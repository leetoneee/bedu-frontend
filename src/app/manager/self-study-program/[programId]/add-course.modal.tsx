'use client';

import { columns } from '@/data/program-course.data';
import {
  EyeIcon,
  TrashIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import {
  Selection,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  SortDescriptor,
  Input,
  Pagination,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHeader,
  TableColumn,
  Tooltip,
  Chip
} from '@nextui-org/react';
import React, {
  Dispatch,
  Key,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useState
} from 'react';
import { Course, statusColorMap } from '@/types/course.type';
import axios from '@/libs/axiosInstance';
import useSWR from 'swr';

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  courseType: string;
  courses: Course[];
  setCourses: Dispatch<SetStateAction<Course[]>>;
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const AddCoursesModal = ({
  isOpen,
  onOpenChange,
  courseType,
  courses,
  setCourses
}: Props) => {
  const [filterMemberName, setFilterMemberName] = useState<string>('');
  const hasSearchFilterName = Boolean(filterMemberName);

  // defaultKeys and disabledKey for Table in Modal
  const [listCourses, setListCourses] = useState<Course[]>([]);
  // const [filter, setFilter] = useState<string | null>(null); // 'ielts', 'toeic', 'toefl', or null
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [lastSelectedKeys, setLastSelectedKeys] = useState<Selection>(
    new Set([])
  );
  const [disabledKeys, setDisabledKeys] = useState<Selection>(new Set([]));

  useEffect(() => {
    const disabledIds = new Set(
      listCourses
        .filter((course) => course.isActive === false)
        .map((course) => course.id.toString())
    );
    setDisabledKeys(disabledIds);
  }, [listCourses]);

  useEffect(() => {
    // Find matching assignee IDs
    const selectedIds = new Set(
      listCourses
        .filter((listcourse) =>
          courses.some((course) => course.id === listcourse.id)
        )
        .map((listcourse) => listcourse.id.toString())
    );
    setSelectedKeys(selectedIds);
    setLastSelectedKeys(selectedIds);
  }, [listCourses, courses]);
  //

  const [page, setPage] = useState(1);
  const rowsPerPage = 4;

  // const pages = React.useMemo(() => {
  //   return data?.count ? Math.ceil(data.count / rowsPerPage) : 0;
  // }, [data?.count, rowsPerPage]);
  const pages = 3;
  const endpoint = `/courses/all${courseType ? `/${courseType}` : ''}?page=${page}&limit=${rowsPerPage}`;

  const {
    data: coursesData,
    error,
    isLoading
  } = useSWR(endpoint, fetcher, {
    keepPreviousData: true
  });

  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: '#',
    direction: 'ascending'
  });

  // Load data
  useEffect(() => {
    if (error) setListCourses([]);
    else if (coursesData) setListCourses(coursesData.metadata.courses);
  }, [coursesData]);

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
                  // onClick={() => router.push(`courses/${course.id}`)}
                >
                  <EyeIcon className="size-5" />
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

  const filteredItems = React.useMemo(() => {
    let filteredListCourses = [...listCourses];

    if (hasSearchFilterName) {
      filteredListCourses = filteredListCourses.filter((member) =>
        member.title.toLowerCase().includes(filterMemberName.toLowerCase())
      );
    }

    return filteredListCourses;
  }, [listCourses, filterMemberName]);

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
      <div className="flex w-full flex-row gap-16">
        {/* Search Name*/}
        <div className="flex flex-col gap-2">
          <span>Project name</span>
          <Input
            className="w-full bg-white"
            variant="bordered"
            size={'md'}
            type=""
            placeholder="Find your team member"
            value={filterMemberName}
            onChange={(e) => setFilterMemberName(e.target.value)}
          />
        </div>

        {/* <div className="h-full place-content-end">
          <Button
            className="mb-auto h-14 rounded-2xl bg-main-blue text-white shadow-md"
            startContent={<MagnifyingGlassIcon className="size-6 text-white" />}
            size="sm"
          />
        </div> */}
      </div>
    );
  }, [filterMemberName]);

  const handleContinue = () => {
    const selectedCourses: Course[] = listCourses.filter((listcourse) => {
      if (selectedKeys === 'all') return true;
      if (selectedKeys instanceof Set) {
        return selectedKeys.has(listcourse.id.toString());
      }
    });
    console.log('🚀 ~ handleContinue ~ selectedCourses:', selectedCourses);

    setCourses(selectedCourses);
  };

  const handleClose = () => {
    setSelectedKeys(lastSelectedKeys);
    setPage(1);
  };

  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      radius="lg"
      size="5xl"
      scrollBehavior="outside"
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      hideCloseButton
      classNames={{
        body: 'py-6 bg-white border-outline-var',
        backdrop: 'bg-[#292f46]/50 backdrop-opacity-40',
        base: 'border-outline-var bg-outline-var',
        header: 'border-b-[1px] border-border bg-white',
        footer: 'border-t-[1px] border-border bg-white'
        // closeButton: 'hover:bg-on-primary/5 active:bg-on-primary/10 disable'
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-row justify-between">
              <span className="text-4xl font-semibold">
                Add Courses To Program
              </span>
              <XMarkIcon
                className="size-10 hover:cursor-pointer"
                onClick={onClose}
              />
            </ModalHeader>
            <ModalBody>
              <div className="flex h-[440px] flex-col gap-2">
                {/* Table */}
                <div className="border-outline-var/75 h-full shrink overflow-hidden rounded-xl border shadow-xl">
                  <Table
                    aria-label="Example table with client side pagination"
                    className="h-full w-full"
                    selectionMode="multiple"
                    shadow="none"
                    color="default"
                    topContent={topContent}
                    topContentPlacement="inside"
                    sortDescriptor={sortDescriptor}
                    onSortChange={setSortDescriptor}
                    disabledKeys={disabledKeys}
                    selectedKeys={selectedKeys}
                    onSelectionChange={setSelectedKeys}
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
                      className="bg-second-blue"
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
                    className=""
                    color="default"
                    page={page}
                    total={pages}
                    onChange={(page) => setPage(page)}
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                className="bg-on-primary p-5 text-xl text-white shadow-lg"
                onPress={() => {
                  handleContinue();
                  onClose();
                }}
              >
                Continue
              </Button>
              <Button
                color="default"
                variant="solid"
                onPress={() => {
                  handleClose();
                  onClose();
                }}
                className="ml-6 p-5 text-xl shadow-lg"
              >
                Cancel
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddCoursesModal;
