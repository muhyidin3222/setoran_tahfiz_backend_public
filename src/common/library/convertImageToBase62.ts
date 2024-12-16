export default async (url, callBack) => {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    const reader: any = new FileReader();
    reader.onloadend = function () {
      callBack(reader.result.split('data:image/png;base64,')[0]);
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
};
