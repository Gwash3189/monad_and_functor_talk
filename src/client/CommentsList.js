import React, { Component, PropTypes } from 'react';

import * as bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import styles from './CommentsList.css';
import Comment from './Comment';


import { run, on, top, sort, map, extract, perform, toArray } from '../shared/helpers';

class CommentsList extends Component {
  static propTypes = {
    socket: PropTypes.any.isRequired,
    state: PropTypes.any.isRequired
  }

  constructor(props) {
    super(props);

    const { state, socket } = props;

    run(
      state
        .map(on('update', (e) => this.setState(e.data.currentData)))
        .flatMap(state => socket
          .map(on('comments', comments => state.select('comments').merge(comments)))
        )
    );
  }

  comments(f) {
    const { state } = this.props;

    return extract(perform(state
      .map(state => f(state.get('comments')))
    ));
  }

  renderComments(comments = {}) {

    const coms = map(comment => {
      return <Comment key={comment.id} comment={comment} />
    }, sort(top(toArray(comments), 300), 'created'));

    return (
      <ul className={styles.list}>
        { coms }
      </ul>
    );
  }

  render() {
    return (
      <div className={bootstrap.container}>
        <div className={bootstrap.row}>
          <div className={styles.container}>
            {this.comments(this.renderComments)}
          </div>
        </div>
      </div>
    );
  }
}

export default ({ socket, state }) => <CommentsList socket={socket} state={state} />;
