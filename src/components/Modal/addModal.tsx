import React, { useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from '@nextui-org/modal';
import {Button} from "@nextui-org/button";
import { Input} from '@/components';
import { Modal_taoBTProps } from '@/types';

// Danh sách các nhóm bài
const NhombaiList = ['Nhóm bài 1', 'Nhóm bài 2', 'Nhóm bài 3','Nhóm bài 4', 'Nhóm bài 5', 'Nhóm bài 6'];

export default function Modal_taoBT({
  onSubmit,
}: Modal_taoBTProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [inputValue_Nhombai, setInputValue_Nhombai] = useState('');
  const [inputValid_Nhombai, setInputValid_Nhombai] = useState<
    'default' | 'success' | 'error'
  >('default');
  const [nhombaiResults, setNhombaiResults] = useState<string[]>([]);

  const [inputValue_Tenbai, setInputValue_Tenbai] = useState('');
  const [inputValid_Tenbai, setInputValid_Tenbai] = useState<
    'default' | 'success' | 'error'
  >('default');
  const [inputValue_Dangbai, setInputValue_Dangbai] = useState('Option1');

  const handleInput_Nhombai = (value: string) => {
    setInputValue_Nhombai(value);
    // Logic kiểm tra giá trị hợp lệ
    if (value === '') {
      setInputValid_Nhombai('default');
    } else if (value.length < 5) {
      setInputValid_Nhombai('error');
    } else {
      setInputValid_Nhombai('success');
    }

    searchNhombai(value, NhombaiList);
  };

  const searchNhombai = (query: string, resultsList: string[]) => {
    if (query === '') {
      setNhombaiResults([]);
      return;
    }

    // Kết quả mẫu
    const filteredResults = resultsList.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setNhombaiResults(filteredResults);
  };

  const clickSearchNhombai = (result: string) => {
    setInputValue_Nhombai(result);
    setInputValid_Nhombai('success');
    setNhombaiResults([]); // Ẩn danh sách sau khi chọn
  };

  const handleInput_Tenbai = (value: string) => {
    setInputValue_Tenbai(value);
    // Logic kiểm tra giá trị hợp lệ
    if (value === '') {
      setInputValid_Tenbai('default');
    } else if (value.length < 5) {
      setInputValid_Tenbai('error');
    } else {
      setInputValid_Tenbai('success');
    }
  };

  const handleRadio_Dangbai = (newValue: string) => {
    setInputValue_Dangbai(newValue);
  };

  const handleClose = () => {
    // Reset input Nhombai
    setInputValue_Nhombai('');
    setInputValid_Nhombai('default');
    setNhombaiResults([]);
    // Đóng modal
    onClose();
  };

  return (
    <>
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <div className="flex justify-center">
          <div className="w-2/5 rounded-xl shadow-xl">
            <ModalHeader className="w-full rounded-t-xl bg-primary">
              <div className=" text-2xl text-on-primary ">Tạo bài tập</div>
            </ModalHeader>
            <ModalBody>
              <div className="px-8 pt-6 2xl:pt-8 space-y-4">
                <div className="relative">
                  <Input
                    title="Nhóm bài"
                    placeholder="Nhập tên nhóm bài tập..."
                    value={inputValue_Nhombai}
                    onChange={handleInput_Nhombai}
                    valid={inputValid_Nhombai}
                    required={true}
                    suport={inputValid_Nhombai === 'error' ? 'Sai bét' : ''}
                  />
                  {nhombaiResults.length > 0 && (
                    <ul className='absolute z-50 w-full bg-on-primary shadow-lg max-h-36 overflow-y-auto'>
                      {nhombaiResults.map((result, index) => (
                        <li
                          className="border shadow-lg border-outline-var hover:bg-primary-container "
                          key={index}
                          onClick={() => clickSearchNhombai(result)}
                        >
                          <p className='my-2 ml-4'>{result}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <Input
                  title="Tên bài"
                  value={inputValue_Tenbai}
                  onChange={handleInput_Tenbai}
                  valid={inputValid_Tenbai}
                  required={true}
                  suport={inputValid_Tenbai === 'error' ? 'Sai bét' : ''}
                />
              </div>
            </ModalBody>
            <ModalFooter className="flex justify-end space-x-6 border-t border-outline-var py-4 ">
              <Button
                variant="light"
                onPress={handleClose}
                className="rounded-[100px] bg-primary px-6 py-2 text-[16px] font-medium text-on-primary"
              >
                Thoát
              </Button>
              <Button
                color="primary"
                onPress={onSubmit}
                className="rounded-[100px] bg-outline px-6 py-2 text-[16px] font-medium text-on-primary"
              >
                Tiếp tục
              </Button>
            </ModalFooter>
          </div>
        </div>
      </Modal>
    </>
  );
}