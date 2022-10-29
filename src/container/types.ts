import HelperTypes from './helpers/HelperTypes';
import MapperTypes from './mappers/MapperTypes';
import RepositoryTypes from './repositories/RepositoryTypes';

const TYPES = {
    ...HelperTypes,
    ...RepositoryTypes,
    ...MapperTypes
};

export default TYPES;