import { configureStore } from '@reduxjs/toolkit';
import isPreloadReducer from './isPreload/reducer';
import authUserReducer from './authUser/reducer';
import threadsReducer from './threads/reducer';
import usersReducer from './users/reducer';
import isShowModalReducer from './isShowModal/reducer';
import categoriesReducer from './categories/reducer';
import detailThreadReducer from './detailThread/reducer';
import leaderboardsReducer from './leaderboards/reducer';

const store = configureStore({
  reducer: {
    isPreload: isPreloadReducer,
    authUser: authUserReducer,
    users: usersReducer,
    threads: threadsReducer,
    detailThread: detailThreadReducer,
    categories: categoriesReducer,
    isShowModal: isShowModalReducer,
    leaderboards: leaderboardsReducer,
  },
});

export default store;
