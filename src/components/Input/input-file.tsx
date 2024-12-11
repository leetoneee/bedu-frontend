'use client';

import button, { useEffect, useState } from 'react';
import { useEdgeStore } from '@/libs/edgestore';
import { InputFileProps } from '@/types';

export default function InputFile({ filename }: InputFileProps) {
  const [file, setFile] = useState<File>();
  const [tempname, setTempname] = useState<string>(filename || '');
  const { edgestore } = useEdgeStore();

  function formatFileName(name: string) {
    if (name.length > 15) {
      const prefix = name.slice(0, 10); // Lấy 10 ký tự đầu
      const suffix = name.slice(-8); // Lấy 5 ký tự cuối
      return `${prefix}...${suffix}`;
    }
    return name;
  }

  useEffect(() => {
    if (file) { // chọn file của add và edit
      setTempname(file.name);
    } else if (!file ) { // mới vào của edit
      setTempname(filename || '');
    }
  }, [file, filename]);

  return (
    <div className="py-2">
      <div className="flex flex-row items-center space-x-4">
        <label htmlFor="files" className="bg-black p-3 text-white">
          Select Image
        </label>
        <p className="file-name">
          {tempname ? formatFileName(tempname) : 'No image chosen'}
        </p>
      </div>
      <input
        id="files"
        className="hidden"
        type="file"
        onChange={(e) => {
          setFile(e.target.files?.[0]);
        }}
      />
      {/* <button
        onClick={async () => {
          if (file) {
            const res = await edgestore.publicFiles.upload({
              file,
              onProgressChange: (progress) => {
                // you can use this to show a progress bar
                console.log(progress);
              }
            });
            // you can run some server action or api here
            // to add the necessary data to your database
            console.log(res);
          }
        }}
      >
        Upload
      </button> */}
    </div>
  );
}
