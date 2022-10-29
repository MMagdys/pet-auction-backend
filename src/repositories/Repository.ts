import { injectable, unmanaged } from 'inversify';
import { Aggregate, Document, Error, FilterQuery, Model, PopulateOptions, Types } from 'mongoose';
import { PaginateParams } from '@pbb/api/v1/controllers/BaseController';


export interface IQueryOptions {
    filter?: any;
    sort?: any;
    select?: any;
    limit?: number;
    skip?: number;
    paginateParams?: PaginateParams;
    populate?: any;
}

export interface PageInfo {
    currentPage: number;
    pagesCount: number;
    nextPage: number;
    recordsCount: number;
    perPage: number;
}

export interface Page<T> {
    records: T [];
    pageInfo: PageInfo;
}

export interface IRepository<T extends Document> {
    findById(id: any): Promise<T | null>;

    findOne(queryOptions?: IQueryOptions): Promise<T | null>;

    findMany(queryOptions?: IQueryOptions): Promise<T[]>;

    count(filterOptions: any): Promise<number>;

    save(props: any): Promise<T | null>;

    findByIdAndUpdate(id: any, props: any): Promise<T | null>;

    remove(filterOptions: any): Promise<T | null>;

    distinct(field: string, filterOptions: any): Promise<T[] | null>;
}

@injectable()
export default abstract class Repository<T extends Document> implements IRepository<T> {

    private static NO_NEXT_PAGE = -1;

    public constructor(@unmanaged() protected model: Model<T>) {}

    public async findById(id: any): Promise<T | null> {
        return await this.model.findById(id);
    }

    public async findOne(queryOptions?: IQueryOptions): Promise<T | null> {
        
        const filter = queryOptions?.filter ? queryOptions.filter : {};
        const populate = queryOptions?.populate;
        return await this.model.findOne(filter).populate(populate);
    }

    public async findMany(queryOptions: IQueryOptions): Promise<T []> {

        const filter = queryOptions.filter ? queryOptions.filter : {};
        const sort = queryOptions.sort;
        const select = queryOptions.select;
        const limit = this.getLimit(queryOptions);
        const skip = this.getSkip(queryOptions);
        const populate = queryOptions.populate;

        var query = this.model.find(filter);

        if (select) {
            query = query.select(select);
        }
        if (sort) {
            query = query.sort(sort);
        }
        if (skip) {
            query = query.skip(skip);
        }
        if (limit) {
            query = query.limit(limit);
        }
        if (populate) {
            query = query.populate(populate);
        }

        return await query;
    }

    public async paginate(queryOptions: IQueryOptions): Promise<Page<T>> {

        const filter = queryOptions.filter ? queryOptions.filter : {};

        const limit = this.getLimit(queryOptions)!;
        const skip = this.getSkip(queryOptions)!;

        const pageInfoPromise = await this.createPageInfo(filter, skip, limit);
        const recordsPromise = await this.findMany(queryOptions);

        const [records, pageInfo] = await Promise.all([recordsPromise, pageInfoPromise]);

        return {
            records: records,
            pageInfo
        };
    }

    private getLimit(queryOptions: IQueryOptions): number | undefined {

        if (queryOptions.paginateParams) {
            return queryOptions.paginateParams.perPage;
        }
        return queryOptions.limit;
    }

    private getSkip(queryOptions: IQueryOptions): number | undefined {

        if (queryOptions.paginateParams) {
            return queryOptions.paginateParams.perPage * (queryOptions.paginateParams.page - 1);
        }

        return queryOptions.skip;
    }

    public toLimitSkip(paginateParams: PaginateParams): [number, number]{

        return [paginateParams.perPage, paginateParams.perPage * (paginateParams.page - 1)];
    }

    protected async createPageInfo(filter: any, skip: number, limit: number): Promise<PageInfo> {

        const count = await this.count(filter);

        const currentPage = (skip / limit) + 1;
        const pagesCount = Math.ceil(count / limit);
        const nextPage = currentPage < pagesCount ? (currentPage + 1) : Repository.NO_NEXT_PAGE;

        return {
            currentPage,
            pagesCount,
            nextPage,
            perPage: limit,
            recordsCount: count
        }
    }

    protected async createPageInfoFromAggregate(aggregate: Aggregate<any []>, skip: number, limit: number): Promise<PageInfo> {

        const count = await this.countAggregate(aggregate);

        const currentPage = (skip / limit) + 1;
        const pagesCount = Math.ceil(count / limit);
        const nextPage = currentPage < pagesCount ? (currentPage + 1) : Repository.NO_NEXT_PAGE;

        return {
            currentPage,
            pagesCount,
            nextPage,
            perPage: limit,
            recordsCount: count
        }
    }

    public async count(filter: any): Promise<number> {
        return this.model.countDocuments(filter);
    }

    public async countAggregate(aggregate: Aggregate<any []>): Promise<number> {

        const queryResult = await aggregate.count('count');
        if (queryResult.length == 0) {
            return 0;
        }

        return queryResult[0].count;
    }

    public async update(instance: T, props: any): Promise<T | null> {

        const allProps = {
            ...instance.toObject(),
            ...props
        };

        return this.save(allProps);
    }

    public async save(props: any): Promise<T | null> {

        const instance = new this.model(props);
        const hasId = !!props._id;
        instance.isNew = !hasId;

        return this.saveInstance(instance);
    }

    public async saveInstance(instance: T): Promise<T | null> {
        
        var document: T | undefined;

        try {
            document = await instance.save();
            if(document) {
                return document;
            }
        } catch(e) {
            return null;
        }

        return null;
    }

    public async saveAll(props: any []): Promise<any> {
        return this.model.insertMany(props);
    }

    public async findByIdAndUpdate(id: any, props: any): Promise<T | null> {
        return await this.model.findByIdAndUpdate(id, props);
    }

    public async remove(filter: any): Promise<T | null> {
        return await this.model.findOneAndRemove(filter);
    }

    public async distinct(field: string, filter: any): Promise<T[] | null> {
        return await this.model.distinct(field, filter);
    }

}
