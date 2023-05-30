import Image from 'next/image'
import ProfileCard from '~/components/misc/profileCard'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'
import WhiteButton from '~/styles/shared/buttons/whiteButton'
import { CardDetails } from './cardDetails'
import { Dispatch, SetStateAction } from 'react'

type CardProps = {
  details: any
  setViewDetails: Dispatch<SetStateAction<boolean>>
}

type Props = {
  setViewDetails: Dispatch<SetStateAction<boolean>>
}

const GrantCards = ({ setViewDetails }: Props) => {
  return (
    <div className='mx-auto w-screen bg-vdao-deep'>
      <div className='mx-auto max-w-[1280px] pb-[120px]'>
        <div
          id='currentGrants'
          className='mx-6 max-w-[1280px] font-heading text-[32px] font-medium text-vdao-light md:mx-auto md:text-[46px]'
        >
          Current Grants
        </div>

        <div className='mx-6 mt-11 grid grid-cols-1 gap-5 md:mx-0 md:grid-cols-2'>
          {CardDetails &&
            CardDetails.map((details, idx) => {
              return <Card details={details} setViewDetails={setViewDetails} />
            })}
        </div>
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

        <PrimaryButton
          text='View Detail'
          className='mt-[30px] py-[5px] px-[35px] text-xl font-medium'
          onClick={() => setViewDetails(true)}
        />

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
