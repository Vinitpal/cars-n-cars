import Link from "next/link";
import { FiCheckCircle } from "react-icons/fi";

const Submitted = () => {
  return (
    <div className="submitted">
      <div className="submitted-container">
        <div className="wrapper ">
          <FiCheckCircle className="icon" />
          <h2>Form Submitted Successfully</h2>
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
