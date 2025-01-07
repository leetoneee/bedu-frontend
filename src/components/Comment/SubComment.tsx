'use client'

import Image from 'next/image';

type CommentProps = {
  commentId: number;
  username: string;
  content: string;
  commentTime: Date;
  hasChildren: boolean;
};

const SubComment = ({ comment  }: { comment : CommentProps }) => {
  return (
    <div className="flex flex-col gap-2 p-4 bg-highlight rounded-md">
      <div className="flex flex-row items-center gap-4">
        <div className="w-[3%]">
          <Image
            src="/images/avtCommentDefault.svg"
            width={40}
            height={40}
            alt="avater"
          />
        </div>
        <div className="w-[97%]">
          <span className="font-bold text-outline-focus">
            {'Username tam'}
          </span>
        </div>
      </div>
      <div className="flex flex-row gap-4">
        <div className="h-[30px] w-[3%]"></div>
        <div className="w-[97%]">
          <span className="text-black">{comment.content}</span>
        </div>
      </div>
    </div>
  );
};

export default SubComment;
