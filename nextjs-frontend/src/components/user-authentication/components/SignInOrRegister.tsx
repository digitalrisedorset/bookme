import {Sign} from "@/components/user-authentication/components/AddToCart/Sign";
import {SignUp} from "@/components/user-authentication/components/AddToCart/SignUp";
import React from "react";

export const SignInOrRegister: React.FC = () => {
  return (
      <>
        <Sign />
        <SignUp />
      </>
  );
}
