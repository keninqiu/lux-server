import { verify, VerifyErrors } from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Secret } from '../config/secret';
const Web3 = require('web3');
var  Hash = require('eth-lib/lib/hash');
const util = require('ethereumjs-util');
const publicKeyToAddress = require('ethereum-public-key-to-address')
var bs58check = require('bs58check')

const validate = (data: any, signature: any) => {
   const pubKey = getPublicKeyBufferFromSig(data, signature);
   const address = getAddressFromPublicKeyBuffer(pubKey);
   return address;
};

const hashMiriMessage = (data: any) => {
   let web3 = new Web3();
   var messageHex = web3.utils.isHexStrict(data) ? data : web3.utils.utf8ToHex(data);
   var messageBytes = web3.utils.hexToBytes(messageHex);
   var messageBuffer = Buffer.from(messageBytes);
   var preamble = '\x15Miri Signed Message:\n' + messageBytes.length;
   var preambleBuffer = Buffer.from(preamble);
   var ethMessage = Buffer.concat([preambleBuffer, messageBuffer]);
   return Hash.keccak256s(ethMessage);    
}

const getPublicKeyBufferFromSig = (data: any, sig: any) => {

   var msg = Object.keys(data).filter((k) => (data[k] != null) && (data[k] != undefined))
   .map(key => key + '=' + (typeof data[key] === 'string' ? data[key] : JSON.stringify(data[key]))).sort().join('&');

   var hash = hashMiriMessage(msg);   

   console.log('hash=', hash);
   if(sig.indexOf('0x') === 0) {
      sig = sig.substring(2);
   }
   const rHex = sig.substring(0,64);
   const sHex = sig.substring(64,128);
   const vHex = sig.substring(128,130);


   const r = Buffer.from(rHex, "hex");
   const s = Buffer.from(sHex, "hex");
   const v = parseInt(vHex, 16);
   console.log(r,s,v);
   const pubKey  = util.ecrecover(util.toBuffer(hash), v, r, s);
   return pubKey;
};

const getAddressFromPublicKeyBuffer = (pubKey: any) => {
   console.log('pubKey.length=', pubKey.length);
   const pubkeyBuf = Buffer.concat([Buffer.from('04', 'hex'), pubKey]);
   let address = publicKeyToAddress(pubkeyBuf);
   console.log('address=', address);
    return address;   
};

const eth2WalletID = (ethAddress: string) => {
   if(ethAddress.indexOf('0x') === 0) {
      ethAddress = ethAddress.substring(2);
   }
   const hexAddressString = '32' + ethAddress;
   //Uint8List hexAddress = Uint8List.fromList(HEX.decode(hexAddressString));
   const address = bs58check.encode(Buffer.from(hexAddressString, 'hex'));
   return address;
 }

const authWallet = (req: any, res: Response, next: NextFunction) => {
   console.log('go for it');
   const signature: string | undefined = req.headers.signature;

   if (!signature) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
      error: 'No authentication token found!',
   });
   }

   const body = req.body;
   let address = validate(body, signature);
   address = eth2WalletID(address);
   console.log('address==', address);
   req.walletID = address;
   return next();
};
export default authWallet;