import { verify } from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { Secret } from '../config/secret';
const authorGuest = (req: any, res: Response, next: NextFunction) => {
   const authToken: string | undefined = req.headers.authorization;

   if (!authToken) {
      return next();
   }
   if (authToken) {
   verify(authToken, Secret.jwtSecret, function(err: any, decoded: any) {
      if (err) {
         return next();
      }
      req.decoded = decoded;
      return next();
   });
   
   }
};
export default authorGuest;