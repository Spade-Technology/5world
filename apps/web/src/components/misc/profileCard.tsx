import Image from 'next/image'
import { Null_Address } from '~/utils/config'
import { shortenAddress, shortenText } from '~/utils/helpers'

type CardProps = {
  icon?: any
  name?: string
  address?: string
}

const ProfileCard = ({ icon, name, address }: CardProps) => {
  return (
    <div className='flex w-full pt-[14px]'>
      <div>
        {icon ? (
          <Image src={icon} alt='' className='rounded-full' />
        ) : (
          <div
            className='rounded-full'
            style={{
              background: 'linear-gradient(221.35deg, #36DFAE 0%, #28B6A5 36.46%, #1D555C 100%)',
              width: '44px',
              height: '44px',
            }}
          />
        )}
      </div>

      <div className='pl-[10px] md:pl-[16px]'>
        <div className='font-body text-lg font-semibold'>
          {name ? shortenText(name) : 'Unnamed'}
        </div>
        <div className='font-body text-sm'>{address ? shortenAddress(address) : shortenAddress(Null_Address)}</div>
      </div>
    </div>
  )
}

export default ProfileCard
