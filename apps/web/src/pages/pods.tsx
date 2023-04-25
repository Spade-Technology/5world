import Footer from "~/components/layout/footer"
import Header from "~/components/layout/header"
import PodCards from "~/components/pages/pods/podCards"
import PodsProfile from "~/components/pages/pods/podsProfile"

const Pods = () => {
    return(<>
      <Header web3 />

      <PodsProfile />
      <PodCards />
      <Footer />
    </>)
}

export default Pods