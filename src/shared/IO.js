const isAFunction = (x) => typeof x === 'function';

const IO = (value) => {
  const val = isAFunction(value)
            ? value
            : () => value;

  const api = {
    get value() {
      return val();
    },
    perform: () => api.value,
    of: (x) => IO(x),
    map: (func) => IO(() => func(api.value)),
    flatMap: (func) => IO(func(api.value).value)
  };

  return api;
};

export default IO;
