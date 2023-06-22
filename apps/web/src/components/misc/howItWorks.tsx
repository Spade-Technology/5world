import Image from 'next/image'
import groupImage from 'public/illustrations/nftCollections/groupImage.svg'
import PurpleButton from '~/styles/shared/buttons/purpleButton'

type HowItWorksProps = {
  contents?: any
  className?: string
}

const HowItWorks = (props: HowItWorksProps) => {
  return (
    <div className={`mx-auto px-6 py-20 text-white md:w-[749px] md:px-0 md:pt-[140px] md:pb-[77px] ${props.className}`}>
      {props.contents?.map((contents: any, idx: number) => {
        return (
          <div className={`flex flex-col justify-between gap-5 md:flex-row md:gap-[43px] md:px-6 lg:px-0 ${idx == 0 ? '' : 'pt-[30px]'}`} key={idx}>
            <div className='' key={idx}>
              <div className='font-heading text-[32px] font-medium underline underline-offset-8 md:w-[242px] md:text-4xl'>{contents?.heading}</div>
            </div>
            <div className=''>
              {contents?.image && <Image src={groupImage} alt='group-image' />}
              {contents?.content && <div className=' font-body text-lg font-normal leading-[22px] '>{contents?.content}</div>}

              {contents?.button && <PurpleButton text={contents?.button} className='mt-[38px] py-[5px] font-heading text-xl font-medium' />}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default HowItWorks
