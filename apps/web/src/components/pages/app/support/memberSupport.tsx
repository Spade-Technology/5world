import { Section } from '~/components/layout/section'
import Description from '~/components/misc/description'

const MemberSuport = () => {
  return (
    <Section className='w-screen bg-vdao-deep'>
      <Description
        invertColors={true}
        title={
          <div>
            Member
            <br />
            Support
          </div>
        }
        description={
          <div className='font-body text-[26px] font-medium'>
            If you require any support please raise a ticket using the form below or visit the discord help page.
          </div>
        }
      />
    </Section>
  )
}

export default MemberSuport
