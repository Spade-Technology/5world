import { User } from '@prisma/client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Footer from '~/components/layout/footer'
import Header from '~/components/layout/header'
import Page from '~/components/layout/page'
import LoginPromptComponent, { EnforceAuth } from '~/components/misc/enforceAuth'
import ElectionCards from '~/components/pages/app/election/electionCards'
import StewardElection from '~/components/pages/app/election/stewardElection'
import ProfilePopup from '~/components/pages/app/steward/profilePopup'
import VotesNscores from '~/components/pages/app/election/popups/votesNscores'

const Election = () => {
  const [openProfile, setOpenProfile] = useState<User | undefined>(undefined)
  const { data: siwe } = useSession()
  const [openVotesNscores, setOpenVotesNscores] = useState(false)

  return (
    <>
      <Page>
        <StewardElection />

        <EnforceAuth>
          <ElectionCards setOpenProfile={setOpenProfile} setOpenVotesNscores={setOpenVotesNscores} />

          {openProfile && <ProfilePopup profile={openProfile} close={() => setOpenProfile(undefined)} />}

          { openVotesNscores && <VotesNscores show={openVotesNscores} close={() => setOpenVotesNscores(false)} /> }
        </EnforceAuth>
      </Page>
    </>
  )
}

export default Election
