/* eslint-disable no-unused-vars */
import React from 'react';
import parser from 'html-react-parser';
import sanitizeHtml from 'sanitize-html';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  MdThumbUpOffAlt, MdThumbUp, MdThumbDownOffAlt, MdThumbDown,
} from 'react-icons/md';
import { IoChatbubblesOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { postedAt } from '../../utilities/index';
import { toggleDownVoteThreadActionCreator, toggleUpVoteThreadActionCreator } from '../../states/threads/action';

export default function ThreadItem(
  {
    id,
    title,
    body,
    category,
    createdAt,
    upVotesBy,
    downVotesBy,
    totalComments,
    user,
    authUser,
    upVote,
    downVote,
    neutralizeVote,
  },
) {
  const threadIsVotedUp = upVotesBy.includes(authUser);
  const threadIsVotedDown = downVotesBy.includes(authUser);

  const dispatch = useDispatch();

  function onToggleUpVoteClick() {
    if (threadIsVotedUp) {
      neutralizeVote(id);
      dispatch(toggleUpVoteThreadActionCreator({ threadId: id, userId: authUser }));
    } else {
      upVote(id);

      if (threadIsVotedDown) {
        dispatch(toggleDownVoteThreadActionCreator({ threadId: id, userId: authUser }));
      }
    }
  }

  function onToggleDownVoteClick() {
    if (threadIsVotedDown) {
      neutralizeVote(id);
      dispatch(toggleDownVoteThreadActionCreator({ threadId: id, userId: authUser }));
    } else {
      downVote(id);

      if (threadIsVotedUp) {
        dispatch(toggleUpVoteThreadActionCreator({ threadId: id, userId: authUser }));
      }
    }
  }

  return (
    <div className="border-b mb-4 p-4">
      <header className="mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <img src={user.avatar} alt={user.name} className="rounded-full w-10" />
            <p className="font-semibold">{user.name}</p>
          </div>
          <span className="mx-1">•</span>
          <p className="text-gray-500 font-medium">{postedAt(createdAt)}</p>
        </div>
      </header>
      <main>
        <Link to={`/threads/${id}`}>
          {' '}
          <p className="font-semibold mb-2">{title}</p>
        </Link>
        <div className="mb-4">
          {
            parser(sanitizeHtml(body))
          }
        </div>
        <div className="mb-3">
          <span className="rounded-lg py-1 px-2 border border-black">
            #
            {category}
          </span>
        </div>
      </main>
      <footer>
        <div className="flex items-center gap-4 text-lg">
          {
            upVote && (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  aria-label="VoteUp"
                  onClick={onToggleUpVoteClick}
                >
                  {threadIsVotedUp ? <MdThumbUp /> : <MdThumbUpOffAlt /> }
                </button>
                <span>{upVotesBy.length}</span>
              </div>
            )
          }
          {
            downVote && (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  aria-label="VoteDown"
                  onClick={onToggleDownVoteClick}
                >
                  {threadIsVotedDown ? <MdThumbDown /> : <MdThumbDownOffAlt />}
                </button>
                <span>{downVotesBy.length}</span>
              </div>
            )
          }
          <div className="flex items-center gap-1">
            <IoChatbubblesOutline />
            <span>{totalComments}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
  user: PropTypes.shape(userShape).isRequired,
  authUser: PropTypes.string,
};

ThreadItem.propTypes = {
  ...threadItemShape,
  upVote: PropTypes.func,
  downVote: PropTypes.func,
  neutralizeVote: PropTypes.func,
};

ThreadItem.defaultProps = {
  upVote: null,
  downVote: null,
  neutralizeVote: null,
};
