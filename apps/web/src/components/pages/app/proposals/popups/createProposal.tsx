import { useState } from 'react'
import { encodeAbiParameters, encodeFunctionData } from 'viem'
import { useAccount } from 'wagmi'
import CustomModal from '~/components/misc/customModal'
import { useCreateProposal } from '~/hooks/web3/useProposal'
import { abiItem } from '~/server/api/routers/etherscan'
import FormOne from './formOne'
import FormTwo from './formTwo'
import Preview from './preview'

type CreateProposalProps = {
  show: boolean
  close: any
}

export type Spell = {
  name: string
  signature: string
  calldata: any
  target: string
  abi: any
  value: string
}

const CreateNewProposal = ({ show, close }: CreateProposalProps) => {
  const [nextFrom, setNextForm] = useState(false)
  const [showPreview, _setShowPreview] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const { address } = useAccount()
  const { createProposal, isLoading } = useCreateProposal()

  const [spells, setSpells] = useState<Spell[]>([])
  const [callDatas, setCallDatas] = useState<string[]>([])
  const [signatures, setSignatures] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const reset = () => {
    setNextForm(false)
    setTitle('')
    setTitle('')
    setDescription('')
    setSpells([])
    setCallDatas([])
    setLoading(false)
  }

  const handlePreviews = () => {
    let cds: string[] = []
    if (address && spells.length > 0) {
      // Encode arguments using ethers.js or a similar library
      spells.forEach(async (spell, idx) => {
        type typing = {
          name: string
          type: string
        }

        const types: typing[] = spell?.abi
          ?.filter((item: abiItem) => item.name === spell.name)[0]
          .inputs.map((item: abiItem) => {
            return {
              name: item.name,
              type: item.type,
            }
          })

        const valuesArr: any = []
        types.map(type => {
          valuesArr.push(spell.calldata[type.name])
        })

        // const callData = types && encodeAbiParameters(types, Object.values(args))
        const callData = types && encodeAbiParameters(spell?.abi.find((item: abiItem) => item.name === spell.name).inputs, valuesArr)

        // Construct calldatas, targets, values
        cds.push(callData)
      })

      setCallDatas(cds)
    }
  }

  const setShowPreview = (preview: boolean) => {
    _setShowPreview(preview)
    preview && handlePreviews()
  }

  const submit = async () => {
    if (address && spells) {
      setLoading(true)
      await createProposal({
        title: title,
        description: description,
        authorAddress: address,
        calldatas: callDatas,
        targets: spells.map(spell => spell.target),
        values: spells.map(spell => BigInt(spell.value)),
        signatures: spells.map(spell => spell.signature),
        callback: successful => {
          successful && close()
        },
      }).then(el => {
        el && close()
      })
      setLoading(false)
    }
  }

  const closeAndReset = () => {
    reset()
    close()
  }

  return (
    <CustomModal
      show={show}
      close={closeAndReset}
      externalStyle={'w-full custom-scrollbar md:mx-10 xl:mx-auto md:!px-5 lg:!px-10'}
      heading={` ${showPreview ? '' : 'Create New Proposal'}`}
      modalMarginTop='my-[40px]'
      canExit={!loading}
    >
      {!nextFrom && !showPreview ? (
        <FormOne setNextForm={setNextForm} title={title} setTitle={setTitle} description={description} setDescription={setDescription} />
      ) : nextFrom ? (
        <FormTwo setNextForm={setNextForm} setShowPreview={setShowPreview} spells={spells} setSpells={setSpells} />
      ) : (
        <Preview loading={loading} spells={spells} setNextForm={setNextForm} setShowPreview={setShowPreview} title={title} description={description} callDatas={callDatas} submit={submit} />
      )}
    </CustomModal>
  )
}

export default CreateNewProposal
