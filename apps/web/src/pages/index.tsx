import { type NextPage } from 'next'

import Page from '~/components/layout/page'
import MailingListComponent from '~/components/misc/mailinglist'

import {
  HomeCommunityComponent,
  HomeCTAComponent,
  HomeGetInvolvedComponent,
  HomeIntroComponent,
  HomeObjectivesComponent,
  HomePartnersComponent,
  HomeWelcomeComponent,
} from '~/components/pages/home'
import { useUserReads } from '~/hooks/web3/useUser'

const Home: NextPage = () => {
  // this is not
  const { data } = useUserReads([], {})
  console.log(data)

  // this is illegal in react
  const fnc = async () => {
    const rtn = useUserReads([], {})
  }

  return (
    <>
      <Page web2>
        <HomeWelcomeComponent />

        <HomeIntroComponent />

        <HomeObjectivesComponent />

        <HomeGetInvolvedComponent />

        <HomeCommunityComponent />

        <HomePartnersComponent />

        <HomeCTAComponent />

        <MailingListComponent />
      </Page>
    </>
  )
}

export default Home
