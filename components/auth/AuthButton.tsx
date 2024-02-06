import { Fragment } from "react";

type Props = {
  isLogin: boolean;
  toggleLogin: () => void;
};

function AuthButton({ isLogin, toggleLogin }: Props) {
  return (
    <Fragment>
      <button type="submit" className="btn btn-primary text-xl">
        {isLogin ? "SIGN IN" : "SIGN UP"}
      </button>
      <a
        className="link-hover link label-text-alt mt-2 text-center"
        onClick={toggleLogin}
      >
        {isLogin ? "Need an account? Sign up." : "Have an account? Sign in."}
      </a>
    </Fragment>
  );
}

export default AuthButton;
