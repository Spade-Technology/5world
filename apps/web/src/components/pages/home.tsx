import { Button } from 'antd'

import Image, { StaticImageData } from 'next/image'

import CommunityHeroMobile from 'public/illustrations/home/PNG/VDAO-home-community.svg'
import CommunityHero from 'public/illustrations/home/PNG/VDAO-home-community.png'
import WelcomeHero from 'public/illustrations/home/PNG/VDAO-home-hero.png'
import IntroHero from 'public/illustrations/home/PNG/VDAO-home-intro.png'

import CreateIcon from 'public/icons/home/VDAO-icon-home-create.svg'
import FundRaiseIcon from 'public/icons/home/VDAO-icon-home-fundraise.svg'
import ImagineIcon from 'public/icons/home/VDAO-icon-home-imagine.svg'
import InnovateIcon from 'public/icons/home/VDAO-icon-home-innovate.svg'

import VDAOGetInvolved from 'public/illustrations/home/PNG/VDAO-get-involved.png'

import FifthworldLogo from 'public/thirdparty/5world.png'
import ConsensysLogo from 'public/thirdparty/consensys.png'
import DecentralandLogo from 'public/thirdparty/decentraland.png'
import DiscoLogo from 'public/thirdparty/disco.png'
import EtheraLogo from 'public/thirdparty/ethera.png'
import InfuraLogo from 'public/thirdparty/infura.png'
import PalmLogo from 'public/thirdparty/palm.png'
import PleasrDaoLogo from 'public/thirdparty/pleasrdao.png'
import PleasrHouseLogo from 'public/thirdparty/pleasrHouse.png'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'
import { Section } from '../layout/section'

export function HomeCTAComponent() {
  return (
    <Section className='flex flex-col items-center bg-gradient-to-r from-vdao-light to-vdao-dark px-6 py-[64px] md:py-[100px] md:px-8 xl:px-0'>
      <div className='text-center font-heading text-[36px] font-medium text-white md:text-[46px]'>Ready to Join?</div>
      <div className='mt-5 w-full max-w-3xl text-center font-body font-body text-[22px] leading-[26px] text-white md:mt-[25px] md:text-[26px] md:leading-[30px]'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi turpis mi, faucibus vitae elementum id, tristique at lectus.
      </div>
      <PrimaryButton text=' Apply Now' className=' mx-auto mt-[36px] mr-auto bg-vdao-light md:mt-[62px]' />
    </Section>
  )
}

export function HomePartnersComponent() {
  return (
    <Section className='overflow-hidden px-6 text-vdao-dark md:px-8 xl:px-0'>
      <div className='mx-auto flex max-w-[1280px] flex-col md:flex-row'>
        <div className='mt-24 max-w-[1280px] md:mx-auto md:w-1/2 '>
          <div className='mb-6 w-full text-left font-heading text-[32px] font-medium text-vdao-dark md:text-[46px]'>Our Partners</div>
          <div className='leading[26px] max-w-sm font-body text-[22px] font-medium text-vdao-dark md:text-[26px] md:leading-[30px]'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit morbi turpis mi.
          </div>
        </div>
        <div className='mx-auto mt-10 mb-16 grid w-full scale-95 grid-flow-col grid-cols-2 grid-rows-5 gap-20 opacity-70 md:mt-28 md:mb-0 md:scale-75 md:grid-cols-3 md:grid-rows-3'>
          <Image src={FifthworldLogo} alt='VDAO' className='w-full' />
          <Image src={ConsensysLogo} alt='VDAO' className='w-full' />
          <Image src={DecentralandLogo} alt='VDAO' className='w-full' />
          <Image src={DiscoLogo} alt='VDAO' className='w-full' />
          <Image src={EtheraLogo} alt='VDAO' className='w-full' />
          <Image src={InfuraLogo} alt='VDAO' className='w-full' />
          <Image src={PalmLogo} alt='VDAO' className='w-full' />
          <Image src={PleasrDaoLogo} alt='VDAO' className='w-full' />
          <Image src={PleasrHouseLogo} alt='VDAO' className='w-full' />
        </div>
      </div>
    </Section>
  )
}

export function HomeCommunityComponent() {
  return (
    <Section className='relative mt-10 bg-vdao-dark px-6 text-vdao-light '>
      <div className='relative mx-auto flex max-w-[1440px] flex-col md:pb-48 '>
        <div className='z-10 mt-24'>
          <div className='mb-4 font-heading text-[32px] font-medium md:mb-6 md:ml-9 md:text-[46px] lg:ml-[94px]'>Community</div>
          <div className='md:font-satoshi font-heading text-[22px] font-medium text-white md:ml-9 md:text-[26px] lg:ml-[94px]'>The VDAO Community is:</div>
        </div>
        <div className='mt-12 flex flex-col-reverse md:flex-row'>
          <div className='z-10 mb-[463px] grid gap-12 md:ml-[40%] md:mb-0 md:grid-cols-2 md:gap-0 lg:ml-[40%]'>
            <div className='flex  flex-col gap-4 md:w-9/12'>
              <div className='font-body text-[26px] font-medium md:font-heading md:text-3xl'>Apolitical</div>
              <div className='font-body text-lg font-normal leading-[22px] text-white'>
                We welcome members from all walks of life and political beliefs if they are aligned with the DAO’s core values and mission.
              </div>
            </div>
            <div className='flex flex-col gap-4  md:w-10/12 lg:w-9/12'>
              <div className='font-body text-[26px] font-medium md:font-heading md:text-3xl'>Curious</div>
              <div className='font-body text-lg font-normal leading-[22px] text-white'>
                We exist at the bleeding edge of regenerative agriculture innovation, creating global networks that can bring about a new era of modern agriculture.
              </div>
            </div>
            <div className='flex flex-col gap-4 md:mt-10 md:w-10/12 lg:w-9/12'>
              <div className='font-body text-[26px] font-medium md:font-heading md:text-3xl'>Positive</div>
              <div className='font-body text-lg font-normal leading-[22px] text-white'>We believe that with focus and collective effort, the world's ecosystems can and will be regenerated.</div>
            </div>

            <div className='flex flex-col gap-4 md:mt-10 md:w-10/12 lg:w-9/12'>
              <div className='font-body text-[26px] font-medium md:font-heading md:text-3xl'>Engaged</div>
              <div className=' font-body text-lg font-normal leading-[22px] text-white'>We contribute to regenerative agriculture conversations, developing a vibrant learning culture.</div>
            </div>
          </div>
        </div>
        <div className=' absolute bottom-0 left-0 hidden h-3/6 w-6/12 bg-[url(/illustrations/home/SVG/illusratoin04.svg)] bg-cover bg-bottom bg-no-repeat md:block lg:h-5/6' />
      </div>
      <div className='sm:bg-fit absolute bottom-0 left-0 h-[463px] w-full bg-[url(/illustrations/home/SVG/04_community_illo_nobackground_v011.svg)] bg-cover bg-bottom bg-no-repeat md:hidden' />
    </Section>
  )
}

export function HomeGetInvolvedComponent() {
  return (
    <Section className='my-[94px] flex max-w-[1440px] flex-col lg:mx-auto'>
      <div className='mb-[21px] ml-6 font-heading text-[32px] font-medium md:ml-9 md:text-[46px] lg:ml-[94px]'>Get Involved</div>
      <div className='flex flex-col md:flex-row md:items-start md:gap-9'>
        <div className='w-full md:w-1/2 '>
          <div className='ml-6 w-[253px] font-body text-[22px] font-medium leading-[26px] text-vdao-dark md:ml-9 md:w-auto md:text-[26px] lg:ml-[94px]'>Support VDAOs mission in 3 ways:</div>
          <Image src={VDAOGetInvolved} alt='VDAO' className='mt-12 mb-10 w-full md:mt-20 md:mb-0' />
        </div>
        <div className='flex flex-col gap-16 px-6 md:w-1/2 md:px-0 md:pr-5 lg:w-1/3'>
          {[
            {
              title: 'NFT Collections',
              text: 'Participate in our NFT auction for an opportunity to fund regenerative agriculture innovation, own a unique piece of art, and access real-world learning opportunities and events.',
              btn: 'Learn More',
            },
            {
              title: 'Donate',
              text: '    Donate directly to the VDAO treasury to receive an exclusive on-chain badge that highlight’s your impact and unlocks access to quadratic voting in future grants rounds.',
              btn: 'Donate Now',
            },
            {
              title: 'Coordinate',
              text: ' Apply now to become a core member of the VDAO community, pledging your time and support towards our mission of global ecosystem regeneration.',
              btn: 'Apply Now',
            },
          ].map(({ title, text, btn }, index) => {
            return (
              <div className='flex flex-col' key={index}>
                <div className='mb-[21px] font-heading text-[26px] font-medium text-vdao-dark md:text-3xl'>{title}</div>
                <div className='w-11/12 font-body text-lg font-normal leading-[22px] text-vdao-dark'>{text}</div>
                <PrimaryButton text={btn} className=' mt-8 mr-auto' />
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}

const ObjectiveSubComponent = ({ icon, title, description }: { icon: StaticImageData; title: string; description: string }) => (
  <div className='flex w-full w-10/12 flex-col items-center gap-5 md:items-start'>
    <Image src={icon} alt='VDAO' height={100} />
    <div className='font-heading text-3xl font-medium'>{title}</div>
    <div className='w-full border-y-[1px] border-vdao-dark' />
    <div className='text-center font-inter text-base font-normal leading-5 text-vdao-dark md:text-left md:font-body md:text-lg'>{description}</div>
  </div>
)

export function HomeObjectivesComponent() {
  return (
    <Section className='xl:p-O md:lg-14 mx-auto mt-[94px] flex max-w-[1440px] flex-col p-0 md:px-16'>
      <div className='ml-6 w-full font-heading text-[32px] font-medium md:text-center md:text-[46px]'>Core Objectives</div>
      <div className='mx-auto mt-16 flex flex-col gap-14 px-16 md:flex-row md:gap-10 md:px-0 lg:px-16'>
        <ObjectiveSubComponent
          icon={InnovateIcon}
          title='Innovate'
          description='We provide grants to researchers, research initiatives and individuals working in and around the field of regenerative agriculture.'
        />
        <ObjectiveSubComponent
          icon={FundRaiseIcon}
          title='Fundraise'
          description="We provide opportunities for individuals and institutions to donate to meaningful research initiatives and R&D that will regenerate the world's ecosystems."
        />
        <ObjectiveSubComponent
          icon={CreateIcon}
          title='Create'
          description='We are thought leaders within regenerative agriculture conversations, producing content that clearly communicates our vision, mission and the impact of the projects we support.'
        />
        <ObjectiveSubComponent
          icon={ImagineIcon}
          title='Imagine'
          description='Our art and our vision helps others to experience how the world might look and feel once VDAO’s core mission is achieved.'
        />
      </div>
    </Section>
  )
}

export function HomeIntroComponent() {
  return (
    <Section className='mx-auto mt-[94px] grid max-w-[1440px] flex-col-reverse items-center gap-5 md:grid-cols-2 md:px-6'>
      <div className='z-10 flex w-11/12 flex-col px-6'>
        <div className='font-heading text-[32px] font-medium text-vdao-dark md:text-[46px] '>Introduction</div>
        <div className='mt-[21px] font-body text-lg font-normal leading-[22px] text-vdao-dark md:mt-9'>
          VDAO funds regenerative agriculture research and development (R&D) projects worldwide.
          <div className='my-5' />
          Regenerative land management uses techniques and practices to restore soil, biodiversity, ecosystems, and water quality; techniques used in farming for centuries, but recently replaced by
          chemical, industrial alternatives.
          <div className='my-5' />
          VDAO empowers us to dream of fully regenerated planet. Using cutting-edge Web3 tech, it connects artists, land stewards, funders, scientists, researchers, and innovators to collaborate for
          planetary regeneration.
        </div>
      </div>
      <Image width={'0'} height={'0'} src={'illustrations/home/SVG/illustraion02 (2).svg'} alt='VDAO' className='w-full  md:order-first md:hidden' />
      <Image src={IntroHero} alt='VDAO' className='hidden md:order-first md:block' />
    </Section>
  )
}

export function HomeWelcomeComponent() {
  return (
    <Section className='mx-auto flex max-w-[1440px] flex-col overflow-hidden md:overflow-visible'>
      <div className='mx-auto mt-28'>
        <div className='mx-auto w-10/12 text-center font-heading text-[44px] font-medium leading-[48px] text-vdao-dark md:w-auto md:text-[80px] md:leading-[95px]'>Re:imagine the future</div>
        <div className='mx-auto mt-5 w-[80%] px-6 text-center font-body text-[22px] font-medium leading-[26px] text-vdao-dark md:text-[26px]'>A dao to restore ecosystems from the soil up.</div>
        <PrimaryButton text='Join Us' className='mx-auto mt-10' />
      </div>
      <Image src={WelcomeHero} alt='VDAO' className='md:max-w-100 relative right-[5%] -z-10 mt-5 scale-[100%] md:mt-[20px]' />
    </Section>
  )
}
