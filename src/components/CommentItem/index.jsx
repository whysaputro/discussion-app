import React from 'react';
import PropTypes from 'prop-types';
import parser from 'html-react-parser';
import {
  MdThumbUpOffAlt, MdThumbUp, MdThumbDownOffAlt, MdThumbDown,
} from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { postedAt } from '../../utilities';
import { toggleDownVoteCommentDetailThreadActionCreator, toggleUpVoteCommentDetailThreadActionCreator } from '../../states/detailThread/action';

export default function CommentItem({
  id,
  content,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  authUser,
  upVoteComment,
  downVoteComment,
  neutralizeVoteComment,
}) {
  const commentIsVotedUp = upVotesBy.includes(authUser);
  const commentIsVotedDown = downVotesBy.includes(authUser);

  const dispatch = useDispatch();

  function onToggleUpVoteClick() {
    if (commentIsVotedUp) {
      neutralizeVoteComment(id);
      dispatch(toggleUpVoteCommentDetailThreadActionCreator({ commentId: id, userId: authUser }));
    } else {
      neutralizeVoteComment(id);
      upVoteComment(id);

      if (commentIsVotedDown) {
        dispatch(toggleDownVoteCommentDetailThreadActionCreator(
          { commentId: id, userId: authUser },
        ));
      }
    }
  }

  function onToggleDownVoteClick() {
    if (commentIsVotedDown) {
      neutralizeVoteComment(id);
      dispatch(toggleDownVoteCommentDetailThreadActionCreator({ commentId: id, userId: authUser }));
    } else {
      neutralizeVoteComment(id);
      downVoteComment(id);

      if (commentIsVotedUp) {
        dispatch(toggleUpVoteCommentDetailThreadActionCreator(
          { commentId: id, userId: authUser },
        ));
      }
    }
  }

  return (
    <div className="border-b pb-5 mb-7">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <img src={owner.avatar} alt={owner.name} className="rounded-full w-10" />
        <p className="font-semibold">{owner.name}</p>
        <span className="mx-1">•</span>
        <p className="text-gray-500 font-medium">{postedAt(createdAt)}</p>
      </div>
      {/* Content */}
      <div className="mb-3">
        {
          parser(content)
        }
      </div>
      {/* Footer */}
      <div className="flex items-center gap-4 text-lg">
        <div className="flex items-center gap-1">
          <button type="button" onClick={onToggleUpVoteClick}>
            {commentIsVotedUp ? <MdThumbUp /> : <MdThumbUpOffAlt />}
          </button>
          <span>{upVotesBy.length}</span>
        </div>
        <div className="flex items-center gap-1">
          <button type="button" onClick={onToggleDownVoteClick}>
            {commentIsVotedDown ? <MdThumbDown /> : <MdThumbDownOffAlt />}
          </button>
          <span>{downVotesBy.length}</span>
        </div>
      </div>
    </div>
  );
}

const ownerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const commentItemShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

CommentItem.propTypes = {
  ...commentItemShape,
  authUser: PropTypes.string,
  upVoteComment: PropTypes.func,
  downVoteComment: PropTypes.func,
  neutralizeVoteComment: PropTypes.func,
};

CommentItem.defaultProps = {
  authUser: '',
  upVoteComment: null,
  downVoteComment: null,
  neutralizeVoteComment: null,
};

export { commentItemShape };
