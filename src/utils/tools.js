export function parseQuery(query) {
  const map = {};
  const quertArr = query.match(/([^?&=]+)=([^?&=]*)/g);
  if (quertArr) {
    quertArr.forEach(item => {
      const itemArr = item.split('=');
      map[itemArr[0]] = itemArr[1];
    });
  }
  return map;
}
