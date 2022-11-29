import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppHeader from '../../components/AppHeader';
import Router from '../../config/Router';
import { asyncPreloadProcess } from '../../states/isPreload/action';
import Modal from '../../components/Modal';
import Login from '../../components/Login';
import { setIsShowActionCreator } from '../../states/isShowModal/action';

function App() {
  const {
    isPreload,
    authUser,
    isShowModal = false,
  } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(
    () => {
      dispatch(asyncPreloadProcess());
    },
    [dispatch],
  );

  function closeModalHandler() {
    dispatch(setIsShowActionCreator(false));
  }

  if (isPreload) {
    return null;
  }

  return (
    <>
      {isShowModal && !authUser && (
      <Modal title="Login">
        <Login close={closeModalHandler} />
      </Modal>
      )}

      <div className="App">
        <AppHeader />
        <main className="pt-[70px] min-h-screen lg:max-w-5xl md:max-w-2xl max-w-lg mx-auto">
          <Router />
        </main>
      </div>
    </>
  );
}

export default App;
