import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useAccount, useBlockNumber, useContractRead, useContractReads } from 'wagmi'
import Page from '~/components/layout/page'
import { EnforceAuth } from '~/components/misc/enforceAuth'
import GrantItem from '~/components/pages/app/grants/grantItem'
import GrantsRound from '~/components/pages/app/grants/grantsRound'
import ViewDetails from '~/components/pages/app/grants/popups/viewDetails'
import { api } from '~/utils/api'
import RoundImplementation from '~/abi/RoundImplementation.json'
import CreateProject from '~/components/pages/app/grants/popups/createRequest'
import { Address, encodePacked } from 'viem'
import { writeContract } from '@wagmi/core'
import { notification } from 'antd'

const Grants = ({ id }: { id: Number }) => {
  const [createRequest, setCreateRequest] = useState(false)
  const [viewDetails, setViewDetails] = useState(false)
  const [requestId, setRequestId] = useState(0)

  const { address } = useAccount()
  const { data: grant } = api.grant.getGrant.useQuery({ id: Number(id) })
  const { data: currentBlock } = useBlockNumber({ watch: true })

  const votingPowerEnabled = Boolean(!!grant?.address && !!address && currentBlock && currentBlock > grant?.roundStartBlock)
  const { data: result } = useContractReads({
    contracts: [
      {
        abi: RoundImplementation as any,
        address: grant?.address,
        functionName: 'getTotalVotes',
        args: [address as Address],
      },
      {
        abi: RoundImplementation as any,
        address: grant?.address,
        functionName: 'receipts',
        args: [address as Address],
      },
    ],
  })

  const [{ result: votingPower }, { result: voted }] = result || [{ result: 0n }, { result: false }]

  const [cart, setCart] = useState<any>([])
  const [loading, setLoading] = useState(false)

  const votesHandler = async () => {
    if (cart && address) {
      setLoading(true)
      await writeContract({
        abi: RoundImplementation,
        address: grant?.address,
        functionName: 'vote',
        args: [cart.map((el: any) => encodePacked(['uint256', 'uint256'], [BigInt(el.proposalId), BigInt(el.temporaryVotes)]))],
      }).catch(err => {
        notification.error({
          message: 'Error',
          description: err.shortMessage || err.message,
        })
      })
      setLoading(false)
    }
  }

  const addToCart = (grantRequest: any, votes: string) => {
    setCart([
      ...cart.filter((item: any) => item.proposalId !== grantRequest.proposalId),
      {
        ...grantRequest,
        temporaryVotes: BigInt(votes) * 10n ** 18n,
      },
    ])

    notification.success({
      message: 'Success',
      description: 'Added to cart',
    })
  }

  const removeFromCart = (id: number) => {
    setCart([...cart.filter((item: any) => item.proposalId !== id)])
  }

  return (
    <Page>
      <GrantsRound loading={loading} setCreateGrant={setCreateRequest} grant={grant || true} />

      <EnforceAuth>
        {grant && (
          <>
            <GrantItem
              setViewDetails={setViewDetails}
              grant={grant}
              votingPowerEnabled={votingPowerEnabled}
              votingPower={votingPower}
              setRequestId={setRequestId}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              votesHandler={votesHandler}
              cart={cart}
              loading={loading}
              voted={voted}
            />
            {createRequest && <CreateProject show={createRequest} close={() => setCreateRequest(false)} grant={grant} />}
            {viewDetails && <ViewDetails show={viewDetails} close={() => setViewDetails(false)} grant={grant} requestId={requestId} addToCart={addToCart} />}
          </>
        )}
      </EnforceAuth>
    </Page>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const id = Number(ctx.params?.grant)

  return {
    props: {
      id,
    },
  }
}

export default Grants
