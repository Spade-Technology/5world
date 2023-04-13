import Description from "~/components/commonComponents/description";
import Subscription from "~/components/commonComponents/subscription";
import Header from "~/components/layout/header";
import Offers from "./components/offers";
import HowToApply from "./components/howToApply";

const GetFunding = () => {
  return (
    <div className="w-fit bg-white text-vdao-dark">
      <Header />

      <Description
        title={`Get Funding`}
        description="VDAO welcomes all funding proposals that align with its vision and mission of regenerating our planet through systems thinking, research, and innovation."
      />

      <Offers />

      <HowToApply />

      <Subscription />
    </div>
  );
};

export default GetFunding;
