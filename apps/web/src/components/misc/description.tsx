type Props = {
  title?: JSX.Element
  description?: JSX.Element
  invertColors?: boolean
}

const Description = (props: Props) => {
  /** Common Styles for mobile and web */
  const containerClass = 'flex justify-items-end gap-8 text-lg px-6 md:px-0  md:py-16 flex-col font-normal'

  const titleClass = 'flex-1 text-5xl'

  const descriptionClass = 'flex-1 text-lg px-0.5'

  return (
    <div
      className={`${containerClass} mx-auto flex max-w-[1320px] flex-col  justify-center px-0 md:flex-row md:gap-[54px] md:px-6 ${
        props.invertColors ? 'bg-vdao-deep text-white' : ''
      }`}
    >
      <div
        className={`${titleClass} font-heading font-medium text-vdao-dark md:text-[80px] ${
          props.invertColors ? 'text-vdao-light' : ''
        }`}
      >
        {props.title}
      </div>
      <div className={`${descriptionClass} md:pt-24`}> {props.description} </div>
    </div>
  )
}

export default Description
