import Link from "next/link";

const QuickFooterLinks = () => {
  return (
    <div className="quick-footer-links">
      {/* <div className="wrapper">
        <Link href="/">
          <a>About Us</a>
        </Link>
        <Link href="/">
          <a>Advertise with Us</a>
        </Link>
        <Link href="/">
          <a>Sitemap</a>
        </Link>
        <Link href="/">
          <a>Contact Us</a>
        </Link>
        <Link href="/">
          <a>Terms of Use</a>
        </Link>
        <Link href="/">
          <a>Privacy Policy</a>
        </Link>
        <Link href="/">
          <a>Apps</a>
        </Link>
        <Link href="/">
          <a>Feedback</a>
        </Link>
  </div>*/}

      <div className="copyright">
        <Link href="/" style={{ color: "inherit" }}>
          Cars & Cars
        </Link>{" "}
        Made with {"<3"} by{" "}
        <a
          href="https://www.linkedin.com/in/vinitpal-singh/"
          style={{ color: "#fff" }}
        >
          Kirua Corps
        </a>
      </div>
    </div>
  );
};

export default QuickFooterLinks;
