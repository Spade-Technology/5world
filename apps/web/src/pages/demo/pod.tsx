import { useState } from 'react'
import Page from '~/components/layout/page'
import { useCreatePod, usePodReads } from '~/hooks/web3/usePod'
import { useAccount } from 'wagmi'
import { Button } from 'antd'

const IMAGE_BASE_64 =
  'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII='

const Pods = () => {
  const [openCreatePod, setOpenCreatePod] = useState(false)
  const [openRegenDetails, setOpenRegen] = useState(false)

  const { address } = useAccount()
  const {
    createPod,
    mutation: { isLoading },
  } = useCreatePod()
  const { data, refetch, isFetching } = usePodReads({ createdBy: address || '' })

  return (
    <>
      <Page>
        <div className='mx-auto flex flex-col gap-3 text-center'>
          <span> IF YOU'RE NOT LOGGED IN YOU ARE GOING TO GET UNAUTHORIZED</span>

          <Button
            disabled={isLoading}
            onClick={() => {
              if (address)
                createPod(
                  { name: 'test', description: 'test', members: [address], admins: [address], picture: IMAGE_BASE_64 },
                  {
                    onSuccess(data, variables, context) {
                      refetch()
                    },
                  },
                )
            }}
          >
            Create Pod
          </Button>

          <div>
            <div>Your Pods {isFetching ? '(Loading...)' : ''}</div>

            <br />

            {data?.map(pod => (
              <div className='mx-auto flex w-full text-center'>
                <div className='mx-auto flex gap-2 text-xl text-white'>
                  Image: <img src={('data:image/png;base64,' + pod.picture) as any} /> || PodId: {pod.id} || PodName:{' '}
                  {pod.name} || PodDescription: {pod.description}
                  <br />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Page>
    </>
  )
}

export default Pods
