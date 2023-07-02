type ButtonProps = {
  text: string
  className?: string
  onClick?: any
}

const PrimaryButton = (props: ButtonProps) => {
  return (
    <div className=''>
      <button className={`custom-btn btn-7 !w-fit cursor-pointer rounded-md bg-vdao-light hover:bg-white ${props.className}`} onClick={() => props.onClick && props.onClick()}>
        <span className='px-9 py-1.5 font-heading text-xl font-medium !text-vdao-dark md:py-[5px] md:px-[35px]'>{props.text}</span>
      </button>

      {/* <button className=''>
        <span>Read More</span>
      </button> */}
    </div>
  )
}

export default PrimaryButton
