import Footer from "~/components/layout/footer";
import Header from "~/components/layout/header";
import Page from "~/components/layout/page";
import PodCards from "~/components/pages/pods/podCards";
import PodsProfile from "~/components/pages/pods/podsProfile";

const Pods = () => {
  return (
    <>
      <Page>
        <PodsProfile />

        <PodCards />
      </Page>
    </>
  );
};

export default Pods;
