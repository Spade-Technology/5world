import { useSession } from 'next-auth/react'
import Footer from '~/components/layout/footer'
import Header from '~/components/layout/header'
import Page from '~/components/layout/page'
import LoginPromptComponent, { EnforceAuth } from '~/components/misc/enforceAuth'
import ElectionCards from '~/components/pages/app/election/electionCards'
import StewardElection from '~/components/pages/app/election/stewardElection'

const Election = () => {
  const { data: siwe } = useSession()

  return (
    <>
      <Page>
        <StewardElection />

        <EnforceAuth>
          <ElectionCards />
        </EnforceAuth>
      </Page>
    </>
  )
}

export default Election
