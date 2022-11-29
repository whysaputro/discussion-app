import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Input from '../Input';
import TextArea from '../TextArea';
import ButtonClose from '../ButtonClose';
import Button from '../Button';
import useInput from '../../Hooks/useInput';
import { asyncAddThread } from '../../states/threads/action';

export default function CreateThread({ close }) {
  const [title, titleChangeHandler] = useInput();
  const [category, categoryChangeHandler] = useInput();
  const [body, bodyChangeHandler] = useInput();

  const dispatch = useDispatch();

  function onButtonSendClickHandler() {
    dispatch(asyncAddThread({ title, body, category }));
    close();
  }

  return (
    <>
      <div className="p-6 border-b flex flex-col gap-2">
        <Input placeholder="Judul" onChange={titleChangeHandler} />
        <Input placeholder="Kategori" onChange={categoryChangeHandler} />
        <TextArea onChange={bodyChangeHandler} />
      </div>
      <div className="p-6 flex justify-end">
        <ButtonClose onClick={close} />
        <Button buttonName="Send" onClick={onButtonSendClickHandler} />
      </div>
    </>
  );
}

CreateThread.propTypes = {
  close: PropTypes.func.isRequired,
};
