import Footer from "~/components/layout/footer";
import Header from "~/components/layout/header";
import PodCards from "~/components/pages/pods/podCards";
import PodsProfile from "~/components/pages/pods/podsProfile";

const Pods = () => {
  return (
    <>
      <Header />

      <div className="w-full text-vdao-dark">
        <PodsProfile />

        <PodCards />
      </div>

      <Footer />
    </>
  );
};

export default Pods;
