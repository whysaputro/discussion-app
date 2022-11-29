import { ActionType } from './action';

function categoriesReducer(categories = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_CATEGORIES:
      return action.payload.categories;
    case ActionType.SET_SELECTED_CATEGORY:
      return {
        ...categories,
        selectedCategory: action.payload.category,
      };
    default:
      return categories;
  }
}

export default categoriesReducer;
