import React from 'react';
import sanitizeHtml from 'sanitize-html';
import parser from 'html-react-parser';
import {
  MdThumbUpOffAlt, MdThumbUp, MdThumbDownOffAlt, MdThumbDown,
} from 'react-icons/md';
import { IoChatbubblesOutline } from 'react-icons/io5';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { postedAt } from '../../utilities';
import { commentItemShape } from '../CommentItem';
import { toggleDownVoteDetailThreadActionCreator, toggleUpVoteDetailThreadActionCreator } from '../../states/detailThread/action';

export default function ThreadDetailItem({
  id,
  title,
  body,
  createdAt,
  owner,
  category,
  comments,
  upVotesBy,
  downVotesBy,
  authUser,
  upVote,
  downVote,
  neutralizeVote,
}) {
  const isThreadVotedUp = upVotesBy.includes(authUser);
  const isThreadVotedDown = downVotesBy.includes(authUser);

  const dispatch = useDispatch();

  function onToggleUpVoteClick() {
    if (isThreadVotedUp) {
      neutralizeVote(id);
      dispatch(toggleUpVoteDetailThreadActionCreator({ threadId: id, userId: authUser }));
    } else {
      neutralizeVote(id);
      upVote(id);

      if (isThreadVotedDown) {
        dispatch(toggleDownVoteDetailThreadActionCreator({ threadId: id, userId: authUser }));
      }
    }
  }

  function onToggleDownVoteClick() {
    if (isThreadVotedDown) {
      neutralizeVote(id);
      dispatch(toggleDownVoteDetailThreadActionCreator({ threadId: id, userId: authUser }));
    } else {
      neutralizeVote(id);
      downVote(id);

      if (isThreadVotedUp) {
        dispatch(toggleUpVoteDetailThreadActionCreator({ threadId: id, userId: authUser }));
      }
    }
  }

  return (
    <div>
      <header className="mb-4">
        <div className="flex items-center gap-3">
          <img src={owner.avatar} alt={owner.name} className="rounded-full w-10" />
          <p className="font-semibold">{owner.name}</p>
          <span className="mx-1">•</span>
          <p className="text-gray-500 font-medium">{postedAt(createdAt)}</p>
        </div>
      </header>
      <h5 className="mb-2 font-bold text-xl">{title}</h5>
      <div className="mb-4 text-base">
        {
          parser(sanitizeHtml(body))
        }
      </div>
      <div className="py-4">
        <span className="rounded-lg py-1 px-2 border border-black">
          #
          {category}
        </span>
      </div>
      <footer>
        <div className="flex items-center gap-4 text-lg">
          {
            onToggleUpVoteClick && (
            <div className="flex items-center gap-1">
              <button type="button" aria-label="VoteUp" onClick={onToggleUpVoteClick}>
                {isThreadVotedUp ? <MdThumbUp /> : <MdThumbUpOffAlt /> }
              </button>
              <span>{upVotesBy.length}</span>
            </div>
            )
          }
          {
            onToggleDownVoteClick && (
            <div className="flex items-center gap-1">
              <button type="button" aria-label="VoteDown" onClick={onToggleDownVoteClick}>
                {isThreadVotedDown ? <MdThumbDown /> : <MdThumbDownOffAlt />}
              </button>
              <span>{downVotesBy.length}</span>
            </div>
            )
          }
          <div className="flex items-center gap-1">
            <IoChatbubblesOutline />
            <span>{comments.length}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

const ownerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

ThreadDetailItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  category: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape(commentItemShape)).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.string,
  upVote: PropTypes.func,
  downVote: PropTypes.func,
  neutralizeVote: PropTypes.func,
};

ThreadDetailItem.defaultProps = {
  authUser: '',
  upVote: null,
  downVote: null,
  neutralizeVote: null,
};
