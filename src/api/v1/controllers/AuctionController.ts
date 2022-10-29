import { Response } from 'express';
import { controller, httpGet, httpPost, request, response } from 'inversify-express-utils';
import { inject } from 'inversify';

import TYPES from '@pbb/container/types';
import BaseController from './BaseController';
import isAuth, { IRequest } from '@pbb/middlewares/isAuth';
import ResponseUtils from '@pbb/utils/ResponseUtils';


@controller('/v1/auction', isAuth)
export default class AuctionController extends BaseController {
    
    constructor() {
        super();
    }


    @httpGet('/:auctionId/bid')
    public async listBids(@request() req: IRequest, @response() res: Response) {

        if (!this.validateRequest(req, res)) {
            return
        }

        return ResponseUtils.send(res, 200, "Bid added successfully!", {});
    }

}
