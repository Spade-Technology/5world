import { useState } from "react";
import Footer from "~/components/layout/footer";
import Header from "~/components/layout/header";
import GrantCards from "~/components/pages/app/grants/grantCards";
import GrantsRound from "~/components/pages/app/grants/grantsRound";
import CreateGrant from "~/components/pages/app/grants/popups/createGrant";
import GrantDetails from "~/components/pages/app/grants/popups/grantDetails";

const Grants = () => {
  const [createGrant, setCreateGrant] = useState(false);
  const [viewDetails, setViewDetails] = useState(false);
  return (
    <>
      <Header />

      <div className="w-full text-vdao-dark">
        <GrantsRound setCreateGrant={setCreateGrant} />

        <GrantCards setViewDetails={setViewDetails} />

        {createGrant && (
          <CreateGrant show={createGrant} close={() => setCreateGrant(false)} />
        )}

        {viewDetails && (
          <GrantDetails
            show={viewDetails}
            close={() => setViewDetails(false)}
          />
        )}
      </div>

      <Footer />
    </>
  );
};

export default Grants;
