import Image from 'next/image'

import RestrictedImage from 'public/illustrations/getFunding/restrictedFunding.svg'
import GrantsImage from 'public/illustrations/getFunding/grants.svg'
import CommunityImage from 'public/illustrations/getFunding/community.svg'

const Offers = () => {
  const offersInfo = [
    {
      img: RestrictedImage,
      content: 'Unrestricted funding opportunities',
    },
    {
      img: GrantsImage,
      content: 'Fully community led grants allocation',
    },
    {
      img: CommunityImage,
      content: 'Become a member of VDAO and join our decentralised global community.',
    },
  ]

  return (
    <div className='mx-auto max-w-[927px] px-6 pb-[31px] pt-20 md:px-0 md:py-[140px] '>
      <div className='font-heading text-[32px] font-medium leading-[38px] md:text-center md:text-[46px]'>What’s on Offer?</div>
      <div className='flex flex-col justify-between gap-14 pt-[31px] md:flex-row md:gap-8 md:pt-[65px] lg:px-24'>
        {offersInfo.map((offer, idx) => {
          return (
            <div className='' key={idx}>
              <Image src={offer.img} alt='image' className='mx-auto' />
              <div className='mx-auto w-[230px] pt-5 text-center font-inter text-base leading-5 md:w-[207px]'>{offer.content}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Offers
