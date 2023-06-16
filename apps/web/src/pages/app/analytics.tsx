// import { type NextPage } from "next";

import Footer from '~/components/layout/footer'
import Header from '~/components/layout/header'
import Page from '~/components/layout/page'
import { Section } from '~/components/layout/section'
import { MembershipComponent, ProposalComponent, TitleComponent } from '~/components/pages/app/analytics/analytics'

const Analytics = () => {
  return (
    <>
      <Page>
        <div className='bg-vdao-deep px-6 md:px-0'>
          <Section className='mx-auto lg:max-w-[1280px]'>
            <TitleComponent />

            <MembershipComponent />

            <ProposalComponent />
          </Section>
        </div>
      </Page>
    </>
  )
}

export default Analytics
