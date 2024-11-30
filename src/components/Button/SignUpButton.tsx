import React from 'react';
import ButtonSolid from './ButtonSolid';

const SignUpButton = () => {
  return (
    <a href="/auth/signUp">
      <ButtonSolid
        className="ml-auto w-24 rounded-md bg-[#295782] text-white place-content-center"
        content="Sign up"
      />
    </a>
  );
};

export default SignUpButton;
