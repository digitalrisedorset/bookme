import {Sign} from "@/components/user-authentication/components/AddToCart/Sign";
import {SignUp} from "@/components/user-authentication/components/AddToCart/SignUp";
import React from "react";

interface AddToCartProps {
    id: string
    children: React.ReactNode
}

export const SignInOrRegister: React.FC = ({id}: AddToCartProps) => {
  return (
      <>
        <Sign id={id} />
        <SignUp id={id} />
      </>
  );
}
