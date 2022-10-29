import { IBidDocument, IBidProps } from '@pbb/models/bid/IBid';
import Bid from '@pbb/models/bid/Bid';
import { injectable } from 'inversify';

import Repository, { IRepository } from './Repository';


export interface IBidRepository extends IRepository<IBidDocument> { }

@injectable()
export default class BidRepository
    extends Repository<IBidDocument> {

    constructor() {
        super(Bid);
    }

}
