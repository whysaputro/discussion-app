import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import useInput from '../../Hooks/useInput';
import Input from '../Input';
import ButtonClose from '../ButtonClose';
import Button from '../Button';
import { asyncSetAuthUser } from '../../states/authUser/action';

export default function Login({ close }) {
  const [email, emailChangeHandler] = useInput();
  const [password, passwordChangeHandler] = useInput();

  const dispatch = useDispatch();

  function onLoginHandler() {
    dispatch(asyncSetAuthUser({ email, password }));
    close();
  }

  return (
    <>
      <div className="p-6 border-b flex flex-col gap-2">
        <Input placeholder="Username" onChange={emailChangeHandler} />
        <Input type="password" placeholder="Password" onChange={passwordChangeHandler} />
      </div>
      <footer className="flex items-center justify-between">
        <p className="p-6">
          Belum punya akun?
          {' '}
          <a href="/register" className="underline text-blue">Daftar di sini</a>
          .
        </p>
        <div className="p-6 flex justify-end">
          <ButtonClose onClick={close} />
          <Button buttonName="Login" onClick={onLoginHandler} />
        </div>
      </footer>
    </>
  );
}

Login.propTypes = {
  close: PropTypes.func.isRequired,
};
