'use client';

import { Divider, Input } from '@nextui-org/react';
import { ButtonSolid, Comment } from '@/components';
import React, { useEffect, useState } from 'react';
import axios from '@/libs/axiosInstance';
import useSWR from 'swr';

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

// const commentData: CommentProps[] = [
//   {
//     commentId: 1,
//     username: 'Nguyen Vu Binh',
//     content: 'Binh luan 1',
//     commentTime: new Date('2025-01-07T02:57:36.318Z'),
//     hasChildren: true
//   },
//   {
//     commentId: 4,
//     username: 'Le Huu Do',
//     content: 'Binh luan 2',
//     commentTime: new Date('2025-01-07T02:57:36.318Z'),
//     hasChildren: true
//   },
//   {
//     commentId: 12,
//     username: 'Le Huu Do',
//     content: 'Binh luan 3',
//     commentTime: new Date('2025-01-07T02:57:36.318Z'),
//     hasChildren: true
//   }
// ];
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const CommentTab = ({ lessonId }: Props) => {
  const [comment, setComment] = useState<string>('');
  const [comments, setComments] = useState<CommentProps[]>([]);

  const { data: dataComments } = useSWR(
    `/comment/parent/${0}?lessonId=${lessonId}`,
    fetcher
  );

  useEffect(() => {
    console.log('dataComments: ', dataComments);
    if (dataComments && dataComments.metadata) {
      setComments(dataComments.metadata);
    }
  }, [dataComments?.metadata]);

  return (
    <div className="flex h-full w-full flex-col gap-2 rounded rounded-t-none bg-white p-5 shadow-sm">
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
          content="Send comment"
        />
      </div>
      <div className="text-xl font-bold text-on-surface">{18} comments</div>
      <Divider />
      {comments &&
        comments.map((comment) => (
          <Comment comment={comment} lessionId={lessonId} />
        ))}
    </div>
  );
};

export default CommentTab;
