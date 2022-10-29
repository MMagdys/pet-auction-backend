import AuctionRepository, { IAuctionRepository } from '@pbb/repositories/AuctionRepository';
import BidRepository, { IBidRepository } from '@pbb/repositories/BidRepository';
import UserRepository, { IUserRepository } from '@pbb/repositories/UserRepository';
import { Container } from 'inversify';
import TYPES from './RepositoryTypes';

export default class RepositoryInversify {
    public static register(container: Container) {
        container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);
        container.bind<IAuctionRepository>(TYPES.IAuctionRepository).to(AuctionRepository);
        container.bind<IBidRepository>(TYPES.IBidRepository).to(BidRepository);
    }
}