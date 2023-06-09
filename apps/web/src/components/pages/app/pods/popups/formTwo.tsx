import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'
import ProfileCard from '~/components/misc/profileCard'
import { pod_type } from '~/hooks/web3/usePod'
import { useUserReads } from '~/hooks/web3/useUser'
import { Select } from 'antd'
import type { SelectProps } from 'antd'
import { shortenAddress } from '~/utils/helpers'
import PurpleButton from '~/styles/shared/buttons/purpleButton'

type FormProps = {
  setNextForm: Dispatch<SetStateAction<boolean>>
  managerAddr: string
  setManagerAddr: Dispatch<SetStateAction<string>>
  memberAddr: string
  setMemberAddr: Dispatch<SetStateAction<string>>
  createPodHanlder: any
  data: pod_type[]
}

const FormTwo = ({
  managerAddr,
  memberAddr,
  setManagerAddr,
  setMemberAddr,
  setNextForm,
  createPodHanlder,
  data,
}: FormProps) => {
  const [mangerDetails, setManagerDetails] = useState('')
  const { data: managerData } = useUserReads({})
  const [removeOn, setRemoveOn] = useState(false)

  // const options: SelectProps['options'] = []
  const [options, setOptions] = useState<any>([])
  useEffect(() => {
    // if (managerAddr) {
    // const { data: managerData } = useUserReads({})
    console.log('Entered managerData?.length', managerData?.length)
    if (managerData) {
      console.log('Entered')
      for (let i = 0; i < managerData.length; i++) {
        console.log('Entered managerData[i]?.address', managerData[i]?.address)
        const option = {
          // key: i + 1,
          value: managerData[i]?.address,
          label: managerData[i]?.name!,
        }

        setOptions((prev: any) => [...prev, option])
      }

      // console.log('options', options)
    } else {
      console.log('Entered NOT')

      setOptions([])
    }

    // }
  }, [managerData?.length])

  console.log({ managerData }, options[0], { options: options[0] })

  const handleChange = (value: any) => {
    console.log('Entered selected')
  }
  console.log('Entered selected >> ', managerAddr)
  return (
    <div className='grid grid-cols-1 gap-11 pt-10 font-body text-lg font-normal text-vdao-dark md:grid-cols-2 md:gap-[106px]'>
      <div>
        <div className='text-[22px] font-bold'>Assign Pod Manager</div>

        <div className='pt-[5px]'>Add manager address below.</div>

        {/* <input
          className='mt-[17px] h-10 w-full max-w-[424px] rounded-[10px] border-[1px] border-vdao-dark px-5 outline-none md:mt-5'
          onChange={evt => setManagerAddr(evt.target.value)}
          value={managerAddr}
        /> */}

        <Select
          mode='tags'
          style={{ width: '100%' }}
          placeholder='Enter Address'
          // onChange={handleChange}
          onChange={value => setManagerAddr(value)}
          options={options}
          className='antd-stop-propagation w-full'
        />

        <div className='mt-5 w-fit cursor-pointer rounded-[5px] bg-vdao-pink py-[5px] px-[35px] font-heading text-xl font-medium'>
          Add Manager
        </div>

        <div className='pt-11 text-[22px] font-bold'>Add Pod Members</div>

        <div className='pt-[5px]'>Add member address below.</div>

        <input
          className='mt-5 h-10 w-full max-w-[424px] rounded-[10px] border-[1px] border-vdao-dark px-5 outline-none'
          onChange={evt => setMemberAddr(evt.target.value)}
          value={memberAddr}
        />

        <div className='mt-5 w-fit cursor-pointer rounded-[5px] bg-vdao-pink py-[5px] px-[35px] font-heading text-xl font-medium'>
          Add Member
        </div>
      </div>

      <div className='md:pr-5'>
        <div className='flex justify-between'>
          <div className='text-[22px] font-bold'>Manager</div>
        </div>

        <ProfileCard
          icon={data && data[0]?.admins[0]?.picture ? data[0]?.admins[0]?.picture : ''}
          name={data && data[0]?.admins[0]?.name ? data[0]?.admins[0]?.name : ''}
          address={data && data[0]?.admins[0]?.address ? data[0]?.admins[0]?.address : ''}
        />

        <div className='flex justify-start gap-[30px] pt-[30px] md:pt-10'>
          <div className='text-[22px] font-bold'>Members</div>
          <div className='text-lg font-normal'>{data && data[0]?.members ? data[0].members.length : 0}</div>
          {!removeOn && (
            <div className='my-auto text-sm font-bold underline' onClick={() => setRemoveOn(true)}>
              Remove Members
            </div>
          )}
        </div>

        <div className='grid grid-cols-2 pt-5 '>
          {data &&
            data[0]?.members &&
            data[0]?.members.map((member, idx) => {
              return (
                <>
                  {/* {removeOn && <input type='radio' className='h-10 w-10'  />} */}
                  <ProfileCard icon={member.picture} name={member.name} address={member.address} edit={removeOn} />
                </>
              )
            })}
        </div>

        {removeOn && (
          <div className='flex justify-start gap-5 pt-6'>
            <div
              className={`w-fit cursor-pointer rounded-md bg-vdao-pink py-[5px] px-9 font-heading text-xl font-medium text-vdao-dark`}
              onClick={() => setRemoveOn(false)}
            >
              {' '}
              Remove{' '}
            </div>

            <div
              className={`w-fit cursor-pointer rounded-md border-[1px] border-vdao-pink py-[5px] px-9 font-heading text-xl font-medium text-vdao-dark`}
              onClick={() => setRemoveOn(false)}
            >
              {' '}
              Cancel{' '}
            </div>
          </div>
        )}

        <div className='float-right flex gap-2 pt-20 pb-[30px] md:gap-5 md:pt-36 '>
          <div
            className='cursor-pointer rounded-[5px] border-[1px] border-vdao-dark py-[5px] px-[35px] font-heading text-lg font-medium'
            onClick={() => setNextForm(false)}
          >
            Previous
          </div>
          <PrimaryButton
            text='Confirm'
            className=' py-[5px] px-[35px] font-heading text-lg font-medium'
            onClick={() => createPodHanlder()}
          />
        </div>
      </div>
    </div>
  )
}

export default FormTwo
