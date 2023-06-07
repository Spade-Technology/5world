type ButtonProps = {
  text: string
  className?: string
}

const WhiteButton = (props: ButtonProps) => {
  return (
    <div className={`w-fit cursor-pointer rounded-md bg-white px-9 text-vdao-dark  ${props.className}`}>
      {props.text}
    </div>
  )
}

export default WhiteButton
