import { ActionType } from './action';

function isShowModalReducer(isShowModal = false, action = {}) {
  switch (action.type) {
    case ActionType.SET_IS_SHOW_MODAL:
      return action.payload.isShowModal;

    default:
      return isShowModal;
  }
}

export default isShowModalReducer;
