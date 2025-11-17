// next js imports
import Link from "next/link";
import Image from "next/image";

const TopBarIcons = () => {
  const data = [
    {
      id: 1,
      img: "/icons/verified.png",
      title: "100% Verified",
    },
    {
      id: 2,
      img: "/icons/checking-attendance.png",
      title: "Physical Verification",
    },
    {
      id: 3,
      img: "/icons/deal.png",
      title: "Best Deals",
    },
    {
      id: 4,
      img: "/icons/file.png",
      title: "Documents Check",
    },
  ];

  return (
    <div className="topbar-icons">
      <div className="container">
        {[...data].map((item) => (
          <div key={item.id} className="icon">
            <div className="nav-link">
              <div className="image-container">
                <Image className="img" src={item.img} alt="Cars&Cars" width={25} height={25} />
              </div>
            </div>
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBarIcons;
