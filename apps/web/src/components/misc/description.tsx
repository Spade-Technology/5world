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
      className={`${containerClass} mx-auto max-w-[1320px] px-0  md:flex-row md:gap-14 md:px-6 ${
        props.invertColors ? 'bg-vdao-deep text-white' : ''
      }`}
    >
      <h1
        className={`${titleClass} font-medium text-vdao-dark md:text-8xl ${
          props.invertColors ? 'text-vdao-light' : ''
        }`}
      >
        {props.title}
      </h1>
      <div className={`${descriptionClass} md:pt-24`}> {props.description} </div>
    </div>
  )
}

export default Description
