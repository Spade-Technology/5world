import Image from 'next/image'
import CloseIcon from 'public/icons/customModal/closeIcon.svg'
import { useEffect, useRef } from 'react'

type ModalProps = {
  show: boolean
  close: any
  children: any
  heading?: string
  modalMarginTop?: string
  padding?: string
  removeCloseIcon?: boolean
  externalStyle?: string
}

const CustomModal = ({ show, close, children, heading, modalMarginTop, padding, removeCloseIcon, externalStyle }: ModalProps) => {
  // const ref = useRef<HTMLInputElement>(null)

  // useEffect(() => {
  //   const muf = (e: any) => {
  //     if (ref.current && !ref.current.contains(e.target)) {
  //       close()
  //     }
  //   }
  //   document.addEventListener('mousedown', muf)
  // }, [ref])

  return (
    <div className={`fixed top-0 left-0 bottom-0 flex h-[100vh] w-[100vw] items-center justify-center transition-all ease-in-out ${show ? 'visible z-50 opacity-100' : 'invisible opacity-0'}`}>
      <div className={`absolute -z-10 h-full w-full bg-black bg-opacity-60 backdrop-blur-sm backdrop-opacity-0 transition-all ${show && 'backdrop-opacity-100'}`} onClick={close} />
      {/* <div
      className={`${
        show ? 'block' : 'hidden'
      } fixed top-0 left-0 z-50 mx-auto h-full w-full overflow-auto backdrop-brightness-50 `}
    > */}
      <div
        className={`${modalMarginTop ? modalMarginTop : 'md:my-[100px]'} ${externalStyle} ${
          padding ? padding : 'p-6 md:p-[30px] md:pl-[50px]'
        } hide-scrollbar  h-full overflow-auto bg-white md:max-h-[600px] md:max-w-[1140px] md:rounded-[20px] `}
        // ref={ref}
      >
        <div className='flex justify-between'>
          <div>{heading && <div className='pt-5 font-heading text-[26px] font-medium text-vdao-dark md:text-3xl'>{heading}</div>}</div>

          {!removeCloseIcon && (
            <Image
              src={CloseIcon}
              alt='close'
              className='float-right cursor-pointer'
              onClick={() => {
                close()
              }}
            />
          )}
        </div>

        {children}
      </div>
    </div>
  )
}

export default CustomModal
