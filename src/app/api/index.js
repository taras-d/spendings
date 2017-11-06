import Bottle from 'bottlejs';

import ApiService from './apiService';
import UserService from './userService';

const bottle = new Bottle();

bottle.service('apiService', ApiService);
bottle.service('userService', UserService, 'apiService');

export default bottle.container;