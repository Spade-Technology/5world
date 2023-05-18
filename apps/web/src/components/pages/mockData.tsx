export const pieChartData = [
  { num: 251, title: 'Votes Delegated' },
  { num: 31, title: `Proposals Created` },
  {
    num: 98,
    title: `Praise
Score`,
  },
  { num: 126, title: `Discussions` },
]

export const membersData = [
  {
    img: '/illustrations/home/SVG/image 10 (1).svg',
    name: ' Lostpoet',
    category: 'Core Team',
    date: 'Today',
    time: '8:22 PM',
  },
  {
    img: '/illustrations/home/SVG/513ef3cfd86d5a226fa969aa5d579e54 1 (1).svg',
    name: 'NinjaSam',
    category: 'Member',
    date: 'Today',
    time: '8:22 PM',
  },
  {
    img: '/illustrations/home/SVG/dc7ec0dbb1dcd8463a09195042bdee44 1 (3).svg',
    name: 'BearXYZ',
    category: ' Member',
    date: 'Today',
    time: '8:22 PM',
  },
  {
    img: '/illustrations/home/SVG/dc7ec0dbb1dcd8463a09195042bdee44 1 (2).svg',
    name: 'CyberGod01',
    category: 'Member',
    date: 'Today',
    time: '8:22 PM',
  },
]

export const onlineMembersData = [
  {
    img: '/illustrations/home/SVG/image 10 (5).svg',
    name: ' markEZ',
  },
  {
    img: '/illustrations/home/SVG/513ef3cfd86d5a226fa969aa5d579e54 1 (5).svg',
    name: 'markEZ',
  },
  {
    img: '/illustrations/home/SVG/513ef3cfd86d5a226fa969aa5d579e54 1 (6).svg',
    name: 'markEZ',
  },
  {
    img: '/illustrations/home/SVG/513ef3cfd86d5a226fa969aa5d579e54 1 (7).svg',
    name: 'markEZ',
  },
  {
    img: '/illustrations/home/SVG/513ef3cfd86d5a226fa969aa5d579e54 1 (4).svg',
    name: ' markEZ',
  },
  {
    img: '/illustrations/home/SVG/image 10 (3).svg',
    name: 'markEZ',
  },
  {
    img: '/illustrations/home/SVG/513ef3cfd86d5a226fa969aa5d579e54 1 (3).svg',
    name: 'markEZ',
  },
  {
    img: '/illustrations/home/SVG/513ef3cfd86d5a226fa969aa5d579e54 1 (2).svg',
    name: 'markEZ',
  },
]

export const latestDonationData = [
  { title: 'Donation', text: 'Donation to VDAO Treasury', amount: '1.0 ETH' },
  { title: 'Donation', text: 'Donation to VDAO Treasury', amount: '2.0 ETH' },
  { title: 'Donation', text: 'Regen Research Proposal', amount: '5.5 ETH' },
  { title: 'Donation', text: 'Donation to VDAO Treasury', amount: '10.0 ETH' },
]

export const expenditureData = [
  { title: 'Income', amount: '962,213,12', percent: '41.74%' },
  { title: 'Expenses', amount: '156,152,53', percent: '16.57%' },
]

export const LinearChart: any = {
  series: [
    {
      name: 'Desktops',
      data: [10, 41, 35, 51, 49, 62, 69],
    },
    {
      name: 'ggg',
      data: [0, 41, 35, 51, 0, 62, 69],
    },
  ],
  options: {
    chart: {
      type: 'line',
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    colors: ['#36DFAE', '#FBB0B3'],
    grid: {
      show: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Japan', 'Sun'],
      labels: {
        style: {
          colors: 'white',
          fontSize: '14px',
          fontFamily: 'Satoshi',
        },
      },
    },
    yaxis: {
      tickAmount: 5,
      max: 100,
      min: 0,
      labels: {
        style: {
          colors: 'white',
          fontSize: '14px',
          fontFamily: 'Satoshi',
        },
      },
    },
  },
}

export const horizontalBarchart: any = {
  series: [
    {
      data: [
        { x: 'Mon', y: 200, fillColor: '#36DFAE', strokeColor: '#36DFAE' },
        { x: 'Tue', y: 200, fillColor: '#36DFAE', strokeColor: '#36DFAE' },
        { x: 'Wed', y: 130, fillColor: '#36DFAE', strokeColor: '#36DFAE' },
        { x: 'Thu', y: 400, fillColor: '#36DFAE', strokeColor: '#36DFAE' },
        { x: 'Fri', y: 370, fillColor: '#36DFAE', strokeColor: '#36DFAE' },
        { x: 'Sat', y: 300, fillColor: '#36DFAE', strokeColor: '#36DFAE' },
        { x: 'Sun', y: 180, fillColor: '#36DFAE', strokeColor: '#36DFAE' },
      ],
    },
  ],
  options: {
    chart: {
      type: 'bar',
      height: 350,
    },
    grid: {
      show: false,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        backgroundColor: 'white',
        horizontal: true,
        style: {
          fillColor: 'orange',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Japan', 'Sun'],
      tickAmount: 3,
      max: 400,
      min: 100,
      labels: {
        style: {
          colors: 'white',
          fontSize: '14px',
          fontFamily: 'Satoshi',
        },
      },
    },

    yaxis: {
      labels: {
        style: {
          colors: 'white',
          fontSize: '14px',
          fontFamily: 'Satoshi',
        },
      },
    },
  },
}

// MOBILE VERSION
export const verticalBarchartMobile: any = {
  series: [
    {
      name: 'Net Profit',
      data: [44, 55, 57, 56, 61, 58],
    },
    {
      name: 'Revenue',
      data: [76, 85, 101, 98, 87, 105],
    },
  ],
  options: {
    legend: {
      show: false,
    },
    chart: {
      type: 'bar',
      height: 350,
    },
    grid: {
      show: false,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      labels: {
        style: {
          colors: 'white',
          fontSize: '14px',
          fontFamily: 'Satoshi',
        },
      },
    },
    yaxis: {
      tickAmount: 5,
      max: 100,
      min: 0,
      labels: {
        style: {
          colors: 'white',
          fontSize: '14px',
          fontFamily: 'Satoshi',
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      style: {
        color: 'black',
      },
    },
  },
}

// DESKTOP VERSION
export const verticalBarchartDesktop: any = {
  series: [
    {
      name: 'Net Profit',
      data: [44, 55, 57, 56, 61, 58, 63, 0, 0, 0, 60, 66],
    },
    {
      name: 'Revenue',
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 0, 0, 0],
    },
  ],
  options: {
    legend: {
      show: false,
    },
    chart: {
      type: 'bar',
      height: 350,
    },
    grid: {
      show: false,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: {
        style: {
          colors: 'white',
          fontSize: '14px',
          fontFamily: 'Satoshi',
        },
      },
    },
    yaxis: {
      tickAmount: 5,
      max: 100,
      min: 0,
      labels: {
        style: {
          colors: 'white',
          fontSize: '14px',
          fontFamily: 'Satoshi',
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function () {
          return '$ ' + 40 + ' thousands'
        },
      },
    },
  },
}
