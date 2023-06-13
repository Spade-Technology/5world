import CustomModal from '~/components/misc/customModal'
import FormOne from './formOne'
import { useState } from 'react'
import FormTwo from './formTwo'
import Preview from './preview'
import { useAccount } from 'wagmi'
import { useCreateProposal } from '~/hooks/web3/useProposal'
import { useEtherscan } from '~/hooks/web3/useEtherscan'
import { abiItem } from '~/server/api/routers/etherscan'

type CreateProposalProps = {
  show: boolean
  close: any
}

const CreateNewProposal = ({ show, close }: CreateProposalProps) => {
  const [nextFrom, setNextForm] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const [actions, setActions] = useState<string[]>([])
  const [contractMethod, setContractMethod] = useState('')

  const { address } = useAccount()
  const { createProposal, isLoading } = useCreateProposal()

  const [contractAddress, setContractAddress] = useState('')
  const [contractAction, setContractAction] = useState({} as abiItem)
  const [args, setArgs] = useState({} as any)
  const { data: abi } = useEtherscan({ contractAddress }, { retry: 0 })

  const submit = async () => {
    if (address) {
      // const calldatas = [callData]
      const targets = [contractAddress]
      const values = [0n]

      await createProposal({
        title: 'test',
        description: 'test',
        authorAddress: address ? address : '',
        calldatas: actions,
        targets: actions,
        values: [],
      })
      close()
    }
  }

  return (
    <CustomModal show={show} close={close} heading={` ${showPreview ? '' : 'Create New Proposal'}`} modalMarginTop='my-[40px]'>
      {!nextFrom && !showPreview ? (
        <FormOne setNextForm={setNextForm} title={title} setTitle={setTitle} description={description} setDescription={setDescription} />
      ) : nextFrom ? (
        <FormTwo setNextForm={setNextForm} setShowPreview={setShowPreview} actions={actions} setActions={setActions} contractMethod={contractMethod} setContractMethod={setContractMethod} />
      ) : (
        <Preview setNextForm={setNextForm} setShowPreview={setShowPreview} title={title} description={description} callDatas={actions} submit={submit} />
      )}{' '}
    </CustomModal>
  )
}

export default CreateNewProposal
