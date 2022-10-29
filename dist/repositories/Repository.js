"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Repository_1;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const mongoose_1 = require("mongoose");
let Repository = Repository_1 = class Repository {
    constructor(model) {
        this.model = model;
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findById(id);
        });
    }
    findOne(queryOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = (queryOptions === null || queryOptions === void 0 ? void 0 : queryOptions.filter) ? queryOptions.filter : {};
            const populate = queryOptions === null || queryOptions === void 0 ? void 0 : queryOptions.populate;
            return yield this.model.findOne(filter).populate(populate);
        });
    }
    findMany(queryOptions) {
        return __awaiter(this, void 0, void 0, function* () {
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
            return yield query;
        });
    }
    paginate(queryOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = queryOptions.filter ? queryOptions.filter : {};
            const limit = this.getLimit(queryOptions);
            const skip = this.getSkip(queryOptions);
            const pageInfoPromise = yield this.createPageInfo(filter, skip, limit);
            const recordsPromise = yield this.findMany(queryOptions);
            const [records, pageInfo] = yield Promise.all([recordsPromise, pageInfoPromise]);
            return {
                records: records,
                pageInfo
            };
        });
    }
    getLimit(queryOptions) {
        if (queryOptions.paginateParams) {
            return queryOptions.paginateParams.perPage;
        }
        return queryOptions.limit;
    }
    getSkip(queryOptions) {
        if (queryOptions.paginateParams) {
            return queryOptions.paginateParams.perPage * (queryOptions.paginateParams.page - 1);
        }
        return queryOptions.skip;
    }
    toLimitSkip(paginateParams) {
        return [paginateParams.perPage, paginateParams.perPage * (paginateParams.page - 1)];
    }
    createPageInfo(filter, skip, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield this.count(filter);
            const currentPage = (skip / limit) + 1;
            const pagesCount = Math.ceil(count / limit);
            const nextPage = currentPage < pagesCount ? (currentPage + 1) : Repository_1.NO_NEXT_PAGE;
            return {
                currentPage,
                pagesCount,
                nextPage,
                perPage: limit,
                recordsCount: count
            };
        });
    }
    createPageInfoFromAggregate(aggregate, skip, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield this.countAggregate(aggregate);
            const currentPage = (skip / limit) + 1;
            const pagesCount = Math.ceil(count / limit);
            const nextPage = currentPage < pagesCount ? (currentPage + 1) : Repository_1.NO_NEXT_PAGE;
            return {
                currentPage,
                pagesCount,
                nextPage,
                perPage: limit,
                recordsCount: count
            };
        });
    }
    count(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.countDocuments(filter);
        });
    }
    countAggregate(aggregate) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryResult = yield aggregate.count('count');
            if (queryResult.length == 0) {
                return 0;
            }
            return queryResult[0].count;
        });
    }
    update(instance, props) {
        return __awaiter(this, void 0, void 0, function* () {
            const allProps = Object.assign(Object.assign({}, instance.toObject()), props);
            return this.save(allProps);
        });
    }
    save(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const instance = new this.model(props);
            const hasId = !!props._id;
            instance.isNew = !hasId;
            return this.saveInstance(instance);
        });
    }
    saveInstance(instance) {
        return __awaiter(this, void 0, void 0, function* () {
            var document;
            try {
                document = yield instance.save();
                if (document) {
                    return document;
                }
            }
            catch (e) {
                return null;
            }
            return null;
        });
    }
    saveAll(props) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.insertMany(props);
        });
    }
    findByIdAndUpdate(id, props) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findByIdAndUpdate(id, props);
        });
    }
    remove(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findOneAndRemove(filter);
        });
    }
    distinct(field, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.distinct(field, filter);
        });
    }
};
Repository.NO_NEXT_PAGE = -1;
Repository = Repository_1 = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.unmanaged)()),
    __metadata("design:paramtypes", [mongoose_1.Model])
], Repository);
exports.default = Repository;
