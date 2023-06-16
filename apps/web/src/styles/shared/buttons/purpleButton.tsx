type ButtonProps = {
  text: string
  className?: string
}

const PurpleButton = (props: ButtonProps) => {
  return <div className={`w-fit cursor-pointer rounded-md bg-vdao-purple px-[35px] text-vdao-dark ${props.className}`}>{props.text}</div>
}

export default PurpleButton
