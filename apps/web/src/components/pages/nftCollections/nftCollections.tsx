import Description from '~/components/misc/description'
// import HowItWorks from '~/components/misc/howItWorks'
import groupImage from 'public/illustrations/nftCollections/groupImage.svg'
import HowItWorks from './howItWorks'

const NFTCollections = () => {
  return (
    <div className='w-screen bg-vdao-deep'>
      <Description
        invertColors={true}
        propsClass={'!max-w-[1068px] !md:gap-5'}
        title={
          <div className='w-[280px] font-heading text-[44px] font-medium leading-[48px] text-vdao-light md:w-[250px] md:text-[60px] md:leading-[60px] lg:w-[553px] lg:text-[80px] lg:leading-[95px]'>
            NFT Collections
          </div>
        }
        description={
          <div className='w-full font-body text-[26px] font-medium leading-[30px] md:max-w-[488px]'>
            VDAO exists at the intersection of technology, research, art and imagination. Our community is laser focused on regenerating our planet via grass-roots innovation.
            <br />
            <br />
            Each NFT collection released by VDAO is a unique curation by members. VDAO NFTs invite us to imagine what life will be like when our goal of global ecosystem regeneration is achieved.
          </div>
        }
      />

      {/* <HowItWorks
        contents={[
          {
            heading: ['How it works'],
            image: groupImage,
            content:
              'Participating in a VDAO NFT auction is not only a chance to show your financial support for this mission, but also gives exclusive access to the wider VDAO ecosystem, including real-world learning opportunities and events.',
            button: 'Comming Soon',
          },
        ]}
        className='max-w-[865px] md:pb-[140px]'
      /> */}

      <HowItWorks />
    </div>
  )
}

export default NFTCollections
