const CryptoJS = require('crypto-js');

const PRIVATKEY =
  'MIIBUwIBADANBgkqhkiG9w0BAQEFAASCAT0wggE5AgEAAkEAs8lU22cGYbQtxLQQCrX6aZNzVcmcxfQSqdebsJ6sV6doI6ZrC/ZKV3xql2LMnztZgx4yao1rc9+fAsmI9CUiqQIDAQABAkAQfs9vVfOK8VolqxOxt+Ki3yl83IOq0esIdETPnq9XV1g1V679mkipkT/vOGyjAxj9+fWZAJzZBpjr/w0QrnX1AiEA7BgjJ1jgtA6IZnExyU+jgFlRMoIrfq75gjOgy4seKnsCIQDC8dhQX+HZDEnTKyhKj9lpqGBpEXU3rEWb9ChPv/wAKwIgTYvoEAZ7V+jmGG/ZoHvOAlxT9TkYPDYQshlvGSwKrn0CIB9cZq8vbZbMOkglZjrwf0pXEwN0EoZdSWl4Us/Zk8G3AiBcWTgXgAtwZ4D1xj3tIBUNUc9p3HGi5m7YXH/D7mGKkg==';

export const cryptoDecrypt = (encryptData: any) => {
  const bytes = CryptoJS.AES.decrypt(encryptData, PRIVATKEY) || '';
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(originalText);
};

export const cryptoEncrypt = (encryptData: any) => {
  return CryptoJS.AES.encrypt(
    JSON.stringify(encryptData),
    PRIVATKEY,
  ).toString();
};
