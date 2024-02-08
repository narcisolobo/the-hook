"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FirebaseError } from "firebase/app";

import { useUser } from "@/context/UserProvider";
import returnFbErrorString from "@/utils/return-fb-error-string";

import AuthButton from "./AuthButton";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import AuthAlert from "./AuthAlert";
import SignInWithGoogle from "./SignInWithGoogle";

export type AuthFormInputs = {
  email: string;
  password: string;
};

function AuthForm() {
  const user = useUser();
  const [isLogin, setIsLogin] = useState(true);
  const [fbErrorMessage, setFbErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormInputs>();

  const toggleLogin = () => {
    setIsLogin((prev) => !prev);
  };

  const submitHandler: SubmitHandler<AuthFormInputs> = async (formData) => {
    console.log("🚀 ~ IN THE SUBMIT HANDLER");
    setFbErrorMessage("");
    const { email, password } = formData;
    try {
      if (isLogin) {
        console.log("🚀 ~ submitHandler= ~ isLogin:", isLogin);
        await user.signIn(email, password);
      } else {
        console.log("🚀 ~ submitHandler= ~ isLogin:", isLogin);
        await user.signUp(email, password);
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        setFbErrorMessage(returnFbErrorString(error));
      } else {
        throw new Error("Something went wrong.");
      }
    }
  };

  return (
    <form className="card-body" onSubmit={handleSubmit(submitHandler)}>
      {fbErrorMessage && <AuthAlert message={fbErrorMessage} />}
      <div className="flex flex-col gap-4">
        <h2 className="card-title text-2xl">
          {isLogin ? "SIGN IN" : "SIGN UP"}
        </h2>
        <EmailInput register={register} errors={errors} />
        <PasswordInput register={register} errors={errors} isLogin={isLogin} />
      </div>
      <div className="form-control mt-6">
        <AuthButton isLogin={isLogin} toggleLogin={toggleLogin} />
      </div>
      <div className="my-8 flex items-center">
        <hr className="mx-8 flex-1 border-base-content" />
        <h2>OR</h2>
        <hr className="mx-8 flex-1 border-base-content" />
      </div>
      <SignInWithGoogle />
    </form>
  );
}

export default AuthForm;
