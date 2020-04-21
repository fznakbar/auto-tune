export const login = data => {
  return async dispatch => {
    const res = await fetch('API')
    const user = await res.json()
    dispatch({
      type : 'LOGIN',
      payload : user
    })
  }
}