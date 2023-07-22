import Image from 'next/image'
import UpWardsArrow from 'public/icons/apply/FAQ-arrow-up.png'
import { useState, useEffect, useRef } from 'react'
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
    <div className='xl:px-O mx-[24px] my-20 flex max-w-[1280px] flex-col justify-center bg-white px-0 text-vdao-dark md:mx-auto md:mt-28 md:gap-9 md:px-12 lg:flex-row'>
      <div className='w-[342px] font-heading text-[32px] font-medium leading-[38px] md:w-[447px] md:text-[46px] md:leading-[52px]'>Frequently asked Questions</div>
      <div className='mt-5 flex-1'>
        <div className='font-heading text-[22px] font-medium leading-[26px] md:pr-10 md:font-body md:text-[26px] md:leading-[30px]'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi turpis mi, faucibus vitae elementum id, tristique at lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
          turpis mi, faucibus vitae elementum id, tristique at lectus.
        </div>

        {props.FAQS.map((faq, idx) => {
          const props = { faq, idx, setIndex, index }
          return <FAQ {...props} />
        })}
      </div>
    </div>
  )
}

const FAQ = ({ faq, idx, setIndex, index }: any) => {
  const [height, setHeight] = useState(0)
  const ref = useRef<any>(null)

  useEffect(() => {
    setHeight(ref.current?.scrollHeight)
    window.addEventListener('resize', () => {
      setHeight(ref.current?.scrollHeight)
    })
    return () => {
      window.removeEventListener('resize', () => {
        setHeight(0)
      })
    }
  }, [])
  return (
    <div className='mt-10 flex cursor-pointer justify-between gap-9 md:mt-5' onClick={() => setIndex(idx)} key={'FAQ#' + idx}>
      <div>
        <div className='font-heading text-[26px] font-medium leading-[30px] md:w-auto md:text-3xl'>{faq.title}</div>
        <div ref={ref} style={{ height: index === idx ? `${height}px` : '' }} className={`h-0 overflow-hidden duration-500 ease-in-out`}>
          <div className=' pt-2 font-body text-lg font-normal leading-[22px]'>{faq.description}</div>
        </div>
      </div>

      <Image src={UpWardsArrow} alt='arrow' className={`h-6 w-6 ${index === idx ? 'mt-10 origin-top rotate-180 duration-500 ease-in-out' : ''} `} />
    </div>
  )
}

export default FAQSection
