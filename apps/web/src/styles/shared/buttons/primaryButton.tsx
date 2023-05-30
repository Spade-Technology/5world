type ButtonProps = {
  text: string
  className?: string
  onClick?: any
}

const PrimaryButton = (props: ButtonProps) => {
  return (
    <div
      className={`clash w-fit cursor-pointer rounded-md bg-vdao-light px-9 font-medium text-vdao-dark  md:px-[35px]  ${props.className}`}
      onClick={() => props.onClick && props.onClick()}
    >
      {props.text}
    </div>
  )
}

export default PrimaryButton
