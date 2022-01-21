
let u = window.localStorage.getItem('~token');
try {
  u = JSON.parse(u)
} catch (error) {

}
export const User=u
