export const setUser = (data)=>{

  return new Promise((resolve, reject)=>{
    window.localStorage.setItem('~token', JSON.stringify(data))
    resolve(data)
  })
}

export const User=()=>{
  let u = window.localStorage.getItem('~token');
  try {
    u = JSON.parse(u)
  } catch (error) {
    console.log(error)
  }
  return u
}
