import Footer from "~/components/layout/footer";
import Header from "~/components/layout/header";
import GrantsRound from "~/components/pages/grants/grantsRound";

const Grants = () => {
  return (
    <>
      <Header web3 />

      <div className="w-full text-vdao-dark">
        <GrantsRound />
      </div>

      <Footer />
    </>
  );
};

export default Grants;
