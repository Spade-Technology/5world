import { useState } from 'react'
import Page from '~/components/layout/page'
import { EnforceAuth } from '~/components/misc/enforceAuth'
import GrantSearch from '~/components/pages/app/grants/grantSearch'
import GrantsRound from '~/components/pages/app/grants/grantsRound'
import CreateGrant from '~/components/pages/app/grants/popups/createGrant'
<<<<<<< HEAD:apps/web/src/pages/app/grants/index.tsx
import GrantDetails from '~/components/pages/app/grants/popups/grantDetails'
import { api } from '~/utils/api'
=======
import ViewDetails from '~/components/pages/app/grants/popups/viewDetails'
>>>>>>> hooks-integration:apps/web/src/pages/app/grants.tsx

const Grants = () => {
  const [createGrant, setCreateGrant] = useState(false)
  const [viewDetails, setViewDetails] = useState(false)
<<<<<<< HEAD:apps/web/src/pages/app/grants/index.tsx

  return (
=======
  const [requestId, setRequestId] = useState(0)
  return ( 
>>>>>>> hooks-integration:apps/web/src/pages/app/grants.tsx
    <Page>
      <GrantsRound setCreateGrant={setCreateGrant} />

      <EnforceAuth>
<<<<<<< HEAD:apps/web/src/pages/app/grants/index.tsx
        <GrantSearch setViewDetails={setViewDetails} />
=======
        <GrantCards setViewDetails={setViewDetails} setRequestId={setRequestId} />

        {createGrant && <CreateGrant show={createGrant} close={() => setCreateGrant(false)} />}

        {viewDetails && <ViewDetails show={viewDetails} close={() => setViewDetails(false)} requestId={requestId} />}
>>>>>>> hooks-integration:apps/web/src/pages/app/grants.tsx
      </EnforceAuth>
    </Page>
  )
}

export default Grants
