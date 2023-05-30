import Description from '~/components/misc/description'

export const DonateDescription = () => {
  return (
    <Description
      invertColors={true}
      title={<div className='pr-[23px] '>Donate</div>}
      description={
        <div className='font-body text-[26px] font-medium'>
          Support VDAO’s mission to <br /> regenerate our planet.
        </div>
      }
    />
  )
}

export default DonateDescription
