import Footer from "~/components/layout/footer"
import Header from "~/components/layout/header"
import PodCards from "~/components/pages/app/pods/podCards"
import PodsProfile from "~/components/pages/app/pods/podsProfile"

const Pods = () => {
    return(<>
      <Header web3 />

      <div className="w-full text-vdao-dark">
      <PodsProfile />

      <PodCards />
      </div>
      
      <Footer />
    </>)
}

export default Pods