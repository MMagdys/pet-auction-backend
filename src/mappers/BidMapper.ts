import { IBidDocument } from '@pbb/models/bid/IBid';
import { IUserDocument } from '@pbb/models/user/IUser';
import { injectable } from 'inversify';

import IMapper, { IMapperExtras } from './Mapper';


export interface BidDto {
    id: string;
    user: string;
    amount: number;
}


export interface IBidMapper extends IMapper<IBidDocument, BidDto, IMapperExtras> {
    toDto(document: IBidDocument, extras?: IMapperExtras): Promise<BidDto>;
}


@injectable()
export default class BidMapper implements IBidMapper {

    constructor() {}


    public async toDto(document: IBidDocument, extras?: IMapperExtras): Promise<BidDto> {

        let fullName: string = "";

        if((document.user as unknown as IUserDocument).firstName && (document.user as unknown as IUserDocument).lastName) {
            fullName = `${(document.user as unknown as IUserDocument).firstName} ${(document.user as unknown as IUserDocument).lastName}`
        }

        return {
            id: document._id.toString(),
            user: fullName,
            amount: document.amount,
        };
    }

}