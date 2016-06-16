import shallowDiff from 'shallow-diff';

export function thunk(x) {
  return () => x;
}
export const call = (verb, ...firstArgs) => (...secondArgs) => (app) => {
  app[verb](...firstArgs.concat(secondArgs));
  return app;
};
export function pluck(path) {
  return function plucked(obj) {
    return obj[path];
  };
}
export const top = (arr, num) => arr.slice(0, num);
export const sort = (arr, by) => arr.sort((x, y) => x[by] - y[by]);
export const extract = pluck('value');
export const map = (f, x) => Array.isArray(x) ? x.map(f) : Object.keys(x).map(k => f(x[k]));
export const currentData = (thing) => pluck('currentData')(pluck('data')(thing));
export const previousData = (thing) => pluck('previousData')(pluck('data')(thing));
export const run = (...IOs) => IOs.forEach(io => io.perform());
export const repeat = (io) => ({
  every: (time) => io.map(() => setInterval(() => run(io), time))
});
export const toArray = (obj) => Object.keys(obj).map(k => obj[k]);
export const toJson = (pr) => pr.json();
export const select = call('select');
export const set = call('set');
export const merge = call('merge');
export const json = call('json');
export const get = call('get');
export const perform = call('perform')();
export const post = call('post');
export const listen = call('listen');
export const middleware = call('middleware');
export const seedState = call('seedState');
export const on = call('on');
export const emit = call('emit');
export const render = call('render');
export const stringify = call('stringify');
export const log = call('log');
export const updateState = call('updateState');
export const ok = thunk({ ok: 'ok' });
export function diff(one, two) {
  const { added } = shallowDiff(one, two);

  return added.reduce((obj, key) => Object.assign({}, obj, {
    [key]: two[key]
  }), {});
}
