import { compose } from 'ramda';

const thunk = (x) => () => x
const isAFunction = (x) => typeof x === 'function'

const IO = (value) => {
  const val = isAFunction(value)
            ? value
            : () => value;

  const api = {
    value:  val,
    perform: () => api.value(),
    of: (x) => IO(x),
    map: (func) => IO(compose(func, api.value)),
    flatMap: (func) => IO(func(api.value()).value)
  }

  return api;
}

export default IO
