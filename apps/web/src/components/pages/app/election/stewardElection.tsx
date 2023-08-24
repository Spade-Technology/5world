import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { Section } from '~/components/layout/section'
import Description from '~/components/misc/description'
import HowItWorks from '~/components/misc/howItWorks'
import { useApplyToBeSteward } from '~/hooks/web3/useStewards'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
dayjs.extend(duration)

const StewardElection = ({ state, timeUntilNextState }: { state: 'Application' | 'Voting' | undefined; timeUntilNextState: duration.Duration }) => {
  const { applyToBeSteward, isLoading } = useApplyToBeSteward()

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

      <div className='px-6 md:px-0'>
        <div className='mx-auto mt-[60px] w-fit rounded-2xl bg-vdao-dark px-10 py-6 text-center font-body text-white md:mt-10 md:p-6'>
          <div className='text-[22px] font-medium leading-[30px] '>{state === 'Application' ? 'Before the election starts' : 'Elections have started !'}</div>

          {state === 'Application' ? (
            <div className='mt-[13px] flex justify-center font-bold text-vdao-light md:justify-between'>
              <div>
                <div className='flex gap-1'>
                  {timeUntilNextState
                    .days()
                    .toString()
                    .padStart(2, '0')
                    .match(/.{1,1}/g)
                    ?.map((digit, idx) => (
                      <div className='rounded-[10px] bg-[#19444A] py-4 px-2 text-[32px]' key={idx}>
                        {digit}
                      </div>
                    ))}
                </div>
                <div className='text-left text-lg'>days</div>
              </div>
              <div className='p-1 text-[32px]'>:</div>
              <div>
                <div className='flex gap-1'>
                  {timeUntilNextState
                    .hours()
                    .toString()
                    .padStart(2, '0')
                    .match(/.{1,1}/g)
                    ?.map((digit, idx) => (
                      <div className='rounded-[10px] bg-[#19444A] py-4 px-2 text-[32px]' key={idx}>
                        {digit}
                      </div>
                    ))}
                </div>
                <div className='text-left text-lg'>hours</div>
              </div>
              <div className='p-1 text-[32px]'>:</div>
              <div>
                <div className='flex gap-1'>
                  {timeUntilNextState
                    .minutes()
                    .toString()
                    .padStart(2, '0')
                    .match(/.{1,1}/g)
                    ?.map((digit, idx) => (
                      <div className='rounded-[10px] bg-[#19444A] py-4 px-2 text-[32px]' key={idx}>
                        {digit}
                      </div>
                    ))}
                </div>
                <div className='text-left text-lg'>minutes</div>
              </div>
            </div>
          ) : (
            <div className='mt-[13px] flex justify-center font-bold text-vdao-light md:justify-between'>Please vote for your favourite candidates, they will be the next stewards !</div>
          )}

          <PrimaryButton
            text={isLoading ? 'Applying to Steward' : 'Apply to be a Steward'}
            loading={isLoading}
            disabled={state === 'Application'}
            spanClass='md:!px-5'
            className='mx-auto mt-10 md:!w-fit'
            onClick={() => applyToBeSteward()}
          />

          {state === 'Application' && <div className='pt-4 font-body text-lg font-normal md:pt-[21px]'>OR</div>}

          <div className='mx-auto max-w-[231px] px-4 pt-4 font-body text-lg font-normal leading-[22px]'>
            {state === 'Application' ? 'Applications starts in ' : 'Application deadline is in '} {timeUntilNextState.humanize()}
          </div>
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
        className='md:pb-[140px]'
      />
    </Section>
  )
}

export default StewardElection
