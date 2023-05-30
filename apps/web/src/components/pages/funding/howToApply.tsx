import PrimaryButton from '~/styles/shared/buttons/primaryButton'

const HowToApply = () => {
  return (
    <div className='bg-vdao-deep '>
      <div className='mx-auto flex max-w-[1280px] flex-col  justify-between gap-11 px-6 py-16 font-body text-white md:flex-row md:gap-10 md:py-24 md:px-24 '>
        <div className='flex-1'>
          <div className='font-heading text-4xl text-vdao-light md:text-5xl'>Funding Schedule</div>
          <div className='mt-8 font-heading text-2xl md:mt-12 md:text-3xl'>Grants Round 1</div>
          <div className='pt-3 text-xl md:pt-6 md:text-2xl'>Application opens: q2 2023</div>
          <div className='pt-3 text-xl md:pt-6 md:text-2xl'>Application deadline: q3, 2022</div>
          <div className='pt-3 text-xl md:pt-6 md:text-2xl'>Application shortlist: q3 2022</div>
          <div className='pt-3 text-xl md:pt-6 md:text-2xl'>Voting begins: q3 2023</div>
          <div className='pt-3 text-xl md:pt-6 md:text-2xl'>Grants Awarded: q3 2023</div>
        </div>
        <div className='flex-1'>
          <div className='font-heading text-4xl text-vdao-light md:text-5xl'>How to Apply</div>
          <div className='mt-8 font-heading text-2xl md:mt-12'>Step 1</div>
          <div className='pt-5 text-2xl font-light md:pt-6'>
            Check your project meets our basic{' '}
            <a href='' target='_blank' className='border-b-2 font-semibold text-white'>
              eligibility criteria.
            </a>
          </div>

          <div className='mt-12 font-heading text-2xl'>Step 2</div>
          <div className='pt-5 text-2xl font-light md:pt-6'>
            Complete our{' '}
            <a href='' target='_blank' className='border-b-2 font-semibold text-white'>
              application tutorial
            </a>{' '}
            to ensure you have the web3 tools and knowledge you need.
          </div>

          <div className='mt-12 font-heading text-2xl'>Step 3</div>
          <div className='pt-5 text-2xl font-light md:pt-6'>
            Sign in to our grants application portal and submit your proposal.
          </div>

          <PrimaryButton text='Grants Application Portal' className='my-10 py-1 text-xl' />

          <div className='pt-6 text-lg font-light'>
            For additional information please contact us @vdao_regen on Twitter or join our Discord Community!
          </div>

          <div className='pt-6 text-lg font-light'>
            VDAO grants rounds take place every quarter. Sign up to our mailing list to keep updated on our next
            available round.
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowToApply
