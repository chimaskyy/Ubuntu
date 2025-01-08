const syncWithFirebase =
  (reducer, syncAction) => (payload, userId) => (dispatch, getState) => {
    dispatch(reducer(payload)); // Update the local state
    const { items } = getState().cart; // Access the updated cart state
    dispatch(syncAction({ userId, cart: items })); // Sync with Firebase
  };

export default syncWithFirebase;
