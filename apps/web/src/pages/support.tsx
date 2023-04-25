import Footer from "~/components/layout/footer";
import Header from "~/components/layout/header";
import MemberSuport from "~/components/pages/support/memberSupport";

const Support = () => {
  return (
    <>
      <Header web3 />

      <div className="w-full text-vdao-dark">
        <MemberSuport />
      </div>

      <Footer />
    </>
  );
};

export default Support;
