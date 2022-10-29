
import AuctionService, { IAuctionService } from '@pbb/services/AuctionService';
import AuthService, { IAuthService } from '@pbb/services/AuthService';
import { Container } from 'inversify';
import TYPES from './HelperTypes';


export default class HelperInversify {
    public static register(container: Container) {
        container.bind<IAuthService>(TYPES.IAuthService).to(AuthService);
        container.bind<IAuctionService>(TYPES.IAuctionService).to(AuctionService);
    }
}
