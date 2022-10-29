import { NextFunction, Request, Response } from 'express';

import container from '@pbb/container';
import TYPES from '@pbb/container/types';
import { IUserDocument } from '@pbb/models/user/IUser';
import { IUserRepository } from '@pbb/repositories/UserRepository';
import ResponseUtils from '@pbb/utils/ResponseUtils';
import JwtHelper from '@pbb/helpers/JwtHelper';
import passport from 'passport';
import { IAccessTokenPayload } from '@pbb/services/AuthService';

export interface IRequest extends Request {
    user: IUserDocument;
}


export const authenticate = function(req: Request, res: Response, next: NextFunction) {

    passport.authenticate('local', function(err: any, user: any, info: any) {
        
        if(user) {
            req.user = user;
        }
        
        next()
    })(req, res, next);
};


const isAuth = async (req: Request, res: Response, next: NextFunction) => {

    const userRepository = container.get<IUserRepository>(TYPES.IUserRepository);
    const token = req.headers.authorization;

    if (!token) {
        return ResponseUtils.unauthorized(res);
    }

    const verifyResult = await JwtHelper.verify(token);

    if (!verifyResult.valid || verifyResult.expired) {
        return ResponseUtils.unauthorized(res);
    }

    const decodedToken = verifyResult.decodedToken as IAccessTokenPayload;

    const user = await userRepository.findOne({
        filter: {
            _id: decodedToken.userId
        }
    });

    if (!user) {
        return ResponseUtils.unauthorized(res);
    }

    (req as IRequest).user = user;    
    next();
};

export default isAuth;
