import Bottle from 'bottlejs';

import TokenService from './tokenService';
import ApiService from './apiService';
import UserService from './userService';

const bottle = new Bottle();

bottle.service('tokenService', TokenService)
bottle.service('apiService', ApiService, 'tokenService');
bottle.service('userService', UserService, 'apiService', 'tokenService');

export default bottle.container;