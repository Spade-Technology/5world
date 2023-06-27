import Image from 'next/image'
import IllustrationImage from 'public/illustrations/apply/PNG/VDAO-apply.png'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'

type CardProps = {
  buttonText: string
  description: string
  className?: string
}

const Card = (props: CardProps) => {
  return (
    <div className={`flex flex-col items-start rounded-2xl bg-vdao-dark px-[30px] py-10 font-medium md:px-10 ${props.className}`}>
      <div className='h-0.5 w-full bg-white'></div>
      <div className='mt-5 flex-1 font-heading text-[22px] font-medium leading-[26px] text-white md:pr-10 md:font-body md:text-[26px] md:leading-[30px]'>{props.description}</div>
      <div className='mt-8 flex-1'>
        <PrimaryButton text={props.buttonText} className='' />
      </div>
    </div>
  )
}

const SectionTwo = () => {
  /** Common styled for both mobile and web */
  const containerClass = ''

  return (
    <div className='mx-auto flex max-w-[1440px] flex-col md:flex-row'>
      <div className='flex-1'>
        <Image src={IllustrationImage} width={0} height={441.93} alt='illustration-pic' className='w-full' />
      </div>
      <div className='mx-[24px] mt-20 flex-1 md:ml-10 md:mr-20'>
        <Card buttonText='Join Our Discord' description='Want to learn more? Head over to our discord channel to meet our DAO community and explore how you might be able to contribute.' />
        <Card buttonText='Apply Now' description='Ready to jump in and help out? Complete our membership application form by clicking below.' className='mt-14' />
      </div>
    </div>
  )
}

export default SectionTwo
