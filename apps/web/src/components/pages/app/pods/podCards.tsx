import Image from 'next/image'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'
import PodImage from 'public/illustrations/pods/podImage.svg'
import Icon1 from 'public/icons/pods/icon1.svg'
import Icon2 from 'public/icons/pods/icon2.svg'
import Icon3 from 'public/icons/pods/icon3.svg'
import Icon4 from 'public/icons/pods/icon4.svg'
import Icon5 from 'public/icons/pods/icon5.svg'
import Icon6 from 'public/icons/pods/icon6.svg'
import Icon7 from 'public/icons/pods/icon7.svg'
import Icon8 from 'public/icons/pods/icon8.svg'
import { Dispatch, SetStateAction } from 'react'
import PodInfoBox from './popups/infoBox'
import { useAccount } from 'wagmi'
import { Pod } from '@prisma/client'
// import { usePodReads } from '~/hooks/web3/usePod'

type PodCardProps = {
  setOpenRegen: Dispatch<SetStateAction<boolean>>
  data: (Pod & {})[] | undefined
}

type CardProps = {
  setOpenRegen: Dispatch<SetStateAction<boolean>>
  data: (Pod & {})[] | undefined
  pod: Pod
}

const PodCards = ({ setOpenRegen, data }: PodCardProps) => {
  const { address, isConnecting, isDisconnected } = useAccount()

  /** Here !, tell TypeScript that even though something looks like it could be null, it can trust you that it's not */
  // const { data } = usePodReads([0, 1], { admins: true, discussions: true, members: true, proposals: true })
  // console.log("Pods info: ", data)

  return (
    <div className='mx-auto w-screen bg-vdao-deep'>
      <div className='mx-auto max-w-[1280px] pb-[120px]'>
        <div
          id='currentPods'
          className='mx-6 max-w-[1280px] font-heading text-[32px] font-medium text-vdao-light md:mx-auto md:text-[46px]'
        >
          Current Pods
        </div>

        <div className='mx-6 mt-5 grid grid-cols-1 gap-5 md:mx-0 md:grid-cols-2'>
          {data?.map((pod, idx) => {
            return <Card setOpenRegen={setOpenRegen} data={data} pod={pod} />
          })}
        </div>
      </div>
    </div>
  )
}

export const Card = ({ setOpenRegen, data, pod }: CardProps) => {
  return (
    <div className='rounded-[20px] bg-vdao-dark py-10 px-5 text-white md:py-[50px] md:px-10'>
      <div className='flex flex-col gap-[10px] md:flex-row md:gap-[25px]'>
        <Image src={PodImage} alt='' height={120} width={120} className='align-top' />

        <div>
          <div className='font-heading text-3xl font-medium'> {pod.name}</div>
          <div className='pt-[10px] font-body text-lg font-normal'>
            {' '}
            {pod.description
              ? pod.description
              : `
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ultrices vehicula ullamcorper...
              `}
          </div>
          <div>
            <PrimaryButton
              text='View Detail'
              className='mt-5 py-[5px] px-[35px] font-heading text-xl font-medium'
              onClick={() => setOpenRegen(true)}
            />
          </div>
        </div>
      </div>

      <PodInfoBox invertColors={false} proposals={21} discussions={354} members={data ? data.length : 0} />

      <div className='flex flex-col gap-[30px] pt-5 md:flex-row md:gap-[60px] md:pt-10'>
        <div>
          <div className='font-heading text-xl font-medium'> Manager </div>
          <div className='flex w-full pt-[14px]'>
            <div>
              <Image src={Icon1} alt='' className='rounded-full' />
            </div>

            <div className='pl-[10px] md:pl-[16px]'>
              <div className='font-body text-lg font-semibold'>CyberGod01</div>
              <div className='font-body text-sm'>0xd12512....92C</div>
            </div>
          </div>
        </div>

        <div className='flex-1'>
          <div className='font-heading text-xl font-medium'> Members </div>
          <div className='grid grid-cols-5 gap-[10px] pt-[15px]'>
            <div>
              <Image src={Icon2} alt='' className='rounded-full' />
            </div>
            <div>
              <Image src={Icon3} alt='' className='rounded-full' />
            </div>
            <div>
              <Image src={Icon4} alt='' className='rounded-full' />
            </div>
            <div>
              <Image src={Icon5} alt='' className='rounded-full' />
            </div>
            <div>
              <Image src={Icon6} alt='' className='rounded-full' />
            </div>
            <div>
              <Image src={Icon7} alt='' className='rounded-full' />
            </div>
            <div>
              <Image src={Icon8} alt='' className='rounded-full' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PodCards
