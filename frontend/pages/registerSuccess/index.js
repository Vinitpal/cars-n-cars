import Link from "next/link";
import { FiCheckCircle } from "react-icons/fi";
import { api_path } from "../../db/path";

const Submitted = () => {
  return (
    <div className="submitted">
      <div className="submitted-container">
        <div className="wrapper ">
          <FiCheckCircle className="icon" />
          <h2>Registered Successfully</h2>
          <p>
            You can use your email and password{" "}
            <a href={`${api_path}/admin`} target="_blank">
              here to access the dashboard
            </a>
          </p>
          <p>
            Go back to{" "}
            <Link href="/">
              <a>Home page</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Submitted;
