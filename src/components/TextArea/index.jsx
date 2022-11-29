import React from 'react';
import PropTypes from 'prop-types';

export default function TextArea({ placeholder, onChange }) {
  return (
    <textarea id="message" placeholder={placeholder} onChange={onChange} rows={4} className="block p-2.5 w-full rounded-lg border border-black" />
  );
}

TextArea.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

TextArea.defaultProps = {
  placeholder: '',
};
