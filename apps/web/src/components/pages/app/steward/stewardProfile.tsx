import { Section } from '~/components/layout/section'
import Description from '~/components/misc/description'
import HowItWorks from '~/components/misc/howItWorks'

const StewardProfile = () => {
  return (
    <Section className='w-screen bg-vdao-deep'>
      <Description
        invertColors={true}
        title={
          <div>
            Steward
            <br />
            Profile
          </div>
        }
        description={<div className='font-body text-[26px] font-medium'>Stewards are leaders within the community who are strongly aligned with the DAO’s vision and mission.</div>}
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
