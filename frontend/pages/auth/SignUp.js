import dynamic from "next/dynamic";
const SignUpComponent = dynamic(() =>
  import("../../components/Auth/SignUpComponent")
);

const SignUp = () => {
  return (
    <div>
      <SignUpComponent />
    </div>
  );
};

export default SignUp;
