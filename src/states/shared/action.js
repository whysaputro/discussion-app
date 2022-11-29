import api from '../../utilities/api';
import { receiveUsersActionCreator } from '../users/action';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveCategoriesActionCreator } from '../categories/action';
import { sortByFrequencyAndRemoveDuplicates } from '../../utilities';

function asyncPopulateUsersAndThreads() {
  return async (dispatch, getState) => {
    try {
      const users = await api.getAllUsers();
      const threads = await api.getAllThreads();
      const { categories } = getState();

      const categoriesList = {
        values: sortByFrequencyAndRemoveDuplicates(
          threads.map((thread) => thread.category),
        ),
        selectedCategory: categories ? categories.selectedCategory : null,
      };

      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveThreadsActionCreator(threads));
      dispatch(receiveCategoriesActionCreator(categoriesList));
    } catch (error) {
      alert(error.message);
    }
  };
}

export { asyncPopulateUsersAndThreads };
