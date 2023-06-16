import CustomModal from '~/components/misc/customModal'
import FormOne from './formOne'
import { useEffect, useState } from 'react'
import FormTwo from './formTwo'
import Preview from './preview'
import { useAccount } from 'wagmi'
import { useCreateProposal } from '~/hooks/web3/useProposal'
import { useEtherscan } from '~/hooks/web3/useEtherscan'
import { abiItem } from '~/server/api/routers/etherscan'
import { encodeAbiParameters } from 'viem'

type CreateProposalProps = {
  show: boolean
  close: any
}

const CreateNewProposal = ({ show, close }: CreateProposalProps) => {
  const [nextFrom, setNextForm] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [actions, setActions] = useState<abiItem[]>([])
  const { address } = useAccount()
  const { createProposal, isLoading } = useCreateProposal()

  const [contractAddress, setContractAddress] = useState('')
  const [contractAction, setContractAction] = useState({} as abiItem)
  const [args, setArgs] = useState({} as any)

  const [callData, setCallData] = useState<string>('')

  const handlePreviews = () => {
    if (address && contractAddress && actions && showPreview) {
      // Encode arguments using ethers.js or a similar library
      actions.map(async (contract, idx) => {
        const inputs = contract?.inputs
        const types = inputs?.map(input => ({
          name: input.name,
          type: input.type,
        }))

        const valuesArr: any = []
        types.map(type => {
          valuesArr.push(args[type.name])
        })
        // const callData = types && encodeAbiParameters(types, Object.values(args))
        const callData = types && encodeAbiParameters(types, valuesArr)

        // Construct calldatas, targets, values
        setCallData(callData)
      })
    }
  }

  useEffect(() => {
    handlePreviews()
  }, [address, contractAddress, contractAction, actions, showPreview])

  const submit = async () => {
    if (address && contractAddress && actions) {
      // Encode arguments using ethers.js or a similar library
      actions.map(async (contract, idx) => {
        const inputs = contract.inputs
        const types = inputs.map(input => ({
          name: input.name,
          type: input.type,
        }))
        const valuesArr: any = []
        types.map(type => {
          valuesArr.push(args[type.name])
        })
        const callData = encodeAbiParameters(types, valuesArr)

        // Construct calldatas, targets, values
        const calldatas = [callData]
        const targets = [contractAddress]
        const values = [0n]

        // Use these in your createProposal call
        await createProposal({
          title: title,
          description: description,
          authorAddress: address,
          calldatas,
          targets,
          values,
        })
      })
    }

    close()
  }

  return (
    <CustomModal show={show} close={close} heading={` ${showPreview ? '' : 'Create New Proposal'}`} modalMarginTop='my-[40px]'>
      {!nextFrom && !showPreview ? (
        <FormOne setNextForm={setNextForm} title={title} setTitle={setTitle} description={description} setDescription={setDescription} />
      ) : nextFrom ? (
        <FormTwo
          setContractAction={setContractAction}
          setNextForm={setNextForm}
          setShowPreview={setShowPreview}
          actions={actions}
          setActions={setActions}
          setArgs={setArgs}
          args={args}
          contractAddress={contractAddress}
          setContractAddress={setContractAddress}
          contractAction={contractAction}
        />
      ) : (
        <Preview values={args} targets={contractAddress} setNextForm={setNextForm} setShowPreview={setShowPreview} title={title} description={description} callData={callData} submit={submit} />
      )}{' '}
    </CustomModal>
  )
}

export default CreateNewProposal
