import { useState } from "react";
import Footer from "~/components/layout/footer";
import Header from "~/components/layout/header";
import ProfilePopup from "~/components/pages/app/steward/profilePopup";
import StewardCards from "~/components/pages/app/steward/stewardCards";
import StewardProfile from "~/components/pages/app/steward/stewardProfile";

const Steward = () => {
  const [openProfile, setOpenProfile] = useState(false);
  return (
    <>
      <Header web3 />

      <div className="w-full text-vdao-dark">
        <StewardProfile />

        <StewardCards setOpenProfile={setOpenProfile} />

        {openProfile && (
          <ProfilePopup
            show={openProfile}
            close={() => setOpenProfile(false)}
          />
        )}
      </div>

      <Footer />
    </>
  );
};

export default Steward;
