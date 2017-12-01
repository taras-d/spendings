import Bottle from 'bottlejs';

import TokenService from './tokenService';
import ApiService from './apiService';
import UserService from './userService';
import SpendingService from './spendingService';
import LoggerService from './loggerService';

const bottle = new Bottle();

bottle.service('tokenService', TokenService);
bottle.service('apiService', ApiService, 'tokenService', 'loggerService');
bottle.service('userService', UserService, 'apiService', 'tokenService');
bottle.service('spendingService', SpendingService, 'apiService');
bottle.service('loggerService', LoggerService);

export default bottle.container;