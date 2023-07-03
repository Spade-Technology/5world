import { Dispatch, SetStateAction, useState } from 'react'
import { useAccount } from 'wagmi'
import CustomModal from '~/components/misc/customModal'
import { useEditUser, useUserRead } from '~/hooks/web3/useUser'
import ProfilePic from 'public/icons/blog/createdByLogo.svg'
import Image from 'next/image'
import { Null_Address } from '~/utils/config'
import { shortenAddress } from '~/utils/helpers'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'

type PopupProps = {
  show: boolean
  close: any
  setOpenProfile: Dispatch<SetStateAction<boolean>>
}

const EditProfile = ({ show, close, setOpenProfile }: PopupProps) => {
  const { address } = useAccount()
  const [editPic, setEditPic] = useState(false)
  const [name, setName] = useState('')
  const [picture, setPicture] = useState('')
  const [description, setDescription] = useState('')
  const [twitter, setTwitter] = useState('')

  const { data } = useUserRead(
    {
      address: address!,
      include: {
        guild: true,
      },
    },
    {
      enabled: false,
    },
  )

  const { editUser } = useEditUser()

  const onImageChange = (evt: any) => {
    const file = evt.target.files[0]
    const fileName = file.name
    // const objectUrl = URL.createObjectURL(file)
    var reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      if (reader.result) {
        setPicture(reader.result.toString())
      }
    }
    reader.onerror = function (error) {
      console.log('Error: ', error)
    }
  }

  const SaveProfile = () => {
    // if (!edit) {
    //   setEdit(true)
    // } else {
    if (name || picture || description) {
      editUser(
        { name: name ? name : data.name!, description: description ? description : data?.description!, picture: picture ? picture : data.picture! },
        // {
        //     onSuccess(data, variables, context) {
        //       notification.success({
        //         message: 'Sucessful',
        //         description: 'Created a new pod...!',
        //       })
        //       refetch()
        //     },
        //     onError() {
        //       notification.error({
        //         message: 'Failed',
        //         description: 'Try again! Failed to create a new pod.',
        //       })
        //     },
        //   },
      )
      close()
    }
    close()
    //   setEdit(false)
    // }
  }

  return (
    <CustomModal show={show} close={close} heading='Edit Profile'>
      <div className='my-10 mr-6 font-body text-vdao-dark'>
        <div className='flex w-full gap-10'>
          {
            // picture ? (
            //   <Image src={picture} alt='preview' height={44} width={44} className='rounded-full' />
            // ) :
            editPic ? (
              <label
                className='my-auto cursor-pointer rounded-full border-[1px] border-black px-5 py-10
                                  text-center align-middle font-heading text-xl font-medium'
              >
                <input type='file' accept='image/*' onChange={onImageChange} className='hidden cursor-pointer pt-5' />
                {/* <div className='text-xs'>click me</div> */}
                {picture ? 'Uploaded' : 'Click me'}
              </label>
            ) : (
              <Image src={data ? data.picture : ProfilePic} alt='' height={44} width={44} className='h-[64.2px] w-[60px] rounded-full md:h-[128.41px] md:w-[123.41px] ' />
            )
          }

          <div className='my-auto'>
            <div className='text-4xl font-bold text-vdao-light'>{data ? data.name : 'UnNamed'}</div>
            <div className=' text-[22px] font-medium'>{data ? shortenAddress(data.address) : shortenAddress(Null_Address)}</div>
          </div>
        </div>
        <div
          className='float-right mt-4 w-fit cursor-pointer rounded-[5px] border-[1px] border-vdao-dark 
        px-5 font-heading text-xl font-medium'
          onClick={() => setEditPic(true)}
        >
          edit profile picture
        </div>

        <div className='my-20'>
          <div className='mt-10 font-heading text-xl font-medium'>Username</div>
          <input placeholder='Username' value={name} onChange={evt => setName(evt.target.value)} className='mt-2 w-full rounded-[10px] border-[1px] border-vdao-dark p-5 text-base outline-none' />

          <div className='mt-10 font-heading text-xl font-medium'>Description</div>
          <textarea
            placeholder='Enter your description'
            value={description}
            onChange={evt => setDescription(evt.target.value)}
            className='mt-2 w-full rounded-[10px] border-[1px] border-vdao-dark p-5 text-base outline-none placeholder:h-[400px]'
          />

          <div className='mt-10 font-heading text-xl font-medium'>Twitter</div>
          <input
            placeholder='Enter your Twitter username'
            value={twitter}
            onChange={evt => setTwitter(evt.target.value)}
            className='mt-2 w-full rounded-[10px] border-[1px] border-vdao-dark p-5 text-base outline-none'
          />

          <PrimaryButton text='save profile' className='float-right mt-10' onClick={SaveProfile} />
        </div>
      </div>
    </CustomModal>
  )
}

export default EditProfile
