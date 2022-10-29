import config from '@pbb/config';
import TYPES from '@pbb/container/types';
import JwtHelper from '@pbb/helpers/JwtHelper';
import { IUserDocument } from '@pbb/models/user/IUser';
import UserRepository from '@pbb/repositories/UserRepository';
import { inject, injectable } from 'inversify';
import { Types } from 'mongoose';
import { uid } from 'rand-token';

export interface IAccessTokenPayload {
    userId: string;
}

export interface IAuthService {
}

@injectable()
export default class AuthService implements IAuthService {
    
    constructor(
        @inject(TYPES.IUserRepository) private userRepository: UserRepository,
        ) {}

    public generateRefreshToken(): string {

        const payload = { refreshToken: uid(256) };
        return JwtHelper.sign(payload, config.jwt.refreshTokenValidPeriod);
    }

    public generateAccessToken(userId: Types.ObjectId, expiresIn?: number ): string {

        const payload = {
            userId: userId.toString(),
        }

        const expiringDate = expiresIn? expiresIn: config.jwt.accessTokenValidPeriod;
        
        return JwtHelper.sign(payload, expiringDate);
    }

}
