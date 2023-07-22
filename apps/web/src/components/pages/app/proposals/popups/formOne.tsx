import PodImage from 'public/illustrations/pods/podImage.svg'
import Image from 'next/image'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'
import { Dispatch, SetStateAction, useState } from 'react'
import EllipseComponent from '~/components/misc/ellipseLine'

type FormProps = {
  setNextForm: Dispatch<SetStateAction<boolean>>
  title: string
  setTitle: Dispatch<SetStateAction<string>>
  description: string
  setDescription: Dispatch<SetStateAction<string>>
}

const FormOne = ({ title, setTitle, description, setDescription, setNextForm }: FormProps) => {
  const [error, setError] = useState(false)
  const nextHandler = () => {
    if (title && description) {
      setNextForm(true)
    } else {
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 2000)
    }
  }
  return (
    <div className='grid grid-cols-1 gap-11 pt-10 pb-[24px] font-body text-lg font-normal text-vdao-dark md:max-h-[760px] md:grid-cols-2 md:gap-[106px]'>
      <div>
        <EllipseComponent className='text-[22px] font-medium md:text-[26px]' text='Wallet Connected' />
        <EllipseComponent className='pt-5 text-[22px] font-medium md:text-[26px]' text='Correct chain selected' />
        <EllipseComponent className='pt-5 text-[22px] font-medium md:text-[26px]' text='You have 217 voting power' />

        <div className='mt-5 w-fit cursor-pointer rounded-[5px] bg-vdao-pink py-[5px] px-[35px] font-heading text-xl font-medium md:mt-[30px]'>Switch Wallet</div>
      </div>

      <div>
        <div className='text-[22px] font-bold'>Title</div>
        <div className='pt-[5px]'>You cannot change it after this step.</div>
        <input
          className={` mt-[17px] w-full rounded-[10px] border-[1px]  px-5 py-2 outline-none placeholder:text-opacity-80 md:mt-5
          ${error && !title ? 'border-red-600 placeholder:text-red-400' : 'border-vdao-dark'}`}
          placeholder={`${error && !title ? '* Required' : 'Proposal Title Goes Here.'} `}
          value={title}
          onChange={evt => setTitle(evt.target.value)}
        />

        <div className='pt-[30px] text-[22px] font-bold md:pt-10'>Description</div>
        <div className='pt-[5px]'>Your proposal description goes here.</div>
        <textarea
          className={` mt-[15px] h-[143px] w-full rounded-[10px] border-[1px] p-5 outline-none placeholder:text-opacity-80 md:mt-5 md:max-w-[510px]
          ${error && !description ? 'border-red-600 placeholder:text-red-400 ' : ' border-vdao-dark'}`}
          placeholder={`${
            error && !title ? '* Required' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus. Quisque nec tempus diam, sit amet luctus mi.'
          }`}
          value={description}
          onChange={evt => setDescription(evt.target.value)}
        />

        <div className='pt-5 pb-1 md:pt-[35px]'>
          <PrimaryButton text='Next' className='float-right text-lg font-medium' onClick={nextHandler} />
        </div>
      </div>
    </div>
  )
}

export default FormOne
