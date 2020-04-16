const defaultState = {
  user : []
}

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return state
  
    default:
      return state
  }
}

export default userReducer