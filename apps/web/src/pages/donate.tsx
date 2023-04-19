import Footer from "~/components/layout/footer";
import Header from "~/components/layout/header";
import Description from "~/components/misc/description";
import Subscription from "~/components/misc/subscription";
import Badges from "~/components/pages/donate/badges";
import DonateNow from "~/components/pages/donate/donateNow";
import WhatsInIt from "~/components/pages/donate/whatsInIt";

const Donate = () => {
  return (
    <>
      <Header className="bg-vdao-deep text-white" invertImages={true} />
      <div className="w-fit">
        <div className="bg-vdao-deep">
          <Description
            invertColors={true}
            title={<div className="pr-[23px] ">Donate</div>}
            description={
              <div className="font-body text-[26px] font-medium">
                Support VDAO’s mission to <br /> regenerate our planet.
              </div>
            }
          />

          <DonateNow />

          <WhatsInIt />

          <Badges />
        </div>

        <Subscription />
      </div>
      <Footer />
    </>
  );
};

export default Donate;
