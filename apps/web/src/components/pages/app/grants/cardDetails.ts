import Image1 from 'public/illustrations/grants/image1.svg'
import Image2 from 'public/illustrations/grants/image2.svg'
import Image3 from 'public/illustrations/grants/image3.svg'
import Image4 from 'public/illustrations/grants/image4.svg'

export const GrantDetails = [
  {
    id: 3,
    title: 'Current Round: 300K for Soil Research',
    proposedBy: 'Bhanu',
    rules:
      'This page contains details of the projects which have been selected to receive grants from the DAO following the application phase. DAO funding received by each proposal is proportionate to the number of votes received from within the community.',

    //   enum RoundState {
    //     Pending,
    //     ApplicationActive,
    //     ApplicationReview,
    //     Active,
    //     Completed,
    //     FundsAllocated
    //     Canceled,
    //     Defeated,
    //     Succeeded,
    //     Queued,
    //     Expired,
    //     Executed
    // } (id: 0 is Pending, 1 is ApplicationActive, 2 is ApplicationReview, 3 is Active, 4 is Completed, 5 is FundsAllocated, etc...)
    status: 1,

    // when people can create their project. if it's not within that time, the people shouldn't be able to create a project
    applicationStartBlock: 1234567890n,
    applicationEndBlock: 1234567890n,

    // This is the voting time. If it's not within that time, the people shouldn't be able to vote
    roundStartBlock: 1234567890n,
    roundEndBlock: 1234567890n,

    totalVotes: 1234567890n,
    quadraticVotes: 12356789n,

    // The matching amount is in wei (10^18 or anything else depending on the token decimals)
    matchingAmount: 1234567890n,
    tokenAddress: '0x1234567890',

    requests: [
      {
        image: Image3,
        title: 'Grant Title Goes Here',
        lastUpdated: '2 day ago', // convert to block
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus. Quisque nec tempus diam, sit amet luctus mi. ',
      },
      {
        image: Image2,
        title: 'Grant Title Goes Here',
        lastUpdated: '10 day ago', // convert to block
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus. Quisque nec tempus diam, sit amet luctus mi. ',
      },
      {
        image: Image4,
        title: 'Grant Title Goes Here',
        lastUpdated: '1 day ago', // convert to block
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus. Quisque nec tempus diam, sit amet luctus mi. ',
      },
      {
        image: Image1,
        title: 'Grant Title Goes Here',
        lastUpdated: '100 day ago', // convert to block
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus. Quisque nec tempus diam, sit amet luctus mi. ',
      },
    ],
  },
]
