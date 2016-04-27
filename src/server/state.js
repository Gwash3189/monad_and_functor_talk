import IO from '../shared/IO';
import { middleware, seedState } from '../shared/helpers';

const indexById = (things) => things.reduce((obj, thing) => {
  obj[thing.id] = thing;
  return obj;
}, {});


export const transformState = (Logger) => (state) => {
  Logger.ap(`Running Middleware ${new Date()}`);

  return {
    comments: indexById(state.comments)
  };
}

export default (Store, Logger) => {
  return Store
    .map(middleware(transformState(Logger)))
    .map(seedState({
      comments: []
    }));
}
