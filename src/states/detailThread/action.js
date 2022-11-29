import api from '../../utilities/api';

const ActionType = {
  ADD_COMMENT: 'ADD_COMMENT',
  RECEIVE_DETAIL_THREAD: 'RECEIVE_DETAIL_THREAD',
  CLEAR_DETAIL_THREAD: 'CLEAR_DETAIL_THREAD',
  TOGGLE_UP_VOTE_DETAIL_THREAD: 'TOGGLE_UP_VOTE_DETAIL_THREAD',
  TOGGLE_DOWN_VOTE_DETAIL_THREAD: 'TOGGLE_DOWN_VOTE_DETAIL_THREAD',
  TOGGLE_UP_VOTE_COMMENT_DETAIL_THREAD: 'TOGGLE_UP_VOTE_COMMENT_DETAIL_THREAD',
  TOGGLE_DOWN_VOTE_COMMENT_DETAIL_THREAD: 'TOGGLE_DOWN_VOTE_COMMENT_DETAIL_THREAD',
};

function addComment(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function receiveDetailThreadActionCreator(detailThread) {
  return {
    type: ActionType.RECEIVE_DETAIL_THREAD,
    payload: {
      detailThread,
    },
  };
}

function clearDetailThreadActionCreator() {
  return {
    type: ActionType.CLEAR_DETAIL_THREAD,
  };
}

function toggleUpVoteDetailThreadActionCreator(userId) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_DETAIL_THREAD,
    payload: {
      userId,
    },
  };
}

function toggleDownVoteDetailThreadActionCreator(userId) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_DETAIL_THREAD,
    payload: {
      userId,
    },
  };
}

function toggleUpVoteCommentDetailThreadActionCreator({ commentId, userId }) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_COMMENT_DETAIL_THREAD,
    payload: {
      commentId,
      userId,
    },
  };
}

function toggleDownVoteCommentDetailThreadActionCreator({ commentId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_COMMENT_DETAIL_THREAD,
    payload: {
      commentId,
      userId,
    },
  };
}

function asyncAddComment({ threadId, content }) {
  return async (dispatch) => {
    try {
      const comment = await api.createComment({ threadId, content });
      dispatch(addComment(comment));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(clearDetailThreadActionCreator());

    try {
      const detailThread = await api.getThreadDetail(threadId);
      dispatch(receiveDetailThreadActionCreator(detailThread));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncUpVoteDetailThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    if (!authUser) {
      alert('Please login first!');
    } else {
      dispatch(toggleUpVoteDetailThreadActionCreator(authUser.id));

      try {
        await api.neutralizeVoteThread(threadId);
        await api.upVoteThread(threadId);
      } catch (error) {
        alert(error.message);

        dispatch(toggleUpVoteDetailThreadActionCreator(authUser.id));
      }
    }
  };
}

function asyncDownVoteDetailThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    if (!authUser) {
      alert('Please login first!');
    } else {
      dispatch(toggleDownVoteDetailThreadActionCreator(authUser.id));

      try {
        await api.neutralizeVoteThread(threadId);
        await api.downVoteThread(threadId);
      } catch (error) {
        alert(error.message);

        dispatch(toggleDownVoteDetailThreadActionCreator(authUser.id));
      }
    }
  };
}

function asyncUpVoteCommentDetailThread({ threadId, commentId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    if (!authUser) {
      alert('Please login first!');
    } else {
      dispatch(toggleUpVoteCommentDetailThreadActionCreator({ commentId, userId: authUser.id }));

      try {
        await api.neutralizeVoteComment(threadId, commentId);
        await api.upVoteComment(threadId, commentId);
      } catch (error) {
        alert(error.message);

        dispatch(toggleUpVoteCommentDetailThreadActionCreator({ commentId, userId: authUser.id }));
      }
    }
  };
}

function asyncDownVoteCommentDetailThread({ threadId, commentId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    if (!authUser) {
      alert('Please login first!');
    } else {
      dispatch(toggleDownVoteCommentDetailThreadActionCreator({ commentId, userId: authUser.id }));

      try {
        await api.neutralizeVoteComment(threadId, commentId);
        await api.downVoteComment(threadId, commentId);
      } catch (error) {
        alert(error.message);

        dispatch(toggleDownVoteCommentDetailThreadActionCreator(
          { commentId, userId: authUser.id },
        ));
      }
    }
  };
}

function asyncNeutralizeVoteComment({ threadId, commentId }) {
  return async (_, getState) => {
    const { authUser } = getState();

    if (authUser) {
      try {
        await api.neutralizeVoteComment(threadId, commentId);
      } catch (error) {
        alert(error.message);
      }
    }
  };
}

export {
  ActionType,
  addComment,
  receiveDetailThreadActionCreator,
  clearDetailThreadActionCreator,
  toggleUpVoteDetailThreadActionCreator,
  toggleDownVoteDetailThreadActionCreator,
  toggleUpVoteCommentDetailThreadActionCreator,
  toggleDownVoteCommentDetailThreadActionCreator,
  asyncAddComment,
  asyncThreadDetail,
  asyncUpVoteDetailThread,
  asyncDownVoteDetailThread,
  asyncUpVoteCommentDetailThread,
  asyncDownVoteCommentDetailThread,
  asyncNeutralizeVoteComment,
};
