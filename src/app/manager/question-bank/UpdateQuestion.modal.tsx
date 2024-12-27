import React, { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
  Divider,
  Checkbox,
  SelectItem,
  Select,
  Selection,
  Button,
  Tooltip
} from '@nextui-org/react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { ButtonSolid } from '@/components';
import { editQuestion, UpdateQuestionDto } from '@/services/questions.service';
import { Question } from '@/types/question-bank.type';

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  onClose: () => void;
  onUpdate?: () => void;
  questionUpdate: Question;
};

export const questionTypes = [
  { key: 'MultipleChoice', label: 'Multiple Choice' },
  { key: 'SingleChoice', label: 'Single Choice' },
  { key: 'FillInTheBlankChoice', label: 'Fill In The Blank' }
];

const UpdateQuestion = ({
  isOpen,
  onOpenChange,
  onClose,
  onUpdate,
  questionUpdate
}: Props) => {
  const [content, setContent] = useState<string>('');
  const [question, setQuestion] = useState<string>('');
  const [totalPoints, settotalPoints] = useState<string>('');
  // Danh sách các câu trả lời
  const [answers, setAnswers] = useState<{ id: number; answer: string }[]>([]);
  const [pointDivision, setPointDivision] = useState<
    { id: number; point: number }[]
  >([]);
  // Danh sách ID của đáp án đúng
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);
  const [answer, setAnswer] = useState<string>('');
  const [attach, setAttach] = useState<string>('');
  const [questionType, setQuestionType] = useState<Selection>(
    new Set([`${questionUpdate.questionType}`])
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const parseAnswers = (answers: string): { id: number; answer: string }[] => {
    return answers.split('/').map((answer, index) => ({
      id: index + 1, // ID bắt đầu từ 1
      answer: answer.trim() // Xóa khoảng trắng nếu có
    }));
  };

  const parseCorrectAnswers = (correctAnswers: string): number[] => {
    let ans: number[] = [];
    let ansArr = correctAnswers.split('/');
    for (let i = 0; i < ansArr.length; i++) {
      if (ansArr[i] !== '@') {
        ans.push(i + 1);
      }
    }
    return ans;
  };

  const parsePointDivision = (
    pointDivision: string
  ): { id: number; point: number }[] => {
    return pointDivision.split('/').map((point, index) => ({
      id: index + 1, // ID bắt đầu từ 1
      point: Number(point)
    }));
  };

  useEffect(() => {
    if (questionUpdate) {
      setContent(questionUpdate.content);
      setQuestion(questionUpdate.question);
      settotalPoints(questionUpdate.totalPoints.toString());
      setPointDivision(parsePointDivision(questionUpdate.pointDivision));
      setAnswers(parseAnswers(questionUpdate.possibleAnswer));
      setCorrectAnswers(parseCorrectAnswers(questionUpdate.answer));
      setAttach(questionUpdate.attach);
      // setQuestionType(new Set([`${questionUpdate.questionType}`]));
    }
  }, [questionUpdate]);

  const selectedType = React.useMemo(
    () => Array.from(questionType).join(', ').replaceAll('_', ' '),
    [questionType]
  );

  const makeAnswer = (
    typeQuestion: string,
    answers: { id: number; answer: string }[],
    correctAnswers: number[]
  ) => {
    let possibleAnswersAPI = answers.map((answer) => answer.answer).join('/');
    let answerAPI: string = '';
    if (typeQuestion === 'FillInTheBlankChoice') {
      answerAPI = possibleAnswersAPI;
    } else {
      answerAPI = answers
        .map((answer) =>
          correctAnswers.includes(answer.id) ? answer.answer : '@'
        )
        .join('/');
    }
    return { answerAPI, possibleAnswersAPI };
  };

  const [errors, setErrors] = useState<{
    content: string;
    question: string;
    totalPoints: string;
    pointDivision: string;
    answers: string;
    correctAnswers: string;
    questionType: string;
  }>({
    content: '',
    question: '',
    totalPoints: '',
    pointDivision: '',
    answers: '', // những đáp án lựa chọn không được trống
    correctAnswers: '', // id cho đáp án đúng không được trống
    questionType: ''
  });

  const validateInputs = () => {
    const newErrors = { ...errors };
    newErrors.content = content.trim() === '' ? 'Content is required' : '';
    newErrors.question = question.trim() === '' ? 'Question is required' : '';
    newErrors.totalPoints =
      totalPoints.trim() === '' ? 'Score is required' : '';
    newErrors.questionType = selectedType ? '' : 'Question type is required';
    //Single Choice & Multiple Choice
    if (selectedType === 'SingleChoice' || selectedType === 'MultipleChoice') {
      if (answers.length === 0) {
        newErrors.answers = 'List of answers cannot be empty';
      } else {
        const emptyAnswers = answers.filter(
          (answer) => answer.answer.trim() === ''
        );
        newErrors.answers =
          emptyAnswers.length > 0 ? 'Answer choices cannot be empty' : '';
      }
      newErrors.correctAnswers =
        correctAnswers.length === 0 ? 'Please select a correct answer' : '';
    }

    // Fill in the blank
    if (selectedType === 'FillInTheBlankChoice') {
      // answers không được là chuỗi rỗng
      const emptyAnswers = answers.filter(
        (answer) => answer.answer.trim() === ''
      );
      if (emptyAnswers.length > 0) {
        newErrors.answers = 'Answers cannot be empty';
      } else if (answers.length === 0) {
        // answers phải có ít nhất 1 câu trả lời
        newErrors.answers = 'At least one answer is required';
      } else {
        newErrors.answers = '';
      }
      // answers.length phải bằng correctAnswers.length
      newErrors.correctAnswers =
        answers.length !== correctAnswers.length
          ? 'The number of answers must match the number of correct answers'
          : '';
      // Tổng pointDivision phải bằng totalPoints
      const totalPointssSum = pointDivision.reduce(
        (sum, point) => sum + point.point,
        0
      );
      newErrors.totalPoints =
        isNaN(parseFloat(totalPoints)) ||
        totalPointssSum !== parseFloat(totalPoints)
          ? `Total points (${totalPointssSum}) must equal the total point (${totalPoints})`
          : '';
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

  const validateInputsSpec = () => {
    const newErrors = {
      content: '',
      question: '',
      totalPoints: '',
      pointDivision: '',
      answers: '',
      correctAnswers: '',
      questionType: ''
    };

    // Single Choice & Multiple Choice
    if (selectedType === 'SingleChoice' || selectedType === 'MultipleChoice') {
      if (answers.length === 0) {
        newErrors.answers = 'List of answers cannot be empty';
      } else {
        const emptyAnswers = answers.filter(
          (answer) => answer.answer.trim() === ''
        );
        newErrors.answers =
          emptyAnswers.length > 0 ? 'Answer choices cannot be empty' : '';
      }
      newErrors.correctAnswers =
        correctAnswers.length === 0 ? 'Please select a correct answer' : '';
    }

    // Fill in the blank
    if (selectedType === 'FillInTheBlankChoice') {
      // answers không được là chuỗi rỗng
      const emptyAnswers = answers.filter(
        (answer) => answer.answer.trim() === ''
      );
      if (emptyAnswers.length > 0) {
        newErrors.answers = 'Answers cannot be empty';
      } else if (answers.length === 0) {
        // answers phải có ít nhất 1 câu trả lời
        newErrors.answers = 'At least one answer is required';
      } else {
        newErrors.answers = '';
      }

      // answers.length phải bằng correctAnswers.length
      newErrors.correctAnswers =
        answers.length !== correctAnswers.length
          ? 'The number of answers must match the number of correct answers'
          : '';

      // Tổng pointDivision phải bằng totalPoints
      const totalPointssSum = pointDivision.reduce(
        (sum, point) => sum + point.point,
        0
      );
      if (pointDivision.length !== 0) {
        newErrors.totalPoints =
          isNaN(parseFloat(totalPoints)) ||
          totalPointssSum !== parseFloat(totalPoints)
            ? `Total points (${totalPointssSum}) must equal the total point (${totalPoints})`
            : '';
      }
    }

    // Cập nhật trạng thái lỗi
    setErrors(newErrors);

    // Kiểm tra chỉ ba lỗi cụ thể
    const isAnswersValid = !newErrors.answers;
    const isCorrectAnswersValid = !newErrors.correctAnswers;
    const istotalPointsValid = !newErrors.totalPoints;

    return isAnswersValid && isCorrectAnswersValid && istotalPointsValid;
  };

  const renderError = (field: keyof typeof errors) => {
    //Bug questionType hiện ở dưới Modal
    if (errors[field]) {
      if (['pointDivision', 'answers', 'correctAnswers'].includes(field)) {
        // Hiển thị toast warning với cấu hình yêu cầu
        toast.error(`⚠️ ${errors[field]}`);
      } else {
        // Hiển thị lỗi như cũ cho các trường khác
        return (
          <span className="absolute bottom-[-20px] left-2 h-4 min-w-max text-sm text-danger">
            {errors[field]}
          </span>
        );
      }
    }
  };

  const handleSubmit = async () => {
    if (!validateInputsSpec()) {
      if (selectedType === 'FillInTheBlankChoice') {
        renderError('pointDivision');
      }
      renderError('answers');
      renderError('correctAnswers'); // Kiểm tra correctAnswers là bước cuối cùng
    }

    if (validateInputs()) {
      console.log('Form is valid. Submitting...');
      // Handle form submission logic here
      let pointDivisionAPI = pointDivision
        .map((division) => division.point)
        .join('/');
      let { answerAPI, possibleAnswersAPI } = makeAnswer(
        selectedType,
        answers,
        correctAnswers
      );
      const data: UpdateQuestionDto = {
        question: question,
        totalPoints: Number(totalPoints),
        pointDivision: pointDivisionAPI,
        content: content,
        attach: attach,
        questionType: selectedType,
        possibleAnswer: possibleAnswersAPI,
        answer: answerAPI
      };
      // console.log('data: ', data);
      try {
        setIsSubmitting(true); // Bắt đầu gửi yêu cầu
        // Gọi API và đợi kết quả trả về
        const result = await editQuestion(questionUpdate.id, data);
        if (result) {
          handleClose();
          if (onUpdate) {
            onUpdate();
          }
        }
      } catch (error: any) {
        console.error('🚫 ~ onSubmit ~ Error:', error);
        toast.error(
          error.response?.data?.message ||
            'Failed to update question. Please try again.'
        );
      } finally {
        setIsSubmitting(false); // Hoàn tất gửi yêu cầu
      }
    } else {
      console.log('Form has errors. Fix them to proceed.');
    }
  };

  const handleChangeSelection = (selectedKey: Selection) => {
    setErrors({
      content: '',
      question: '',
      totalPoints: '',
      pointDivision: '',
      answers: '',
      correctAnswers: '',
      questionType: ''
    });
    setContent('');
    setQuestion('');
    settotalPoints('');
    setPointDivision([]);
    setAnswer('');
    setAnswers([]);
    setCorrectAnswers([]);
    validateInputsSpec();
    setQuestionType(selectedKey);
  };

  // useEffect(() => {
  //   setErrors({
  //     content: '',
  //     question: '',
  //     totalPoints: '',
  //     pointDivision: '',
  //     answers: '',
  //     correctAnswers: '',
  //     questionType: ''
  //   });
  //   setContent('');
  //   setQuestion('');
  //   settotalPoints('');
  //   setPointDivision([]);
  //   setAnswer('');
  //   setAnswers([]);
  //   setCorrectAnswers([]);
  //   validateInputsSpec();
  // }, [selectedType]);

  const handleClose = () => {
    onClose();
  };

  // Thêm câu trả lời mới
  const addAnswer = () => {
    if (selectedType === 'FillInTheBlankChoice') {
      // Với type fillin, thêm câu trả lời mới vào cả answers và correctAnswers
      const newId = answers.length ? answers[answers.length - 1].id + 1 : 1;
      const newAnswer = { id: newId, answer: '' };
      setAnswers([...answers, newAnswer]);
      setCorrectAnswers([...correctAnswers, newAnswer.id]); // Luôn đồng bộ answers và correctAnswers
    } else {
      // Với single và multiple choice
      const newId = answers.length ? answers[answers.length - 1].id + 1 : 1;
      setAnswers([...answers, { id: newId, answer: '' }]);
    }
  };

  // Xóa câu trả lời
  const deleteAnswer = (id: number) => {
    // Xóa câu trả lời trong answers
    setAnswers(answers.filter((ans) => ans.id !== id));

    if (selectedType === 'FillInTheBlankChoice') {
      // Với type fillin, xóa pointDivision của id tương ứng
      setPointDivision(pointDivision.filter((point) => point.id !== id));
    }

    // Xóa id tương ứng khỏi correctAnswers
    setCorrectAnswers(correctAnswers.filter((correctId) => correctId !== id));
  };

  // Cập nhật nội dung câu trả lời
  const updateAnswer = (id: number, newAnswer: string) => {
    if (selectedType === 'FillInTheBlankChoice') {
      // Với type fillin, cập nhật cả answers và correctAnswers
      setAnswers((prevAnswers) =>
        prevAnswers.map((answer) =>
          answer.id === id ? { ...answer, answer: newAnswer } : answer
        )
      );
      if (correctAnswers.length === 0) {
        console.log('correctAnswers length: ', correctAnswers.length);
        setCorrectAnswers([id]);
      } else {
        setCorrectAnswers((prevCorrectAnswers) =>
          prevCorrectAnswers.map((correctId) =>
            correctId === id ? id : correctId
          )
        );
      }
    } else {
      // Với single và multiple choice
      setAnswers((prevAnswers) =>
        prevAnswers.map((answer) =>
          answer.id === id ? { ...answer, answer: newAnswer } : answer
        )
      );
    }
  };
  // Chuyển đổi trạng thái "đáp án đúng"
  const toggleCorrectAnswer = (id: number) => {
    if (selectedType === 'SingleChoice') {
      // Single choice: chỉ cho phép một đáp án đúng
      if (correctAnswers.includes(id)) {
        setCorrectAnswers([]); // Bỏ chọn nếu đã chọn
      } else {
        setCorrectAnswers([id]); // Chỉ lưu một đáp án
      }
    } else if (selectedType === 'MultipleChoice') {
      // Multiple choice: cho phép nhiều đáp án đúng
      if (correctAnswers.includes(id)) {
        setCorrectAnswers(
          correctAnswers.filter((correctId) => correctId !== id)
        ); // Bỏ chọn
      } else {
        setCorrectAnswers([...correctAnswers, id]); // Thêm đáp án
      }
    } else if (selectedType === 'FillInTheBlankChoice') {
      // Fill in the blank: logic khác, ví dụ không áp dụng checkbox
      console.warn('Fill in the blank không sử dụng toggleCorrectAnswer');
    }
  };

  // Dành riêng cho fillin
  const updatePointDivision = (id: number, newPoint: number) => {
    setPointDivision((prevPointDivision) => {
      // Nếu pointDivision rỗng, thêm đối tượng mới
      if (prevPointDivision.length === 0) {
        return [{ id, point: newPoint }];
      }

      // Cập nhật nếu đã tồn tại, hoặc thêm mới nếu id chưa tồn tại
      const pointExists = prevPointDivision.some((point) => point.id === id);
      if (!pointExists) {
        return [...prevPointDivision, { id, point: newPoint }];
      }

      // Cập nhật giá trị point cho id tương ứng
      return prevPointDivision.map((point) =>
        point.id === id ? { ...point, point: newPoint } : point
      );
    });
  };

  const size: '2xl' = '2xl';
  return (
    <Modal
      size={size}
      isOpen={isOpen}
      radius="lg"
      onOpenChange={onOpenChange}
      onClose={handleClose}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      scrollBehavior="outside"
      classNames={{
        body: 'border-outline-var bg-white px-6 py-5',
        backdrop: 'bg-[#292f46]/50 backdrop-opacity-40',
        base: 'border-outline-var bg-outline-var',
        header: 'border-border border-b-[1px] bg-white',
        footer: 'border-border border-t-[1px] bg-white'
      }}
    >
      <ModalContent>
        <ModalHeader className="w-full rounded-t-xl border">
          <div className="h-11 w-11 content-center rounded-lg border-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="mx-auto size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
              />
            </svg>
          </div>
          <div className="ml-5">
            <div className="text-lg font-semibold">Update question</div>
            <div className="text-wrap text-sm font-normal">
              Update question for question bank.
            </div>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-7">
            {/**Question type */}
            <div className="flex flex-row">
              <div className="basis-[30%]">
                <span className="text-sm font-medium text-black">
                  Question type <span className="text-danger">*</span>
                </span>
                {renderError('questionType')}
              </div>
              <div className="basis-[70%]">
                <Select
                  className="max-w-xs text-black"
                  placeholder="Select an question type"
                  selectedKeys={questionType}
                  variant="bordered"
                  onSelectionChange={(keys) => handleChangeSelection(keys)}
                >
                  {questionTypes.map((questionType) => (
                    <SelectItem key={questionType.key}>
                      {questionType.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </div>
            {/**Score */}
            <div className="flex flex-row">
              <div className="basis-[30%]">
                <span className="text-sm font-medium text-black">
                  Score <span className="text-danger">*</span>
                </span>
              </div>
              <div className="relative flex basis-[70%] gap-8">
                <input
                  type="number"
                  className="w-full rounded-lg text-black"
                  placeholder="Enter score..."
                  value={totalPoints}
                  onChange={(e) => settotalPoints(e.target.value)}
                />
                {renderError('totalPoints')}
              </div>
            </div>
            {/**Content */}
            <div className="flex flex-row">
              <div className="basis-[30%]">
                <span className="text-sm font-medium text-black">
                  Content <span className="text-danger">*</span>
                </span>
              </div>
              <div className="relative flex basis-[70%] gap-8">
                <input
                  type="text"
                  className="w-full rounded-lg text-black"
                  placeholder="Enter Content..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                {renderError('content')}
              </div>
            </div>
            {/**Question */}
            <div className="flex flex-row">
              <div className="basis-[30%]">
                <span className="text-sm font-medium text-black">
                  Question <span className="text-danger">*</span>
                </span>
              </div>
              <div className="relative flex basis-[70%] gap-8">
                <input
                  type="text"
                  className="w-full rounded-lg text-black"
                  placeholder="Enter Question..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
                {renderError('question')}
              </div>
            </div>

            {/* Program image  */}

            {selectedType && selectedType === 'SingleChoice' ? (
              <div className="w-full gap-3">
                <Divider />
                <div className="flex flex-row pt-8">
                  <div className="w-full">
                    {answers.map((answer) => (
                      <div
                        key={answer.id}
                        className="mb-4 flex flex-row items-center gap-4"
                      >
                        {/* Checkbox để chọn đáp án đúng */}
                        <div className="flex items-center">
                          <Checkbox
                            isSelected={correctAnswers.includes(answer.id)}
                            onChange={() => toggleCorrectAnswer(answer.id)} // Trực tiếp gọi toggleCorrectAnswer
                            color="success"
                          />
                        </div>

                        {/* Input để nhập nội dung câu trả lời */}
                        <div className="flex w-full flex-row items-center gap-4">
                          {/* Input chiếm toàn bộ không gian */}
                          <input
                            type="text"
                            className="w-full flex-grow rounded-lg border p-2"
                            placeholder="Enter answer"
                            value={answer.answer}
                            onChange={(e) => {
                              updateAnswer(answer.id, e.target.value);
                            }}
                            onFocus={(e) => e.target.select()}
                          />

                          {/* Nút xóa */}
                          <Tooltip color="danger" content="Delete" delay={200}>
                            <span
                              className="cursor-pointer text-lg text-danger active:opacity-50"
                              onClick={() => deleteAnswer(answer.id)}
                            >
                              <TrashIcon className="h-5 w-5" />
                            </span>
                          </Tooltip>
                        </div>
                      </div>
                    ))}

                    {/* Nút thêm câu trả lời */}
                    <ButtonSolid onClick={addAnswer} content="Add answer" />
                  </div>
                </div>
              </div>
            ) : selectedType === 'MultipleChoice' ? (
              <div className="w-full gap-3">
                <Divider />
                <div className="flex flex-row pt-8">
                  <div className="w-full">
                    {answers.map((answer) => (
                      <div
                        key={answer.id}
                        className="mb-4 flex flex-row items-center gap-4"
                      >
                        {/* Checkbox để chọn những đáp án đúng */}
                        <div className="flex items-center">
                          <Checkbox
                            isSelected={correctAnswers.includes(answer.id)}
                            onChange={() => toggleCorrectAnswer(answer.id)} // Trực tiếp gọi toggleCorrectAnswer
                            color="success"
                          />
                        </div>

                        {/* Input để nhập nội dung câu trả lời */}
                        <div className="flex w-full flex-row items-center gap-4">
                          {/* Input chiếm toàn bộ không gian */}
                          <input
                            type="text"
                            className="flex-grow rounded-lg border p-2"
                            placeholder="Enter answer"
                            value={answer.answer}
                            onChange={(e) => {
                              updateAnswer(answer.id, e.target.value);
                            }}
                            onFocus={(e) => e.target.select()}
                          />

                          {/* Nút xóa */}
                          <Tooltip color="danger" content="Delete" delay={200}>
                            <span
                              className="cursor-pointer text-lg text-danger active:opacity-50"
                              onClick={() => deleteAnswer(answer.id)}
                            >
                              <TrashIcon className="h-5 w-5" />
                            </span>
                          </Tooltip>
                        </div>
                      </div>
                    ))}

                    {/* Nút thêm câu trả lời */}
                    <ButtonSolid onClick={addAnswer} content="Add answer" />
                  </div>
                </div>
              </div>
            ) : selectedType === 'FillInTheBlankChoice' ? (
              <div className="w-full gap-3">
                <Divider />
                <div className="flex flex-row pt-8">
                  <div className="w-full">
                    {answers.map((answer) => (
                      <div
                        key={answer.id}
                        className="mb-4 flex flex-row items-center gap-4"
                      >
                        {/* Input để nhập nội dung câu trả lời */}
                        <div className="flex w-full flex-row items-center gap-4">
                          <input
                            type="text"
                            className="flex-grow rounded-lg border p-2"
                            placeholder="Enter answer"
                            value={answer.answer}
                            onChange={(e) => {
                              updateAnswer(answer.id, e.target.value);
                            }}
                            onFocus={(e) => e.target.select()}
                          />

                          <div className="flex flex-row gap-2">
                            <div className="flex flex-row">
                              <div className="basis-[30%]">
                                <span className="text-sm font-medium text-black">
                                  Point
                                  <span className="text-danger">*</span>
                                </span>
                              </div>
                              <div className="relative basis-[70%]">
                                <input
                                  type="number"
                                  className="w-full rounded-lg"
                                  placeholder="Enter point..."
                                  value={
                                    pointDivision.find(
                                      (point) => point.id === answer.id
                                    )?.point
                                  }
                                  onChange={(e) => {
                                    updatePointDivision(
                                      answer.id,
                                      e.target.value === ''
                                        ? 0
                                        : parseFloat(e.target.value)
                                    );
                                  }}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Nút xóa */}
                          <Tooltip color="danger" content="Delete" delay={200}>
                            <span
                              className="cursor-pointer text-lg text-danger active:opacity-50"
                              onClick={() => deleteAnswer(answer.id)}
                            >
                              <TrashIcon className="h-5 w-5" />
                            </span>
                          </Tooltip>
                        </div>
                      </div>
                    ))}

                    {/* Nút thêm câu trả lời */}
                    <ButtonSolid onClick={addAnswer} content="Add answer" />
                  </div>
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex w-full flex-row justify-between space-x-6">
            <Button
              onPress={handleClose}
              className="w-full rounded-lg border border-outline bg-white py-2 text-[16px] font-medium text-black hover:bg-highlight"
            >
              Cancel
            </Button>
            <Button
              color="primary"
              onPress={handleSubmit}
              className="w-full rounded-lg border border-outline bg-on-primary py-2 text-[16px] font-medium text-white"
            >
              {isSubmitting ? 'Submitting...' : 'Update'}
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateQuestion;
