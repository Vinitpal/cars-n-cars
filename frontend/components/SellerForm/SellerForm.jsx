// next js imports
// import { useSelector } from "react-redux";
// import { useState, useEffect } from "react";
// import dynamic from "next/dynamic";

// component imports
import { Tabs } from "antd";
const { TabPane } = Tabs;
// import BasicDetailForm from "./BasicDetailForm";

// dynamic imports
import LeadForm from "./LeadForm";
// const SellerDetailForm = dynamic(() => import("./SellerDetailForm"));
// const VerficationOtp = dynamic(() => import("./VerficationOtp"));

const SellerForm = () => {
  // const [basicDetailCompleted, setBasicDetailCompleted] = useState(false);
  // const [sellerDetailCompleted, setSellerDetailCompleted] = useState(false);
  // const screenWidth = useSelector((state) => state.screen.value);
  // const [activeKey, setActiveKey] = useState("1");

  // useEffect(() => {
  //   changeTab();
  // });

  // useEffect(() => {
  //   window.scrollTo({
  //     top: 0,
  //     left: 0,
  //     behavior: "smooth",
  //   });
  // }, [activeKey]);

  // const changeTab = () => {
  //   // console.log(activeKey);

  //   if (basicDetailCompleted) {
  //     setActiveKey("2");
  //   }

  //   if (basicDetailCompleted && sellerDetailCompleted) {
  //     setActiveKey("3");
  //   }
  // };

  return (
    <div className="seller-form-container lead-form-container">
      <LeadForm />
      {/* <Tabs activeKey={activeKey} onChange={changeTab}>
        {screenWidth < 768 && !basicDetailCompleted && (
          <TabPane tab="Basic Info." key="1">
            <BasicDetailForm
              setBasicDetailCompleted={setBasicDetailCompleted}
            />
          </TabPane>
        )}

        {screenWidth < 768 && basicDetailCompleted && !sellerDetailCompleted && (
          <TabPane tab="Car Details" key="2">
            <SellerDetailForm
              setSellerDetailCompleted={setSellerDetailCompleted}
            />
          </TabPane>
        )}

        {/*screenWidth < 768 && basicDetailCompleted && sellerDetailCompleted && (
          <TabPane tab="OTP Verification" key="3">
            <VerficationOtp />
          </TabPane>
        )/*}

        {screenWidth > 768 && (
          <TabPane tab="Basic Info." key="1">
            <BasicDetailForm
              setBasicDetailCompleted={setBasicDetailCompleted}
            />
          </TabPane>
        )}

        {screenWidth > 768 &&
          (basicDetailCompleted ? (
            <TabPane tab="Car Details" key="2">
              <SellerDetailForm
                setSellerDetailCompleted={setSellerDetailCompleted}
              />
            </TabPane>
          ) : (
            <TabPane tab="Car Details" key="2" disabled>
              Seller Detail
            </TabPane>
          ))}

        {screenWidth > 768 &&
          (basicDetailCompleted && sellerDetailCompleted ? (
            <TabPane tab="OTP Verification" key="3">
              <VerficationOtp />
            </TabPane>
          ) : (
            <TabPane tab="Verification" disabled key="3">
              verify
            </TabPane>
          ))}
          </Tabs>*/}
    </div>
  );
};

export default SellerForm;
