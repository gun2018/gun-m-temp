import DiffMatchPatch, {
  DIFF_DELETE,
  DIFF_EQUAL,
  DIFF_INSERT,
} from 'diff-match-patch';

const dmp = new DiffMatchPatch();

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

export function getDiffHTML(strA, strB) {
  const diffs = dmp.diff_main(strA, strB);
  let html = '';
  for (let i = 0; i < diffs.length; i++) {
    const op = diffs[i][0];
    const data = diffs[i][1];
    switch (op) {
      case DIFF_INSERT:
        html += `<ins>${data}</ins>`;
        break;
      case DIFF_DELETE:
        html += `<del>${data}</del>`;
        break;
      case DIFF_EQUAL:
        html += data;
        break;
      default:
        break;
    }
  }
  return html;
}
