import Image from 'next/image'
import { blogDetails } from './blogDetails'
import Header from '~/components/layout/header'

type DetailProps = {
  id: string | string[]
}

const Details = ({ id }: DetailProps) => {
  const details = blogDetails[Number(id)]

  return (
    <div className=' mx-6 mt-10 mb-24'>
      <div className='mx-60'>
        <div className='text-lg font-bold '>{details?.createdAt}</div>

        <div className='pt-5 font-heading text-3xl font-medium'>{details?.heading}</div>

        <div className='mx-auto flex'>
          <Image src={details?.createdByProfile} alt='' className='rounded-full' />
          <div className='pl-[15px] text-[20px]'> {details?.createdBy} </div>
        </div>

        <div className='flex gap-2 pt-[18.8px]'>
          {details?.features &&
            details?.features.length > 0 &&
            details?.features.map((item: string, idx: number) => {
              return (
                <div className='w-fit cursor-pointer rounded-3xl bg-vdao-purple px-6 py-1 text-sm text-black' key={idx}>
                  {item}
                </div>
              )
            })}
        </div>

        <div className='mt-11'>
          <Image src={details?.image} width={754} height={455} alt='' />
        </div>

        <div className='mt-3'>
          {details?.fullDescription &&
            details?.fullDescription.length > 0 &&
            details?.fullDescription.map((description, idx) => {
              return (
                <div key={idx} className='mt-12'>
                  <div className='font-heading text-[26px]'>{description.header}</div>
                  {description.paras &&
                    description.paras.length > 0 &&
                    description.paras.map((para, idx) => {
                      return (
                        <div className='pt-5 font-body text-lg font-light text-black' key={idx}>
                          {para}
                        </div>
                      )
                    })}
                </div>
              )
            })}
        </div>

        <div className='mt-[114px] border-t-[1px] border-t-vdao-dark'>
          <div className='pt-[30px] text-lg font-bold'>About Author</div>

          <div className='flex justify-between gap-[30px] pt-[26.8px]'>
            <div>
              <Image src={details?.createdByProfile} alt='' width={80} height={85.6} className='rounded-full' />
            </div>
            <div className='pl-10 font-light'>
              <div className='text-[22px]'>{details?.createdBy}</div>
              <div className='pt-[14px] text-lg text-black'>{details?.about}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details
