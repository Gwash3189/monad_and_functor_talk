import IO from '../shared/IO';
import { middleware, seedState, listen } from '../shared/helpers';

const indexById = (things) => things.reduce((obj, thing) => {
  obj[thing.id] = thing;
  return obj;
}, {});

const logTotalComments = (Logger) => (state) => {
  Logger.ap(`Total Number of Comments ${state.length}`)
}

export const transformState = (Logger) => (state) => {
  Logger.ap(`Running Middleware`);

  return {
    comments: indexById(state.comments),
    length: state.comments.length + state.length || 0
  };
}

export default (Store, Logger) => {
  return Store
    .map(middleware(transformState(Logger)))
    .map(listen(logTotalComments(Logger)))
    .map(seedState({
      comments: []
    }));
}
