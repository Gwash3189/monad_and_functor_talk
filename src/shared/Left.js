const Left = (value) => {
  const api = {
    value,
    of: (arg) => Left(arg),
    map: () => api,
    flatMap: () => api
  }

  return api;
}

export default Left
