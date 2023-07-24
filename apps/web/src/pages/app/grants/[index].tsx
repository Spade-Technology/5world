import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useAccount, useBlockNumber, useContractRead } from 'wagmi'
import Page from '~/components/layout/page'
import { EnforceAuth } from '~/components/misc/enforceAuth'
import GrantItem from '~/components/pages/app/grants/grantItem'
import GrantsRound from '~/components/pages/app/grants/grantsRound'
import CreateGrant from '~/components/pages/app/grants/popups/createGrant'
import GrantDetails from '~/components/pages/app/grants/popups/grantDetails'
import { api } from '~/utils/api'
import RoundImplementation from '~/abi/RoundImplementation.json'

const Grants = ({ id }: { id: Number }) => {
  const [createRequest, setCreateRequest] = useState(false)
  const [viewDetails, setViewDetails] = useState(false)

  const { address } = useAccount()
  const { data: grant } = api.grant.getGrant.useQuery({ id: Number(id) })
  const { data: currentBlock } = useBlockNumber()

  const votingPowerEnabled = Boolean(!!grant?.address && !!address && currentBlock && currentBlock > grant?.roundStartBlock)
  const { data: votingPower } = useContractRead({
    abi: RoundImplementation,
    address: grant?.address,
    functionName: 'getTotalVotes',
    args: [address],
    enabled: votingPowerEnabled,
  })

  return (
    <Page>
      <GrantsRound setCreateGrant={setCreateRequest} grant={grant || true} />

      <EnforceAuth>
        {grant && (
          <>
            <GrantItem setViewDetails={setViewDetails} grant={grant} votingPowerEnabled={votingPowerEnabled} votingPower={votingPower} />
            {createRequest && <CreateGrant show={createRequest} close={() => setCreateRequest(false)} />}
            {viewDetails && <GrantDetails show={viewDetails} close={() => setViewDetails(false)} />}
          </>
        )}
      </EnforceAuth>
    </Page>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const id = Number(ctx.params?.index)

  return {
    props: {
      id,
    },
  }
}

export default Grants
