const Container = (value) => {
  const api = {
    value,
    of: (arg) => Container(arg),
    map: (func) => Container(func(value)),
    flatMap: (func) => Container(func(value).value),
    ap: (container) => Container(value(container.value))
  };

  return api;
};

export default Container;
