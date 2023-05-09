// import { type NextPage } from "next";

import Footer from "~/components/layout/footer";
import Header from "~/components/layout/header";
import { Section } from "~/components/layout/section";
import {
  MembershipComponent,
  ProposalComponent,
  TitleComponent,
} from "~/components/pages/app/analytics/analytics";

const Analytics = () => {
  return (
    <>
      <Header />
      <div className="bg-vdao-deep px-6 md:px-0">
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
