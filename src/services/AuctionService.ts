import TYPES from '@pbb/container/types';
import { IBidDocument, IBidProps } from '@pbb/models/bid/IBid';
import { IAuctionRepository } from '@pbb/repositories/AuctionRepository';
import { IBidRepository } from '@pbb/repositories/BidRepository';
import { inject, injectable } from 'inversify';


export interface IAuctionService {

    getBidsList(userId: string, auctionId: string): Promise<IBidDocument[] | null>;
    addBid(userId: string, auctionId: string, amount: number): Promise<IBidDocument | null>;
}

@injectable()
export default class AuctionService implements IAuctionService {
    
    constructor(
        @inject(TYPES.IAuctionRepository) private auctionRepository: IAuctionRepository,
        @inject(TYPES.IBidRepository) private bidRepository: IBidRepository,
    ) {}


    public async getBidsList(userId: string, auctionId: string): Promise<IBidDocument[] | null> {

        const retrievedAuction = await this.auctionRepository.findById(auctionId);

        if(!retrievedAuction) {
            return null;
        }

        if(retrievedAuction.owner.toString() !== userId) {
            return null;
        }

        const retrievedBids = await this.bidRepository.findMany({
            filter: { auctionId }
        });

        return retrievedBids;
    }


    public async addBid(userId: string, auctionId: string, amount: number): Promise<IBidDocument | null> {

        const retrievedAuction = await this.auctionRepository.findById(auctionId);
        const currentDate = new Date();

        if(!retrievedAuction) {
            return null;
        }

        if(retrievedAuction.owner.toString() === userId) {
            return null;
        }

        if(amount <= 0) {
            return null;
        }

        if(currentDate < retrievedAuction.startDate || currentDate > retrievedAuction.endDate) {
            return null;
        }

        const bidProps: IBidProps = {
            user: userId,
            auction: auctionId,
            amount
        }

        const savedBid = await this.bidRepository.save(bidProps);

        return savedBid;
    }


}
