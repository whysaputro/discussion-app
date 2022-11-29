/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';

export default function ButtonCategory({ categoryName, selectCategory, selectedCategory }) {
  function onCategoryClick() {
    selectCategory(categoryName);
  }
  return (
    <button type="button" onClick={onCategoryClick} className={`font-500 text-xs flex items-center text-center border rounded py-1 px-2 hover:text-white hover:bg-black ${selectedCategory === categoryName && 'bg-black text-white'}`}>
      #
      {categoryName}
    </button>
  );
}

ButtonCategory.propTypes = {
  categoryName: PropTypes.string.isRequired,
  selectCategory: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string,
};

ButtonCategory.defaultProps = {
  selectedCategory: '',
};
