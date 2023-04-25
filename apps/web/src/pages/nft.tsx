import Description from "~/components/misc/description";
import Header from "~/components/layout/header";
import FAQSection from "~/components/misc/FAQSection";
import { FAQS } from "~/components/pages/nftCollections/faqs";

import Footer from "~/components/layout/footer";
import HowItWorks from "~/components/pages/nftCollections/howItWorks";
import MailingListComponent from "~/components/misc/mailinglist";
import NFTCollections from "~/components/pages/nftCollections/nftCollections";

const NFT = () => {
  return (
    <>
      <Header className="bg-vdao-deep text-white" />

      <div className="w-full text-vdao-dark">
      <NFTCollections />

      <FAQSection FAQS={FAQS} />

      <MailingListComponent />
      </ div>

      <Footer />
    </>
  );
};

export default NFT;
