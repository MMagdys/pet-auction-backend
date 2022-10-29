import UserRepository, { IUserRepository } from '@pbb/repositories/UserRepository';
import { Container } from 'inversify';
import TYPES from './RepositoryTypes';

export default class RepositoryInversify {
    public static register(container: Container) {
        container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);
    }
}