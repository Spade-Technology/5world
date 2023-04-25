import Header from "~/components/layout/header";
import Offers from "~/components/pages/funding/offers";
import HowToApply from "~/components/pages/funding/howToApply";
import Footer from "~/components/layout/footer";
import MailingListComponent from "~/components/misc/mailinglist";
import Description from "~/components/misc/description";

const GetFunding = () => {
  return (
    <>
      <Header web2 />
      <div className="w-screen bg-white text-vdao-dark">
        <Description
          title={
            <p>
              Get <br /> Funding{" "}
            </p>
          }
          description={
            <p>
              VDAO welcomes all funding proposals that align with its vision and
              mission of regenerating our planet through systems thinking,
              research, and innovation.
            </p>
          }
        />

        <Offers />

        <HowToApply />

        <MailingListComponent />
      </div>
      <Footer />
    </>
  );
};

export default GetFunding;
