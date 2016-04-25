import { compose } from 'ramda';
import fetch from 'isomorphic-fetch';
import IO from './IO';

const isAMonad = (x) => x.map && x.flatMap

const Continuation = (funcOrIo) => {
  const val = isAMonad(funcOrIo)
            ? funcOrIo
            : IO(funcOrIo)

  const api = {
    value: val,
    map: (f) => Continuation(api.value.map(prom => prom.then(f))),
    perform: () => api.value.perform()
  }

  return api;
}

export default Continuation
