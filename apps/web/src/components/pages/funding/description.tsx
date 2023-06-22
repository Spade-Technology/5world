import Description from '~/components/misc/description'

export const GetFundingDescription = () => {
  return (
    <Description
      title={<div className='mx-w-[300px] w-full font-heading text-[44px] font-medium text-vdao-dark md:w-[432px] md:text-[80px] md:leading-[95px]'>Get Funding</div>}
      description={
        <div className='w-full font-body text-[26px] font-medium leading-[30px] md:w-full lg:max-w-[557px]'>
          VDAO welcomes all funding proposals that align with its vision and mission of regenerating our planet through systems thinking, research, and innovation.
        </div>
      }
    />
  )
}

export default GetFundingDescription
