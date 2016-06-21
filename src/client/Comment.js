import React, { Component, PropTypes } from 'react';
import * as bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Comment.css';


export default class Comment extends Component {

  nsfw(comment) {
    return comment.nsfw
      ? <div className={styles.nsfw}>NSFW</div>
      : null;
  }

  nsfwBody(comment) {
    return comment.nsfw
      ? styles.nsfwBody
      : styles.body;
  }

  render() {
    const { comment } = this.props;

    return (
      <a href={comment.link} target="_blank" className={styles.link}>
        <div className={styles.comment}>
          {this.nsfw(comment)}
          <div className={styles.heading}>
            <h3 className={styles.title}>
              {comment.author} from /r/{comment.subreddit.toLowerCase()} says...
            </h3>
          </div>
          <div className={this.nsfwBody(comment)}>
            {comment.body}
          </div>
        </div>
      </a>

    );
  }
}
