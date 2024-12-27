'use client';

import Breadcrumb from '@/components/Breadcrumb';
import { Crumb } from '@/types';
import {
  Chip,
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
  Tooltip,
  useDisclosure
} from '@nextui-org/react';
import React, { useEffect, useState, useCallback, Key, ReactNode } from 'react';
import { Selection } from '@nextui-org/react';
import { Question } from '@/types/question-bank.type';
import {
  PencilIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { columns, dataQuestions } from '@/data/question.data';
import axios from '@/libs/axiosInstance';
import useSWR from 'swr';
import { toast } from 'react-toastify';
import { ButtonSolid } from '@/components';
import AddQuestionModal from '@/app/manager/question-bank/AddQuestion.modal';
import DeleteQuestionModal from '@/app/manager/question-bank/DeleteQuestion.modal';
import UpdateQuestionModal from '@/app/manager/question-bank/UpdateQuestion.modal';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

// Can chinh refreshEndpoint();, SWR
// pages cho total cua pagination

export default function QuestionBank() {
  const crumbs: Crumb[] = [
    {
      label: 'Question Bank',
      href: '/manager/question-bank'
    }
  ];

  //! CONTROL Add Question modal
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  //!CONTROL Edit Question Modal
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );
  const {
    isOpen: isOpenE,
    onOpen: onOpenE,
    onOpenChange: onOpenChangeE,
    onClose: onCloseE
  } = useDisclosure();
  const handleEditClick = (question: Question) => {
    setSelectedQuestion(question);
    onOpenE();
  };
  //! CONTROL Delete Question Modal
  const {
    isOpen: isOpenD,
    onOpen: onOpenD,
    onOpenChange: onOpenChangeD,
    onClose: onCloseD
  } = useDisclosure();
  const handleDeleteClick = (question: Question) => {
    setSelectedQuestion(question);
    onOpenD();
  };
  // Hàm đóng modal và reset selectedCourse
  const handleCloseEditModal = () => {
    onCloseE();
    setSelectedQuestion(null);
  };
  const handleCloseDeleteModal = () => {
    onCloseD();
    setSelectedQuestion(null);
  };

  const [questions, setQuestions] = useState<Question[]>([]);
  const [filter, setFilter] = useState<string | null>(null); // 'Fill in the blanks', 'Multiple Choice Questions', 'Select multiple answers'
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [filterQuestionName, setFilterQuestionName] = useState<string>('');
  const hasSearchFilter = Boolean(filterQuestionName);
  const [selectedStatus, setSelectedStatus] = useState<Selection>(
    new Set(['all'])
  );
  const seletecValue = React.useMemo(
    () => Array.from(selectedStatus).join(', ').replaceAll('_', ' '),
    [selectedStatus]
  );
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: '#',
    direction: 'ascending'
  });
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const endpoint = `/question/all${filter ? `/type/${filter}` : ''}?page=${page}&limit=${rowsPerPage}`;

  const {
    data,
    error,
    isLoading,
    mutate: refreshEndpoint
  } = useSWR(endpoint, fetcher, {
    keepPreviousData: true
  });

  //Can sua lai
  const pages = 10; //pagination
  const loadingState =
    isLoading || data?.metadata.length === 0 ? 'loading' : 'idle';

  // Load data
  useEffect(() => {
    if (error) setQuestions([]);
    else if (data) setQuestions(data.metadata.questions);
  }, [data, filter]);

  useEffect(() => {
    setTotalQuestions(questions.length);
  }, [filter]);

  useEffect(() => {
    setTotalQuestions(questions.length);
  }, [questions]);

  const renderCell = useCallback(
    (question: Question, columnKey: Key): ReactNode => {
      const cellValue =
        columnKey !== 'actions'
          ? question[columnKey as keyof Question]
          : 'actions';
      switch (columnKey) {
        case 'id':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize text-on-surface">
                {cellValue}
              </p>
            </div>
          );
        case 'content':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize text-on-surface">
                {cellValue}
              </p>
            </div>
          );
        case 'question':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize text-on-surface">
                {cellValue}
              </p>
            </div>
          );
        case 'questionType':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize text-on-surface">
                {cellValue === 'MultipleChoice'
                  ? 'Multiple Choice'
                  : cellValue === 'SingleChoice'
                    ? 'Single Choice'
                    : 'Fill In The Blank'}
              </p>
            </div>
          );
        case 'totalPoints':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize text-on-surface">
                {cellValue}
              </p>
            </div>
          );
        case 'examId':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize text-on-primary">
                {cellValue}
              </p>
            </div>
          );
        case 'actions':
          return (
            <div className="relative flex items-center justify-center gap-2">
              <Tooltip content="Edit" color="warning" delay={1000}>
                <span
                  className="cursor-pointer text-lg text-on-secondary active:opacity-50"
                  onClick={() => handleEditClick(question)}
                >
                  <PencilIcon className="size-5" />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete" delay={1000}>
                <span
                  className="cursor-pointer text-lg text-danger active:opacity-50"
                  onClick={() => handleDeleteClick(question)}
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

  const filteredItems = React.useMemo(() => {
    let filteredQuestions = [...questions];
    if (hasSearchFilter) {
      filteredQuestions = filteredQuestions.filter((question) =>
        question.content
          .toLowerCase()
          .includes(filterQuestionName.toLowerCase())
      );
    }
    return filteredQuestions;
  }, [questions, filterQuestionName, seletecValue]);

  const sortedItems = React.useMemo(() => {
    return [...filteredItems].sort((a: Question, b: Question) => {
      const first = a[sortDescriptor.column as keyof Question] as number;
      const second = b[sortDescriptor.column as keyof Question] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, filteredItems]);

  const handleFilterChange = (newFilter: string | null) => {
    setPage(1); // Reset page to 1
    setFilter((prevFilter) => (prevFilter === newFilter ? null : newFilter));
  };

  const handleCreated = () => {
    toast.success('Question created successfully!');
    refreshEndpoint();
  };

  const handleEdited = () => {
    toast.success('Question edited successfully!');
    refreshEndpoint();
  };

  const handleDeleted = () => {
    toast.success('Question deleted successfully!');
    refreshEndpoint();
  };

  return (
    <main className="flex flex-col items-center gap-4 p-4 sm:items-start">
      <Breadcrumb crumbs={crumbs} />
      <Divider />
      <div className="flex h-full w-full flex-col gap-2 rounded border border-on-surface/20 bg-white p-5 shadow-sm">
        {/** Search & Filter */}
        <div className="flex w-full flex-col gap-5 rounded-2xl bg-b-primary p-8 shadow-md">
          {/**Search */}
          <div className="flex w-full flex-row gap-16">
            {/**Search Name */}
            <div className="flex flex-col gap-2">
              <span className="text-on-surface">Question name</span>
              <Input
                className="bg-white"
                variant="bordered"
                size="md"
                type=""
                placeholder="Find your question name"
                value={filterQuestionName}
                onChange={(e) => setFilterQuestionName(e.target.value)}
              />
            </div>
            <ButtonSolid
              content="Create"
              className="my-auto ml-auto h-14 rounded-2xl bg-on-primary text-white shadow-md"
              iconLeft={<PlusIcon className="size-6 text-white" />}
              onClick={onOpen}
            />
          </div>
          {/**Filter */}
          <div className="flex w-full flex-row gap-10">
            <div className="justify-center">
              <Chip
                className="select-none capitalize hover:cursor-pointer"
                color={'danger'}
                size="lg"
                variant={filter === 'multiple' ? 'flat' : 'bordered'}
                onClick={() => handleFilterChange('multiple')}
              >
                MULTIPLE CHOICE
              </Chip>
            </div>
            <div className="justify-center">
              <Chip
                className="select-none capitalize hover:cursor-pointer"
                color={'warning'}
                size="lg"
                variant={filter === 'single' ? 'flat' : 'bordered'}
                onClick={() => handleFilterChange('single')}
              >
                SINGLE CHOICE
              </Chip>
            </div>
            <div className="justify-center">
              <Chip
                className="select-none capitalize hover:cursor-pointer"
                color={'success'}
                size="lg"
                variant={filter === 'fillin' ? 'flat' : 'bordered'}
                onClick={() => handleFilterChange('fillin')}
              >
                FILL IN THE BLANK
              </Chip>
            </div>
            <span className="text-on-surface">
              Total:{' '}
              <span className="text-2xl text-on-surface">{totalQuestions}</span>{' '}
              questions
            </span>
          </div>
        </div>
        {/**Content table */}
        <div className="h-full shrink overflow-hidden rounded-2xl shadow-xl">
          <Table
            aria-label="Example table with client side pagination"
            className="h-full w-full"
            selectionMode="single"
            shadow="none"
            sortDescriptor={sortDescriptor}
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
        {/**Pagination */}
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
      <AddQuestionModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onOpen={onOpen}
        onClose={onClose}
        onCreated={handleCreated}
      />
      {isOpenD && selectedQuestion && (
        <DeleteQuestionModal
          isOpen={isOpenD}
          onOpen={onOpenD}
          onOpenChange={onOpenChangeD}
          onClose={handleCloseDeleteModal}
          questionId={selectedQuestion.id}
          questionContent={selectedQuestion.content}
          relatedExam={selectedQuestion.examId ? selectedQuestion.examId : []}
          onDeleted={handleDeleted}
        />
      )}
      {isOpenE && selectedQuestion && (
        <UpdateQuestionModal
          isOpen={isOpenE}
          onOpen={onOpenE}
          onOpenChange={onOpenChangeE}
          onClose={handleCloseEditModal}
          onUpdate={handleEdited}
          questionUpdate={selectedQuestion}
        />
      )}
    </main>
  );
}
