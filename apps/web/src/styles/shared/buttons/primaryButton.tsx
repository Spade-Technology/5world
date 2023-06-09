type ButtonProps = {
  text: string
  className?: string
  onClick?: any
}

const PrimaryButton = (props: ButtonProps) => {
  return (
    <div
      className={`w-fit cursor-pointer rounded-md bg-vdao-light px-9 py-1.5 font-heading text-xl font-medium text-vdao-dark md:py-[5px] md:px-[35px]  ${props.className}`}
      onClick={() => props.onClick && props.onClick()}
    >
      {props.text}
    </div>
  )
}

export default PrimaryButton
