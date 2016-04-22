const Nil = (x) => x === undefined || x === null

const Maybe = (value) => {
  const api = {
    value,
    of: (arg) => Maybe(arg),
    map: (f) => Nil(value) ? Maybe(null) : Maybe(f(value)),
    flatMap: (f) => Maybe(f(value).value),
    ap: (maybe) => Maybe(value(maybe.value))
  }

  return api;
}

export default Maybe
