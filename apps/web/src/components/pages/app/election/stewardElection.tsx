import { Button } from 'antd'
import { Section } from '~/components/layout/section'
import Description from '~/components/misc/description'
import HowItWorks from '~/components/misc/howItWorks'
import { useApplyToBeSteward } from '~/hooks/web3/useStewards'

const StewardElection = () => {
  const { applyToBeSteward, isLoading } = useApplyToBeSteward()

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
            This page displays all the members who have put themselves forward to be Stewards for the next term, along
            with a link to their Steward Profile page.
          </div>
        }
      />

      <div className='mx-auto flex w-full max-w-7xl items-end justify-end'>
        <Button
          type='primary'
          disabled={isLoading}
          className='bg-vdao-green mt-[50px] mb-[100px] h-[50px] w-[200px] rounded-[25px] border-none text-[16px] font-bold'
          onClick={() => applyToBeSteward()}
        >
          Apply to be a Steward
        </Button>
      </div>

      <HowItWorks
        contents={[
          {
            heading: ['How it works'],
            content: (
              <div>
                To support a Steward, connect your wallet, enter the number of votes you wish to give then, and click
                vote.
                <br />
                <br />
                Steward permissions will be grantaed automatically at the end of the Grands round based on the 6
                Stewards who got the most votes.
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
