// @flow

import shallowDiff from 'shallow-diff';

type Thunked<T> = () => T
type Plucked<T> = (obj: { [key:string]: T }) => T

export function thunk<T>(x: T): () => T {
  return () => x
}
export const call = (verb:string, ...firstArgs:any[]) => (...secondArgs:any[]) => (app: any) => {
  app[verb](...firstArgs.concat(secondArgs));
  return app;
};
export function pluck(path: string): Plucked {
   return function plucked<T>(obj: { [key:string]: T } ): T {
     return obj[path];
   }
}
export const currentData = (thing: { data: { currentData: any, previousData: any } }) => pluck('currentData')(pluck('data')(thing));
export const previousData = (thing: { data: { currentData: any, previousData: any } }) => pluck('previousData')(pluck('data')(thing));
export const run = (...IOs: any[]) => IOs.forEach(io => io.perform());
export const repeat = (io: any) => ({
  every: (time: number) => io.map(() => setInterval(() => run(io), time)),
});
export const set = call('set');
export const merge = call('merge');
export const map = (functor: { map: Function }, func: Function) => () => functor.map(func);
export const json = call('json');
export const perform = call('perform');
export const post = call('post');
export const listen = call('listen');
export const middleware = call('middleware');
export const seedState = call('seedState');
export const on = call('on');
export const emit = call('emit');
export const stringify = call('stringify');
export const log = call('log');
export const updateState = call('updateState');
export const ok = thunk({ ok: 'ok' });
export function diff(one: any, two: any){
  const { added } = shallowDiff(one, two);

  return added.reduce((obj, key) => {
    obj[key] = two[key]
    return obj;
  }, {})
}
