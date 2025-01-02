import { User } from '@/types/user.type';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import {
  Button,
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
import React, { Key, ReactNode, useCallback, useEffect, useState } from 'react';
import { columns } from '@/data/program-user.data';
import useSWR from 'swr';
import axios from '@/libs/axiosInstance';
import { Enrollment, EnrollmentClass } from '@/types/enrollment.type';
import { toast } from 'react-toastify';
import AddUserClassModal from './AddUserClass.modal';
import DeleteUserClassModal from './DeleteUserClass.modal';

type Props = {
  classId: string;
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const ListStudent = ({ classId }: Props) => {
  const [selectedUserClass, setSelectedUserClass] =
    useState<EnrollmentClass | null>(null);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  //!  CONTROL Delete modal
  const {
    isOpen: isOpenD,
    onOpen: onOpenD,
    onOpenChange: onOpenChangeD,
    onClose: onCloseD
  } = useDisclosure();
  const handleDeleteClick = (user: User) => {
    const userClass = enrollments.find(
      (enrollment: EnrollmentClass) => enrollment.user.id === user.id
    );
    if (userClass) {
      setSelectedUserClass(userClass);
    } else {
      setSelectedUserClass(null);
    }
    onOpenD();
  };

  const rowsPerPage = 6;

  //! STUDENT LIST
  const [users, setUsers] = useState<User[]>([]);
  const [enrollments, setEnrollments] = useState<EnrollmentClass[]>([]);
  const [filterUserName, setFilterUserName] = useState<string>('');
  const hasSearchFilterUserName = Boolean(filterUserName);
  const [page, setPage] = useState(1);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: '#',
    direction: 'ascending'
  });

  const { data, mutate: refreshEndpoint } = useSWR(
    `/users-classes/all/type/${classId}?page=${page}&limit=${rowsPerPage}`,
    fetcher
  );

  useEffect(() => {
    if (data && data.metadata && data.metadata.enrollments) {
      setEnrollments(data.metadata.enrollments);
      const listUsers = data.metadata.userClasses.map(
        (enrollment: Enrollment) => ({
          id: enrollment.user.id,
          cid: enrollment.user.cid,
          name: enrollment.user.name,
          email: enrollment.user.email,
          time: enrollment.time
        })
      );
      setUsers(listUsers);
    }
  }, [data]);

  const pages = React.useMemo(() => {
    return data?.metadata.totalRecord
      ? Math.ceil(data.metadata.totalRecord / rowsPerPage)
      : 0;
  }, [data?.metadata.totalRecord, rowsPerPage]);

  const renderCell = useCallback((user: User, columnKey: Key): ReactNode => {
    const cellValue =
      columnKey !== 'actions' ? user[columnKey as keyof User] : 'actions';

    switch (columnKey) {
      case 'id':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">
              {cellValue?.toString()}
            </p>
          </div>
        );
      case 'cid':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">
              {cellValue?.toString()}
            </p>
          </div>
        );
      case 'name':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">
              {cellValue?.toString()}
            </p>
          </div>
        );
      case 'email':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-wraps text-sm">
              {cellValue?.toString()}
            </p>
          </div>
        );
      case 'time':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">
              {cellValue &&
                new Date(cellValue.toString()).toLocaleDateString('vn-VN', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
            </p>
          </div>
        );
      case 'actions':
        return (
          <div className="relative flex items-center justify-center gap-2">
            {/* <Tooltip content="Details" className="bg-on-primary" delay={1000}>
                <span
                  className="cursor-pointer text-lg text-on-primary active:opacity-50"
                  onClick={() => router.push(`courses/${course.id}`)}
                >
                  <EyeIcon className="size-5" />
                </span>
              </Tooltip> */}
            <Tooltip color="danger" content="Delete from program" delay={1000}>
              <span
                className="cursor-pointer text-lg text-danger active:opacity-50"
                onClick={() => handleDeleteClick(user)}
              >
                <TrashIcon className="size-5" />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue?.toString();
    }
  }, []);

  const topContent: ReactNode = React.useMemo(() => {
    return (
      // Search/Filter
      <div className="flex w-full flex-row">
        {/* Search Name*/}
        <div className="flex flex-col gap-2">
          <span>Student name</span>
          <Input
            className="w-full bg-white"
            variant="bordered"
            size={'md'}
            type=""
            placeholder="Find student"
            value={filterUserName}
            onChange={(e) => setFilterUserName(e.target.value)}
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
  }, [filterUserName]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];
    setPage(1);

    if (hasSearchFilterUserName) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterUserName.toLowerCase())
      );
    }

    return filteredUsers;
  }, [users, filterUserName]);

  const sortedItems = React.useMemo(() => {
    return [...filteredItems].sort((a: User, b: User) => {
      const first = a[sortDescriptor.column as keyof User] as number;
      const second = b[sortDescriptor.column as keyof User] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, filteredItems]);
  //

  const handleCreated = () => {
    toast.success('Student has been added to the class');
    refreshEndpoint();
  };

  const handleDelete = () => {
    toast.success('Student has been removed from the class');
    refreshEndpoint();
  };

  return (
    <div className="flex w-full flex-col">
      {/* Title */}
      <span className="text-xl font-semibold text-on-surface">
        Student List
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

      {/* Add User Modal */}
      <AddUserClassModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        onOpen={onOpen}
        classId={classId}
        onCreated={handleCreated}
      />
      {/* Delete Modal */}
      {selectedUserClass && (
        <DeleteUserClassModal
          isOpen={isOpenD}
          onOpenChange={onOpenChangeD}
          onClose={onCloseD}
          className={selectedUserClass.class.name}
          userClassId={selectedUserClass.id}
          userClassTitle={selectedUserClass.user.name}
          onDeleted={handleDelete}
        />
      )}
    </div>
  );
};

export default ListStudent;
