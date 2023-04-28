import Footer from "~/components/layout/footer";
import Header from "~/components/layout/header";
import GrantCards from "~/components/pages/app/grants/grantCards";
import GrantsRound from "~/components/pages/app/grants/grantsRound";

const Grants = () => {
  return (
    <>
      <Header web3 />

      <div className="w-full text-vdao-dark">
        <GrantsRound />

        <GrantCards />
      </div>

      <Footer />
    </>
  );
};

export default Grants;
