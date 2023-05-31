import CustomModal from '~/components/misc/customModal'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'

type CreateGrantProps = {
  show: boolean
  close: any
}

const CreateGrant = ({ show, close }: CreateGrantProps) => {
  return (
    <CustomModal show={show} close={close} heading='Create Grants'>
      <div className='pt-10 pb-[24px] font-body text-lg font-normal md:pt-[60px]'>
        <div className='grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-[76px]'>
          <div>
            <div>
              <div className='flex justify-between'>
                <div className='text-[22px] font-bold'>Project Name</div>
                <div className='text-vdao-light'>*Required</div>
              </div>
              <input
                className='mt-[17px] h-10 w-full max-w-[480px] rounded-[10px] border-[1px] border-vdao-dark px-5 outline-none placeholder:py-2 placeholder:pl-5 md:mt-5'
                placeholder='What’s the project name?'
              />
            </div>

            <div className='pt-10'>
              <div className='flex justify-between'>
                <div className='text-[22px] font-bold'>Project Website</div>
                <div className='text-vdao-light'>*Required</div>
              </div>
              <input
                className='mt-[17px] h-10 w-full max-w-[480px] rounded-[10px] border-[1px] border-vdao-dark px-5 outline-none placeholder:py-2 placeholder:pl-5 md:mt-5'
                placeholder='Your project’s website'
              />
            </div>

            <div className='pt-10'>
              <div className='flex justify-between'>
                <div className='text-[22px] font-bold'>Project Twitter Account</div>
                <div className='text-[#909090]'>Optional</div>
              </div>
              <input
                className='mt-[17px] h-10 w-full max-w-[480px] rounded-[10px] border-[1px] border-vdao-dark px-5 outline-none placeholder:py-2 placeholder:pl-5 md:mt-5'
                placeholder='twitterid'
              />
            </div>
          </div>

          <div>
            <div>
              <div className='text-[22px] font-bold'>Project Logo</div>
              <div className='mt-5 rounded-[10px] py-5 text-center outline-dotted md:py-9'>
                <div className='font-medium md:text-[22px]'>
                  Click to Upload or drag and drop
                  <br /> PNG or JPG (Required: 300px X 300px)
                </div>
              </div>
            </div>

            <div className='pt-[30px]'>
              <div className='text-[22px] font-bold'>Project Logo</div>
              <div className='mt-5 rounded-[10px] py-5 text-center outline-dotted md:py-9'>
                <div className='font-medium md:text-[22px]'>
                  Click to Upload or drag and drop <br />
                  PNG or JPG (Required: 1500px X 300px)
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-10'>
          <div className='flex justify-between'>
            <div className='text-[22px] font-bold'>Description</div>
            <div className='text-vdao-light'>*Required</div>
          </div>

          <div className='mt-5 rounded-[10px] py-[30px] px-5 outline md:p-10 md:pr-[94px]'>
            The Governance Facilitator(s) and the Protocol Engineering Core Unit have placed an urgent out-of-schedule
            executive proposal into the voting system. MKR Holders should vote for this proposal if they support the
            following alterations to the Maker Protocol.
            <br />
            <br />
            If you are new to voting in the Maker Protocol, please see the voting guide to learn how voting works, and
            this wallet setup guide to set up your wallet to vote.
            <br />
            <br />
            Executive Summary
            <br />
            If this executive proposal passes, the following changes will occur within the Maker Protocol:
            <br />
            <br />
            Urgent Parameter Changes to MATIC-A, LINK-A, YFI-A, renBTC-A, and MANA-A Vaults, as detailed below. Voting
            for this executive proposal will place your MKR in support of the changes and additions outlined above.
          </div>
        </div>

        <div className='pt-[20px] md:pt-10'>
          <PrimaryButton
            text='Submit'
            className='float-right py-[5px] px-[35px] text-xl font-medium'
            onClick={() => close()}
          />
        </div>
      </div>
    </CustomModal>
  )
}

export default CreateGrant
