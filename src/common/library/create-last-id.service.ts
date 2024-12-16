import { parseInt } from 'lodash';

const moment = require('moment');

function padIt(s) {
  s = '' + s;
  while (s.length < 3) {
    s = '0' + s;
  }
  return s;
}

function newId(lastId: string, firstText: string) {
  const datetime: string = moment().tz('Asia/Jakarta').format('YYYYMMDDHHmmss');
  const partsID: any = lastId?.split('-');
  const partNumber: number = parseInt(partsID[2]);
  const stringInc: any = partsID.length ? padIt(partNumber + 1) : '001';
  return firstText + datetime + '-' + stringInc;
}

export { padIt, newId };
