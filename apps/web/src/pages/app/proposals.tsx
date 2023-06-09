import { useState } from 'react'
import Footer from '~/components/layout/footer'
import Header from '~/components/layout/header'
import Page from '~/components/layout/page'
import { EnforceAuth } from '~/components/misc/enforceAuth'
import Insights from '~/components/pages/app/proposals/insights'
import OperationalProposals from '~/components/pages/app/proposals/operationalProposals'
import CreateNewProposal from '~/components/pages/app/proposals/popups/createProposal'
import ViewProposal from '~/components/pages/app/proposals/popups/viewProposal'
import ProposalCards from '~/components/pages/app/proposals/proposalCards'

const Proposals = () => {
  const [openCreateProposal, setOpenCreateProposal] = useState(false)
  const [viewProposal, setViewProposal] = useState(false)

  return (
    <Page>
      <div className='w-full text-vdao-dark'>
        <OperationalProposals setOpenCreateProposal={setOpenCreateProposal} />
        <EnforceAuth>
          <ProposalCards setViewProposal={setViewProposal} />

          <Insights />

          {openCreateProposal && <CreateNewProposal show={openCreateProposal} close={() => setOpenCreateProposal(false)} />}

          {viewProposal && <ViewProposal show={viewProposal} close={() => setViewProposal(false)} />}
        </EnforceAuth>
      </div>

      {/* <Footer /> */}
    </Page>
  )
}

export default Proposals
