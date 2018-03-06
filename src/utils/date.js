export function formatNumber(n) {
  // eslint-disable-next-line
  n = n.toString();
  return n[1] ? n : `0${n}`;
}
export function fromNow(date) {
  // eslint-disable-next-line
  date = typeof date === 'object' ? date : new Date(date);
  const monthDate = `${date.getMonth() + 1}月${date.getDate()}日`;
  const hourMin = `${formatNumber(date.getHours())}:${formatNumber(date.getMinutes())}`;

  const now = new Date();
  const dateDiff = now.getDate() - date.getDate();

  const minDiff = now.getFullYear() === date.getFullYear() 
    ? (now - date) / 60000 
    : 999999;

  const timeSection = [1, 60, 1440, 2880, 4320, 525600];
  const timeTextArr = ['minutesBefore', 'hourBefore', 'yesterdayBefore', 'dayBeforeYesterday', 'date', 'fullDate'];
  const formatText = {
    'minutesBefore': `${Math.floor(minDiff)}分钟前`,
    'hourBefore': `${Math.floor(minDiff / 60)}小时前`,
    'yesterdayBefore': `昨天 ${hourMin}`,
    'dayBeforeYesterday': `前天 ${hourMin}`,
    'date': `${monthDate} ${hourMin}`,
    'fullDate': `${date.getFullYear()}年 ${monthDate} ${hourMin}`
  };

  let dateFormat = '刚刚';
  if (dateDiff === 1 || dateDiff === 2) {
    return formatText[timeTextArr[dateDiff + 1]];
  }

  timeSection.forEach((item, index) => {
    if (item < minDiff) {
      dateFormat = formatText[timeTextArr[index]];
    }
  });

  return dateFormat;
}
