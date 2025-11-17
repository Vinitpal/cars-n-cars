// next js imports
import Link from "next/link";
import dynamic from "next/dynamic";

// component imports
const SellerForm = dynamic(() =>
  import("../../components/SellerForm/SellerForm")
);

const SellYourCar = () => {
  return (
    <div className="sell-your-car">
      <div className="header">
        <h2>Sell Used Car in Easy Step</h2>
        <div className="breadcrumb">
          <Link href="/" className="active">
            Home
          </Link>
          <span>{">"}</span>
          <Link href="/sellYourCar">Sell Used Car</Link>
        </div>
      </div>

      <div className="seller-form lead-seller-form">
        <SellerForm />
      </div>

      <div className="how-it-work">
        <h2>How Sell Used Car Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="number">1</div>
            <h4>Get an Estimate Fast</h4>
            <p>
              Enter your car&apos;s information and instantly get a value
              estimate.
            </p>
          </div>
          <div className="step">
            <div className="number">2</div>
            <h4>Fine-Tune Your Value</h4>
            <p>
              Tell us about features like color and mileage, and see immediately
              how they affect your car&apos;s value.
            </p>
          </div>
          <div className="step">
            <div className="number">3</div>
            <h4>Get Your True Cash Offer tm</h4>
            <p>
              Ready to sell or trade? Get an offer from a local dealer today.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellYourCar;
