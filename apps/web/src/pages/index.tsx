import { type NextPage } from 'next'

import Page from '~/components/layout/page'
import MailingListComponent from '~/components/misc/mailinglist'

import {
  HomeCommunityComponent,
  HomeCTAComponent,
  HomeFindYourPlace,
  HomeGetInvolvedComponent,
  HomeIntroComponent,
  HomeObjectivesComponent,
  HomePartnersComponent,
  HomeRegenerativeAgri,
  HomeWelcomeComponent,
  OurPartners,
  RegeratedWorld,
  WaysToSupportVDAO,
} from '~/components/pages/home'
import { useUserReads } from '~/hooks/web3/useUser'

const Home: NextPage = () => {
  return (
    <>
      <Page web2>
        <HomeWelcomeComponent />

        <HomeIntroComponent />

        <HomeRegenerativeAgri />

        <HomeFindYourPlace />

        <HomeObjectivesComponent />

        <OurPartners />

        <HomeGetInvolvedComponent />

        <WaysToSupportVDAO />

        <RegeratedWorld />

        <HomeCommunityComponent />

        <HomePartnersComponent />

        <HomeCTAComponent />

        <MailingListComponent />
      </Page>
    </>
  )
}

export default Home
