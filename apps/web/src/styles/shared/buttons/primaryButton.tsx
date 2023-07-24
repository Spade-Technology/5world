import { Spin } from 'antd'
import Image from 'next/image'

type ButtonProps = {
  text: string
  className?: string
  spanClass?: string
  onClick?: any
  icon?: any
  dropDown?: boolean
  disabled?: boolean
  loading?: boolean
}

export const DropdownPrimaryButton = ({ text, className, onClick, icon, dropDown, loading = false, disabled }: ButtonProps) => {
  return (
    <div
      className={` w-fit cursor-pointer rounded-md bg-vdao-light px-9 py-1.5 font-heading text-xl font-medium text-vdao-dark md:py-[5px] md:px-[35px] ${
        (loading || disabled) && 'cursor-not-allowed opacity-80'
      } ${className}`}
      onClick={() => onClick && !loading && !disabled && onClick()}
    >
      <div className={`mx-auto flex gap-1 ${dropDown ? 'flex-row-reverse justify-between' : ''}`}>
        {icon && <Image src={icon} alt='icon' className={dropDown ? 'my-auto h-4 w-4' : ''} />}
        {text}
        {loading && <Spin className='!mr-3 !mt-1' spinning={true} />}
      </div>
    </div>
  )
}

const PrimaryButton = ({ text, className, spanClass, onClick, icon, dropDown, disabled, loading }: ButtonProps) => {
  return (
    <div className={`w-fit rounded-md ${disabled ? 'bg-white border-vdao-dark border-[1px]' : 'cursor-pointer bg-vdao-light'} ${className} `} onClick={() => onClick && !disabled && !loading && onClick()}>
      <span
        className={`mx-auto ${spanClass} flex w-full justify-center gap-1 px-9 py-1.5 font-heading text-xl font-medium !text-vdao-dark md:py-[5px] md:px-[35px] ${
          dropDown ? 'flex-row-reverse !justify-between' : '' + loading ? 'opacity-80' : ''
        }`}
      >
        {loading && <Spin className='!mr-3 !mt-1' spinning={true} />}
        {icon && <Image src={icon} alt='icon' className={dropDown ? 'my-auto h-4 w-4' : ''} />}
        {text}
      </span>
    </div>
  )
}

export default PrimaryButton
