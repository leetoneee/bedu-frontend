'use client';
import React, { useState, useRef, useEffect } from 'react';

let currentOTPIndex: number = 0;
const OtpInput = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [activeOTPIndex, setActiveOTPIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    if (/^\d$/.test(value)) { // Only allow single digits (0-9)
      const newOtp: string[] = [...otp];
      newOtp[currentOTPIndex] = value;
      setOtp(newOtp);
      setActiveOTPIndex(currentOTPIndex + 1);
    }
  };

  const handleOnKeyDown = (
    e: React.KeyboardEvent<HTMLElement>,
    index: number
  ) => {
    currentOTPIndex = index;
    if (e.key === "Tab") {
      e.preventDefault();
    }
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (newOtp[index]) {
        // Clear current value
        newOtp[index] = "";
      } else if (index > 0) {
        // Move to the previous input and clear its value
        newOtp[index - 1] = "";
        setActiveOTPIndex(index - 1);
      }
      setOtp(newOtp);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
    console.log('otp', otp);
    
  }, [activeOTPIndex]);

  return (
    <div className='flex justify-center items-center space-x-2 w-full'>
      {otp.map((_, index) => (
        <React.Fragment key={index}>
          <input
            ref={activeOTPIndex === index ? inputRef : null}
            type="text"
            inputMode="numeric"
            pattern="[0-9]"
            className='w-12 h-12 border-2 bg-transparent outline-none text-center font-semibold text-xl spin-button-none border-outline focus:border-on-surface focus:text-on-surface text-outline transition rounded-lg'
            onChange={handleOnChange}
            onKeyDown={(e) => handleOnKeyDown(e, index)}
            value={otp[index]}
            maxLength={1}
          />

        </React.Fragment>
      ))}
      <style jsx>{`
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type='number'] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
};

export default OtpInput;
