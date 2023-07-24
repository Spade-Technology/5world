import { User } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import Page from '~/components/layout/page'
import { EnforceAuth } from '~/components/misc/enforceAuth'
import ElectionCards from '~/components/pages/app/election/electionCards'
import VotesNscores from '~/components/pages/app/election/popups/votesNscores'
import StewardElection from '~/components/pages/app/election/stewardElection'
import ProfilePopup from '~/components/pages/app/steward/profilePopup'

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

          {openVotesNscores && <VotesNscores show={openVotesNscores} close={() => setOpenVotesNscores(false)} />}
        </EnforceAuth>
      </Page>
    </>
  )
}

export default Election
