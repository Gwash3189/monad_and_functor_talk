export const thunk = (x) => () => x
export const call = (verb) => (...args) => (app) => {
  app[verb](...args);
  return app
}
export const repeat = (f) => {
  return {
    every: (every) => {
      f();
      setInterval(f, every)
    }
  }
}
export const map = (functor, func) => () => functor.map(func)
export const json = call('json')
export const perform = call('perform')
export const post = call('post');
export const listen = call('listen');
export const middleware = call('middleware');
export const seedState = call('seedState');
export const on = call('on');
export const emit = call('emit');
export const stringify = call('stringify');
export const log = call('log');
export const updateState = call('updateState');
export const ok = thunk({ok: 'ok'});
