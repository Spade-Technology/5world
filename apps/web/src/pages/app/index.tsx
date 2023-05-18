import { type NextPage } from 'next'
import { useEffect, useState } from 'react'

import Page from '~/components/layout/page'
import { Section } from '~/components/layout/section'
import {
  NewMembersComponent,
  ProfileHomeComponent,
  StatisticsHomeComponent,
  WelcomeComponent,
} from '~/components/pages/web3home'

const Home: NextPage = () => {
  // const [refresh, setRefresh] = useState()
  // useEffect(() => {
  //   window.addEventListener('resize', () => {
  //     setRefresh({})
  //     window.location.reload()
  //     // alert('jj')
  //   })

  //   return () => {
  //     window.removeEventListener('resize', () => {
  //       setRefresh({})
  //     })
  //   }
  // }, [])

  return (
    <>
      <Page>
        <WelcomeComponent />

        <div className='mx-auto  flex w-fit'>
          <Section className='mx-5 grid w-full grid-cols-12 justify-between gap-5 lg:max-w-[1280px]'>
            <ProfileHomeComponent />
            <NewMembersComponent />

            <StatisticsHomeComponent />
          </Section>
        </div>
      </Page>
    </>
  )
}

export default Home
