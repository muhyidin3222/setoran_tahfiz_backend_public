export default (url) => {
  if (url && url.length) {
    if (url.includes('https://')) return url;
    return 'https://image.bisaekspor.net/production' + url;
  } else {
    return null;
  }
};
