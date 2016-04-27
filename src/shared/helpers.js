export const thunk = (x) => () => x
export const call = (verb) => (...args) => (app) => {
  app[verb](...args);
  return app
}
export const post = call('post');
export const listen = call('listen');
export const middleware = call('middleware');
export const seedState = call('seedState');
export const on = call('on');
export const emit = call('emit');
export const stringify = call('stringify');
export const log = call('log');
export const ok = thunk({ok: 'ok'});
