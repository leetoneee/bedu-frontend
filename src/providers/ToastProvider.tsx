'use client';

import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';
import { ToastContainer } from 'react-toastify';

interface ToastProviderProps {
  children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <ToastContainer />
      {/* <ToastContainer
        toastClassName={(context) =>
          contextClass[context?.type || 'default'] +
          ' relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer'
        }
        bodyClassName={() => 'text-sm font-white font-med block p-3'}
        position="top-right"
        autoClose={3000}
      /> */}
    </>
  );
}
