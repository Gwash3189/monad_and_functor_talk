import Baobab from 'baobab';
import IO from '../shared/IO';

const tree = new Baobab({
  comments: {},
});

export default IO({ tree, comments: tree.select('comments') });
