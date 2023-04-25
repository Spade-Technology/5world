import Header from "~/components/layout/header";
import Offers from "~/components/pages/funding/offers";
import HowToApply from "~/components/pages/funding/howToApply";
import Footer from "~/components/layout/footer";
import MailingListComponent from "~/components/misc/mailinglist";

import GetFundingDescription from "~/components/pages/funding/description";

const GetFunding = () => {
  return (
    <>
      <Header web2 />
      <div className="w-screen bg-white text-vdao-dark">
        <GetFundingDescription />

        <Offers />

        <HowToApply />

        <MailingListComponent />
      </div>
      <Footer />
    </>
  );
};

export default GetFunding;
