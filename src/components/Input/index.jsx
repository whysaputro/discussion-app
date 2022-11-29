import React from 'react';
import PropTypes from 'prop-types';

export default function Input({ placeholder, onChange, type }) {
  return (
    <input type={type} placeholder={placeholder} onChange={onChange} className="border border-black rounded-lg p-2" />
  );
}

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
};
