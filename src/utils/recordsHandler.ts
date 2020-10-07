import dayjs from 'dayjs'
import weekHash from '@/constants/weekHash'

type PieChartDataItem = {
  name: string;
  value: number;
}

export type PieChartData = PieChartDataItem[]

export type LineChartData = {
  xData: string[];
  yData: number[];
}

export const mapRecordsByDate = (records: RecordItem[], amountType?: AmountType, tag?: TagItem) => {
  records.sort((a: RecordItem, b: RecordItem) => {
    const aTime = new Date(a.date).getTime()
    const bTime = new Date(b.date).getTime()
    return bTime - aTime
  })
  const map: any = {}
  if (amountType && tag) {
    records = records.filter(record => record.type === amountType && record.tag.value === tag.value)
  }
  records.forEach(record => {
    const y = dayjs(record.date).year()
    const m = dayjs(record.date).month() + 1
    const d = dayjs(record.date).date()
    if (!map[`${ y }-${ m }-${ d }`]) {
      map[`${ y }-${ m }-${ d }`] = [record]
    } else {
      map[`${ y }-${ m }-${ d }`].push(record)
    }
  })
  return map
}

export const filterRecordsByYearAndMonth = (records: RecordItem[], year: number, month: number, amountType?: AmountType, tag?: TagItem): { [key: string]: RecordItem[] } => {
  const dateMap = mapRecordsByDate(records, amountType, tag)
  const map: any = {}
  for (const prop in dateMap) {
    // eslint-disable-next-line no-prototype-builtins
    if (dateMap.hasOwnProperty(prop)) {
      const y = parseInt(prop.split('-')[0])
      const m = parseInt(prop.split('-')[1])
      if (year === y && month === m) {
        map[prop] = dateMap[prop]
      }
    }
  }
  return map
}

export const getDayAmount = (records: RecordItem[], amountType: AmountType, year: number, month: number, day: number) => {
  let total = 0
  records.forEach((record: RecordItem) => {
    const y = dayjs(record.date).year()
    const m = dayjs(record.date).month() + 1
    const d = dayjs(record.date).date()
    if (y === year && m === month && d ===  day && record.type === amountType) {
      total += record.amount
    }
  })
  return total
}

export const getTotalAmountOfMonth = (records: RecordItem[], year: number, month: number) => {
  let income = 0
  let outlay = 0
  records.forEach(record => {
    const y = dayjs(record.date).year()
    const m = dayjs(record.date).month() + 1
    if (y === year && m === month && record.type === '+') {
      income += record.amount
    }
    if (y === year && m === month && record.type === '-') {
      outlay += record.amount
    }
  })
  return { outlay, income }
}

export const getAverageAmountOfMonth = (records: RecordItem[], year: number, month: number, type: AmountType) => {
  const days = dayjs(year + '' + month).daysInMonth()
  const totalAmount = getTotalAmountOfMonth(records, year, month)
  if (type === '+')
    return (totalAmount.income / days).toFixed(2)
  else
    return (totalAmount.outlay / days).toFixed(2)
}

export const getLineChartData = (records: RecordItem[], year: number, month: number, type: AmountType): LineChartData => {
  const days = dayjs(year + '' + month).daysInMonth()
  const map: { [key: string]: number } = {}
  for (let i = 1; i < days + 1; i++) {
    map[i] = 0
  }
  records.forEach((record: RecordItem) => {
    const y = dayjs(record.date).year()
    const m = dayjs(record.date).month() + 1
    const d = dayjs(record.date).date()
    if (y === year && m === month && record.type === type) {
      if (map[d] === 0) {
        map[d] = record.amount
      } else {
        map[d] += record.amount
      }
    }
  })
  return { xData: Object.keys(map), yData: Object.values(map) }
}

export const getAmountByTag = (records: RecordItem[], tagTitle: string) => {
  let amount = 0
  records.forEach((record: RecordItem) => {
    if (tagTitle === record.tag.title) {
      amount += record.amount
    }
  })
  return amount
}

export const getPieChartData = (records: RecordItem[], year: number, month: number, type: AmountType) => {
  const dataArray: PieChartData = []
  const tagsMap: { [key: string]: boolean } = {}
  records.forEach((record: RecordItem) => {
    const y = dayjs(record.date).year()
    const m = dayjs(record.date).month() + 1
    if (y === year && m === month && record.type === type && !tagsMap[record.tag.title]) {
      tagsMap[record.tag.title] = true
    }
  })
  const tags = Object.keys(tagsMap)
  tags.forEach(tag => {
    dataArray.push({ name: tag, value: getAmountByTag(records, tag) })
  })
  return dataArray
}