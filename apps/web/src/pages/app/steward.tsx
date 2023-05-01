import Footer from "~/components/layout/footer";
import Header from "~/components/layout/header";
import StewardCards from "~/components/pages/app/steward/stewardCards";
import StewardProfile from "~/components/pages/app/steward/stewardProfile";

const Steward = () => {
  return (
    <>
      <Header web3 />

      <div className="w-full text-vdao-dark">
        <StewardProfile />

        <StewardCards />
      </div>

      <Footer />
    </>
  );
};

export default Steward;
