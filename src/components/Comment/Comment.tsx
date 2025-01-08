'use client';

import ButtonBase from '@/components/Button/ButtonBase';
import axios from '@/libs/axiosInstance';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';
import { ArrowTurnLeftDownIcon } from '@heroicons/react/24/outline';
import { Input } from '@nextui-org/react';
import { ButtonSolid, SubComment } from '@/components';
import { CreateCommentDto, CommentProps } from '@/types/comment.type';
import { AuthType } from '@/types';
import { AppContext } from '@/contexts';
import { createComment } from '@/services/comments.service';
import { toast } from 'react-toastify';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const Comment = ({
  comment,
  lessonId
}: {
  comment: CommentProps;
  lessonId: string;
}) => {
  const [commentReply, setCommentReply] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState(); // được sử dụng để render tạm thời
  const [subComments, setSubComments] = useState<CommentProps[]>([]);
  const [expanded, setExpanded] = useState(false);

  const { auth } = useContext(AppContext) as AuthType;
  const { data: dataUser } = useSWR(`/users/item/${auth?.id}`, fetcher);
  let { data: dataSubComment } = useSWR(
    `/comment/parent/${comment.commentId}?lessonId=${lessonId}`,
    fetcher
  );

  useEffect(() => {
    if (dataUser) {
      setUser(dataUser.metadata);
    }
  }, [dataUser]);
  useEffect(() => {
    if (dataSubComment && dataSubComment.metadata)
      setSubComments(dataSubComment.metadata);
  }, [dataSubComment?.metadata]);

  const handleReply = () => {
    setExpanded((prev) => (prev = !prev));
  };

  const handleComment = async () => {
    let reply = commentReply.trim();
    if (reply === '') {
      return;
    }

    const data: CreateCommentDto = {
      lessonId: Number(lessonId),
      userId: auth.id,
      content: commentReply.trim(),
      parentCommentId: comment.commentId
    };

    const newComment: CommentProps = {
      commentId: Date.now(), // Sử dụng tạm ID để hiển thị
      username: dataUser.metadata.name,
      content: commentReply.trim(),
      commentTime: new Date(),
      hasChildren: false
    };

    try {
      setIsSubmitting(true);
      const result = await createComment(data);
      // Hiển thị tạm comment mới
      setSubComments((prev) => [...prev, newComment]);
      mutate(`/comment/parent/${comment.commentId}?lessonId=${lessonId}`);
    } catch (error: any) {
      console.error('🚫 ~ onSubmit ~ Error:', error);
      toast.error(
        error.response?.data?.message ||
          'Failed to create comment. Please try again.'
      );
    } finally {
      setIsSubmitting(false); // Hoàn tất gửi yêu cầu
      setCommentReply('');
    }
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
        <div className="w-[90%]">
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
            subComments.map((subComment: CommentProps) => (
              <div className="flex flex-row py-2" key={subComment.commentId}>
                <div className="w-[3%]"></div>
                <div className="w-[97%]">
                  <SubComment comment={subComment} />
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
                  content={isSubmitting ? 'Submitting' : 'Send comment'}
                  onClick={handleComment}
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
