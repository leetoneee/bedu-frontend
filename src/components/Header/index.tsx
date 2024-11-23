import React from 'react';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between bg-primary px-4 drop-shadow md:px-6">
      <div className="flex min-w-max flex-row items-center">
        <Image src="../icons/logo.svg" alt="logo" width={100} height={100} />
        <span className="text-2xl font-bold text-on-primary">BEDU</span>
      </div>
      {/* <div className='flex flex-row bg-slate-400 h-full w-full'>

      </div> */}
      <div className="flex flex-row items-center gap-4">
        <div className="flex flex-col items-end">
          <span className="font-semibold">Lê Toàn</span>
          <span>Manager</span>
        </div>
        <div
          className="h-10 w-10 rounded-full bg-sky-500 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://avatar.iran.liara.run/public/50")'
          }}
        >
          <span className="sr-only">Marc Backes</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
