import React from "react";
import Description from "~/components/commonComponents/description";
import Subscription from "~/components/commonComponents/subscription";
import Header from "~/components/layout/header";
import FAQSection from "./components/FAQSection";
import SectionOne from "./components/sectionOne";
import SectionTwo from "./components/sectionTwo";

type Props = {};

const apply = (props: Props) => {
  return (
    <div className="bg-white text-vdao-dark w-fit">
      <Header />

      <Description
        title="Apply to Join VDAO"
        description="The DAO invites members who share our core values and are passionate about restoring our planet. We're looking for contributors with skills and experience in key areas such as:"
      />

      <SectionOne />

      <SectionTwo />

      <FAQSection />

      <Subscription />
    </div>
  );
};

export default apply;
