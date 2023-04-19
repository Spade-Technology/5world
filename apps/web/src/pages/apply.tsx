import React from "react";

import Footer from "~/components/layout/footer";
import Header from "~/components/layout/header";
import MailingListComponent from "~/components/misc/mailinglist";

import SectionOne from "~/components/pages/apply/sectionOne";
import SectionTwo from "~/components/pages/apply/sectionTwo";
import { FAQS } from "~/components/pages/apply/faqs";
import Description from "~/components/misc/description";
import FAQSection from "~/components/misc/FAQSection";

type Props = {};

const apply = (props: Props) => {
  return (
    <>
      <Header />
      <div className="w-fit bg-white text-vdao-dark">
        <Description
          title={
            <div>
              Apply to Join
              <br /> VDAO
            </div>
          }
          description={
            <div>
              The DAO invites members who share our core values and are
              passionate about restoring our planet. We're looking for
              contributors with skills and experience in key areas such as:
            </div>
          }
        />

        <SectionOne />

        <SectionTwo />

        <FAQSection FAQS={FAQS} />

        <MailingListComponent />
      </div>
      <Footer />
    </>
  );
};

export default apply;
