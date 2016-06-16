import fetch from 'isomorphic-fetch';
import IO from './IO';

const isAMonad = (x) => x.map && x.flatMap
const isAString = (x) => typeof x === 'string'

const Continuation = (funcOrIo) => {
  const val = isAMonad(funcOrIo)
            ? funcOrIo
            : isAString(funcOrIo)
              ? IO(() => fetch(funcOrIo))
              : IO(funcOrIo)

  const api = {
    value: val,
    map: (f) => Continuation(api.value.map(prom => prom.then(f))),
    flatMap: (f) => api.map(f),
    perform: () => api.value.perform()
  }

  return api;
}

export default Continuation
