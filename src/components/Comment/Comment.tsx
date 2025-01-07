'use client';

import ButtonBase from '@/components/Button/ButtonBase';
import axios from '@/libs/axiosInstance';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { ArrowTurnLeftDownIcon } from '@heroicons/react/24/outline';
import { Input } from '@nextui-org/react';
import { ButtonSolid, SubComment } from '@/components';

type CommentProps = {
  commentId: number;
  username: string;
  content: string;
  commentTime: Date;
  hasChildren: boolean;
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const Comment = ({
  comment,
  lessionId
}: {
  comment: CommentProps;
  lessionId: string;
}) => {
  const [commentReply, setCommentReply] = useState<string>('');

  const { data: dataSubComment } = useSWR(
    `/comment/parent/${comment.commentId}?lessonId=${lessionId}`,
    fetcher
  );
  const [subComments, setSubComments] = useState<CommentProps[]>([]);
  useEffect(() => {
    if (dataSubComment && dataSubComment.metadata)
      setSubComments(dataSubComment.metadata);
  }, [dataSubComment?.metadata]);

  const [expanded, setExpanded] = useState(false);
  const handleReply = () => {
    setExpanded((prev) => (prev = !prev));
  };

  return (
    <div className="flex flex-col gap-1">
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
            {comment.username}
          </span>
        </div>
      </div>
      <div className="flex flex-row gap-4">
        <div className="h-[30px] w-[3%]"></div>
        <div className="w-[97%]">
          <span className="text-on-surface">{comment.content}</span>
        </div>
      </div>
      <div className="flex flex-row gap-4">
        <div className="w-[3%]"></div>
        <div className="w-[97%]">
          <ButtonBase
            className="!px-0 !py-0 font-light text-outline-focus"
            content="reply"
            iconLeft={
              <ArrowTurnLeftDownIcon className="size-6 text-outline-focus" />
            }
            onClick={handleReply}
          />
        </div>
      </div>
      {expanded && (
        <div className="">
          {subComments &&
            subComments.map((comment: CommentProps) => (
              <div className="flex flex-row py-2">
                <div className="w-[3%]"></div>
                <div className="w-[97%]">
                  <SubComment comment={comment} />
                </div>
              </div>
            ))}
          <div className="flex flex-row py-2">
            <div className="w-[3%]"></div>
            <div className="w-[97%]">
              <div className="flex flex-col gap-4 rounded-md bg-highlight p-4">
                <Input
                  type="type"
                  className="bg-b-primary text-on-surface"
                  placeholder="Enter your comment"
                  color="default"
                  value={commentReply}
                  onValueChange={setCommentReply}
                />

                <ButtonSolid
                  className="w-[15%] rounded-md bg-outline-focus !text-b-primary"
                  content="Send comment"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
