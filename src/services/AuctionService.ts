import TYPES from '@pbb/container/types';
import { IBidDocument } from '@pbb/models/bid/IBid';
import { inject, injectable } from 'inversify';


export interface IAuctionService {

    getBidsList(userId: string, auctionId: string): Promise<IBidDocument[] | null>;
    addBid(userId: string, auctionId: string): Promise<IBidDocument | null>;
}

@injectable()
export default class AuctionService implements IAuctionService {
    
    constructor() {}


    public async getBidsList(userId: string, auctionId: string): Promise<IBidDocument[] | null> {

        return null;
    }


    public async addBid(userId: string, auctionId: string): Promise<IBidDocument | null> {

        return null;
    }


}
