import { Button, Input, Select } from 'antd'
import { useState } from 'react'
import { encodeAbiParameters } from 'viem'
import { useAccount } from 'wagmi'
import Page from '~/components/layout/page'
import { useEtherscan } from '~/hooks/web3/useEtherscan'
import { useCreateProposal } from '~/hooks/web3/useProposal'
import { abiItem } from '~/server/api/routers/etherscan'

const Proposals = () => {
  const { address } = useAccount()
  const { createProposal, isLoading } = useCreateProposal()

  const [contractAddress, setContractAddress] = useState('')
  const [contractAction, setContractAction] = useState({} as abiItem)
  const [args, setArgs] = useState({} as any)

  const { data: abi } = useEtherscan({ contractAddress }, { retry: 0 })
  console.log({contractAction})
  return (
    <>
      <Page>
        <div className='mx-auto flex h-screen flex-col gap-3 text-center'>
          <span> IF YOU'RE NOT LOGGED IN YOU ARE GOING TO GET UNAUTHORIZED</span>
          0x0d4a11d5EEaaC28EC3F61d100daF4d40471f1852 is USDTWETH CONTRACT FOR DEMO
          <div className='flex gap-7'>
            <Input placeholder='contract address' value={contractAddress} onChange={v => setContractAddress(v.target.value)} />

            <Select
              className='antd-stop-propagation w-full'
              options={abi?.filter(el => el.type == 'function' && el.stateMutability !== 'view').map(el => ({ value: JSON.stringify(el), label: el.name }))}
              onChange={v => setContractAction(JSON.parse(v) as abiItem)}
            />
          </div>
          <div className='flex w-full flex-col'>
            {contractAction?.inputs?.map((el, i) => (
              // onChange = arguments[el.name] = v.target.value
              <Input key={i} placeholder={el.name} onChange={v => setArgs({ ...args, [el.name]: v.target.value })} />
            ))}
          </div>
          <Button
            disabled={isLoading}
            onClick={async () => {
              if (address && contractAddress && contractAction) {
                // Encode arguments using ethers.js or a similar library
                const inputs = contractAction.inputs
                const types = inputs.map(input => ({
                  name: input.name,
                  type: input.type,
                }))

                const callData = encodeAbiParameters(types, Object.values(args))

                // Construct calldatas, targets, values
                const calldatas = [callData]
                const targets = [contractAddress]
                const values = [0n]

                // Use these in your createProposal call
                await createProposal({
                  title: 'test',
                  description: 'test',
                  authorAddress: address,
                  calldatas,
                  targets,
                  values,
                })
              }
            }}
          >
            Create Proposal
          </Button>
        </div>
      </Page>
    </>
  )
}

export default Proposals
