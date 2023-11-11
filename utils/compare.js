export default function getDaysBetween(startDate, enDate) {
  const sDate = Date.parse(startDate);
  const eDate = Date.parse(enDate);
  console.log(startDate,'当前时间')
  console.log(enDate,'计算时间')
  let zxl = sDate - eDate;
  if (zxl < 0) {
    return false;
  } else {
    return true;
  }
}