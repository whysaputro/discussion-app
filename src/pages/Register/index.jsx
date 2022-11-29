import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import useInput from '../../Hooks/useInput';
import { asyncRegisterUser } from '../../states/users/action';

export default function Register() {
  const [name, onNameChangeHanlder] = useInput('');
  const [email, onEmailChangeHanlder] = useInput('');
  const [password, onPasswordChangeHanlder] = useInput('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onRegisterClickHandler() {
    dispatch(asyncRegisterUser({ name, email, password }));
    navigate('/');
  }

  return (

    <section>
      <h1 className="font-bold text-3xl text-center mt-8">Register Account</h1>
      <div className="max-w-2xl mx-auto mt-20">
        <div className="p-6 border-b flex flex-col gap-2">
          <Input placeholder="Name" onChange={onNameChangeHanlder} value={name} />
          <Input placeholder="Email" onChange={onEmailChangeHanlder} value={email} />
          <Input placeholder="Password" type="password" onChange={onPasswordChangeHanlder} value={password} />
        </div>
        <div className="p-6 flex justify-end">
          <Button buttonName="Register" onClick={onRegisterClickHandler} />
        </div>
      </div>
    </section>
  );
}
