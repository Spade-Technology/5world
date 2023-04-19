import { type NextPage } from "next";

import Footer from "~/components/layout/footer";
import Header from "~/components/layout/header";
import MailingListComponent from "~/components/misc/mailinglist";

import {
  AboutUsComponent,
  AboutUsCoreTeamComponent,
  AboutUsCoreValueComponent,
  AboutUsVisionMissionComponent,
} from "~/components/pages/about";

const AboutUs: NextPage = () => {
  return (
    <>
      <Header />
      <div className="w-full text-vdao-dark">
        <AboutUsComponent />
        {/* <Description
          title={<div>About Us</div>}
          description={
            <div>
              Global ecosystem regeneration is a positive sum game: the more
              effort we put in, the more we benefit.
              <br />
              <br />
              Regardless of our political views, lifestyle or opinions, we can
              all agree that regenerating degraded ecosystems is both neccessary
              and worthwhile.
            </div>
          }
        /> */}

        <AboutUsCoreValueComponent />

        <AboutUsVisionMissionComponent />

        <AboutUsCoreTeamComponent />

        <MailingListComponent />
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
