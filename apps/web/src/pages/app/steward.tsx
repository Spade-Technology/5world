import { useState } from 'react'
import Footer from '~/components/layout/footer'
import Header from '~/components/layout/header'
import Page from '~/components/layout/page'
import ProfilePopup from '~/components/pages/app/steward/profilePopup'
import StewardCards from '~/components/pages/app/steward/stewardCards'
import StewardProfile from '~/components/pages/app/steward/stewardProfile'

const Steward = () => {
  const [openProfile, setOpenProfile] = useState(undefined)

  return (
    <>
      <Page>
        <StewardProfile />

        <StewardCards setOpenProfile={setOpenProfile} />

        {openProfile && <ProfilePopup show={openProfile} close={() => setOpenProfile(false)} />}
      </Page>
    </>
  )
}

export default Steward
