import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'

type ProjectProps = {
  submitRequest: () => Promise<void>
  setState: Dispatch<SetStateAction<'confirm' | 'projectRequest'>>
  projectName: string
  projectAddress: string
  website: string
  twitter: string
  logo: File | undefined
  theme: File | undefined
  projectDescription: string
}

const ProjectPreview = ({ projectName, projectAddress, website, twitter, logo, theme, projectDescription, submitRequest, setState }: ProjectProps) => {
  return (
    <div className='pt-10 pb-[24px] font-body text-lg font-normal md:pt-[60px]'>
      <div className='grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-[76px]'>
        <div>
          <div>
            <div className='flex justify-between'>
              <div className='text-[22px] font-bold'>Project Name*</div>
            </div>
            <input className='mt-[17px] h-10 w-full max-w-[480px] rounded-[10px] border-[1px] bg-[#F0F0F0] border-[#A7A7A7] px-5 outline-none placeholder:py-2 md:mt-5' value={projectName} />
          </div>

          <div className='pt-10'>
            <div className='flex justify-between'>
              <div className='text-[22px] font-bold'>Project Address*</div>
            </div>
            <input className='mt-[17px] h-10 w-full max-w-[480px] rounded-[10px] border-[1px] bg-[#F0F0F0] border-[#A7A7A7] px-5 outline-none placeholder:py-2 md:mt-5' value={projectAddress} />
          </div>

          <div className='pt-10'>
            <div className='flex justify-between'>
              <div className='text-[22px] font-bold'>Project Website*</div>
            </div>
            <input className='mt-[17px] h-10 w-full max-w-[480px] rounded-[10px] border-[1px] bg-[#F0F0F0] border-[#A7A7A7] px-5 outline-none placeholder:py-2 md:mt-5' value={website} />
          </div>

          <div className='pt-10'>
            <div className='flex justify-between'>
              <div className='text-[22px] font-bold'>Project Twitter Account </div>
            </div>
            <input
              className='mt-[17px] h-10 w-full max-w-[480px] rounded-[10px] border-[1px] bg-[#F0F0F0] border-[#A7A7A7] px-5 outline-none placeholder:py-2 md:mt-5'
              placeholder='Your twitter profile'
              value={twitter}
            />
          </div>
        </div>

        <div>
          <div>
            <div className='text-[22px] font-bold'> Project Logo</div>
            {logo && (
              <div className='mt-5 h-fit w-fit rounded-[100px]  text-center'>
                <Image src={URL.createObjectURL(logo)} alt='upload' className='mx-auto' height={183} width={183} />
              </div>
            )}
          </div>

          <div className='pt-[30px]'>
            <div className='text-[22px] font-bold'>Project Banner</div>
            {theme && (
              <div className='mt-5 h-full w-fit rounded-[10px] text-center'>
                <Image src={URL.createObjectURL(theme)} alt='upload' className='mx-auto' height={183} width={300} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='mt-10'>
        <div className='flex justify-between'>
          <div className='text-[22px] font-bold'>Project Description*</div>
          {/* <div className='text-vdao-light'>*Required</div> */}
        </div>

        <textarea className='mt-5 w-full rounded-[10px] border-[1px] bg-[#F0F0F0] border-[#A7A7A7] p-5 outline-none ' rows={10} value={projectDescription} />
      </div>

      <div className='float-right flex gap-5 py-6'>
        <div className='cursor-pointer rounded-[5px] border-[1px] border-vdao-dark px-[35px] pt-[5px] font-heading text-lg font-medium' onClick={() => setState('projectRequest')}>
          Previous
        </div>
        <PrimaryButton text='Confirm' className='float-right text-xl font-medium' onClick={submitRequest} />
      </div>
    </div>
  )
}

export default ProjectPreview
