import Footer from "~/components/layout/footer";
import Header from "~/components/layout/header";
import MailingListComponent from "~/components/misc/mailinglist";

import Badges from "~/components/pages/donate/badges";
import DonateDescription from "~/components/pages/donate/description";
import DonateNow from "~/components/pages/donate/donateNow";
import WhatsInIt from "~/components/pages/donate/whatsInIt";

const Donate = () => {
  return (
    <>
      <Header className="bg-vdao-deep text-white" />

      <div className="overflow-hidden bg-vdao-deep">
        <div className="mx-auto max-w-[1280px]">
          <DonateDescription />

          <DonateNow />

          <WhatsInIt />

          <Badges />
        </div>

        <MailingListComponent />
      </div>

      <Footer />
    </>
  );
};

export default Donate;
