import React from 'react';
import PropTypes from 'prop-types';

export default function ButtonClose({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none ease-linear transition-all duration-150"
      type="button"
    >
      Close
    </button>
  );
}

ButtonClose.propTypes = {
  onClick: PropTypes.func.isRequired,
};
