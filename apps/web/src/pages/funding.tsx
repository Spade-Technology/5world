import Description from "~/components/misc/description";
import Subscription from "~/components/misc/subscription";
import Header from "~/components/layout/header";
import Offers from "~/components/pages/funding/offers";
import HowToApply from "~/components/pages/funding/howToApply";
import Footer from "~/components/layout/footer";

const GetFunding = () => {
  return (
    <>
      <Header />
      <div className="w-fit bg-white text-vdao-dark">
        <Description
          title={
            <div>
              Get
              <br /> Funding
            </div>
          }
          description={
            <div>
              VDAO welcomes all funding proposals that align with its vision and
              mission of regenerating our planet through systems thinking,
              research, and innovation.
            </div>
          }
        />

        <Offers />

        <HowToApply />

        <Subscription />
      </div>
      <Footer />
    </>
  );
};

export default GetFunding;
