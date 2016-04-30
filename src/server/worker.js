import IO from '../shared/IO';
import Continuation from '../shared/Continuation';
import { repeat, run, pluck, merge } from '../shared/helpers';

const toJson = (r) => r.json();
const getComments = ({ data: { children }}) => children
const maker = ({ data : { body, author, id, over_18 }}) => ({ body, author, id, over_18 })
const toMakers = (comments) => comments.map(maker);
const seconds = (x) => x * 1000
const indexById = (things) => things.reduce((obj, thing) => {
  obj[thing.id] = thing;
  return obj;
}, {});

export const work = (State, Fetch, Logger) => {
  Logger.ap(`Fetching comments`)
  return Fetch
    .map(toJson)
    .map(getComments)
    .map(toMakers)
    .map((comments) => {
      return State
        .map(pluck('comments'))
        .map(merge(indexById(comments)))
        .map(() => Logger.ap(`Running State Update`))
    })
    .map(run)
    .map(() => Logger.ap(`Finished fetching comments`))
}

export default (State, Fetch, Logger) => {
  return IO(() => {
    Logger.ap(`Worker running`)
    repeat(() => run(work(State, Fetch, Logger)))
    .every(seconds(30));
  });
}
