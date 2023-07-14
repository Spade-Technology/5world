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
    <Section className='w-full bg-vdao-deep'>
      <Description
        invertColors={true}
        propsClass={'!max-w-[1055px] md:!gap-[27px]'}
        title={
          <div className='w-[342px] font-heading text-[44px] font-medium leading-[48px] text-vdao-light md:w-[400px] md:text-[60px] md:leading-[60px] lg:w-[553px] lg:text-[80px] lg:leading-[95px]'>
            Steward Election
          </div>
        }
        description={
          <div className='w-full font-body text-[26px] font-medium leading-[30px] md:w-full md:max-w-[557px]'>
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
      <div className='px-6 md:px-0'>
        <div className='mt-[60px] w-full rounded-2xl bg-vdao-dark px-10 py-6 text-center text-white md:mx-auto md:mt-10 md:max-w-[306px] md:p-6'>
          <div className='font-body text-[22px] font-medium leading-[30px] '>Before the next election</div>

          <div className='mt-[13px] flex justify-between font-bold text-vdao-light'>
            <div>
              <div className='flex gap-1'>
                {days.map((number: string, idx: number) => {
                  return (
                    <div key={idx} className='rounded-[10px] bg-[#19444A] py-4 px-2 text-[32px]'>
                      {number}
                    </div>
                  )
                })}
              </div>
              <div className='text-left font-body text-lg'>days</div>
            </div>
            <div className='p-1 text-[32px]'>:</div>
            <div>
              <div className='flex gap-1'>
                {days.map((number: string, idx: number) => {
                  return (
                    <div key={idx} className='rounded-[10px] bg-[#19444A] py-4 px-2 text-[32px]'>
                      {number}
                    </div>
                  )
                })}
              </div>
              <div className='text-left font-body text-lg'>hours</div>
            </div>
            <div className='p-1 text-[32px]'>:</div>
            <div>
              <div className='flex gap-1'>
                {days.map((number: string, idx: number) => {
                  return (
                    <div key={idx} className='rounded-[10px] bg-[#19444A] py-4 px-2 text-[32px]'>
                      {number}
                    </div>
                  )
                })}
              </div>
              <div className='text-left font-body text-lg'>minutes</div>
            </div>
          </div>
          <PrimaryButton text={'Apply to be a Steward'} spanClass='md:!px-5' className='mt-10 !w-full' onClick={() => applyToBeSteward()} />

          <div className='py-4 font-body text-lg font-normal md:pt-[21px]'>OR</div>

          <div className='px-4 font-body text-lg font-normal leading-[22px] '>Next Stewards anounced in X Days, X Hours, X minutes</div>
        </div>
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
        className='!pb-[64px] md:pb-[140px]'
      />
    </Section>
  )
}

export default StewardElection
