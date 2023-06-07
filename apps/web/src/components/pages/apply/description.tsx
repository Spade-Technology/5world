import Description from '~/components/misc/description'

export const ApplyDescription = () => {
  return (
    <Description
      title={
        <div className='w-[342px] font-heading text-[44px] font-medium leading-[42px] text-vdao-dark md:w-[526px] md:text-[80px] md:leading-[95px]'>
          Apply to Join VDAO
        </div>
      }
      description={
        <div className='w-full font-body text-[26px] font-medium leading-[30px] md:w-[557px]'>
          The DAO invites members who share our core values and are passionate about restoring our planet. We're looking
          for contributors with skills and experience in key areas such as:
        </div>
      }
    />
  )
}

export default ApplyDescription
