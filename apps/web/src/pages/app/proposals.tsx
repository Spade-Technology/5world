import { useState } from 'react'

import Page from '~/components/layout/page'
import { EnforceAuth } from '~/components/misc/enforceAuth'
import CreateGrant from '~/components/pages/app/grants/popups/createGrant'
import Insights from '~/components/pages/app/proposals/insights'
import OperationalProposals from '~/components/pages/app/proposals/operationalProposals'
import CreateNewProposal from '~/components/pages/app/proposals/popups/createProposal'
import ViewProposal from '~/components/pages/app/proposals/popups/viewProposal'
import ProposalCards from '~/components/pages/app/proposals/proposalCards'
import { useProposalReads } from '~/hooks/web3/useProposal'

const Proposals = () => {
  const [openCreateProposal, setOpenCreateProposal] = useState(false)
  const [openCreateGrantProposal, setOpenCreateGrantProposal] = useState(false)
  const [viewProposal, setViewProposal] = useState(false)
  const [proposalID, setProposalID] = useState(0)
  const { refetch } = useProposalReads({ include: { author: true, pod: true } })


  return (
    <Page>
      <div className='w-full text-vdao-dark'>
        <OperationalProposals {...{ setOpenCreateProposal, setOpenCreateGrantProposal }} />

        <EnforceAuth>
          <ProposalCards setViewProposal={setViewProposal} setProposalID={setProposalID} />

          <div className='px-6 md:px-10 xl:px-0'>
            <Insights />
          </div>

          {openCreateProposal && <CreateNewProposal show={openCreateProposal} close={() => setOpenCreateProposal(false)} />}
          {openCreateGrantProposal && <CreateGrant show={openCreateGrantProposal} close={() => setOpenCreateGrantProposal(false)} refetchFunc={() => refetch()} />}
          {viewProposal && <ViewProposal show={viewProposal} proposalID={proposalID} close={() => setViewProposal(false)} />}
        </EnforceAuth>
      </div>

      {/* <Footer /> */}
    </Page>
  )
}

export default Proposals
