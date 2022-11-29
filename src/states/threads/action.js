import api from '../../utilities/api';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  TOGGLE_UP_VOTE_THREAD: 'TOGGLE_UP_VOTE_THREAD',
  TOGGLE_DOWN_VOTE_THREAD: 'TOGGLE_DOWN_VOTE_THREAD',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function toggleUpVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function toggleDownVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function asyncAddThread({ title, body, category }) {
  return async (dispatch) => {
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      alert(error);
    }
  };
}

function asyncUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    if (!authUser) {
      alert('Please login first!');
    } else {
      dispatch(toggleUpVoteThreadActionCreator({ threadId, userId: authUser.id }));

      try {
        await api.neutralizeVoteThread(threadId);
        await api.upVoteThread(threadId);
      } catch (error) {
        alert(error.message);
        dispatch(toggleUpVoteThreadActionCreator({ threadId, userId: authUser.id }));
      }
    }
  };
}

function asyncDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    if (!authUser) {
      alert('Please login first!');
    } else {
      dispatch(toggleDownVoteThreadActionCreator({ threadId, userId: authUser.id }));

      try {
        await api.neutralizeVoteThread(threadId);
        await api.downVoteThread(threadId);
      } catch (error) {
        alert(error.message);
        dispatch(toggleDownVoteThreadActionCreator({ threadId, userId: authUser.id }));
      }
    }
  };
}

function asyncNeutralizeVoteThread(threadId) {
  return async (_, getState) => {
    const { authUser } = getState();

    if (authUser) {
      try {
        await api.neutralizeVoteThread(threadId);
      } catch (error) {
        alert(error.message);
      }
    }
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  toggleUpVoteThreadActionCreator,
  toggleDownVoteThreadActionCreator,
  asyncAddThread,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralizeVoteThread,
};
