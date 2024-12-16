"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmail = async (configEmail) => {
    const USER_EMAIL = 'testes3222@gmail.com';
    const USER_PASSWORD = 'qz1CDO9j0dQTZIRJ';
    const auth = {
        host: 'smtp-relay.sendinblue.com',
        port: 587,
        auth: {
            user: USER_EMAIL,
            pass: USER_PASSWORD,
        },
    };
    const transporter = nodemailer_1.default.createTransport(auth, function (err, info) {
        if (err) {
            console.log(err, "'ERRORR SEND EMAIL TO CLIENT!'");
        }
        else {
            console.log(info, 'SUCCESS SEND EMAIL TO CLIENT!');
        }
    });
    try {
        const resSuccess = await transporter.sendMail(configEmail);
        return resSuccess;
    }
    catch (error) {
        console.log(error);
    }
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=email.js.map