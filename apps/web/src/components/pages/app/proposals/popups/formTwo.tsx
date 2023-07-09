import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'
import Image from 'next/image'
import EllipseComponent from '~/components/misc/ellipseLine'
import { Input, Select } from 'antd'
import { abiItem } from '~/server/api/routers/etherscan'
import { useEtherscan } from '~/hooks/web3/useEtherscan'
import { Spell } from './createProposal'
import { shortenAddress } from '~/utils/helpers'

type FormProps = {
  setNextForm: Dispatch<SetStateAction<boolean>>
  setShowPreview: (preview: boolean) => void

  spells: Spell[]
  setSpells: Dispatch<SetStateAction<Spell[]>>
}

const FormTwo = ({ setNextForm, setShowPreview, spells, setSpells }: FormProps) => {
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState('')

  const [contractAddress, setContractAddress] = useState('')
  const { data: abi } = useEtherscan({ contractAddress }, { retry: 0 })

  const [verifiedAddr, setVerifiedAddr] = useState<string[]>([])

  const handleContractAddress = (evt: any) => {
    setContractAddress(evt.target.value)
    setVerified(false)
  }

  const verifyActions = () => {
    if (contractAddress && abi) {
      setVerified(true)
      setVerifiedAddr(prev => [...prev, contractAddress])
    } else {
      setVerified(false)
      setError('UnVerified')
      setTimeout(() => {
        setError('')
      }, 10000)
    }
  }

  useEffect(() => {
    if (!contractAddress || spells.length === 0) {
      setVerified(false)
    } else {
      verifyActions()
    }
  }, [spells, abi, contractAddress])

  const handleMethods = (item: string) => {
    if (item) {
      const newAction = JSON.parse(item) as abiItem
      const newSpell = {
        calldata: {},
        name: newAction.name,
        target: contractAddress,
        abi: abi,
        value: '0',
      }
      setSpells(prev => [...prev, newSpell])
    }
  }

  const confirmHandler = () => {
    if (spells.length > 0) {
      setNextForm(false)
      setShowPreview(true)
    } else {
      setError('UnConfirmed')
      setTimeout(() => {
        setError('')
      }, 10000)
    }
  }

  const actionHandler = (idx: number) => {
    setVerified(true)
    setContractAddress(verifiedAddr[idx]!)
  }

  // abi
  //   ?.filter(el => el.type == 'function' && el.stateMutability !== 'view')
  //   .map((newAbi, idx) => {
  //     console.log('newAbo', newAbi, newAbi.name)
  //   })

  console.log(error)

  return (
    <div className='grid grid-cols-1 gap-10 pt-[30px] pb-[24px] font-body text-lg font-normal text-vdao-dark md:grid-cols-2 md:gap-[106px] md:pt-10'>
      <div>
        <div className='text-[22px] font-bold'>Add Actions</div>

        <div className={`pt-[5px]`}>Add up to 10 actions to be executed if the proposal passes.</div>

        <input
          className='mt-5 h-10 w-full max-w-[424px] rounded-[10px] border-[1px] border-vdao-dark px-5 py-2 outline-none'
          placeholder='0x0d4a11d5EEaaC28EC3F61d100daF4d40471f1852'
          value={contractAddress}
          onChange={handleContractAddress}
        />

        <div
          className={`mt-5 w-fit rounded-[5px]  py-[5px] px-[35px] font-heading text-xl font-medium
                        ${verified ? 'border-[1px] border-vdao-pink' : 'cursor-pointer bg-vdao-pink'}`}
          onClick={verifyActions}
        >
          {verified ? 'Verified' : 'Verify'}
        </div>

        {verified && <EllipseComponent className='py-[14px] text-sm font-normal md:py-5' text='Verified Contract found on Etherscan. ABI automatically imported.' />}

        <div className='pt-[40px] text-[22px] font-bold md:pt-[60px]'>Added Actions</div>
        {spells && spells.length > 0 ? (
          spells.map((spell: Spell, idx: number) => {
            return (
              <div className='flex justify-start gap-[17px] pt-[10px] md:pt-5' key={idx}>
                <div className='flex cursor-pointer text-lg font-bold text-vdao-light' onClick={() => actionHandler(idx)}>
                  {spell.name || 'unnamed action'} <div className='mx-2 my-auto text-sm'>({shortenAddress(spell.target)})</div>
                </div>
                <div className='my-auto cursor-pointer text-sm font-bold underline' onClick={() => setSpells(prev => prev.filter((_, i) => i !== idx))}>
                  Remove action
                </div>
              </div>
            )
          })
        ) : (
          <div className='text-lg font-bold text-vdao-light'>No Actions recorded</div>
        )}
      </div>

      <div className='pr-5'>
        <div className='text-[22px] font-bold'>Contract Method</div>

        <Select
          className='antd-stop-propagation w-full'
          options={contractAddress ? abi?.filter(el => el.type == 'function' && el.stateMutability !== 'view').map(el => ({ value: JSON.stringify(el), label: el.name })) : [{ value: '', label: '' }]}
          onChange={handleMethods}
          placeholder='mockFunctionNonPayable'
        />

        {spells.length > 0 ? (
          <div className='flex w-full flex-col'>
            {/* <input className='mt-5 h-10 w-full max-w-[424px] rounded-[10px] border-[1px] border-vdao-dark px-5 py-2 outline-none' /> */}
            {spells?.map((spell, idx) => {
              return (
                <>
                  <div className='mt-5 text-lg font-bold text-vdao-light'>{spell.name ? spell.name : 'UnNamed'}</div>
                  {spell.abi
                    ?.find((v: any) => v.name === spell.name)
                    ?.inputs?.map((el: any, i: number) => (
                      // onChange = arguments[el.name] = v.target.value
                      <>
                        <input
                          className='mt-2 h-10 w-full max-w-[424px] rounded-[10px] border-[1px] border-vdao-dark px-5 py-2 outline-none'
                          key={i}
                          placeholder={el.name}
                          onChange={v =>
                            setSpells(
                              spells.map((spell, i) =>
                                i === idx
                                  ? {
                                      ...spell,
                                      calldata: {
                                        ...spell.calldata,
                                        [el.name]: v.target.value,
                                      },
                                    }
                                  : spell,
                              ),
                            )
                          }
                        />
                      </>
                    ))}
                  <input
                    className='mt-2 h-10 w-full max-w-[424px] rounded-[10px] border-[1px] border-vdao-dark px-5 py-2 outline-none'
                    placeholder='Spell Value in Wei (1e18 = 1 ETH)'
                    onChange={v => setSpells(spells.map((el, i) => (i === idx ? { ...el, value: v.target.value } : el)))}
                  />
                </>
              )
            })}
          </div>
        ) : (
          <>
            <div className='mt-[30px] cursor-pointer rounded-[10px] border-[1px] border-vdao-dark py-9 px-[61px] text-center md:mt-10'>
              <div className='text-[26px] font-medium'>Drag and drop your ABI file</div>
              <div className='pt-[10px] text-sm font-normal'>Or click to browse your files.</div>
            </div>

            <EllipseComponent className='py-[10px] text-sm font-normal md:py-5' text='ABI file uploaded' />
          </>
        )}

        {error && <div className='text-red-500'>Required*: Please Add and verify the valid address, actions and arguments</div>}
        <div className='float-right flex gap-5 pt-6 md:pt-48 '>
          <div
            className='cursor-pointer rounded-[5px] border-[1px] border-vdao-dark py-[5px] px-[35px] font-heading text-lg font-medium'
            onClick={() => {
              setNextForm(false)
            }}
          >
            Previous
          </div>
          <PrimaryButton text='Confirm' className=' py-[5px] px-[35px] font-heading text-lg font-medium' onClick={confirmHandler} />
        </div>
      </div>
    </div>
  )
}

export default FormTwo
