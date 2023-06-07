import Description from '~/components/misc/description'

export const GetFundingDescription = () => {
  return (
    <Description
      title={
        <div className='w-[432px] font-heading text-[44px] font-medium leading-[95px] text-vdao-dark md:text-[80px]'>
          Get Funding
        </div>
      }
      description={
        <div className='w-full font-body text-[26px] font-medium leading-[30px] md:w-[557px]'>
          VDAO welcomes all funding proposals that align with its vision and mission of regenerating our planet through
          systems thinking, research, and innovation.
        </div>
      }
    />
  )
}

export default GetFundingDescription
