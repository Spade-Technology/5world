import Description from "~/components/commonComponents/description";

import Header from "~/components/layout/header";
import Offers from "~/components/pages/funding/offers";
import HowToApply from "~/components/pages/funding/howToApply";
import Footer from "~/components/layout/footer";
import MailingListComponent from "~/components/misc/mailinglist";

const GetFunding = () => {
  return (
    <>
      <Header />
      <div className="w-fit bg-white text-vdao-dark">
        <Description
          title={`Get Funding`}
          description="VDAO welcomes all funding proposals that align with its vision and mission of regenerating our planet through systems thinking, research, and innovation."
        />

        <Offers />

        <HowToApply />

        <MailingListComponent />
      </div>
      <Footer />
    </>
  );
};

export default GetFunding;
