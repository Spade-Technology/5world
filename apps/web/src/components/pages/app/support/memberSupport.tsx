import { Section } from '~/components/layout/section'
import Description from '~/components/misc/description'

const MemberSuport = () => {
  return (
    <Section className='w-screen bg-vdao-deep'>
      <Description
        invertColors={true}
        propsClass={'!max-w-[1055px] !md:gap-5'}
        title={
          <div className='w-[342px] font-heading text-[44px] font-medium leading-[48px] text-vdao-light md:w-[400px] md:text-[60px] md:leading-[60px] lg:w-[553px] lg:text-[80px] lg:leading-[95px]'>
            Member Support
          </div>
        }
        description={
          <div className='w-full font-body text-[26px] font-medium leading-[30px] md:w-full md:max-w-[457px]'>
            If you require any support please raise a ticket using the form below or visit the discord help page.
          </div>
        }
      />
    </Section>
  )
}

export default MemberSuport
