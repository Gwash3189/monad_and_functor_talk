import IO from '../shared/IO';
import { middleware, seedState } from '../shared/helpers';

const indexById = (things) => things.reduce((obj, thing) => {
  obj[thing.id] = thing;
  return obj;
}, {});


export const transformState = state => {
  return {
    comments: indexById(state.comments)
  };
}

export default (Store) => {
  return Store
    .map(middleware(transformState))
    .map(seedState({
      comments: []
    }));
}
