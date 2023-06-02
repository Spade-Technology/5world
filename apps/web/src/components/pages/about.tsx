import CoreValueBeaverHero from 'public/illustrations/about/PNG/VDAO-about-beaver.png'
import VisionPersionImage from 'public/illustrations/about/PNG/VDAO-about-person.png'

import Image from 'next/image'
import { Section } from '../layout/section'

export function AboutUsCoreTeamComponent() {
  return (
    <Section className='xl:px-O mx-auto my-36 flex max-w-[1280px] flex-col px-6 md:px-12'>
      <div className='flex w-full flex-col md:flex-row'>
        <h1 className='mb-6 w-full text-left text-[32px] font-medium md:text-5xl'>Our Core Team</h1>
        <div className='ml-auto max-w-md text-[22px] font-medium leading-[26px] text-vdao-dark md:text-[26px]'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi turpis mi, faucibus vitae elementum id,
          tristique at lectus.
        </div>
      </div>
      <div className='mt-20 flex'>
        <div className='flex w-full justify-center'>
          <div className='grid grid-cols-1 gap-16 md:grid-cols-3 xl:grid-cols-5'>
            {[1, 2, 3, 4].map(item => {
              return (
                <div className='flex flex-col'>
                  <div className='h-72 w-72 bg-vdao-lightpurple  opacity-70'></div>
                  <h1 className='mt-5 font-body text-[26px] font-medium leading-[30px] text-vdao-dark md:text-[26px]'>
                    Full Name
                  </h1>
                  <h1 className='font-body text-[22px] font-normal leading-[26px] text-vdao-dark  md:text-[26px]'>
                    Title
                  </h1>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className='mx-auto mt-20 flex w-full'>
        <h1 className='mb-6 w-full text-left text-[32px] font-medium md:text-[46px]'>Advisors</h1>
      </div>
      <div className='flex'>
        <div className='flex w-full justify-center'>
          <div className='grid grid-cols-1 gap-16 md:grid-cols-3 xl:grid-cols-5'>
            {[1, 2, 3, 4].map(item => {
              return (
                <div className='flex flex-col'>
                  <div className='h-72 w-72 bg-vdao-lightpurple  opacity-70'></div>
                  <h1 className='mt-5 font-body text-[26px] font-medium leading-[30px] text-vdao-dark md:text-[26px]'>
                    Full Name
                  </h1>
                  <h1 className='font-body text-[22px] font-normal leading-[26px] text-vdao-dark  md:text-[26px]'>
                    Title
                  </h1>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className='mx-auto mt-20 flex w-full'>
        <h1 className='mb-6 w-full text-left text-[32px] font-medium'>Guardians</h1>
      </div>
      <div className='flex'>
        <div className='flex w-full justify-center'>
          <div className='grid grid-cols-1 gap-16 md:grid-cols-3 xl:grid-cols-5'>
            {[1, 2, 3, 4].map(item => {
              return (
                <div className='flex flex-col'>
                  <div className='h-72 w-72 bg-vdao-lightpurple  opacity-70'></div>
                  <h1 className='mt-5 font-body text-[26px] font-medium leading-[30px] text-vdao-dark md:text-[26px]'>
                    Full Name
                  </h1>
                  <h1 className='font-body text-[22px] font-normal leading-[26px] text-vdao-dark  md:text-[26px]'>
                    Title
                  </h1>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Section>
  )
}

export function AboutUsVisionMissionComponent() {
  return (
    <Section className='xl:px-O my-36 flex flex-col overflow-hidden  py-24 px-6 text-vdao-dark md:flex-row md:px-12'>
      <div className='mx-auto flex w-full max-w-[1280px] flex-col gap-20'>
        <div className='flex flex-col md:flex-row'>
          <h1 className='mb-6 w-full text-[32px] font-medium underline md:text-center md:text-[36px]'>Vision</h1>
          <div className='mr-auto w-full font-body text-lg font-normal'>
            <div className='max-w-[410px] leading-[22px]'>
              Historically, regenerative agriculture projects have been under-researched and under-funded. By supporting
              research initiatives and real-world R&D, VDAO is building an innovation network to restore global
              ecosystem health from the soil up.
            </div>
          </div>
        </div>
        <div className='flex flex-col md:flex-row'>
          <h1 className='mb-6 w-full text-[32px] font-medium underline md:text-center md:text-[36px]'>Mission</h1>
          <div className='mr-auto w-full text-lg font-normal'>
            <div className='max-w-[410px] leading-[22px]'>
              Traditional industrial/chemical agricultural systems have reached the limits of what they can offer us
              without damaging the eco-systems we all depend upon. Our need for viable alternatives has never been more
              clear.
              <br />
              <br />
              VDAO is a novel Web3 coordination platform where individuals, institutions and skilled professionals can
              come together to fund regenerative agriculture R&D, creating a decentralised, open-source network of
              collective intelligence that will regenerate our planet.
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
    <Section className='xl:px-O my-36 bg-vdao-deep py-24  px-6 text-vdao-light md:px-12 xl:overflow-hidden'>
      <div className='mx-auto flex max-w-[1440px] flex-col '>
        <div className='mx-auto w-full max-w-[1280px] '>
          <h1 className='mb-6 w-full text-left text-[32px] font-medium md:text-[46px]'>Our Core Value</h1>
        </div>
        <div className='mt-12 flex flex-col-reverse md:flex-row'>
          <Image
            src={CoreValueBeaverHero}
            alt='VDAO'
            className='mt-auto h-full scale-125 md:-mb-32 md:w-1/3 md:scale-100'
          />
          <div className='grid w-full grid-cols-1 grid-rows-4 gap-4 md:grid-cols-2 md:grid-rows-2  md:gap-10'>
            <div className='flex max-w-[340px] flex-col gap-4'>
              <h1 className='text-[26px] font-medium md:text-[30px]'>Faireness & Caring</h1>
              <span className='text-lg font-normal leading-[22px]'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget eleifend nisi. Vestibulum
                euismod, augue at tempor.
              </span>
            </div>
            <div className='flex max-w-[340px] flex-col gap-4'>
              <h1 className='text-[26px] font-medium md:text-[30px]'>Generous Listening</h1>
              <span className='text-lg font-normal leading-[22px]'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget eleifend nisi. Vestibulum
                euismod, augue at tempor.
                <br />
                <br />
                Healthy community relations are supported via our comprehensive Code of Conduct.
              </span>
            </div>
            <div className='flex max-w-[340px] flex-col gap-4'>
              <h1 className='text-[26px] font-medium md:text-[30px]'>Trust & Respect</h1>
              <span className='text-lg font-normal leading-[22px]'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget eleifend nisi. Vestibulum
                euismod, augue at tempor.
              </span>
            </div>
            <div className='flex max-w-[340px] flex-col gap-4'>
              <h1 className='text-[26px] font-medium md:text-[30px]'>Straight Talk</h1>
              <span className='text-lg font-normal leading-[22px]'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget eleifend nisi. Vestibulum
                euismod, augue at tempor.
              </span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

export function AboutUsComponent() {
  return (
    <Section className='xl:px-O my-16 flex w-full max-w-[1280px] flex-col px-6 md:mx-auto md:px-12 '>
      <div className='mb-6 flex text-left font-heading text-[44px] font-medium md:w-1/2 md:text-8xl'>
        About <div className='mx-4 hidden md:block'> Us</div>
      </div>
      <div className='ml-auto mr-12 font-body text-[26px] font-medium leading-[30px] text-vdao-dark md:mr-24 md:w-2/6'>
        Global ecosystem regeneration is a positive sum game: the more effort we put in, the more we benefit.
        <br />
        <br />
        Regardless of our political views, lifestyle or opinions, we can all agree that regenerating degraded ecosystems
        is both neccessary and worthwhile.
      </div>
    </Section>
  )
}
