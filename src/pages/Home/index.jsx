import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ButtonCreate from '../../components/ButtonCreate';
import ButtonCategory from '../../components/ButtonCategory';
import Modal from '../../components/Modal';
import CreateThread from '../../components/CreateThread';
import ThreadItem from '../../components/ThreadItem';
import { asyncPopulateUsersAndThreads } from '../../states/shared/action';
import { setIsShowActionCreator } from '../../states/isShowModal/action';
import {
  asyncDownVoteThread,
  asyncNeutralizeVoteThread,
  asyncUpVoteThread,
} from '../../states/threads/action';
import { setSelectedCategoryActionCreator } from '../../states/categories/action';

export default function Home() {
  const dispatch = useDispatch();

  const {
    users = [],
    threads = [],
    categories,
    authUser,
    isShowModal = false,
  } = useSelector((states) => states);

  useEffect(
    () => {
      dispatch(asyncPopulateUsersAndThreads());
    },
    [dispatch],
  );

  function closeModalHandler() {
    dispatch(setIsShowActionCreator(false));
  }

  function openModalHandler() {
    dispatch(setIsShowActionCreator(true));
  }

  function onUpVoteClick(id) {
    dispatch(asyncUpVoteThread(id));
  }

  function onDownVoteClick(id) {
    dispatch(asyncDownVoteThread(id));
  }

  function neutralizeVote(id) {
    dispatch(asyncNeutralizeVoteThread(id));
  }

  function onCategoryFilterClick(category) {
    dispatch(setSelectedCategoryActionCreator(category));
  }

  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser: authUser ? authUser.id : null,
  }));

  const filteredThreadList = threadList.filter(
    (thread) => (
      categories.selectedCategory
        ? thread.category.toLowerCase() === categories.selectedCategory
        : thread
    ),
  );

  return (
    <>
      {isShowModal && authUser && (
        <Modal title="Buat diskusi baru">
          <CreateThread close={closeModalHandler} />
        </Modal>
      )}

      <section className="pt-10">
        <div className="flex flex-row gap-9">
          <div className="basis-1/4">
            <div className="sticky top-24 flex flex-col gap-4">
              {
                authUser && <ButtonCreate showModal={openModalHandler} />
              }
              <div className="border rounded-md">
                <div className="p-4">
                  <p className="font-bold mb-4">Kategori populer</p>
                  <div className="flex flex-wrap gap-2">
                    {
                      categories && (categories.values.map((category) => (
                        <ButtonCategory
                          key={category}
                          categoryName={category}
                          selectCategory={onCategoryFilterClick}
                          selectedCategory={categories.selectedCategory}
                        />
                      )))
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full basis-3/4 min-h-screen">
            <div>
              {
                filteredThreadList.map((thread) => (
                  <ThreadItem
                    key={thread.id}
                    {...thread}
                    upVote={onUpVoteClick}
                    downVote={onDownVoteClick}
                    neutralizeVote={neutralizeVote}
                  />
                ))
              }
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
