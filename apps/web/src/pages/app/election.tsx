import { User } from '@prisma/client'
import { useState } from 'react'
import Page from '~/components/layout/page'
import ElectionCards from '~/components/pages/app/election/electionCards'
import StewardElection from '~/components/pages/app/election/stewardElection'
import ProfilePopup from '~/components/pages/app/steward/profilePopup'

const Election = () => {
  const [openProfile, setOpenProfile] = useState<User | undefined>(undefined)
  return (
    <>
      <Page>
        <StewardElection />

        <ElectionCards setOpenProfile={setOpenProfile} />

        {openProfile && <ProfilePopup profile={openProfile} close={() => setOpenProfile(undefined)} />}
      </Page>
    </>
  )
}

export default Election
