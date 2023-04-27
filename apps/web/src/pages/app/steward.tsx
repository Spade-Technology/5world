import Footer from "~/components/layout/footer";
import Header from "~/components/layout/header";
import StewardCards from "~/components/pages/steward/stewardCards";
import StewardProfile from "~/components/pages/steward/stewardProfile";

const Steward = () => {
  return (
    <>
      <Header />

      <div className="w-full text-vdao-dark">
        <StewardProfile />

        <StewardCards />
      </div>

      <Footer />
    </>
  );
};

export default Steward;
