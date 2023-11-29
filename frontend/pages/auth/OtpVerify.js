import dynamic from "next/dynamic";
const OtpVerifyComponent = dynamic(() =>
  import("../../components/Auth/OtpVerifyComponent")
);

const OtpVerify = () => {
  return (
    <div>
      <OtpVerifyComponent />
    </div>
  );
};

export default OtpVerify;
