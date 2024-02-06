type Props = {
  message: string;
};

function AuthAlert({ message }: Props) {
  return (
    <div role="alert" className="alert alert-error mb-6">
      <i className="bi bi-x-circle"></i>
      <span>{message}</span>
    </div>
  );
}

export default AuthAlert;
