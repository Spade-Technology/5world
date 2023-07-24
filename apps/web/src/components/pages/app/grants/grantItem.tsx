import Image from 'next/image'
import { Dispatch, SetStateAction, useState } from 'react'
import ProfileCard from '~/components/misc/profileCard'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'
import WhiteButton from '~/styles/shared/buttons/whiteButton'
import { CurrentRound } from './grantSearch'
import { api } from '~/utils/api'
import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'

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
  const [disableBtn, setDisableBtn] = useState(false)
  const [votes, setVotes] = useState('')
  const { address } = useAccount()

  const votesHandler = () => {
    const candidateAddress = ''
    if (votes && address && candidateAddress) {
    }
  }

  console.log(details)

  return (
    <div className='rounded-[20px] bg-white'>
      <Image src={details.image} height={300} width={700} alt='image' />
      <div className='px-[50px] py-10'>
        <div className='font-heading text-[30px] font-medium'>{details.title}</div>

        <div className='flex justify-between'>
          <div>
            <ProfileCard address={details.user.address} name={details.user.name} icon={details.user.picture} />
          </div>
          {details?.lastUpdated && <div className='my-auto text-lg font-bold'>Last Update: {new Date(details?.lastUpdated * 1000).toDateString()}</div>}

          <div className='my-auto text-lg font-bold'>Last Update: {details.lastUpdated}</div>
        </div>

        <div className='pt-[30px] text-lg font-normal'>{details.description}</div>

        <PrimaryButton text='View Detail' className='mt-[30px] py-[5px] px-[35px] text-xl font-medium' onClick={() => setViewDetails(true)} />

        <div className='pt-11 text-xl font-medium'>Delegate your vote</div>

        <div className='flex gap-[10px] pt-[18px] pb-[14px]'>
          <input
            placeholder='60'
            className='max-h-10 w-[82px] rounded-md border-[1px] border-vdao-dark px-2 text-center font-heading text-xl font-medium text-vdao-dark outline-none'
            value={votes}
            onChange={evt => setVotes(evt.target.value)}
          />

          <PrimaryButton text='Vote' disabled={disableBtn} className={`font-heading text-xl`} onClick={votesHandler} />
        </div>
      </div>
    </div>
  )
}

export default GrantItem
