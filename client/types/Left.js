const Left = (value) => {
  const api = {
    value,
    of: (arg) => Left(arg),
    map: () => api,
    flatMap: () => api,
    ap: () => api
  }

  return api;
}

export default Left
