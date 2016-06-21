import { repeat, run, pluck, merge } from '../shared/helpers';

const toJson = (r) => r.json();
const getComments = ({ data: { children } }) => children;
const maker = ({ data: { body, created_utc: created, subreddit, author, id, over_18: nsfw, link_url: link, link_author: op } }) => ({
  body,
  author,
  id,
  nsfw,
  link,
  op,
  created,
  subreddit
});
const toMakers = (comments) => comments.map(maker);
const seconds = (x) => x * 1000;
const indexById = (things) => things.reduce((obj, thing) => Object.assign({}, obj, {
  [thing.id]: thing
}), {});

export const work = ({ State, Fetch, Logger }) => {
  Logger.ap('Fetching comments');
  return Fetch
    .map(toJson)
    .map(getComments)
    .map(toMakers)
    .map((comments) => run(
      State
        .map(pluck('comments'))
        .map(merge(indexById(comments)))
        .map(() => Logger.ap('Running State Update'))
    ))
    .map(() => Logger.ap('Finished fetching comments'));
};

export default ({ State, Fetch, Logger }) => (
  repeat(
    work({ State, Fetch, Logger })
      .map(Logger.ap('Worker running...'))
  )
  .every(seconds(30))
);
