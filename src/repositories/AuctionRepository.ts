import { IAuctionDocument, IAuctionProps } from '@pbb/models/auction/IAuction';
import Auction from '@pbb/models/auction/Auction';
import { injectable } from 'inversify';

import Repository, { IRepository } from './Repository';


export interface IAuctionRepository extends IRepository<IAuctionDocument> { }

@injectable()
export default class AuctionRepository
    extends Repository<IAuctionDocument> {

    constructor() {
        super(Auction);
    }

}
