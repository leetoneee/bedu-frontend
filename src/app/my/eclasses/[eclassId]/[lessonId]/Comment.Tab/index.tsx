'use client';

import { Divider, Input } from '@nextui-org/react';
import { ButtonSolid, Comment } from '@/components';
import React, { useContext, useEffect, useState } from 'react';
import axios from '@/libs/axiosInstance';
import useSWR, { mutate } from 'swr';
import { CreateCommentDto } from '@/types/comment.type';
import { AppContext } from '@/contexts';
import { AuthType } from '@/types';
import { createComment } from '@/services/comments.service';
import { toast } from 'react-toastify';

type Props = {
  lessonId: string;
};

type CommentProps = {
  commentId: number;
  username: string;
  content: string;
  commentTime: Date;
  hasChildren: boolean;
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const CommentTab = ({ lessonId }: Props) => {
  const [comment, setComment] = useState<string>('');
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState(); // được sử dụng để render tạm thời

  const { auth } = useContext(AppContext) as AuthType;
  const { data: dataUser } = useSWR(`/users/item/${auth?.id}`, fetcher);
  const { data: dataComments } = useSWR(
    `/comment/parent/${0}?lessonId=${lessonId}`,
    fetcher
  );

  useEffect(() => {
    if (dataUser) {
      setUser(dataUser.metadata);
    }
  }, [dataUser]);

  useEffect(() => {
    console.log('dataComments: ', dataComments);
    if (dataComments && dataComments.metadata) {
      setComments(dataComments.metadata);
    }
  }, [dataComments?.metadata]);

  const handleComment = async () => {
    const reply = comment.trim();
    if (reply === '') {
      return;
    }

    const data: CreateCommentDto = {
      lessonId: Number(lessonId),
      userId: auth.id,
      content: comment.trim(),
      parentCommentId: 0
    };

    const newComment: CommentProps = {
      commentId: Date.now(), // Sử dụng tạm ID để hiển thị
      username: dataUser.metadata.name,
      content: comment.trim(),
      commentTime: new Date(),
      hasChildren: false
    };

    try {
      setIsSubmitting(true);
      const result = await createComment(data);
      // Hiển thị tạm comment mới
      setComments((prev) => [...prev, newComment]);
      mutate(`/comment/parent/${0}?lessonId=${lessonId}`);
    } catch (error: any) {
      console.error('🚫 ~ onSubmit ~ Error:', error);
      toast.error(
        error.response?.data?.message ||
          'Failed to create comment. Please try again.'
      );
    } finally {
      setIsSubmitting(false); // Hoàn tất gửi yêu cầu
      setComment('');
    }
  };

  return (
    <div key={'TabComment'} className="flex h-full w-full flex-col gap-2 rounded rounded-t-none bg-white p-5 shadow-sm">
      <div className="text-2xl font-bold text-on-surface">Comments</div>
      <div className="flex flex-col gap-4 bg-highlight p-4 rounded-md">
        <Input
          type="type"
          className="bg-b-primary text-on-surface"
          placeholder="Enter your comment"
          color="default"
          value={comment}
          onValueChange={setComment}
        />

        <ButtonSolid
          className="w-[15%] rounded-md bg-outline-focus !text-b-primary"
          content={isSubmitting ? 'Submitting' : 'Send comment'}
          onClick={handleComment}
        />
      </div>
      <div className="text-xl font-bold text-on-surface">{18} comments</div>
      <Divider />
      {comments &&
        comments.map((comment) => (
          <Comment comment={comment} lessonId={lessonId} />
        ))}
    </div>
  );
};

export default CommentTab;
