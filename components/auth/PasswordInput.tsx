import {
  FieldErrors,
  RegisterOptions,
  UseFormRegisterReturn,
} from "react-hook-form";
import { AuthFormInputs } from "./AuthForm";

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

type Props = {
  register: (
    name: "password",
    options?: RegisterOptions<AuthFormInputs, "password"> | undefined,
  ) => UseFormRegisterReturn<"password">;
  errors: FieldErrors<AuthFormInputs>;
  isLogin: boolean;
};

function PasswordInput({ register, errors, isLogin }: Props) {
  return (
    <div className="form-control">
      <label className="label hidden" htmlFor="password">
        <span className="label-text">Password</span>
      </label>
      <input
        {...register("password", {
          required: "Please enter your password.",
          pattern: {
            value: PASSWORD_REGEX,
            message: "Invalid password.",
          },
        })}
        id="password"
        type="password"
        placeholder="password"
        className="input input-bordered"
        autoComplete={isLogin ? "current-password" : "new-password"}
      />
      <div className="ml-1 mt-2 text-sm text-error">
        {errors.password?.message}
      </div>
    </div>
  );
}

export default PasswordInput;
