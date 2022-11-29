import React from 'react';
import PropTypes from 'prop-types';

export default function ButtonCreate({ showModal }) {
  return (
    <button type="button" onClick={showModal} className="bg-black rounded-lg py-2 text-white font-bold hover:shadow-lg">Buat diskusi baru</button>
  );
}

ButtonCreate.propTypes = {
  showModal: PropTypes.func.isRequired,
};
