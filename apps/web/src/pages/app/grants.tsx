import { useState } from 'react'
import Page from '~/components/layout/page'
import { EnforceAuth } from '~/components/misc/enforceAuth'
import GrantCards from '~/components/pages/app/grants/grantCards'
import GrantsRound from '~/components/pages/app/grants/grantsRound'
import CreateGrant from '~/components/pages/app/grants/popups/createGrant'
import ViewDetails from '~/components/pages/app/grants/popups/viewDetails'

const Grants = () => {
  const [createGrant, setCreateGrant] = useState(false)
  const [viewDetails, setViewDetails] = useState(false)
  const [requestId, setRequestId] = useState(0)
  return ( 
    <Page>
      <GrantsRound setCreateGrant={setCreateGrant} />

      <EnforceAuth>
        <GrantCards setViewDetails={setViewDetails} setRequestId={setRequestId} />

        {createGrant && <CreateGrant show={createGrant} close={() => setCreateGrant(false)} />}

        {viewDetails && <ViewDetails show={viewDetails} close={() => setViewDetails(false)} requestId={requestId} />}
      </EnforceAuth>
    </Page>
  )
}

export default Grants
