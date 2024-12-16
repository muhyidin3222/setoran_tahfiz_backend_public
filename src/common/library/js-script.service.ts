export class JsScript {
  sortLargeTrieNumberExplore = (scoreByPattern) => {
    scoreByPattern.sort((a, b) => {
      return a?.replyForumsEntity?.length < b?.replyForumsEntity?.length
        ? 1
        : a?.replyForumsEntity?.length > b?.replyForumsEntity?.length
        ? -1
        : 0;
    });
    return scoreByPattern.slice(0, 3);
  };

  formatRupiah(angka: any, prefix?: string) {
    const number_string: string = String(angka)
      .replace(/[^,\d]/g, '')
      .toString();
    const split: any = number_string.split(',');
    const sisa: any = split[0].length % 3;
    let rupiah: any = split[0].substr(0, sisa);
    const ribuan: any = split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if (ribuan) {
      const separator: string = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix == undefined ? 'Rp.' + rupiah : rupiah ? 'Rp. ' + rupiah : '';
  }

  validateEmail = (email) => {
    return (
      email?.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      ) || false
    );
  };
}
