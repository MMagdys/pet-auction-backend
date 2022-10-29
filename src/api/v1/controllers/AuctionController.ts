import { Response } from 'express';
import { controller, httpGet, httpPost, request, response } from 'inversify-express-utils';
import { inject } from 'inversify';

import TYPES from '@pbb/container/types';
import BaseController from './BaseController';
import isAuth, { IRequest } from '@pbb/middlewares/isAuth';
import ResponseUtils from '@pbb/utils/ResponseUtils';
import { IAuctionService } from '@pbb/services/AuctionService';
import { IBidMapper } from '@pbb/mappers/BidMapper';
import AuctionValidator from '../validators/AuctionValidators';


@controller('/v1/auction', isAuth)
export default class AuctionController extends BaseController {
    
    constructor(
        @inject(TYPES.IAuctionService) private auctionService: IAuctionService,
        @inject(TYPES.IBidMapper) private bidMapper: IBidMapper,
    ) {
        super();
    }


    @httpGet('/:auctionId/bid')
    public async listBids(@request() req: IRequest, @response() res: Response) {

        if (!this.validateRequest(req, res)) {
            return
        }

        const user = req.user;
        const userId = user._id.toString();
        const auctionId = req.params.auctionId;

        const bids = await this.auctionService.getBidsList(userId, auctionId);
        
        if(!bids) {
            return ResponseUtils.unprocessable(res, 'Invalid options', {})
        }
        
        const mappedBids = await Promise.all(bids.map((bid) => this.bidMapper.toDto(bid)));

        return ResponseUtils.ok(res, { bids: mappedBids });
    }

    @httpPost('/:auctionId/bid', ...AuctionValidator.placeBid)
    public async placeBid(@request() req: IRequest, @response() res: Response) {

        if (!this.validateRequest(req, res)) {
            return
        }

        const user = req.user;
        const userId = user._id.toString();
        const auctionId = req.params.auctionId;
        const amount = req.body.amount;

        const palcedBid = await this.auctionService.addBid(userId, auctionId, amount);

        if(!palcedBid) {
            return ResponseUtils.unprocessable(res, 'Invalid options', {})
        }

        const mappedBid = await this.bidMapper.toDto(palcedBid);

        return ResponseUtils.created(res, { bid: mappedBid });
    }

}
