import { type NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

import Page from '~/components/layout/page'
import { Section } from '~/components/layout/section'
import LoginPromptComponent, { EnforceAuth } from '~/components/misc/enforceAuth'
import ProfilePopup from '~/components/pages/app/home/profilePopup'
import {
  NewMembersComponent,
  ProfileHomeComponent,
  StatisticsHomeComponent,
  WelcomeComponent,
} from '~/components/pages/app/home/web3home'

const Home: NextPage = () => {
  const [openProfile, setOpenProfile] = useState(false)
  const [newMembersArr, setNewMembersArr] = useState<any>([])

  return (
    <>
      <Page>
        <WelcomeComponent />

        <EnforceAuth>
          <div className='mx-auto  flex w-fit'>
            <Section className='mx-6 grid justify-between gap-5 md:grid-cols-12 lg:max-w-[1280px]'>
              <ProfileHomeComponent setOpenProfile={setOpenProfile} setNewMembersArr={setNewMembersArr} />

              <NewMembersComponent newMembersArr={newMembersArr} />

              <StatisticsHomeComponent />
            </Section>
          </div>
          {openProfile && <ProfilePopup show={openProfile} close={() => setOpenProfile(false)} />}
        </EnforceAuth>
      </Page>
    </>
  )
}

export default Home
