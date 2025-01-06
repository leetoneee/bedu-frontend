import { Divider } from '@nextui-org/react';
import React from 'react';

const Footer = () => {
  return (
    <footer className="flex w-full flex-col">
      <Divider />
      <div className="flex h-44 flex-row bg-surface">
        <div className="ml-12 mt-5 grid grid-cols-4 gap-12">
          {/* BEDU  */}
          <div className="col-span-1">
            <p className="text-2xl font-bold text-on-primary 2xl:text-3xl">
              BEDU - Become A Better Human
            </p>
            <div className="mt-4 flex flex-row items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
              <p className="ml-5 text-xs">buoibuoi@gmail.com</p>
            </div>
            <div className="mt-5 flex flex-row items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
              <p className="ml-5 text-xs">TP. Hồ Chí Minh</p>
            </div>
          </div>

          {/* About BEDU  */}
          <div className="col-span-1">
            <p className="text-2xl font-bold text-on-primary 2xl:text-3xl">
              About BEDU
            </p>
            <p className="mt-6 text-xs">About us</p>
            <p className="mt-3 text-xs">buoibuoi@gmail.com</p>
          </div>

          {/* BEDU's information  */}
          <div className="col-span-1">
            <p className="text-2xl font-bold text-on-primary 2xl:text-3xl">
              BEDU&apos;s Information
            </p>
            <p className="mt-6 text-xs">Course List</p>
            <p className="mt-3 text-xs">Feedback from students</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
