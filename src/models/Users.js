import Api from "./Api.js";

const getUsers = async () => {
  return Api.req("GET", "/users");
};
export default getUsers;
