import { polyfill } from 'es6-promise';
polyfill();

import api from './api';
import main from './main';
import worker from './worker';

main(worker, api);
