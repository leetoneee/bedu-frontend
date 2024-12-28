'use client';

import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useEdgeStore } from '@/libs/edgestore';
import { InputFileHandle, InputFileProps } from '@/types';
import { Progress } from '@nextui-org/react';
import Image from 'next/image';

export const InputFile = forwardRef<InputFileHandle, InputFileProps>(
  ({ filename }, ref) => {
    const [file, setFile] = useState<File>();
    const [tempname, setTempname] = useState<string>(filename || '');
    const [progress, setProgress] = useState<number>(0);
    // const [url, setUrl] = useState<string>('');

    const { edgestore } = useEdgeStore();

    useImperativeHandle(
      ref,
      () => ({
        async upload() {
          if (file) return await handleUpload(file);
        }
      }),
      [file]
    );

    function formatFileName(name: string) {
      if (name.length > 15) {
        const prefix = name.slice(0, 20); // Lấy 10 ký tự đầu
        const suffix = name.slice(-8); // Lấy 5 ký tự cuối
        return `${prefix}...${suffix}`;
      }
      return name;
    }

    useEffect(() => {
      if (file) {
        // chọn file của add và edit
        setTempname(file.name);
      } else if (!file) {
        // mới vào của edit
        setTempname(filename || '');
      }
    }, [file, filename]);

    const handleUpload = async (file: File) => {
      if (file) {
        const res = await edgestore.publicFiles.upload({
          file,
          onProgressChange: (progress) => {
            // you can use this to show a progress bar
            console.log(progress);
            setProgress(progress);
          }
        });
        // you can run some server action or api here
        // to add the necessary data to your database
        console.log(res);
        return res.url;
      }
    };

    return (
      <div className="">
        <div className="flex flex-row items-center space-x-4">
          <Image
            src={'/icons/image-plus.svg'}
            width={40}
            height={40}
            alt="image-plus"
            className="cursor-pointer"
            onClick={() => document.getElementById('files')?.click()}
          />
          <div className="file-name flex flex-col">
            {tempname ? formatFileName(tempname) : 'No image chosen'}
            {!tempname && (
              <span className="text-sm font-semibold text-secondary">
                Click to upload
              </span>
            )}
          </div>
        </div>
        <input
          id="files"
          className="hidden"
          type="file"
          onChange={(e) => {
            setFile(e.target.files?.[0]);
          }}
        />
        {progress > 0 && (
          <Progress
            aria-label="Loading..."
            className="max-w-md"
            value={progress}
          />
        )}
      </div>
    );
  }
);
