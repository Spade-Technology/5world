import { Dispatch, SetStateAction, useState } from 'react'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'
import Image from 'next/image'
import EllipseComponent from '~/components/misc/ellipseLine'

type FormProps = {
  setNextForm: Dispatch<SetStateAction<boolean>>
  setShowPreview: Dispatch<SetStateAction<boolean>>
  actions: string[]
  setActions: Dispatch<SetStateAction<string[]>>
  contractMethod: string
  setContractMethod: Dispatch<SetStateAction<string>>
}

const FormTwo = ({
  actions,
  contractMethod,
  setActions,
  setContractMethod,
  setNextForm,
  setShowPreview,
}: FormProps) => {
  const [action, setAction] = useState('')
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState(false)

  const verifyActions = () => {
    if (action) {
      console.log('length', actions.length)
      if (actions.length < 10) {
        setActions(prev => [...prev, action])
        setAction('')
        setVerified(true)
        setTimeout(() => {
          setVerified(false)
        }, 1000)
      } else {
        setError(true)
        setTimeout(() => {
          setError(false)
        }, 1000)
      }
    }
  }
  return (
    <div className='grid grid-cols-1 gap-10 pt-[30px] pb-[24px] font-body text-lg font-normal text-vdao-dark md:grid-cols-2 md:gap-[106px] md:pt-10'>
      <div>
        <div className='text-[22px] font-bold'>Add Actions</div>

        <div className={`${error && 'text-red-500'} pt-[5px]`}>
          Add up to 10 actions to be executed if the proposal passes.
        </div>

        <input
          className='mt-5 h-10 w-full max-w-[424px] rounded-[10px] border-[1px] border-vdao-dark px-5 py-2 outline-none'
          placeholder='Ox8f12id9f2a51e33d30c4181f2978'
          value={action}
          onChange={evt => setAction(evt.target.value)}
        />

        <div
          className='mt-5 w-fit cursor-pointer rounded-[5px] bg-vdao-pink py-[5px] px-[35px] font-heading text-xl font-medium'
          onClick={verifyActions}
        >
          {verified ? 'Verified' : 'Verify'}
        </div>

        <EllipseComponent
          className='py-[14px] text-sm font-normal md:py-5'
          text='Verified Contract found on Etherscan. ABI automatically imorted.'
        />

        <div className='mt-[30px] cursor-pointer rounded-[10px] border-[1px] border-vdao-dark py-9 px-[61px] text-center md:mt-10'>
          <div className='text-[26px] font-medium'>Drag and drop your ABI file</div>
          <div className='pt-[10px] text-sm font-normal'>Or click to browse your files.</div>
        </div>

        <EllipseComponent className='py-[10px] text-sm font-normal md:py-5' text='ABI file uploaded' />
      </div>

      <div className='pr-5'>
        <div className='text-[22px] font-bold'>Contract Method</div>

        <input
          className='mt-5 h-10 w-full max-w-[424px] rounded-[10px] border-[1px] border-vdao-dark px-5 py-2 outline-none'
          placeholder='mockFunctionNonPayable'
          value={contractMethod}
          onChange={evt => setContractMethod(evt.target.value)}
        />

        <div className='pt-[40px] text-[22px] font-bold md:pt-[60px]'>Added Actions</div>
        {actions.length ? (
          actions.map((action, idx) => {
            return (
              <div className='flex justify-start gap-[17px] pt-[10px] md:pt-5' key={idx}>
                <div className='text-lg font-bold text-vdao-light'>Action name {idx + 1}</div>
                <div
                  className='my-auto cursor-pointer text-sm font-bold underline'
                  onClick={() => {
                    // actions.splice(idx, 1)
                    const newActions = actions.filter((action, index) => index != idx)
                    console.log('newActions', newActions, newActions.length)
                    setActions(newActions)
                  }}
                >
                  Remove action
                </div>
              </div>
            )
          })
        ) : (
          <div className='text-lg font-bold text-vdao-light'>No Actions recorded</div>
        )}

        <div className='float-right flex gap-5 pt-6 md:pt-48 '>
          <div
            className='cursor-pointer rounded-[5px] border-[1px] border-vdao-dark py-[5px] px-[35px] font-heading text-lg font-medium'
            onClick={() => {
              setNextForm(false)
            }}
          >
            Previous
          </div>
          <PrimaryButton
            text='Confirm'
            className=' py-[5px] px-[35px] font-heading text-lg font-medium'
            onClick={() => {
              setNextForm(false)
              setShowPreview(true)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default FormTwo
