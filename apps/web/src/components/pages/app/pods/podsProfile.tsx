import { useSession } from 'next-auth/react'
import { redirect } from 'next/dist/server/api-utils'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useState } from 'react'
import { Section } from '~/components/layout/section'
import Description from '~/components/misc/description'
import HowItWorks from '~/components/misc/howItWorks'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'
import PurpleButton from '~/styles/shared/buttons/purpleButton'

type Props = {
  setOpenCreatePod: Dispatch<SetStateAction<boolean>>
}

const PodsProfile = ({ setOpenCreatePod }: Props) => {
  const { data: siwe } = useSession()
  const router = useRouter()

  return (
    <Section className='w-screen bg-vdao-deep'>
      <Description
        invertColors={true}
        propsClass={'!max-w-[1132px] !md:gap-5'}
        title={
          <div className='w-[342px] flex-col font-heading text-[44px] font-medium leading-[48px] text-vdao-light md:!w-[280px] md:text-[60px] md:leading-[60px] lg:w-[553px] lg:text-[80px]  lg:leading-[95px] '>
            <div className=''>Pods</div>
            <div className=''>Profile</div>
          </div>
        }
        description={
          <div className='w-full font-body text-[26px] font-medium leading-[30px] md:w-full md:max-w-[557px]'>
            As the smallest units of organisation within the DAO, Pods form around specific focus areas to achieve specific outcomes. These are spaces for discussion, collaboration and advancement of
            specific areas of work.
            <br />
            <br />
            They can be described as ‘two pizza teams’ - small autonomous teams that come together with a specific purpose and common objective, or to collaborate more informally. Pod size must not
            exceed ten members.
          </div>
        }
      />

      <div className='flex flex-col md:flex-row '>
        <div className='flex-1'></div>
        <div className='mt-[30px] flex flex-1 flex-col gap-5 pl-6 md:mt-0 md:flex-row md:pl-16'>
          <PrimaryButton text='Create Pods' onClick={() => (siwe ? setOpenCreatePod(true) : router.push('/app/pods/#restrictedContent'))} className='py-[5px] px-[35px] text-xl' />
          <div className='w-fit cursor-pointer rounded-[5px] border-2 border-white py-[5px] px-[35px] text-xl text-white'>
            <Link href={siwe ? '/app/pods/#currentPods' : '/app/pods/#restrictedContent'}>See all Pods </Link>
          </div>
        </div>
      </div>

      <div className={`mx-auto flex max-w-[767px] bg-vdao-deep px-6 py-16 text-white md:gap-[67px] md:py-20 md:pt-[140px] md:pb-[70px] `}>
        <div className='w-[243px]'>
          <span className='mr-5 font-heading text-3xl font-medium underline underline-offset-8 md:text-4xl'>Four Stages of Pods</span>
        </div>
        <div className='flex flex-1'>
          {/* left */}
          <div className='mr-6 flex flex-col'>
            {/* step 1 */}
            <div className='z-10 h-5 w-5 rounded-full bg-vdao-light md:h-8 md:w-8' />

            {/* step 2 */}
            <div className={`mx-auto h-56 w-[2px] scale-110 rounded-full bg-white md:h-44 `} />

            <div className={`z-10 h-5 w-5 rounded-full bg-vdao-light md:h-8 md:w-8`} />

            {/* step 3 */}
            <div className={`mx-auto h-36 w-[2px] scale-110 rounded-full bg-white md:h-32 `} />
            <div className={`z-10 h-5 w-5 rounded-full bg-vdao-light md:h-8 md:w-8`} />

            {/* step 4 */}
            <div className={`mx-auto h-40 w-[2px] scale-110 rounded-full bg-white `} />
            <div className={`z-10 h-5 w-5 rounded-full bg-vdao-light md:h-8 md:w-8`} />
          </div>
          {/* right */}
          <div className='flex flex-col justify-between '>
            {/* step 1 */}
            <div className='font-body font-normal'>
              <div className='font-heading text-2xl font-medium md:text-3xl'>1. Informal</div>
              <div className='max-w-[380px] pt-5 text-lg md:pt-4'>
                {' '}
                Pod has been formed around a specific focus area but has not made a formal governance proposal. (Pods can remain indefinitely in this stage if they choose).{' '}
              </div>
            </div>
            {/* step 2 */}
            <div className='pt-10 font-body font-normal md:pt-12'>
              <div className='font-heading text-2xl font-medium md:text-3xl'>2. Proposal Stage</div>
              <div className='max-w-[380px] pt-5 text-lg md:pt-4'>Pod has made a proposal and is in discussions with the wider community.</div>
            </div>
            {/* step 3 */}
            <div className='pt-10 font-body font-normal md:pt-12'>
              <div className='font-heading text-2xl font-medium md:text-3xl'>3. Active</div>
              <div className='max-w-[380px] pt-5 text-lg md:pt-4'>Pod proposal has been ratified by governance and Pod is working to achieve agreed outcomes.</div>
            </div>
            {/* step 4 */}
            <div className='pt-10 font-body font-normal md:pt-12'>
              <div className='font-heading text-2xl font-medium md:text-3xl'>4. Archived</div>
              <div className='max-w-[380px] pt-5 text-lg md:pt-4'>Pod’s work has concluded.</div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default PodsProfile
