import { type NextPage } from 'next'

import Footer from '~/components/layout/footer'
import Header from '~/components/layout/header'
import Page from '~/components/layout/page'
import MailingListComponent from '~/components/misc/mailinglist'

import { AboutUsComponent, AboutUsCoreTeamComponent, AboutUsCoreValueComponent, AboutUsVisionMissionComponent } from '~/components/pages/about'

const AboutUs: NextPage = () => {
  return (
    <>
      <Page web2>
        <AboutUsComponent />

        <AboutUsCoreValueComponent />

        <AboutUsVisionMissionComponent />

        <AboutUsCoreTeamComponent />

        <MailingListComponent />
      </Page>
    </>
  )
}

export default AboutUs
