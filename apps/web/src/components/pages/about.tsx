import CoreValueBeaverHero from 'public/illustrations/about/SVG/vdao-aboutus-beaver2 2.svg'
import CoreValueBeaverHero2 from 'public/illustrations/about/SVG/vdao-aboutus-beaver2 2 (1).svg'
import VisionPersionImage from 'public/illustrations/about/PNG/VDAO-about-person.png'

import Image from 'next/image'
import { Section } from '../layout/section'

export function AboutUsCoreTeamComponent() {
  return (
    <Section className='xl:px-O mx-auto mb-20 flex max-w-[1280px] flex-col px-6 md:my-36 md:px-12'>
      <div className='mx-auto flex w-full max-w-[1140px] flex-col md:flex-row'>
        <div className='mb-[31px] w-full text-left font-heading text-[32px] font-medium md:mb-6 md:text-[46px]'>Our Core Team</div>
        <div className='max-w-md font-body text-[22px] font-medium leading-[26px] text-vdao-dark md:ml-auto md:text-[26px] md:leading-[30px]'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi turpis mi, faucibus vitae elementum id, tristique at lectus.
        </div>
      </div>
      <div className='w-100 mt-[30px] md:mt-20 md:px-6 lg:mx-auto lg:w-[1140px] lg:px-0'>
        <div className='flex flex-wrap gap-y-[30px] md:grid md:grid-cols-12 md:gap-5 md:gap-y-10'>
          {[1, 2, 3, 4, 5, 6].map(item => {
            return (
              <div className='col-span-10 mx-auto  w-[270px] md:col-span-4 md:mx-0 md:w-full lg:col-span-3'>
                <div className='h-[270px] w-full rounded-[10px] bg-vdao-lightpurple opacity-70 '></div>
                <div className='mt-5 font-body text-[26px] font-medium leading-[30px] text-vdao-dark '>Full Name</div>
                <div className='font-body text-[22px] font-normal leading-[26px] text-vdao-dark '>Title</div>
              </div>
            )
          })}
        </div>
      </div>
      <div className='w-100 md:px-6 lg:mx-auto lg:w-[1140px] lg:px-0'>
        <div className='mx-auto mt-[60px] flex w-full md:mt-20'>
          <h1 className='mb-6 w-full text-left text-[32px] font-medium md:text-[46px]'>Advisors</h1>
        </div>
        <div className='flex flex-wrap gap-y-[30px] md:grid md:grid-cols-12 md:gap-5 md:gap-y-10'>
          {[1, 2, 3, 4, 5, 6].map(item => {
            return (
              <div className='col-span-10 mx-auto  w-[270px] md:col-span-4 md:mx-0 md:w-full lg:col-span-3'>
                <div className='h-[270px] w-full rounded-[10px] bg-vdao-lightpurple opacity-70 '></div>
                <div className='mt-5 font-body text-[26px] font-medium leading-[30px] text-vdao-dark '>Full Name</div>
                <div className='font-body text-[22px] font-normal leading-[26px] text-vdao-dark '>Title</div>
              </div>
            )
          })}
        </div>
      </div>
      <div className='w-100 md:px-6 lg:mx-auto lg:w-[1140px] lg:px-0'>
        <div className='mx-auto mt-[60px] flex w-full md:mt-20'>
          <h1 className='mb-6 w-full text-left text-[32px] font-medium md:text-[46px]'>Guardians</h1>
        </div>
        <div className='flex flex-wrap gap-y-[30px] md:grid md:grid-cols-12 md:gap-5 md:gap-y-10'>
          {[1, 2, 3, 4, 5, 6].map(item => {
            return (
              <div className='col-span-10 mx-auto  w-[270px] md:col-span-4 md:mx-0 md:w-full lg:col-span-3'>
                <div className='h-[270px] w-full rounded-[10px] bg-vdao-lightpurple opacity-70 '></div>
                <div className='mt-5 font-body text-[26px] font-medium leading-[30px] text-vdao-dark '>Full Name</div>
                <div className='font-body text-[22px] font-normal leading-[26px] text-vdao-dark '>Title</div>
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}

export function AboutUsVisionMissionComponent() {
  return (
    <Section className='xl:px-O flex max-w-[1440px] flex-col overflow-hidden  py-20 px-6 text-vdao-dark md:my-36 md:flex-row md:py-24 md:px-12 lg:mx-auto'>
      <div className='mx-auto flex w-full flex-col gap-10 md:gap-20'>
        <div className='flex flex-col md:flex-row'>
          <div className='mb-5 w-full font-heading text-[32px] font-medium underline md:mb-6 md:text-center md:text-[36px]'>Vision</div>
          <div className='mr-auto w-full font-body text-lg font-normal'>
            <div className='max-w-[410px] leading-[22px]'>
              Historically, regenerative agriculture projects have been under-researched and under-funded. By supporting research initiatives and real-world R&D, VDAO is building an innovation network
              to restore global ecosystem health from the soil up.
            </div>
          </div>
        </div>
        <div className='flex flex-col md:flex-row'>
          <h1 className='mb-5 w-full text-[32px] font-medium underline md:mb-6 md:text-center md:text-[36px]'>Mission</h1>
          <div className='mr-auto w-full text-lg font-normal'>
            <div className='max-w-[410px] leading-[22px]'>
              Traditional industrial/chemical agricultural systems have reached the limits of what they can offer us without damaging the eco-systems we all depend upon. Our need for viable
              alternatives has never been more clear.
              <br />
              <br />
              VDAO is a novel Web3 coordination platform where individuals, institutions and skilled professionals can come together to fund regenerative agriculture R&D, creating a decentralised,
              open-source network of collective intelligence that will regenerate our planet.
            </div>
          </div>
        </div>
      </div>
      <Image src={VisionPersionImage} alt='VDAO' className='mt-auto ml-10 md:h-1/6 md:w-1/6 md:scale-150' />
    </Section>
  )
}

export function AboutUsCoreValueComponent() {
  return (
    <Section className='xl:px-O relative mt-[80px] bg-vdao-deep  px-6 text-vdao-light md:my-36 md:px-12 xl:overflow-hidden'>
      <div className='relative mx-auto flex max-w-[1440px] flex-col pt-[60px] pb-[330px] md:pt-[100px] md:pb-[123px] '>
        <div className='mx-auto w-full max-w-[1140px] '>
          <div className='mb-[33px] w-full text-left font-heading text-[32px] font-medium md:mb-6 md:text-[46px]'>Our Core Value</div>
          <div className='z-50 flex flex-col-reverse md:mt-12 md:flex-row lg:ml-[286px]'>
            <div className='rid-rows-4 grid w-full grid-cols-1 gap-10 md:grid-cols-2  md:grid-rows-2'>
              <div className='flex max-w-[340px] flex-col gap-4'>
                <div className='font-heading text-[26px] font-medium md:text-[30px]'>Faireness & Caring</div>
                <div className='font-body text-lg font-normal leading-[22px] text-white'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget eleifend nisi. Vestibulum euismod, augue at tempor.
                </div>
              </div>
              <div className='flex max-w-[340px] flex-col gap-4'>
                <div className='font-heading text-[26px] font-medium md:text-[30px]'>Generous Listening</div>
                <div className='font-body text-lg font-normal leading-[22px] text-white'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget eleifend nisi. Vestibulum euismod, augue at tempor.
                  <br />
                  <br />
                  Healthy community relations are supported via our comprehensive Code of Conduct.
                </div>
              </div>
              <div className='flex max-w-[340px] flex-col gap-4'>
                <div className='font-heading text-[26px] font-medium md:text-[30px]'>Trust & Respect</div>
                <div className='font-body text-lg font-normal leading-[22px] text-white'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget eleifend nisi. Vestibulum euismod, augue at tempor.
                </div>
              </div>
              <div className='flex max-w-[340px] flex-col gap-4'>
                <div className='font-heading text-[26px] font-medium md:text-[30px]'>Straight Talk</div>
                <div className='font-body text-lg font-normal leading-[22px] text-white'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget eleifend nisi. Vestibulum euismod, augue at tempor.
                </div>
              </div>
              <div className='flex max-w-[380px] '>
                <div className='font-inter text-base font-normal leading-[22px] text-white'>Healthy community relations are supported via our comprehensive Code of Conduct.</div>
              </div>
            </div>
          </div>
        </div>
        <Image src={CoreValueBeaverHero} alt='VDAO' className='absolute bottom-0 left-0 hidden h-[280px] w-[543px] md:block ' />
      </div>
      <Image src={CoreValueBeaverHero2} alt='VDAO' className='absolute bottom-[62px] left-0 h-[283px] w-full md:hidden ' />
    </Section>
  )
}

export function AboutUsComponent() {
  return (
    <Section className='xl:px-O max-w-[1280px] flex-col px-6 md:my-16 md:mx-auto md:px-12 '>
      <div className='mb-[30px] flex text-left font-heading text-[44px] font-medium md:w-1/2 md:text-[80px]'>
        About <div className='mx-4 hidden md:block'> Us</div>
      </div>
      <div className='flex justify-end'>
        <div className='flex justify-end font-body text-[26px] font-medium leading-[30px] text-vdao-dark md:w-8/12 lg:mr-24 lg:w-[503px]'>
          Global ecosystem regeneration is a positive sum game: the more effort we put in, the more we benefit.
          <br />
          <br />
          Regardless of our political views, lifestyle or opinions, we can all agree that regenerating degraded ecosystems is both neccessary and worthwhile.
        </div>
      </div>
    </Section>
  )
}
