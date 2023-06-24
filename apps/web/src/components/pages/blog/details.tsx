import Image from 'next/image'
import { blogDetails } from './blogDetails'
import Header from '~/components/layout/header'

type DetailProps = {
  id: string | string[]
}

const Details = ({ id }: DetailProps) => {
  const details = blogDetails[Number(id)]

  return (
    <div className='mx-auto max-w-[623px] '>
      <div className='font-body text-sm font-bold md:text-lg'>{details?.createdAt}</div>
      <div className='pt-2.5 font-heading text-[26px] font-medium leading-[30px] md:pt-5 md:text-3xl'>{details?.heading}</div>
      <div className='mx-auto mt-5 flex items-center md:mt-2'>
        <Image src={details?.createdByProfile} alt='' className='rounded-full' />
        <div className='pl-[15px] font-body text-[22px] font-normal'> {details?.createdBy} </div>
      </div>
      <div className='mt-5 flex gap-[10px]'>
        {details?.features &&
          details?.features.length > 0 &&
          details?.features.map((item: string, idx: number) => {
            return (
              <div className='w-fit cursor-pointer rounded-3xl bg-vdao-purple px-[25px] py-[6px] font-body text-sm text-black' key={idx}>
                {item}
              </div>
            )
          })}
      </div>
      <Image src={details?.image} width={0} height={0} className='mt-[30px] h-[206px] w-full rounded-[10px] md:mt-0 md:h-[455px] md:w-[754px]' alt='' />
      <div>
        {details?.fullDescription &&
          details?.fullDescription.length > 0 &&
          details?.fullDescription.map((description, idx) => {
            return (
              <div key={idx} className={idx < 1 ? 'mt-[30px]' : 'mt-[48px] mb-[120px] md:mb-[114px]'}>
                <div className='font-heading text-xl font-medium leading-[24px] text-vdao-dark md:font-body md:text-[26px] md:leading-[30px]'>{description.header}</div>
                {description.paras &&
                  description.paras.length > 0 &&
                  description.paras.map((para, idx) => {
                    return (
                      <div className='pt-[15px] font-body text-lg font-normal leading-[22px] text-black md:pt-5' key={idx}>
                        {para}
                      </div>
                    )
                  })}
              </div>
            )
          })}
      </div>

      <div className=' border-t-[1px] border-t-vdao-dark'>
        <div className='pt-[30px] font-body text-lg font-bold text-vdao-dark'>About Author</div>

        <div className='flex items-center gap-4 pt-[26.8px] md:items-start md:justify-between md:gap-[30px]'>
          <Image src={details?.createdByProfile} alt='' width={0} height={0} className='h-[43px] w-10 rounded-full md:h-[85px]  md:w-20' />
          <div className='font-body font-normal'>
            <div className='text-[22px] leading-[26px] text-vdao-dark'>{details?.createdBy}</div>
            <div className='hidden pt-[14px] text-lg leading-[24px] text-black md:block'>{details?.about}</div>
          </div>
        </div>
        <div className='pt-[14px] text-lg leading-[22px] text-black md:hidden md:leading-[24px]'>{details?.about}</div>
      </div>
    </div>
  )
}

export default Details
