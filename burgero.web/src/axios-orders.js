import axios from "axios";

const instance = axios.create({
  baseURL: "https://burgero-91fc7.firebaseio.com/",
});

export default instance;
