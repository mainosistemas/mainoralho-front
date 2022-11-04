import { setUser } from '../services/datauser'
export default{
  methods: {
    async persisteUser(user){
      try {
        await setUser(user)
        this.$router.push({path:'/'})
      } catch (error) {
        console.log(error)
      }
    }
  }
}
