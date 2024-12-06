'use client';

import button, { useEffect, useRef, useState } from 'react';
import * as React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  ModalContent
} from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { Input, InputFile, Checkbox } from '@/components';

type EditProgramModal_Props = {
  onSubmit?: () => void;
};

// Program mẫu
const inputdata = {
  name: 'Nhóm bài 1',
  code: 'IE1',
  image: 'image 1',
  sessionQuantity: 86,
  des: 'des 1',
  isPublic: true,
  id: '1'
};

// Danh sách các nhóm bài
const PronameList = [
  'Nhóm bài 1',
  'Nhóm bài 2',
  'Nhóm bài 3',
  'Nhóm bài 4',
  'Nhóm bài 5',
  'Nhóm bài 6'
];

const ProcodeList = ['IE1', 'IE2', 'IE3', 'IE4', 'IE5', 'IE6'];

export default function EditProgramModal({ onSubmit }: EditProgramModal_Props) {
  const [inputData, setInputData] = useState(inputdata);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const listRef = useRef<HTMLUListElement>(null);

  // const [urls, setUrls] = useState<{
  //   url: string;
  //   thumbnailUrl: string | null;
  // }>();

  const [inputValue_proname, setInputValue_proname] = useState('');
  const [inputValid_proname, setInputValid_proname] = useState<
    'default' | 'success' | 'error_AtLeast' | 'error_SameName'
  >('default');
  const [pronameResults, setPronameResults] = useState<string[]>([]);

  const searchProname = (query: string, resultsList: string[]) => {
    if (query === '') {
      setPronameResults([]);
      return;
    }
    const filteredResults = resultsList.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setPronameResults(filteredResults);
  };

  // Đóng danh sách khi nhấp bên ngoài
  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
      if (listRef.current && !listRef.current.contains(event.target)) {
        // ở đây có lỗi nhưng vẫn chạy, tính sau :)
        setPronameResults([]);
        setProcodeResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInput_proname = (value: string) => {
    setInputValue_proname(value);
    setInputData((prevData) => ({
      ...prevData,
      name: value
    }));
    // Logic kiểm tra giá trị hợp lệ
    if (value === '') {
      setInputValid_proname('default');
    } else if (value.trim().length < 5) {
      setInputValid_proname('error_AtLeast');
    } else if (PronameList.includes(value) && value !== inputdata.name) {
      setInputValid_proname('error_SameName');
    } else {
      setInputValid_proname('success');
    }
    searchProname(value, PronameList);
  };

  // const clickSearchProname = (result: string) => {
  //   setInputValue_proname(result);
  //   setInputValid_proname('success');
  //   setPronameResults([]); // Ẩn danh sách sau khi chọn
  // };

  const [inputValue_procode, setInputValue_procode] = useState('');
  const [inputValid_procode, setInputValid_procode] = useState<
    'default' | 'success' | 'error_AtLeast' | 'error_SameName'
  >('default');

  const [procodeResults, setProcodeResults] = useState<string[]>([]);

  const searchProcode = (query: string, resultsList: string[]) => {
    if (query === '') {
      setProcodeResults([]);
      return;
    }
    const filteredResults = resultsList.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setProcodeResults(filteredResults);
  };

  const handleInput_Procode = (value: string) => {
    setInputValue_procode(value);
    setInputData((prevData) => ({
      ...prevData,
      code: value
    }));
    // Logic kiểm tra giá trị hợp lệ
    if (value === '') {
      setInputValid_procode('default');
    } else if (value.length < 3) {
      setInputValid_procode('error_AtLeast');
    } else if (ProcodeList.includes(value) && value !== inputdata.code) {
      setInputValid_procode('error_SameName');
    } else {
      setInputValid_procode('success');
    }
    searchProcode(value, ProcodeList);
  };

  const [inputValue_session, setInputValue_session] = useState<number>(0);

  const handleInput_session = (value: number) => {
    setInputValue_session(value);
    setInputData((prevData) => ({
      ...prevData,
      sessionQuantity: value
    }));
  };

  const [isPublic, setIsPublic] = useState<boolean>(false);
  const handleToggle = (newSelected: boolean) => {
    setIsPublic(newSelected);
    setInputData((prevData) => ({
      ...prevData,
      isPublic: newSelected
    }));
  };

  const [inputValue_des, setInputValue_des] = useState('');

  const handleInput_des = (value: string) => {
    setInputValue_des(value);
    setInputData((prevData) => ({
      ...prevData,
      des: value
    }));
  };

  const handleClose = () => {
    // Đóng modal
    onClose();
    setInputData(inputdata);
    setInputValue_proname(inputdata.name);
    setInputValid_proname('default');
    setPronameResults([]);
    setInputValue_procode(inputdata.code);
    setInputValid_procode('default');
    setProcodeResults([]);
    setInputValue_session(inputdata.sessionQuantity);
    setIsPublic(inputdata.isPublic);
    setInputValue_des(inputdata.des);
  };

  const size: 'xl' = 'xl';
  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button key={size} onPress={() => onOpen()}>
          Open Modal
        </Button>
      </div>
      <Modal size={size} isOpen={isOpen} onOpenChange={onOpenChange} onClose={handleClose}>
        <div className="flex justify-center">
          <div className="rounded-xl shadow-xl">
            <ModalContent>
              <ModalHeader className="w-full rounded-t-xl border">
                <div className="h-11 w-11 content-center rounded-lg border-3 border-b-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="mx-auto size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                    />
                  </svg>
                </div>
                <div className="ml-5">
                  <div className="text-lg font-semibold">Edit program</div>
                  <div className="text-sm font-normal">
                    Edit information about the program
                  </div>
                </div>
              </ModalHeader>

              <ModalBody>
                <div className="px-2 pt-6 xl:space-y-2 2xl:space-y-4 2xl:pt-8">
                  {/* Program name */}
                  <div className="relative">
                    <Input
                      title="Program name"
                      placeholder="Enter program name..."
                      value={inputData.name}
                      onChange={handleInput_proname}
                      valid={inputValid_proname}
                      required={true}
                      suport={
                        inputValid_proname === 'error_AtLeast'
                          ? 'Please enter at least 5 characters'
                          : inputValid_proname === 'error_SameName'
                            ? 'Program name already in use'
                            : ''
                      }
                    />
                    {pronameResults.length > 0 && (
                      <ul
                        ref={listRef}
                        className="absolute z-50 max-h-36 w-full overflow-y-auto shadow-lg"
                      >
                        {pronameResults.map((result, index) => (
                          <li
                            className="border border-outline bg-surface shadow-lg hover:border-outline-focus hover:bg-highlight"
                            key={index}
                            //onClick={() => clickSearchProname(result)}
                          >
                            <p className="my-2 ml-4">{result}</p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Program code */}
                  <div className="relative">
                    <Input
                      title="Program code"
                      placeholder="Enter program code..."
                      value={inputData.code}
                      onChange={handleInput_Procode}
                      valid={inputValid_procode}
                      required={true}
                      suport={
                        inputValid_procode === 'error_AtLeast'
                          ? 'Please enter at least 3 characters'
                          : inputValid_procode === 'error_SameName'
                            ? 'Program code already in use'
                            : ''
                      }
                    />
                    {procodeResults.length > 0 && (
                      <ul
                        ref={listRef}
                        className="absolute z-50 max-h-36 w-full overflow-y-auto shadow-lg"
                      >
                        {procodeResults.map((result, index) => (
                          <li
                            className="border border-outline bg-surface shadow-lg hover:border-outline-focus hover:bg-highlight"
                            key={index}
                            //onClick={() => clickSearchProname(result)}
                          >
                            <p className="my-2 ml-4">{result}</p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* divider */}
                  <div className="h-[1px] w-full border-t bg-outline"></div>

                  {/* Program image  */}
                  <div className="flex flex-row items-center">
                    <p className="mt-4 w-[180px] bg-white text-sm font-medium">
                      Program image <span className="text-error"> {'*'} </span>
                    </p>
                    <InputFile filename={inputData.image} />
                  </div>

                  {/* divider */}
                  <div className="h-[1px] w-full border-t bg-outline"></div>

                  {/* Session quantity */}
                  <div className="flex flex-row items-center justify-between">
                    <div className="mt-5">
                      <Input
                        type="number"
                        title="Session Quantity"
                        placeholder="Enter session quantity..."
                        value={inputData.sessionQuantity}
                        onChange={handleInput_session}
                        required={true}
                      />
                    </div>
                    {/* checkbox */}
                    <div>
                      <Checkbox isSelected={inputData.isPublic} onToggle={handleToggle} />
                    </div>
                    <p className="text-sm font-medium">Public</p>
                  </div>

                  {/* Description */}
                  <Input
                    title="Description"
                    placeholder="Write a few sentences about the program..."
                    value={inputData.des}
                    onChange={handleInput_des}
                    required={true}
                  />
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-between space-x-6 border-t border-outline py-4">
                <Button
                  onPress={handleClose}
                  className="w-1/2 rounded-lg border border-outline bg-white py-2 text-[16px] font-medium text-black hover:bg-highlight"
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={onSubmit}
                  className="w-1/2 rounded-lg border border-outline bg-on-primary py-2 text-[16px] font-medium text-white"
                >
                  Save
                </Button>
              </ModalFooter>
            </ModalContent>
          </div>
        </div>
      </Modal>
    </>
  );
}
