type ButtonProps = {
  text: string
  className?: string
  onClick?: any
}

const PrimaryButton = (props: ButtonProps) => {
  return (
    <div
      className={`clash w-fit cursor-pointer rounded-md bg-vdao-light px-9 py-1.5 text-xl font-medium text-vdao-dark md:py-[5px] md:px-[35px] md:text-[26px]  ${props.className}`}
      onClick={() => props.onClick && props.onClick()}
    >
      {props.text}
    </div>
  )
}

export default PrimaryButton
