import Link from "next/link";
import dynamic from "next/dynamic";

// dynamic imports
const ServiceCard = dynamic(() => import("../../components/Cards/ServiceCard"));
const AlterServiceCard = dynamic(() =>
  import("../../components/Cards/AlterServiceCard")
);
const OneTimeServiceCard = dynamic(() =>
  import("../../components/Cards/OneTimeServiceCard")
);
const Banner = dynamic(() => import("../../components/Services/Banner"));

// db imports
import { carWash, carPolish, carDetail } from "../../db/carService";

const index = () => {
  // console.log(carWash);
  return (
    <div className="service-page">
      <Banner />

      <div className="header">
        <h2>Car Wash Packages / Plan</h2>
        <div className="breadcrumb">
          <Link href="/" className="active">
            Home
          </Link>

          <span>{">"}</span>

          <Link href="/services">Services</Link>
        </div>
      </div>

      <div className="service-card-container">
        {carWash &&
          carWash.map((item, idx) => <ServiceCard key={idx} item={item} />)}
      </div>

      <OneTimeServiceCard />

      <div className="header">
        <h2>Car Polish Packages / Plan</h2>
        <div className="breadcrumb">
          <Link href="/" className="active">
            Home
          </Link>

          <span>{">"}</span>

          <Link href="/services">Services</Link>
        </div>
      </div>

      <div className="service-card-container">
        {carPolish &&
          carPolish.map((item, idx) => <ServiceCard key={idx} item={item} />)}
      </div>

      <div className="service-card-container">
        {carDetail &&
          carDetail.map((item, idx) => (
            <AlterServiceCard key={idx} item={item} />
          ))}
      </div>
    </div>
  );
};

export default index;
