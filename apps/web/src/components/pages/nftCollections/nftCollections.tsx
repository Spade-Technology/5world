import Description from '~/components/misc/description'
import HowItWorks from '~/components/misc/howItWorks'
import groupImage from 'public/illustrations/nftCollections/groupImage.svg'

const NFTCollections = () => {
  return (
    <div className='w-screen bg-vdao-deep'>
      <Description
        invertColors={true}
        title={
          <div>
            NFT
            <br />
            Collections
          </div>
        }
        description={
          <div className='font-body text-[26px] font-medium'>
            VDAO exists at the intersection of technology, research, art and imagination. Our community is laser focused
            on regenerating our planet via grass-roots innovation.
            <br />
            <br />
            Each NFT collection released by VDAO is a unique curation by members. VDAO NFTs invite us to imagine what
            life will be like when our goal of global ecosystem regeneration is achieved.
          </div>
        }
      />

      <HowItWorks
        contents={[
          {
            heading: ['How it works'],
            image: groupImage,
            content:
              'Participating in a VDAO NFT auction is not only a chance to show your financial support for this mission, but also gives exclusive access to the wider VDAO ecosystem, including real-world learning opportunities and events.',
            button: 'Comming Soon',
          },
        ]}
        className='md:pb-[140px]'
      />
    </div>
  )
}

export default NFTCollections
