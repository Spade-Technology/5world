/* Library imports */
// import BigNumber from "bignumber.js";

export const shortenAddress = (address: string) => {
  const shortAddr =
    address.toString().slice(0, 8) + '....' + address.toString().slice(address.length - 3, address.length)
  return shortAddr
}

// export const convertToEth = (balance: any, decimals?: number | undefined) => {
//   if (balance && parseFloat(balance) > 0) {
//     const bal =
//       balance &&
//       new BigNumber(parseFloat(balance).toFixed(decimals ? decimals : 18))
//         .div(Math.pow(10, decimals ? decimals : 18))
//         .toFixed();
//     return bal;
//   }
// };

// export const convertToWei = (balance: any, decimals?: number) => {
//   try {
//     const bal = new BigNumber(
//       parseFloat(balance).toFixed(decimals ? decimals : 18)
//     )
//       .multipliedBy(Math.pow(10, decimals ? decimals : 18))
//       .toFixed();
//     return bal;
//   } catch (error) {
//     console.log("error in converting to eth", error);
//   }
// };

export const copyToClipboard = async (text: string) => {
  typeof window !== 'undefined' && (await window.navigator.clipboard.writeText(text))
  return
}

// export const handleDecimals = (amount: string, decimals?: number) => {
//   if (amount && parseFloat(amount) > 0 && amount.toString().includes(".")) {
//     if (decimals && decimals < 5) {
//       return parseFloat(amount).toFixed(decimals);
//     } else if (
//       parseFloat(parseFloat(amount).toFixed(decimals ? decimals : 5)) === 0
//     ) {
//       return "<0.00001";
//     } else {
//       const value = parseFloat(amount).toFixed(decimals ? decimals : 4);
//       const newValue = value.split(".");
//       if (newValue.length > 0 && parseFloat(newValue[1]) === 0) {
//         return newValue[0] + "(aprox.)";
//       } else {
//         return value;
//       }
//     }
//   } else {
//     return amount;
//   }
// };

export const debounce = (callBackFun: any, timeout: number) => {
  const timer = setTimeout(() => {
    callBackFun()
  }, timeout)

  return () => {
    clearTimeout(timer)
  }
}

export const convertTimeToUnixTimeStamp = (minutes: number) => {
  const timestamp = Math.round(+new Date() / 1000) + minutes * 60
  return timestamp
}

export const convertToUnixTimeStampToTime = (unixTimestamp: number) => {
  // const unixTimestamp = 1615363700; // Unix timestamp in seconds
  const dateObj = new Date(unixTimestamp * 1000) // convert to milliseconds by multiplying with 1000
  const date = dateObj.toDateString() // get date in format "Thu Mar 10 2022"
  const time = dateObj.toLocaleTimeString() // get time in format "8:08:20 AM"
  // console.log(date + " " + time); // output: "Thu Mar 10 2022 8:08:20 AM"
  return date + ' ' + time
}

export const getCurrentUnixTimeStamp = () => {
  return Math.floor(Date.now() / 1000)
}
