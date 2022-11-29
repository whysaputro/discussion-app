const ActionType = {
  SET_IS_SHOW_MODAL: 'SET_IS_SHOW_MODAL',
};

function setIsShowActionCreator(isShowModal) {
  return {
    type: ActionType.SET_IS_SHOW_MODAL,
    payload: {
      isShowModal,
    },
  };
}

export {
  ActionType,
  setIsShowActionCreator,
};
