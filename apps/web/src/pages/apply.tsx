import React from "react";
import Description from "~/components/commonComponents/description";
import Subscription from "~/components/commonComponents/subscription";
import Footer from "~/components/layout/footer";
import Header from "~/components/layout/header";

import FAQSection from "~/components/pages/apply/FAQSection";
import SectionOne from "~/components/pages/apply/sectionOne";
import SectionTwo from "~/components/pages/apply/sectionTwo";

type Props = {};

const apply = (props: Props) => {
  return (
    <>
      <Header />
      <div className="w-fit bg-white text-vdao-dark">
        <Description
          title="Apply to Join VDAO"
          description="The DAO invites members who share our core values and are passionate about restoring our planet. We're looking for contributors with skills and experience in key areas such as:"
        />

        <SectionOne />

        <SectionTwo />

        <FAQSection />

        <Subscription />
      </div>
      <Footer />
    </>
  );
};

export default apply;
