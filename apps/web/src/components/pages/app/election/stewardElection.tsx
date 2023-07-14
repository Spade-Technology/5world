import { Button } from 'antd'
import { setDay } from 'date-fns'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Section } from '~/components/layout/section'
import Description from '~/components/misc/description'
import HowItWorks from '~/components/misc/howItWorks'
import { useApplyToBeSteward } from '~/hooks/web3/useStewards'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'
import { monthNames } from '~/utils/date'

const StewardElection = () => {
  const { applyToBeSteward, isLoading } = useApplyToBeSteward()
  const { data: siwe } = useSession()
  const [days, setDays] = useState<Number[]>([0, 0])
  const [hours, setHours] = useState<Number[]>([0, 0])
  const [minutes, setMinutes] = useState<Number[]>([0, 0])

  let minutesForDev = 0
  const timerForDevEnv = () => {
    if (minutesForDev > 5) {
      return
    } else {
      const remainingMinutes = 5 - minutesForDev
      const remainingMinutesToString = remainingMinutes.toString()
      let minutesInArr: Number[] = []

      for (let i = 0; i < remainingMinutesToString.length; i++) {
        if (remainingMinutesToString.length === 1) {
          minutesInArr.push(0)
        }
        minutesInArr.push(parseFloat(remainingMinutesToString?.charAt(i)!))
      }
      setDays([0, 0])
      setHours([0, 0])
      setMinutes(minutesInArr)

      minutesForDev = minutesForDev + 1
    }
  }
  const dateHandler = (devEnv?: boolean) => {
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()
    const hours = currentDate.getHours()
    const todayDate = currentDate.getDate()
    const minutes = currentDate.getMinutes()

    if (devEnv) {
      let minutesForDev = 0
      const timerInterval = 3 * 1000
      const interval = setInterval(() => {
        timerForDevEnv()
      }, timerInterval)

      if (minutesForDev >= 5) {
        clearInterval(interval)
      }
    } else {
      let daysInArr: Number[] = []
      let hoursInArr: Number[] = []
      let minutesInArr: Number[] = []
      const remainigHours = 24 - hours
      const remainingMinutes = 60 - minutes

      const remainigHoursToString = remainigHours.toString()
      const remainingMinutesToString = remainingMinutes.toString()

      for (let i = 0; i < remainigHoursToString.length; i++) {
        if (remainigHoursToString.length === 1) {
          hoursInArr.push(0)
        }
        hoursInArr.push(parseFloat(remainigHoursToString?.charAt(i)!))
      }

      for (let i = 0; i < remainingMinutesToString.length; i++) {
        if (remainingMinutesToString.length === 1) {
          minutesInArr.push(0)
        }
        minutesInArr.push(parseFloat(remainingMinutesToString?.charAt(i)!))
      }

      setHours(hoursInArr)
      setMinutes(minutesInArr)

      if (currentMonth % 6 === 0) {
        // Time for Election
        const remainigdays = monthNames[currentDate.getUTCMonth()]?.days! - todayDate
        const remainigdaysToString = remainigdays.toString()

        for (let i = 0; i < remainigdaysToString.length; i++) {
          daysInArr.push(parseFloat(remainigdaysToString?.charAt(i)!))
        }

        setDays(daysInArr)
      } else {
        // Time for No Election
        let totalDaysLeft = 0
        for (let i = 0; i < monthNames.length; i++) {
          if ((i + 1) % currentMonth === 0) {
            break
          } else if (i + 1 + 1 > currentMonth) {
            totalDaysLeft = totalDaysLeft + monthNames[i]?.days
          }
        }

        const remainigDays = totalDaysLeft > todayDate ? totalDaysLeft - todayDate : '00'

        const remainigdaysToString = remainigDays.toString()

        for (let i = 0; i < remainigdaysToString.length; i++) {
          if (remainigdaysToString.length === 1) {
            daysInArr.push(0)
          }
          daysInArr.push(parseFloat(remainigdaysToString?.charAt(i)!))
        }
        setDays(daysInArr)
      }
    }
  }

  useEffect(() => {
    const intervalTime = 1 * 10 * 1000
    dateHandler()
    setInterval(() => {
      dateHandler()
    }, intervalTime)
  }, [])

  return (
    <Section className='w-screen bg-vdao-deep'>
      <Description
        invertColors={true}
        title={
          <div>
            Steward
            <br />
            Election
          </div>
        }
        description={
          <div className='font-body text-[26px] font-medium'>
            This page displays all the members who have put themselves forward to be Stewards for the next term, along with a link to their Steward Profile page.
          </div>
        }
      />

      {/* <div className='mx-auto flex w-full max-w-7xl items-end justify-end'>
        <Button
          type='primary'
          loading={isLoading}
          disabled={!siwe}
          className='mt-[50px] mb-[100px] h-[50px] w-[200px] rounded-[25px] border-none text-[16px] font-bold !text-black disabled:!bg-vdao-light disabled:opacity-80'
          onClick={() => applyToBeSteward()}
        >
          Apply to be a Steward
        </Button>
      </div> */}

      <div className='mx-auto mt-5 max-w-[306px] rounded-2xl bg-vdao-dark p-6 text-center text-white'>
        <div className='font-mediums font-body text-[22px] '>Before the next election</div>

        <div className='mt-2 flex justify-between font-bold text-vdao-light'>
          <div>
            <div className='flex gap-1'>
              {days.map((number: string, idx: number) => {
                return (
                  <div key={idx} className='rounded-[10px] bg-[#19444A] p-1 text-[32px]'>
                    {number}
                  </div>
                )
              })}
            </div>
            <div className='text-left text-lg'>days</div>
          </div>
          <div className='p-1 text-[32px]'>:</div>
          <div>
            <div className='flex gap-1'>
              {hours.map((number: string, idx: number) => {
                return (
                  <div key={idx} className='rounded-[10px] bg-[#19444A] p-1 text-[32px]'>
                    {number}
                  </div>
                )
              })}
            </div>
            <div className='text-left text-lg'>hours</div>
          </div>
          <div className='p-1 text-[32px]'>:</div>
          <div>
            <div className='flex gap-1'>
              {minutes.map((number: string, idx: number) => {
                return (
                  <div key={idx} className='rounded-[10px] bg-[#19444A] p-1 text-[32px]'>
                    {number}
                  </div>
                )
              })}
            </div>
            <div className='text-left text-lg'>minutes</div>
          </div>
        </div>

        <div className='mt-5 w-full max-w-[258px] cursor-pointer rounded-md border-none bg-vdao-light py-1 px-5 font-heading text-xl !text-black' onClick={() => applyToBeSteward()}>
          Apply to be a Steward
        </div>

        <div className='py-5 text-lg font-light'>OR</div>

        <div className='px-4 text-lg font-light'>Next Stewards anounced in X Days, X Hours, X minutes</div>
      </div>

      <HowItWorks
        contents={[
          {
            heading: ['How it works'],
            content: (
              <div>
                To support a Steward, connect your wallet, enter the number of votes you wish to give then, and click vote.
                <br />
                <br />
                Steward permissions will be grantaed automatically at the end of the Grands round based on the 6 Stewards who got the most votes.
              </div>
            ),
          },
        ]}
        className='md:pb-[140px]'
      />
    </Section>
  )
}

export default StewardElection
