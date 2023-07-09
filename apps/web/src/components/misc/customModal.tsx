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
  canExit?: boolean
}

const CustomModal = ({ show, close, children, heading, modalMarginTop, padding, removeCloseIcon, externalStyle, canExit = true }: ModalProps) => {
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
      <div className={`absolute -z-10 h-full w-full bg-black bg-opacity-60 backdrop-blur-sm backdrop-opacity-0 transition-all ${show && 'backdrop-opacity-100'}`} onClick={canExit && close} />

      <div
        className={`${modalMarginTop ? modalMarginTop : 'md:my-[100px]'} ${externalStyle} ${
          padding ? padding : 'p-6 md:p-[30px] md:pl-[50px]'
        } hide-scrollbar  h-auto max-h-[1000px] max-w-[390px] overflow-auto rounded-[20px]  bg-white md:max-h-[1000px] md:max-w-[1140px]`}
      >
        <div className='flex justify-between'>
          <div>{heading && <div className='pt-5 font-heading text-[26px] font-medium text-vdao-dark md:text-3xl'>{heading}</div>}</div>

          {!removeCloseIcon && canExit && (
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
