import IO from '../shared/IO';
import { middleware, seedState } from '../shared/helpers';

const indexById = (makers) => makers.reduce((obj, maker) => {
  obj[maker.id] = maker;
  return obj;
}, {});


export default (Store) => {
  return Store.map(middleware(state => {
    return {
      comments: indexById(state.comments)
    };
  }))
  .map(seedState({
    comments: []
  }));
}
