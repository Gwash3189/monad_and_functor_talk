import Container from './Container';

const isAMonad = (x) => x.map && x.flatMap

export default (x) => {
  const monad = Container(x);
  monad.ap = (apMonad) => {
    return isAMonad(apMonad)
      ? apMonad.map(monad.value)
      : Container(apMonad).map(monad.value)
  }

  return monad;
}
