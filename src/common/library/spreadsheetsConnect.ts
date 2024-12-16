import { google } from 'googleapis';

export const spreadsheetsConfig = async () => {
  // const auth = new google.auth.GoogleAuth({
  //   keyFile: 'alazhar19_credentials.json',
  //   scopes: 'https://www.googleapis.com/auth/spreadsheets',
  // });

  // // Create client instance for auth
  // const client = await auth.getClient();

  // // Instance of Google Sheets API
  // const googleSheets = google.sheets({ version: 'v4', auth: client });

  // const spreadsheetId = '1VdTnBCT5yOnb4OMjR3EKrmdtng3_LzI-jRbp3wmX3-8';

  // // Read rows from spreadsheet
  // const { data } = await googleSheets.spreadsheets.values.get({
  //   auth,
  //   spreadsheetId,
  //   range: 'Form Responses 1',
  // });

  // return data?.values;
  return []
};

export const driveConfig = async () => {
  // const auth = new google.auth.GoogleAuth({
  //   keyFile: 'alazhar19_credentials.json',
  //   scopes: 'https://www.googleapis.com/auth/drive',
  // });

  // // Create client instance for auth
  // const client = await auth.getClient();

  // // Instance of Google Sheets API
  // const drive = google.drive({ version: 'v3', auth: client });
  // //   https://drive.google.com/file/d/10ojD6ixUS5J4n7bhqF_ImEvYUSB10Jvp/view?usp=share_link
  // // const res = await drive.drives.get({
  // //   driveId: '1UN0pqibTOocSxYoVa35ElMf9GVf-hsWV',
  // //   // orderBy: 'folder',
  // //   // supportsAllDrives: true,
  // //   // pageSize:2
  // // });
  // const res = await drive.files.list();
  // const files = res.data;
  // console.log(files);
  // return files;
  return
};
