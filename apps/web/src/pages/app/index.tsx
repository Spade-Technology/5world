import { type NextPage } from 'next'
import { useState } from 'react'

import Page from '~/components/layout/page'
import { Section } from '~/components/layout/section'
import ProfilePopup from '~/components/pages/app/home/profilePopup'
import {
  NewMembersComponent,
  ProfileHomeComponent,
  StatisticsHomeComponent,
  WelcomeComponent,
} from '~/components/pages/app/home/web3home'

const Home: NextPage = () => {
  const [openProfile, setOpenProfile] = useState(false)

  return (
    <>
      <Page>
        <WelcomeComponent />

        <div className='mx-auto  flex w-fit'>
          <Section className='mx-6 grid grid-cols-12 justify-between gap-5 lg:max-w-[1280px]'>
            <ProfileHomeComponent setOpenProfile={setOpenProfile} />

            <NewMembersComponent />

            <StatisticsHomeComponent />
          </Section>
        </div>
        {openProfile && <ProfilePopup show={openProfile} close={() => setOpenProfile(false)} />}
      </Page>
    </>
  )
}

export default Home
