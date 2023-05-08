// import { type NextPage } from "next";

import Footer from "~/components/layout/footer";
import Header from "~/components/layout/header";
import Page from "~/components/layout/page";
import { Section } from "~/components/layout/section";
<<<<<<< Updated upstream
=======
import { Section } from "~/components/layout/section";
>>>>>>> Stashed changes
import {
  MembershipComponent,
  ProposalComponent,
  TitleComponent,
} from "~/components/pages/app/analytics/analytics";
import {
  NewMembersComponent,
  ProfileHomeComponent,
  StatisticsHomeComponent,
  WelcomeComponent,
} from "~/components/pages/web3home";

const Analytics = () => {
  return (
    <>
      <Header />
      <div className="bg-vdao-deep">
        <Section className="mx-auto lg:max-w-[1280px]">
          <TitleComponent />

          <MembershipComponent />

          <ProposalComponent />
        </Section>
      </div>
      <Footer />
    </>
  );
};

export default Analytics;
