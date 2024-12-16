"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsScript = void 0;
class JsScript {
    constructor() {
        this.sortLargeTrieNumberExplore = (scoreByPattern) => {
            scoreByPattern.sort((a, b) => {
                var _a, _b, _c, _d;
                return ((_a = a === null || a === void 0 ? void 0 : a.replyForumsEntity) === null || _a === void 0 ? void 0 : _a.length) < ((_b = b === null || b === void 0 ? void 0 : b.replyForumsEntity) === null || _b === void 0 ? void 0 : _b.length)
                    ? 1
                    : ((_c = a === null || a === void 0 ? void 0 : a.replyForumsEntity) === null || _c === void 0 ? void 0 : _c.length) > ((_d = b === null || b === void 0 ? void 0 : b.replyForumsEntity) === null || _d === void 0 ? void 0 : _d.length)
                        ? -1
                        : 0;
            });
            return scoreByPattern.slice(0, 3);
        };
        this.validateEmail = (email) => {
            return ((email === null || email === void 0 ? void 0 : email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) || false);
        };
    }
    formatRupiah(angka, prefix) {
        const number_string = String(angka)
            .replace(/[^,\d]/g, '')
            .toString();
        const split = number_string.split(',');
        const sisa = split[0].length % 3;
        let rupiah = split[0].substr(0, sisa);
        const ribuan = split[0].substr(sisa).match(/\d{3}/gi);
        if (ribuan) {
            const separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.');
        }
        rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
        return prefix == undefined ? 'Rp.' + rupiah : rupiah ? 'Rp. ' + rupiah : '';
    }
}
exports.JsScript = JsScript;
//# sourceMappingURL=js-script.service.js.map