/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  asyncAddComment,
  asyncDownVoteCommentDetailThread,
  asyncDownVoteDetailThread,
  asyncNeutralizeVoteComment,
  asyncThreadDetail,
  asyncUpVoteCommentDetailThread,
  asyncUpVoteDetailThread,
} from '../../states/detailThread/action';
import CommentList from '../../components/CommentList';
import ThreadDetailItem from '../../components/ThreadDetailItem';
import { asyncNeutralizeVoteThread } from '../../states/threads/action';

export default function Thread() {
  const { id } = useParams();

  const {
    detailThread = null,
    authUser,
  } = useSelector((states) => states);

  const [content, setContent] = useState('');

  const dispatch = useDispatch();

  useEffect(
    () => {
      dispatch(asyncThreadDetail(id));
    },
    [dispatch],
  );

  function onUpVoteThreadClick(threadId) {
    dispatch(asyncUpVoteDetailThread(threadId));
  }

  function onDownVoteThreadClick(threadId) {
    dispatch(asyncDownVoteDetailThread(threadId));
  }

  function onNeutralizeVote(threadId) {
    dispatch(asyncNeutralizeVoteThread(threadId));
  }

  function onUpVoteCommentClick(commentId) {
    dispatch(asyncUpVoteCommentDetailThread({ threadId: id, commentId }));
  }

  function onDownVoteCommentClick(commentId) {
    dispatch(asyncDownVoteCommentDetailThread({ threadId: id, commentId }));
  }

  function onNeutralizeVoteComment(commentId) {
    dispatch(asyncNeutralizeVoteComment({ threadId: id, commentId }));
  }

  function onContentChangeHandler(event) {
    setContent(event.target.value);
  }

  function onButtonSendClickHandler() {
    setContent('');
    dispatch(asyncAddComment({ threadId: id, content }));
  }

  const newDetailThread = detailThread !== null
    ? {
      ...detailThread,
      authUser: authUser !== null ? authUser.id : null,
    }
    : null;

  const comments = detailThread !== null
    ? detailThread.comments.map(
      (comment) => (
        {
          ...comment,
          authUser: authUser !== null ? authUser.id : null,
        }
      ),
    )
    : null;

  if (detailThread === null) {
    return null;
  }

  return (
    <section className="pt-10">
      <div className="border-b pb-5">
        <ThreadDetailItem
          {...newDetailThread}
          upVote={onUpVoteThreadClick}
          downVote={onDownVoteThreadClick}
          neutralizeVote={onNeutralizeVote}
        />
      </div>
      <div className="border-b mt-4 pt-4 pb-5 mb-4">
        {
          authUser ? (
            <>
              <div className="flex items-center gap-3 mb-5">
                <img src={authUser.avatar} alt={authUser.avatar} className="rounded-full w-10" />
                <p className="font-semibold">{authUser.name}</p>
              </div>
              <div>
                <p className="font-bold text-lg mb-2 ml-1">Beri komentar</p>
                <textarea id="message" rows={4} className="block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 mb-3" placeholder="Type something ..." value={content} onChange={onContentChangeHandler} />
                <div className="flex justify-end">
                  <button type="button" onClick={onButtonSendClickHandler} className="bg-black py-2 px-7 text-white font-bold">Kirim</button>
                </div>
              </div>
            </>
          )
            : (
              <div>
                <p className="font-bold text-lg mb-2">Beri komentar</p>
                <p className="underline">Login untuk memberi komentar</p>
              </div>
            )
        }
      </div>
      <div>
        <div className="mb-8">
          <h1 className="font-bold text-xl">
            Komentar (
            {detailThread.comments.length}
            )
          </h1>
        </div>
        {/* Comment List */}
        <CommentList
          comments={comments}
          upVoteComment={onUpVoteCommentClick}
          downVoteComment={onDownVoteCommentClick}
          neutralizeVoteComment={onNeutralizeVoteComment}
        />
      </div>
    </section>
  );
}
