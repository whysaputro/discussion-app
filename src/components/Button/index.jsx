import React from 'react';
import PropTypes from 'prop-types';

export default function Button({ buttonName, onClick }) {
  return (
    <button type="button" onClick={onClick} className="bg-black w-32 rounded-lg py-2 text-white font-bold hover:shadow-lg">{buttonName}</button>
  );
}

Button.propTypes = {
  buttonName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
