// @flow

export type Monad<T> = {
  flatMap: <X>(func: (x:T) => Monad<X>) => Monad<X>,
  map: <X>(func: (x:T) => any) => Monad<X>,
  ap: (x: any) => Monad<T>
}

export type IOMonad = Monad;
export type Applicative = Monad;
export type Functor = Monad;
