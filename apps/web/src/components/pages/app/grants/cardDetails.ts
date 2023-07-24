import Image1 from 'public/illustrations/grants/image1.svg'
import Image2 from 'public/illustrations/grants/image2.svg'
import Image3 from 'public/illustrations/grants/image3.svg'
import Image4 from 'public/illustrations/grants/image4.svg'

import Icon4 from 'public/icons/pods/icon4.svg'
import Icon5 from 'public/icons/pods/icon5.svg'
import Icon6 from 'public/icons/pods/icon6.svg'
import Icon7 from 'public/icons/pods/icon7.svg'
import Icon8 from 'public/icons/pods/icon8.svg'

export const GrantStatus = ['Pending', 'ApplicationActive', 'ApplicationReview', 'Active', 'Completed', 'FundsAllocated', 'Canceled', 'Defeated', 'Succeeded', 'Queued', 'Expired', 'Executed']
export const GrantDetails = [
  {
    id: 1,
    title: 'Current Round: 300K for Soil Research',
    proposedBy: 'Bhanu',
    picture: Icon4,
    address: '0x05C0999373F4d4519A338b9d07F2cE94E2904184',
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
    votingPower: 1000000,
    // when people can create their project. if it's not within that time, the people shouldn't be able to create a project
    applicationStartBlock: 1690089178,
    applicationEndBlock: 1790089178,

    // This is the voting time. If it's not within that time, the people shouldn't be able to vote
    roundStartBlock: 1690089178,
    roundEndBlock: 1790089178,

    //Estimated Amount = (quadrativVotes/total Votes) * matching amount

    totalVotes: 1234567890,
    quadraticVotes: 12356789,

    // The matching amount is in wei (10^18 or anything else depending on the token decimals)
    matchingAmount: 1234567890,
    tokenAddress: '0x1234567890',

    requests: [
      {
        image: Image3,
        title: 'Grant Title Goes Here',
        address: '0xd12512....92C',
        lastUpdated: 1690089178, // convert to block
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus. Quisque nec tempus diam, sit amet luctus mi. ',
        website: 'http://grantexample.world',
        twitter: '@grantexample',
      },
      {
        image: Image1,
        title: 'Grant Title Goes Here',
        address: '0xd12512....92C',
        lastUpdated: 1690089178, // convert to block
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus. Quisque nec tempus diam, sit amet luctus mi. ',
        website: 'http://grantexample.world',
        twitter: '@grantexample',
      },
      {
        image: Image2,
        title: 'Grant Title Goes Here',
        address: '0xd12512....92C',
        lastUpdated: 1690089178, // convert to block
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus. Quisque nec tempus diam, sit amet luctus mi. ',
        website: 'http://grantexample.world',
        twitter: '@grantexample',
      },
      {
        image: Image4,
        title: 'Grant Title Goes Here',
        address: '0xd12512....92C',
        lastUpdated: 1690089178, // convert to block
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus. Quisque nec tempus diam, sit amet luctus mi. ',
        website: 'http://grantexample.world',
        twitter: '@grantexample',
      },
      {
        image: Image1,
        title: 'Grant Title Goes Here',
        address: '0xd12512....92C',
        lastUpdated: 1690089178, // convert to block
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus. Quisque nec tempus diam, sit amet luctus mi. ',
        website: 'http://grantexample.world',
        twitter: '@grantexample',
      },
      {
        image: Image3,
        title: 'Grant Title Goes Here',
        address: '0xd12512....92C',
        lastUpdated: 1690089178, // convert to block
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus. Quisque nec tempus diam, sit amet luctus mi. ',
        website: 'http://grantexample.world',
        twitter: '@grantexample',
      },
      {
        image: Image2,
        title: 'Grant Title Goes Here',
        address: '0xd12512....92C',
        lastUpdated: 1690089178, // convert to block
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus. Quisque nec tempus diam, sit amet luctus mi. ',
        website: 'http://grantexample.world',
        twitter: '@grantexample',
      },
    ],
  },
  {
    id: 2,
    title: 'Current Round: 400K for Soil Research',
    proposedBy: 'Pavan',
    picture: Icon6,
    address: '0x05C0999373F4d4519A338b9d07F2cE94E2904184',
    rules:
      'This page contains details of the projects which have been selected to receive grants from the DAO following the application phase. DAO funding received by each proposal is proportionate to the number of votes received from within the community.',
    status: 7,
    votingPower: 1000000,
    applicationStartBlock: 1690089178,
    applicationEndBlock: 1790089178,
    roundStartBlock: 1690089178,
    roundEndBlock: 1790089178,
    totalVotes: 1234567890,
    quadraticVotes: 12356789,
    matchingAmount: 1234567890,
    tokenAddress: '0x1234567890',

    requests: [
      {
        image: Image2,
        title: 'Grant Title Goes Here',
        address: '0xd12512....92C',
        lastUpdated: 1690089178, // convert to block
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus. Quisque nec tempus diam, sit amet luctus mi. ',
        website: 'http://grantexample.world',
        twitter: '@grantexample',
      },
      {
        image: Image1,
        title: 'Grant Title Goes Here',
        address: '0xd12512....92C',
        lastUpdated: 1690089178, // convert to block
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus. Quisque nec tempus diam, sit amet luctus mi. ',
        website: 'http://grantexample.world',
        twitter: '@grantexample',
      },
      {
        image: Image3,
        title: 'Grant Title Goes Here',
        address: '0xd12512....92C',
        lastUpdated: 1690089178, // convert to block
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus. Quisque nec tempus diam, sit amet luctus mi. ',
        website: 'http://grantexample.world',
        twitter: '@grantexample',
      },
      {
        image: Image4,
        title: 'Grant Title Goes Here',
        address: '0xd12512....92C',
        lastUpdated: 1690089178, // convert to block
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus. Quisque nec tempus diam, sit amet luctus mi. ',
        website: 'http://grantexample.world',
        twitter: '@grantexample',
      },
      {
        image: Image1,
        title: 'Grant Title Goes Here',
        address: '0xd12512....92C',
        lastUpdated: 1690089178, // convert to block
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus. Quisque nec tempus diam, sit amet luctus mi. ',
        website: 'http://grantexample.world',
        twitter: '@grantexample',
      },
      {
        image: Image3,
        title: 'Grant Title Goes Here',
        address: '0xd12512....92C',
        lastUpdated: 1690089178, // convert to block
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus. Quisque nec tempus diam, sit amet luctus mi. ',
        website: 'http://grantexample.world',
        twitter: '@grantexample',
      },
      {
        image: Image2,
        title: 'Grant Title Goes Here',
        address: '0xd12512....92C',
        lastUpdated: 1690089178, // convert to block
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus. Quisque nec tempus diam, sit amet luctus mi. ',
        website: 'http://grantexample.world',
        twitter: '@grantexample',
      },
    ],
  },
  {
    id: 3,
    title: 'Current Round: 700K for Soil Research',
    proposedBy: 'Ranjith',
    picture: Icon7,
    address: '0x05C0999373F4d4519A338b9d07F2cE94E2904184',
    rules:
      'This page contains details of the projects which have been selected to receive grants from the DAO following the application phase. DAO funding received by each proposal is proportionate to the number of votes received from within the community.',
    status: 3,
    votingPower: 1000000,
    applicationStartBlock: 1690089178,
    applicationEndBlock: 1790089178,
    roundStartBlock: 1690089178,
    roundEndBlock: 1790089178,
    totalVotes: 1234567890,
    quadraticVotes: 12356789,
    matchingAmount: 1234567890,
    tokenAddress: '0x1234567890',

    requests: [
      {
        image: Image4,
        title: 'Grant Title Goes Here',
        address: '0xd12512....92C',
        lastUpdated: 1690089178, // convert to block
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus. Quisque nec tempus diam, sit amet luctus mi. ',
        website: 'http://grantexample.world',
        twitter: '@grantexample',
      },
      {
        image: Image1,
        title: 'Grant Title Goes Here',
        address: '0xd12512....92C',
        lastUpdated: 1690089178, // convert to block
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus. Quisque nec tempus diam, sit amet luctus mi. ',
        website: 'http://grantexample.world',
        twitter: '@grantexample',
      },
      {
        image: Image2,
        title: 'Grant Title Goes Here',
        address: '0xd12512....92C',
        lastUpdated: 1690089178, // convert to block
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus. Quisque nec tempus diam, sit amet luctus mi. ',
        website: 'http://grantexample.world',
        twitter: '@grantexample',
      },
      {
        image: Image3,
        title: 'Grant Title Goes Here',
        address: '0xd12512....92C',
        lastUpdated: 1690089178, // convert to block
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus. Quisque nec tempus diam, sit amet luctus mi. ',
        website: 'http://grantexample.world',
        twitter: '@grantexample',
      },
      {
        image: Image1,
        title: 'Grant Title Goes Here',
        address: '0xd12512....92C',
        lastUpdated: 1690089178, // convert to block
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus. Quisque nec tempus diam, sit amet luctus mi. ',
        website: 'http://grantexample.world',
        twitter: '@grantexample',
      },
      {
        image: Image3,
        title: 'Grant Title Goes Here',
        address: '0xd12512....92C',
        lastUpdated: 1690089178, // convert to block
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus. Quisque nec tempus diam, sit amet luctus mi. ',
        website: 'http://grantexample.world',
        twitter: '@grantexample',
      },
      {
        image: Image2,
        title: 'Grant Title Goes Here',
        address: '0xd12512....92C',
        lastUpdated: 1690089178, // convert to block
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus. Quisque nec tempus diam, sit amet luctus mi. ',
        website: 'http://grantexample.world',
        twitter: '@grantexample',
      },
    ],
  },
  {
    id: 4,
    title: 'Current Round: 400K for Soil Research',
    proposedBy: 'Siri',
    picture: Icon8,
    address: '0x05C0999373F4d4519A338b9d07F2cE94E2904184',
    rules:
      'This page contains details of the projects which have been selected to receive grants from the DAO following the application phase. DAO funding received by each proposal is proportionate to the number of votes received from within the community.',
    status: 5,
    votingPower: 1000000,
    applicationStartBlock: 1690089178,
    applicationEndBlock: 1790089178,
    roundStartBlock: 1690089178,
    roundEndBlock: 1790089178,
    totalVotes: 1234567890,
    quadraticVotes: 12356789,
    matchingAmount: 1234567890,
    tokenAddress: '0x1234567890',

    requests: [
      {
        image: Image1,
        title: 'Grant Title Goes Here',
        address: '0xd12512....92C',
        lastUpdated: 1690089178, // convert to block
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus. Quisque nec tempus diam, sit amet luctus mi. ',
        website: 'http://grantexample.world',
        twitter: '@grantexample',
      },
      {
        image: Image2,
        title: 'Grant Title Goes Here',
        address: '0xd12512....92C',
        lastUpdated: 1690089178, // convert to block
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus. Quisque nec tempus diam, sit amet luctus mi. ',
        website: 'http://grantexample.world',
        twitter: '@grantexample',
      },
      {
        image: Image3,
        title: 'Grant Title Goes Here',
        address: '0xd12512....92C',
        lastUpdated: 1690089178, // convert to block
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus. Quisque nec tempus diam, sit amet luctus mi. ',
        website: 'http://grantexample.world',
        twitter: '@grantexample',
      },
      {
        image: Image4,
        title: 'Grant Title Goes Here',
        address: '0xd12512....92C',
        lastUpdated: 1690089178, // convert to block
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus. Quisque nec tempus diam, sit amet luctus mi. ',
        website: 'http://grantexample.world',
        twitter: '@grantexample',
      },
      {
        image: Image1,
        title: 'Grant Title Goes Here',
        address: '0xd12512....92C',
        lastUpdated: 1690089178, // convert to block
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus. Quisque nec tempus diam, sit amet luctus mi. ',
        website: 'http://grantexample.world',
        twitter: '@grantexample',
      },
      {
        image: Image3,
        title: 'Grant Title Goes Here',
        address: '0xd12512....92C',
        lastUpdated: 1690089178, // convert to block
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus. Quisque nec tempus diam, sit amet luctus mi. ',
        website: 'http://grantexample.world',
        twitter: '@grantexample',
      },
      {
        image: Image2,
        title: 'Grant Title Goes Here',
        address: '0xd12512....92C',
        lastUpdated: 1690089178, // convert to block
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus. Quisque nec tempus diam, sit amet luctus mi. ',
        website: 'http://grantexample.world',
        twitter: '@grantexample',
      },
    ],
  },
  {
    id: 5,
    title: 'Current Round: 400K for Soil Research',
    proposedBy: 'Vamshi',
    picture: Icon4,
    address: '0x05C0999373F4d4519A338b9d07F2cE94E2904184',
    rules:
      'This page contains details of the projects which have been selected to receive grants from the DAO following the application phase. DAO funding received by each proposal is proportionate to the number of votes received from within the community.',
    status: 6,
    votingPower: 1000000,
    applicationStartBlock: 1690089178,
    applicationEndBlock: 1790089178,
    roundStartBlock: 1690089178,
    roundEndBlock: 1790089178,
    totalVotes: 1234567890,
    quadraticVotes: 12356789,
    matchingAmount: 1234567890,
    tokenAddress: '0x1234567890',

    requests: [
      {
        image: Image2,
        title: 'Grant Title Goes Here',
        address: '0xd12512....92C',
        lastUpdated: 1690089178, // convert to block
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus. Quisque nec tempus diam, sit amet luctus mi. ',
        website: 'http://grantexample.world',
        twitter: '@grantexample',
      },
      {
        image: Image1,
        title: 'Grant Title Goes Here',
        address: '0xd12512....92C',
        lastUpdated: 1690089178, // convert to block
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus. Quisque nec tempus diam, sit amet luctus mi. ',
        website: 'http://grantexample.world',
        twitter: '@grantexample',
      },
      {
        image: Image3,
        title: 'Grant Title Goes Here',
        address: '0xd12512....92C',
        lastUpdated: 1690089178, // convert to block
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus. Quisque nec tempus diam, sit amet luctus mi. ',
        website: 'http://grantexample.world',
        twitter: '@grantexample',
      },
      {
        image: Image4,
        title: 'Grant Title Goes Here',
        address: '0xd12512....92C',
        lastUpdated: 1690089178, // convert to block
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus. Quisque nec tempus diam, sit amet luctus mi. ',
        website: 'http://grantexample.world',
        twitter: '@grantexample',
      },
      {
        image: Image1,
        title: 'Grant Title Goes Here',
        address: '0xd12512....92C',
        lastUpdated: 1690089178, // convert to block
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus. Quisque nec tempus diam, sit amet luctus mi. ',
        website: 'http://grantexample.world',
        twitter: '@grantexample',
      },
      {
        image: Image3,
        title: 'Grant Title Goes Here',
        address: '0xd12512....92C',
        lastUpdated: 1690089178, // convert to block
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus. Quisque nec tempus diam, sit amet luctus mi. ',
        website: 'http://grantexample.world',
        twitter: '@grantexample',
      },
      {
        image: Image2,
        title: 'Grant Title Goes Here',
        address: '0xd12512....92C',
        lastUpdated: 1690089178, // convert to block
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus. Quisque nec tempus diam, sit amet luctus mi. ',
        website: 'http://grantexample.world',
        twitter: '@grantexample',
      },
    ],
  },
  {
    id: 6,
    title: 'Current Round: 100K for Soil Research',
    proposedBy: 'Prasad',
    picture: Icon5,
    address: '0x05C0999373F4d4519A338b9d07F2cE94E2904184',
    rules:
      'This page contains details of the projects which have been selected to receive grants from the DAO following the application phase. DAO funding received by each proposal is proportionate to the number of votes received from within the community.',
    status: 8,
    votingPower: 1000000,
    applicationStartBlock: 1690089178,
    applicationEndBlock: 1790089178,
    roundStartBlock: 1690089178,
    roundEndBlock: 1790089178,
    totalVotes: 1234567890,
    quadraticVotes: 12356789,
    matchingAmount: 1234567890,
    tokenAddress: '0x1234567890',

    requests: [
      {
        image: Image1,
        title: 'Grant Title Goes Here',
        address: '0xd12512....92C',
        lastUpdated: 1690089178, // convert to block
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus. Quisque nec tempus diam, sit amet luctus mi. ',
        website: 'http://grantexample.world',
        twitter: '@grantexample',
      },
      {
        image: Image2,
        title: 'Grant Title Goes Here',
        address: '0xd12512....92C',
        lastUpdated: 1690089178, // convert to block
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus. Quisque nec tempus diam, sit amet luctus mi. ',
        website: 'http://grantexample.world',
        twitter: '@grantexample',
      },
      {
        image: Image3,
        title: 'Grant Title Goes Here',
        address: '0xd12512....92C',
        lastUpdated: 1690089178, // convert to block
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus. Quisque nec tempus diam, sit amet luctus mi. ',
        website: 'http://grantexample.world',
        twitter: '@grantexample',
      },
      {
        image: Image4,
        title: 'Grant Title Goes Here',
        address: '0xd12512....92C',
        lastUpdated: 1690089178, // convert to block
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus. Quisque nec tempus diam, sit amet luctus mi. ',
        website: 'http://grantexample.world',
        twitter: '@grantexample',
      },
      {
        image: Image1,
        title: 'Grant Title Goes Here',
        address: '0xd12512....92C',
        lastUpdated: 1690089178, // convert to block
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus. Quisque nec tempus diam, sit amet luctus mi. ',
        website: 'http://grantexample.world',
        twitter: '@grantexample',
      },
      {
        image: Image3,
        title: 'Grant Title Goes Here',
        address: '0xd12512....92C',
        lastUpdated: 1690089178, // convert to block
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus. Quisque nec tempus diam, sit amet luctus mi. ',
        website: 'http://grantexample.world',
        twitter: '@grantexample',
      },
      {
        image: Image2,
        title: 'Grant Title Goes Here',
        address: '0xd12512....92C',
        lastUpdated: 1690089178, // convert to block
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus. Quisque nec tempus diam, sit amet luctus mi. ',
        website: 'http://grantexample.world',
        twitter: '@grantexample',
      },
    ],
  },
]
