export const formatAnswer = (
  answer: string | string[],
  possibleAnswers: string[],
  questionType: string
): string => {
  if (questionType === 'MultipleChoice') {
    return possibleAnswers
      .map((choice) =>
        Array.isArray(answer)
          ? answer.includes(choice)
            ? choice
            : '@'
          : answer === choice
            ? choice
            : '@'
      )
      .join('/');
  }

  if (questionType === 'SingleChoice') {
    return answer as string;
  }

  if (questionType === 'FillInTheBlankChoice') {
    return Array.isArray(answer) ? answer.join('/') : answer;
  }

  return '';
};
