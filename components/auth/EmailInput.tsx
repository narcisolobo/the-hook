import {
  FieldErrors,
  RegisterOptions,
  UseFormRegisterReturn,
} from "react-hook-form";
import { AuthFormInputs } from "./AuthForm";

const EMAIL_REGEX = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$/;

type Props = {
  register: (
    name: "email",
    options?: RegisterOptions<AuthFormInputs, "email"> | undefined,
  ) => UseFormRegisterReturn<"email">;
  errors: FieldErrors<AuthFormInputs>;
};

function EmailInput({ register, errors }: Props) {
  return (
    <div className="form-control">
      <label className="label hidden" htmlFor="email">
        <span className="label-text">Email address:</span>
      </label>
      <input
        {...register("email", {
          required: "Please enter your email.",
          pattern: {
            value: EMAIL_REGEX,
            message: "Invalid email.",
          },
        })}
        id="email"
        type="email"
        placeholder="email"
        className="input input-bordered"
        autoComplete="email"
      />
      <div className="ml-1 mt-2 text-sm text-error">
        {errors.email?.message}
      </div>
    </div>
  );
}

export default EmailInput;
