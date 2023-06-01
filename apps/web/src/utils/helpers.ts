/* Library imports */
// import BigNumber from "bignumber.js";

import { DatePickRef } from 'antd/es/date-picker/generatePicker/interface'
import { monthNames } from './date'

export const shortenAddress = (address: string) => {
  const shortAddr =
    address.toString().slice(0, 8) + '....' + address.toString().slice(address.length - 3, address.length)
  return shortAddr
}

export const shortenText = (text: string, len?: number) => {
  const length = len ? len : 13
  const shortText = text.length > length ? text.slice(0, length) + "..." : text
  return shortText
}

export const copyToClipboard = async (text: string) => {
  typeof window !== 'undefined' && (await window.navigator.clipboard.writeText(text))
  return
}

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

export const JoinedAtFormat = (date: any) => {
  const joinedAt =
     date && date.length > 0 
      ? 'Joined' + monthNames[date.getUTCMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
      : 'Joined at unavailable'

  return joinedAt
}
