import { type NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

import Page from '~/components/layout/page'
import { Section } from '~/components/layout/section'
import LoginPromptComponent, { EnforceAuth } from '~/components/misc/enforceAuth'
import EditProfile from '~/components/pages/app/home/editProfile'
import ProfilePopup from '~/components/pages/app/home/profilePopup'
import { NewMembersComponent, ProfileHomeComponent, SelfDelegate, StatisticsHomeComponent, WelcomeComponent } from '~/components/pages/app/home/web3home'

const Home: NextPage = () => {
  const [openProfile, setOpenProfile] = useState(false)
  const [newMembersArr, setNewMembersArr] = useState<any>([])
  const [editProfile, setEditProfile] = useState(false)

  return (
    <>
      <Page>
        <SelfDelegate />
        <WelcomeComponent />

        <EnforceAuth>
          <div className='mx-auto  flex w-fit'>
            <Section className='mx-6 grid justify-between gap-5 md:grid-cols-12 lg:max-w-[1280px]'>
              <ProfileHomeComponent setOpenProfile={setOpenProfile} setNewMembersArr={setNewMembersArr} />

              <NewMembersComponent newMembersArr={newMembersArr} />

              <StatisticsHomeComponent />
            </Section>
          </div>
          {openProfile && <ProfilePopup show={openProfile} close={() => setOpenProfile(false)} setEditProfile={setEditProfile} />}
          {editProfile && <EditProfile show={editProfile} close={() => setEditProfile(false)} setOpenProfile={setOpenProfile} />}
        </EnforceAuth>
      </Page>
    </>
  )
}

export default Home
