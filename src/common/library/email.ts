import nodemailer from 'nodemailer';

export const sendEmail = async (configEmail) => {
  const USER_EMAIL: any = 'testes3222@gmail.com';
  const USER_PASSWORD: any = 'qz1CDO9j0dQTZIRJ';

  const auth = {
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    auth: {
      user: USER_EMAIL,
      pass: USER_PASSWORD,
    },
  };

  const transporter = nodemailer.createTransport(auth, function (err, info) {
    if (err) {
      console.log(err, "'ERRORR SEND EMAIL TO CLIENT!'");
    } else {
      console.log(info, 'SUCCESS SEND EMAIL TO CLIENT!');
    }
  });

  try {
    const resSuccess = await transporter.sendMail(configEmail);
    // console.log(resSuccess, 'SUCCESS SEND EMAIL');
    return resSuccess;
  } catch (error) {
    console.log(error);
  }
};
