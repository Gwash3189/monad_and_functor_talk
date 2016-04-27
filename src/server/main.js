export default (state, worker, api) => (State, Logger, Fetch, App, Socket, Http) => {
  state(State, Logger).perform();
  worker(State, Fetch, Logger).perform()
  api(
    App,
    Socket,
    Http,
    Logger,
    State
  ).perform();
}
