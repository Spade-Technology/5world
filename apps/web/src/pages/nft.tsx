import Description from "~/components/misc/description";
import Header from "~/components/layout/header";
import FAQSection from "~/components/misc/FAQSection";
import { FAQS } from "~/components/pages/nftCollections/faqs";

import Footer from "~/components/layout/footer";
import HowItWorks from "~/components/pages/nftCollections/howItWorks";
import MailingListComponent from "~/components/misc/mailinglist";

const NFTCollections = () => {
  return (
    <>
      <Header className="bg-vdao-deep text-white" invertImages={true} />
      <div className="w-screen bg-vdao-deep">
        <Description
          invertColors={true}
          title={
            <div>
              NFT
              <br />
              Collections
            </div>
          }
          description={
            <div className="font-body text-[26px] font-medium">
              VDAO exists at the intersection of technology, research, art and
              imagination. Our community is laser focused on regenerating our
              planet via grass-roots innovation.
              <br />
              <br />
              Each NFT collection released by VDAO is a unique curation by
              members. VDAO NFTs invite us to imagine what life will be like
              when our goal of global ecosystem regeneration is achieved.
            </div>
          }
        />
        <HowItWorks />
      </div>

      <FAQSection FAQS={FAQS} />
      <MailingListComponent />

      <Footer />
    </>
  );
};

export default NFTCollections;
