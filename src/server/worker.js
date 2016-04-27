import IO from '../shared/IO';
import { repeat, updateState, map, perform, thunk} from '../shared/helpers';
import Continuation from '../shared/Continuation';

const joinState = (updateState) => (x) => updateState((state) => ({ ...state.comments, comments: x }))
const toJson = (r) => r.json();
const getComments = ({ data: { children }}) => children
const maker = ({ data : { body, author, id }}) => ({ body, author, id })
const toMakers = (comments) => comments.map(maker);
const seconds = (x) => x * 1000

export const work = thunk((State, Fetch) => {
  return Continuation(Fetch)
    .map(toJson)
    .map(getComments)
    .map(toMakers)
    .map(map(State, updateState({ comments })))
    .map(perform)
})

export default (State, Fetch) => {
  return IO(() => {
    repeat(work(State, Fetch))
    .every(seconds(30));
  });
}
