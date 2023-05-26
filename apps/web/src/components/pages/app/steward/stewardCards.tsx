import { Pod } from '@prisma/client'
import Image from 'next/image'
import ProfilePic from 'public/icons/blog/createdByLogo.svg'
import { Dispatch, SetStateAction } from 'react'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'

type Props = {
  setOpenProfile: Dispatch<SetStateAction<boolean>>
  data: (Pod & {})[] | undefined
  setSid: Dispatch<SetStateAction<number>>
}

type CardProps = {
  setOpenProfile: Dispatch<SetStateAction<boolean>>
  data: (Pod & {})[] | undefined
  pod: Pod
  setSid: Dispatch<SetStateAction<number>>
}

const StewardCards = ({ setOpenProfile, data, setSid }: Props) => {
  return (
    <div className='mx-auto w-screen bg-vdao-deep'>
      <div className='mx-auto max-w-[1280px] pb-[120px]'>
        <div className='mx-6 max-w-[1280px] font-heading text-[32px] font-medium text-vdao-light md:mx-auto md:text-[46px]'>
          Current Stewards
        </div>

        <div className='mx-6 mt-5 grid grid-cols-1 gap-5 md:mx-0 md:grid-cols-2'>
          {data && data.length > 0 ? (
            data?.map((pod, idx) => {
              return <Card setOpenProfile={setOpenProfile} data={data} pod={pod} setSid={setSid} />
            })
          ) : (
            <div className='text-white'>There are no current stewards available...!!</div>
          )}
        </div>
      </div>
    </div>
  )
}

export const Card = ({ setOpenProfile, data, pod, setSid }: CardProps) => {
  return (
    <div className='rounded-[20px] bg-vdao-dark text-white'>
      <div
        className='float-right cursor-pointer pt-5 pr-5 text-sm font-semibold underline underline-offset-2 md:pt-[30px] md:pr-[30px]'
        onClick={() => setOpenProfile(true)}
      >
        {' '}
        View Profile{' '}
      </div>

      <div className='p-5 md:p-10'>
        <div className='flex w-full'>
          <Image src={ProfilePic} alt='' className='h-[64.2px] w-[60px] rounded-full' />

          <div className='pl-[10px] md:pl-[15px]'>
            <div className='font-body text-[26px] font-semibold text-vdao-light'> Kris Millar </div>
            <div className='flex flex-col font-body text-lg md:flex-row md:gap-5'>
              <div className='font-light'>0xd12512....92C</div>
              <div className='font-semibold'>Joined May 05, 2023</div>
            </div>
          </div>
        </div>

        <div className='mt-[18px] w-fit rounded-3xl border-[3px] py-[7px] px-[25px] text-xl font-medium'>
          DAO Operation Guild
        </div>

        <div className='pt-5 text-lg font-normal md:pt-[30px]'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ultrice ullamcorper.
        </div>

        <div className='mt-[25px] flex justify-between rounded-[20px] bg-white px-5 py-8 md:mt-11 md:px-10'>
          <div>
            <div className='text-[28px] font-semibold text-vdao-light md:text-[32px]'> 241 </div>
            <div className='text-sm font-semibold text-vdao-dark md:text-lg'>
              {' '}
              Delegated <br /> Votes{' '}
            </div>
          </div>

          <div>
            <div className='text-[28px] font-semibold text-vdao-light md:text-[32px]'> 5.1% </div>
            <div className='text-sm font-semibold text-vdao-dark md:text-lg'>
              {' '}
              Volting <br /> Weight{' '}
            </div>
          </div>

          <div>
            <div className='text-[28px] font-semibold text-vdao-light md:text-[32px]'> 451 </div>
            <div className='text-sm font-semibold text-vdao-dark md:text-lg'>
              {' '}
              Praise <br /> Score{' '}
            </div>
          </div>
        </div>

        <div className='flex pt-[30px] md:pt-10'>
          <PrimaryButton text='Delegate' className='py-[5px] text-xl' />
          <div className='py-[5px] pl-[30px] text-xl font-medium'> Activity </div>
        </div>
      </div>
    </div>
  )
}

export default StewardCards
