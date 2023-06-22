import Image from 'next/image'
import { useState } from 'react'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'
import ETHIcon from 'public/icons/donate/eth-icon.svg'
import PolygonIcon from 'public/icons/donate/polygon.svg'
import HowItWorks from '~/components/misc/howItWorks'

type Props = {
  className?: string
}

const DonateNow = (props: Props) => {
  const [radio, setRadio] = useState('')

  return (
    <div className={'mx-6 mt-[49px] rounded-2xl bg-white p-14 font-body text-vdao-dark md:mx-20 md:mt-0 ' + props.className}>
      <div className='font-heading text-[26px] font-medium md:text-3xl'>Donate With</div>
      <div className='flex flex-col gap-[70px] pt-[30px] lg:flex-row'>
        <div className='flex-1'>
          <form className='flex flex-col border-b-2 border-b-black pb-3 md:flex-row'>
            <div className='my-auto flex flex-1'>
              <input type='radio' id='crypto' className='h-5 w-5 cursor-pointer accent-vdao-light' value='Cryptocurrency' name='donate' />
              <label htmlFor='crypto' className='relative -top-1  pl-[15px] font-body text-[22px] font-bold leading-[25px] md:text-lg'>
                Cryptocurrency
              </label>
            </div>

            <div className='mt-5 flex flex-1 md:mt-0'>
              <input type='radio' id='credit' className='h-5 w-5 cursor-pointer accent-vdao-light' value='Credit Card' onChange={evt => setRadio(evt.target.value)} name='donate' />
              <label htmlFor='crypto' className='relative -top-1 pl-[15px] font-body text-[22px] font-bold leading-[25px] md:text-lg'>
                Credit Card
              </label>
            </div>
          </form>

          <div className='mt-[30px] grid grid-cols-2 rounded-md border-[1px] border-solid  border-black ring-black md:w-[353px]'>
            <div className='flex rounded-md  rounded-r-none border-r-[1px]   border-r-black bg-vdao-lightpurple py-[10px] px-[15px]'>
              <div className='mx-auto flex flex-1'>
                <Image src={ETHIcon} alt='ETHIcon' />
                <span className='px-[10px] text-lg font-medium text-vdao-dark'>ETH</span>
              </div>
              <Image src={PolygonIcon} alt='PolygonIcon' className='float-right' />
            </div>
            <input className='rounded-md px-2 text-center text-lg font-medium outline-none' />
          </div>

          <PrimaryButton text='Donate Now' className='mt-5 mb-[34px] md:my-5 ' />

          <div className='flex gap-5'>
            <div>
              <input type='checkbox' className='mt-2 cursor-pointer accent-vdao-light' />
            </div>
            <div>
              <div className='font-satoshi text-lg font-normal text-black'>Make it anonymous</div>
              <div className='font-satoshi text-sm font-normal leading-[18px] text-black'>
                By checking this, we won’t consider your profile information as a doner for this donation and won’t show it on public pages.{' '}
              </div>
            </div>
          </div>
        </div>

        <div className='flex-1 md:mr-[49px] '>
          <div className='font-satoshi hidden text-[22px] font-bold leading-[22px] md:block'>How to donate</div>
          <div className='text-lg font-normal leading-[22px] text-black md:mt-[15px] '>You can contribute directly to the DAO treasury in $ETH, $USDC, $USDT and $DAI.</div>

          <div className='hidden pt-[35px] text-[22px] font-bold leading-[22px] md:block'>How will the funds be used?</div>
          <div className='mt-[15px] text-lg font-normal text-black'>
            95% of all donations will be distributed via quarterly quadratic funding rounds that align with the DAOs core vision and mission to regenerate planet earth.
            <div className='md:mt-5'></div>
            5% of all donations received by the treasury will be allocated to the DAO operations budget.
          </div>
        </div>
      </div>
    </div>
  )
}

export default DonateNow
