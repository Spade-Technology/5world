import { z } from 'zod'

import { api } from '~/utils/api'

export const useEtherscan = api.etherscan.getContractABI.useQuery
