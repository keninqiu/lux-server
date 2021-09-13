import { verify, VerifyErrors } from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Secret } from '../config/secret';
const auth = (req: any, res: Response, next: NextFunction) => {
   const authToken: string | undefined = req.headers.authorization;

   if (!authToken) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
      error: 'No authentication token found!',
   });
   }
   if (authToken) {
   verify(authToken, Secret.jwtSecret, function(err, decoded) {
      if (err) {
         return res.status(StatusCodes.UNAUTHORIZED).json({
            error: 'Invalid authentication token!',
         });
      }
      req.decoded = decoded;
      return next();
   });
   
   }
};
export default auth;