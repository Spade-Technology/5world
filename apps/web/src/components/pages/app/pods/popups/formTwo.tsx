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
  memberAddr: string[]
  setMemberAddr: Dispatch<SetStateAction<string[]>>
  createPodHanlder: any
  data: pod_type[]
}

const FormTwo = ({ managerAddr, memberAddr, setManagerAddr, setMemberAddr, setNextForm, createPodHanlder, data }: FormProps) => {
  const { data: managerData } = useUserReads({})
  const [removeOn, setRemoveOn] = useState(false)
  const [options, setOptions] = useState<any>([])
  const [managerInfo, setManagerInfo] = useState<any>('')
  const [membersInfo, setMembersInfo] = useState<any>('')

  useEffect(() => {
    if (managerData) {
      for (let i = 0; i < managerData.length; i++) {
        const option = {
          value: managerData[i]?.address,
          label: managerData[i]?.name!,
        }
        setOptions((prev: any) => [...prev, option])
      }
    } else {
      setOptions([])
    }
  }, [managerData?.length])

  const handleChange = (value: any) => {
    console.log('handleChange', value)
    if (value) {
      setManagerAddr(value)
    }
  }

  const addManager = (address: string) => {
    if (address) {
      const info = managerData?.filter(info => {
        return info.address === address
      })
      setManagerInfo(info[0])
    } else {
      setManagerInfo('')
    }
  }

  const handleMemebers = (value: string[]) => {
    if (value) {
      setMemberAddr(value)
    }
  }

  console.log({ memberAddr })

  const addMemebers = (addresses: string[]) => {
    console.log('memebersinfo address', addresses, managerData)
    if (addresses && addresses.length > 0) {
      const membersArr: any = []
      for (let i = 0; i < addresses.length; i++) {
        managerData?.map(info => {
          console.log('memebersinfo address', i, info.address, addresses[i], info.address === addresses[i])
          if (info.address === addresses[i]) {
            setMembersInfo((prev: any) => [...prev, info])
          }
        })
      }
    } else {
      setMembersInfo([])
    }
  }

  console.log({ membersInfo })

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

        <Select style={{ width: '100%' }} placeholder='Enter Address' onChange={handleChange} options={options} className='antd-stop-propagation w-full' />

        <div
          className={` ${managerAddr ? 'bg-vdao-pink' : 'border-[1px] border-vdao-pink'} mt-5 w-fit cursor-pointer rounded-[5px]  py-[5px] px-[35px] font-heading text-xl font-medium`}
          onClick={() => addManager(managerAddr)}
        >
          Add Manager
        </div>

        <div className='pt-11 text-[22px] font-bold'>Add Pod Members</div>

        <div className='pt-[5px]'>Add member address below.</div>

        {/* <input className='mt-5 h-10 w-full max-w-[424px] rounded-[10px] border-[1px] border-vdao-dark px-5 outline-none' onChange={evt => setMemberAddr(evt.target.value)} value={memberAddr} /> */}
        <Select mode='tags' style={{ width: '100%' }} placeholder='Enter Address' onChange={handleMemebers} options={options} className='antd-stop-propagation w-full' />

        <div
          className={` ${memberAddr?.length > 0 ? 'bg-vdao-pink' : 'border-[1px] border-vdao-pink'} mt-5 w-fit cursor-pointer rounded-[5px] py-[5px] px-[35px] font-heading text-xl font-medium`}
          onClick={() => addMemebers(memberAddr)}
        >
          Add Member
        </div>
      </div>

      <div className='md:pr-5'>
        <div className='flex justify-between'>
          <div className='text-[22px] font-bold'>Manager</div>
        </div>

        {managerInfo ? (
          <ProfileCard icon={managerInfo?.picture! ? managerInfo.picture! : ''} name={managerInfo.name ? managerInfo.name : ''} address={managerInfo.address ? managerInfo.address : ''} />
        ) : (
          'No Assigned Mangeer'
        )}

        <div className='flex justify-start gap-[30px] pt-[30px] md:pt-10'>
          <div className='text-[22px] font-bold'>Members</div>
          <div className='text-lg font-normal'>{membersInfo ? membersInfo.length : 0}</div>
          {!removeOn && (
            <div className='my-auto text-sm font-bold underline' onClick={() => membersInfo?.length > 0 && setRemoveOn(true)}>
              Remove Members
            </div>
          )}
        </div>

        <div className='grid grid-cols-2 pt-5 '>
          {membersInfo
            ? membersInfo.map((member: any, idx: any) => {
                return <ProfileCard key={idx} icon={member?.picture} name={member?.name} address={member?.address} edit={removeOn} nameLength={8} />
              })
            : 'No Assigned Members'}
        </div>

        {removeOn && (
          <div className='flex justify-start gap-5 pt-6'>
            <div className={`w-fit cursor-pointer rounded-md bg-vdao-pink py-[5px] px-9 font-heading text-xl font-medium text-vdao-dark`} onClick={() => setRemoveOn(false)}>
              {' '}
              Remove{' '}
            </div>

            <div className={`w-fit cursor-pointer rounded-md border-[1px] border-vdao-pink py-[5px] px-9 font-heading text-xl font-medium text-vdao-dark`} onClick={() => setRemoveOn(false)}>
              {' '}
              Cancel{' '}
            </div>
          </div>
        )}

        <div className='float-right flex gap-2 pt-20 pb-[30px] md:gap-5 md:pt-36 '>
          <div className='cursor-pointer rounded-[5px] border-[1px] border-vdao-dark py-[5px] px-[35px] font-heading text-lg font-medium' onClick={() => setNextForm(false)}>
            Previous
          </div>
          <PrimaryButton text='Confirm' className=' py-[5px] px-[35px] font-heading text-lg font-medium' onClick={() => createPodHanlder()} />
        </div>
      </div>
    </div>
  )
}

export default FormTwo
