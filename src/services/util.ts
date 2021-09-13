import * as CryptoJS from 'crypto-js';

export class UtilService {
    auth_code = 'encrypted by crypto-js|';
    // The aesEncrypt method is use for encrypt the message, encrypted is bytes, you can use encrypted.toString() convert to string.
    aesEncrypt(messageToEnc: string, pwd: string) {
        const encrypted = CryptoJS.AES.encrypt(this.auth_code + messageToEnc, pwd).toString();
        return encrypted;
        // return encrypted.toString();
    }

    aesDecrypt(encryted: any, pwd: string) {
        try {
            const encryptedRawData = CryptoJS.AES.decrypt(encryted, pwd).toString(CryptoJS.enc.Utf8);
            if (!encryptedRawData.startsWith(this.auth_code)) {
                // return '';
                return encryptedRawData;
            }
            return encryptedRawData.slice(this.auth_code.length);
        } catch (e) { }
        return '';
    }
}