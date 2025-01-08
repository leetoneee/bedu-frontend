import { ButtonSolid } from '@/components';
import { Payment } from '@/types/payment.type';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import {
  Input,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  Spinner,
  TableRow,
  TableCell,
  Pagination,
  Tooltip,
  SortDescriptor,
  useDisclosure
} from '@nextui-org/react';
import React, { Key, ReactNode, useCallback, useEffect, useState } from 'react';
import { columnsP as columns } from '@/data/payment.data';
import axios from '@/libs/axiosInstance';
import useSWR from 'swr';
import { toast } from 'react-toastify';
import DeletePaymentModal from '../DeletePayment.modal';
import AddTuition from './AddTuition.modal';
import { formatNumberWithCommas } from '@/helpers';
import EditTuition from './EditTuition.modal';
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const SSPTab = () => {
  //! Control Modal
  //!  CONTROL Add modal
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  //!  CONTROL Edit modal
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const {
    isOpen: isOpenE,
    onOpen: onOpenE,
    onOpenChange: onOpenChangeE,
    onClose: onCloseE
  } = useDisclosure();
  const handleEditClick = (payment: Payment) => {
    setSelectedPayment(payment);
    onOpenE();
  };
  //!  CONTROL Delete modal
  const {
    isOpen: isOpenD,
    onOpen: onOpenD,
    onOpenChange: onOpenChangeD,
    onClose: onCloseD
  } = useDisclosure();
  const handleDeleteClick = (payment: Payment) => {
    setSelectedPayment(payment);
    onOpenD();
  };
  // Hàm đóng modal và reset selectedCourse
  const handleCloseEditModal = () => {
    onCloseE();
    setSelectedPayment(null);
  };
  const handleCloseDeleteModal = () => {
    onCloseD();
    setSelectedPayment(null);
  };

  // State
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filterTransactionId, setFilterTransactionId] = useState('');
  const hasSearchFilter = Boolean(filterTransactionId);
  const [filterUserName, setFilterUserName] = useState('');
  const [filterProgramName, setFilterProgramName] = useState('');
  const [totalTuition, setTotalTuition] = useState(0);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: '#',
    direction: 'ascending'
  });
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const endpoint = `/payments/all?page=${page}&limit=${rowsPerPage}`;

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
      setTotalTuition(0);
      setPayments([]);
    } else if (data?.metadata) {
      const listPayments = data.metadata.payments.filter(
        (payment: Payment) => payment.program !== null
      );
      setTotalTuition(data.metadata.totalRecord);
      setPayments(listPayments);
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
    isLoading || data?.metadata.payments.length === 0 ? 'loading' : 'idle';

  const renderCell = useCallback(
    (payment: Payment, columnKey: Key): ReactNode => {
      console.log('🚀 ~ SSPTab ~ payment:', payment);
      const cellValue =
        columnKey !== 'actions'
          ? payment[columnKey as keyof Payment]
          : 'actions';

      switch (columnKey) {
        case 'id':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {cellValue && cellValue.toString()}
              </p>
            </div>
          );
        case 'transactionId':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {cellValue && cellValue.toString()}
              </p>
            </div>
          );

        case 'user':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {payment.user && payment.user.name}
              </p>
            </div>
          );
        case 'program':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {payment.program && payment.program.title}
              </p>
            </div>
          );
        case 'class':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {payment.class && payment.class.name}
              </p>
            </div>
          );
        case 'amount':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {cellValue && formatNumberWithCommas(cellValue.toString())} VND
              </p>
            </div>
          );
        case 'method':
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
                  onClick={() => handleEditClick(payment)}
                >
                  <PencilIcon className="size-5" />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete" delay={1000}>
                <span
                  className="cursor-pointer text-lg text-danger active:opacity-50"
                  onClick={() => handleDeleteClick(payment)}
                >
                  <TrashIcon className="size-5" />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue && cellValue.toString();
      }
    },
    []
  );

  const filteredItems = React.useMemo(() => {
    let filteredPayments = [...payments];

    if (hasSearchFilter) {
      filteredPayments = filteredPayments.filter((course) =>
        course.transactionId
          .toLowerCase()
          .includes(filterTransactionId.toLowerCase())
      );
    }

    if (filterUserName) {
      filteredPayments = filteredPayments.filter((course) =>
        course.user.name.toLowerCase().includes(filterUserName.toLowerCase())
      );
    }

    if (filterProgramName) {
      filteredPayments = filteredPayments.filter((course) =>
        course.program.title
          .toLowerCase()
          .includes(filterProgramName.toLowerCase())
      );
    }
    return filteredPayments;
  }, [payments, filterTransactionId, filterUserName, filterProgramName]);

  // const items = React.useMemo(() => {
  //   const start = (page - 1) * rowsPerPage;
  //   const end = start + rowsPerPage;

  //   return filteredItems.slice(start, end);
  // }, [page, filteredItems]);

  const sortedItems = React.useMemo(() => {
    return [...filteredItems].sort((a: Payment, b: Payment) => {
      const first = a[sortDescriptor.column as keyof Payment] as number;
      const second = b[sortDescriptor.column as keyof Payment] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, filteredItems]);

  const handleCreated = () => {
    toast.success('Payment created successfully');
    refreshEndpoint();
  };

  const handleEdited = () => {
    toast.success('Payment edited successfully');
    refreshEndpoint();
  };

  const handleDeleted = () => {
    toast.success('Payment deleted successfully');
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
            <span>Transaction ID</span>
            <Input
              className="bg-white"
              variant="bordered"
              size={'md'}
              type=""
              placeholder="Find transaction"
              value={filterTransactionId}
              onChange={(e) => setFilterTransactionId(e.target.value)}
            />
          </div>
          {/* Search Name*/}
          <div className="flex flex-col gap-2">
            <span>User name</span>
            <Input
              className="bg-white"
              variant="bordered"
              size={'md'}
              type=""
              placeholder="Find user's name"
              value={filterUserName}
              onChange={(e) => setFilterUserName(e.target.value)}
            />
          </div>
          {/* Search Name*/}
          <div className="flex flex-col gap-2">
            <span>Program name</span>
            <Input
              className="bg-white"
              variant="bordered"
              size={'md'}
              type=""
              placeholder="Find program's name"
              value={filterProgramName}
              onChange={(e) => setFilterProgramName(e.target.value)}
            />
          </div>
          <span>
            Total: <span className="text-2xl">{totalTuition}</span> transactions
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
      {/* Modals */}
      <AddTuition
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        onCreated={handleCreated}
      />
      {selectedPayment && (
        <EditTuition
          isOpen={isOpenE}
          onOpen={onOpenE}
          onOpenChange={onOpenChangeE}
          onClose={handleCloseEditModal}
          payment={selectedPayment}
          onEdited={handleEdited}
        />
      )}
      {selectedPayment && (
        <DeletePaymentModal
          isOpen={isOpenD}
          onOpen={onOpenD}
          onOpenChange={onOpenChangeD}
          onClose={handleCloseDeleteModal}
          paymentId={selectedPayment.id}
          transactionId={selectedPayment.transactionId}
          onDeleted={handleDeleted}
        />
      )}
    </div>
  );
};

export default SSPTab;
