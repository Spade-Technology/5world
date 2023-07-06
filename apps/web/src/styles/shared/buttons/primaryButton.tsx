import Image from 'next/image'

type ButtonProps = {
  text: string
  className?: string
  onClick?: any
  icon?: any
  dropDown?: boolean
}

const PrimaryButton = ({ text, className, onClick, icon, dropDown }: ButtonProps) => {
  return (
    <div
      className={` w-fit cursor-pointer rounded-md bg-vdao-light px-9 py-1.5 font-heading text-xl font-medium text-vdao-dark md:py-[5px] md:px-[35px]  ${className}`}
      onClick={() => onClick && onClick()}
    >
      <div className={`mx-auto flex gap-1 ${dropDown ? 'flex-row-reverse justify-between' : ''}`}>
        {icon && <Image src={icon} alt='icon' className={dropDown ? 'my-auto h-4 w-4' : ''} />}
        {text}
      </div>
    </div>
  )
}

export default PrimaryButton
