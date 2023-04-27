import Footer from "~/components/layout/footer";
import Header from "~/components/layout/header";
import OperationalProposals from "~/components/pages/proposals/operationalProposals";

const Proposals = () => {
  return (
    <>
      <Header />

      <div className="w-full text-vdao-dark">
        <OperationalProposals />
      </div>

      <Footer />
    </>
  );
};

export default Proposals;
