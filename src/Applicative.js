import compose from 'ramda';
import Container from './Container';

export default (x) => {
  const monad = Container(x);
  monad.ap = (apMonad) => apMonad.map(monad.value)

  return monad;
}
