import { useState } from 'react'
import Page from '~/components/layout/page'
import { EnforceAuth } from '~/components/misc/enforceAuth'
import GrantSearch from '~/components/pages/app/grants/grantSearch'
import GrantsRound from '~/components/pages/app/grants/grantsRound'
import CreateGrant from '~/components/pages/app/grants/popups/createGrant'

const Grants = () => {
  const [createGrant, setCreateGrant] = useState(false)
  const [viewDetails, setViewDetails] = useState(false)

  return (
    <Page>
      <GrantsRound setCreateGrant={setCreateGrant} />

      <EnforceAuth>
        <GrantSearch setViewDetails={setViewDetails} />

        {createGrant && <CreateGrant show={createGrant} close={() => setCreateGrant(false)} />}
      </EnforceAuth>
    </Page>
  )
}

export default Grants
