import Image from 'next/image'
import groupImage from 'public/illustrations/nftCollections/groupImage.svg'
import PurpleButton from '~/styles/shared/buttons/purpleButton'

const HowItWorks = () => {
  return (
    <div className='mx-auto flex w-full  max-w-[1068px] bg-vdao-deep px-6 py-20 text-white md:px-10 md:py-[140px]'>
      <div className='ml-auto flex max-w-[865px] flex-col gap-10 md:flex-row md:gap-[22px]'>
        <div className=''>
          <span className=' font-heading text-[32px] md:text-4xl font-medium underline underline-offset-8'>How it works</span>
        </div>
        <div className='w-full md:w-[580px]'>
          <Image src={groupImage} alt='group-image' className='' />
          <div className='pt-5 md:pt-[30px] font-body text-lg font-normal'>
            Participating in a VDAO NFT auction is not only a chance to show your financial support for this mission, but also gives exclusive access to the wider VDAO ecosystem, including real-world
            learning opportunities and events.
          </div>

          <PurpleButton text='Coming Soon' className='mt-[38px] py-[5px] font-heading text-xl font-medium' />
        </div>
      </div>
    </div>
  )
}

export default HowItWorks
