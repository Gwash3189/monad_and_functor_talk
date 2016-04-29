import IO from '../shared/IO';
import { repeat, updateState, perform, thunk, run } from '../shared/helpers';
import Continuation from '../shared/Continuation';

const joinState = (updateState) => (x) => updateState((state) => ({ ...state.comments, comments: x }))
const toJson = (r) => r.json();
const getComments = ({ data: { children }}) => children
const maker = ({ data : { body, author, id, over_18 }}) => ({ body, author, id, over_18 })
const toMakers = (comments) => comments.map(maker);
const seconds = (x) => x * 1000

export const work = (State, Fetch, Logger) => {
  Logger.ap(`Fetching comments`)
  return Fetch
    .map(toJson)
    .map(getComments)
    .map(toMakers)
    .map((comments) => {
      Logger.ap(`Running State Update`)
      return State
        .map(updateState((state) => ({ ...state.comments, comments })));
    })
    .map(perform())
    .map(() => Logger.ap(`Finished fetching comments`))
}

export default (State, Fetch, Logger) => {
  return IO(() => {
    Logger.ap(`Worker running`)
    repeat(() => run(work(State, Fetch, Logger)))
    .every(seconds(30));
  });
}
