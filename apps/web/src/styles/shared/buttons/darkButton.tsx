type ButtonProps = {
  text: string
  className?: string
}

const DarkButton = (props: ButtonProps) => {
  return <div className={`h-fit w-fit cursor-pointer rounded-md bg-vdao-dark px-9 text-[20px] text-white ${props.className} px-[35px] py-[5px]`}>{props.text}</div>
}

export default DarkButton
