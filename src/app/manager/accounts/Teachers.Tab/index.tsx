import { ButtonSolid } from '@/components';
import { columns } from '@/data/user.data';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import {
  useDisclosure,
  SortDescriptor,
  Input,
  Tooltip,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  Spinner,
  TableRow,
  TableCell,
  Pagination
} from '@nextui-org/react';
import React, { Key, ReactNode, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from '@/libs/axiosInstance';
import useSWR from 'swr';
import { User } from '@/types/user.type';
import DeleteUserModal from '../DeleteUser.modal';
import AddUserModal from '../AddUser.modal';
import EditUserModal from '../EditUser.modal';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const TeachersTab = () => {
  //! Control Modal
  //!  CONTROL Add modal
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  //!  CONTROL Edit modal
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const {
    isOpen: isOpenE,
    onOpen: onOpenE,
    onOpenChange: onOpenChangeE,
    onClose: onCloseE
  } = useDisclosure();
  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    onOpenE();
  };
  //!  CONTROL Delete modal
  const {
    isOpen: isOpenD,
    onOpen: onOpenD,
    onOpenChange: onOpenChangeD,
    onClose: onCloseD
  } = useDisclosure();
  const handleDeleteClick = (user: User) => {
    setSelectedUser(user);
    onOpenD();
  };
  // Hàm đóng modal và reset selectedCourse
  const handleCloseEditModal = () => {
    onCloseE();
    setSelectedUser(null);
  };
  const handleCloseDeleteModal = () => {
    onCloseD();
    setSelectedUser(null);
  };

  // State
  const [users, setUsers] = useState<User[]>([]);
  const [filterName, setFilterName] = useState('');
  const hasSearchFilter = Boolean(filterName);
  const [filterCID, setFilterCID] = useState('');
  const [filterEmail, setFilterEmail] = useState('');
  const [totalUser, setTotalUser] = useState(0);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: '#',
    direction: 'ascending'
  });
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const endpoint = `/users/groupUser/teacher?page=${page}&limit=${rowsPerPage}`;

  const {
    data,
    error,
    isLoading,
    mutate: refreshEndpoint
  } = useSWR(endpoint, fetcher, {
    keepPreviousData: true
  });

  useEffect(() => {
    if (error) {
      setTotalUser(0);
      setUsers([]);
    } else if (data?.metadata) {
      setTotalUser(data.metadata.totalRecord);
      setUsers(data.metadata.users);
    }
  }, [data]);

  const pages = React.useMemo(() => {
    if (data)
      return data?.metadata.totalRecord
        ? Math.ceil(data.metadata.totalRecord / rowsPerPage)
        : 0;
    return 1;
  }, [data, rowsPerPage]);

  const loadingState =
    isLoading || data?.metadata.users.length === 0 ? 'loading' : 'idle';

  const renderCell = useCallback((user: User, columnKey: Key): ReactNode => {
    console.log('🚀 ~ SSPTab ~ payment:', user);
    const cellValue =
      columnKey !== 'actions' ? user[columnKey as keyof User] : 'actions';

    switch (columnKey) {
      case 'id':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">
              {cellValue && cellValue.toString()}
            </p>
          </div>
        );
      case 'name':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">
              {cellValue && cellValue.toString()}
            </p>
          </div>
        );
      case 'username':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">
              {cellValue && cellValue.toString()}
            </p>
          </div>
        );
      case 'cid':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">
              {cellValue && cellValue.toString()}
            </p>
          </div>
        );
      case 'email':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm">
              {cellValue && cellValue.toString()}
            </p>
          </div>
        );
      case 'phone':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">
              {cellValue && cellValue.toString()}
            </p>
          </div>
        );
      case 'currentLevel':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">
              {cellValue && cellValue.toString()}
            </p>
          </div>
        );
      case 'actions':
        return (
          <div className="relative flex items-center justify-center gap-2">
            <Tooltip content="Edit" color="warning" delay={1000}>
              <span
                className="cursor-pointer text-lg text-on-secondary active:opacity-50"
                onClick={() => handleEditClick(user)}
              >
                <PencilIcon className="size-5" />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete" delay={1000}>
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
        return cellValue && cellValue.toString();
    }
  }, []);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterName.toLowerCase())
      );
    }

    if (filterCID) {
      filteredUsers = filteredUsers.filter((user) =>
        user.cid.toLowerCase().includes(filterCID.toLowerCase())
      );
    }

    if (filterEmail) {
      filteredUsers = filteredUsers.filter((user) =>
        user.email.toLowerCase().includes(filterEmail.toLowerCase())
      );
    }
    return filteredUsers;
  }, [users, filterName, filterCID, filterEmail]);

  // const items = React.useMemo(() => {
  //   const start = (page - 1) * rowsPerPage;
  //   const end = start + rowsPerPage;

  //   return filteredItems.slice(start, end);
  // }, [page, filteredItems]);

  const sortedItems = React.useMemo(() => {
    return [...filteredItems].sort((a: User, b: User) => {
      const first = a[sortDescriptor.column as keyof User] as number;
      const second = b[sortDescriptor.column as keyof User] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, filteredItems]);

  const handleCreated = () => {
    toast.success('Create user successfully!');
    refreshEndpoint();
  };

  const handleEdited = () => {
    toast.success('Edit user successfully!');
    refreshEndpoint();
  };

  const handleDeleted = () => {
    toast.success('Delete user successfully!');
    refreshEndpoint();
  };

  return (
    <div className="flex h-full w-full flex-col gap-2 rounded rounded-t-none border-on-surface/20 bg-white p-5 shadow-sm">
      {/* Code ở đây */}
      {/* Search & Filter */}
      <div className="flex w-full flex-col gap-5 rounded-2xl bg-b-primary p-8 shadow-md">
        {/* Search/Filter */}
        <div className="flex w-full flex-row gap-16">
          {/* Search Name*/}
          <div className="flex flex-col gap-2">
            <span>Name</span>
            <Input
              className="bg-white"
              variant="bordered"
              size={'md'}
              type=""
              placeholder="Find user's name"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
            />
          </div>
          {/* Search Name*/}
          <div className="flex flex-col gap-2">
            <span>CID</span>
            <Input
              className="bg-white"
              variant="bordered"
              size={'md'}
              type=""
              placeholder="Find by CID"
              value={filterCID}
              onChange={(e) => setFilterCID(e.target.value)}
            />
          </div>
          {/* Search Name*/}
          <div className="flex flex-col gap-2">
            <span>Email</span>
            <Input
              className="bg-white"
              variant="bordered"
              size={'md'}
              type=""
              placeholder="Find user's email"
              value={filterEmail}
              onChange={(e) => setFilterEmail(e.target.value)}
            />
          </div>
          <span>
            Total: <span className="text-2xl">{totalUser}</span> students
          </span>
          <ButtonSolid
            content="Create"
            className="my-auto ml-auto h-14 rounded-2xl bg-blue-500 text-white shadow-md"
            iconLeft={<PlusIcon className="size-6 text-white" />}
            onClick={onOpen}
          />
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
      {/* Modal */}
      {/* Add Modal */}
       <AddUserModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        onCreated={handleCreated}
      />
      {selectedUser && (
        <EditUserModal
          onOpen={onOpenE}
          isOpen={isOpenE}
          onOpenChange={onOpenChangeE}
          onClose={handleCloseEditModal}
          userId={selectedUser.id}
          onEdited={handleEdited}
        />
      )} 
      {selectedUser && (
        <DeleteUserModal
          isOpen={isOpenD}
          onOpen={onOpenD}
          onOpenChange={onOpenChangeD}
          onClose={handleCloseDeleteModal}
          userName={selectedUser.name}
          userId={selectedUser.id}
          onDeleted={handleDeleted}
        />
      )}
    </div>
  );
};

export default TeachersTab;
