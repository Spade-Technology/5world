import { notification } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Section } from '~/components/layout/section'
import Description from '~/components/misc/description'
import HowItWorks from '~/components/misc/howItWorks'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'
import { api } from '~/utils/api'

type Props = {
  setCreateGrant: Dispatch<SetStateAction<boolean>>
  grant?: any
}

const GrantsRound = ({ setCreateGrant, grant }: Props) => {
  const router = useRouter()
  const [disableBtn, setDisableBtn] = useState(false)

  return (
    <Section className='w-screen bg-vdao-deep'>
      <Description
        invertColors={true}
        title={
          <div>
            Grants
            <br />
            Round
          </div>
        }
        description={
          <div className='font-body text-[26px] font-medium'>
            Project funding decisions are made via a novel voting system known as <span className='font-body text-[26px] font-medium underline underline-offset-4'>quadratic voting</span> This method
            has been described as an ‘<span className='font-body text-[26px] font-medium underline underline-offset-4'>optimal kickstarter</span>
            ’, due to the way in which it channels funds to the projects with the highest levels of collective DAO member support.
          </div>
        }
      />

      <div className='flex flex-col md:flex-row '>
        <div className='flex-1'></div>
        <div className='mt-[30px] flex flex-1 flex-col gap-5 pl-6 md:mt-0 md:flex-row md:pl-16'>
          <PrimaryButton
            text={grant ? 'Request' : 'Create Grant'}
            onClick={() => (grant ? (grant.state === 1n ? setCreateGrant(true) : notification.info({ message: 'Grant applications are closed' })) : setCreateGrant(true))}
            className='py-[5px] px-[35px] text-xl'
          />
          {grant && (
            <div className='w-fit  cursor-pointer rounded-[5px] border-2 border-white py-[5px] px-[35px] text-xl text-white'>
              <Link href={'/app/grants/'}>See All Grants</Link>
            </div>
          )}
        </div>
      </div>

      <HowItWorks
        contents={[
          {
            heading: ['How it works'],
            content: (
              <div>
                This page contains details of the projects which have been selected to receive grants from the DAO following the application phase. DAO funding received by each proposal is
                proportionate to the number of votes received from within the community.
                <br />
                <br />
                To support a proposal, connect your wallet, enter the number of votes you wish to give the project, and click vote. Funds will be distributed automatically at the end of the Grands
                round.
              </div>
            ),
          },
        ]}
        className='md:pb-[140px]'
      />
    </Section>
  )
}

export default GrantsRound
