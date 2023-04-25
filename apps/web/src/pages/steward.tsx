import Footer from "~/components/layout/footer";
import Header from "~/components/layout/header";
import StewardCards from "~/components/pages/steward/stewardCards";
import StewardProfile from "~/components/pages/steward/stewardProfile";

const Steward = () => {
  return (
    <>
      <Header web3 />
      <StewardProfile />

      <StewardCards />
      <Footer />
    </>
  );
};

export default Steward;
