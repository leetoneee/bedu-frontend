export const formatNumberToOrdinal = (num: number): string => {
  if (!Number.isInteger(num) || num <= 0) {
    throw new Error('Input must be a positive integer.');
  }

  const suffixes = ['th', 'st', 'nd', 'rd'];
  const lastDigit = num % 10; // Lấy chữ số cuối cùng
  const lastTwoDigits = num % 100; // Lấy hai chữ số cuối cùng để xử lý trường hợp ngoại lệ (11, 12, 13)

  // Nếu số thuộc các trường hợp đặc biệt (11, 12, 13), dùng "th"
  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return `${num}th`;
  }

  // Dựa vào chữ số cuối cùng để chọn hậu tố phù hợp
  const suffix = suffixes[lastDigit] || 'th';

  return `${num}${suffix}`;
};
