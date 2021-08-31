/**
 * Take a time and render how long it has past from anchor_date in human form: 
 * few seconds ago, {n} minute(s) ago, {n} hour(s) ago, {n} day(s) ago, {n} month(s) ago, date - for years ago
 * @param {Date} d - the past
 * @param {Date} anchor_date - the anchor_date
 */
export const renderTimeSinceAnchorDate = (d, anchor_date) => {
  const _printDate = (_d) => {
    return _d.getFullYear()+"-"+(_d.getMonth()+1)+"-"+_d.getDate()
  }
  let _now = new Date()
  if(anchor_date !== undefined){
    _now = new Date(anchor_date)
  }
  const _d = new Date(d)
  // difference in milliseconds
  const diff = _now.valueOf() - _d.valueOf() 
  const aMinute = 60*1000
  const anHour = 60*aMinute
  const aDay = 24*anHour
  const aMonth = 30*aDay
  const aYear = 12*aMonth
  
  if(diff < aMinute) {
    return "vài s trước"
  }else if(diff < anHour) {
    return parseInt(diff/aMinute)+" phút trước"
  }else if(diff < aDay) {
    return parseInt(diff/anHour)+" giờ trước"
  }else if(diff < aMonth) {
    return parseInt(diff/aDay)+" ngày trước, "+_printDate(_d)
  }else if(diff < aYear) {
    return parseInt(diff/aMonth)+" tháng trước, "+_printDate(_d)
  }else {
    return _printDate(_d)
  }
}

export const vnPhoneRegex =/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/