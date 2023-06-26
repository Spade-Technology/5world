import { Section } from '~/components/layout/section'
import Description from '~/components/misc/description'
import HowItWorks from '~/components/misc/howItWorks'

const StewardProfile = () => {
  return (
    <Section className='w-screen bg-vdao-deep'>
      <Description
        invertColors={true}
        propsClass={'md:!gap-0 md:!px-0 md:w-fit'}
        title={
          <div className='w-[342px] font-heading text-[44px] font-medium leading-[48px] text-vdao-light md:w-[400px] md:text-[60px] md:leading-[60px] lg:w-[553px] lg:text-[80px] lg:leading-[95px]'>
            Steward Profile
          </div>
        }
        description={
          <div className='mr-auto w-full font-body text-[26px] font-medium leading-[30px] md:w-full md:max-w-[444px]'>
            Stewards are leaders within the community who are strongly aligned with the DAO’s vision and mission.
          </div>
        }
      />

      <HowItWorks
        contents={[
          {
            heading: ['How it works'],
            content: (
              <div>
                There are six steward positions (one from each guild and two from the core DAO community) and each term lasts 180 days before a new election.
                <br />
                <br />
                The primary role of the DAO Stewards is to support the growth of the DAO and engage consistently in DAO voting via delegation.
                <br />
                <br />
                This page provides details of each DAO steward and tracks their contributions within the DAO over time.
                <br />
                <br />
                Members can also use the delegation facilitaty on this page to enable Stewards to vote on their behalf.
              </div>
            ),
          },
        ]}
        className='md:pb-[140px]'
      />
    </Section>
  )
}

export default StewardProfile
