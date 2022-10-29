import BidMapper, { IBidMapper } from '@pbb/mappers/BidMapper';
import { Container } from 'inversify';
import TYPES from './MapperTypes';

export default class RepositoryInversify {
    public static register(container: Container) {
        container.bind<IBidMapper>(TYPES.IBidMapper).to(BidMapper);
    }
}