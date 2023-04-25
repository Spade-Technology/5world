import Footer from "~/components/layout/footer";
import Header from "~/components/layout/header";
import Description from "~/components/misc/description";
import HowItWorks from "~/components/misc/howItWorks";
import MailingListComponent from "~/components/misc/mailinglist";

import Badges from "~/components/pages/donate/badges";
import DonateNow from "~/components/pages/donate/donateNow";
import WhatsInIt from "~/components/pages/donate/whatsInIt";

const Donate = () => {
  return (
    <>
      <Header className="bg-vdao-deep text-white" />
      <div className=" overflow-hidden bg-vdao-deep">
        <div className="mx-auto max-w-[1280px]">
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

          {/* <WhatsInIt /> */}
          <HowItWorks
            contents={[
              {
                heading: "What’s in it for me?",
                content:
                  "There is no minimum donation amount. All donors get to rest in the knowledge that they are contributing to ecosystem regeneration.",
              },
              {
                heading: "Badges",
                content:
                  "For those who want a little more, we offer the following ‘Proof of Virtue’ badges. A must have item for all discerning donors who want to signal publicly that they are supporting efforts to regenerate the plant’s ecosystems. Each badge also contains 100voting credits, enabling holders to vote in quadratic funding rounds and have some say over where their donations are being spent.",
              },
            ]}
          />

          <Badges />
        </div>

        <MailingListComponent />
      </div>
      <Footer />
    </>
  );
};

export default Donate;
