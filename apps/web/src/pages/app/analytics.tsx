// import { type NextPage } from "next";

import Footer from "~/components/layout/footer";
import Header from "~/components/layout/header";
import Page from "~/components/layout/page";
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
      <Header web3 />
      <div className="bg-vdao-deep">
        <div className="mx-auto px-6 lg:max-w-[1188px]">
          <TitleComponent />

          <MembershipComponent />

          <ProposalComponent />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Analytics;
