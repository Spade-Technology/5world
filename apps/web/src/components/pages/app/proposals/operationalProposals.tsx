import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useState } from 'react'
import { Section } from '~/components/layout/section'
import Description from '~/components/misc/description'
import HowItWorks from '~/components/misc/howItWorks'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'
import PolygonIcon from 'public/icons/stewards/polygon.svg'


type Props = {
  setOpenCreateProposal: Dispatch<SetStateAction<boolean>>
}

const OperationalProposals = ({ setOpenCreateProposal }: Props) => {
  const router = useRouter()
  const { data: siwe } = useSession()
  const [dropDownOn, setDropDownOn] = useState(false)

  return (
    <Section className='w-screen  bg-vdao-deep'>
      <Description
        propsClass={'!max-w-[1109px] !md:gap-5'}
        invertColors={true}
        title={
          <div className='w-[342px] font-heading text-[44px] font-medium leading-[48px] text-vdao-light md:w-[400px] md:text-[60px] md:leading-[60px] lg:w-[553px] lg:text-[80px] lg:leading-[95px]'>
            Operational Proposals{' '}
          </div>
        }
        description={
          <div className='w-full font-body text-[26px] font-medium leading-[30px] md:w-full md:max-w-[557px]'>
            This page contains all formal on-chain proposals within the DAO, both active and inactive. Proposals are created by DAO stewards once a proposal received enough off-chain support in the
            discussion forum.
          </div>
        }
      />

      <div className='mx-auto mt-[30px] flex max-w-[1130px] flex-1 flex-col justify-end gap-5 px-6 md:mt-0 md:flex-row'>
        <div>
          <PrimaryButton
            text='Create Proposal'
            // onClick={() => (siwe ? setOpenCreateProposal(true) : router.push('/app/proposals/#restrictedContent'))}
            onClick={() => (siwe ? setDropDownOn(!dropDownOn) : router.push('/app/proposals/#restrictedContent'))}
            className='py-[5px] px-[35px] text-xl'
            icon={PolygonIcon}
            dropDown
          />
          {dropDownOn && (
            <div className='float-right mx-auto mt-1 flex w-full  max-w-[1130px] flex-col justify-end gap-[1px]'>
              <PrimaryButton
                text='Normal Proposal'
                className='hover:bg-green-200 w-full'
                onClick={() => {
                  setOpenCreateProposal(true)
                  setDropDownOn(false)
                }}
              />
              <PrimaryButton text='Grant Proposal' className='w-full hover:bg-green-200' />
            </div>
          )}
        </div>
        <div className='h-fit w-fit  cursor-pointer rounded-[5px] border-2 border-white py-[5px] px-[35px] text-xl text-white'>
          <Link href={siwe ? '/app/proposals/#allProposals' : '/app/proposals/#restrictedContent'}>See All Proposals</Link>
        </div>
      </div>

      <HowItWorks
        contents={[
          {
            heading: 'On-Chain Voting',
            content:
              'Any Core Member is able to cast their vote themselves or delegate their voting power to a Steward. To support the DAO’s mission of generating a broad, collective intelligence, all members of the DAO are encouraged to actively participate in the voting process via direct votes or delegation.',
          },
          {
            heading: 'Quorum',
            content:
              'In order for a proposal to succeed in the on-chain voting phase, a minimum of 25% of the total number of DAO members must vote in favour of the vote. If the 25% quorum requirement is not met, the vote is not valid. It is the proposal creator’s responsibility to ensure they have solicited enough community support for the proposal to meet this minimum threshold.',
          },
          {
            heading: 'Quota',
            content: 'For a vote to move from the on-chain voting phase to the proposal enactment phase, 75% of the total votes cast must vote in favour of the proposal.',
          },
          {
            heading: 'Proposal Enactment',
            content: (
              <div>
                When the proposal is created on chain, there is a 7 day cooling off period for the DAO community to review the upcoming vote. During this period, the DAO Guardians can veto any
                proposal which does not align with the DAOs core vision or mission.
                <br />
                <br />
                The minimum time required for a vote to progress from on-chain voting to full enactment is 14 days. The standard process time is 23 days.
              </div>
            ),
          },
        ]}
        className='md:pb-[140px]'
      />
    </Section>
  )
}

export default OperationalProposals
