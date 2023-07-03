import { Button } from 'antd'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { Section } from '~/components/layout/section'
import Description from '~/components/misc/description'
import HowItWorks from '~/components/misc/howItWorks'
import { useApplyToBeSteward } from '~/hooks/web3/useStewards'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'

const StewardElection = () => {
  const { applyToBeSteward, isLoading } = useApplyToBeSteward()
  const { data: siwe } = useSession()
  const [days, setDays] = useState(['2', '2'])
  const [hours, setHours] = useState(['2', '2'])
  const [minutes, setMinutes] = useState(['2', '2'])

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
            <div className='text-lg text-left'>days</div>
          </div>
          <div className='p-1 text-[32px]'>:</div>
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
            <div className='text-lg text-left'>hours</div>
          </div>
          <div className='p-1 text-[32px]'>:</div>
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
            <div className='text-lg text-left'>minutes</div>
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
