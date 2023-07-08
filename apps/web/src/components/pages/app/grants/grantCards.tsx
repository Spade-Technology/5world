import Image from 'next/image'
import ProfileCard from '~/components/misc/profileCard'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'
import WhiteButton from '~/styles/shared/buttons/whiteButton'
import { CardDetails } from './cardDetails'
import { Dispatch, SetStateAction } from 'react'
import grantImage from 'public/illustrations/grants/image5.svg'

type CardProps = {
  details: any
  setViewDetails: Dispatch<SetStateAction<boolean>>
}

type Props = {
  setViewDetails: Dispatch<SetStateAction<boolean>>
}

const GrantCards = ({ setViewDetails }: Props) => {
  return (
    <div className='mx-auto w-screen max-w-[1140px] bg-vdao-deep'>
      <div className='mx-auto max-w-[1280px] pb-[120px] font-body'>
        <CurrentRound />

        <div id='currentGrants' className='mx-6 mt-20 flex max-w-[1280px] justify-between font-heading text-[32px] font-medium text-vdao-light md:mx-auto md:text-[46px]'>
          <div>Current Grants</div>
          <div className='text-white underline underline-offset-4 opacity-75'>Past Rounds</div>
        </div>
        <div className='font-heading text-xl font-medium text-vdao-light'>your available voting power: 123M</div>
        <div className='mx-6 mt-5 grid grid-cols-1 gap-5 md:mx-0 md:grid-cols-2'>
          {CardDetails &&
            CardDetails.map((details, idx) => {
              return <Card details={details} setViewDetails={setViewDetails} />
            })}
        </div>
      </div>
    </div>
  )
}

export const CurrentRound = () => {
  return (
    <div className=' w-full rounded-[40px] bg-vdao-dark pl-10 pt-10 pr-5 text-white'>
      <div className='flex gap-3 font-heading text-3xl font-medium'>
        Current Round: 100K for Soil Research
        <div className='my-auto rounded-[20px] border-[1px] border-vdao-light px-9 py-1 font-body text-lg text-vdao-light'> Active </div>
      </div>

      <div className='flex justify-between'>
        <div className='mt-5'>
          <div className='font-heading text-[26px] font-medium text-vdao-light'>Rules</div>
          <div className='mt-5 text-lg font-normal '>
            This page contains details of the projects which have been selected to receive grants from the DAO following the application phase. DAO funding received by each proposal is proportionate
            to the number of votes received from within the community.
            <br />
            <br />
            DAO following the application phase. DAO funding received by each
          </div>

          <div className='mt-5 text-lg font-bold underline underline-offset-2'>View all rounds</div>
        </div>
        <Image src={grantImage} alt='grantImage' />
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

export default GrantCards
