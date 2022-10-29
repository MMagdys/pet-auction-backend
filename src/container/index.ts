import HelperInversify from './helpers/HelperInversify';
import MapperInversify from './mappers/MapperInversify';
import RepositoryInversify from './repositories/RepositoryInversify';
import { Container } from 'inversify';


const container = new Container();

HelperInversify.register(container);
RepositoryInversify.register(container);
MapperInversify.register(container);

export default container;