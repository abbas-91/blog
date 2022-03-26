import axios from "axios";
import {
    POSTS,
    USERS
} from './endpoints'

const getPosts = () => axios.get(POSTS)

const getUsers = () => axios.get(USERS)

export {
    getPosts,
    getUsers
}