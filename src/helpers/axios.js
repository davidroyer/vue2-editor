import axios from "axios";
const CLIENT_ID = "993793b1d8d3e2e";

// We create our own axios instance and set a custom base URL.
// Note that if we wouldn't set any config here we do not need
// a named export, as we could just `import axios from 'axios'`
export const axiosInstance = axios.create({
  baseURL: `https://api.imgur.com/3/`,
  headers: { Authorization: "Client-ID " + CLIENT_ID }
});
// export default ({ Vue }) => {
//   Vue.prototype.$axios = axiosInstance;
// };

// Here we define a named export
// that we can later use inside .js files:
// export default axiosInstance;

// axios({
//   url: "https://api.imgur.com/3/image",
//   method: "POST",
//   headers: { Authorization: "Client-ID " + CLIENT_ID },

// });
