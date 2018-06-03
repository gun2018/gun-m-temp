/**
 * 设备判断
 */
// 兼容 CommonJS 与 ES6 module
module.exports = function detect(req) {
  const ua =
    (process.browser
      ? window.navigator.userAgent
      : req.headers['user-agent']) || '';
  const os = {};
  const browser = {};
  const webkit = ua.match(/WebKit\/([\d.]+)/);
  const android = ua.match(/(Android).*([\d.]+)/);
  const ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  const iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
  const kindle = ua.match(/Kindle\/([\d.]+)/);
  const silk = ua.match(/Silk\/([\d._]+)/);
  const uc = ua.match(/UC/);
  const ssz = ua.match(/ssz|shensz/gi);
  const windows = ua.match(/Win/);
  const mac = ua.match(/Mac/);
  const wechat = ua.match(/MicroMessenger/);
  const qq = ua.match(/QQ/);
  const ie = ua.match(/msie (\d+\.\d+)/i); // 只能判断IE11以下（不包含IE11）
  browser.webkit = !!webkit;

  if (browser.webkit) {
    browser.version = webkit[1];
  }
  if (android) {
    os.android = true;
    os.version = android[2];
  }
  if (iphone) {
    os.ios = true;
    os.iphone = true;
    os.version = iphone[2].replace(/_/g, '.');
  }
  if (ipad) {
    os.ios = true;
    os.ipad = true;
    os.version = ipad[2].replace(/_/g, '.');
  }
  if (kindle) {
    os.kindle = true;
    os.version = kindle[1];
  }
  if (windows) {
    os.windows = true;
    if (ua.search(/[win|x|wow]64/i) === -1) os.winCpu = '32';
    else os.winCpu = '64';
  }
  if (ssz) {
    browser.ssz = true;
  }
  if (mac) {
    os.mac = true;
  }
  if (silk) {
    browser.silk = true;
    browser.version = silk[1];
  }
  if (!silk && os.android && ua.match(/Kindle Fire/)) {
    browser.silk = true;
  }
  if (uc) {
    browser.uc = true;
    const ucstr = ua.substring(ua.indexOf('UC'), ua.length);
    let uclen = ucstr.indexOf(' ');
    uclen = uclen > -1 ? uclen : ucstr.length;
    browser.version = ucstr.substring(ucstr.indexOf('/') + 1, uclen);
  }
  if (wechat) {
    browser.wechat = true;
  }
  if (qq) {
    browser.qq = true;
  }
  if (ie) {
    browser.ie = true;
    browser.version = +ie[1];
  }
  if (!android && !ipad && !iphone && !kindle && !silk && !wechat && !uc) {
    browser.desktop = true;
  }

  const scaleRate = process.browser
    ? (() => {
        const dpr = window.dpr || 1;
        if (os.iphone) {
          return dpr;
        } else if (os.android) {
          if (browser.uc) {
            return 1;
          }
          return dpr;
        }
        return 1;
      })()
    : null;

  return {
    os,
    browser,
    scaleRate,
  };
};
