import { User } from '@prisma/client'
import dayjs from 'dayjs'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Page from '~/components/layout/page'
import { EnforceAuth } from '~/components/misc/enforceAuth'
import ElectionCards from '~/components/pages/app/election/electionCards'
import VotesNscores from '~/components/pages/app/election/popups/votesNscores'
import StewardElection from '~/components/pages/app/election/stewardElection'
import ProfilePopup from '~/components/pages/app/steward/profilePopup'
import duration from 'dayjs/plugin/duration'
import { StewardUnit as unit, TotalCycleTime, ApplicationTime, VotingTime } from '~/utils/stewardsConfig'

dayjs.extend(duration)

const Election = () => {
  const [openProfile, setOpenProfile] = useState<User | undefined>(undefined)
  const { data: siwe } = useSession()
  const [openVotesNscores, setOpenVotesNscores] = useState(false)

  const [state, setState] = useState<'Application' | 'Voting' | undefined>(undefined)
  const [timeUntilNextState, setTimeUntilNextState] = useState<duration.Duration>(dayjs.duration(100, 'second'))

  const updateCountdown = () => {
    const now = dayjs()

    // Calculate the number of months since a known start point.
    // Here I'll assume the start point was the first month of the current year. Adjust if needed.
    const sinceStart = now.diff(dayjs().startOf('year'), unit)

    // Calculate the current month in the cycle
    const cycle = sinceStart % TotalCycleTime.as(unit)

    let _timeUntilNextState = dayjs.duration(0, unit)
    if (cycle < ApplicationTime.as(unit)) {
      setState('Application')
      _timeUntilNextState = ApplicationTime.subtract(cycle, unit)
    } else {
      setState('Voting')
      _timeUntilNextState = VotingTime.subtract(cycle - ApplicationTime.as(unit), unit)
    }

    setTimeUntilNextState(_timeUntilNextState)
  }

  useEffect(() => {
    const i = setInterval(() => updateCountdown(), 2000)
    return () => clearInterval(i)
  }, [])

  return (
    <>
      <Page>
        <StewardElection state={state} timeUntilNextState={timeUntilNextState} />

        <EnforceAuth>
          {state === 'Voting' && <ElectionCards setOpenProfile={setOpenProfile} setOpenVotesNscores={setOpenVotesNscores} />}

          {openProfile && <ProfilePopup profile={openProfile} close={() => setOpenProfile(undefined)} />}

          {openVotesNscores && <VotesNscores show={openVotesNscores} close={() => setOpenVotesNscores(false)} />}
        </EnforceAuth>
      </Page>
    </>
  )
}

export default Election
