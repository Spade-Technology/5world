import Description from '~/components/misc/description'

export const DonateDescription = () => {
  return (
    <Description
      invertColors={true}
      title={<div className='pr-[23px] text-[44px]'>Donate</div>}
      description={
        <div className='w-[439px] font-body text-[26px] font-medium leading-[30px]'>
          Support VDAO’s mission to regenerate our planet.
        </div>
      }
    />
  )
}

export default DonateDescription
