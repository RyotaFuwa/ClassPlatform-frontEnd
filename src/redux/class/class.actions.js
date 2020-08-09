export const setCurrentClass = cls => ({
  type: 'SET_CURRENT_CLASS',
  payload: cls,
})

export const updateCurrentClass = updatingFields => ({
  type: 'UPDATE_CURRENT_CLASS',
  payload: updatingFields,
})

