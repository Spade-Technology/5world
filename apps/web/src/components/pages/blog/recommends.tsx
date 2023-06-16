import Image from 'next/image'
import { blogDetails } from './blogDetails'
import Link from 'next/link'
import { type } from 'os'

const Recommends = () => {
  return (
    <div className='mt-20'>
      <h2 className='mb-8 font-heading text-[32px] font-medium leading-[38px] md:mx-7 md:mb-[45px] md:px-6 md:text-[46px] md:leading-[52px]'>Recommended Reading</h2>
      <div className='justify-between gap-6 md:mx-7 md:grid md:grid-cols-12 md:px-6 lg:gap-20'>
        <div className='md:col-span-6'>
          <RecommendedCard blog={blogDetails[0]} />
        </div>
        <div className='md:col-span-6'>
          <RecommendedCard blog={blogDetails[1]} />
        </div>
      </div>
    </div>
  )
}

type RecommendedProps = {
  blog: any
}

export const RecommendedCard = (Props: RecommendedProps) => {
  return (
    <>
      <div>
        <Image src={Props.blog?.image} alt='' className='rounded-2.5' />
        <div className='pt-[15px] pb-2.5 font-body text-sm font-bold md:py-5 md:text-lg'>{Props.blog?.createdAt}</div>
        <div className='font-heading text-[26px] font-medium leading-[32px] md:text-3xl'>{Props.blog?.heading}</div>
        <div className='mx-auto flex items-center pt-[23px] md:pt-2'>
          <Image src={Props.blog?.createdByProfile} alt='' width={40} height={42.8} className='rounded-full' />
          <div className='my-auto pl-[15px] font-body text-[22px] font-normal md:pl-4'> {Props.blog?.createdBy} </div>
        </div>

        <div className='flex flex-wrap gap-2.5 py-5'>
          {Props.blog?.features &&
            Props.blog?.features.length > 0 &&
            Props.blog?.features.map((item: string, idx: number) => {
              return (
                <div className='w-fit cursor-pointer rounded-3xl bg-vdao-purple px-[25px] py-[6px] font-body text-sm font-normal text-black' key={idx}>
                  {item}
                </div>
              )
            })}
        </div>

        <div className=' font-body font-normal text-black md:text-lg'>{Props.blog?.about}</div>
        <div className=''>
          <Link href={'/blog/details?id=' + Props.blog?.id} className='w-[143px]'>
            <div className='mb-[49px] mt-5 w-fit cursor-pointer border-b-2 border-b-vdao-light font-heading text-xl font-medium md:mb-0'>Read More</div>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Recommends
