const ActionType = {
  RECEIVE_CATEGORIES: 'RECEIVE_CATEGORIES',
  SET_SELECTED_CATEGORY: 'SET_SELECTED_CATEGORY',
};

function receiveCategoriesActionCreator(categories) {
  return {
    type: ActionType.RECEIVE_CATEGORIES,
    payload: {
      categories,
    },
  };
}

function setSelectedCategoryActionCreator(category) {
  return {
    type: ActionType.SET_SELECTED_CATEGORY,
    payload: {
      category,
    },
  };
}

export {
  ActionType,
  receiveCategoriesActionCreator,
  setSelectedCategoryActionCreator,
};
