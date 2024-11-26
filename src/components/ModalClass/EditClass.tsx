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
} from '@nextui-org/modal';
import { Button } from '@nextui-org/button';
import { Input, InputFile, Checkbox } from '@/components';
import { EditClassModal_Props } from '@/types';

// Program mẫu
const inputdata = {
  name: 'Nhóm bài 1',
  code: 'IE1',
  image: 'image 1',
  time: 20,
  price: 5000,
  sessionQuantity: 86,
  des: 'des 1',
  isPublic: true,
  id: '1'
};

// Danh sách các nhóm bài
const classNameList = [
  'Nhóm bài 1',
  'Nhóm bài 2',
  'Nhóm bài 3',
  'Nhóm bài 4',
  'Nhóm bài 5',
  'Nhóm bài 6'
];

const classCodeList = ['IE1', 'IE2', 'IE3', 'IE4', 'IE5', 'IE6'];

export default function EditClassModal({ onSubmit }: EditClassModal_Props) {
  const [inputData, setInputData] = useState(inputdata);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const listRef = useRef<HTMLUListElement>(null);

  // const [urls, setUrls] = useState<{
  //   url: string;
  //   thumbnailUrl: string | null;
  // }>();

  const [inputValue_className, setInputValue_className] = useState('');
  const [inputValid_className, setInputValid_className] = useState<
    'default' | 'success' | 'error_AtLeast' | 'error_SameName'
  >('default');
  const [classNameResults, setClassNameResults] = useState<string[]>([]);

  const searchclassName = (query: string, resultsList: string[]) => {
    if (query === '') {
      setClassNameResults([]);
      return;
    }
    const filteredResults = resultsList.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setClassNameResults(filteredResults);
  };

  // Đóng danh sách khi nhấp bên ngoài
  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
      if (listRef.current && !listRef.current.contains(event.target)) {
        setClassNameResults([]);
        setClassCodeResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInput_className = (value: string) => {
    setInputValue_className(value);
    setInputData((prevData) => ({
      ...prevData,
      name: value
    }));
    // Logic kiểm tra giá trị hợp lệ
    if (value === '') {
      setInputValid_className('default');
    } else if (value.trim().length < 5) {
      setInputValid_className('error_AtLeast');
    } else if (classNameList.includes(value) && value !== inputdata.name) {
      setInputValid_className('error_SameName');
    } else {
      setInputValid_className('success');
    }
    searchclassName(value, classNameList);
  };

  const [inputValue_classCode, setInputValue_classCode] = useState('');
  const [inputValid_classCode, setInputValid_classCode] = useState<
    'default' | 'success' | 'error_AtLeast' | 'error_SameName'
  >('default');

  const [classCodeResults, setClassCodeResults] = useState<string[]>([]);

  const searchclassCode = (query: string, resultsList: string[]) => {
    if (query === '') {
      setClassCodeResults([]);
      return;
    }
    const filteredResults = resultsList.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setClassCodeResults(filteredResults);
  };

  const handleInput_classCode = (value: string) => {
    setInputValue_classCode(value);
    setInputData((prevData) => ({
      ...prevData,
      code: value
    }));
    // Logic kiểm tra giá trị hợp lệ
    if (value === '') {
      setInputValid_classCode('default');
    } else if (value.length < 3) {
      setInputValid_classCode('error_AtLeast');
    } else if (classCodeList.includes(value) && value !== inputdata.code) {
      setInputValid_classCode('error_SameName');
    } else {
      setInputValid_classCode('success');
    }
    searchclassCode(value, classCodeList);
  };

  const [inputValue_price, setInputValue_price] = useState<number>(1);
  const [inputValid_price, setInputValid_price] = useState<
    'default' | 'success' | 'error_AtLeast' | 'error_SameName'
  >('default');

  const handleInput_price = (value: number) => {
    setInputValue_price(value);
    setInputData((prevData) => ({
      ...prevData,
      price: value
    }));
    if (value === null) {
      setInputValid_price('default');
    } else if (value <= 0) {
      setInputValid_price('error_AtLeast');
    } else {
      setInputValid_price('success');
    }
  };

  const [inputValue_time, setInputValue_time] = useState<number>(1);
  const [inputValid_time, setInputValid_time] = useState<
    'default' | 'success' | 'error_AtLeast' | 'error_SameName'
  >('default');

  const handleInput_time = (value: number) => {
    setInputValue_time(value);
    setInputData((prevData) => ({
      ...prevData,
      time: value
    }));
    if (value === null) {
      setInputValid_time('default');
    } else if (value <= 0) {
      setInputValid_time('error_AtLeast');
    } else {
      setInputValid_time('success');
    }
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
    setInputValue_className(inputdata.name);
    setInputValid_className('default');
    setClassNameResults([]);
    setInputValue_classCode(inputdata.code);
    setInputValid_classCode('default');
    setClassCodeResults([]);
    setInputValue_price(inputdata.price);
    setInputValid_price('default');
    setInputValue_time(inputdata.time);
    setInputValid_time('default');
    setInputValue_session(inputdata.sessionQuantity);
    setIsPublic(inputdata.isPublic);
    setInputValue_des(inputdata.des);
  };

  const size: '2xl' = '2xl';
  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button key={size} onPress={() => onOpen()}>
          Open Modal
        </Button>
      </div>
      <Modal
        size={size}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={handleClose}
      >
        <div className="flex justify-center">
          <div className="rounded-xl shadow-xl">
            <ModalContent>
              <ModalHeader className="w-full rounded-t-xl border">
                <div className="h-11 w-11 content-center rounded-lg border-3 border-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="mx-auto size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                    />
                  </svg>
                </div>
                <div className="ml-5">
                  <div className="text-lg font-semibold">Edit class</div>
                  <div className="text-sm font-normal">
                    Edit information about the class
                  </div>
                </div>
              </ModalHeader>

              <ModalBody>
                <div className="px-2 pt-6 xl:space-y-2 2xl:space-y-4 2xl:pt-8">
                  {/* Class name */}
                  <div className="relative">
                    <Input
                      title="Class name"
                      placeholder="Enter class name..."
                      value={inputData.name}
                      onChange={handleInput_className}
                      valid={inputValid_className}
                      required={true}
                      suport={
                        inputValid_className === 'error_AtLeast'
                          ? 'Please enter at least 5 characters'
                          : inputValid_className === 'error_SameName'
                            ? 'Class name already in use'
                            : ''
                      }
                    />
                    {classNameResults.length > 0 && (
                      <ul
                        ref={listRef}
                        className="absolute z-50 max-h-36 w-full overflow-y-auto shadow-lg"
                      >
                        {classNameResults.map((result, index) => (
                          <li
                            className="border border-outline bg-surface shadow-lg hover:border-outline-focus hover:bg-highlight"
                            key={index}
                            //onClick={() => clickSearchclassName(result)}
                          >
                            <p className="my-2 ml-4">{result}</p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Class code */}
                  <div className="relative">
                    <Input
                      title="Class code"
                      placeholder="Enter class code..."
                      value={inputData.code}
                      onChange={handleInput_classCode}
                      valid={inputValid_classCode}
                      required={true}
                      suport={
                        inputValid_classCode === 'error_AtLeast'
                          ? 'Please enter at least 3 characters'
                          : inputValid_classCode === 'error_SameName'
                            ? 'Class code already in use'
                            : ''
                      }
                    />
                    {classCodeResults.length > 0 && (
                      <ul
                        ref={listRef}
                        className="absolute z-50 max-h-36 w-full overflow-y-auto shadow-lg"
                      >
                        {classCodeResults.map((result, index) => (
                          <li
                            className="border border-outline bg-surface shadow-lg hover:border-outline-focus hover:bg-highlight"
                            key={index}
                            //onClick={() => clickSearchclassName(result)}
                          >
                            <p className="my-2 ml-4">{result}</p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* divider */}
                  <div className="h-[1px] w-full border-t bg-outline"></div>

                  <div className="grid grid-cols-12 gap-5 pb-2 pt-4">
                    {/* Time per lesson  */}
                    <div className="col-span-7 flex flex-row items-center space-x-2">
                      <Input
                        type="number"
                        title="Time per lesson"
                        placeholder="Enter time per lesson..."
                        value={inputData.time}
                        valid={inputValid_time}
                        onChange={handleInput_time}
                        required={true}
                        suport={
                          inputValid_time === 'error_AtLeast'
                            ? 'Time must be greater than 0 minutes.'
                            : ''
                        }
                      />
                      <p>minute</p>
                    </div>

                    {/* Price */}
                    <div className="flex flex-row items-center space-x-2">
                      <Input
                        type="number"
                        title="Price"
                        placeholder="Enter price ..."
                        value={inputData.price}
                        valid={inputValid_price}
                        onChange={handleInput_price}
                        required={true}
                        suport={
                          inputValid_price === 'error_AtLeast'
                            ? 'Price must be greater than 0 VND.'
                            : ''
                        }
                      />
                      <p>VND</p>
                    </div>
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
                      <Checkbox
                        isSelected={inputData.isPublic}
                        onToggle={handleToggle}
                      />
                    </div>
                    <p className="text-sm font-medium">Public</p>
                  </div>

                  {/* Description */}
                  <Input
                    title="Description"
                    placeholder="Write a few sentences about the class..."
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
