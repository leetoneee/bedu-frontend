import { Divider, Tooltip, useDisclosure } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import axios from '@/libs/axiosInstance';
import useSWR from 'swr';
import ScoreStaticChart from '@/components/Charts/ScoreStaticChart';
import { Question } from '@/types/question-bank.type';
import { getRateData } from '@/services/answers.service';
import { EyeIcon } from '@heroicons/react/24/outline';
import ViewQuestionModal from './ViewQuestion.modal';
import ViewListModal from './ViewList.modal';

type Props = {
  examId: number;
  nameExam: string;
};

type BasicStatis = {
  studentJoinIn: number;
  averageScore: string;
  lessThanOne: number;
  greaterThanOrEqualFive: number;
  mostCommonScore: number;
  totalTries: number;
};

type CorrectAndIncorrectRate = {
  question: Question;
  totalStudent: number;
  totalAttempt: number;
  totalNotAttempt: number;
  rightStudent: number;
  wrongStudent: number;
  listOfStudentsHaveNotDone: string[];
  wrongStudentList: string[];
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const Statistical = ({ examId, nameExam }: Props) => {
  //!  CONTROL View question modal
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<
    number | null
  >(null);
  const {
    isOpen: isOpenQ,
    onOpen: onOpenQ,
    onOpenChange: onOpenChangeQ,
    onClose: onCloseQ
  } = useDisclosure();
  const handleViewQuestionModal = (question: Question, index: number) => {
    setSelectedQuestion(question);
    setSelectedQuestionIndex(index);
    onOpenQ();
  };
  const handleCloseViewQuestionModal = () => {
    onCloseQ();
    setSelectedQuestion(null);
    setSelectedQuestionIndex(null);
  };

  //! CONTROL View list modal
  const [selectedList, setSelectedList] = useState<string[] | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const {
    isOpen: isOpenL,
    onOpen: onOpenL,
    onOpenChange: onOpenChangeL,
    onClose: onCloseL
  } = useDisclosure();
  const handleViewListModal = (list: string[], title: string) => {
    setSelectedList(list);
    setSelectedTitle(title);
    onOpenL();
  };
  const handleCloseViewListModal = () => {
    onCloseL();
    setSelectedList(null);
    setSelectedTitle(null);
  };

  const [basic, setBasic] = useState<BasicStatis | null>(null);
  const [scoresDistribution, setScoresDistribution] = useState<number[]>([]);
  const [questionIds, setQuestionIds] = useState<number[]>([]);
  const [rateData, setRateData] = useState<CorrectAndIncorrectRate[]>([]);

  const {
    data: basicData
    // isLoading,
    // error: classError,
    // mutate: refreshEndpoint
  } = useSWR(`/answers/basicsStatistical/${examId}`, fetcher);

  const {
    data: scoreDisData
    // isLoading,
    // error: classError,
    // mutate: refreshEndpoint
  } = useSWR(`/answers/scoreDistributor/${examId}`, fetcher);

  const {
    data: examData
    // isLoading,
    // error: classError,
    // mutate: refreshEndpoint
  } = useSWR(`/exams/item/${examId}`, fetcher);

  useEffect(() => {
    if (basicData && basicData.metadata) {
      setBasic(basicData.metadata);
    }
  }, [basicData]);

  useEffect(() => {
    if (scoreDisData && scoreDisData.metadata) {
      setScoresDistribution(scoreDisData.metadata);
    }
  }, [scoreDisData]);

  useEffect(() => {
    if (examData && examData.metadata) {
      if (examData.metadata.questions.length > 0) {
        const questions: Question[] = examData.metadata.questions;
        const ids = questions.map((question) => question.id);
        setQuestionIds(ids);
      }
    }
  }, [examData]);

  useEffect(() => {
    const fetchData = async () => {
      for (const id of questionIds) {
        try {
          const response = await getRateData({ examId, questionId: id });
          setRateData((prevRateData) => [...prevRateData, response.metadata]);
        } catch (error) {
          console.error(`Error fetching data for ID ${id}:`, error);
        }
      }
    };
    fetchData();
  }, [questionIds, examId]);

  //! Frequency table
  const totalParticipants = basic?.studentJoinIn;
  const totalTries = basic?.totalTries;
  const formattedData = scoresDistribution.map((quantity, index) => {
    if (!totalTries)
      return {
        quantity,
        percentage: `0`,
        label: `<${index + 1}` // Label for the column
      };
    const percentage = ((quantity / totalTries) * 100).toFixed(0); // Calculate percentage
    return {
      quantity,
      percentage: `${percentage}`,
      label: `<${index + 1}` // Label for the column
    };
  });

  // Additional columns: >=5 and Average
  const greaterThanOrEqualTo5 = scoresDistribution[9] - scoresDistribution[4];
  const greaterThanOrEqualTo5Percentage = (
    (greaterThanOrEqualTo5 / (totalTries ?? 1)) *
    100
  ).toFixed(0);

  const tableData = {
    participants: totalParticipants,
    columns: formattedData,
    greaterThanOrEqualTo5: {
      quantity: greaterThanOrEqualTo5,
      percentage: `${greaterThanOrEqualTo5Percentage}`
    }
  };

  return (
    <div className="flex h-full w-full flex-col gap-2 rounded rounded-t-none border-on-surface/20 bg-white p-5 shadow-sm">
      {/* Code ở đây */}
      <div className="flex w-full flex-col gap-6">
        <div className="flex w-full flex-col gap-2">
          <span className="text-xl font-semibold text-on-surface">
            Basic statistics
          </span>
          <div className="flex items-center justify-center">
            <div className="flex flex-col space-x-8 rounded-lg bg-white p-8 shadow-md">
              <h1 className="mb-4 text-xl font-semibold">{nameExam}</h1>
              <div className="flex flex-row">
                <div className="mb-4 pr-8">
                  <div className="mb-4">
                    <i className="fas fa-edit mr-2 text-gray-400"></i>
                    <span className="text-gray-400">
                      NUMBER OF PARTICIPANTS
                    </span>
                    <div className="text-lg font-medium">
                      <i className="fas fa-edit mr-2 text-gray-400"></i>
                      {basic?.studentJoinIn}
                    </div>
                  </div>
                  <div className="mb-4">
                    <i className="fas fa-edit mr-2 text-gray-400"></i>
                    <span className="text-gray-400">TOTAL TRIES</span>
                    <div className="text-lg font-medium">
                      <i className="fas fa-edit mr-2 text-gray-400"></i>
                      {basic?.totalTries}
                    </div>
                  </div>
                </div>
                <div className="border-l border-gray-200 pl-8">
                  <div className="mb-4">
                    <span className="text-gray-400">AVERAGE SCORE</span>
                    <div className="text-lg font-medium">
                      {Number(basic?.averageScore).toFixed(2)}
                    </div>
                  </div>
                  <div className="mb-4">
                    <span className="text-gray-400">
                      NUMBER OF STUDENTS WITH SCORES &lt; 1
                    </span>
                    <div className="text-lg font-medium">
                      {basic?.lessThanOne}
                    </div>
                  </div>
                  <div className="mb-4">
                    <span className="text-gray-400">
                      NUMBER OF STUDENTS WITH SCORES &gt;= 5
                    </span>
                    <div className="text-lg font-medium">
                      {basic?.greaterThanOrEqualFive}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-400">
                      SCORE ACHIEVED BY THE MOST STUDENTS
                    </span>
                    <div className="text-lg font-medium">
                      {basic?.mostCommonScore}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Divider />
        <div className="flex w-full flex-col gap-2">
          {/* Title */}
          <span className="text-xl font-semibold text-on-surface">
            Score distribution
          </span>
          <div className="h-[550px] w-full">
            {scoresDistribution.length > 0 && (
              <ScoreStaticChart scores={scoresDistribution} />
            )}
          </div>
        </div>
        <Divider />
        <div className="flex w-full flex-col gap-2">
          {/* Title */}
          <span className="text-xl font-semibold text-on-surface">
            Frequency Table
          </span>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border border-gray-300 px-4 py-2" rowSpan={1}>
                    Quantity
                  </th>
                  <th className="border border-gray-300 px-4 py-2" colSpan={2}>
                    &lt; 1
                  </th>
                  <th className="border border-gray-300 px-4 py-2" colSpan={2}>
                    &lt; 2
                  </th>
                  <th className="border border-gray-300 px-4 py-2" colSpan={2}>
                    &lt; 3
                  </th>
                  <th className="border border-gray-300 px-4 py-2" colSpan={2}>
                    &lt; 4
                  </th>
                  <th className="border border-gray-300 px-4 py-2" colSpan={2}>
                    &lt; 5
                  </th>
                  <th className="border border-gray-300 px-4 py-2" colSpan={2}>
                    &lt; 6
                  </th>
                  <th className="border border-gray-300 px-4 py-2" colSpan={2}>
                    &lt; 7
                  </th>
                  <th className="border border-gray-300 px-4 py-2" colSpan={2}>
                    &lt; 8
                  </th>
                  <th className="border border-gray-300 px-4 py-2" colSpan={2}>
                    &lt; 9
                  </th>
                  <th className="border border-gray-300 px-4 py-2" colSpan={2}>
                    &lt;= 10
                  </th>
                  <th className="border border-gray-300 px-4 py-2" colSpan={2}>
                    <span className="text-nowrap">Average(&gt;= 5)</span>
                  </th>
                </tr>
                <tr className="bg-blue-100">
                  <th className="border border-gray-300 px-4 py-2">
                    Participants
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Q</th>
                  <th className="border border-gray-300 px-4 py-2">%</th>
                  <th className="border border-gray-300 px-4 py-2">Q</th>
                  <th className="border border-gray-300 px-4 py-2">%</th>
                  <th className="border border-gray-300 px-4 py-2">Q</th>
                  <th className="border border-gray-300 px-4 py-2">%</th>
                  <th className="border border-gray-300 px-4 py-2">Q</th>
                  <th className="border border-gray-300 px-4 py-2">%</th>
                  <th className="border border-gray-300 px-4 py-2">Q</th>
                  <th className="border border-gray-300 px-4 py-2">%</th>
                  <th className="border border-gray-300 px-4 py-2">Q</th>
                  <th className="border border-gray-300 px-4 py-2">%</th>
                  <th className="border border-gray-300 px-4 py-2">Q</th>
                  <th className="border border-gray-300 px-4 py-2">%</th>
                  <th className="border border-gray-300 px-4 py-2">Q</th>
                  <th className="border border-gray-300 px-4 py-2">%</th>
                  <th className="border border-gray-300 px-4 py-2">Q</th>
                  <th className="border border-gray-300 px-4 py-2">%</th>
                  <th className="border border-gray-300 px-4 py-2">Q</th>
                  <th className="border border-gray-300 px-4 py-2">%</th>
                  <th className="border border-gray-300 px-4 py-2">Q</th>
                  <th className="border border-gray-300 px-4 py-2">%</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">
                    {tableData.participants}
                  </td>
                  {tableData.columns.map((col, index) => (
                    <React.Fragment key={index}>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {col.quantity}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {col.percentage}
                      </td>
                    </React.Fragment>
                  ))}
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {tableData.greaterThanOrEqualTo5.quantity}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {tableData.greaterThanOrEqualTo5.percentage}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Divider />
        <div className="flex w-full flex-col gap-2">
          {/* Title */}
          <span className="text-xl font-semibold text-on-surface">
            Table of Corect and Incorrect Rates
          </span>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border border-gray-200 px-4 py-2">No.</th>
                  <th className="border border-gray-200 px-4 py-2">
                    Question ID
                  </th>
                  <th className="border border-gray-200 px-4 py-2">
                    Total Students
                  </th>
                  <th className="border border-gray-200 px-4 py-2">
                    Attempted
                  </th>
                  <th className="border border-gray-200 px-4 py-2">
                    Not Attempted
                  </th>
                  <th className="border border-gray-200 px-4 py-2">Correct</th>
                  <th className="border border-gray-200 px-4 py-2">
                    Incorrect
                  </th>
                  <th className="border border-gray-200 px-4 py-2">
                    Incompletion Rate (%)
                  </th>
                  <th className="border border-gray-200 px-4 py-2">
                    Incorrect List
                  </th>
                  <th className="border border-gray-200 px-4 py-2">
                    Not Attempted List
                  </th>
                </tr>
              </thead>
              <tbody>
                {rateData &&
                  rateData.map((item, index) => (
                    <tr key={index} className="bg-white">
                      <td className="border border-gray-200 px-4 py-2 text-center">
                        {index + 1}
                      </td>
                      <td className="flex flex-nowrap items-center justify-between gap-1 text-nowrap border border-gray-200 px-4 py-2 text-center">
                        Question {index + 1}
                        <Tooltip
                          content="Watch question"
                          className="bg-on-primary"
                          delay={1000}
                        >
                          <span
                            className="flex cursor-pointer items-center justify-center text-lg text-on-primary active:opacity-50"
                            onClick={() =>
                              handleViewQuestionModal(item.question, index)
                            }
                          >
                            <EyeIcon className="size-5" />
                          </span>
                        </Tooltip>
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-center">
                        {item.totalStudent}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-center">
                        {item.totalAttempt}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-center">
                        {item.totalNotAttempt}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-center">
                        {item.rightStudent}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-center">
                        {item.wrongStudent}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-center">
                        {item.totalStudent > 0
                          ? (
                              (item.totalNotAttempt / item.totalStudent) *
                              100
                            ).toFixed(2)
                          : 'N/A'}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {item.wrongStudentList.length > 0 ? (
                          <Tooltip
                            content="Watch incorrect list"
                            className="h-full bg-on-primary"
                            delay={1000}
                          >
                            <span
                              className="flex cursor-pointer items-center justify-center text-lg text-on-primary active:opacity-50"
                              onClick={() =>
                                handleViewListModal(
                                  item.wrongStudentList,
                                  'Incorrect List'
                                )
                              }
                            >
                              <EyeIcon className="size-5" />
                            </span>
                          </Tooltip>
                        ) : (
                          <Tooltip
                            content="Empty list"
                            className="bg-danger"
                            delay={1000}
                          >
                            <span
                              className="flex cursor-pointer items-center justify-center text-lg text-danger active:opacity-50"
                              onClick={() => {}}
                            >
                              <EyeIcon className="size-5" />
                            </span>
                          </Tooltip>
                        )}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-center">
                        {item.listOfStudentsHaveNotDone.length > 0 ? (
                          <Tooltip
                            content="Empty list"
                            className="bg-on-primary"
                            delay={1000}
                          >
                            <span
                              className="flex cursor-pointer items-center justify-center text-lg text-on-primary active:opacity-50"
                              onClick={() =>
                                handleViewListModal(
                                  item.listOfStudentsHaveNotDone,
                                  'Not Attempted List'
                                )
                              }
                            >
                              <EyeIcon className="size-5" />
                            </span>
                          </Tooltip>
                        ) : (
                          <Tooltip
                            content="Empty list"
                            className="bg-danger"
                            delay={1000}
                          >
                            <span
                              className="flex cursor-pointer items-center justify-center text-lg text-danger active:opacity-50"
                              onClick={() => {}}
                            >
                              <EyeIcon className="size-5" />
                            </span>
                          </Tooltip>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {selectedQuestion && selectedQuestionIndex !== null && (
        <ViewQuestionModal
          index={selectedQuestionIndex}
          isOpen={isOpenQ}
          onClose={handleCloseViewQuestionModal}
          onOpen={onOpenQ}
          onOpenChange={onOpenChangeQ}
          question={selectedQuestion}
        />
      )}
      {selectedList && selectedTitle && (
        <ViewListModal
          isOpen={isOpenL}
          onClose={handleCloseViewListModal}
          onOpen={onOpenL}
          onOpenChange={onOpenChangeL}
          list={selectedList}
          title={selectedTitle}
        />
      )}
    </div>
  );
};

export default Statistical;
