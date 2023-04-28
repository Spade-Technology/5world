import Footer from "~/components/layout/footer";
import Header from "~/components/layout/header";
import Page from "~/components/layout/page";
import StewardCards from "~/components/pages/steward/stewardCards";
import StewardProfile from "~/components/pages/steward/stewardProfile";

const Steward = () => {
  return (
    <>
      <Page>
        <StewardProfile />

        <StewardCards />
      </Page>
    </>
  );
};

export default Steward;
