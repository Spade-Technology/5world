import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Null_Address } from '~/utils/config'
import { shortenAddress, shortenText } from '~/utils/helpers'

type CardProps = {
  icon?: any
  name?: string
  address?: string
  edit?: boolean
  nameLength?: number
}

const ProfileCard = ({ icon, name, address, edit, nameLength }: CardProps) => {
  const [selected, setSelected] = useState(false)
  const handleOnchange = (evt: any) => {
    console.log('handleOnchange', evt.target.value)
  }

  useEffect(() => {
    if (!edit) {
      setSelected(false)
    }
  }, [edit])
  return (
    <div className={`${edit && 'cursor-pointer'} flex w-full pt-[14px]`} onClick={() => edit && setSelected(!selected)}>
      {edit && (
        <div className={`relative my-auto mx-3 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-[1px] border-vdao-dark px-3`}>
          <div className={`absolute top-[-1px] left-0 z-10 h-6 w-6 scale-0 rounded-full border-[1px] border-vdao-dark bg-vdao-light duration-200 ${selected ? '!scale-100 ' : ''}`}></div>
        </div>
      )}

      <div className='my-auto'>
        {icon ? (
          <Image src={icon} alt='' height={44} width={44} className='rounded-full' />
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
        <div className='font-body text-lg font-semibold'>{name ? shortenText(name, nameLength ? nameLength : 15) : 'Unnamed'}</div>
        <div className='font-body text-sm'>{address ? shortenAddress(address) : shortenAddress(Null_Address)}</div>
      </div>
    </div>
  )
}

export default ProfileCard
