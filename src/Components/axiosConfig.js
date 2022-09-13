import axios from "axios"
// axios instance
let HTTP=axios.create({
    baseURL:"https://ty-shop.herokuapp.com"
})
export default HTTP