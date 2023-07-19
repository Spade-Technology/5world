import { type NextPage } from 'next'
import { useState } from 'react'

import Page from '~/components/layout/page'
import { Section } from '~/components/layout/section'
import { EnforceAuth } from '~/components/misc/enforceAuth'
import EditProfile from '~/components/pages/app/home/editProfile'
import ProfilePopup from '~/components/pages/app/home/profilePopup'
import { NewMembersComponent, ProfileHomeComponent, SelfDelegate, StatisticsHomeComponent, WelcomeComponent } from '~/components/pages/app/home/web3home'
import { useUserRead } from '~/hooks/web3/useUser'
import { Address } from 'viem'
import { useAccount } from 'wagmi'

const Home: NextPage = () => {
  const { address } = useAccount()
  const [openProfile, setOpenProfile] = useState(false)
  const [newMembersArr, setNewMembersArr] = useState<any>([])
  const [editProfile, setEditProfile] = useState(false)

  const { data, refetch } = useUserRead({
    address: address as Address,
    include: {
      podsAsAdmin: true,
      podsAsMember: true,
      proposals: true,
      guild: true,
      stewardVotesAsCandidate: true,
      stewardVotesAsVoter: true,
    },
  })

  return (
    <>
      <Page>
        <SelfDelegate data={data} />
        <WelcomeComponent />

        <EnforceAuth>
          <div className='mx-auto  flex w-fit'>
            <Section className='mx-6 grid justify-between gap-5 md:grid-cols-12 lg:max-w-[1280px]'>
              <ProfileHomeComponent setOpenProfile={setOpenProfile} setNewMembersArr={setNewMembersArr} data={data} />

              <NewMembersComponent newMembersArr={newMembersArr} />

              <StatisticsHomeComponent />
            </Section>
          </div>
          <ProfilePopup show={openProfile} close={() => setOpenProfile(false)} setEditProfile={setEditProfile} />
          {editProfile && <EditProfile show={editProfile} close={() => setEditProfile(false)} setOpenProfile={setOpenProfile} refetch={refetch} />}
        </EnforceAuth>
      </Page>
    </>
  )
}

export default Home
