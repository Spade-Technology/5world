import Image from 'next/image'
import applyImage from 'public/illustrations/apply/SVG/Frame.svg'

const SectionOne = () => {
  const content = [
    {
      title: 'Head',
      text: '        e.g. analytical skills for developing strategies and processes across all aspects of DAO operations and governance. Critical thinking and applied reasoning skills to engage in meaningful thought leadership both inside and outside the DAO community.',
    },
    {
      title: 'Heart',
      text: 'e.g creative skills to develop a unique DAO culture and communication style. Capacity to develop art that honours the DAO’s core mission and vision. People skills to manage conflict and foster positive engagement and stakeholder relations both internally and externally.',
    },
    {
      title: 'Hands',
      text: ' e.g. technical skills to manage day-to-day DAO operations, identify and fix bugs, and implement future upgrades. Practical skills to manage the day-to-day community and to facilitate online and offline events both internally and externally.',
    },
  ]

  /** styles for both mobile and web */
  const containerClass = 'flex flex-col-reverse mx-6'
  return (
    <div className={`${containerClass} mx-auto max-w-[1280px] px-6 pt-10 md:flex-row md:gap-36 md:px-20 md:pt-0`}>
      <div className='flex-1 md:py-20'>
        {content.map(({ title, text }, index) => {
          return (
            <div className=''>
              <div className='pt-14 font-heading text-[26px] font-medium md:pt-12 md:text-3xl'>{title}</div>
              <div className='pt-5 font-body text-lg font-normal leading-[22px] md:pt-4'>{text}</div>
            </div>
          )
        })}
      </div>

      <div className='mx-auto flex-1 md:my-auto md:scale-125'>
        <Image src={applyImage} alt='VDAO-header' width={310} height={292} className=' md:w-full' />
      </div>
    </div>
  )
}

export default SectionOne
