import { useEffect, useState } from 'react'

const DATE_UNITS = [
  ['month', 2592000],
  ['week', 604800],
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1],
]

const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ag', 'Sep', 'Oct', 'Nov', 'Dic']

// const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const getDateDiffs = (timestamp) => {
  const now = Date.now()
  const elapsed = (timestamp - now) / 1000

  for (const [unitString, secondsInUnit] of DATE_UNITS) {
    const secondsUnit = Number(secondsInUnit)
    const unit = unitString.toString()

    const typeOfUnit = typeof unit
    const typeOfSegUnit = typeof secondsUnit

    if (typeOfUnit === 'string' && typeOfSegUnit === 'number') {
      if (Math.abs(elapsed) > secondsInUnit || unit === 'second') {
        const value = Math.round(elapsed / secondsUnit)
        return { value, unit }
      }
    }
  }
  return { value: Math.round(elapsed), unit: 'second' }
}

export default function useTimeAgo(timestamp) {
  const [timeago, setTimeago] = useState(() => getDateDiffs(timestamp))

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeAgo = getDateDiffs(timestamp)
      setTimeago(newTimeAgo)
    }, 10000)
    return () => clearInterval(interval)
  }, [timestamp])

  const value = Number(timeago?.value)
  const unit = String(timeago?.unit)

  if (typeof value === 'undefined' && typeof unit === 'undefined') return ''
  for (const [unit, time] of DATE_UNITS) {
    const now = Date.now()
    const fe = (timestamp - now) / 1000
    const myTime = Number(time)

    if (Math.abs(fe) > time) {
      const value = Math.abs(Math.round(fe / myTime))
      if (unit === 'second') {
        return value + 's'
      } else if (unit === 'minute') {
        return value + 'min'
      } else if (unit === 'hour') {
        return value + 'hr'
      } else if (unit === 'day') {
        return value + 'd'
      } else if (unit === 'week') {
        const dayFormat = new Date(timestamp)
        const currentYear = new Date()
        const month = months[dayFormat.getMonth()]
        const day = dayFormat.getDate()

        if (dayFormat.getFullYear() === currentYear.getFullYear()) {
          return `${day} ${month}.`
        } else {
          return `${day} ${month}. ${dayFormat.getFullYear()}`
        }
      }
    }
  }
  return 1 + 'second'
}
