import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

export const StewardUnit = 'second'
export const ApplicationTime = dayjs.duration(5, 'minute')
export const VotingTime = dayjs.duration(50000, 'minute')
export const TotalCycleTime = ApplicationTime.add(VotingTime)
