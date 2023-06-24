import Description from '~/components/misc/description'

export const DonateDescription = () => {
  return (
    <Description
      invertColors={true}
      title={<div className='pr-[23px] text-[44px] md:text-[80px]'>Donate</div>}
      propsClass={'!max-w-[1019px] !max-w-full'}
      description={<div className='font-body text-[26px] font-medium leading-[30px] md:w-[439px]'>Support VDAO’s mission to create an innovation network that will regenerate planet earth.</div>}
    />
  )
}

export default DonateDescription
