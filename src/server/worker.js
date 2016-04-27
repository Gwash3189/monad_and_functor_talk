import IO from '../shared/IO';
import { repeat, updateState, perform, thunk} from '../shared/helpers';
import Continuation from '../shared/Continuation';

const joinState = (updateState) => (x) => updateState((state) => ({ ...state.comments, comments: x }))
const toJson = (r) => r.json();
const getComments = ({ data: { children }}) => children
const maker = ({ data : { body, author, id }}) => ({ body, author, id })
const toMakers = (comments) => comments.map(maker);
const seconds = (x) => x * 1000

export const work = (State, Fetch, Logger) => {
  debugger;
  Logger.ap(`Fetching comments ${new Date()}`)
  return Fetch
    .map(toJson)
    .map(getComments)
    .map(toMakers)
    .map((comments) => {
      Logger.ap(`Running State Update ${new Date()}`)
      return State
        .map(updateState((state) => ({ ...state.comments, comments })));
    })
    .map(perform())
    .map(() => Logger.ap(`Finished fetching comments ${new Date()}`))
}

export default (State, Fetch, Logger) => {
  return IO(() => {
    Logger.ap(`Worker running ${new Date()}`)
    repeat(() => work(State, Fetch, Logger).perform())
    .every(seconds(30));
  });
}
