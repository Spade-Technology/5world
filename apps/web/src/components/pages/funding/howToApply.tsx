import PrimaryButton from '~/styles/shared/buttons/primaryButton'

const HowToApply = () => {
  return (
    <div className='bg-vdao-deep '>
      <div className='mx-auto flex max-w-[1280px] flex-col  justify-between gap-11 px-6 py-16 font-body text-white lg:flex-row lg:gap-10 lg:py-24 lg:px-24 '>
        <div className='flex-1'>
          <div className='font-heading text-[32px] font-medium text-vdao-light md:text-[46px]'>Funding Schedule</div>
          <div className='mt-8 font-heading text-[26px] font-medium md:mt-12 md:text-3xl'>Grants Round 1</div>
          {[
            'Application opens: q2 2023',
            'Application deadline: q3, 2022',
            'Application shortlist: q3 2022',
            'Voting begins: q3 2023',
            'Grants Awarded: q3 2023',
          ].map((name, index) => {
            return (
              <div className='pt-3 font-heading text-xl font-medium leading-[24px] md:pt-6 md:font-body md:text-[26px]'>
                {name}
              </div>
            )
          })}
        </div>
        <div className='flex-1'>
          <div className='font-heading text-[32px] font-medium text-vdao-light md:text-[46px]'>How to Apply</div>
          <div className='mt-8 font-heading text-[26px] font-medium md:mt-12 md:mt-12 md:text-3xl'>Step 1</div>
          <div className='pt-5 font-body text-[22px] font-normal font-light leading-[26px] md:pt-6'>
            Check your project meets our basic{' '}
            <a
              href=''
              target='_blank'
              className='border-b-2 font-inter text-[24px]   font-bold leading-[29.1px] text-white'
            >
              eligibility criteria.
            </a>
          </div>

          <div className='mt-12 font-heading text-[26px] font-medium md:mt-12 md:text-3xl'>Step 2</div>
          <div className='pt-5 font-body text-[22px] font-normal font-light leading-[26px] md:pt-6'>
            Complete our{' '}
            <a
              href=''
              target='_blank'
              className='border-b-2 font-inter text-[24px]  font-bold leading-[29.1px] text-white'
            >
              application tutorial
            </a>{' '}
            to ensure you have the web3 tools and knowledge you need.
          </div>

          <div className='mt-12 font-heading text-[26px] font-medium md:mt-12 md:text-3xl'>Step 3</div>
          <div className='pt-5 font-body text-[22px] font-normal font-light leading-[26px] md:pt-6'>
            Sign in to our grants application portal and submit your proposal.
          </div>

          <PrimaryButton text='Grants Application Portal' className='my-10' />

          <div className='pt-5 font-body text-lg font-normal font-light leading-[22px] md:pt-[63px]'>
            For additional information please contact us @vdao_regen on Twitter or join our Discord Community!
          </div>

          <div className='pt-[24px] font-body text-lg font-normal font-light leading-[22px] md:pt-6'>
            VDAO grants rounds take place every quarter. Sign up to our mailing list to keep updated on our next
            available round.
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowToApply
