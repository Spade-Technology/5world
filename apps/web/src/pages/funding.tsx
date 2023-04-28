import Header from "~/components/layout/header";
import Offers from "~/components/pages/funding/offers";
import HowToApply from "~/components/pages/funding/howToApply";
import Footer from "~/components/layout/footer";
import MailingListComponent from "~/components/misc/mailinglist";

import GetFundingDescription from "~/components/pages/funding/description";
import Page from "~/components/layout/page";

const GetFunding = () => {
  return (
    <>
      <Page web2>
        <GetFundingDescription />

        <Offers />

        <HowToApply />

        <MailingListComponent />
      </Page>
    </>
  );
};

export default GetFunding;
