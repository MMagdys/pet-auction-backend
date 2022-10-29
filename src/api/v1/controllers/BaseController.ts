import { Response } from 'express';
import { controller, httpDelete, httpGet, httpPost, interfaces, request, response } from 'inversify-express-utils';

import { IRequest } from '@pbb/middlewares/isAuth';
import ResponseUtils from '@pbb/utils/ResponseUtils';
import { validationResult } from 'express-validator';

export interface PaginateParams {
    page: number;
    perPage: number;
}

@controller('')
export default abstract class BaseController implements interfaces.Controller {

    protected static DEFAULT_PAGE = 1;
    protected static DEFAULT_PER_PAGE = 20;

    constructor() {}

    protected validateRequest(@request() req: IRequest, @response() res: Response): boolean {
        
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            ResponseUtils.send(res, 422, errors.array()[0].msg, errors);
            return false;
        }

        return true;
    }

    protected paginateParams(request: IRequest): PaginateParams {

        const page = request.query.page ? + request.query.page : BaseController.DEFAULT_PAGE;
        const perPage = request.query.perPage ? + request.query.perPage : BaseController.DEFAULT_PER_PAGE;

        return { page, perPage };
    }

}
