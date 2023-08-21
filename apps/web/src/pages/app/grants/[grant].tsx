import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useAccount, useBlockNumber, useContractRead } from 'wagmi'
import Page from '~/components/layout/page'
import { EnforceAuth } from '~/components/misc/enforceAuth'
import GrantItem from '~/components/pages/app/grants/grantItem'
import GrantsRound from '~/components/pages/app/grants/grantsRound'
import ViewDetails from '~/components/pages/app/grants/popups/viewDetails'
import { api } from '~/utils/api'
import RoundImplementation from '~/abi/RoundImplementation.json'
import CreateProject from '~/components/pages/app/grants/popups/createRequest'
import { encodePacked } from 'viem'
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
  const { data: votingPower } = useContractRead({
    abi: RoundImplementation,
    address: grant?.address,
    functionName: 'getTotalVotes',
    args: [address],
    enabled: votingPowerEnabled,
  })

  const votesHandler = async (votes: string, requestId: string) => {
    if (votes && address) {
      await writeContract({
        abi: RoundImplementation,
        address: grant?.address,
        functionName: 'vote',
        args: [[encodePacked(['uint256', 'uint256'], [BigInt(requestId), BigInt(votes)])]],
      }).catch(err => {
        notification.error({
          message: 'Error',
          description: err.shortMessage || err.message,
        })
      })
    }
  }

  return (
    <Page>
      <GrantsRound setCreateGrant={setCreateRequest} grant={grant || true} />

      <EnforceAuth>
        {grant && (
          <>
            <GrantItem setViewDetails={setViewDetails} grant={grant} votingPowerEnabled={votingPowerEnabled} votingPower={votingPower} setRequestId={setRequestId} votesHandler={votesHandler} />
            {createRequest && <CreateProject show={createRequest} close={() => setCreateRequest(false)} grant={grant} />}
            {viewDetails && <ViewDetails show={viewDetails} close={() => setViewDetails(false)} grant={grant} requestId={requestId} votesHandler={votesHandler} />}
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
