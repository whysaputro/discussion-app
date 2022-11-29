import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { GrLogout } from 'react-icons/gr';
import ButtonLogin from '../ButtonLogin';
import { setIsShowActionCreator } from '../../states/isShowModal/action';
import { asyncUnsetAuthUser } from '../../states/authUser/action';

export default function AppHeader() {
  const {
    authUser,
  } = useSelector((states) => states);

  const dispatch = useDispatch();

  function openModalHandler() {
    dispatch(setIsShowActionCreator(true));
  }

  function onLogoutClick() {
    dispatch(asyncUnsetAuthUser());
  }

  return (
    <header className="flex items-center fixed top-0 w-full py-5 px-8 justify-between border-b border-solid bg-white z-40 shadow">
      <div>
        <h1 className="font-bold text-xl">DISCUSSION APP</h1>
      </div>
      <div className="flex items-center gap-8">
        <Link to="/"><h2>Home</h2></Link>
        <Link to="/leaderboard"><h2>Leaderboard</h2></Link>
      </div>
      {!authUser && <ButtonLogin showModal={openModalHandler} />}
      {authUser && (
        <button type="button" onClick={onLogoutClick} className="flex items-center gap-2">
          <p className="font-bold">{authUser.name}</p>
          <img src={authUser.avatar} alt={authUser.name} className="rounded-full w-8" />
          <div className="text-2xl">
            <GrLogout />
          </div>
        </button>
      )}
    </header>
  );
}
