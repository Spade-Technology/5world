import Image from 'next/image'
import UpWardsArrow from 'public/icons/apply/FAQ-arrow-up.png'
import { useState } from 'react'
import { FAQS } from '../pages/apply/faqs'

type FAQProps = {
  FAQS: {
    title: string
    description: string
  }[]
}

const FAQSection = (props: FAQProps) => {
  const [index, setIndex] = useState<number>(0)

  return (
    <div className='xl:px-O mx-10 my-20 flex max-w-[1280px] flex-col justify-center bg-white px-0 text-vdao-dark md:mx-auto md:mt-28 md:gap-9 md:px-12 lg:flex-row'>
      <div className='w-[342px] font-heading text-[32px] font-medium leading-[38px] leading-[52px] md:w-[447px] md:text-[46px]'>Frequently asked Questions</div>
      <div className='mt-5 flex-1'>
        <div className='font-heading text-[22px] font-medium leading-[26px] md:pr-10 md:font-body md:text-[26px] md:leading-[30px]'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi turpis mi, faucibus vitae elementum id, tristique at lectus.
        </div>

        {props.FAQS.map((faq, idx) => {
          return (
            <div className='mt-10 flex cursor-pointer justify-between gap-9 md:mt-5  md:mt-10' onClick={() => setIndex(idx)} key={'FAQ#' + idx}>
              <div>
                <div className='w-[299px] font-heading text-[26px] font-medium leading-[30px] md:w-auto md:text-3xl'>{faq.title}</div>
                {index === idx && <div className='pt-2 font-body text-lg font-normal leading-[22px]'>{faq.description}</div>}
              </div>

              <Image src={UpWardsArrow} alt='arrow' className={`h-6 w-6 ${index === idx ? 'mt-10 origin-top rotate-180 transition-transform' : ''} `} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FAQSection
