import { useState } from 'react'
import Page from '~/components/layout/page'
import { EnforceAuth } from '~/components/misc/enforceAuth'
import GrantCards from '~/components/pages/app/grants/grantCards'
import GrantsRound from '~/components/pages/app/grants/grantsRound'
import CreateGrant from '~/components/pages/app/grants/popups/createGrant'
import GrantDetails from '~/components/pages/app/grants/popups/grantDetails'

const Grants = () => {
  const [createGrant, setCreateGrant] = useState(false)
  const [viewDetails, setViewDetails] = useState(false)
  return (
    <Page>
      <GrantsRound setCreateGrant={setCreateGrant} />

      <EnforceAuth>
        <GrantCards setViewDetails={setViewDetails} />

        {createGrant && <CreateGrant show={createGrant} close={() => setCreateGrant(false)} />}

        {viewDetails && <GrantDetails show={viewDetails} close={() => setViewDetails(false)} />}
      </EnforceAuth>
    </Page>
  )
}

export default Grants
