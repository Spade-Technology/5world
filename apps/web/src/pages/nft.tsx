import FAQSection from "~/components/misc/FAQSection";
import { FAQS } from "~/components/pages/nftCollections/faqs";

import Page from "~/components/layout/page";
import MailingListComponent from "~/components/misc/mailinglist";
import NFTCollections from "~/components/pages/nftCollections/nftCollections";

const NFT = () => {
  return (
    <>
      <Page web2>
        <NFTCollections />

        <FAQSection FAQS={FAQS} />

        <MailingListComponent />
      </Page>
    </>
  );
};

export default NFT;
