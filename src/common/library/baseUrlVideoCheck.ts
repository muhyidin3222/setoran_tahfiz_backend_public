export const check_path_video = (url) => {
  if (url && url.length) {
    if (url.includes('https://')) return url;
    return 'https://bisaekspor.s3.amazonaws.com/production' + url;
  } else {
    return null;
  }
};

export const check_video_mp4_360 = (url) => {
  if (url && url.length) {
    if (url.includes('https://')) return url;
    return 'https://video-bix.s3.ap-southeast-1.amazonaws.com/production' + url;
  } else {
    return null;
  }
};

export const check_new_path = (url) => {
  if (url && url.length) {
    if (url.includes('https://')) return url;
    return 'https://cdn.bisaekspor.com/production' + url;
  } else {
    return null;
  }
};
