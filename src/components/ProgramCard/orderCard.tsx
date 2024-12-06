import ButtonSolid from '@/components/Button/ButtonSolid';
import { LiveProgramCardProps } from '@/types/programCard.type';
import Image from 'next/image';

const OrderCard = ({
  classInfo
}: {
  classInfo: LiveProgramCardProps;
}) => {
  const {
    id,
    code,
    description,
    image,
    lessonQuantity,
    name,
    price,
    startDate,
    studyForm,
    timePerLesson,
    rating,
    feedbacks
  } = classInfo;

  const formattedNumber = (price: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'decimal',
      maximumFractionDigits: 0
    }).format(price);
  };
  return (
    <div className="w-[400px] cursor-pointer rounded-xl border-[1px] border-outline text-xs transition-shadow duration-200 hover:shadow-lg">
      <div>
        <Image
          src={'/icons/course_img.svg'}
          alt={'Course Image'}
          width={400}
          height={200}
          className="rounded-t-xl object-cover"
        />
      </div>
      <div className="pl-4 pr-4 pb-4">
        <p className="mt-3 text-2xl font-bold text-outline-focus">
          {formattedNumber(price)} VND
        </p>
      </div>
      <div className='pl-4 pr-4 pb-4'>
        <ButtonSolid className='text-primary bg-on-primary w-full h-[70px] text-3xl rounded-md' content='Pay'/>
      </div>
    </div>
  );
};

export default OrderCard;
