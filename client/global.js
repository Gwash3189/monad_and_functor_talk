import { prop } from 'ramda';

import { STORAGE_KEY } from './constants';
import IO from './types/IO';


export const win = IO(window);
export const json = IO(window).map(prop('JSON'));
export const storage = IO(window).map(prop('localStorage'));
export const users = storage
  .map(st => st.getItem(STORAGE_KEY))
  .flatMap(strStorage => json.map(json => json.parse(strStorage)))
export const doc = win.map(prop('document'));
