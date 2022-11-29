import React from 'react';
import PropTypes from 'prop-types';
import CommentItem, { commentItemShape } from '../CommentItem';

export default function CommentList({
  comments, upVoteComment, downVoteComment, neutralizeVoteComment,
}) {
  return (
    <div>
      {
        comments.map(
          (comment) => (
            <CommentItem
              key={comment.id}
              {...comment}
              upVoteComment={upVoteComment}
              downVoteComment={downVoteComment}
              neutralizeVoteComment={neutralizeVoteComment}
            />
          ),
        )
      }
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape(commentItemShape)).isRequired,
  upVoteComment: PropTypes.func,
  downVoteComment: PropTypes.func,
  neutralizeVoteComment: PropTypes.func,
};

CommentList.defaultProps = {
  upVoteComment: null,
  downVoteComment: null,
  neutralizeVoteComment: null,
};
