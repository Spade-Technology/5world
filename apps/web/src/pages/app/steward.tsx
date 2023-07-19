import { User } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import Footer from '~/components/layout/footer'
import Header from '~/components/layout/header'
import Page from '~/components/layout/page'
import LoginPromptComponent, { EnforceAuth } from '~/components/misc/enforceAuth'
import ProfilePopup from '~/components/pages/app/steward/profilePopup'
import StewardCards from '~/components/pages/app/steward/stewardCards'
import StewardProfile from '~/components/pages/app/steward/stewardProfile'

const Steward = () => {
  const [openProfile, setOpenProfile] = useState<User | undefined>(undefined)
  const { data: siwe } = useSession()

  return (
    <div className=''>
      <Page>
        <StewardProfile />

        <EnforceAuth>
          <StewardCards setOpenProfile={setOpenProfile} />
          <ProfilePopup profile={openProfile || ''} close={() => setOpenProfile(undefined)} />
        </EnforceAuth>
      </Page>
    </div>
  )
}

export default Steward
