import dynamic from "next/dynamic";
const LoginComponent = dynamic(() =>
  import("../../components/Auth/LoginComponent")
);

const Login = () => {
  return (
    <div>
      <LoginComponent />
    </div>
  );
};

export default Login;
