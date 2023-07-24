import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'
import ProfileCard from '~/components/misc/profileCard'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'
import WhiteButton from '~/styles/shared/buttons/whiteButton'
import { CurrentRound } from './grantSearch'
import { api } from '~/utils/api'
import { useRouter } from 'next/router'

type CardProps = {
  details: any
  setViewDetails: Dispatch<SetStateAction<boolean>>
}

type Props = {
  setViewDetails: Dispatch<SetStateAction<boolean>>
  grant: any
  votingPowerEnabled: boolean
  votingPower: any
}

type GrantProps = {
  grant: any
}

const GrantItem = ({ setViewDetails, grant, votingPowerEnabled, votingPower }: Props) => {
  const router = useRouter()

  return (
    <div className='mx-auto w-screen max-w-[1140px] bg-vdao-deep'>
      <div className='mx-auto max-w-[1280px] pb-[120px] font-body'>
        {grant && <CurrentRound grant={grant} />}

        {grant && (
          <div>
            <div id='currentGrants' className='mx-6 mt-20 flex max-w-[1280px] justify-between font-heading text-[32px] font-medium text-vdao-light md:mx-auto md:text-[46px]'>
              <div>Current Grants</div>
              <div className='cursor-pointer text-white underline underline-offset-4 opacity-75' onClick={() => router.push('/app/grants')}>
                Past Rounds
              </div>
            </div>
            {votingPowerEnabled && <div className='font-heading text-xl font-medium text-vdao-light'>your available voting power: {votingPower}</div>}
            <div className='mx-6 mt-5 grid grid-cols-1 gap-5 md:mx-0 md:grid-cols-2'>
              {grant?.requests && grant?.requests.length > 0 ? (
                grant?.requests?.map((details: any, idx: number) => {
                  return <Card details={details} setViewDetails={setViewDetails} key={idx} />
                })
              ) : (
                <div className='w-full text-center text-xl font-medium text-vdao-light md:col-span-2'>No requests</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export const Card = ({ details, setViewDetails }: CardProps) => {
  return (
    <div className='rounded-[20px] bg-white'>
      <Image src={details.image} width={700} alt='image' />
      <div className='px-[50px] py-10'>
        <div className='font-heading text-[30px] font-medium'>{details.title}</div>

        <div className='flex justify-between'>
          <div>
            <ProfileCard />
          </div>

          <div className='my-auto text-lg font-bold'>Last Update: {details.lastUpdated}</div>
        </div>

        <div className='pt-[30px] text-lg font-normal'>{details.description}</div>

        <PrimaryButton text='View Detail' className='mt-[30px] py-[5px] px-[35px] text-xl font-medium' onClick={() => setViewDetails(true)} />

        <div className='pt-11 text-xl font-medium'>Delegate your vote</div>

        <div className='flex gap-[10px] pt-[18px] pb-[14px]'>
          <WhiteButton text='60' className='border-[1px] border-vdao-dark py-[5px] font-heading text-xl' />

          <PrimaryButton text='Vote' className='py-[5px] font-heading text-xl' />
        </div>
      </div>
    </div>
  )
}

export default GrantItem
