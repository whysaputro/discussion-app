import React from 'react';
import PropTypes from 'prop-types';

export default function ButtonLogin({ showModal }) {
  return (
    <button type="button" onClick={showModal} className="bg-black text-white font-bold rounded w-24 p-2">
      Login
    </button>
  );
}

ButtonLogin.propTypes = {
  showModal: PropTypes.func.isRequired,
};
